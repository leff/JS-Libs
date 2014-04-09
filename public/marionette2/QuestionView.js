define(['backbone', 'marionette', 'QuestionModel'], function(Backbone, Marionette, QuestionModel) {

    var AnswerListView = Marionette.CompositeView.extend({
        template: '#answer-list-template',

        events: {
            'click .answer': 'onItemClick'
        },
        ui: {
            answer: '.answer'
        },

        onItemClick: function(evt) {

            var item = $(evt.currentTarget);
            var choice_value = item.find('span').html();

            var choice = this.collection.findWhere({val: choice_value});

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
            var alv = new AnswerListView({collection: this.model});
            this.answers.show(alv);
        },

        onFollowup: function(evt, choice) {
            console.log('onfollowup', arguments);
            this.answers.show(new AnswerListView({collection: this.model}));
        }
    });

    return QuestionView;
});