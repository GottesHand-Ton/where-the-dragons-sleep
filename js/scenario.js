export const scenes = {
    "start_1": {
        background: "../pictures/start_1.jpg",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Наконец-то. Я уже думала, что ты заблудился.",
        next: "start_2"
    },

    "start_2": {
        background: "../pictures/start_1 (2).jpg",
        characterLeft: "",
        speaker: "{playerName}",
        text: "Я специально задержался. Хотел проверить, будешь ли ты меня ждать.",
        next: "start_3"
    },

    "start_3": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Очень смешно. Ладно, куда идём?",
        next: "start_4"
    },

    "start_4": {
        background: "",
        characterLeft: "",
        speaker: "{playerName}",
        text: "Сначала прогуляемся. А там посмотрим, куда нас занесёт.",
        next: "start_5"
    },

    "start_5": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Ты, получается, сегодня вообще ничего не планировал?",
        choices: [
            { text: "Главное было пригласить тебя. Остальное разберёмся.", target: "start_6" },
            { text: "План есть. Но я не собираюсь раскрывать его сразу.", target: "start_7" }
        ]
    },

    "start_6": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Хорошо сказано.",
        next: "animator_1"
    },

    "start_7": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Интрига? Ладно, принимается.",
        next: "animator_1"
    },

    "animator_1": {
        background: "",
        characterLeft: "",
        speaker: "Аниматор",
        text: "Молодые люди! Хотите проверить, кто из вас лучше двигается?",
        next: "animator_2"
    },

    "animator_2": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "О, это уже интересно, сыграем?",
        next: "animator_3"
    },

    "animator_3": {
        background: "",
        characterLeft: "",
        speaker: "{playerName}",
        text: "Давай. Только потом не грусти, что проиграла!",
        next: "minegame-sweeper_start"
    },

    "minegame-sweeper_start": {
        background: "",
        characterLeft: "",
        speaker: "Аниматор",
        text: "Правила простые: Пройдите полосу препятствий не задев мины!",
        next: "minesweeper_game"
    },

    "minesweeper_game":
    {
        minigame: "sweeper",
        winScene: "minesweeper_win",
        loseScene: "minesweeper_lose"
    },

    "minesweeper_lose": {
        background: "",
        characterLeft: "",
        speaker: "",
        text: "Хотите попробовать ещё раз? Нажмите в любое место.",
        next: "minesweeper_game"
},
    
    "minesweeper_win": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Ну что, победитель, доволен собой?",
        choices: [
            { text: "Вполне. Но главное — ты тоже повеселилась.", target: "game_good" },
            { text: "Теперь ты должна признать, что я хорош.", target: "game_bad" }
        ]
    },

    "game_good": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "За это мне и нравится с тобой разговаривать.",
        next: "questions_1"
    },

    "game_bad": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Скромность тебе явно не помешала бы.",
        next: "questions_1"
    },

    "questions_1": {
        background: "",
        characterLeft: "",
        speaker: "{playerName}",
        text: "Теперь серьёзно. Что ты обычно делаешь, когда хочешь отдохнуть?",
        next: "questions_2"
    },

    "questions_2": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Слушаю музыку, гуляю, иногда смотрю фильмы. Ничего необычного.",
        next: "questions_3"
    },

    "questions_3": {
        background: "",
        characterLeft: "",
        speaker: "{playerName}",
        text: "Какой фильм ты могла бы пересматривать сколько угодно раз?",
        next: "questions_4"
    },

    "questions_4": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Есть один. Но я не скажу какой.",
        next: "questions_5"
    },

    "questions_5": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "А то вдруг ты начнёшь делать вид, что тоже его обожаешь.",
        next: "questions_6"
    },

    "questions_6": {
        background: "",
        characterLeft: "",
        speaker: "{playerName}",
        text: "Не переживай. Если фильм плохой — я так и скажу.",
        next: "questions_7"
    },

    "questions_7": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Вот поэтому с тобой интересно.",
        next: "questions_8"
    },

    "questions_8": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Теперь моя очередь. Почему именно меня ты пригласил?",
        choices: [
            { text: "Потому что мне интересно проводить с тобой время.", target: "questions_good" },
            { text: "Ты показалась мне интересной. Решил проверить.", target: "questions_good" },
            { text: "А это секрет.", target: "questions_neutral" }
        ]
    },

    "questions_good": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Хороший ответ.",
        next: "questions_9"
    },

    "questions_neutral": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Значит, придётся самой выяснять.",
        next: "questions_9"
    },

    "questions_9": {
        background: "",
        characterLeft: "",
        speaker: "{playerName}",
        text: "Тогда вопрос тебе. Что ты больше всего ценишь в людях?",
        next: "questions_10"
    },

    "questions_10": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Честность. И чувство юмора. Без этого долго общаться сложно.",
        next: "fortune_1"
    },

    "fortune_1": {
        background: "",
        characterLeft: "",
        speaker: "Гадалка",
        text: "А вот и пара, которой явно интересно узнать своё будущее.",
        next: "fortune_2"
    },

    "fortune_2": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Мы вообще-то ещё не пара.",
        next: "fortune_3"
    },

    "fortune_3": {
        background: "",
        characterLeft: "",
        speaker: "Гадалка",
        text: "Тогда судьба ещё не определилась.",
        next: "fortune_4"
    },

    "fortune_4": {
        background: "",
        characterLeft: "",
        speaker: "{playerName}",
        text: "Ну раз судьба не определилась, давай поможем ей.",
        next: "memory_start"
    },

    "memory_start": {
        background: "",
        characterLeft: "",
        speaker: "Гадалка",
        text: "Ваша задача — найти пары символов. Посмотрим, насколько хорошо вы запоминаете детали.",
        next: "memory_game"
    },

    "memory_game": {
        minigame: "memory",
        winScene: "memory_win",
        loseScene: "memory_lose"
    },

    "memory_lose": {
        background: "",
        characterLeft: "",
        speaker: "{playerName}",
        text: "Ха-ха, ты даже двух карточек запомнить не можешь?",
        next: "memory_lose_2"
    },

    "memory_lose_2": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Зато теперь я знаю, что на тебя в таких играх лучше не рассчитывать.",
        next: "memory_lose_3"
    },

    "memory_lose_3": {
        background: "",
        characterLeft: "",
        speaker: "{playerName}",
        text: "Ну а что? Ты сама захотела поиграть, я теперь виноват?",
        next: "memory_lose_4"
    },

    "memory_lose_4": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Ясно...",
        next: "memory_lose_5"
    },

    "memory_lose_5": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Спасибо за вечер. Я, пожалуй, пойду.",
        next: "memory_lose_6"
    },

    "memory_lose_6": {
        background: "",
        characterLeft: "",
        speaker: "Система",
        text: "Хотите увидеть другую концовку? Нажмите в любое место.",
        next: "memory_start"
    },

    "memory_win": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Ну как?",
        choices: [
            { text: "Отлично сыграла. Не знал, что у тебя такая хорошая память!", target: "memory_good" },
            { text: "Скажем так — гадалка получила достаточно денег за подсказки.", target: "memory_funny" }
        ]
    },

    "memory_good": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Зато я теперь знаю, кто из нас двоих будет отвечать за память.",
        next: "walk_2"
    },

    "memory_funny": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Хорошо, что чувство юмора у тебя лучше памяти.",
        next: "walk_2"
    },

    "walk_2": {
        background: "",
        characterLeft: "",
        speaker: "{playerName}",
        text: "Мне нравится, что ты пытаешься меня подколоть.",
        next: "walk_3"
    },

    "walk_3": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "А мне нравится, что ты не обижаешься, а смеёшься.",
        next: "thief_1"
    },

    "thief_1": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "О, подожди, я хочу посмотреть вот на тот стенд.",
        next: "thief_2"
    },

    "thief_2": {
        background: "",
        characterLeft: "",
        speaker: "",
        text: "Внезапно мимо девушки быстро проходит незнакомец.",
        next: "thief_3"
    },

    "thief_3": {
        background: "",
        characterLeft: "",
        speaker: "Вор",
        text: "Ха-ха, попробуй догони!",
        next: "thief_4"
    },

    "thief_4": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Стой! Он забрал мою сумку!",
        choices: [
            { text: "Бросится в погоню за вором", target: "clicker_start" },
            { text: "Остаться успокаивать девушку", target: "thief_stay" }
        ]
    },

    "thief_stay": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Он забрал мою сумку! Почему ты его не догоняешь?!",
        next: "thief_stay_2"
    },

    "thief_stay_2": {
        background: "",
        characterLeft: "",
        speaker: "{playerName}",
        text: "А что я мог сделать? Он уже убежал.",
        next: "thief_stay_3"
    },

    "thief_stay_3": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Можно было хотя бы попробовать.",
        next: "thief_stay_4"
    },

    "thief_stay_4": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Знаешь... я, пожалуй, пойду. Не хочу больше продолжать это свидание.",
        next: "thief_stay_5"
    },

    "thief_stay_5": {
        background: "",
        characterLeft: "",
        speaker: "Система",
        text: "Хотите увидеть другую концовку? Нажмите в любое место.",
        next: "thief_4"
    },

    "clicker_start": {
        minigame: "clicker",
        winScene: "clicker_win",
        loseScene: "clicker_lose"
    },

    "clicker_lose": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Он забрал мою сумку... Там всё было — телефон, документы...",
        next: "clicker_lose_2"
    },

    "clicker_lose_2": {
        background: "",
        characterLeft: "",
        speaker: "{playerName}",
        text: "Спокойно. Главное, что ты сама не пострадала.",
        next: "clicker_lose_3"
    },

    "clicker_lose_3": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Да, но сумку всё равно жалко...",
        next: "clicker_lose_4"
    },

    "clicker_lose_4": {
        background: "",
        characterLeft: "",
        speaker: "{playerName}",
        text: "Понимаю. Давай хотя бы найдём охрану и попробуем что-нибудь сделать.",
        next: "clicker_lose_5"
    },

    "clicker_lose_5": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Не надо... Уже поздно. Он наверняка далеко.",
        next: "clicker_lose_6"
    },

    "clicker_lose_6": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Спасибо, что остался со мной. Но, если честно, после этого мне уже не хочется продолжать свидание.",
        next: "clicker_lose_7"
    },

    "clicker_lose_7": {
        background: "",
        characterLeft: "",
        speaker: "{playerName}",
        text: "Понимаю. Тогда давай на этом закончим.",
        next: "bad_ending"
    },

    "bad_ending": {
        background: "",
        characterLeft: "",
        speaker: "Система",
        text: "Вы попрощались, и девушка ушла. Свидание закончилось раньше, чем вы планировали.",
        next: "restart"
    },

    "clicker_win": {
        background: "",
        characterLeft: "",
        speaker: "{playerName}",
        text: "Держи. Кажется, сегодня удача на моей стороне.",
        next: "final_1"
    },

    "final_1": {
        background: "",
        characterLeft: "",
        speaker: "{playerName}",
        text: "Теперь с тебя кофе за спасение.",
        next: "final_2"
    },

    "final_3": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Кофе? Хорошо. Но только если я сама выберу место!",
        next: "final_1"
    },

    "final_4": {
        background: "",
        characterLeft: "",
        speaker: "{girlName}",
        text: "Договорились.",
        next: "final_2"
    },

    "final_5": {
        background: "",
        characterLeft: "",
        speaker: "Система",
        text: "Остаток свидания вы весело разговаривали и знакомились друг с другом",
        next: "final_good"
    },

    "good_ending": {
        background: "",
        characterLeft: "",
        speaker: "Система",
        text: "Вы ещё долго гуляли по фестивалю, обсуждая, куда сходите в следующий раз.",
        next: "restart"
    },

    "restart": {
        background: "",
        characterLeft: "",
        speaker: "Система",
        text: "Хотите начать сначала? Нажмите в любое место!",
        next: "start_1"
    },

}