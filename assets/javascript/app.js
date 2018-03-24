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
    var time = 30;

    $("#start-button").on("click", function(){
        startGame();
        $("#timer").html("<h2>30</h2>");
    });

    function reset() {
        time = 30;
        $("#timer").html("<h2>30</h2>");

        $("#result").text("");
    }

    function startGame() {
        $("#start-button").remove();

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
                    }
                    else {
                        $("#result").append("<p>" + "Sorry... The correct answer was " + "<b>" + questions[i].answer + "</b>" + "</p>");
                    }
                    stop();

                    setTimeout(function(){
                        gameLoop(i+1);
                        reset();
                    }, 4000);
                });

                setTimeout(function(){
                    gameLoop(i+1);
                }, 30000);
                // Run gameLoop function every 30 seconds

                interval = setInterval(decrementTime, 1000);
                // This is saying - run decrementTime function every 1 second

            }
        }
        gameLoop(0);
    }


    function decrementTime() {

        time--;

        $("#timer").html("<h2>" + time + "</h2>");

        if (time === 0) {
            stop();
            reset();
        }
    }

    function stop() {
        clearInterval(interval);
    }
});
