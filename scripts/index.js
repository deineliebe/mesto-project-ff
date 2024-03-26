const cardTemplate = document.querySelector('#card-template').content;

const places = document.querySelector('.places__list');

function addCard(cardData, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardDeleteButton.addEventListener('click', function() {
        deleteCard(cardElement)
    }); 
    return cardElement;
}

function deleteCard(card) {
    card.remove();
};

for (initialCard of initialCards) {
    places.append(addCard(initialCard, deleteCard));
}