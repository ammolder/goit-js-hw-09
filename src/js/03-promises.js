import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  // delay: document.querySelector('input[name="delay"]'),
  // step: document.querySelector('input[name="step"]'),
  // amount: document.querySelector('input[name="amount"]'),
  // submit: document.querySelector('button[type="submit"]'),
};

refs.form.addEventListener('submit', onSubmitForm);

// Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay)
// стільки разів, скільки ввели в поле amount.Під час кожного виклику передай їй номер
// промісу(position), що створюється, і затримку, враховуючи першу затримку(delay), введену
// користувачем, і крок(step).

function onSubmitForm(e) {
  e.preventDefault();

  const { amount, delay, step } = e.target.elements;
  console.dir(e.target);

  let delayValue = +delay.value;

  for (let i = 1; i <= +amount.value; i += 1) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayValue += +step.value;
  }
  e.currentTarget.reset();
}

function createPromise(position, delay) {
  console.log('she work');

  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// console.log(createPromise());
// Доповни код функції createPromise таким чином, щоб вона повертала один проміс, який
// виконується або відхиляється через delay часу.Значенням промісу повинен бути об'єкт,
//  в якому будуть властивості position і delay зі значеннями однойменних параметрів.
//  Використовуй початковий код функції для вибору того, що потрібно зробити з промісом -
//   виконати або відхилити.
