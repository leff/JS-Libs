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
        },

        constructor: function(attrs) {
            Backbone.Model.apply(this, arguments);
            var choices = _.map(attrs.choices, function(raw){ return new ChoiceModel(raw); });
            this.choices = new AnswersCollection(choices);
        }
    });

    var AnswersCollection = Backbone.Collection.extend({
        model: ChoiceModel
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