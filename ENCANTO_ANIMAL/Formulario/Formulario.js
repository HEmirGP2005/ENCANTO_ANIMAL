import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
import {  onAuthStateChanged, getAuth } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";

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

const database = initializeFirebase(); 
const storage = getStorage(); 


// Obtén una referencia a la carpeta donde deseas almacenar las imágenes
const imagenesRef = storageRef(storage, 'imagenes');

// Función para subir la imagen y obtener la URL después de la carga
async function subirImagenYObtenerURL(imagenFile) {
  const nombreArchivo = imagenFile.name;
  const imagenRef = storageRef(imagenesRef, nombreArchivo);

  // Subir la imagen al almacenamiento
  await uploadBytes(imagenRef, imagenFile);

  // Obtener la URL de la imagen después de la carga
  const downloadURL = await getDownloadURL(imagenRef);
  return downloadURL;
}

// Función para obtener el ID único del usuario actual
function getCurrentUserId() {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user.uid);
      } else {
        reject(new Error("Por favor ingresa a una cuenta"));
      }
    });
  });
}

// Función para guardar datos en Firebase
async function saveFormDataToFirebase(database, data, imagenFile) {
  const userId = await getCurrentUserId();
  const formDataRef = ref(database, 'formularios/' + userId);

  if (imagenFile) {
    // Subir la imagen y obtener la URL
    data['urlImagen'] = await subirImagenYObtenerURL(imagenFile);
  }

  return push(formDataRef, data)
    .then(() => {
      console.log("Formulario enviado exitosamente a Firebase");
    })
    .catch((error) => {
      console.error("Error al guardar en Firebase:", error);
      throw new Error("Error al enviar el formulario. Por favor, inténtelo de nuevo más tarde.");
    });
}




// Función para mostrar el modal de vista previa
function showPreviewModal(database, form, data, imagenFile) {
  const modal = document.getElementById('preview-modal');

  if (modal) {
    modal.style.display = 'block';

    const confirmPreviewButton = document.getElementById('confirm-preview-button');
    if (confirmPreviewButton) {
      confirmPreviewButton.addEventListener('click', function () {
        modal.style.display = 'none';
        saveFormDataToFirebase(database, data, imagenFile)
          .then(() => {
            window.location.href = '/Perfiles/Perfiles.html';
          })
          .catch((error) => {
            alert(error.message);
          });
      });      
    } 

    const editButton = document.getElementById('edit-button');
    if (editButton) {
      editButton.addEventListener('click', function () {
        modal.style.display = 'none';
      });
    }

    // Dentro de la función showPreviewModal, después de verificar el modal
    const animalImagePreview = document.getElementById('animalImagePreview');

    if (imagenFile instanceof File) {
      // Crear un objeto FileReader para leer el contenido del archivo
      const reader = new FileReader();

      // Cuando se carga el contenido del archivo, establecerlo como fuente de la imagen
      reader.onload = function (e) {
        animalImagePreview.src = e.target.result;
      };

      // Leer el contenido del archivo
      reader.readAsDataURL(imagenFile);
    } else {
      // Si no es un archivo, establecer la fuente directamente (puede ser una URL)
      animalImagePreview.src = data['urlImagen'] || ''; // Cambia 'animalImage' a 'urlImagen'
    }

    // Actualizar el contenido del modal con los datos del animal
    document.getElementById('animalNombreAPreview').textContent = data['nombreA'];
    document.getElementById('animalEdadAPreview').textContent = data['EdadA'];
    document.getElementById('animalRazaAPreview').textContent = data['RazaA'];
    document.getElementById('animalVacunasElement').textContent = data['vacunas'] ? 'Sí' : 'No';
    document.getElementById('animalCualesVaElement').textContent = data['CualesVa'];
    document.getElementById('animalEnfermedadElement').textContent = data['enfermedad'];
    document.getElementById('animalDiscapacidadElement').textContent = data['discapacidad'];
    document.getElementById('animalTelefonoElement').textContent = data['telefono'];
    document.getElementById('animalCorreoElement').textContent = data['correo'];
    document.getElementById('animalDatosAElement').textContent = data['datosA'];

  } else {
    console.error('No se encontró el elemento del modal.');
  }
}

// Función para validar el formulario
function validateForm(form) {
  const formData = new FormData(form);

  for (const [key, value] of formData.entries()) {
    const inputElement = document.getElementById(key);
    if (inputElement && inputElement.required && !value) {
      return false;
    }
  }

  return true;
}

document.addEventListener('DOMContentLoaded', function () {
  const database = initializeFirebase();
  let data = {};
  let formCount = 1; // Variable para mantener el conteo de formularios

  const form = document.getElementById('adoptionForm');
  const submitButton = document.getElementById('submit-button');
  const termsCheckbox = document.getElementById('termsCheckbox');
  const razaA = document.getElementById('RazaA').value;
  data['RazaA'] = razaA;

  const openTermsModalButton = document.getElementById('open-terms-modal');
  const closeTermsModalButton = document.getElementById('closeTermsModal');
  const termsModal = document.getElementById('terms-modal');

  openTermsModalButton.addEventListener('click', function () {
    termsModal.style.display = 'block';
  });

  // Cierra el modal de términos al hacer clic en el botón de cierre
  closeTermsModalButton.addEventListener('click', function () {
    termsModal.style.display = 'none';
  });

  const openPreviewModalButton = document.getElementById('open-preview-modal');

  openPreviewModalButton.addEventListener('click', function () {
    if (validateForm(form)) {
      const formData = new FormData(form);
      data = {};
      for (const [key, value] of formData.entries()) {
        data[key] = value;
      }
      const razaA = document.getElementById('RazaA').value;
      data['RazaA'] = razaA;
  
      // Obtén el archivo de la imagen
      const imagenFile = document.getElementById('animalImage').files[0];
  
      // Pasa el parámetro 'database', 'data', y el archivo de la imagen
      showPreviewModal(database, form, data, imagenFile);
    } else {
      alert('Por favor, completa todos los campos obligatorios antes de ver la vista previa.');
    }
  });
  

  submitButton.addEventListener('click', async function () {
    if (termsCheckbox.checked) {
      try {
        // Utiliza la función con ID personalizado al guardar en Firebase
        await saveFormDataToFirebase(database, data, 'Form' + formCount++);
        alert("Formulario enviado exitosamente.");
        window.location.href = '/Perfiles/Perfiles.html';
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert('Debes aceptar los Términos y Condiciones antes de enviar el formulario.');
    }
  });
  const perfilElement = document.querySelector('.perfil a');

  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      // Si el usuario ha iniciado sesión, muestra el botón "Perfil"
      perfilElement.textContent = 'Perfil';
      perfilElement.href = '/Perfil_Usuario/Perfil_usuario.html';
    } else {
      // Si no hay sesión iniciada, oculta el botón "Perfil"
      perfilElement.style.display = 'none';
    }
  });
  // Cargar y mostrar los perfiles inicialmente
cargarPerfiles();

  
});
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