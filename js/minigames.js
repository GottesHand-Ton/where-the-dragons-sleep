// js/minigames.js

export const minigames = {

    // Сапёр "Поле гейзеров"
    playGeysers(onComplete) {
        const container = document.getElementById('minigame-container');
        const gridElement = document.getElementById('minigame-content');
        const timerElement = document.getElementById('minigame-timer');
        const abortBtn = document.getElementById('minigame-abort');
        const instruction = document.querySelector('.minigame-instructions');

        gridElement.classList.add('geyser-content');
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
                    endGame(false, "Время вышло! Гейзеры активировались.");
                }
            }, 1000);
        }

        // Создание игрового поля
        function initGame() {
            gridElement.innerHTML = '';
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
                    gridElement.appendChild(cell);
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
                    endGame(false, "Вы активировали гейзер! Путь прегражден.");
                }, 800);
                return;
            }

            // Открываем безопасную ячейку
            revealCell(r, c);

            // Победа
            if (revealedCount === (rows * cols - minesCount)) {
                clearInterval(timerInterval);
                endGame(true, "Путь успешно пройден!");
            }
        }

        // Открытие пустых ячеек
        function revealCell(r, c) {
            const cellData = board[r][c];
            if (cellData.revealed || cellData.mine) return;

            cellData.revealed = true;
            revealedCount++;

            const cellElement = gridElement.children[r * cols + c];
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
                        const cellElement = gridElement.children[r * cols + c];
                        cellElement.classList.add('geyser');
                        cellElement.textContent = '🌋';
                    }
                }
            }
        }

        // Завершение мини-игры
        function endGame(success, message) {
            clearInterval(timerInterval);
            alert(message);
            container.classList.add('minigame_hidden');
            gridElement.classList.remove('geyser-content');

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

        content.className = '';

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
    },


    // Мини игра Кликер
    playClickerGame(onComplete) {
        const overlay = document.createElement('div');
        overlay.id = 'clicker-game-overlay';
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            font-family: sans-serif;
            color: white;
            user-select: none;
        `;

        // Игровые значения
        let clicks = 0;
        const targetClicks = 15;
        let timeLeft = 5.0;
        let gameInterval = null;
        let isFinished = false;

        // Инетрфейс 
        overlay.innerHTML = `
            <div style="font-size: 22px; margin-bottom: 10px; font-weight: bold;">Верните рюкзак! Кликайте быстрее!</div>
            <div id="clicker-timer" style="font-size: 20px; color: #ff4757; margin-bottom: 20px;">Осталось времени: 5.0 с</div>
            <div id="clicker-target" style="
                width: 140px;
                height: 140px;
                background: #ff6b81;
                border: 4px solid #fff;
                border-radius: 50%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                font-size: 24px;
                font-weight: bold;
                box-shadow: 0 0 20px rgba(255, 107, 129, 0.6);
                transition: transform 0.05s;
            ">
                🎒<br>
                <span id="clicker-counter" style="font-size: 18px; margin-top: 5px;">0 / 15</span>
            </div>
        `;

        document.getElementById('game-screen').appendChild(overlay);

        const targetBtn = document.getElementById('clicker-target');
        const counterEl = document.getElementById('clicker-counter');
        const timerEl = document.getElementById('clicker-timer');

        // Обработка клика 
        targetBtn.addEventListener('click', () => {
            if (isFinished) return;
            clicks++;
            counterEl.textContent = `${clicks} / ${targetClicks}`;
            targetBtn.style.transform = 'scale(0.92)';
            setTimeout(() => {
                if (!isFinished) targetBtn.style.transform = 'scale(1)';
            }, 50);

            // победа
            if (clicks >= targetClicks) {
                isFinished = true;
                clearInterval(gameInterval);
                overlay.remove();
                onComplete(true);
            }
        });

        // таймера обратного отсчета
        const startTime = Date.now();
        gameInterval = setInterval(() => {
            if (isFinished) return;

            const elapsed = (Date.now() - startTime) / 1000;
            timeLeft = Math.max(0, 5.0 - elapsed);
            timerEl.textContent = `Осталось времени: ${timeLeft.toFixed(1)} с`;

            // поражение
            if (timeLeft <= 0) {
                isFinished = true;
                clearInterval(gameInterval);
                overlay.remove();
                onComplete(false);
            }
        }, 100);
    }


};