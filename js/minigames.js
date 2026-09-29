// js/minigames.js

export const minigames = {

    // Сапёр "Поле гейзеров"
    playGeysers(onComplete) {
        const container = document.getElementById('minigame-container');
        const content = document.getElementById('minigame-content');
        const timerElement = document.getElementById('minigame-timer');
        const abortBtn = document.getElementById('minigame-abort');
        const instruction = document.querySelector('.minigame-instructions');

        content.classList.add('geyser-content');
        instruction.textContent = 'На пути гейзеры, найдите безопасный путь!';

        if (!container) return;

        container.classList.remove('minigame_hidden');

        // Настройка игровых значений
        const rows = 6;
        const cols = 6;
        const minesCount = 3;
        let board = [];
        let revealedCount = 0;
        let timerInterval = null;
        let timeLeft = 90;

        // Переводим секунды в минуты и секунды 
        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
            const secs = (seconds % 60).toString().padStart(2, '0');
            return `${mins}:${secs}`;
        }

        // Запуск таймера
        function startTimer() {
            timerElement.textContent = formatTime(timeLeft);
            timerElement.classList.remove('danger');

            timerInterval = setInterval(() => {
                timeLeft--;
                timerElement.textContent = formatTime(timeLeft);

                if (timeLeft <= 15) {
                    timerElement.classList.add('danger');
                }

                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    endGame(false);
                }
            }, 1000);
        }

        // Создание игрового поля
        function initGame() {
            content.innerHTML = '';
            board = [];
            revealedCount = 0;
            timeLeft = 30;
            startTimer();


            for (let r = 0; r < rows; r++) {
                board[r] = [];
                for (let c = 0; c < cols; c++) {
                    board[r][c] = { mine: false, revealed: false, count: 0 };
                }
            }

            // Рандомно ставим мины
            let placedMines = 0;
            while (placedMines < minesCount) {
                let r = Math.floor(Math.random() * rows);
                let c = Math.floor(Math.random() * cols);
                if (!board[r][c].mine) {
                    board[r][c].mine = true;
                    placedMines++;
                }
            }

            // Считаем цифры вокруг мин
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    if (board[r][c].mine) continue;
                    let minesAround = 0;
                    for (let dr = -1; dr <= 1; dr++) {
                        for (let dc = -1; dc <= 1; dc++) {
                            let nr = r + dr;
                            let nc = c + dc;
                            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].mine) {
                                minesAround++;
                            }
                        }
                    }
                    board[r][c].count = minesAround;
                }
            }

            // Отрисовываем сетку в HTML
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const cell = document.createElement('button');
                    cell.classList.add('geyser-cell');
                    cell.dataset.row = r;
                    cell.dataset.col = c;

                    cell.addEventListener('click', () => handleCellClick(r, c, cell));
                    content.appendChild(cell);
                }
            }
        }

        // Клик по ячейке
        function handleCellClick(r, c, cellElement) {
            const cellData = board[r][c];
            if (cellData.revealed) return;

            // Проигрыш
            if (cellData.mine) {
                cellElement.classList.add('geyser');
                cellElement.textContent = '💥';
                revealAllMines();
                clearInterval(timerInterval);
                setTimeout(() => {
                    endGame(false);
                }, 800);
                return;
            }

            // Открываем безопасную ячейку
            revealCell(r, c);

            // Победа
            if (revealedCount === (rows * cols - minesCount)) {
                clearInterval(timerInterval);
                endGame(true);
            }
        }

        // Открытие пустых ячеек
        function revealCell(r, c) {
            const cellData = board[r][c];
            if (cellData.revealed || cellData.mine) return;

            cellData.revealed = true;
            revealedCount++;

            const cellElement = content.children[r * cols + c];
            cellElement.classList.add('revealed');

            if (cellData.count > 0) {
                cellElement.textContent = cellData.count;
                if (cellData.count === 1) cellElement.style.color = '#4a90e2';
                if (cellData.count === 2) cellElement.style.color = '#7ed321';
                if (cellData.count >= 3) cellElement.style.color = '#f5a623';
            } else {
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        let nr = r + dr;
                        let nc = c + dc;
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                            if (!board[nr][nc].revealed) {
                                revealCell(nr, nc);
                            }
                        }
                    }
                }
            }
        }

        // Показ мин при поражении
        function revealAllMines() {
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    if (board[r][c].mine) {
                        const cellElement = content.children[r * cols + c];
                        cellElement.classList.add('geyser');
                        cellElement.textContent = '🌋';
                    }
                }
            }
        }

        // Завершение мини-игры
        function endGame(success) {
            clearInterval(timerInterval);
            container.classList.add('minigame_hidden');
            content.classList.remove('geyser-content');

            abortBtn.removeEventListener('click', abortHandler);

            // Возвращаем результат
            if (typeof onComplete === 'function') {
                onComplete(success);
            }
        }

        // кнопка сдатсья
        const abortHandler = () => {
            clearInterval(timerInterval);
            container.classList.add('minigame_hidden');
            abortBtn.removeEventListener('click', abortHandler);
            if (typeof onComplete === 'function') {
                onComplete(false); // 
            }
        };

        abortBtn.addEventListener('click', abortHandler);

        initGame();

    },

    // Мини игра "Найди пару"
    playMemoryGame(onComplete) {

        const container = document.getElementById('minigame-container');
        const content = document.getElementById('minigame-content');
        const abortBtn = document.getElementById('minigame-abort');




        content.className = '';
        content.classList.add('memory_content');
        container.classList.add('memory-active');
        container.classList.remove('minigame_hidden');

        const emojis = [
            '🔮', '🔮',
            '✨', '✨',
            '🧙🏻‍♀️', '🧙🏻‍♀️',
            '🧙‍♂️', '🧙‍♂️'
        ];

        emojis.sort(() => Math.random() - 0.5);

        let lives = 3;
        let firstCard = null;
        let secondCard = null;
        let lockBoard = false;
        let matchedPairs = 0;
        let isGameActive = false;

        // Разметка интерфейса мини игры

        content.innerHTML = `
        <div class="memory-title">Запомните расположение!</div>
        <div class="memory-lives">❤️❤️❤️</div>
        <div class="memory-grid"></div>
    `;

        const grid = content.querySelector('.memory-grid');
        const livesElement = content.querySelector('.memory-lives');
        const titleElement = content.querySelector('.memory-title');

        // Карточки со смайликами

        emojis.forEach((emoji) => {
            const card = document.createElement('div');
            card.dataset.emoji = emoji;
            card.classList.add('memory-card');

            // Сначала карточка открыта
            card.classList.add('revealed');
            card.textContent = emoji;

            // Обработка клика

            card.addEventListener('click', () => {
                if (!isGameActive || lockBoard) return;
                if (card === firstCard) return;
                if (card.classList.contains('matched')) return;

                // Открываем карточку
                card.classList.add('revealed');
                card.textContent = emoji;
                if (!firstCard) {
                    firstCard = card;
                    return;
                }

                secondCard = card;
                lockBoard = true;

                // Проверка пары на совпадение
                if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
                    firstCard.classList.add('matched');
                    secondCard.classList.add('matched');
                    matchedPairs++;
                    resetTurn();

                    // Победа
                    if (matchedPairs === 4) {
                        setTimeout(() => {
                            abortBtn.removeEventListener('click', abortHandler);
                            content.classList.remove('memory_content');
                            container.classList.remove('memory-active');
                            container.classList.add('minigame_hidden');
                            content.innerHTML = '';
                            onComplete(true);
                        }, 600);
                    }
                } else {
                    lives--;
                    livesElement.textContent =
                        '❤️'.repeat(lives) +
                        '🖤'.repeat(3 - lives);

                    setTimeout(() => {
                        // Закрываем обе карточки
                        firstCard.textContent = '?';
                        firstCard.classList.remove('revealed');
                        secondCard.textContent = '?';
                        secondCard.classList.remove('revealed');
                        resetTurn();

                        // Проигрыш
                        if (lives <= 0) {
                            setTimeout(() => {
                                abortBtn.removeEventListener('click', abortHandler);
                                content.classList.remove('memory_content');
                                container.classList.remove('memory-active');
                                container.classList.add('minigame_hidden');
                                content.innerHTML = '';
                                onComplete(false);
                            }, 200);
                        }
                    }, 800);
                }
            });
            grid.appendChild(card);
        });

        // скрытие карт через 1.5 секунды закрываем их
        setTimeout(() => {
            grid.querySelectorAll('.memory-card').forEach(card => {
                card.textContent = '?';
                card.classList.remove('revealed');
            });
            isGameActive = true;
            titleElement.textContent = 'Найдите все пары!';
        }, 1500);

        // Сброс текущего выбора карточек
        function resetTurn() {
            firstCard = null;
            secondCard = null;
            lockBoard = false;
        }

        // кнопка сдатся
        const abortHandler = () => {
            isGameActive = false;
            container.classList.remove('memory-active');
            container.classList.add('minigame_hidden');
            content.classList.remove('memory_content');
            content.innerHTML = '';
            abortBtn.removeEventListener('click', abortHandler);
            if (typeof onComplete === 'function') {
                onComplete(false);
            }
        };

        abortBtn.addEventListener('click', abortHandler);

    },


    // Мини игра Кликер
    playClickerGame(onComplete) {

        const container = document.getElementById('minigame-container');
        const content = document.getElementById('minigame-content');
        const instruction = document.getElementById('minigame-instructions');
        const timerEl = document.getElementById('minigame-timer');
        const abortBtn = document.getElementById('minigame-abort');
        content.classList.add('clicker-content');

        container.classList.add('clicker-active');
        container.classList.remove('minigame_hidden');

        instruction.textContent = 'Верните рюкзак! Кликайте быстрее!';

        // Игровые значения
        let clicks = 0;
        const targetClicks = 15;
        const targetTime = 5.0;
        let timeLeft = targetTime;
        let gameInterval = null;
        let isFinished = false;

        // Интерфейс
        content.innerHTML = `
        <div class="clicker-target">
            🎒<br>
            <span class="clicker-counter">0 / 15</span>
        </div>
    `;
        const targetBtn = content.querySelector('.clicker-target');
        const counterEl = content.querySelector('.clicker-counter');

        // Обработка клика
        targetBtn.addEventListener('click', () => {
            if (isFinished) return;
            clicks++;
            counterEl.textContent = `${clicks} / ${targetClicks}`;
            targetBtn.classList.add('clicked');
            setTimeout(() => {
                if (!isFinished) {
                    targetBtn.classList.remove('clicked');
                }
            }, 50);

            // Победа
            if (clicks >= targetClicks) {
                isFinished = true;
                clearInterval(gameInterval);
                abortBtn.removeEventListener('click', abortHandler);
                content.classList.remove('clicker-content');
                container.classList.remove('clicker-active');
                container.classList.add('minigame_hidden');
                content.innerHTML = '';
                onComplete(true);
            }
        });

        // Таймер обратного отсчёта
        const startTime = Date.now();
        gameInterval = setInterval(() => {
            if (isFinished) return;
            const elapsed = (Date.now() - startTime) / 1000;
            timeLeft = Math.max(0, targetTime - elapsed);
            timerEl.textContent =
                `Осталось времени: ${timeLeft.toFixed(1)} с`;

            if (timeLeft <= 0) {
                isFinished = true;
                clearInterval(gameInterval);
                abortBtn.removeEventListener('click', abortHandler);
                content.classList.remove('clicker-content');
                container.classList.remove('clicker-active');
                container.classList.add('minigame_hidden');
                content.innerHTML = '';
                onComplete(false);
            }
        }, 100);

        // Кнопка «Сдаться»
        function abortHandler() {
            if (isFinished) return;
            isFinished = true;
            clearInterval(gameInterval);
            abortBtn.removeEventListener('click', abortHandler);
            content.classList.remove('clicker-content');
            container.classList.remove('clicker-active');
            container.classList.add('minigame_hidden');
            content.innerHTML = '';
            onComplete(false);
        }

        abortBtn.addEventListener('click', abortHandler);
    },
};
