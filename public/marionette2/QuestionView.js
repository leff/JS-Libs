define(['backbone', 'marionette', 'QuestionModel'], function(Backbone, Marionette, QuestionModel) {

    var AnswerListView = Marionette.ItemView.extend({
        template: '#answer-list-template',

        events: {
            'click .answer': 'onItemClick'
        },
        ui: {
            answer: '.answer'
        },

        onItemClick: function(evt_name, choice) {
            console.log( 'itemclick', arguments );
            if( choice.type === 'choice' ) {
                this.ui.answer.removeClass('selected');
                choice.addClass('selected');
                this.model.set('val', choice.val);
            } else if ( choice.type === 'choices' ) {
                //swap in next set of choices
                this.trigger('subchoice;selected', choice);
            }
        }
    });

    var QuestionView = Marionette.Layout.extend({
        template: "#question-template",

        regions: {
            answers: ".answers-container"
        },
        itemEvents: {
            'subchoice:selected': 'onFollowup'
        },

        onRender: function() {
            this.answers.show(new AnswerListView({model: this.model}));
        },

        onFollowup: function(evt, choice) {
            console.log('onfollowup', arguments);
            this.answers.show(new AnswerListView({model: this.model}));
        }
    });

    return QuestionView;
});