import "./pages/index.css";

import {
  editProfileForm,
  nameInput,
  jobInput,
  nameTitle,
  jobDescription,
  editProfileButton,
  editProfileModalWindow,
  avatarInput,
  editAvatarForm,
  editAvatarModalWindow,
  addCardButton,
  addCardModalWindow,
  addCardForm,
  placeInput,
  photoInput,
  placesList,
  validationSettings,
  headerLogo,
} from "./components/constants.js";
import { addCard, deleteCard, like, showPhoto } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getInfoAboutUser,
  getInfoAboutCards,
  updateInfoAboutUser,
  postCard,
  updateProfileAvatar,
} from "./components/api.js";

let userId;

function initData() {
  Promise.all([getInfoAboutUser(), getInfoAboutCards()])
    .then((results) => {
      const userInfo = results[0];
      const cardsInfo = results[1];
      nameTitle.textContent = userInfo.name;
      jobDescription.textContent = userInfo.about;
      headerLogo.setAttribute(
        "style",
        `background-image: url('${userInfo.avatar}');`
      );
      userId = userInfo._id;
      for (let initialCard of cardsInfo) {
        let newPlace = addCard(
          initialCard,
          deleteCard,
          showPhoto,
          like,
          userId
        );
        if (initialCard.likes.some((like) => like._id === userId)) {
          newPlace
            .querySelector(".card__like-button")
            .classList.add("card__like-button_is-active");
        }
        placesList.append(newPlace);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

const openEditProfileModalWindow = function () {
  openModal(editProfileModalWindow);
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobDescription.textContent;
  clearValidation(validationSettings, editProfileForm);
};

editProfileButton.addEventListener("click", () => openEditProfileModalWindow());

headerLogo.addEventListener("click", () => {
  editAvatarForm.reset();
  clearValidation(validationSettings, editAvatarForm);
  openModal(editAvatarModalWindow);
});

editAvatarForm.addEventListener("submit", handleProfileAvatarFormSubmit);

function handleProfileAvatarFormSubmit(evt) {
  evt.preventDefault();
  const currentForm = document.querySelector(".popup_is-opened");
  currentForm.querySelector(".popup__button").textContent = "Сохранение...";
  updateProfileAvatar(avatarInput.value)
    .then(() => {
      headerLogo.setAttribute(
        "style",
        `background-image: url('${avatarInput.value}');`
      );
      closeModal(currentForm);
    })
    .catch((err) => {
      console.log(err);
      currentForm.querySelector(".popup__button").textContent =
        "Ошибка соединения";
    });
}

function handleProfileInfoFormSubmit(evt) {
  evt.preventDefault();
  const currentForm = document.querySelector(".popup_is-opened");
  currentForm.querySelector(".popup__button").textContent = "Сохранение...";
  updateInfoAboutUser(nameInput.value, jobInput.value)
    .then(() => {
      nameTitle.textContent = nameInput.value;
      jobDescription.textContent = jobInput.value;
      closeModal(currentForm);
    })
    .catch((err) => {
      console.log(err);
      currentForm.querySelector(".popup__button").textContent =
        "Ошибка соединения";
    });
}

editProfileForm.addEventListener("submit", handleProfileInfoFormSubmit);

addCardButton.addEventListener("click", () => {
  addCardForm.reset();
  clearValidation(validationSettings, addCardForm);
  openModal(addCardModalWindow);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const currentForm = document.querySelector(".popup_is-opened");
  currentForm.querySelector(".popup__button").textContent = "Сохранение...";
  postCard(placeInput.value, photoInput.value)
    .then(() => {
      placesList.prepend(
        addCard(
          {
            name: placeInput.value,
            link: photoInput.value,
            likes: [],
            owner: {
              _id: userId,
            },
          },
          deleteCard,
          showPhoto,
          like,
          userId
        )
      );
      closeModal(document.querySelector(".popup_is-opened"));
    })
    .catch((err) => {
      console.log(err);
      currentForm.querySelector(".popup__button").textContent =
        "Ошибка соединения";
    });
}

addCardForm.addEventListener("submit", handleCardFormSubmit);

initData();
enableValidation(validationSettings);
