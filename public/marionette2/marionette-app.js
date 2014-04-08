requirejs.config({
    paths: {
        jquery: '/marionette2/vendor/jquery',
        underscore: '/marionette2/vendor/underscore',
        backbone: '/marionette2/vendor/backbone',
        marionette: '/marionette2/vendor/backbone.marionette-amd',
        'backbone.wreqr': '/marionette2/vendor/backbone.wreqr',
        'backbone.eventbinder': '/marionette2/vendor/backbone.eventbinder',
        'backbone.babysitter': '/marionette2/vendor/backbone.babysitter',
        QuestionModel: '/marionette2/QuestionModel',
        QuestionView: '/marionette2/QuestionView',
        question_json: '/marionette2/question'

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

require(['marionette', 'QuestionModel', 'QuestionView', 'question_json'], function(Marionette, QuestionModel, QuestionView, question_json) {

    var app = new Marionette.Application();
    app.addRegions({
        marionetteRegion: "#marionette-questions"
    });
    app.addInitializer(function(options) {
        //there is still a missing layer. This is only one question.
        //this app needs to manage all the questions on the page
        var sandwich_definition = new QuestionModel(options.question.question_json);
        var marionette_question = new QuestionView({model: sandwich_definition});
        app.marionetteRegion.show(marionette_question);
    });
    app.start({question: question_json});
});
