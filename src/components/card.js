import { openModal } from "./modal.js";
import { cardModaleWindow, cardCaption, cardImage } from "../index.js";

const cardTemplate = document.querySelector("#card-template").content;

export const placesList = document.querySelector(".places__list");

export function addCard(cardData, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardDeleteButton.addEventListener("click", function () {
    deleteCard(cardElement);
  });
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", function () {
      showPhoto(cardData);
    });
  return cardElement;
}

export function deleteCard(card) {
  card.remove();
}

export const like = function (evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
};

export const showImage = function (evt) {
  if (evt.target.classList.contains(".card__image")) {
    showPhoto(evt.target);
  }
};

const showPhoto = function (card) {
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardCaption.textContent = card.name;
  openModal(cardModaleWindow);
};
