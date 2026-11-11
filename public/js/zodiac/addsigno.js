// JavaScript Document
var db = firebase.apps[0].firestore();
var container = firebase.apps[0].storage().ref();

const txtPosic = document.querySelector('#txtPosic');
const txtSigno = document.querySelector('#txtSigno');
const txtRango = document.querySelector('#txtRango');
// Práctica 2: nuevos campos
const cboElemento = document.querySelector('#cboElemento');
const txtAstro = document.querySelector('#txtAstro');
const txtPiedra = document.querySelector('#txtPiedra');
const txtArchi = document.querySelector('#txtArchi');
const btnLoad  = document.querySelector('#btnLoad');

btnLoad.addEventListener('click', function(){
	const archivo = txtArchi.files[0];
	// se valida el archivo antes de leer su nombre
	if(archivo == null){
		alert('Debe seleccionar una imagen');
	}else if(cboElemento.value == ''){
		alert('Debe seleccionar el elemento del signo');
	}else{
		const nomarch = archivo.name;
		const metadata = {
			contentType : archivo.type
		}
		const subir = container.child('zodiaco/'+nomarch).put(archivo, metadata);
		subir
			.then(snapshot => snapshot.ref.getDownloadURL())
			.then( url =>{
				db.collection("datosZodiaco").add({
					"posic"    : parseInt(txtPosic.value),
					"signo"    : txtSigno.value,
					"rango"    : txtRango.value,
					"elemento" : cboElemento.value,
					"astro"    : txtAstro.value,
					"piedra"   : txtPiedra.value,
					"url"      : url
				}).then(function(docRef) {
					alert("ID del registro: " + docRef.id);
					limpiar();
				}).catch(function(FirebaseError) {
					alert("Error al registrar el signo: " + FirebaseError);
				});
			})
			.catch(function(error) {
				alert("Error al subir la imagen: " + error.message);
			});
	}
});

function limpiar(){
	txtPosic.value = ''
	txtSigno.value = '';
	txtRango.value = '';
	cboElemento.value = '';
	txtAstro.value = '';
	txtPiedra.value = '';
	txtArchi.value = '';
	txtPosic.focus();
}
