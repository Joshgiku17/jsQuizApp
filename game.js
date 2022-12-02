const question= document.getElementById("question");
const choice=Array.from(document.getElementsByClassName('choice-text'));
let currentQuestion={};
let acceptingAnswers=false;/*This is the delay to accept the answer💡*/
let score=0;
const progressText=document.getElementById('progressText');
const scoreText=document.getElementById('score');
const progressBarFull=document.getElementById('progress-bar-full');
let questionCounter=0;
let availableQuestion=[];/* a copy of 4 question set to be used to provide a unique question for a user */
let questions =[
    {
    question:"Inside which Element do we put the Javascript",
    choice1:"<script>",
    choice2: '<javascript>',
    choice3:"<js>",
    choice4:"<scripting>",
    answer:1
    },
    {
      question:"What is the correct syntax for reffering to an external script",
      choice1: "<script href='x.js'>",
      choice2:'<script name="x.js>',
      choice3:"<script src='x.js>",
      choice4: 'none of the above',
      answer:3

    },
    {
        question:"How do you write 'hello world' in alert box?",
        choice1:"msgBox('Hello world)",
        choice2:"alertBox('Hello world')",
        choice3:"msg('Hello world')",
        choice4:"alert('Hello world')",
        answer:4
    }
];
// CONSTANTS 
const CORRECT_BONUS=10;
const MAX_QUESTIONS=3;

//FUNCTION TO START THE GAME
startgame =()=>{
    questionCounter=0;
    score=0;
    availableQuestion= [...questions] //the Spread method; opposite to the rest method to copy and spread the content
    // console.log(availableQuestion)
    getNewQuestion();
}
getNewQuestion=()=>{
    if(availableQuestion.length===0 || questionCounter>= MAX_QUESTIONS){
        //REDIRECT TO THE END PAGE
        localStorage.setItem("mostRecentScore",score); //👈🏾👈🏾 saves the score 
        return window.location.assign("/end.html");
    }
    questionCounter++;
    progressText.innerText= 'Question '+questionCounter+ '/' + MAX_QUESTIONS;
    //update the progress bar
    
    progressBarFull.style.width =`${(questionCounter / MAX_QUESTIONS)*100}%`;
    /In this syntax above, the % represents that the value should be in percentage. not pixels/ 


    //this Math.floor(Math.random()*3) is used to get a random integer basing on the length of the availableQuestion[]
    const questionIndex=Math.floor(Math.random()  *availableQuestion.length);
    currentQuestion= availableQuestion[questionIndex];//I'm alittle confused here.😒 //this is the position of a random question ✔✔
    question.innerText=currentQuestion.question; //dynamically writing the question in the html document
    choice.forEach(choice =>{
        const number=choice.dataset['gikundiro'];
        choice.innerText=currentQuestion['choice' + number];
    });
    availableQuestion.splice(questionIndex, 1)//the syntax of array.splice is arrayName.splice(indexOfItemToBeRemoved, number of items to be removed) 😎 
    //removes the random question such that it won't proceed bringing back the previously  answered question
    acceptingAnswers=true;
}
//ADDEVENTLISTENERS
choice.forEach(choice=>{
    choice.addEventListener('click',e=>{
        if(!acceptingAnswers)return;
        acceptingAnswers=false;
        const selectedChoice=e.target;
        const selectedAnswer=selectedChoice.dataset['gikundiro'];
        //then create a variable to display whether the answer is correct or incorrect
        const classToApply= selectedAnswer==currentQuestion.answer ? 'correct':'incorrect'; 
        if(classToApply==='correct'){
             incrementScore(CORRECT_BONUS);
        }
        //👇🏾👇🏾👇🏾is to get the container element//apply class in js using classList.
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout( ()=>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        },1000);

    })
}
    )
// getNewQuestion()
incrementScore= num=>{
    score+=num;
    scoreText.innerText=score;
}
startgame()