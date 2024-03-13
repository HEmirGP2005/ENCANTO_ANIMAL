import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { createUserWithEmailAndPassword, sendEmailVerification, getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

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
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('crearCuentaBtn').addEventListener('click', async (e) => {
    const nombre = document.getElementById('txtNombre').value;
    const apellido = document.getElementById('txtApellido').value;
    const telefono = document.getElementById('txtTelefono').value;
    const email = document.getElementById('txtEmailR').value;
    const password = document.getElementById('txtContraseña').value;
    const confirmPassword = document.getElementById('txtConfirmarContraseña').value;

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
    
      alert("Usuario creado");
    
      // Envía correo de verificación
      await sendEmailVerification(auth.currentUser);
      alert('Se ha enviado un correo de verificación');
    
      // Almacena información adicional del usuario en la base de datos
      const userData = {
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        email: email,
      };

      await saveUserDataToFirebase(database, userData);

      // Sign out después de la creación del usuario
      auth.signOut();
    
      // Redirige al usuario a la página de inicio de sesión
      window.location.href = "/InicioSesión/inicio_sesion.html";
    } catch (error) {
      console.error("Error durante el registro:", error);
      const errorCode = error.code;
      if (errorCode == 'auth/email-already-in-use') {
        alert('El correo ya está en uso');
      } else if (errorCode == 'auth/invalid-email') {
        alert('El correo no es válido');
      } else if (errorCode == 'auth/weak-password') {
        alert('La contraseña debe tener al menos 6 caracteres');
      } else {
        alert('Ocurrió un error durante el registro. Por favor, intenta nuevamente.');
      }
    }
  });
});

function getCurrentUserId() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user.uid);
      } else {
        reject(new Error("Por favor ingresa a una cuenta"));
      }
    });
  });
}

async function saveUserDataToFirebase(database, userData) {
  try {
    const userId = await getCurrentUserId(); // Asegúrate de definir esta función
    const userRef = ref(database, 'usuarios/' + userId);

    await set(userRef, userData);
    console.log("Datos del usuario guardados exitosamente en Firebase");
  } catch (error) {
    console.error("Error al guardar datos del usuario en Firebase:", error);
    throw new Error("Error al guardar datos del usuario. Por favor, inténtelo de nuevo más tarde.");
  }
}
