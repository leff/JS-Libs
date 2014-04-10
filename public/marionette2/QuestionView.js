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


        initialize: function() {

            //This only handles 2 level questions
            //but it does so by accepting the whole model, but only acting on a subset (the sub question)
            if( this.options.choice_name ) {
                var choice_in_question = _.findWhere(this.model.get('choices'), {name: this.options.choice_name});
                this.choices = choice_in_question.choices;
            } else {
                this.choices = this.model.get('choices');
            }
        },

        serializeData: function() {
            return {
                choices: this.choices
            };
        },

        onItemClick: function(evt) {

            //This is sort of ugly. We're touching the DOM by hand.
            var choice_node = $(evt.currentTarget);
            var choice_name = choice_node.attr('data-name');
            var choice = _.findWhere(this.choices, {name: choice_name});

            if( choice.type === 'choice' ) {
                this.ui.answer.removeClass('selected');
                choice_node.addClass('selected');
                this.model.set('val', choice.val);
            } else if ( choice.type === 'choices' ) {
                //swap in next set of choices
                this.trigger('subchoice:selected', choice_name);
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
            'change': '.change',
            'status': '.status-indicator'
        },

        events: {
            'click @ui.change': 'onChangeClick'
        },

        modelEvents: {
            'change': 'onModelChange'
        },

        initialize: function() {
            var that = this;

            this.answers.on('show', function(view){
                that.listenTo(view, 'subchoice:selected', that.onFollowup);
            });

        },

        onRender: function() {
            this.ui.status.hide();
            this._initQuestion();
            this.current_value.show( new CurrentValueView({model: this.model}) );
        },

        _initQuestion: function() {
            var alv = new AnswerListView({model: this.model});
            this.answers.show(alv);
            this.ui.change.hide();
            this.model.set('val', undefined);
        },

        onFollowup: function(choice_name) {
            this.model.set('val', undefined);
            this.ui.change.show();
            var nv = new AnswerListView({model: this.model, choice_name: choice_name});
            this.answers.show(nv);
        },

        onChangeClick: function() {
            this._initQuestion();
        },

        onModelChange: function(model) {
            if( model.changed.val ) {
                this.ui.status.show();
            } else {
                this.ui.status.hide();
            }
        }

    });

    return QuestionView;
});