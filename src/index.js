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
  profileImage,
  editAvatarForm,
  editAvatarModalWindow,
  createCardButton,
  createCardModalWindow,
  createCardForm,
  placeInput,
  photoInput,
  placesList,
  validationSettings,
} from "./components/constants.js";
import { createCard, deleteCard, like, showPhoto } from "./components/card.js";
import {
  openModal,
  closeModal,
  buttonClose,
  escClose,
} from "./components/modal.js";
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
  clearValidation(validationSettings, editAvatarForm);
  clearValidation(validationSettings, createCardForm);
  Promise.all([getInfoAboutUser(), getInfoAboutCards()])
    .then((results) => {
      const users = results[0];
      const cards = results[1];
      nameTitle.textContent = users.name;
      jobDescription.textContent = users.about;
      nameInput.value = nameTitle.textContent;
      jobInput.value = jobDescription.textContent;
      profileImage.setAttribute(
        "style",
        `background-image: url('${users.avatar}');`
      );
      userId = users._id;
      for (let initialCard of cards) {
        try {
          const newPlace = createCard(initialCard, deleteCard, like, userId);
          newPlace
            .querySelector(".card__image")
            .addEventListener("click", () => {
              showPhoto(initialCard);
              document.addEventListener("keydown", escClose);
              document.addEventListener("click", buttonClose);
            });
          placesList.append(newPlace);
        } catch (err) {
          console.log(err);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

const openEditProfileModalWindow = function () {
  openModal(editProfileModalWindow);
  editProfileModalWindow.querySelector(".popup__button").textContent =
    "Сохранить";
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobDescription.textContent;
  clearValidation(validationSettings, editProfileForm);
};

editProfileButton.addEventListener("click", () => openEditProfileModalWindow());

profileImage.addEventListener("click", () => {
  openModal(editAvatarModalWindow);
  editAvatarModalWindow.querySelector(".popup__button").textContent =
    "Сохранить";
  clearValidation(validationSettings, editAvatarForm);
  editAvatarForm.reset();
});

editAvatarForm.addEventListener("submit", handleProfileAvatarFormSubmit);

function handleProfileAvatarFormSubmit(evt) {
  evt.preventDefault();
  const currentForm = document.querySelector(".popup_is-opened");
  updateProfileAvatar(avatarInput.value)
    .then((res) => {
      profileImage.setAttribute(
        "style",
        `background-image: url('${res.avatar}');`
      );
      editAvatarForm.reset();
      clearValidation(validationSettings, editAvatarForm);
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
  updateInfoAboutUser(nameInput.value, jobInput.value)
    .then((res) => {
      nameTitle.textContent = res.name;
      jobDescription.textContent = res.about;
      clearValidation(validationSettings, editProfileForm);
      closeModal(currentForm);
    })
    .catch((err) => {
      console.log(err);
      currentForm.querySelector(".popup__button").textContent =
        "Ошибка соединения";
    });
}

editProfileForm.addEventListener("submit", handleProfileInfoFormSubmit);

const showPhoto = function (card) {
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardCaption.textContent = card.name;
  openModal(cardModaleWindow);
};

createCardButton.addEventListener("click", () => {
  openModal(createCardModalWindow);
  createCardForm.reset();
  editAvatarModalWindow.querySelector(".popup__button").textContent =
    "Сохранить";
  clearValidation(validationSettings, createCardForm);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const currentForm = document.querySelector(".popup_is-opened");
  postCard(placeInput.value, photoInput.value)
    .then((res) => {
      const cardInformation = {
        name: res.name,
        link: res.link,
        likes: [],
        owner: {
          _id: res.owner._id,
        },
        _id: res._id,
      };
      const newPlace = createCard(cardInformation, deleteCard, like, userId);
      newPlace.querySelector(".card__image").addEventListener("click", () => {
        showPhoto(cardInformation);
        document.addEventListener("keydown", escClose);
        document.addEventListener("click", buttonClose);
      });
      placesList.prepend(newPlace);
      createCardForm.reset();
      clearValidation(validationSettings, createCardForm);
      closeModal(document.querySelector(".popup_is-opened"));
    })
    .catch((err) => {
      console.log(err);
      currentForm.querySelector(".popup__button").textContent =
        "Ошибка соединения";
    });
}

createCardForm.addEventListener("submit", handleCardFormSubmit);

initData();
enableValidation(validationSettings);
