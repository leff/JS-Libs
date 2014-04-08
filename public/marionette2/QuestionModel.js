define(['backbone'], function(Backbone) {


    //View Models (Data defining what the view does)
    var QuestionModel = Backbone.Model.extend({
        defaults: {
            name: 'default_question',
            question_text: 'Question?',
            accepted_answers: {
                //AnswersCollection
            },
            val: undefined //current value
        }
        
        // constructor: function(attrs) {
        //     this.name = attrs.name;
        //     this.question_text = attrs.question_text;
        //     Backbone.Model.apply(this, arguments);
        //     this.accepted_answers = new AnswersCollection(attrs.choices);
        // }
    });

    var AnswersCollection = Backbone.Collection.extend({
        model: ChoiceModel,
        defaults: {
            type: 'choices',
            choices: [
                //ChoiceModel
            ]
        }
    });

    var ChoiceModel = Backbone.Model.extend({
        defaults: {
            type: 'choice',
            text: 'Example',
            img: 'url.png',
            value: '0'
        }
    });

    return QuestionModel;
});