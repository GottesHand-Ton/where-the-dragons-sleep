
import { scenes } from './scenario.js';
import { ui } from './ui.js';
import { minigames } from './minigames.js';


// загрузка картинок при входе на сайт
const imagesToPreload = [
    "./pictures/scene/start.webp",
    "./pictures/narrator/narrator_none.webp",
    "./pictures/scene/dragon_1.webp",
    "./pictures/scene/dragon_2.webp",
    "./pictures/father/father_hungry.webp",
    "./pictures/scene/dragon_Escape_1.webp",
    "./pictures/scene/dragon_Escape_2.webp",
    "./pictures/scene/dragon_Escape_3.webp",
    "./pictures/scene/pursuit_1.webp",
    "./pictures/scene/geysers_1.webp",
    "./pictures/scene/illusorymountains_1.webp",
    "./pictures/scene/illusorymountains_2.webp",
    "./pictures/scene/memory_lose.webp",
    "./pictures/scene/memory_win.webp",
    "./pictures/scene/new_world_1.webp",
    "./pictures/scene/new_world_3.webp",
    "./pictures/scene/tame_beast_1.webp",
    "./pictures/scene/tame_beast_2.webp",
    "./pictures/scene/tame_beast_lose_1.webp",
    "./pictures/scene/tame_beast_lose_2.webp",
    "./pictures/scene/tracking_1.webp",
    "./pictures/father/father.webp",
    "./pictures/scene/dragon_nest_1.webp",
    "./pictures/scene/final_dragon_1.webp",
    "./pictures/scene/father_and_mather_1.webp",
    "./pictures/scene/father_and_mather_2.webp",
    "./pictures/scene/end_narrator.webp"
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

const gameScreen = document.getElementById('game-screen');

// блокировка кликов во время мини игры
let isMinigameActive = false;

// Загрузка и отрисовка сцен
function loadScene(sceneId, saveToHistory = true) {
    const scene = scenes[sceneId];
    if (!scene) return;

    // проверка является ли сцена мини игрой
    if (scene.minigame) {
        isMinigameActive = true;

        // geysers
        if (scene.minigame === "geysers") {
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
    ui.updateDialogue(scene.speaker, scene.text);
    ui.updateBackground(scene.background);
    ui.updateCharacter(scene.characterLeft);
    ui.showChoices(scene.choices, (targetSceneId) => {
        loadScene(targetSceneId);
    });
}

// обработчик кликов для перехода сцен
gameScreen.addEventListener('click', (event) => {
    if (isMinigameActive) return;

    if (event.target.closest('.quick-menu') || event.target.closest('.dialogue-box__choices')) {
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
    loadScene(currentSceneId, false);

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
    document.getElementById('btn-save').addEventListener('click', (e) => {
        e.stopPropagation();
        localStorage.setItem('save_scene_id', currentSceneId);
        localStorage.setItem('save_history', JSON.stringify(historyStack));
        alert('Игра успешно сохранена!');
    });

    // Загрузка сохраненной игры из localStorage
    document.getElementById('btn-load').addEventListener('click', (e) => {
        e.stopPropagation();
        const savedScene = localStorage.getItem('save_scene_id');
        const savedHistory = localStorage.getItem('save_history');

        if (savedScene && scenes[savedScene]) {
            currentSceneId = savedScene;
            if (savedHistory) historyStack = JSON.parse(savedHistory);
            loadScene(currentSceneId, false);
            alert('Игра загружена!');
        } else {
            alert('Сохранений не найдено!');
        }
    });
});