import './pages/index.css';

import {initialCards} from './components/cards.js';
import {placesList, addCard, deleteCard, like, showImage} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';

for (let initialCard of initialCards) {
    placesList.append(addCard(initialCard, deleteCard));
}

const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');
const nameTitle = document.querySelector('.profile__title');
const jobDescription = document.querySelector('.profile__description');

const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileModalWindow = document.querySelector('.popup_type_edit');
editProfileButton.addEventListener('click', () => {
    openModal(editProfileModalWindow)
    nameInput.value = nameTitle.textContent;
    jobInput.value = jobDescription.textContent;
});

function handleProfileInfoFormSubmit(evt) {
    evt.preventDefault();
    nameTitle.textContent = nameInput.value;
    jobDescription.textContent = jobInput.value;
    closeModal(document.querySelector('.popup_is-opened'));
}

editProfileForm.addEventListener('submit', handleProfileInfoFormSubmit); 

const addCardButton = document.querySelector('.profile__add-button');
const addCardModalWindow = document.querySelector('.popup_type_new-card');

addCardButton.addEventListener('click', () => openModal(addCardModalWindow));

const addCardForm = document.forms['new-place'];
const placeInput = addCardForm.querySelector('.popup__input_type_card-name');
const photoInput = addCardForm.querySelector('.popup__input_type_url');

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    placesList.prepend(addCard({
        name: placeInput.value,
        link: photoInput.value,
    }, deleteCard));
    addCardForm.reset();
    closeModal(document.querySelector('.popup_is-opened'));
}

addCardForm.addEventListener('submit', handleCardFormSubmit);

placesList.addEventListener('click', like); 
placesList.addEventListener('click', showImage); 

export const cardModaleWindow = document.querySelector('.popup_type_image');
export const cardCaption = cardModaleWindow.querySelector('.popup__caption');
export const cardImage = cardModaleWindow.querySelector('.popup__image');