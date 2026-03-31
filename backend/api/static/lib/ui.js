function updateProblem(data) {
    document.getElementById('problem').textContent = data.problem;
    document.getElementById('result').textContent = '';
    document.getElementById('result').className = '';
    document.getElementById('userAnswer').value = '';
    document.getElementById('userAnswer').focus();
}

function showResult(isCorrect) {
    const resultElement = document.getElementById('result');
    if (isCorrect) {
        resultElement.textContent = 'Правильно! Молодец! 🎉';
        resultElement.className = 'correct';
        createCelebration();
        // Автоматически загружаем новый пример через 2 секунды
        setTimeout(fetchNewProblem, 2000);
    } else {
        resultElement.textContent = 'Неправильно. Попробуй ещё раз! 😔';
        resultElement.className = 'incorrect';
        // Добавим вибрацию при неправильном ответе
        navigator.vibrate && navigator.vibrate(200);
    }
}

function createCelebration() {
    const celebration = document.getElementById('celebration');
    celebration.innerHTML = '';
    
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = Math.random() * 10 + 5 + 'px';
        star.style.height = star.style.width;
        star.style.backgroundColor = ['#f39c12', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6'][Math.floor(Math.random() * 5)];
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.opacity = Math.random();
        star.style.transform = `scale(${Math.random()})`;
        star.style.pointerEvents = 'none';
        
        // Анимация падения
        star.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        
        celebration.appendChild(star);
    }
    
    // Добавляем анимацию падения
    const style = document.createElement('style');
    style.textContent = `@keyframes fall {
        0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }`;
    document.head.appendChild(style);
    
    // Удаляем звёзды через 5 секунд
    setTimeout(() => {
        celebration.innerHTML = '';
        document.head.removeChild(style);
    }, 5000);
}