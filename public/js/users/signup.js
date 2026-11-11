// JavaScript Document
// create local database firestore variable
var db = firebase.apps[0].firestore();
var auth = firebase.apps[0].auth();

// create local from webpage inputs
const txtNombre = document.querySelector('#txtNombre');
const txtEmail = document.querySelector('#txtEmail');
const txtContra = document.querySelector('#txtContra');
// Práctica 1: campos de fechas (solo lectura)
const txtFechaCreacion = document.querySelector('#txtFechaCreacion');
const txtUltAcceso = document.querySelector('#txtUltAcceso');

// create local insert button
const btnInsUser = document.querySelector('#btnInsUser');

// Práctica 1: mostrar la fecha actual en los campos de fechas
mostrarFechas();

// assign button listener
btnInsUser.addEventListener('click', function () {
	auth.createUserWithEmailAndPassword(txtEmail.value, txtContra.value)
		.then((userCredential) => {
			const user = userCredential.user;
			// Práctica 1: la fecha de creación y el primer acceso son el momento del registro
			const dt = new Date();
			db.collection("datosUsuarios").add({
				"idemp": user.uid,
				"usuario": txtNombre.value,
				"email": user.email,
				"fechaCreacion": dt,
				"ultAcceso": dt
			}).then(function (docRef) {
				alert("Usuario agregado satisfactoriamente");
				limpiar();
			}).catch(function (FirebaseError) {
				alert("Error al registrar datos del usuario." + FirebaseError);
			});
		})
		.catch((error) => {
			alert("Error al agregar el nuevo usuario: " + error.message);
		});
});

function mostrarFechas(){
	const ahora = new Date().toLocaleString('es-CR');
	txtFechaCreacion.value = ahora;
	txtUltAcceso.value = ahora;
}

function limpiar(){
	txtNombre.value = '';
	txtEmail.value = '';
	txtContra.value = '';
	mostrarFechas();
	txtNombre.focus();
}
