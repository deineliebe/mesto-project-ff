export function openModal(popup) {
  popup.classList.add("popup_is-animated");
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 0);
  document.addEventListener("keydown", escClose);
  document.addEventListener("click", buttonClose);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  setTimeout(() => {
    popup.classList.remove("popup_is-animated");
  }, 600);
  document.removeEventListener("keydown", escClose);
  document.removeEventListener("click", buttonClose);
}

export const escClose = function (evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
    return true;
  }
  return false;
};

export const buttonClose = (evt) => {
  if (
    evt.target.classList.contains("popup_is-opened") ||
    evt.target.closest(".popup__close")
  ) {
    closeModal(evt.target.closest(".popup"));
    return true;
  }
  return false;
};
