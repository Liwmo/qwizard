'use strict';

describe('Quiz Factory', function() {
    var factory;

    beforeEach(module('app'));
    beforeEach(inject(function(quizFactory){
        factory = quizFactory;
    }));

    it('should return an object with property score', function(){
        //just send no data
        factory.postQuiz("dummy_id", [], function(data){
            expect(data.score).toBeDefined();
        });
    });

    it('score value should be correct when all answers are correct', function(){
        //all answers correct
        factory.postQuiz("dummy_id", [[0], [3], [3], [1], [0,1], [0], [1]], function(data){
            expect(data.score).toBe(17);
        });
    });

    it('score value is 0 when no answers are correct', function(){
        //no answers correct
        factory.postQuiz("dummy_id", [[1], [0], [0], [0], [2,1], [1], [0]], function(data){
            expect(data.score).toBe(2);
        });
    });

    it('score value is changed by 2 when mc answered correctly', function(){
        //only question 1 is correct (mc question)
        factory.postQuiz("dummy_id", [[0], [0], [0], [0], [2,1], [1], [0]], function(data){
            expect(data.score).toBe(2);
        });
    });

    it('score value is changed by 2 when tf answered correctly', function(){
        //only question 6 is correct (tf question)
        factory.postQuiz("dummy_id", [[0], [0], [0], [0], [2,1], [0], [0]], function(data){
            expect(data.score).toBe(2);
        });
    });

    it('score value is changed by 5 when ms answered correctly', function(){
        //only question 5 is correct (ms question)
        factory.postQuiz("dummy_id", [[0], [0], [0], [0], [0,1], [1], [0]], function(data){
            expect(data.score).toBe(5);
        });
    });
});