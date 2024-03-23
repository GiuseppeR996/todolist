import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDS7HQFXOFrTCq9IxZZKoQEgJDV5ZttxCw",
    authDomain: "todolist-4c821.firebaseapp.com",
    projectId: "todolist-4c821",
    storageBucket: "todolist-4c821.appspot.com",
    messagingSenderId: "17086922064",
    appId: "1:17086922064:web:fb1fbd1b342b40474d8055"
};

const app = initializeApp(firebaseConfig);

const button = document.querySelector('button');
const inputField = document.querySelector('input');
const todoList = document.querySelector('.todo-list');
const emptyListMessage = document.querySelector('.empty-list-message');

const STORAGE_KEY = '__activities__';

let activities = [];

const storage = localStorage.getItem(STORAGE_KEY);
if (storage) {
    activities = JSON.parse(storage);
}

showContent();

button.addEventListener('click', addActivity);


function showContent() {
    todoList.innerText = '';
    emptyListMessage.innerText = '';

    if (activities.length > 0) {

        activities.forEach(function (activity, index) {
            const template = createActivityTemplate(activity)
            todoList.innerHTML += template;
        });
        removeCheck();

    } else {
        emptyListMessage.innerText = 'Non ci sono attività';
    }
}

function createActivityTemplate(activity) {
    return `
    <li class="todo-item">
    <div class="todo-check">
        <img src="image/check-mark.svg" alt="Check Icon">
    </div>
    <p class="todo-text">${activity}</p>
</li>`;
}


function addActivity() {
    const newActivity = inputField.value.trim();

    if (newActivity.length > 0) {

        activities.push(newActivity);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));

        showContent();

        inputField.value = '';
    }
}

function removeCheck() {
    const checks = document.querySelectorAll('.todo-check');
    checks.forEach(function (check, index) {

        check.addEventListener('click', function () {
            activities.splice(index, 1);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
            showContent();
        });
    });
}
