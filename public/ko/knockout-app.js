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



ko.applyBindings({questions: questions_json});