const username = document.getElementById("username") ;
const saveScoreBtn = document.getElementById("save-score") ;
const mostRecentScore = localStorage.getItem("mostRecentScore") ;
const finalScore = document.getElementById("final-score") ;
finalScore.innerText = mostRecentScore ;

const MAX_HIGH_SCORES = 5;

const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
console.log(highscores) ;

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value ;
}) ;

function saveHighScore(event){
    event.preventDefault() ;
    const finalScore = localStorage.getItem("mostRecentScore") ;
    const score = {
        score : Number(finalScore) ,
        name : username.value
    } ;

    highscores.push(score) ;
    highscores.sort((a,b) => b.score - a.score) ; 
    highscores.splice(10) ;

    localStorage.setItem("highscores", JSON.stringify(highscores)) ;
    window.location.assign("../Home/index.html") ;
}