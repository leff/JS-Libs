define(['backbone', 'marionette', 'QuestionModel', 'tpl!templates/AnswerListTemplate.html', 'tpl!templates/QuestionTemplate.html'],
function(Backbone, Marionette, QuestionModel, AnswerListTemplate, QuestionTemplate) {

    var CurrentValueView = Marionette.ItemView.extend({
        template: '#current-value-template',
        modelEvents: {
            'change': 'onModelChange'
        },

        onModelChange: function() {
            this.render();
        }
    });

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
                this.model.set('val', undefined);
                //swap in next set of choices
                this.trigger('subchoice:selected', choice);
            }
        }
    });

    var QuestionView = Marionette.Layout.extend({
        template: QuestionTemplate,

        regions: {
            answers: ".answers-container",
            current_value: ".current-value"
        },

        ui: {
            'change': '.change'
        },

        events: {
            'click @ui.change': 'onChangeClick'
        },

        initialize: function() {
            var that = this;

            this.answers.on('show', function(view){
                that.listenTo(view, 'subchoice:selected', that.onFollowup);
            });
        },

        onRender: function() {
            this._initQuestion();
            this.current_value.show( new CurrentValueView({model: this.model}) );
        },

        _initQuestion: function() {
            var alv = new AnswerListView({model: this.model});
            this.answers.show(alv);
            this.ui.change.hide();
        },

        onFollowup: function(choice) {
            this.ui.change.show();
            var nv = new AnswerListView({model: new QuestionModel(choice)});
            this.answers.show(nv);
        },

        onChangeClick: function() {
            this._initQuestion();
        }

    });

    return QuestionView;
});