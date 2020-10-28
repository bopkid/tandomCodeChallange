const xhr = new XMLHttpRequest();

xhr.open('GET', './Apprentice_TandemFor400_Data.json', false);
xhr.send();

const questionList = JSON.parse(xhr.responseText);

// gets a random set of unique numbers
// meaning there is no repeats

const randomQuestion = (maxLength, max ) =>{
    const question = [];
    while(question.length < max){
        const e = Math.floor(Math.random() * maxLength );
        if(question.indexOf(e) === - 1 ) question.push(e);
    } 
    return question
}

let currentQuestion  = 0; 
let randomQuestionList = [];
let multiple = [];

randomQuestionList = randomQuestion(questionList.length, 20)
console.log(randomQuestionList)
const selectAnswer = () =>{
    const addEvent = document.querySelectorAll('.answer ol li ');
    console.log('clicking')
    addEvent.forEach(element => {
        element.addEventListener('click' , ()=>{
           if(element.textContent === questionList[randomQuestionList[currentQuestion]].correct){
               alert('correct')
               deleteQuestion();
           }
           else{
               alert('incorrect')
               deleteQuestion();
           }

        })
    });

}


const createQuestion = () =>{
    
    if(currentQuestion === 10){
        return alert('done')
    }

    for(let i = 0; i< 3; i++){
        multiple.push(questionList[randomQuestionList[currentQuestion]].incorrect[i]);
    }
    multiple.push(questionList[randomQuestionList[currentQuestion]].correct);

    const question = randomQuestion(4,4);

    // console.log(json_object[random[0]]);
    // makes the qustion
    // gets the multiple chose 

    // get the question and adds to the dom
    const questionArea = document.querySelector('.question');
    const questionMultiple  = document.querySelector('.answer');
    const questionMultipleAnswer = document.createElement('ol');

    const questionString = document.createTextNode(questionList[randomQuestionList[currentQuestion]].question);
    const questionElement = document.createElement('p');

    questionElement.appendChild(questionString);
    questionArea.appendChild(questionElement);
    for(let i= 0 ; i< 4; i++){

    let questionMultipleAnswers = document.createElement('li');
    let currentAnswer =   document.createTextNode(multiple[question[i]]);

    questionMultipleAnswers.appendChild(currentAnswer);
    questionMultipleAnswer.appendChild(questionMultipleAnswers);
    questionMultiple.appendChild(questionMultipleAnswer);
    }
   selectAnswer()
}
const deleteQuestion = () =>{

    const questionContainer = document.querySelector('.question');
    const question = document.querySelector('p');

    const answer = document.querySelector('.answer');
    const answers = document.querySelector('.answer ol');

    questionContainer.removeChild(question);
  
   
    while(answers.firstChild){
        answers.removeChild(answers.firstChild)
    }
    answer.removeChild(answers)
    multiple =[];
   

    currentQuestion ++;
    createQuestion()
}




createQuestion()

