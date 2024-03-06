import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { createUserWithEmailAndPassword, sendEmailVerification, getAuth } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";


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

const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('crearCuentaBtn').addEventListener('click', async (e) => {
    const email = document.getElementById('txtEmailR').value;
    const password = document.getElementById('txtContraseña').value;

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      alert("Usuario creado");

      auth.signOut();

      await sendEmailVerification(auth.currentUser);

      alert('Se ha enviado un correo de verificación');

      window.location.href = "/InicioSesión/inicio_sesion.html";
    } catch (error) {
      const errorCode = error.code;
      if (errorCode == 'auth/email-already-in-use') {
        alert('El correo ya está en uso');
      } else if (errorCode == 'auth/invalid-email') {
        alert('El correo no es válido');
      } else if (errorCode == 'auth/weak-password') {
        alert('La contraseña debe tener al menos 6 caracteres');
      }
    }
  });
});
