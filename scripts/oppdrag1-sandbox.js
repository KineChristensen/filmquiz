/***

Movie quiz application. The user must answer 10 questions about movies. They get 4 answer alternatives
on every question. If they answer correctly they get a higher score. If they answer wrong, they get a penalty.
After the last question the final score and how many right answers they got are revealed to the user.
 

Google Fonts
font-family: 'Lobster', cursive; overskrift/logo
font-family: 'Raleway', sans-serif; på innhold

colors:

Purple: #370949
light purple: #4c245b
Yellow: #ffd323
Btn yellow: #e5be20

***/

$(function(){

    //variables
    let i = 0;
    let score = 0;
    let rightCounter = 0;
    let points = 1500;
    let penalty = 500;


    //JSON array
    let questionsJSON = {
        "movies": [
            {
                "id": 001,
                "question": "Hvilket nummer i rekken av Marvel-filmer er 'Avengers: Endgame'?",
                "imgSrc": "avengersendgame.jpg",
                "alt1": "17",
                "alt2": "20",
                "alt3": "22",
                "alt4": "25",
                "answer": "22"
            },
            {
                "id": 002,
                "question": "Hva heter den 4. Harry Potter-filmen?",
                "imgSrc": "harrypotter.jpg",
                "alt1": "The Goblet of Fire",
                "alt2": "The Order of the Phoenix",
                "alt3": "The Half-Blood Prince",
                "alt4": "The Prisoner of Azkaban",
                "answer": "The Goblet of Fire"
            },
            {
                "id": 003,
                "question": "Når kom filmen 'Matrix' ut?",
                "imgSrc": "matrix.jpg",
                "alt1": "1997",
                "alt2": "1999",
                "alt3": "2000",
                "alt4": "2002",
                "answer": "1999"
            },
            {
                "id": 004,
                "question": "Hvilken skuespiller spiller i alle disse filmene?",
                "imgSrc": "movies.jpg",
                "alt1": "Steve Carrell",
                "alt2": "Catherine Keener",
                "alt3": "Emma Stone",
                "alt4": "Ryan Gosling",
                "answer": "Emma Stone"
            },
            {
                "id": 005,
                "question": "Hvilken film er dette bildet hentet fra?",
                "imgSrc": "sci-fi.jpg",
                "alt1": "Moon",
                "alt2": "The Martian",
                "alt3": "Gravity",
                "alt4": "Interstellar",
                "answer": "Interstellar"
            },
            {
                "id": 006,
                "question": "Hvem vant Oscar i 2019 for beste kvinnelige skuespiller?",
                "imgSrc": "oscar.jpg",
                "alt1": "Olivia Colman",
                "alt2": "Rachel Weisz",
                "alt3": "Glenn Close",
                "alt4": "Lady Gaga",
                "answer": "Olivia Colman"
            },
            {
                "id": 007,
                "question": "Hvem har regissert 'Alita: Battle Angel' (2019)?",
                "imgSrc": "alita.jpg",
                "alt1": "George Lucas",
                "alt2": "Steven Spielberg",
                "alt3": "James Cameron",
                "alt4": "Robert Rodriguez",
                "answer": "Robert Rodriguez"
            },
            {
                "id": 008,
                "question": "Hvilken av disse Disney-tegnefilmene har det ennå ikke blitt laget en live-action film av?",
                "imgSrc": "disney.jpg",
                "alt1": "Dumbo",
                "alt2": "Jungelboken",
                "alt3": "Mulan",
                "alt4": "Skjønnheten og udyret",
                "answer": "Mulan"
            },
            {
                "id": 009,
                "question": "Hvilken skuespiller er IKKE med i 'Expendables 3' (2014)",
                "imgSrc": "expendables.jpg",
                "alt1": "Bruce Willis",
                "alt2": "Jason Statham",
                "alt3": "Mel Gibson",
                "alt4": "Terry Crews",
                "answer": "Bruce Willis"
            },
            {
                "id": 010,
                "question": "Hvilken film av regissør Wes Anderson er dette bildet hentet fra?",
                "imgSrc": "drama.jpg",
                "alt1": "Moonrise Kingdom",
                "alt2": "the Royal Tenenbaums",
                "alt3": "Grand Budapest Hotel",
                "alt4": "the Darjeeling Limited",
                "answer": "the Royal Tenenbaums"
            }
        ]
    }

    let numberOfQuestions = questionsJSON.movies.length;


    const init = function(){

        const setEvents = function(){

            $(".start-btn").on("click", function(){
                startGame();
            });

            //checks of the alternative is correct and show the appropriate feedback
            $(".alt").on("click", function(){
                if($(this).val()==questionsJSON.movies[i].answer){
                    rightAnswer();
                }
                else{
                    wrongAnswer();
                }
                $("#question-section").hide("fade", 200);
                $("#score-section").delay(300).show("fade", 200);
            });

            //If all questions have been answered the game is over
            $(".next-btn").on("click", function(){
                if(i==(numberOfQuestions-1)){
                    endGame();
                }
                else{
                    nextQuestion();
                }
            });

            $(".restart-btn").on("click", function(){
                location.reload(true);
            });
            
        }(); //end setEvents
                
        const setGUI = function(){

            $("#question-section, #score-section, #end-section").hide();
            setQuestion();
            setCSS();  

        }(); //end setGUI
        
    }(); //end init



    /*----------APPLICATION LOGIC----------*/


    /*-----------------SET QUESTION-------------*/
    /*Displays the question on the page. The questions are retrieved from questionsJSON*/
    function setQuestion(){

        $("#counter").html((i+1) + "/" + numberOfQuestions);
        $("#question").html(questionsJSON.movies[i].question);
        $(".movie-img").attr("src", "images/oppdrag1/" + questionsJSON.movies[i].imgSrc);
        $(".alt1").val(questionsJSON.movies[i].alt1);
        $(".alt2").val(questionsJSON.movies[i].alt2);
        $(".alt3").val(questionsJSON.movies[i].alt3);
        $(".alt4").val(questionsJSON.movies[i].alt4);
    };

    /*-------------START GAME----------------*/
    /*Start section is hidden, and the first question is displayed*/
    function startGame(){
        $("#start-section").hide("slide", { direction: "right"}, 400);
        $("#question-section").delay(800).show("slide", {direction: "left"}, 400);
    }

    /*--------------RIGHT ANSWER-------------*/
    /*If the correct alternative is clicked, points are added to the score. rightCounter keeps track of
    how many right answers have been answered (This is displayed in the end-section). The user also gets
    feedback whether they answered correct or not. This is shown in the text, the image and the animation on the image.
    Points received are also animated.*/
    function rightAnswer(){
        score = score+points;
        rightCounter++;

        $(".score-img").attr("src", "images/oppdrag1/happypopcorn.png").delay(500).effect("bounce", 1500);
        $("#correct-output").html("Du svarte riktig!");
        $(".points").html(score);
        $("#points-animation").html("+"+points).css("color", "#00821c").show().delay(500).hide("drop", {direction: "up"}, 1000);
    }

    /*----------------WRONG ANSWER-----------*/
    /*If the wrong answer is clicked a penalty of -500 is given. Penalty is only given if the user has more than 0 points.
    The user also get feedback whether they answered correct or not. This is shown in the text,
    the image and the animation on the image. Points deducted are also animated.*/
    function wrongAnswer(){
        if(score>0){
            score = score-penalty;
            $("#points-animation").html("-"+penalty).css("color", "#b20005").show().delay(500).hide("drop", {direction: "up"}, 1000);
        }

        $(".score-img").attr("src", "images/oppdrag1/sadpopcorn.png").delay(500).effect("shake", "slow");
        $("#correct-output").html("Du svarte feil!");
        $(".points").html(score);
    }

    /*-------------------NEXT QUESTION------------*/
    /*Allows the user to go to the next question from the score-page. "i" determines which question is
    displayed from the JSON array*/
    function nextQuestion(){
        i++;
        setQuestion();
        $("#score-section").hide("slide", { direction: "right"}, 400);
        $("#question-section").delay(800).show("slide", {direction: "left"}, 400);
    }

    /*----------END GAME------------*/
    /*When the last question in questionsJSON has been answered, the end section is shown to the user.
    Final total score is displayed, and also how many questions out of the total the user answered correctly.
    If the user has answered more than half of the questions correct they get a "Gratulerer"-message. If it's less
    they get a "Bedre lykke til neste gang" */
    function endGame(){
        let half = numberOfQuestions/2;

        $("#score-section").hide("slide", { direction: "right"}, 400);
        $("#end-section").delay(800).show("slide", {direction: "left"}, 400);
        if(rightCounter>half){
            $(".end-img").attr("src", "images/oppdrag1/winner.png");
            $("#end-output").html("GRATULERER!");
            $("#score-details").html("Du klarte hele " +rightCounter+ " av " +numberOfQuestions+ " spm.");
            $(".points").html(score);
        }
        else{
            $(".end-img").attr("src", "images/oppdrag1/loser.png");
            $("#end-output").html("Auda!");
            $("#score-details").html("Du klarte " +rightCounter+ " av " +numberOfQuestions+ " spm. <br/> Bedre lykke til neste gang!");
            $(".points").html(score);
        }
    }



    /*---------------SET CSS-------------------*/
    /*Adds styling to the page.*/
    function setCSS(){

        //General styling on the whole page
        $("html, body").css(
            {
                "height": "100%",
                "background-color": "#370949"
            }
        );

        $("#main-page-container").css(
            {
                "font-family": "'Raleway', sans-serif",
                "color": "#ffffff",
            }
        );

        $("a").css(
            {
                "text-decoration": "none",
                "color": "#ffffff"
            }
        );

        //Styling for images
        $(".img").css(
            {
                "max-width": "100%",
                "max-height": "250px",
                "margin-bottom": "2rem"
            }
        );

        $(".start-img").css("padding-top", "3rem");

        //header
        $("#header-h1").css(
            {
                "font-family": "'Lobster', cursive",
                "font-size": "3.7em",
                "text-align": "center",
                "padding": "3rem"
            }
        );

        $("#header-h1 a").css("color", "#ffd323");


        //the quiz section
        $("#quiz-main").css(
            {
                "background-color": "#4c245b",
                "height": "42rem",
                "width": "50rem",
                "margin": "auto",
                "border-radius": "1rem",
            }
        );

        $(".quiz-section").css(
            {
                "padding": "3rem",
                "text-align": "center"
            }
        );

        $(".header-h2").css(
            {
                "font-size": "1.6em",
                "font-weight": "700",
                "padding-bottom": "2rem"
            }
        );

        $(".btn").button().css(
            {
                "color": "#000000",
                "font-size": "1.5em",
                "font-weight": "700",
                "padding": "1rem 1.8rem",
                "border": "none",
                "box-shadow": "0 3px 8px #23112b",
            }
        )


        $("#counter").css(
            {
                "padding-bottom": "1rem"
            }
        );

        $("#answer-alt").css(
            {
                "display": "grid",
                "grid-template-columns": "repeat(2, 1fr)",
                "grid-gap": "1rem"
            }
        );

        //the score section
        $(".score").css(
            {
                "padding": "0.5rem 0",
                "font-size": "1.3em",
                "font-weight": "500"
            }
        );

        $("#score-details").css(
            {
                "font-size": "1.4em",
                "font-weight": "500",
                "padding-bottom": "2rem"
            }
        );

        $(".points-wrapper").css(
            {
                "font-size": "1.7em",
                "font-weight": "700",
                "color": "#e5be20",
                "padding-bottom": "2rem",
                "height": "3rem"
            }
        );

        //Footer section
        $("#footer").css(
            {
                "text-align": "center",
                "padding": "3rem 0 2rem",
            }
        );

    };
    //end setCSS

});