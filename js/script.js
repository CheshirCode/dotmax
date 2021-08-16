const menuButton = document.querySelector(".header__burger");
const menuButton1 = document.querySelector(".nav");
const contentBody = document.querySelector("body");

menuButton.onclick = function () {
  menuButton.classList.toggle("active");
  menuButton1.classList.toggle("active");
  contentBody.classList.toggle("lock");
}

menuButton1.onclick = function () {
  menuButton.classList.remove("active");
  menuButton1.classList.remove("active");
  contentBody.classList.remove("lock");
}

function slidesPlugin(activeSlide) {
  const slides = document.querySelectorAll('.slide');
  slides[activeSlide].classList.add('active')

  for (const slide of slides) {
    slide.addEventListener('click', () => {
      clearActiveClasses()
      slide.classList.add('active')
    })
  }

  function clearActiveClasses() {
    slides.forEach((slide) => {
      slide.classList.remove('active')
    })
  }
}
slidesPlugin(0)

// ОТПРАВКА ДАННЫХ НА ПОЧТУ ===================================================================================

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);
    formData.append('image', formImage.files[0]);

    if (error === 0) {
      form.classList.add('_sending');

      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData,
      })
      if (response.ok) {
        form.classList.add('_sending');

        let result = await.response.json();
        alert(result.message);
        formPreview.innerHTML = '';
        form.reset();
        form.classList.remove('_sending');
      } else {
        alert('Что-то пошло не так. Повторите попытку.')
        form.classList.remove('_sending');

      }
    } else {
      alert('Заполните обязательные поля')
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._required');

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
        formAddError(input);
        error++;
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }

  function emailTest(input) {
    return !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(input.value);
  }

  const formImage = document.getElementById('formImage');
  const formPreview = document.getElementById('formPreview');

  formImage.addEventListener('change', () => {
    uploadFile(formImage.files[0]);
  });

  function uploadFile(file) {
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      alert('Мы ждем от Вас изображение. Проверьте передаваемый файл');
      formImage.value = '';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Файл должен быть менее 2 Мб.');
      return;
    }

    let reader = new FileReader();
    reader.onload = function (e) {
      formPreview.innerHTML = `<img src="${e.target.result}" alt="Превью" />`;
    };

    reader.onerror = function (e) {
      alert('Ошибка');
    };

    reader.readAsDataURL(file);

  }

});