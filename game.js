const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is her favourite colour?',
        choice1: 'Teal Blue',
        choice2: 'Red',
        choice3: 'Turquoise',
        choice4: 'Salmon',
        answer: 1,
    },
    {
        question:
            "What is her new-found interest?",
        choice1: "Coding",
        choice2: "Dark Academia",
        choice3: "Knitting",
        choice4: "Painting",
        answer: 2,
    },
    {
        question: "Her favourite book?",
        choice1: "Lallan Sweets",
        choice2: "Paper Moon",
        choice3: "Pride and Prejudice",
        choice4: "The Night Train at Deoli",
        answer: 3,
    },
    {
        question: "What according to her is the best description of herself?",
        choice1: "Confident",
        choice2: "Mysterious",
        choice3: "Smart",
        choice4: "Honest",
        answer: 1,
    },

    {
        question: "What is the profession she wants to pursue?",
        choice1: "Writer",
        choice2: "Web Developer",
        choice3: "Lawyer",
        choice4: "God knows.",
        answer: 4,
    },

    {
        question: "If she were to launch her own product line, what would she name it?",
        choice1: "Blossom",
        choice2: "Euphoria",
        choice3: "Hiraeth",
        choice4: "Serenity",
        answer: 2,
    },

    {
        question: "What is her favourite snack?",
        choice1: "Chips",
        choice2: "Garlic Bites",
        choice3: "Garlic Bread",
        choice4: "Chaat",
        answer: 3,
    },

    {
        question: "What is her favourite cold drink?",
        choice1: "Coca Cola",
        choice2: "Sprite",
        choice3: "Mountain Dew",
        choice4: "Fanta",
        answer: 1,
    },

    {
        question: "What is her favourite quote?",
        choice1: "There must be something strangely sacred in salt. It is in our tears and in the sea.",
        choice2: "I wish you a kinder sea.",
        choice3: "Empty words are evil.",
        choice4: "Isn't it strange that we talk least about the things we think about most?",
        answer: 4,
    },

    {
        question: "What is her eye color?",
        choice1: "Brown",
        choice2: "Hazel",
        choice3: "Dark Brown",
        choice4: "Black",
        answer: 3,
    }

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
