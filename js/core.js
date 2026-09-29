
import { scenes } from './scenario.js';
import { ui } from './ui.js';
import { minigames } from './minigames.js';

const nameScreen = document.getElementById('name-screen');
const playerNameInput = document.getElementById('player-name');
const girlNameInput = document.getElementById('girl-name');
const startGameButton = document.getElementById('start-game');

// загрузка картинок при входе на сайт
const imagesToPreload = [
    '../pictures/start_1.jpg',
    

];


function preloadImages(imageUrls) {
    console.log('Начинаю предзагрузку картинок...');

    imageUrls.forEach((url) => {
        const img = new Image();
        img.src = url;
    });
}

preloadImages(imagesToPreload);


// старт и история (запьсь сцен) 
let currentSceneId = "start_1";
let historyStack = [];
let playerName = "";
let girlName = "";

const gameScreen = document.getElementById('game-screen');


// блокировка кликов во время мини игры
let isMinigameActive = false;

function replaceNames(text) {
    if (!text) return text;

    return text
        .replaceAll('{playerName}', playerName)
        .replaceAll('{girlName}', girlName);
}

// Загрузка и отрисовка сцен
function loadScene(sceneId, saveToHistory = true) {
    const scene = scenes[sceneId];
    if (!scene) return;

    // проверка является ли сцена мини игрой
    if (scene.minigame) {
        isMinigameActive = true;

        // geysers
        if (scene.minigame === "sweeper") {


            minigames.playGeysers((success) => {
                isMinigameActive = false;
                if (success) {
                    loadScene(scene.winScene, true);
                } else {
                    loadScene(scene.loseScene, true);
                }
            });
        }
        // Memory
        else if (scene.minigame === "memory") {
            minigames.playMemoryGame((success) => {
                isMinigameActive = false;
                if (success) {
                    loadScene(scene.winScene, true);
                } else {
                    loadScene(scene.loseScene, true);
                }
            });
        }

        // clicker
        else if (scene.minigame === "clicker") {
            minigames.playClickerGame((success) => {
                isMinigameActive = false;
                if (success) {
                    loadScene(scene.winScene, true);
                } else {
                    loadScene(scene.loseScene, true);
                }
            });
        }
        return;
    }

    // Сохранение с цены в историю
    if (saveToHistory && currentSceneId !== sceneId) {
        historyStack.push(currentSceneId);
    }

    currentSceneId = sceneId;

    // Обновляем текст, фон и аватаров
    ui.updateDialogue(
        replaceNames(scene.speaker),
        replaceNames(scene.text)
    );
    ui.updateBackground(scene.background);
    ui.updateCharacter(scene.characterLeft);
    ui.showChoices(scene.choices, (targetSceneId) => {
        loadScene(targetSceneId);
    });
}

// обработчик кликов для перехода сцен
gameScreen.addEventListener('click', (event) => {
    if (!nameScreen.classList.contains('name-screen_hidden')) return;
    if (isMinigameActive) return;

    if (event.target.closest('.quick-menu') || event.target.closest('.dialogue-box__choices')) {
        return;
    }

        if (!document.getElementById('message-window').classList.contains('message-window_hidden')) {
        return;
    }

    const scene = scenes[currentSceneId];

    // возврат юи по клику если оно скрыто
    if (ui.isUIHidden()) {
        ui.showUI();
        return;
    }
    // не листать если есть развилка
    if (scene.choices) return;

    if (ui.isTyping()) {
        // показ текста если он печатался
        ui.finishTyping(scene.text);
    } else if (scene.next) {
        // Переход к следующей сцене если текст напечатан
        loadScene(scene.next);
    } else {
        ui.showEnd();
    }

});

document.addEventListener('DOMContentLoaded', () => {
    startGameButton.addEventListener('click', () => {

        const enteredPlayerName = playerNameInput.value.trim();
        const enteredGirlName = girlNameInput.value.trim();

        if (!enteredPlayerName || !enteredGirlName) {
            ui.showMessage('Введите оба имени!');
            return;
        }

        playerName = enteredPlayerName;
        girlName = enteredGirlName;

        nameScreen.classList.add('name-screen_hidden');

        loadScene(currentSceneId, false);
    });
playerNameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        startGameButton.click();
    }
});
girlNameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        startGameButton.click();
    }
});

    // кнопка назад 
    document.getElementById('btn-back').addEventListener('click', (e) => {
        e.stopPropagation();
        if (historyStack.length > 0 && !isMinigameActive) {
            let previousSceneId = historyStack.pop();

            // мини игры не считываются в истории
            while (previousSceneId && scenes[previousSceneId] && scenes[previousSceneId].minigame) {
                if (historyStack.length > 0) {
                    previousSceneId = historyStack.pop();
                } else {
                    break;
                }
            }

            if (previousSceneId && !scenes[previousSceneId].minigame) {
                loadScene(previousSceneId, false);
            }
        }
    });

    // Кнопка скрытия юи
    document.getElementById('btn-hide').addEventListener('click', (e) => {
        e.stopPropagation();
        ui.toggleUI();
    });

    // Сохранение текущего прогресса в localStorage
    document.getElementById('btn-load').addEventListener('click', (e) => {
        e.stopPropagation();

        const savedScene = localStorage.getItem('save_scene_id');
        const savedHistory = localStorage.getItem('save_history');
        const savedPlayerName = localStorage.getItem('save_player_name');
        const savedGirlName = localStorage.getItem('save_girl_name');

        if (savedScene && scenes[savedScene]) {
            currentSceneId = savedScene;
            if (savedHistory) {
                historyStack = JSON.parse(savedHistory);
            }
            if (savedPlayerName) {
                playerName = savedPlayerName;
            }
            if (savedGirlName) {
                girlName = savedGirlName;
            }
            nameScreen.classList.add('name-screen_hidden');
            loadScene(currentSceneId, false);
            ui.showMessage('Игра успешно загружена!');
        } else {
            ui.showMessage('Сохранений не найдено!');
        }
    });
});