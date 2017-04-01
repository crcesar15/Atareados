var ventana_ancho = $(window).width();
var ventana_alto = $(window).height();
var mensaje = $('div#mensaje');
var modalFooter = $('div#modalFooter');

$(document).ready(function($){
	$('#myTooltip').tooltip({ open: function (e) { setTimeout(function () { $(e.target).tooltip('close'); }, 1000); } });
	$('#myBtn').click(function () { $('#myTooltip').tooltip('open'); });
	mensaje.hide('0');

  if (ventana_ancho <= 768) {
    $('#who').addClass('sr-only');
  }else {
  	$('#who').removeClass('sr-only');
  }
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
			 alert("CI. valido");
			 return false;
		 }
		 else {
		 	alert("CI. Invalido");
			return false;

		 }
	 }else {
			 alert("CI. invalido");
			 return false;
	 }
 };


$('form#registro').submit(function(e) {
	e.preventDefault();
	var datos = $(this).serializeArray();
	if (validar(datos)) {
		modalFooter.html('<center><img src="./img/loading.gif" class="img-responsive" height="120" width="120"></center>');
		$.ajax({
			url: 'registro.php',
			type: 'post',
			dataType: 'json',
			data: datos,
		})
		.done(function(msg) {
			modalFooter.html('<center><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></center>');
			mensaje.html('Registro satisfactorio, su contraseña se enviara a su E-Mail');
			mensaje.removeClass('alert-danger');
			mensaje.addClass('alert-success');
			mensaje.fadeIn(300);
		})
		.fail(function() {
			modalFooter.html('<center><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></center>');
			mensaje.html('No se pudo registrar, intente más tarde');
			mensaje.addClass('alert-danger');
			mensaje.removeClass('alert-success');
			mensaje.fadeIn(300);
		});
	}
});
