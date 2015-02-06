// Code goes here
$(document).ready(function () {

    var quizModel = {
        currentQuestion: 0,
        correctAnswers: 0,



        init: function() {
            "use strict";
            quizView.addForm();
            quizController.quizLoop();
        },
        getJson: function() {
            "use strict";
            var json = null;
            $.ajax({
                type: 'GET',
                url: 'package.json',
                dataType: 'json',
                global: false,
                async: false,
                success: function(data) {
                    json = data;
                }
            });
            return json;
        },
//        quizAnswers: quizController.getAnswerArray(),
        userAnswers: [],
        answerState: true


    };
    quizModel.answerDatabase = quizModel.getJson();
    console.log(quizModel.answerDatabase);

    var quizView = {
        addQuestion: function() {
            "use strict";
            var choices = quizController.choices();
            for(var i = 1, choicesL = choices.length + 1; i < choicesL; i++) {
                var name = "name" + i,
                    input = $('<input>').attr({
                        type: 'radio',
                        id: name,
                        value: i
                }),
                    choice = choices[i - 1],
                    label = $('<label for="' + name + '">').html(choice);
                $('#form').append(label).append(input);
            }
//            this.addButton();
        },
        removeQuestion: function() {
            $('div.form').find('h1').remove();
            $('#form').children().remove();
        },
        addButton: function() {
            "use strict";
            if(quizModel.currentQuestion !== 0) {
                $(".form").append('<button value="next" class="next">next</button>').append('<button value="previous" class="prev">previous</button>');
            } else {
                $(".form").append('<button value="next" class="next">next</button>');
            }
        },
        addForm: function() {
            "use strict";
            $('.quiz').append('<div class="form"></div>');
            $('.form').append('<form id="form"></form>');
            quizView.addTitle();
        },
        addTitle: function() {
            "use strict";
            var q = quizModel.currentQuestion;
            var currentQuestion = quizModel.answerDatabase.allQuestions[q].question;

            if($(".form h1").length === 0) {
                $(".form").prepend("<h1 class='fadeInLeft'>" + currentQuestion + "</h1>");
                return true;
            } else { alert ("error!")}
        },
        removeCheckedChildren: function() {
            "use strict";
            $(this).siblings().prop('checked', false);
            var val = $(this).val();
            quizController.validateAnswer(val);
        }
    };

    var quizController = {
        addCurrentQuestion: function() {
            "use strict";
            quizModel.currentQuestion += 1;
        },
        remCurrentQuestion: function() {
            "use strict";
            quizModel.currentQuestion -= 1;
        },
        choices: function() {
            "use strict";
            var q = quizModel.currentQuestion;
            return quizModel.answerDatabase.allQuestions[q].choices;
        },
        correctAnswer: function() {
            "use strict";
            var q = quizModel.currentQuestion;
            return quizModel.answerDatabase.allQuestions[q].correctAnswer;
        },
        currentQuestion: function() {
            "use strict";
            var q = quizmodel.currentQuestion;
            return quizModel.answerDatabase.allQuestions[q].currentQuestion;
        },
        totalQuestions: function() {
            "use strict";
            return quizModel.answerDatabase.allQuestions.length;
        },
        quizLoop: function() {
            "use strict";
            var totalQuestions = this.totalQuestions();
            console.log(totalQuestions);
                if (quizModel.currentQuestion < totalQuestions) {
                    if (quizModel.currentQuestion === 0) { // first question
                        quizView.addQuestion();
                        quizView.addButton();
                        this.addCurrentQuestion();
                    } else { // rest of the questions
                        quizView.removeQuestion();
                        quizView.addTitle();
                        quizView.addQuestion();
                    }
                } else {
                    alert("the end");
                }
        },
        getAnswerArray: function() {
            "use strict";
            var answerArray = [];
            var answersLength = this.totalQuestions();
            for (var i = 0; i < answersLength; i++) {
                answerArray.push(quizModel.answerDatabase.allQuestions[i].correctAnswer);
            }
            return answerArray;
        },
        validateAnswer: function(val) {
            "use strict";
            var userAnswer = [];
            userAnswer.push(val);
            return function() {
                return userAnswer.pop();
            }
        },
        addUserAnswer: function() {
            "use strict";
            var answer = this.validateAnswer();
            var realAnswer = answer();
            quizModel.userAnswers.push(realAnswer);
        }
     };



    $(document.body).on('click', 'button.next', function() {
        "use strict";
        quizController.addUserAnswer();
        quizController.quizLoop();
        console.log(quizModel.userAnswers);
    });

    $('button#start').on('click', function() {
        "use strict";
        $('.start').remove();
        quizModel.init();
    });

    $(document.body).on('click', '#form input:radio', quizView.removeCheckedChildren);

    $('button#submit').on('click', function(e) {
        "use strict";

        var name = $("form").find("#name").val();

        checkCookie(name)

    });

    function checkCookie(name) {
        "use strict";
        var user = getCookie(name);
        if(user != "") {
            alert("welcome back " + user);
        } else {
            setCookie("username", user, 30);
        }
    }

    function setCookie(cname,cvalue,exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname+"="+cvalue+"; "+expires;
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
});