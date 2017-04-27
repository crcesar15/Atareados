
var mensaje = $('div#mensaje');
var modalFooter = $('div#modalFooter');
var msgalert = $('div#msg');

$(document).ready(function($){
	$('#myTooltip').tooltip({ open: function (e) { setTimeout(function () { $(e.target).tooltip('close'); }, 1000); } });
});
	var mayusDatos = function(datos){
		 dato = datos.value;
		 aux = dato.split(" ");
		 dato = "";
		 for (var i = 0; i < aux.length; i++) {
		 		dato = dato + aux[i].charAt(0).toUpperCase();
				dato = dato + aux[i].substring(1).toLowerCase();
				if (i+1 !== aux.length) {
					dato = dato + " ";
				}
		 }
		 datos.value = dato;
	}

 var validar = function(data){

	 var ci = data[3].value;
	 if (ci.indexOf('e') === -1) {
		 if ((ci.length === 7) || (ci.length === 8)) {
			 console.log('llega');
			 //true
			 return true;
		 }
		 else {
			 console.log('llega2');
			 $('#myTooltip').tooltip('open');
			return false;

		 }
	 }else {
		 	console.log('llega3');
			 $('#myTooltip').tooltip('open');
			 return false;
	 }
 };

$('#cerrar2').click(function() {
	reload();
});
$('#cerrar').click(function() {
	reload();
});

$('form#registro').submit(function(e) {
	e.preventDefault();
	var datos = $(this).serializeArray();
	if (validar(datos)) {
		modalFooter.html('<center><img src="./img/loading.gif" class="img-responsive" height="100" width="100"></center>');
		$.ajax({
			url: 'registro.php',
			type: 'post',
			dataType: 'json',
			data: datos
		})
		.done(function(msg) {
			modalFooter.html('<center><button type="button" id="cerrar2" class="btn btn-default" data-dismiss="modal">Cerrar</button></center>');
			mensaje.html('Registro satisfactorio, su contraseña se enviara a su E-Mail');
			mensaje.removeClass('sr-only');
			mensaje.removeClass('alert-danger');
			mensaje.addClass('alert-success');
			mensaje.fadeIn(300);
			mensaje.fadeOut(300);
		})
		.fail(function() {
			modalFooter.html('<center><a href="index.html" class="btn btn-default">Cerrar</a></center>');
			mensaje.html('No se pudo registrar, intente más tarde');
			mensaje.removeClass('sr-only');
			mensaje.addClass('alert-danger');
			mensaje.removeClass('alert-success');
			mensaje.fadeIn(300);
		});
	}
});

$('form#login').submit(function(e){
	e.preventDefault();
	var datos = $('form#login').serializeArray();
	$.ajax({
		url: 'login.php',
		type: 'post',
		dataType: 'text',
		data: datos
	})
	.done(function(msg) {
		if (msg === "1") {
			window.location="inicio.html";
		} else {
			msgalert.removeClass('sr-only');
			msgalert.html(msg);
		}
	})
	.fail(function() {
		msgalert.html(msg);
		msgalert.html('Sistema no disponible, Lamentamos los Incovenientes');
	});
});

var reload = function(){
	var aux = $('input');
	for (var i = 0; i < aux.length; i++) {
		aux[i].value = '';
	}
};
