const highScoresList = document.getElementById("highscore-list") ;
const highScores = JSON.parse(localStorage.getItem("highscores")) || [] ;

highScoresList.innerHTML = 
highScores.map(score => {
    return `<li class="high-scores"><p id="highscore-name">${score.name}</p>  <p id="highscore-score">${score.score}<p></li>` ;
}).join("");