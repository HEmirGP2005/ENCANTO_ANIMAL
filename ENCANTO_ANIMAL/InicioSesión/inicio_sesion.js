import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { createUserWithEmailAndPassword, sendEmailVerification, getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

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

document.getElementById('ingresarBtn').addEventListener('click', async () => {
    // Restablece el mensaje de error a una cadena vacía al hacer clic en el botón
    document.getElementById('mensajeError').textContent = '';

    var email = document.getElementById('txtUsuario').value;
    var password = document.getElementById('txtContraseña').value;

    try {
        const cred = await signInWithEmailAndPassword(auth, email, password);

        if (auth.currentUser && auth.currentUser.emailVerified) {
            // Muestra un mensaje de éxito
            alert("Usuario logueado");

            // Redirige al usuario a la página de menú
            window.location.href = "/Menú/Menu.html";
        } else {
            // Cierra la sesión del usuario no verificado
            await auth.signOut();

            // Muestra un mensaje indicando que el correo no está verificado
            alert("Verifica tu correo electrónico para iniciar sesión.");

            // Aquí puedes redirigir al usuario a otra página o realizar otras acciones
        }
    } catch (error) {
        // Manejo de errores
        const errorCode = error.code;
        let mensajeError = '';

        if (errorCode == 'auth/wrong-password') {
            mensajeError = 'Contraseña incorrecta';
        } else if (errorCode == 'auth/user-not-found') {
            mensajeError = 'Usuario no encontrado';
        } else {
            mensajeError = 'Revise sus datos';
        }

        // Muestra el mensaje de error en el div correspondiente
        document.getElementById('mensajeError').textContent = mensajeError;
    }
});