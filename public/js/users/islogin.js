// JavaScript Document
// validate that user is log-in
var auth = firebase.apps[0].auth();
// Práctica 1: base de datos para registrar el último acceso al dominio
var dbSesion = firebase.apps[0].firestore();

function validar() {
	var uid = -1
	//const user = auth.currentUser;
	auth.onAuthStateChanged((user) => {
		if (user) {
			uid = user.uid;
			registrarAcceso(user.uid);
		} else {
			document.location.href = 'login.html';
		}
	});
	return uid;
}

// Práctica 1: actualiza la fecha de último acceso cada vez que el usuario
// entra a una página protegida del sitio
function registrarAcceso(uid){
	dbSesion.collection("datosUsuarios").where('idemp', '==', uid).get()
		.then(function (query) {
			query.forEach(function (doc) {
				doc.ref.update({ ultAcceso: new Date() });
			});
		})
		.catch(function (error) {
			console.log('No se pudo registrar el último acceso: ' + error.message);
		});
}

// close current session
function salir(){
	auth.signOut().then(() => {
		document.location.href ='login.html';
	}).catch((error)=>{
	   alert('Error al cerrar la sesión: ' + error.message);
	});
}
