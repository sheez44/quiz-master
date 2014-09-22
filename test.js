// Code goes here
$(document).ready(function () {
    var allQuestions;
     $.getJSON('package.json', function(data) {
       var allQuestions = [];
       for (var i in data.allQuestions) {
         var dta = data.allQuestions[i];
         allQuestions.push(dta);
       }
    });

    var allQuestions;

    var correctAnswers = 0;
    var currentQuestion = 0;

    var answer = allQuestions[currentQuestion].choices[allQuestions[currentQuestion].correctAnswer];

    function init() {
        var question = allQuestions[currentQuestion].question;
        var $questions = $(".form input");

        $questions.each(function (index) {
            var choices = allQuestions[currentQuestion].choices[index];
            $(this).next().text(choices);
        });

        $("<h2></h2>").text(question).insertBefore("form");
        $("<button>Next</button>").addClass("next").prop("disabled",true).on('click', addQuestion).insertAfter("form");
    }

    function addView() {
        var $input = $("#form").children(); // $('#form input')
        hasChanged = 0;

        $("h2, button").remove();
        $input.prop('checked', false);

        var question = allQuestions[currentQuestion].question;

        var $questions = $(".form input");

        $questions.each(function (index) {
            var choices = allQuestions[currentQuestion].choices[index];
            $(this).next().text(choices);
        });

        $("<h2></h2>").text(question).insertBefore("form");
        $("<button>Next</button>").addClass("next").prop("disabled", true).on('click', addQuestion).insertAfter("form");
    }

    function addQuestion() {
        if (currentQuestion < allQuestions.length -1) {
            currentQuestion++;
            addView();
        } else {
            $(".next").on("click", endOfQuiz);
        }
    }

    function endOfQuiz() {
        var text;
        if (correctAnswers <=4) {
            text = "Unfortunately you only answered " + correctAnswers + " answers correctly";
        } else if (correctAnswers <=7) {
            text = "Not bad, you answered " + correctAnswers + " answers correctly";
        } else {
            text = "Well done! you answered " + correctAnswers + " answers correctly";
        }
        $(".quiz").hide();
        $(".end").show();
        $("<h2></h2>").text(text).insertAfter(".end h1");

    }

    function checkUserInput() {
        var isChecked = $('input[name=group1]:checked').length;
        hasChanged++;
        if (isChecked) {
            $(".form").find(".next").prop("disabled", false);
            var answer = $('input[name=group1]:checked', '#form').next().text();
            checkAnswer(answer);
        } else {
            return false;
        }
    }

    var hasChanged = 0; // Created to keep track of input changes by the users so that the correctAnswers variable is correctly displayed
    function checkAnswer(answer) {
        var correctAnswer = allQuestions[currentQuestion].correctAnswer;
        var indexAnswer = allQuestions[currentQuestion].choices[correctAnswer];
        if (indexAnswer == answer && hasChanged == 1 ) {
               correctAnswers++;
            } else {
            console.log("answer is not correct!");
            return false;
        }
    }

    $("#start").on("click", function () {
        $(".start").hide();
        $(".quiz").find(".form").removeClass("hidden");

        init();
    });

    var $userInput = $("#form").find("input");

    $userInput.on("change", checkUserInput);
});;