const xhr = new XMLHttpRequest();
// getting the json files 
// this method deparated recommaned to do this asynctricly  for better user experince 
xhr.open('GET', './Apprentice_TandemFor400_Data.json', false);
xhr.send();

const questionList = JSON.parse(xhr.responseText);

// gets a random set of unique numbers
// meaning there is no repeats

// this will generate a unique list of number
// maxLength meaning what is the largest possible number you want
// max is how many random numbers you want 
// for example if my maxLength is 10 my largest random number will be 10
// and if my max is 4 this will return 4 numbers
const randomQuestion = (maxLength, max ) =>{
    const question = [];
    while(question.length < max){
        const e = Math.floor(Math.random() * maxLength );
        if(question.indexOf(e) === - 1 ) question.push(e);
    } 
    return question
}
let correct = 0;
let currentQuestion  = 0; 
let randomQuestionList = [];
let multiple = [];

randomQuestionList = randomQuestion(questionList.length, 20)


// grads all the answer and adds a event listener  to each the answer 
const selectAnswer = () =>{
    const addEvent = document.querySelectorAll('.answer ol li ');

    addEvent.forEach(element => {
        element.addEventListener('click' , ()=>{
           if(element.textContent === questionList[randomQuestionList[currentQuestion]].correct){
               alert('correct')
               correct++;
               deleteQuestion();
           }
           else{
               alert(`                         incorret
         correct answer: ${questionList[randomQuestionList[currentQuestion]].correct}
               `)
               deleteQuestion();
           }

        })
    });

}

// this will get a random question from the list 
// this will also randomise the answer order


const createQuestion = () =>{
    
    if(currentQuestion === 10){
        return alert(`
            Done 
            number question anwsered correctly:${correct}
        `)
    }

    for(let i = 0; i< 3; i++){
        multiple.push(questionList[randomQuestionList[currentQuestion]].incorrect[i]);
    }
    multiple.push(questionList[randomQuestionList[currentQuestion]].correct);

    const question = randomQuestion(4,4);


    // makes the qustion
    // gets the multiple chose 

    // get the question and adds to the dom
    // it will also have the answer be slected 
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

// gets rid of the question and answser and will
//  create  a random question with the createQuestion
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

