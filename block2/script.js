const testData = {
    testName: "Тест про подорожі українськими містами",
    questions: [
        {
            question: "Яке місто є культурною столицею України?",
            answers: [
                { answer: "Львів", isCorrect: true },
                { answer: "Одеса", isCorrect: false },
                { answer: "Київ", isCorrect: false },
                { answer: "Харків", isCorrect: false }
            ]
        },
        {
            question: "У якому місті розташований найстаріший Оперний театр?",
            answers: [
                { answer: "Дніпро", isCorrect: false },
                { answer: "Одеса", isCorrect: true },
                { answer: "Запоріжжя", isCorrect: false },
                { answer: "Полтава", isCorrect: false }
            ]
        },
        {
            question: "Яке місто відоме як 'столиця студентів і науки'?",
            answers: [
                { answer: "Харків", isCorrect: true },
                { answer: "Київ", isCorrect: false },
                { answer: "Херсон", isCorrect: false },
                { answer: "Чернігів", isCorrect: false }
            ]
        },
        {
            question: "У якому місті знаходиться Софійський собор?",
            answers: [
                { answer: "Чернівці", isCorrect: false },
                { answer: "Київ", isCorrect: true },
                { answer: "Вінниця", isCorrect: false },
                { answer: "Луцьк", isCorrect: false }
            ]
        },
        {
            question: "Яке місто є найбільшим портом України?",
            answers: [
                { answer: "Херсон", isCorrect: false },
                { answer: "Маріуполь", isCorrect: false },
                { answer: "Одеса", isCorrect: true },
                { answer: "Миколаїв", isCorrect: false }
            ]
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    renderQuiz();
});

function renderQuiz() {
    const container = document.getElementById('test-container');
    container.innerHTML = `<h1>${testData.testName}</h1>`;
    
    testData.questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `<p>${q.question}</p>`;
        
        const answersList = document.createElement('ul');
        answersList.classList.add('answers');
        
        q.answers.forEach((answer, ansIndex) => {
            const listItem = document.createElement('li');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question${index}`;
            input.value = ansIndex;
            listItem.appendChild(input);
            listItem.innerHTML += ` ${answer.answer}`;
            answersList.appendChild(listItem);
        });
        
        questionDiv.appendChild(answersList);
        container.appendChild(questionDiv);
    });
    
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Перевірити відповіді';
    submitButton.addEventListener('click', checkAnswers);
    container.appendChild(submitButton);
}

function checkAnswers() {
    let score = 0;
    const results = [];
    testData.questions.forEach((q, index) => {
        const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedAnswer) {
            const answerIndex = parseInt(selectedAnswer.value);
            const isCorrect = q.answers[answerIndex].isCorrect;
            if (isCorrect) {
                score++;
            }
            results.push({ question: q.question, answer: q.answers[answerIndex].answer, isCorrect: isCorrect });
        } else {
            results.push({ question: q.question, answer: 'Не вибрано', isCorrect: false });
        }
    });
    showResults(score, results);
}

function showResults(score, results) {
    const container = document.getElementById('test-container');
    container.innerHTML = `<h1>Результати тесту</h1>`;
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Питання</th>
                <th>Відповідь</th>
                <th>Правильність</th>
            </tr>
        </thead>
        <tbody>
            ${results.map(result => `
                <tr>
                    <td>${result.question}</td>
                    <td>${result.answer}</td>
                    <td>${result.isCorrect ? 'Правильно' : 'Неправильно'}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    container.appendChild(table);
    
    const scoreParagraph = document.createElement('p');
    scoreParagraph.textContent = `Ви отримали ${score} з ${testData.questions.length} правильних відповідей!`;
    container.appendChild(scoreParagraph);
    
    const retryButton = document.createElement('button');
    retryButton.textContent = 'Пройти тест ще раз';
    retryButton.addEventListener('click', renderQuiz);
    container.appendChild(retryButton);
}