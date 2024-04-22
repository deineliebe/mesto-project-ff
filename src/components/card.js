import { openModal } from "./modal.js";
import {
  cardTemplate,
  cardModaleWindow,
  cardCaption,
  cardImage,
} from "./constants.js";

export function addCard(cardData, deleteCard, showPhoto, like) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardLikeButton.addEventListener("click", like);
  cardDeleteButton.addEventListener("click", () => deleteCard(cardElement));
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", () => showPhoto(cardData));
  return cardElement;
}

export function deleteCard(card) {
  card.remove();
}

export const like = function (evt) {
  evt.target.classList.toggle("card__like-button_is-active");
};

export const showPhoto = function (card) {
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardCaption.textContent = card.name;
  openModal(cardModaleWindow);
};
