export const editProfileForm = document.forms["edit-profile"];
export const nameInput = editProfileForm.querySelector(
  ".popup__input_type_name"
);
export const jobInput = editProfileForm.querySelector(
  ".popup__input_type_description"
);
export const nameTitle = document.querySelector(".profile__title");
export const jobDescription = document.querySelector(".profile__description");
export const editProfileButton = document.querySelector(
  ".profile__edit-button"
);
export const editProfileModalWindow =
  document.querySelector(".popup_type_edit");
  export const profileImage = document.querySelector(".profile__image");
export const editAvatarForm = document.forms["edit-profile-avatar"];
export const avatarInput = editAvatarForm.querySelector(
  ".popup__input_type_avatar"
);
export const editAvatarModalWindow = document.querySelector(
  ".popup_type_edit-avatar"
);
export const addCardButton = document.querySelector(".profile__add-button");
export const addCardModalWindow = document.querySelector(
  ".popup_type_new-card"
);
export const addCardForm = document.forms["new-place"];
export const placeInput = addCardForm.querySelector(
  ".popup__input_type_card-name"
);
export const photoInput = addCardForm.querySelector(".popup__input_type_url");
export const cardTemplate = document.querySelector("#card-template").content;
export const placesList = document.querySelector(".places__list");
export const cardModaleWindow = document.querySelector(".popup_type_image");
export const cardCaption = cardModaleWindow.querySelector(".popup__caption");
export const cardImage = cardModaleWindow.querySelector(".popup__image");
export const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button-disabled",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__error",
};
