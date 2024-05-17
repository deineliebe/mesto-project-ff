import { openModal } from "./modal.js";
import {
  cardTemplate,
  cardModaleWindow,
  cardCaption,
  cardImage,
} from "./constants.js";
import { removeCard, setLike, removeLike } from "./api.js";

export function addCard(cardData, deleteCard, like, id) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  const likesCount = cardElement.querySelector(".card__like-count");
  likesCount.textContent = cardData.likes.length;
  cardLikeButton.addEventListener("click", (evt) =>
    like(evt, likesCount, cardData._id)
  );
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  if (cardData.owner._id === id) {
    cardDeleteButton.addEventListener("click", () =>
      deleteCard(cardElement, cardData._id)
    );
  } else {
    cardDeleteButton.disabled = true;
  }
  return cardElement;
}

export function deleteCard(card, id) {
  removeCard(id)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

export const like = function (evt, likesCount, id) {
  if (evt.target.classList.contains("card__like-button_is-active")) {
    removeLike(id)
      .then((res) => (likesCount.textContent = res.likes.length))
      .catch((err) => {
        console.log(err);
      });
  } else {
    setLike(id)
      .then((res) => (likesCount.textContent = res.likes.length))
      .catch((err) => {
        console.log(err);
      });
  }
  evt.target.classList.toggle("card__like-button_is-active");
};

export const showPhoto = function (card) {
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardCaption.textContent = card.name;
  openModal(cardModaleWindow);
};
