const cardTemplate = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');

function addCard(cardData, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', function() {
        deleteCard(cardElement)
    }); 
    return cardElement;
}

function deleteCard(card) {
    card.remove();
};

for (let i = 0; i < initialCards.length; i++) {
    placesList.append(addCard(initialCards[i], deleteCard));
}