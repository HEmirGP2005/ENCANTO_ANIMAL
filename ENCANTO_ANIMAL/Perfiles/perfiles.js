import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { onAuthStateChanged, getAuth } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

// Obtener una referencia al contenedor de perfiles en el HTML
const perfilesContainer = document.getElementById('perfiles-container');

// Función para inicializar Firebase
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
  return getDatabase(app);
}

// Inicializar la aplicación de Firebase antes de usarla
const firebaseDatabase = initializeFirebase();

// Obtener una referencia a la colección "formularios" en Firebase
const formulariosRef = ref(firebaseDatabase, 'formularios');

// Función para cargar y mostrar los perfiles
// ...

// Función para cargar y mostrar los perfiles
function cargarPerfiles() {
  get(formulariosRef).then((snapshot) => {
    // Limpiar contenedor antes de volver a cargar los perfiles
    perfilesContainer.innerHTML = '';

    // Iterar sobre los formularios en la base de datos
    snapshot.forEach((usuarioSnapshot) => {
      const registros = usuarioSnapshot.val();

      // Iterar sobre los registros de cada usuario
      Object.entries(registros).forEach(([formularioId, formulario]) => {
        // Crear un elemento de perfil y agregarlo al contenedor
        const formularioElement = document.createElement('div');
        formularioElement.classList.add('perfil-section');

        if (formulario.urlImagen) {
          // Agregar la imagen al perfil
          const imagenElement = document.createElement('img');
          imagenElement.src = formulario.urlImagen;
          imagenElement.alt = 'Imagen del animal';
          imagenElement.classList.add('perfil-imagen');
          formularioElement.appendChild(imagenElement);
        }
      
        // Crear un contenedor de texto
        const textContainer = document.createElement('div');
        textContainer.classList.add('text-container');
      
        // Agregar cada propiedad del formulario al contenedor de texto
        textContainer.innerHTML = `
          <p>Nombre: <span>${formulario.nombreA}</span></p>
          <p>Edad: <span>${formulario.EdadA} años</span></p>
          <p>Raza: <span>${formulario.RazaA}</span></p>
          <p>¿Cuenta con vacunas?: <span>${formulario.vacunas ? 'Sí' : 'No'}</span></p>
          <p>¿Cuales?: <span>${formulario.CualesVa}</span></p>
          <p>Padece alguna enfermedad: <span>${formulario.enfermedad}</span></p>
          <p>Padece alguna discapacidad: <span>${formulario.discapacidad}</span></p>
          <p>Detalles adicionales: <span>${formulario.datosA}</span></p>
        `;
      
        // Agregar el contenedor de texto al perfil
        formularioElement.appendChild(textContainer);
      
        // Agregar el elemento del formulario al contenedor principal
        perfilesContainer.appendChild(formularioElement);
      });
    });
  });
}

// Cargar y mostrar los perfiles inicialmente
cargarPerfiles();

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