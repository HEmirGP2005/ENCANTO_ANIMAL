import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

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
const formDataRef = ref(database, 'formularios');

function mostrarDatosVistaPerfil(data) {
  console.log('Mostrando datos en la función mostrarDatosVistaPerfil:', data);
  const vistaPerfilNombre = document.getElementById('vistaPerfilNombre');
  const vistaPerfilEdad = document.getElementById('vistaPerfilEdad');
  const vistaPerfilRaza = document.getElementById('vistaPerfilRaza');
  const vistaPerfilVacunas = document.getElementById('vistaPerfilVacunas');
  const vistaPerfilEnfermedades = document.getElementById('vistaPerfilEnfermedades');
  const vistaPerfilEnfermedad = document.getElementById('vistaPerfilEnfermedad');
  const vistaPerfilDiscapacidad = document.getElementById('vistaPerfilDiscapacidad');
  const vistaPerfilDatosA = document.getElementById('vistaPerfilDatosA');

  if (vistaPerfilNombre) vistaPerfilNombre.value = data.nombreA || 'No especificado';
  if (vistaPerfilEdad) vistaPerfilEdad.value = data.EdadA || 'No especificado';
  if (vistaPerfilRaza) vistaPerfilRaza.value = data.RazaA || 'No especificada';
  if (vistaPerfilVacunas) vistaPerfilVacunas.value = data.vacunas || 'No especificada';
  if (vistaPerfilEnfermedades) vistaPerfilEnfermedades.value = data.cualesEnfermedades || 'No especificada';
  if (vistaPerfilEnfermedad) vistaPerfilEnfermedad.value = data.enfermedad || 'No especificada';
  if (vistaPerfilDiscapacidad) vistaPerfilDiscapacidad.value = data.discapacidad || 'No especificada';
  if (vistaPerfilDatosA) vistaPerfilDatosA.value = data.datosAdicionales || 'No especificada';

}
get(formDataRef).then((snapshot) => {
  if (snapshot.exists()) {
    const formData = snapshot.val();
    console.log('Datos recuperados desde Firebase:', formData);
    mostrarDatosVistaPerfil(formData);

    // Rellena tus campos de formulario con los datos recuperados
    document.getElementById('nombreA').value = formData.nombreA || '';
    document.getElementById('EdadA').value = formData.EdadA || '';
    document.getElementById('RazaA').value = formData.razaA || '';
    document.getElementById('vacunas').value = formData.vacunas || '';
    document.getElementById('cualesEnfermedades').value = formData.cualesEnfermadades || '';
    document.getElementById('enfermedad').value = formData.enfermedad || '';
    document.getElementById('discapacidad').value = formData.discapacidad || '';
    document.getElementById('datosAdicionales').value = formData.datosAdicionales || '';

  } else {
    console.log('No hay datos en la referencia formularios.');
  }
}).catch((error) => {
  console.error('Error al recuperar datos desde Firebase:', error);
});

document.addEventListener('DOMContentLoaded', function () {
  // Obtén referencia a los botones por su identificador
  const btnsi = document.getElementById('btnsi');
  const btnno = document.getElementById('btnno');

  // Agrega event listeners a los botones
  if (btnsi) {
    btnsi.addEventListener('click', function () {
      // Redirige a la página /Perfiles/Perfiles.html
      window.location.href = '/Perfiles/Perfiles.html';
    });
  }

  if (btnno) {
    btnno.addEventListener('click', function () {
      // Regresa al formulario (ajusta la URL según sea necesario)
      window.location.href = '/Formulario/Formulario.html';
    });
  }
});


