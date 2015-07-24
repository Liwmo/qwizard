#!/bin/bash
#
### BEGIN INIT INFO
# Provides:             qwizard
# Required-Start:       $syslog $remote_fs
# Required-Stop:        $syslog $remote_fs
# Should-Start:         $local_fs
# Should-Stop:          $local_fs
# Default-Start:        2 3 4 5
# Default-Stop:         0 1 6
# Short-Description:    qwizard
# Description:          qwizard
### END INIT INFO

NAME=qwizard
NODE_BIN_DIR=$(dirname $(which node))
NODE_ENV=production
NODE_PATH=/usr/lib/node_modules
NODE_TLS_REJECT_UNAUTHORIZED=0
APPLICATION_DIRECTORY=/opt/qwizard
PIDFILE=/var/run/qwizard.pid
LOGFILE=/var/log/qwizard.log

export PATH=$NODE_BIN_DIR:$PATH
export NODE_ENV=$NODE_ENV
export NODE_PATH=$NODE_PATH
export NODE_TLS_REJECT_UNAUTHORIZED=$NODE_TLS_REJECT_UNAUTHORIZED

_pid() {
    if [ -f $PIDFILE ]
    then
        cat $PIDFILE
    fi
}

start() {
    if [ -z "$(_pid)" ]
    then
        echo "Starting $NAME..."

        forever --pidFile $PIDFILE --uid $NODE_ENV --sourceDir $APPLICATION_DIRECTORY \
            -a -l $LOGFILE --minUptime 5000 --spinSleepTime 2000 \
            start -c "npm run-script start-production" >> $LOGFILE &
        RETVAL=$?

        echo "Started $NAME."
    else
        echo "$NAME is already running."
        RETVAL=1
    fi
}

stop() {
    if [ ! -z "$(_pid)" ]
    then
        echo "Shutting down $NAME..."

        forever stop $NODE_ENV

        rm -f $PIDFILE
        RETVAL=$?

        echo "$NAME was shut down."
    else
        echo "$NAME is not running."
        RETVAL=0
    fi
}

restart() {
    echo "Restarting $NAME"
    stop
    start
}

status() {
    RETVAL=0
    echo "Status for $NAME:"

    PID=$(_pid)

    if [ -z "$PID" ]
    then
        RETVAL=1
    fi

    if [ $RETVAL -eq 0 ]
    then
        echo "Running (PID: $PID)"
        TMP=$(mktemp)
        LIST=$(forever list | tee $TMP)

        cat $TMP | head -n2
        cat $TMP | grep $PID
    else
        echo "$NAME is not running."
    fi
}

case "$1" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    status)
        status
        ;;
    restart)
        restart
        ;;
    *)
        echo "Usage: {start|stop|status|restart}"
        exit 1
        ;;
esac
exit $RETVAL
