const username= document.getElementById('username'); 
const saveScoreBtn=document.getElementById('saveScoreBtn');
const finalScore=document.getElementById('finalScore');
const mostRecentScore=localStorage.getItem('mostRecentScore');

const highScores= JSON.parse(localStorage.getItem('highScores'))|| [];
// console.log(highScores);
finalScore.innerText= mostRecentScore;
username.addEventListener("keyup", () => {
    saveScoreBtn.disabled= !username.value; //this statement means that the button save button should be disable if not value entered into the username

});

saveHighScore = e => {
    console.log('clicked the save button !');
    e.preventDefault();//this prevents from taking it to a different page
}
const score= {
    score: mostRecentScore,
    name:username.value
};

// highScores.push(score);
// console.log(highScores);
// console.log(score)
//💡⚡By default, data is stored in local storage as strings not arrays !!!
//😎⚡to change it use the JSON.stringify and JSON.parse. i.e localStorage.setItem('highScores', JSON.stringify(['test1',17,'Arrayelement'])); console.log(jSON.parse(localStorage.getItem("highScores")));
