document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('message-form');
  const submitBtn = document.getElementById('submitBtn');
  const formStatusMessage = document.getElementById('formStatusMessage');

  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const message = document.getElementById('message');

  const emailPattern = /\S+@\S+\.\S+/;
  // eslint-disable-next-line
  const phonePattern = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

  function validateFirstName() {
    const errorSpan = document.getElementById('firstNameError');
    if (firstName.value.trim() !== '') {
      firstName.classList.remove('invalid');
      firstName.classList.add('valid');
      errorSpan.style.display = 'none';
    } else {
      firstName.classList.remove('valid');
      firstName.classList.add('invalid');
      errorSpan.textContent = 'Введите имя';
      errorSpan.style.display = 'block';
    }
  }

  function validateLastName() {
    const errorSpan = document.getElementById('lastNameError');
    if (lastName.value.trim() !== '') {
      lastName.classList.remove('invalid');
      lastName.classList.add('valid');
      errorSpan.style.display = 'none';
    } else {
      lastName.classList.remove('valid');
      lastName.classList.add('invalid');
      errorSpan.textContent = 'Введите фамилию';
      errorSpan.style.display = 'block';
    }
  }

  function validateEmail() {
    const errorSpan = document.getElementById('emailError');
    if (emailPattern.test(email.value)) {
      email.classList.remove('invalid');
      email.classList.add('valid');
      errorSpan.style.display = 'none';
    } else {
      email.classList.remove('valid');
      email.classList.add('invalid');
      errorSpan.textContent = 'Некорректный email';
      errorSpan.style.display = 'block';
    }
  }

  function validatePhone() {
    const errorSpan = document.getElementById('phoneError');
    if (phonePattern.test(phone.value)) {
      phone.classList.remove('invalid');
      phone.classList.add('valid');
      errorSpan.style.display = 'none';
    } else {
      phone.classList.remove('valid');
      phone.classList.add('invalid');
      errorSpan.textContent = 'Некорректный номер телефона';
      errorSpan.style.display = 'block';
    }
  }

  function validateMessage() {
    const errorSpan = document.getElementById('messageError');
    if (message.value.trim() !== '') {
      message.classList.remove('invalid');
      message.classList.add('valid');
      errorSpan.style.display = 'none';
    } else {
      message.classList.remove('valid');
      message.classList.add('invalid');
      errorSpan.textContent = 'Напишите сообщение';
      errorSpan.style.display = 'block';
    }
  }

  function checkFormValidity() {
    const isFirstNameValid = firstName.value.trim() !== '';
    const isLastNameValid = lastName.value.trim() !== '';
    const isEmailValid = emailPattern.test(email.value);
    const isPhoneValid = phonePattern.test(phone.value);
    const isMessageValid = message.value.trim() !== '';

    const allValid = (isFirstNameValid && isLastNameValid
      && isEmailValid && isPhoneValid && isMessageValid);

    submitBtn.disabled = !allValid;
  }

  function sendForm() {
    const formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData.entries());

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataObject),
    })
      .then((response) => {
        if (response.ok) {
          // console.log(response);
          return response.json();
        }
        throw new Error('Ошибка при отправке формы');
      })
      .then(() => {
        // (data) => {
        // console.log(data);
        formStatusMessage.textContent = 'Форма успешно отправлена';
        formStatusMessage.className = 'form-status-message success';
        form.reset();
      })
      .catch((error) => {
        console.log(error);
        formStatusMessage.textContent = 'Ошибка при отправке формы';
        formStatusMessage.className = 'form-status-message error';
      });
  }

  firstName.addEventListener('blur', validateFirstName);
  lastName.addEventListener('blur', validateLastName);
  email.addEventListener('blur', validateEmail);
  phone.addEventListener('blur', validatePhone);
  message.addEventListener('blur', validateMessage);

  form.addEventListener('input', checkFormValidity);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    sendForm();
  });
});
