requirejs.config({
    paths: {
        jquery: '/marionette/vendor/jquery',
        underscore: '/marionette/vendor/underscore',
        backbone: '/marionette/vendor/backbone',
        marionette: '/marionette/vendor/backbone.marionette-amd',
        'backbone.wreqr': '/marionette/vendor/backbone.wreqr',
        'backbone.eventbinder': '/marionette/vendor/backbone.eventbinder',
        'backbone.babysitter': '/marionette/vendor/backbone.babysitter',
    },
    shim: {
        jquery : {
            exports : 'jQuery'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backbone.wreqr': {
            deps: ['backbone'],
            exports: 'Wreqr'
        },
        'backbone.babysitter': {
            deps: ['backbone'],
            exports: 'Babysitter'
        }
    }
});

require(['backbone', 'marionette'], function(Backbone, Marionette) {

    // In real life, this would be injected by python
    // also, it would be a list, rather just one
    // also, it would be json rather than a hand coded object literal
    question_json = {
        name: 'sandwich',
        question_text: 'What kind of sandwich do you have?',
        accepted_answers: {
            type: 'choices',
            choices: [
                {
                    type: 'choice',
                    text: 'Club',
                    img: 'sandwich-club.png',
                    value: '1'
                },
                {
                    type: 'choice',
                    text: 'Ruben',
                    img: 'sandwich-ruben.png',
                    value: '2'
                },
                {
                    type: 'choice',
                    text: 'Hamburger',
                    img: 'sandwich-burger.png',
                    value: '3'
                },
                {
                    type: 'choice',
                    text: 'Hoagie',
                    img: 'sandwich-hoagie.png',
                    value: '4'
                }
            ]
        }
    };

    //Actual Data Models (Data stored in a DB)
    var FormField = Backbone.Model.extend({
        name: '',
        value: undefined,
        type: ''
    });
    var Form = Backbone.Collection.extend({
        model: FormField
    });


    //View Models (Data defining what the view does)
    var QuestionModel = Backbone.Model.extend({
        defaults: {
            name: 'default_question',
            question_text: 'Question?',
            accepted_answers: {
                //AnswersCollection
            }
        },
        constructor: function(attrs) {
            this.name = attrs.name;
            this.question_text = attrs.question_text;
            Backbone.Model.apply(this, arguments);
            this.accepted_answers = new AnswersCollection(attrs.accepted_answers.choices);
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

    var AnswersCollection = Backbone.Collection.extend({
        model: ChoiceModel,
        defaults: {
            type: 'choices',
            choices: [
                //ChoiceModel
            ]
        }
    });

    var ChoiceView = Marionette.ItemView.extend({
        template: '#answer-template',
        events: {
            'click': 'onClick'
        },

        onClick: function() {
            this.trigger('selected');
        },

        onRender: function(){
            if( this.model.get('selected') ) {
                this.$el.css('background-color', '#FF8');
            } else {
                this.$el.css('background-color', 'transparent');
            }
        }

    });

    var AnswerListView = Marionette.CompositeView.extend({
        itemView: ChoiceView,
        itemViewContainer: '.answers-list',
        template: '#answer-list-template',

        itemEvents: {
            'selected': 'onChangeSelected'
        },
        dataEvents: {
            'all': 'datae'
        },

        datae: function() {
            console.log(arguments);
        },

        onChangeSelected: function(evt_name, choice) {
            console.log( arguments );
            this.children.each(function(item){
                if( item != choice ) {
                    item.model.set('selected', false);
                } else {
                    item.model.set('selected', true);
                }
            });
            this.render();
        }
    });

    var QuestionView = Marionette.Layout.extend({
        template: "#question-template",

        regions: {
            answers: ".answers-container"
        },

        initialize: function() {
            app.on("initialize:after", this.final_init, this);
        },
        final_init: function() {
            this.answers.show(new AnswerListView({collection: this.model.accepted_answers}));
        }
    });

    // var form_state = new Form();

    var app = new Backbone.Marionette.Application();
    app.addRegions({
        marionetteRegion: "#marionette-questions"
    });
    app.addInitializer(function(options) {
        var sandwich_definition = new QuestionModel(options.question);
        var marionette_question = new QuestionView({model: sandwich_definition});
        app.marionetteRegion.show(marionette_question);
    });
    app.start({question: question_json});

});
