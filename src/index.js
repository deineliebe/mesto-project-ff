import "./pages/index.css";

import {
  editProfileForm,
  nameInput,
  jobInput,
  nameTitle,
  jobDescription,
  editProfileButton,
  editProfileModalWindow,
  addCardButton,
  addCardModalWindow,
  addCardForm,
  placeInput,
  photoInput,
  placesList,
} from "./components/constants.js";
import { initialCards } from "./components/cards.js";
import { addCard, deleteCard, like, showPhoto } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";

for (let initialCard of initialCards) {
  placesList.append(addCard(initialCard, deleteCard, showPhoto, like));
}

const openEditProfileModalWindow = function () {
  openModal(editProfileModalWindow);
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobDescription.textContent;
};

editProfileButton.addEventListener("click", () => openEditProfileModalWindow());

function handleProfileInfoFormSubmit(evt) {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  jobDescription.textContent = jobInput.value;
  closeModal(document.querySelector(".popup_is-opened"));
}

editProfileForm.addEventListener("submit", handleProfileInfoFormSubmit);

addCardButton.addEventListener("click", () => openModal(addCardModalWindow));

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  placesList.prepend(
    addCard(
      {
        name: placeInput.value,
        link: photoInput.value,
      },
      deleteCard,
      showPhoto,
      like
    )
  );
  addCardForm.reset();
  closeModal(document.querySelector(".popup_is-opened"));
}

addCardForm.addEventListener("submit", handleCardFormSubmit);
