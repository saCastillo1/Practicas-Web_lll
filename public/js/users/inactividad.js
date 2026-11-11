// JavaScript Document
// Práctica 5: cierra la sesión si el usuario no muestra movimiento durante 3 minutos.
// Se usa en las páginas de los signos zodiacales: lista.html, agregar.html y editar.html
// Requiere que islogin.js esté cargado (usa la variable auth).

const TIEMPO_INACTIVIDAD = 3 * 60 * 1000;   // 3 minutos en milisegundos
var temporizador = null;

function reiniciarTemporizador() {
	clearTimeout(temporizador);
	temporizador = setTimeout(cerrarPorInactividad, TIEMPO_INACTIVIDAD);
}

function cerrarPorInactividad() {
	auth.signOut().then(() => {
		alert('Su sesión se cerró por inactividad (3 minutos sin movimiento).');
		document.location.href = 'login.html';
	}).catch((error) => {
		alert('Error al cerrar la sesión: ' + error.message);
	});
}

// cualquier movimiento del usuario reinicia el conteo
['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'wheel'].forEach(function (evento) {
	document.addEventListener(evento, reiniciarTemporizador, { passive: true });
});

// inicia el conteo al cargar la página
reiniciarTemporizador();
