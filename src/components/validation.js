const toggleButtonState = (validationSettings, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const showInputError = (
  validationSettings,
  formElement,
  inputElement,
  errorMessage
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.errorClass);
  }
};

const hideInputError = (validationSettings, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.classList.remove(validationSettings.errorClass);
    errorElement.textContent = "";
  }
};

const checkInputValidity = (validationSettings, formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      validationSettings,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputError(validationSettings, formElement, inputElement);
  }
};

const setEventListeners = (validationSettings, formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationSettings.inputSelector)
  );
  const submitButtonElement = formElement.querySelector(
    validationSettings.submitButtonSelector
  );

  toggleButtonState(validationSettings, inputList, submitButtonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(validationSettings, formElement, inputElement);
      toggleButtonState(validationSettings, inputList, submitButtonElement);
    });
  });
};

export const enableValidation = (validationSettings) => {
  const formList = Array.from(
    document.querySelectorAll(validationSettings.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(validationSettings, formElement);
  });
};

export const clearValidation = (validationSettings, formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationSettings.inputSelector)
  );
  const submitButtonElement = formElement.querySelector(
    validationSettings.submitButtonSelector
  );
  for (let inputElement of inputList) {
    checkInputValidity(validationSettings, formElement, inputElement);
  }
  submitButtonElement.disabled = true;
  submitButtonElement.classList.add(validationSettings.inactiveButtonClass);
};
