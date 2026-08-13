// js/scenario.js

export const  scenes = {
    "start_1": {
        background: "./pictures/scene/start.webp",
        characterLeft: "./pictures/narrator/narrator_none.webp",
        speaker: "Рассказчик",
        text: "Ах, отцовство, что может быть лучше, чем гулять со своей дочкой по полю?",
        next: "start_2"
    },

    "start_2": {
        background: "./pictures/scene/start.webp",
        characterLeft: "./pictures/narrator/narrator_none.webp",
        speaker: "Рассказчик",
        text: "Конечно, есть небольшие опасности, вдруг дочка споткнётся или порежется об траву?",
        next: "start_Dragon_1"
    },

    "start_Dragon_1": {
        background: "./pictures/scene/dragon_1.webp",
        characterLeft: "./pictures/narrator/narrator_none.webp",
        speaker: "Рассказчик",
        text: "...",
        next: "start_Dragon_2"
    },

    "start_Dragon_2": {
        background: "./pictures/scene/dragon_2.webp",
        characterLeft: "./pictures/narrator/narrator_none.webp",
        speaker: "Рассказчик",
        text: "...",
        next: "start_Dragon_3"
    },

    "start_Dragon_3": {
        background: "./pictures/scene/dragon_2.webp",
        characterLeft: "./pictures/narrator/narrator_none.webp",
        speaker: "Рассказчик",
        text: "Или её унесёт дракон!",
        next: "father_1"
    },

    "father_1": {
        background: "./pictures/scene/dragon_2.webp",
        characterLeft: "./pictures/father/father_hungry.webp",
        speaker: "Отец",
        text: "ВЕРНИ МНЕ МОЮ ДОЧЬ!!!",
        choices: [
            { text: "Бросить в дракона камень", target: "dragon_Escape_1" },
            { text: "Побежать за драконом", target: "pursuit_1" }
        ]
    },

    "dragon_Escape_1": {
        background: "./pictures/scene/dragon_Escape_1.webp",
        characterLeft: null,
        speaker: "Система",
        text: "Вы бросили камень...",
        next: "dragon_Escape_2"
    },

    "dragon_Escape_2": {
        background: "./pictures/scene/dragon_Escape_2.webp",
        characterLeft: null,
        speaker: "Система",
        text: "Камень попал по дракону и отлетел.",
        next: "dragon_Escape_3"
    },

    "dragon_Escape_3": {
        background: "./pictures/scene/dragon_Escape_3.webp",
        characterLeft: null,
        speaker: "Система",
        text: "Дракон безвозвратно улетел. Вы потеряли дочь. Нажмите в любое место, чтобы начать с чекпоинта.",
        next: "father_1"
    },


    "pursuit_1": {
        background: "./pictures/scene/pursuit_1.webp",
        characterLeft: "./pictures/narrator/narrator_none.webp",
        speaker: "Рассказчик",
        text: "Вы смело кинулись в погоню за драконом. Настоящий отец!",
        next: "pursuit_2"
    },

    "pursuit_2": {
        background: "./pictures/scene/pursuit_1.webp",
        characterLeft: "./pictures/father/father_hungry.webp",
        speaker: "Отец",
        text: "Убежать от меня?! Не бывать этому!",
        next: "pursuit_3"
    },

    "pursuit_3": {
        background: "./pictures/scene/pursuit_1.webp",
        characterLeft: "./pictures/narrator/narrator_none.webp",
        speaker: "Рассказчик",
        text: "Наш герой смело бросился в погоню, но что это перед ним?",
        next: "geysers_1"
    },

    "geysers_1": {
        background: "./pictures/scene/geysers_1.webp",
        characterLeft: "./pictures/narrator/narrator_none.webp",
        speaker: "Рассказчик",
        text: "Это гейзеры. Полный вулкан действующих гейзеров! Нужно аккуратно пройти сквозь них.",
        next: "geysers_game"
    },

    "geysers_game": {
        minigame: "geysers",
        winScene: "geysers_win",
        loseScene: "geysers_lose"
    },

    "geysers_win": {
        background: "./pictures/scene/geysers_1.webp",
        characterLeft: "./pictures/father/father_hungry.webp",
        speaker: "Отец",
        text: "Верни мне мою дочь!",
        next: "Illusory Mountains_1"
    },

    "geysers_lose": {
        background: "./pictures/scene/geysers_1.webp",
        characterLeft: null,
        speaker: "Система",
        text: "Вы наступили на гейзер. Нажмите в любое место, чтобы начать с чекпоинта.",
        next: "father_1"
    },

    "Illusory Mountains_1": {
        background: "./pictures/scene/illusorymountains_1.webp",
        characterLeft: "./pictures/narrator/narrator_none.webp",
        speaker: "Рассказчик",
        text: "О нет, дракон открыл портал!",
        next: "Illusory Mountains_2"
    },

    "Illusory Mountains_2": {
        background: "./pictures/scene/illusorymountains_2.webp",
        characterLeft: "./pictures/narrator/narrator_none.webp",
        speaker: "Рассказчик",
        text: "Это проблема, ведь на входе стоит иллюзорный барьер.",
        next: "Illusory Mountains_3"
    },

    "Illusory Mountains_3": {
        background: "./pictures/scene/illusorymountains_2.webp",
        characterLeft: "./pictures/narrator/narrator_none.webp",
        speaker: "Рассказчик",
        text: "Сможет ли наш герой взломать барьер и пройти в новый мир?",
        next: "memory_game"
    },

    "memory_game": {
        minigame: "memory",
        winScene: "memory_win",
        loseScene: "memory_lose"
    },

    "memory_lose": {
        background: "./pictures/scene/memory_lose.webp",
        characterLeft: null,
        speaker: "Система",
        text: "Вы не разгадали магический шифр, и портал навсегда закрылся. Нажмите в любое место, чтобы начать с чекпоинта.",
        next: "Illusory Mountains_3"
    },

    "memory_win": {
        background: "./pictures/scene/memory_win.webp",
        characterLeft: null,
        speaker: "Система",
        text: "Вы верно разгадали магические символы, портал открыт!",
        next: "new_world_1"
    },

    "new_world_1": {
        background: "./pictures/scene/new_world_1.webp",
        characterLeft: "./pictures/narrator/narrator_none.webp",
        speaker: "Рассказчик",
        text: "Отец делает шаг сквозь портал и замирает. Перед ним открывается мир парящих островов и неоновых лесов.",
        next: "new_world_2"
    },

    "new_world_2": {
        background: "./pictures/scene/new_world_1.webp",
        characterLeft: "./pictures/father/father_hungry.webp",
        speaker: "Отец",
        text: "Этот дракон думал, что сможет скрыться в другом измерении от меня?",
        next: "new_world_3"
    },

    "new_world_3": {
        background: "./pictures/scene/new_world_3.webp",
        characterLeft: null,
        speaker: "Система",
        text: "Под ногами вы видите магический посох.",
        next: "new_world_4"
    },

    "new_world_4": {
        background: "./pictures/scene/new_world_1.webp",
        characterLeft: "./pictures/narrator/narrator_none.webp",
        speaker: "Рассказчик",
        text: "Вдалеке силуэт дракона с девочкой на спине скрывается за гигантским кристальным пиком. Нужно спешить!",
        choices: [
            { text: "Взять в руки магический посох и идти по следам", target: "tracking_1" },
            { text: "Попытаться приручить местного дракончика для погони", target: "tame_beast_1" }
        ]
    },

    "tame_beast_1": {
        background: "./pictures/scene/tame_beast_1.webp",
        characterLeft: "./pictures/father/father_hungry.webp",
        speaker: "Отец",
        text: "Эй, чешуйчатый! Подвезешь отца?",
        next: "tame_beast_2"
    },

    "tame_beast_2": {
        background: "./pictures/scene/tame_beast_2.webp",
        characterLeft: null,
        speaker: "Система",
        text: "Дракончик оценил ваш юмор и попыталось утащить ваш рюкзак! Быстро возвращайте своё имущество!",
        next: "clicker_game"
    },

    "clicker_game": {
        minigame: "clicker",
        winScene: "tame_beast_win",
        loseScene: "tame_beast_lose"
    },

    "tame_beast_lose": {
        background: "./pictures/scene/tame_beast_lose_1.webp",
        characterLeft: "./pictures/father/father_hungry.webp",
        speaker: "Отец",
        text: "Нет! Верни мой рюкзак!",
        next: "tame_beast_lose_2"
    },

    "tame_beast_lose_2": {
        background: "./pictures/scene/tame_beast_lose_2.webp",
        characterLeft: null,
        speaker: "Система",
        text: "Без рюкзака вы заблудились, изголодали и умерли. Нажмите в любое место, чтобы начать с чекпоинта.",
        next: "new_world_3"
    },

    "tame_beast_win": {
        background: "./pictures/scene/tame_beast_1.webp",
        characterLeft: "./pictures/father/father_hungry.webp",
        speaker: "Отец",
        text: "Ха! Получи, рюкзак мой!",
        next: "tracking_1"
    },

    "tracking_1": {
        background: "./pictures/scene/tracking_1.webp",
        characterLeft: null,
        speaker: "Система",
        text: "Вы подобрали посох и продолжили путь.",
        next: "tracking_2"
    },

    "tracking_2": {
        background: "./pictures/scene/tracking_1.webp",
        characterLeft: "./pictures/father/father.webp",
        speaker: "Отец",
        text: "Пешком так пешком. Моему терпению нет предела.",
        next: "dragon_nest_1"
    },

    "dragon_nest_1": {
        background: "./pictures/scene/dragon_nest_1.webp",
        characterLeft: "./pictures/narrator/narrator_none.webp",
        speaker: "Рассказчик",
        text: "Герой выходит к огромному кратеру, усыпанному сокровищами. В центре сидит тот самый дракон, а дочка... увлеченно играет с его хвостом!",
        next: "final_dragon_1"
    },

    "final_dragon_1": {
        background: "./pictures/scene/final_dragon_1.webp",
        characterLeft: "./pictures/father/father_hungry.webp",
        speaker: "Отец",
        text: "Доча, сколько раз я говорил: не трогай чужих драконов и не играй с их хвостами! Немедленно марш сюда!",
        next: "final_dragon_2"
    },

    "final_dragon_2": {
        background: "./pictures/scene/father_and_mather_1.webp",
        characterLeft: "./pictures/narrator/narrator_none.webp",
        speaker: "Рассказчик",
        text: "Дракон предпочёл вернуть ребенка добровольно.",
        next: "father_and_mather"
    },

    "father_and_mather": {
        background: "./pictures/scene/father_and_mather_2.webp",
        characterLeft: "./pictures/father/father.webp",
        speaker: "Отец",
        text: "Дорогая, мы дома!",
        next: "end"
    },

    "end": {
        background: "./pictures/scene/end_narrator.webp",
        characterLeft: "./pictures/narrator/narrator_none.webp",
        speaker: "Рассказчик",
        text: "Вот и конец этой сказки... Спасибо, что прочли!",
        next: null
    }
};