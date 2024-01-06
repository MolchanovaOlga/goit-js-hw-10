import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
const inputDelay = document.querySelector('input[type="number"]');
const inputFulfilled = document.querySelector('input[value="fulfilled"]');
const inputRejected = document.querySelector('input[value="rejected"]');

form.addEventListener('submit', event => {
    event.preventDefault();

    const delay = inputDelay.value;
    const fulfilled = inputFulfilled.checked;
    const rejected = inputRejected.checked;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (fulfilled) {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            } else {
                reject(`❌ Rejected promise in ${delay}ms`);
            }
        }, delay);
    });
    console.log(promise);
    promise
        .then((value) => {
            iziToast.show({
                message: `${value}`,
                backgroundColor: '#59A10D',
                messageColor: '#fff',
                position: 'topRight',
            });
        })
        .catch((error) => {
            iziToast.show({
                message: `${error}`,
                backgroundColor: '#EF4040',
                messageColor: '#fff',
                position: 'topRight',
            });
        });
})
