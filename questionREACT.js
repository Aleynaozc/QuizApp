let QUESTIONS = [];
let htmlquestions=[];
let reactquestions=[];
let activeQuestionIndex = 0,
    questionsCount = 0,
    selectedAnswer,
    interval = 0,
    time,
    counter,
    timeValue = 30,
    totalCorrectChoise = 0;
const modal = document.querySelector(".quiz__modal");
const closePage = document.getElementById('closePage')
const timeCount = document.querySelector('.timer');
const cssBtn=document.querySelector('#CssBtn');

// CONTAINER BACKGROUND CHANGE
const containerHtml=document.querySelector('.container');
containerHtml.style.backgroundImage = 'url(./assets/images/react.jpg)';
//NEXT BUTTON CSS CHANGE
const nextBtn=document.querySelector('.next__title');
nextBtn.style.backgroundColor='#c3d5e2';
nextBtn.style.border='1px solid rgb(0, 91, 140)';
nextBtn.style.color=' rgb(0, 91, 140)';


const getQuestions = () => {
    fetch("./questions.json")
        .then((res) => {
            return res.json();
        })
        .then((questions) => {
            QUESTIONS = questions.REACT;
            questionsCount=QUESTIONS.length;
           
        });

};


const updateQuizOrder = () => {

    let quizOrderEl = document.querySelector("#quizOrder");
    quizOrderEl.innerHTML = 'Question ' + parseInt(activeQuestionIndex + 1) + ' of ' + questionsCount;

    if (activeQuestionIndex == questionsCount - 1) {
        document.querySelector('.next__title').innerHTML = 'COMPLETE'
    }
    updateQuestion();

};

const createQuestionAnswer = (activeQuestion) => {
    let questionAnswerHTML = "";
    activeQuestion.answers.forEach(answer => {
        questionAnswerHTML +=
            `<div class="answer__button"  id="answerButton" data-id="${answer.id}" onclick="selectChoice(this) ">
        <p class="question__answer "> ${answer.text}</p>
        </div>`;
    });
    return questionAnswerHTML;
};

const updateQuestion = () => {
    const activeQuestion = QUESTIONS[activeQuestionIndex];
    let questionHTML = ` <div class="questions__area">
    <p class="questions-title"> ${activeQuestion.text} </p>
    </div>
    <div class="answer__area__container">
           ${createQuestionAnswer(activeQuestion)}
    </div>
    `;
    const questionContainerEl = document.querySelector('#questionContainer')
    questionContainerEl.innerHTML = questionHTML;
}
//Select Button
const selectChoice = (el) => {

    const questionAnswerEls = Array.from(
        document.querySelectorAll(".answer__button")
    );
    questionAnswerEls.find((el) => {
        if (el.classList.contains("answer__color__change","react"))
            el.classList.remove("answer__color__change","react");

    });

    selectedAnswer = el.dataset.id;
    el.classList.add("answer__color__change","react")

};

const checkAnswer = () => {
    const selectedAnswerObj = QUESTIONS[activeQuestionIndex].answers.find(
        (a) => a.id == selectedAnswer
    );
    if (selectedAnswerObj.isCorrect)
        totalCorrectChoise++;
        selectedAnswer=null;
}


const nextQuestion = () => {
    if (selectedAnswer) {
        checkAnswer();
        if (activeQuestionIndex < questionsCount - 1) {
            clearInterval(counter);
            startTimer(timeValue);
            activeQuestionIndex++;
            updateQuizOrder();
        } else { // OPEN CONGRAT MODAL IF U'RE DONE successfully
            clearInterval(counter);
            updateQuizOrder();
            if (totalCorrectChoise == questionsCount) {
                setTimeout(() => {
                    let modalHTML = ` <img class="modal-gif" src="assets/images/party.gif">
                    `;
                    modal.innerHTML = modalHTML;
                   
                    modal.classList.add("show");
                },100);
                setTimeout(() => {
                    let modaleHTML = `
                <p class="cong-text">YOU'r the BEST ! </p>
                `;
                modal.innerHTML = modaleHTML;
                modal.classList.add("show");
                },1200);
                setTimeout(closeModal, 3000)

            } else { //OPEN REPEAT MODAL
                let modalHTML = ` <div class="repat__modal">
            <button class="repat-button" onclick="repatQuiz()">Repat Again</button>
        </div>
        `;
                modal.innerHTML = modalHTML;
                modal.classList.add("show");
            }

        }

    }

}
//Close congrats modal
const closeModal = () => {
    if (totalCorrectChoise == questionsCount) {
        window.location.href = "mainpage.html";
        modal.classList.remove("show");
    }

}


//Close Question Page/Return Main PAge
const closeQuestionPage = () => {

    window.location.href = "mainpage.html";
    
}
closePage.addEventListener('click', closeQuestionPage);


//COUNTDOWN COUNTER
function startTimer(time) {
    counter = setInterval(timer, 1000)
    function timer() {

        timeCount.textContent = time;
        time--;

        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            document.querySelector('.timer').innerHTML = 'DONE'
            //When time end button will be disabled.
            const allOptions = questionContainer.children.length;
            for (i = 0; i < allOptions; i++) {
                questionContainer.children[i].classList.add("disabled"); //once user select an option then disabled all options
                document.querySelector('.next__question__button').classList.add('next__button-show');
            }
        

        }
    }


}
window.onload = function () {
    startTimer(timeValue);
}


//Close repeat Modal
const closeRepeatModal = () => {
    modal.classList.remove("show");
}

const repatQuiz = () => {
    activeQuestionIndex = 0,
    selectedAnswer = undefined;
    totalCorrectChoise = 0;
    timeValue = 30;
    updateQuizOrder();
    closeRepeatModal();
    clearInterval(counter);
    startTimer(timeValue);
    document.querySelector('.next__title').innerHTML = 'NEXT'
}




getQuestions();
setTimeout(() => {
    updateQuizOrder();

}, 100);

