
define(function() {


    // In real life, this would be injected by python
    // also, it would be a list, rather just one
    // also, it would be json rather than a hand coded object literal
    return {
        question_json: {
            name: 'sandwich',
            text: 'What kind of sandwich do you have?',
            type: 'choices',
            choices: [
                {
                    type: 'choice',
                    name: 'club',
                    text: 'Club',
                    img: 'sandwich-club.png',
                    val: '1'
                },
                {
                    type: 'choice',
                    name: 'ruben',
                    text: 'Ruben',
                    img: 'sandwich-ruben.png',
                    val: '2'
                },
                {
                    type: 'choice',
                    name: 'hamburger',
                    text: 'Hamburger',
                    img: 'sandwich-burger.png',
                    val: '3'
                },
                {
                    type: 'choices',
                    name: 'big',
                    text: 'Big Sandwich',
                    img: 'sandwich-big.png',
                    choices: [
                        {
                            type: 'choice',
                            name: 'hoagie',
                            text: 'Hoagie',
                            img: 'sandwich-hoagie.png',
                            val: '4'
                        },
                        {
                            type: 'choice',
                            name: 'sub',
                            text: 'Submarine',
                            img: 'sandwich-sub.png',
                            val: '5'
                        },
                        {
                            type: 'choice',
                            name: 'grinder',
                            text: 'Grinder',
                            img: 'sandwich-grinder.png',
                            val: '6'
                        }
                    ]
                }
            ]
        }
    };
});