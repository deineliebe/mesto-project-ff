import { cardTemplate } from "./constants.js";
import { removeCard, setLike, removeLike } from "./api.js";

export function createCard(cardData, deleteCard, like, showPhoto, id) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__image").addEventListener("click", () => {
    showPhoto(cardData);
  });
  cardElement.querySelector(".card__title").textContent = cardData.name;
  const likesCount = cardElement.querySelector(".card__like-count");
  likesCount.textContent = cardData.likes.length;
  if (cardData.likes.some((like) => like._id === id)) {
    cardElement
      .querySelector(".card__like-button")
      .classList.add("card__like-button_is-active");
  }
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
  const likeMethod = evt.target.classList.contains(
    "card__like-button_is-active"
  )
    ? removeLike
    : setLike;
  likeMethod(id)
    .then((res) => {
      likesCount.textContent = res.likes.length;
      evt.target.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => console.log(err));
};
