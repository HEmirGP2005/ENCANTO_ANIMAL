import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { onAuthStateChanged, getAuth } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

function initializeFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyDJOxMoaT97-Spf6RUaL322vjLv9022iKE",
    authDomain: "encantoanimal-2f00a.firebaseapp.com",
    databaseURL: "https://encantoanimal-2f00a-default-rtdb.firebaseio.com",
    projectId: "encantoanimal-2f00a",
    storageBucket: "encantoanimal-2f00a.appspot.com",
    messagingSenderId: "951365091155",
    appId: "1:951365091155:web:5d604c55da801b8a4a2ba6",
    measurementId: "G-Z8Z2X1G8H0"
  };

  const app = initializeApp(firebaseConfig);
}

document.addEventListener('DOMContentLoaded', function () {
  const database = initializeFirebase(); // Llamada a initializeFirebase

  const perfilElement = document.querySelector('.perfil a');

  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      perfilElement.textContent = 'Perfil';
      perfilElement.href = '/Perfil_Usuario/Perfil_usuario.html';
    } else {
      perfilElement.textContent = 'Iniciar Sesión';
      perfilElement.href = '/InicioSesión/inicio_sesion.html';
    }
  });
});
