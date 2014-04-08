
define(function() {


    // In real life, this would be injected by python
    // also, it would be a list, rather just one
    // also, it would be json rather than a hand coded object literal
    return {
        question_json: {
            name: 'sandwich',
            question_text: 'What kind of sandwich do you have?',
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
                    type: 'choices',
                    text: 'Big Sandwich',
                    img: 'sandwich-big.png',
                    choices: [
                        {
                            type: 'choice',
                            text: 'Hoagie',
                            img: 'sandwich-hoagie.png',
                            value: '4'
                        },
                        {
                            type: 'choice',
                            text: 'Submarine',
                            img: 'sandwich-sub.png',
                            value: '5'
                        },
                        {
                            type: 'choice',
                            text: 'Grinder',
                            img: 'sandwich-grinder.png',
                            value: '6'
                        }
                    ]
                }
            ]
        }
    };
});