// Code goes here
$(document).ready(function () {

    var quizModel = {
        currentQuestion: 0,
        correctAnswers: 0,

        init: function() {
            "use strict";
            quizView.addForm();
            quizView.addQuestion();
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
        }
//        answerDatabase: this.getJson()
    };
    quizModel.answerDatabase = quizModel.getJson();

    var quizView = {
        addQuestion: function() {
            "use strict";
            for(var i = 1; i < 5; i++) {
                var name = "name" + i,
                    input = $('<input>').attr({
                        type: 'radio',
                        id: name,
                        value: name
                }),
                    label = $('<label for="' + name + '">').html("hallo");
                $('#form').append(input).append(label);
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
                $(".form").prepend("<h1>" + currentQuestion + "</h1>");
                return true;
            } else { alert ("error!")}
        }
    };

    var quizController = {
        addCurrentQuestion: function() {
            "use strict";
            quiz.currentQuestion += 1;
        },
        remCurrentQuestion: function() {
            "use strict";
            quiz.currentQuestion += 1;
        },
        answers: function() {
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
        }

    };

    console.log(quizController.answers());
    $('button#start').on('click', function() {
        "use strict";
        $('.start').remove();
        quizModel.init();
    });
});