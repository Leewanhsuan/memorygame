let cards = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
];
let revealedCards = [1, 2];
let score = 0;
const Symbols = [
    'https://cdn-icons-png.flaticon.com/512/1/1438.png', // 黑桃
    'https://image.flaticon.com/icons/svg/105/105220.svg', // 愛心
    'https://image.flaticon.com/icons/svg/105/105212.svg', // 方塊
    'https://cdn-icons-png.flaticon.com/512/220/220757.png', // 梅花
];
const view = {
    getCardElement(index) {
        return `<div data-index="${index}" class="card back"></div>`;
    },
    getCardContent(index) {
        const number = this.transformNumber((index % 13) + 1);
        const symbol = Symbols[Math.floor(index / 13)];
        return `<p>${number}</p>
        <img src="${symbol}" />
        <p>${number}</p>
    `;
    },

    transformNumber(number) {
        switch (number) {
            case 1:
                return 'A';
            case 11:
                return 'J';
            case 12:
                return 'Q';
            case 13:
                return 'K';
            default:
                return number;
        }
    },

    displayCards() {
        const rootElement = document.querySelector('#cards');
        rootElement.innerHTML = utility
            .getRandomNumberArray(52)
            .map((index) => this.getCardElement(index))
            .join('');
    },

    flipCard(card) {
        console.log(card);
        if (card.classList.contains('back')) {
            // 回傳正面
            card.classList.remove('back');
            card.innerHTML = this.getCardContent(Number(card.dataset.index)); // 暫時給定 10
            return;
        }
        // 回傳背面
        card.classList.add('back');
        card.innerHTML = null;
    },
};

const utility = {
    getRandomNumberArray(count) {
        const number = Array.from(Array(count).keys());
        for (let index = number.length - 1; index > 0; index--) {
            let randomIndex = Math.floor(Math.random() * (index + 1));
            [number[index], number[randomIndex]] = [number[randomIndex], number[index]];
        }
        return number;
    },
};

view.displayCards();

//NodeList
document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', (event) => {
        view.flipCard(card);
    });
});
