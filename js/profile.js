var a = $('input.data');
var dato = [];
var info;
var src = '';
var flag = 0;
var mensaje = $('div#mensaje');
var image = $('input#file2');
var modificar = function(data){
  a[0].value=data[1];
  a[1].value=data[2];
  a[2].value=data[3];
  a[3].value=data[4];
  a[4].value=data[5];
};

var actualizar = function(){

  $.ajax({
    url: 'php/profile.php',
    dataType: 'JSON'
  })
  .done(function(data) {
    modificar(data);
    info = data;

    if(data[6] !== ""){
      $('img#photo').attr('src', data[6]);
      $('img#photoEdit').attr('src', data[6]);
    }
  })
  .fail(function() {
    console.log("Error");
  });
};

$(document).ready(function() {
  image = $('input#file2');
  actualizar();
});

$('a#modif').click(function(event) {
  if (flag == 0) {
    $('button#savedata').removeClass('hide');
    $('a#modif').removeClass('btn-info');
    $('a#modif').addClass('btn-danger');
    $('a#modif').html('<span class="glyphicon glyphicon-remove"></span> Cancelar');
    flag = 1;
    for (var i = 0; i < a.length; i++) {
      a[i].disabled=false;
    }
  } else {
    modificar(info);
    $('button#savedata').addClass('hide');
    $('a#modif').removeClass('btn-danger');
    $('a#modif').addClass('btn-primary');
    $('a#modif').html('<span class="glyphicon glyphicon-pencil"></span> Modificar');
    for (var i = 0; i < a.length; i++) {
      a[i].disabled=true;
    }
    flag = 0;
  }
});

$('button#file1').click(function(event) {
  $('button#save').removeClass('hide');
  event.preventDefault();
  image.click();
});

image.change(function(){
 var input = this;
 dato = new FormData();
 dato.append('archivo',this.files[0]);


 if (input.files && input.files[0]) {
  var reader = new FileReader();
    reader.onload = function (e) {
   $('img#photoEdit').attr('src', e.target.result);
   src = e.target.result;
  }
  reader.readAsDataURL(input.files[0]);
 }
 console.log(dato);
});

$('button#save').click(function(event) {
  event.preventDefault();
  $.ajax({
    url: 'php/uploading.php',
    type: 'POST',
    contentType:false,
    data: dato,
    processData:false,
    cache:false
  })
  .done(function(msg) {
    //$('img#photo').attr('src', src);
    //$('button#close').click();
    location.reload(true);
  })
  .fail(function() {
    alert("error");
  });
});

$('form#actualizar').submit(function(e) {
	e.preventDefault();
	var datos = $(this).serializeArray();
		$('img#loading').removeClass('hide');
		$.ajax({
			url: 'php/update.php',
			type: 'post',
			dataType: 'text',
			data: datos
		})
		.done(function(msg) {
      $('img#loading').addClass('hide');
      if (msg == 1) {
        mensaje.removeClass('hide');
  			mensaje.html('Actualizacion exitosa');
  			mensaje.removeClass('alert-danger');
  			mensaje.addClass('alert-success');
        mensaje.fadeOut(3000);
        actualizar();
        $('a#modif').click();

      }else {
        mensaje.removeClass('hide');
        mensaje.html('No se pudo actualizar, intente más tarde');
  			mensaje.addClass('alert-danger');
  			mensaje.removeClass('alert-success');
        mensaje.fadeOut(3000);
        $('a#modif').click();
      }

		})
		.fail(function() {
      $('img#loading').addClass('hide');
			mensaje.removeClass('hide');
			mensaje.html('No se pudo conectar, intente más tarde');
			mensaje.addClass('alert-danger');
			mensaje.removeClass('alert-success');
      mensaje.fadeOut(3000);
      $('a#modif').click();
		});
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
