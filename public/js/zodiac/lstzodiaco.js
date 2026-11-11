var db = firebase.apps[0].firestore();

const tabla = document.querySelector('#tabla');

db.collection("datosZodiaco").orderBy('posic', 'asc').get().then(function(query){
	tabla.innerHTML="";
	var salida = "";
	query.forEach(function(doc){
		const d = doc.data();
		// Práctica 3: clase según el elemento para darle color a la tarjeta
		const claseElem = d.elemento ? ' elem-' + d.elemento : '';
		// Práctica 4: al seleccionar la tarjeta se abre la página de edición
		salida += '<div class="divAnuncio m-3' + claseElem + '" onclick="editarSigno(\'' + doc.id + '\')" title="Clic para editar">'
			salida += '<div class="imgBlock"><img src="' + d.url +'" width="100%" /></div>'
			salida += '<div class="signoNombre">'+ d.signo + '</div>'
			salida += '<div class="signoRango">'+ d.rango + '</div>'
			// Práctica 3: nuevos datos del signo
			salida += '<div class="signoDatos">'
				salida += '<span class="badgeElem">' + (d.elemento || 'Sin elemento') + '</span>'
				salida += '<div><i class="fas fa-star"></i> ' + (d.astro || '-') + '</div>'
				salida += '<div><i class="fas fa-gem"></i> ' + (d.piedra || '-') + '</div>'
			salida += '</div>'
		salida += '</div>'
	})
	tabla.innerHTML = salida;
})

// Práctica 4: llama a la página de edición con el id del signo seleccionado
function editarSigno(id){
	document.location.href = 'editar.html?id=' + id;
}
