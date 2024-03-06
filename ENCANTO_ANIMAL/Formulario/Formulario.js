import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

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
const imagenesElement = document.getElementById('imagenes');

let parsedData = {};

if (imagenesElement && typeof parsedData.imagenes === 'string') {
  const fileName = parsedData.imagenes.split("\\").pop();
  imagenesElement.textContent = `Imagen: ${fileName}`;
}

document.addEventListener('DOMContentLoaded', function () {
  const openModalButton = document.getElementById('open-modal');
  const closeModalButton = document.getElementById('close-modal');
  const termsModal = document.getElementById('terms-modal');
  const submitButton = document.getElementById('submit-button');
  const form = document.getElementById('adoptionForm');

  openModalButton.addEventListener('click', function () {
    termsModal.style.display = 'block';
  });

  closeModalButton.addEventListener('click', function () {
    termsModal.style.display = 'none';
    submitButton.disabled = false;
  });

  window.onclick = function (event) {
    if (event.target === termsModal) {
      termsModal.style.display = 'none';
    }
  };
  loadSavedData();
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    saveFormData(event.target);
  });

  // Cargar datos guardados al cargar la página
  loadSavedData();
  // Llamar a updatePreview después de cargar datos guardados
  updatePreview();
});

function saveFormData(form) {
  const formData = new FormData(form);
  const data = {};

  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  // Guardar datos en localStorage
  localStorage.setItem('formData', JSON.stringify(data));

  // Guardar datos en Firebase
  const formDataRef = ref(database, 'formularios');
  push(formDataRef, data)
    .then(() => {
      alert("Formulario enviado exitosamente");
      window.location.href = "/Vista_Perfil/Vista_Perfil.html";
      // Llamar a updatePreview después de guardar en Firebase
      updatePreview(data);
      // Llamar a la nueva función para mostrar los datos en Vista_Perfil
      mostrarDatosVistaPerfil(data);
    })
    .catch((error) => {
      console.error("Error al guardar en Firebase:", error);
      alert("Ocurrió un error al enviar el formulario. Por favor, inténtalo de nuevo.");
    });
}

function loadSavedData() {
  const savedData = localStorage.getItem('formData');

  if (savedData) {
    parsedData = JSON.parse(savedData);

    for (const [key, value] of Object.entries(parsedData)) {
      const inputElement = document.getElementById(key);
      if (inputElement && key !== 'imagenes') {
        inputElement.value = value;
      }
    }

    // Obtener el nombre del archivo y mostrarlo
    const imagenesElement = document.getElementById('imagenes');
    if (imagenesElement && typeof parsedData.imagenes === 'string') {
      const fileName = parsedData.imagenes.split("\\").pop();
      imagenesElement.textContent = `Imagen: ${fileName}`;
    }
  }
}


function updatePreview() {
  const vistaPerfilContainer = document.getElementById('vistaPerfilContainer');
  const animalNombreElement = document.getElementById('animalNombre');
  const animalEdadElement = document.getElementById('animalEdad');
  const animalRazaElement = document.getElementById('animalRaza');
  const animalVacunasElement = document.getElementById('animalVacunas');
  const animalEnfermedadesElement = document.getElementById('animalEnfermedades');
  const animalEnfermedadElement = document.getElementById('animalEnfermedad');
  const animalDiscapacidadElement = document.getElementById('animalDiscapacidad');
  const animalDatosAElement = document.getElementById('animalDatosA');

  const nombreA = document.getElementById('nombreA').value;
  const EdadA = document.getElementById('EdadA').value;
  const RazaA = document.getElementById('RazaA').value;
  const vacunas = document.getElementById('vacunas').value;
  const cualesEnfermedades = document.getElementById('cualesEnfermedades').value;
  const enfermedad = document.getElementById('enfermedad').value;
  const discapacidad = document.getElementById('discapacidad').value;
  const datosAdicionales = document.getElementById('datosAdicionales').value;

  // Asignar valores a los elementos correspondientes si existen
  if (animalNombreElement) animalNombreElement.textContent = nombreA || 'No especificado';
  if (animalEdadElement) animalEdadElement.textContent = EdadA || 'No especificado';
  if (animalRazaElement) animalRazaElement.textContent = RazaA || 'No especificada';
  if (animalVacunasElement) animalVacunasElement.textContent = vacunas || 'No especificada';
  if (animalEnfermedadesElement) animalEnfermedadesElement.textContent = cualesEnfermedades || 'No especificada';
  if (animalEnfermedadElement) animalEnfermedadElement.textContent = enfermedad || 'No especificada';
  if (animalDiscapacidadElement) animalDiscapacidadElement.textContent = discapacidad || 'No especificada';
  if (animalDatosAElement) animalDatosAElement.textContent = datosAdicionales || 'No especificada';

  const animalInfoContainer = document.getElementById('animalInfoContainer');
  if (animalInfoContainer) animalInfoContainer.style.display = 'block';
}

function mostrarDatosVistaPerfil(data) {
  const vistaPerfilNombre = document.getElementById('vistaPerfilNombre');
  const vistaPerfilEdad = document.getElementById('vistaPerfilEdad');
  const vistaPerfilRaza = document.getElementById('vistaPerfilRaza');
  const vistaPerfilVacunas = document.getElementById('vistaPerfilVacunas');
  const vistaPerfilEnfermedades = document.getElementById('vistaPerfilEnfermedades');
  const vistaPerfilEnfermedad = document.getElementById('vistaPerfilEnfermedad');
  const vistaPerfilDiscapacidad = document.getElementById('vistaPerfilDiscapacidad');
  const vistaPerfilDatosA = document.getElementById('vistaPerfilDatosA');

  if (vistaPerfilNombre) vistaPerfilNombre.textContent = data.nombreA || 'No especificado';
  if (vistaPerfilEdad) vistaPerfilEdad.textContent = data.EdadA || 'No especificado';
  if (vistaPerfilRaza) vistaPerfilRaza.textContent = data.RazaA || 'No especificada';
  if (vistaPerfilVacunas) vistaPerfilVacunas.textContent = data.vacunas || 'No especificada';
  if (vistaPerfilEnfermedades) vistaPerfilEnfermedades.textContent = data.cualesEnfermedades || 'No especificada';
  if (vistaPerfilEnfermedad) vistaPerfilEnfermedad.textContent = data.enfermedad || 'No especificada';
  if (vistaPerfilDiscapacidad) vistaPerfilDiscapacidad.textContent = data.discapacidad || 'No especificada';
  if (vistaPerfilDatosA) vistaPerfilDatosA.textContent = data.datosAdicionales || 'No especificada';

}


