questions_json = [{
        name: 'sandwich',
        question_text: 'What kind of sandwich do you have?',
        accepted_answers: {
            type: 'choices',
            choices: [
                {
                    'text': 'Club',
                    'img': 'sandwich-club.png',
                    'val': '1'
                },
                {
                    'text': 'Ruben',
                    'img': 'sandwich-ruben.png',
                    'val': '2'
                },
                {
                    'text': 'Hamburger',
                    'img': 'sandwich-burger.png',
                    'val': '3'
                },
                {
                    'text': 'Hoagie',
                    'img': 'sandwich-hoagie.png',
                    'val': '4'
                }
            ]
        }
    }];



ChoiceView = Giraffe.View.extend({
    template: '#answer-template',
    ui: {
        '$answer': '.answer'
    },
    events: {
        'click $answer': 'onClick'
    },

    initialize: function() {
        if( this.model.get('selected') ) {
            this.$el.css('background-color', '#FF9');
        } else {
            this.$el.css('background-color', 'transparent');
        }
    },

    onClick: function() {
        this.model.set('selected', true);
    },

    serialize: function() {
        var context = {
            val: this.model.get('val'),
            text: this.model.get('text')
        };
        return context;
    }
});

AnswerListView = Giraffe.View.extend({
    template: '#answer-list-template',

    dataEvents: {
        'change:selected collection': 'onChangeSelected'
    },


    afterRender: function() {
        this.collection.each(function(choice) {
            var cv = new ChoiceView({model: choice});
            this.attach(cv);
        }, this);
    },
    onChangeSelectedonChangeSelected: function(selected_choice, selected) {
        if (selected) {
            var others = this.collection.filter( function(c) {return c.get('val') != selected_choice.get('val'); } );
            _.each(others, function(c) { c.set('selected', false); });
            this.render();
        }
    }
});

QuestionView = Giraffe.View.extend({
    template: '#question-template',

    initialize: function(question_data) {
        this.question_data = question_data;
        this.choices = new Giraffe.Collection(this.question_data.accepted_answers.choices);
    },

    afterRender: function() {
        this.attach(new AnswerListView({collection: this.choices}), {el: '.answers-container'});
    }
});

SurveyPageApp = Giraffe.App.extend({
    initialize: function(options) {
        this.questions = options.questions;
    },

    afterRender: function() {
        _.each(this.questions, function(question_data) {
            this.attach(new QuestionView(question_data));
        }, this);
    }
});

var app = new SurveyPageApp({
    questions: questions_json
});
app.attachTo('#giraffe-questions');