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
  addCardButton,
  addCardModalWindow,
  addCardForm,
  placeInput,
  photoInput,
  placesList,
  validationSettings,
} from "./components/constants.js";
import { addCard, deleteCard, like, showPhoto } from "./components/card.js";
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
  clearValidation(validationSettings, addCardForm);
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
          let newPlace = addCard(initialCard, deleteCard, like, userId);
          newPlace
            .querySelector(".card__image")
            .addEventListener("click", () => {
              showPhoto(initialCard);
              document.addEventListener("keydown", escClose);
              document.addEventListener("click", buttonClose);
            });
          if (initialCard.likes.some((like) => like._id === userId)) {
            newPlace
              .querySelector(".card__like-button")
              .classList.add("card__like-button_is-active");
          }
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
  document.addEventListener(
    "keydown",
    function editProfileButtonProcessing(evt) {
      if (escClose(evt)) {
        nameInput.value = nameTitle.textContent;
        jobInput.value = jobDescription.textContent;
        clearValidation(validationSettings, editProfileForm);
        document.removeEventListener("keydown", editProfileButtonProcessing);
      }
    }
  );
  document.addEventListener("click", function editProfileClickProcessing(evt) {
    if (buttonClose(evt)) {
      nameInput.value = nameTitle.textContent;
      jobInput.value = jobDescription.textContent;
      clearValidation(validationSettings, editProfileForm);
      document.removeEventListener("click", editProfileClickProcessing);
    }
  });
};

editProfileButton.addEventListener("click", () => openEditProfileModalWindow());

profileImage.addEventListener("click", () => {
  openModal(editAvatarModalWindow);
  document.addEventListener(
    "keydown",
    function editAvatarButtonProcessing(evt) {
      if (escClose(evt)) {
        clearValidation(validationSettings, editAvatarForm);
        editAvatarForm.reset();
        document.removeEventListener("keydown", editAvatarButtonProcessing);
      }
    }
  );
  document.addEventListener("click", function editAvatarClickProcessing(evt) {
    if (buttonClose(evt)) {
      clearValidation(validationSettings, editAvatarForm);
      editAvatarForm.reset();
      document.removeEventListener("click", editAvatarClickProcessing);
    }
  });
});

editAvatarForm.addEventListener("submit", handleProfileAvatarFormSubmit);

function handleProfileAvatarFormSubmit(evt) {
  evt.preventDefault();
  const currentForm = document.querySelector(".popup_is-opened");
  currentForm.querySelector(".popup__button").textContent = "Сохранение...";
  updateProfileAvatar(avatarInput.value)
    .then(() => {
      profileImage.setAttribute(
        "style",
        `background-image: url('${avatarInput.value}');`
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
  currentForm.querySelector(".popup__button").textContent = "Сохранение...";
  updateInfoAboutUser(nameInput.value, jobInput.value)
    .then(() => {
      nameTitle.textContent = nameInput.value;
      jobDescription.textContent = jobInput.value;
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

addCardButton.addEventListener("click", () => {
  openModal(addCardModalWindow);
  document.addEventListener("keydown", function addCardButtonProcessing(evt) {
    if (escClose(evt)) {
      addCardForm.reset();
      clearValidation(validationSettings, addCardForm);
      document.removeEventListener("keydown", addCardButtonProcessing);
    }
  });
  document.addEventListener("click", function addCardClickProcessing(evt) {
    if (buttonClose(evt)) {
      addCardForm.reset();
      clearValidation(validationSettings, addCardForm);
      document.removeEventListener("click", addCardClickProcessing);
    }
  });
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const currentForm = document.querySelector(".popup_is-opened");
  currentForm.querySelector(".popup__button").textContent = "Сохранение...";
  postCard(placeInput.value, photoInput.value)
    .then(() => {
      const cardInformation = {
        name: placeInput.value,
        link: photoInput.value,
        likes: [],
        owner: {
          _id: userId,
        },
      };
      const newPlace = addCard(cardInformation, deleteCard, like, userId);
      newPlace.querySelector(".card__image").addEventListener("click", () => {
        showPhoto(cardInformation);
        document.addEventListener("keydown", escClose);
        document.addEventListener("click", buttonClose);
      });
      placesList.prepend(newPlace);
      addCardForm.reset();
      clearValidation(validationSettings, addCardForm);
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
