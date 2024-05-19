const baseUrl = "https://nomoreparties.co/v1/wff-cohort-13/";
const token = "a9eb423b-33a6-404a-b572-1ad62523083e";

const handleResponse = (response) => {
  return response
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      return Promise.reject(`Ошибка: ${err}`);
    });
};

export const getInfoAboutUser = () => {
  return handleResponse(
    fetch(`${baseUrl}users/me`, {
      headers: {
        authorization: token,
      },
    })
  );
};

export const getInfoAboutCards = () => {
  return handleResponse(
    fetch(`${baseUrl}cards`, {
      headers: {
        authorization: token,
      },
    })
  );
};

export const updateInfoAboutUser = (name, about) => {
  return handleResponse(
    fetch(`${baseUrl}users/me`, {
      method: "PATCH",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
  );
};

export const postCard = (name, link) => {
  return handleResponse(
    fetch(`${baseUrl}cards`, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
  );
};

export const removeCard = (id) => {
  return handleResponse(
    fetch(`${baseUrl}cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: token,
      },
    })
  );
};

export const setLike = (cardId) => {
  return handleResponse(
    fetch(`${baseUrl}cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
    })
  );
};

export const removeLike = (cardId) => {
  return handleResponse(
    fetch(`${baseUrl}cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
    })
  );
};

export const updateProfileAvatar = (link) => {
  return handleResponse(
    fetch(`${baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: link,
      }),
    })
  );
};
