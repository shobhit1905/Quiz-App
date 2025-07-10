const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let avaliableQuestions = [];

const scoreText = document.getElementById("score");
const progressText = document.getElementById("progress-text");
const progressBarFull = document.getElementById("progressbar-full");

let questions = [];
fetch("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple")
    .then(
        res => {
            // console.log(res);
            return res.json();
        }
    ).then(loadedQuestions => {
        // console.log(loadedQuestions.results);
        questions = loadedQuestions.results.map(loadedQuestion => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            }
            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
            answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);

            // console.log(answerChoices);

            answerChoices.forEach((choice, index) => {
                formattedQuestion[`choice${index + 1}`] = choice;
            });

            return formattedQuestion;
        });

        // console.log(questions) ;
        // questions = loadedQuestions ;

        startGame() ; 
    })
    .catch(error => {
        console.log(error);
    });

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 8;

startGame = () => {
    questionCounter = 0;
    score = 0;
    avaliableQuestions = [...questions];
    // console.log(avaliableQuestions);
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {

    if (avaliableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        // go to the end page
        return window.location.assign("../End/end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    // Update the progress bar
    progressBarFull.style.width = `${questionCounter / MAX_QUESTIONS * 100}%`;
    const questionIndex = Math.floor(Math.random() * avaliableQuestions.length);
    currentQuestion = avaliableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        let choiceId = choice.getAttribute("id");
        choice.innerText = currentQuestion[choiceId];
    });

    avaliableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};


choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswerNumber = selectedChoice.getAttribute("data-number");
        const classToApply = (parseInt(selectedAnswerNumber) === currentQuestion.answer) ? "correct" : "incorrect";
        // console.log(classToApply) ;

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
}
