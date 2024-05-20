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
  cardModaleWindow,
  cardCaption,
  cardImage,
} from "./components/constants.js";
import { createCard, deleteCard, like } from "./components/card.js";
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
      for (let card of cards) {
        try {
          const newPlace = createCard(
            card,
            deleteCard,
            like,
            showPhoto,
            userId
          );
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
  clearValidation(validationSettings, editProfileForm);
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobDescription.textContent;
};

editProfileButton.addEventListener("click", () => openEditProfileModalWindow());

profileImage.addEventListener("click", () => {
  openModal(editAvatarModalWindow);
  clearValidation(validationSettings, editAvatarForm);
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
      clearValidation(validationSettings, editAvatarForm);
      closeModal(currentForm);
    })
    .catch((err) => console.log(err))
    .finally(
      () =>
        (editAvatarModalWindow.querySelector(".popup__button").textContent =
          "Сохранить")
    );
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
    .catch((err) => console.log(err))
    .finally(
      () =>
        (editProfileModalWindow.querySelector(".popup__button").textContent =
          "Сохранить")
    );
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
  clearValidation(validationSettings, createCardForm);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  postCard(placeInput.value, photoInput.value)
    .then((res) => {
      const newPlace = createCard(res, deleteCard, like, showPhoto, userId);
      placesList.prepend(newPlace);
      clearValidation(validationSettings, createCardForm);
      closeModal(createCardModalWindow);
    })
    .catch((err) => console.log(err))
    .finally(
      () =>
        (createCardModalWindow.querySelector(".popup__button").textContent =
          "Сохранить")
    );
}

createCardForm.addEventListener("submit", handleCardFormSubmit);

initData();
enableValidation(validationSettings);
