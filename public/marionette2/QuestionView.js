define(['backbone', 'marionette', 'QuestionModel', 'tpl!templates/AnswerListTemplate.html', 'tpl!templates/QuestionTemplate.html'],
function(Backbone, Marionette, QuestionModel, AnswerListTemplate, QuestionTemplate) {

    var AnswerListView = Marionette.CompositeView.extend({
        template: AnswerListTemplate,

        events: {
            'click .answer': 'onItemClick'
        },
        ui: {
            answer: '.answer'
        },

        onItemClick: function(evt) {

            //This is sort of ugly. We're touching the DOM by hand.
            var choice_node = $(evt.currentTarget);
            var choice_name = choice_node.attr('data-name');
            var choice = _.findWhere(this.model.get('choices'), {name: choice_name});

            if( choice.type === 'choice' ) {
                this.ui.answer.removeClass('selected');
                choice_node.addClass('selected');
                this.model.set('val', choice.val);
            } else if ( choice.type === 'choices' ) {
                console.log('yo');
                this.model.set('val', undefined);
                //swap in next set of choices
                this.trigger('subchoice:selected', choice);
            }
        }
    });

    var QuestionView = Marionette.Layout.extend({
        template: QuestionTemplate,

        regions: {
            answers: ".answers-container"
        },
        initialize: function() {
            var that = this;

            this.answers.on('show', function(view){
                that.listenTo(view, 'subchoice:selected', that.onFollowup);
            });
        },

        onRender: function() {
            var alv = new AnswerListView({model: this.model});
            this.answers.show(alv);
        },

        onFollowup: function(choice) {
            var nv = new AnswerListView({model: new QuestionModel(choice)});
            this.answers.show(nv);
        }
    });

    return QuestionView;
});