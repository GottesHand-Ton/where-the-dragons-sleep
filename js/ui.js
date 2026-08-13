const speakerBox = document.getElementById('speaker-name');
const textBox = document.getElementById('dialogue-text');
const choiceContainer = document.getElementById('choice-container');
const characterLeftImg = document.getElementById('character-left');
const gameScreen = document.getElementById('game-screen');
const screenOverlay = document.getElementById('screen-overlay');

export const ui = {
    // Таймер для для эффекта "Печати в реальном времени"
    typingTimeout: null,

    // Побуквенный вывод
    updateDialogue(speaker, text) {
        speakerBox.textContent = speaker;

        // сброс старого таймаута печати
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
            this.typingTimeout = null;
        }

        textBox.textContent = "";
        let i = 0;
        const speed = 30; // Скорость печати 

        const typeWriter = () => {
            if (i < text.length) {
                textBox.textContent += text.charAt(i);
                i++;
                this.typingTimeout = setTimeout(typeWriter, speed);
            } else {
                this.typingTimeout = null;
            }
        };

        typeWriter();
    },

    // клик для мгновенного вывода всего предложения
    finishTyping(fullText) {
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
            this.typingTimeout = null;
        }
        textBox.textContent = fullText;
    },

    isTyping() {
        return this.typingTimeout !== null;
    },

    // Смена сцен (картинки)
    updateBackground(bgPath) {
        if (bgPath) {
            gameScreen.style.backgroundImage = `url('${bgPath}')`;
            gameScreen.style.backgroundSize = 'cover';
            gameScreen.style.backgroundPosition = 'center';
        }
    },

    // Смена аватара 
    updateCharacter(charPath) {
        if (charPath && typeof charPath === 'string' && charPath.trim() !== '') {
            characterLeftImg.src = charPath;
            requestAnimationFrame(() => {
                characterLeftImg.classList.remove('character_hidden');
            });
        } else {
            characterLeftImg.classList.add('character_hidden');
            setTimeout(() => {
                if (characterLeftImg.classList.contains('character_hidden')) {
                    characterLeftImg.src = '';
                }
            }, 300);
        }
    },

    // Кнопки выбора на развилке
    showChoices(choicesArray, onChoiceClick) {
        choiceContainer.innerHTML = '';
        if (!choicesArray) {
            if (screenOverlay) screenOverlay.classList.remove('game-screen__overlay_active');
            return;
        }
        if (screenOverlay) screenOverlay.classList.add('game-screen__overlay_active');

        choicesArray.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'dialogue-box__choice-btn';
            btn.textContent = choice.text;
            btn.addEventListener('click', (event) => {
                event.stopPropagation();
                if (screenOverlay) screenOverlay.classList.remove('game-screen__overlay_active');
                onChoiceClick(choice.target);
            });
            choiceContainer.appendChild(btn);
        });
    },

    // Переключение видимости плашки текста
    toggleUI() {
        const dialogueBox = document.getElementById('dialogue-box');
        const characterLayer = document.getElementById('character-layer');
        dialogueBox.classList.toggle('dialogue-box_hidden');
        if (characterLayer) characterLayer.classList.toggle('character-layer_hidden');
    },

    // Проверка включёно ли скрытие 
    isUIHidden() {
        const dialogueBox = document.getElementById('dialogue-box');
        return dialogueBox.classList.contains('dialogue-box_hidden');
    },

    // отобразить интерфейс 
    showUI() {
        const dialogueBox = document.getElementById('dialogue-box');
        const characterLayer = document.getElementById('character-layer');
        dialogueBox.classList.remove('dialogue-box_hidden');
        if (characterLayer) characterLayer.classList.remove('character-layer_hidden');
    }
};