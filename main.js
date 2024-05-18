(()=>{"use strict";var e=document.forms["edit-profile"],t=e.querySelector(".popup__input_type_name"),n=e.querySelector(".popup__input_type_description"),o=document.querySelector(".profile__title"),r=document.querySelector(".profile__description"),c=document.querySelector(".profile__edit-button"),u=document.querySelector(".popup_type_edit"),i=document.querySelector(".profile__image"),a=document.forms["edit-profile-avatar"],s=a.querySelector(".popup__input_type_avatar"),l=document.querySelector(".popup_type_edit-avatar"),d=document.querySelector(".profile__add-button"),p=document.querySelector(".popup_type_new-card"),f=document.forms["new-place"],m=f.querySelector(".popup__input_type_card-name"),_=f.querySelector(".popup__input_type_url"),v=document.querySelector("#card-template").content,y=document.querySelector(".places__list"),h=document.querySelector(".popup_type_image"),S=h.querySelector(".popup__caption"),k=h.querySelector(".popup__image"),b={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button-disabled",inputErrorClass:"popup__input-error",errorClass:"popup__error"};function q(e){e.classList.add("popup_is-animated"),setTimeout((function(){e.classList.add("popup_is-opened")}),0)}function L(e){e.classList.remove("popup_is-opened"),setTimeout((function(){e.classList.remove("popup_is-animated")}),600),document.removeEventListener("keydown",g),document.removeEventListener("click",C)}var g=function(e){return"Escape"===e.key&&(L(document.querySelector(".popup_is-opened")),!0)},C=function(e){return e.target.classList.contains("popup_is-opened")?(L(e.target),!0):!!e.target.closest(".popup__close")&&(L(e.target.closest(".popup")),!0)},E="https://nomoreparties.co/v1/wff-cohort-13/",x="a9eb423b-33a6-404a-b572-1ad62523083e";function j(e,t,n,o){var r=v.querySelector(".card").cloneNode(!0),c=r.querySelector(".card__like-button");r.querySelector(".card__image").src=e.link,r.querySelector(".card__image").alt=e.name,r.querySelector(".card__title").textContent=e.name;var u=r.querySelector(".card__like-count");u.textContent=e.likes.length,c.addEventListener("click",(function(t){return n(t,u,e._id)}));var i=r.querySelector(".card__delete-button");return e.owner._id===o?i.addEventListener("click",(function(){return t(r,e._id)})):i.disabled=!0,r}function w(e,t){(function(e){return fetch("".concat(E,"cards/").concat(e),{method:"DELETE",headers:{authorization:x}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))})(t).then((function(){e.remove()})).catch((function(e){console.log(e)}))}var A,T=function(e,t,n){var o;e.target.classList.contains("card__like-button_is-active")?(o=n,fetch("".concat(E,"cards/likes/").concat(o),{method:"DELETE",headers:{authorization:x,"Content-Type":"application/json"}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){return t.textContent=e.likes.length})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(E,"cards/likes/").concat(e),{method:"PUT",headers:{authorization:x,"Content-Type":"application/json"}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(n).then((function(e){return t.textContent=e.likes.length})).catch((function(e){console.log(e)})),e.target.classList.toggle("card__like-button_is-active")},P=function(e){k.src=e.link,k.alt=e.name,S.textContent=e.name,q(h)},z=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?(n.disabled=!1,n.classList.remove(e.inactiveButtonClass)):(n.disabled=!0,n.classList.add(e.inactiveButtonClass))},B=function(e,t,n){n.validity.patternMismatch?n.setCustomValidity(n.dataset.errorMessage):n.setCustomValidity(""),n.validity.valid?function(e,t,n){var o=t.querySelector(".".concat(n.id,"-error"));o&&(n.classList.remove(e.inputErrorClass),o.classList.remove(e.errorClass),o.textContent="")}(e,t,n):function(e,t,n,o){var r=t.querySelector(".".concat(n.id,"-error"));r&&(n.classList.add(e.inputErrorClass),r.textContent=o,r.classList.add(e.errorClass))}(e,t,n,n.validationMessage)},O=function(e,t){t.querySelector(".popup__button").textContent="Сохранить";for(var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector),r=0,c=n;r<c.length;r++){var u=c[r];B(e,t,u)}z(e,n,o)};function D(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}c.addEventListener("click",(function(){return q(u),document.addEventListener("keydown",(function c(u){g(u)&&(t.value=o.textContent,n.value=r.textContent,O(b,e),document.removeEventListener("keydown",c))})),void document.addEventListener("click",(function c(u){C(u)&&(t.value=o.textContent,n.value=r.textContent,O(b,e),document.removeEventListener("click",c))}))})),i.addEventListener("click",(function(){q(l),document.addEventListener("keydown",(function e(t){g(t)&&(O(b,a),a.reset(),document.removeEventListener("keydown",e))})),document.addEventListener("click",(function e(t){C(t)&&(O(b,a),a.reset(),document.removeEventListener("click",e))}))})),a.addEventListener("submit",(function(e){e.preventDefault();var t,n=document.querySelector(".popup_is-opened");n.querySelector(".popup__button").textContent="Сохранение...",(t=s.value,fetch("".concat(E,"users/me/avatar "),{method:"PATCH",headers:{authorization:x,"Content-Type":"application/json"},body:JSON.stringify({avatar:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){i.setAttribute("style","background-image: url('".concat(s.value,"');")),a.reset(),O(b,a),L(n)})).catch((function(e){console.log(e),n.querySelector(".popup__button").textContent="Ошибка соединения"}))})),e.addEventListener("submit",(function(c){c.preventDefault();var u,i,a=document.querySelector(".popup_is-opened");a.querySelector(".popup__button").textContent="Сохранение...",(u=t.value,i=n.value,fetch("".concat(E,"users/me"),{method:"PATCH",headers:{authorization:x,"Content-Type":"application/json"},body:JSON.stringify({name:u,about:i})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){o.textContent=t.value,r.textContent=n.value,O(b,e),L(a)})).catch((function(e){console.log(e),a.querySelector(".popup__button").textContent="Ошибка соединения"}))})),d.addEventListener("click",(function(){q(p),document.addEventListener("keydown",(function e(t){g(t)&&(f.reset(),O(b,f),document.removeEventListener("keydown",e))})),document.addEventListener("click",(function e(t){C(t)&&(f.reset(),O(b,f),document.removeEventListener("click",e))}))})),f.addEventListener("submit",(function(e){e.preventDefault();var t,n,o=document.querySelector(".popup_is-opened");o.querySelector(".popup__button").textContent="Сохранение...",(t=m.value,n=_.value,fetch("".concat(E,"cards"),{method:"POST",headers:{authorization:x,"Content-Type":"application/json"},body:JSON.stringify({name:t,link:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){var e={name:m.value,link:_.value,likes:[],owner:{_id:A}},t=j(e,w,T,A);t.querySelector(".card__image").addEventListener("click",(function(){P(e),document.addEventListener("keydown",g),document.addEventListener("click",C)})),y.prepend(t),f.reset(),O(b,f),L(document.querySelector(".popup_is-opened"))})).catch((function(e){console.log(e),o.querySelector(".popup__button").textContent="Ошибка соединения"}))})),O(b,a),O(b,f),Promise.all([fetch("".concat(E,"users/me"),{headers:{authorization:x}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(E,"cards"),{headers:{authorization:x}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var c=e[0],u=e[1];o.textContent=c.name,r.textContent=c.about,t.value=o.textContent,n.value=r.textContent,i.setAttribute("style","background-image: url('".concat(c.avatar,"');")),A=c._id;var a,s=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return D(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?D(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var o=0,r=function(){};return{s:r,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,u=!0,i=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return u=e.done,e},e:function(e){i=!0,c=e},f:function(){try{u||null==n.return||n.return()}finally{if(i)throw c}}}}(u);try{var l=function(){var e=a.value;try{var t=j(e,w,T,A);t.querySelector(".card__image").addEventListener("click",(function(){P(e),document.addEventListener("keydown",g),document.addEventListener("click",C)})),e.likes.some((function(e){return e._id===A}))&&t.querySelector(".card__like-button").classList.add("card__like-button_is-active"),y.append(t)}catch(e){console.log(e)}};for(s.s();!(a=s.n()).done;)l()}catch(e){s.e(e)}finally{s.f()}})).catch((function(e){console.log(e)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);z(e,n,o),n.forEach((function(r){r.addEventListener("input",(function(){B(e,t,r),z(e,n,o)}))}))}(e,t)}))}(b)})();