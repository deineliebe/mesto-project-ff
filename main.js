(()=>{"use strict";var t=document.forms["edit-profile"],e=t.querySelector(".popup__input_type_name"),n=t.querySelector(".popup__input_type_description"),o=document.querySelector(".profile__title"),r=document.querySelector(".profile__description"),c=document.querySelector(".profile__edit-button"),u=document.querySelector(".popup_type_edit"),a=document.forms["edit-profile-avatar"],i=a.querySelector(".popup__input_type_avatar"),s=document.querySelector(".popup_type_edit-avatar"),l=document.querySelector(".profile__add-button"),p=document.querySelector(".popup_type_new-card"),d=document.forms["new-place"],f=d.querySelector(".popup__input_type_card-name"),_=d.querySelector(".popup__input_type_url"),m=document.querySelector("#card-template").content,y=document.querySelector(".places__list"),v=document.querySelector(".popup_type_image"),h=v.querySelector(".popup__caption"),S=v.querySelector(".popup__image"),b={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button-disabled",inputErrorClass:"popup__input-error",errorClass:"popup__error"},q=document.querySelector(".profile__image");function g(t){t.classList.add("popup_is-animated"),setTimeout((function(){t.classList.add("popup_is-opened")}),0),document.addEventListener("keydown",k),document.addEventListener("click",L)}function C(t){t.classList.remove("popup_is-opened"),setTimeout((function(){t.classList.remove("popup_is-animated")}),600),document.removeEventListener("keydown",k),document.removeEventListener("click",L)}var k=function(t){"Escape"===t.key&&C(document.querySelector(".popup_is-opened"))},L=function(t){t.target.classList.contains("popup_is-opened")?C(t.target):t.target.closest(".popup__close")&&C(t.target.closest(".popup"))},E="https://nomoreparties.co/v1/wff-cohort-13/",j="a9eb423b-33a6-404a-b572-1ad62523083e";function x(t,e,n,o,r){var c=m.querySelector(".card").cloneNode(!0),u=c.querySelector(".card__like-button");c.querySelector(".card__image").src=t.link,c.querySelector(".card__image").alt=t.name,c.querySelector(".card__title").textContent=t.name;var a=c.querySelector(".card__like-count");a.textContent=t.likes.length,u.addEventListener("click",(function(e){return o(e,a,t._id)}));var i=c.querySelector(".card__delete-button");return console.log(t),t.owner._id===r?i.addEventListener("click",(function(){return e(c,t._id)})):i.disabled=!0,c.querySelector(".card__image").addEventListener("click",(function(){return n(t)})),c}function A(t,e){(function(t){return fetch("".concat(E,"cards/").concat(t),{method:"DELETE",headers:{authorization:j}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))})(e).then((function(){t.remove()})).catch((function(t){console.log(t)}))}var T,P=function(t,e,n){var o;t.target.classList.contains("card__like-button_is-active")?(o=n,fetch("".concat(E,"cards/likes/").concat(o),{method:"DELETE",headers:{authorization:j,"Content-Type":"application/json"}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))).then((function(t){return e.textContent=t.likes.length})).catch((function(t){console.log(t)})):function(t){return fetch("".concat(E,"cards/likes/").concat(t),{method:"PUT",headers:{authorization:j,"Content-Type":"application/json"}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))}(n).then((function(t){return e.textContent=t.likes.length})).catch((function(t){console.log(t)})),t.target.classList.toggle("card__like-button_is-active")},w=function(t){S.src=t.link,S.alt=t.name,h.textContent=t.name,g(v)},z=function(t,e,n){!function(t){return t.some((function(t){return!t.validity.valid}))}(e)?(n.disabled=!1,n.classList.remove(t.inactiveButtonClass)):(n.disabled=!0,n.classList.add(t.inactiveButtonClass))},B=function(t,e,n){n.validity.patternMismatch?n.setCustomValidity(n.dataset.errorMessage):n.setCustomValidity(""),n.validity.valid?function(t,e,n){var o=e.querySelector(".".concat(n.id,"-error"));o&&(n.classList.remove(t.inputErrorClass),o.classList.remove(t.errorClass),o.textContent="")}(t,e,n):function(t,e,n,o){var r=e.querySelector(".".concat(n.id,"-error"));r&&(n.classList.add(t.inputErrorClass),r.textContent=o,r.classList.add(t.errorClass))}(t,e,n,n.validationMessage)},O=function(t,e){e.querySelector(".popup__button").textContent="Сохранить";for(var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector),r=0,c=n;r<c.length;r++){var u=c[r];B(t,e,u)}z(t,n,o)};function D(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}c.addEventListener("click",(function(){return g(u),e.value=o.textContent,n.value=r.textContent,void O(b,t)})),q.addEventListener("click",(function(){a.reset(),O(b,a),g(s)})),a.addEventListener("submit",(function(t){t.preventDefault();var e,n=document.querySelector(".popup_is-opened");n.querySelector(".popup__button").textContent="Сохранение...",(e=i.value,fetch("".concat(E,"users/me/avatar "),{method:"PATCH",headers:{authorization:j,"Content-Type":"application/json"},body:JSON.stringify({avatar:e})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))).then((function(){q.setAttribute("style","background-image: url('".concat(i.value,"');")),C(n)})).catch((function(t){console.log(t),n.querySelector(".popup__button").textContent="Ошибка соединения"}))})),t.addEventListener("submit",(function(t){t.preventDefault();var c,u,a=document.querySelector(".popup_is-opened");a.querySelector(".popup__button").textContent="Сохранение...",(c=e.value,u=n.value,fetch("".concat(E,"users/me"),{method:"PATCH",headers:{authorization:j,"Content-Type":"application/json"},body:JSON.stringify({name:c,about:u})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))).then((function(){o.textContent=e.value,r.textContent=n.value,C(a)})).catch((function(t){console.log(t),a.querySelector(".popup__button").textContent="Ошибка соединения"}))})),l.addEventListener("click",(function(){d.reset(),O(b,d),g(p)})),d.addEventListener("submit",(function(t){t.preventDefault();var e,n,o=document.querySelector(".popup_is-opened");o.querySelector(".popup__button").textContent="Сохранение...",(e=f.value,n=_.value,fetch("".concat(E,"cards"),{method:"POST",headers:{authorization:j,"Content-Type":"application/json"},body:JSON.stringify({name:e,link:n})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))).then((function(){y.prepend(x({name:f.value,link:_.value,likes:[],owner:{_id:T}},A,w,P,T)),C(document.querySelector(".popup_is-opened"))})).catch((function(t){console.log(t),o.querySelector(".popup__button").textContent="Ошибка соединения"}))})),Promise.all([fetch("".concat(E,"users/me"),{headers:{authorization:j}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})),fetch("".concat(E,"cards"),{headers:{authorization:j}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))]).then((function(t){var e=t[0],n=t[1];o.textContent=e.name,r.textContent=e.about,q.setAttribute("style","background-image: url('".concat(e.avatar,"');")),T=e._id;var c,u=function(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return D(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?D(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var o=0,r=function(){};return{s:r,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,u=!0,a=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return u=t.done,t},e:function(t){a=!0,c=t},f:function(){try{u||null==n.return||n.return()}finally{if(a)throw c}}}}(n);try{for(u.s();!(c=u.n()).done;){var a=c.value,i=x(a,A,w,P,T);a.likes.some((function(t){return t._id===T}))&&i.querySelector(".card__like-button").classList.add("card__like-button_is-active"),y.append(i)}}catch(t){u.e(t)}finally{u.f()}})).catch((function(t){console.log(t)})),function(t){Array.from(document.querySelectorAll(t.formSelector)).forEach((function(e){!function(t,e){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);z(t,n,o),n.forEach((function(r){r.addEventListener("input",(function(){B(t,e,r),z(t,n,o)}))}))}(t,e)}))}(b)})();