// JavaScript Document
// Práctica 4: modificar los datos de un signo zodiacal
var db = firebase.apps[0].firestore();
var container = firebase.apps[0].storage().ref();

const txtId = document.querySelector('#txtId');
const txtPosic = document.querySelector('#txtPosic');
const txtSigno = document.querySelector('#txtSigno');
const txtRango = document.querySelector('#txtRango');
const cboElemento = document.querySelector('#cboElemento');
const txtAstro = document.querySelector('#txtAstro');
const txtPiedra = document.querySelector('#txtPiedra');
const imgActual = document.querySelector('#imgActual');
const txtArchi = document.querySelector('#txtArchi');
const btnUpdate = document.querySelector('#btnUpdate');
const btnCancel = document.querySelector('#btnCancel');

// id del signo que viene en la URL: editar.html?id=XXXX
const idSigno = new URLSearchParams(window.location.search).get('id');

// cargar los datos del signo seleccionado
if (!idSigno) {
	alert('No se indicó el signo a modificar');
	document.location.href = 'lista.html';
} else {
	db.collection("datosZodiaco").doc(idSigno).get()
		.then(function (doc) {
			if (!doc.exists) {
				alert('El signo seleccionado no existe');
				document.location.href = 'lista.html';
				return;
			}
			const d = doc.data();
			txtId.value = doc.id;
			txtPosic.value = d.posic;
			txtSigno.value = d.signo;
			txtRango.value = d.rango;
			cboElemento.value = d.elemento || '';
			txtAstro.value = d.astro || '';
			txtPiedra.value = d.piedra || '';
			imgActual.src = d.url;
		})
		.catch(function (error) {
			alert('Error al cargar el signo: ' + error.message);
		});
}

btnUpdate.addEventListener('click', function () {
	if (cboElemento.value == '') {
		alert('Debe seleccionar el elemento del signo');
		return;
	}
	const archivo = txtArchi.files[0];
	if (archivo == null) {
		// sin imagen nueva: se conserva la URL actual
		guardar(imgActual.src);
	} else {
		// con imagen nueva: se sube a Storage y se usa la nueva URL
		const metadata = { contentType: archivo.type };
		container.child('zodiaco/' + archivo.name).put(archivo, metadata)
			.then(snapshot => snapshot.ref.getDownloadURL())
			.then(url => guardar(url))
			.catch(function (error) {
				alert('Error al subir la imagen: ' + error.message);
			});
	}
});

btnCancel.addEventListener('click', function () {
	document.location.href = 'lista.html';
});

function guardar(url) {
	db.collection("datosZodiaco").doc(txtId.value).update({
		"posic"    : parseInt(txtPosic.value),
		"signo"    : txtSigno.value,
		"rango"    : txtRango.value,
		"elemento" : cboElemento.value,
		"astro"    : txtAstro.value,
		"piedra"   : txtPiedra.value,
		"url"      : url
	}).then(function () {
		alert('Signo actualizado correctamente');
		document.location.href = 'lista.html';
	}).catch(function (FirebaseError) {
		alert('Error al actualizar el signo: ' + FirebaseError);
	});
}
