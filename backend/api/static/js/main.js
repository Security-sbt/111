const PROBLEM_URL = '/problem';
const CHECK_URL = '/check';

let currentProblem = null;

async function fetchNewProblem() {
    try {
        const response = await fetch(PROBLEM_URL);
        currentProblem = await response.json();
        updateProblem(currentProblem);
    } catch (error) {
        console.error('Ошибка загрузки примера:', error);
        document.getElementById('problem').textContent = 'Ошибка загрузки. Попробуйте позже.';
    }
}

async function submitAnswer() {
    const userAnswer = document.getElementById('userAnswer').value.trim();
    
    if (!userAnswer || !currentProblem) return;

    try {
        const response = await fetch(CHECK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                answer: userAnswer,
                correct_answer: currentProblem.answer
            })
        });
        
        const result = await response.json();
        showResult(result.correct);
        
        if (result.correct) {
            // Автоматически загружаем новый пример через 1.5 секунды
            setTimeout(fetchNewProblem, 1500);
        }
    } catch (error) {
        console.error('Ошибка проверки ответа:', error);
        document.getElementById('result').textContent = 'Ошибка соединения.';
    }
}

// Обработка нажатия Enter
function handleKeyPress(e) {
    if (e.key === 'Enter') {
        submitAnswer();
    }
}

// Загружаем первый пример при загрузке страницы
document.addEventListener('DOMContentLoaded', fetchNewProblem);