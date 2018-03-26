$(document).ready(function(){

    var questions = [
        {
            question: "Which Pokemon was the first Pokemon ever created?",
            answer: "Rhydon",
            choices: ["Pikachu", "Rhydon", "Bulbasaur", "Mew"]
        },
        {
            question: "Which Pokemon is the tallest Pokemon in the game?",
            answer: "Wailord",
            choices: ["Mega Steelix", "Primal Kyogre", "Mega Rayquaza", "Wailord"]
        },
        {
            question: "Which Pokemon type is not immune to another Pokemon type?",
            answer: "Water",
            choices: ["Ground", "Normal", "Water", "Steel"]
        }
    ];

    var interval;
    var time = 10;

    $("#start-button").on("click", function(){
        startGame();
        $("#timer").html("<h2>10</h2>");
    });

    function reset() {
        time = 10;
        $("#timer").html("<h2>10</h2>");

        $("#result").text("");
    }

    function startGame() {
        $("#start-button").remove();

        var correctAnswers = 0,
        incorrectAnswers = 0;

        var gameLoop = function(i) {
            if (questions[i]) {
                console.log(questions[i]);
                clearInterval(interval);

                $("#question").html("<h4>" + questions[i].question + "</h4>");

                $.each(questions[i].choices, function(index, value){
                    $("#choices").append("<p>" + value + "</p>");
                    $("#choices p").attr("class", "choice");
                });
                
                $(".choice").on("click", function(){
                    console.log(this.innerHTML);
                    $("#choices p").remove();
                    if (this.innerHTML === questions[i].answer) {
                        $("#result").append("<p>" + "CORRECT!" + "</p>");
                        correctAnswers++;
                    }
                    else {
                        $("#result").append("<p>" + "Sorry... The correct answer was " + "<b>" + questions[i].answer + "</b>" + "</p>");
                        incorrectAnswers++;
                    }
                    stop();

                    setTimeout(function(){
                        gameLoop(i+1);
                        reset();
                    }, 3000);
                });

                function decrementTime() {

                    time--;
            
                    $("#timer").html("<h2>" + time + "</h2>");
            
                    if (time === 0) {
                        $("#choices p").remove();
                        stop();
                        $("#result").append("<p>" + "Sorry... The correct answer was " + "<b>" + questions[i].answer + "</b>" + "</p>");
                        incorrectAnswers++;

                        setTimeout(function(){
                            gameLoop(i+1);
                            reset();
                        }, 4000);
                    }
                }
                interval = setInterval(decrementTime, 1000);
                // Run decrementTime function every 1 second
            } else {
                $("#question").html("");

                // Create a div to hold the results
                var resultsDiv = $("<div>");
                $("#game-results").append(resultsDiv);

                var correct = $("<p>Correct Answers: " + correctAnswers + "</p>");
                var incorrect = $("<p>Incorrect Answers: " + incorrectAnswers + "</p>");
                var doneButton = $("<button class='btn btn-lg btn-danger btn-block'>" + "START OVER" + "</button>");

                $(resultsDiv).append(correct);
                $(resultsDiv).append(incorrect);
                $(resultsDiv).append(doneButton);

                $(doneButton).on("click", function(){
                    startGame();
                    $(doneButton).remove();
                    $(resultsDiv).remove();
                });
            }
        }
        gameLoop(0);
    }

    function stop() {
        clearInterval(interval);
    }
});