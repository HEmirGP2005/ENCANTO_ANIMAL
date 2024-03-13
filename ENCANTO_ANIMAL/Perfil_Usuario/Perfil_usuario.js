import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { onAuthStateChanged, getAuth } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";


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
const database = getDatabase(app);
const storage = getStorage(app);


document.addEventListener('DOMContentLoaded', function () {
  const nombreUsuarioElement = document.getElementById("nombreUsuario");
  const apellidosUsuarioElement = document.getElementById("apellidosUsuario");
  const telefonoUsuarioElement = document.getElementById("telefonoUsuario");
  const emailUsuarioElement = document.getElementById("emailUsuario");

  const cerrarSesionBtn = document.getElementById("cerrarSesion");
  cerrarSesionBtn.addEventListener("click", cerrarSesion);

  onAuthStateChanged(getAuth(), async (user) => {
    if (user) {
      // Obtener datos adicionales del usuario desde la base de datos
      const userData = await obtenerDatosUsuario(user.uid);

      if (userData) {
        // Mostrar los datos del usuario
        nombreUsuarioElement.textContent = userData.nombre;
        apellidosUsuarioElement.textContent = userData.apellido;
        telefonoUsuarioElement.textContent = userData.telefono;
        emailUsuarioElement.textContent = userData.email;

        // Mostrar los botones relevantes
        cerrarSesionBtn.style.display = "block";
      } else {
        console.error("No se encontraron datos para el usuario con UID:", user.uid);
        // Puedes manejar la falta de datos de usuario según tu lógica
      }

    } else {
      // Si no hay sesión iniciada, redirigir a la página de inicio de sesión
      window.location.href = "/InicioSesión/inicio_sesion.html";
    }
  });
});

function cerrarSesion() {
  const auth = getAuth();
  auth.signOut().then(() => { window.location.href = '/Menú/Menu.html'; });
}

async function obtenerDatosUsuario(uid) {
  console.log("UID del usuario:", uid);

  const usuarioRef = ref(database, `usuarios/${uid}`);

  try {
    const snapshot = await get(usuarioRef);
    console.log("Snapshot de datos de usuario:", snapshot.val());

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.error("No se encontraron datos para el usuario con UID:", uid);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error);
    return null;
  }
}

