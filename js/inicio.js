var resultados = $('div#recent');
var reminder = $('div#reminder');

$(document).ready(function() {
  $.ajax({
    url: 'php/inicio.php',
    type: 'POST',
    dataType: 'JSON',
    data: {param1: 'value1'}
  })
  .done(function(data) {
      num = data.length;
      html = '<div class="col-xs-12 col-sm-8 col-sm-offset-2">';
      for (var i = 0; i < data.length; i++) {
        dato = JSON.parse(data[i]);
        html = html + '<div class="media">'+
          '<div class="media-left media-middle">'+
            '<a>'+
              '<div class="icono" style="background-color:'+dato['color']+'">'+
              '<img class="img-responsive" src="./img/note.png">'+
              '</div>'+
            '</a>'+
          '</div>'+
          '<div class="media-body">'+
            '<br>'+
            '<h4 class="media-heading"><strong>'+dato['titulo']+'</strong></h4>'+
            '<strong>Materia:</strong> '+dato['nombre_materia']+'<br>'+
            '<strong>Fecha:</strong> '+dato['dateinfo'].date.substring(0,19)+'<br>'+
            '<strong>Descripcion:</strong> '+dato['descripcion']+'<br>'+
          '</div>'+
          '<div class="media-right media-middle">'+
             '<a href="php/notas.php?nota='+dato['id_nota']+'" class="btn btn-info btn-block" ><span class="glyphicon glyphicon-plus" > Más...</span></a>'+
          '</div>'+
        '</div>'+
        '<hr>';
      }
      html = html + '<center>'+
        '<a class="btn btn-primary" href="new.html"> <span class="glyphicon glyphicon-pencil"></span>  Crear Nota</a>'+
      '</center></div>';
      resultados.html(html);
  })
  .fail(function() {
    console.log("error");
  });

  $.ajax({
    url: 'php/inireminder.php',
    type: 'POST',
    dataType: 'JSON',
    data: {param1: 'value1'}
  })
  .done(function(data) {
      num = data.length;
      html = '<div class="col-xs-12 col-sm-8 col-sm-offset-2">';
      for (var i = 0; i < data.length; i++) {
        dato = JSON.parse(data[i]);
        html = html + '<div class="media">'+
          '<div class="media-left media-middle">'+
            '<a>'+
              '<div class="icono" style="background-color:'+dato['color']+'">'+
                '<img class="img-responsive" src="./img/timer.png">'+
              '</div>'+
            '</a>'+
          '</div>'+
          '<div class="media-body">'+
            '<br>'+
            '<h4 class="media-heading"><strong>'+dato['titulo_rec']+'</strong></h4>'+
            '<strong>Materia:</strong> '+dato['nombre_materia']+'<br>'+
            '<strong>Fecha Recordatorio:</strong> '+dato['fecha_rec'].date.substring(0,19)+'<br>'+
            '<strong>Detalles:</strong> '+dato['texto_rec']+'<br>'+
          '</div>'+
          '<div class="media-right media-middle">'+
             '<a href="php/notas.php?nota='+dato['id_nota']+'" class="btn btn-info btn-block" ><span class="glyphicon glyphicon-plus" > Más...</span></a>'+
          '</div>'+
        '</div>'+
        '<hr>';
      }
      html = html + '</div>'
      reminder.html(html);
  })
  .fail(function() {
    console.log("error");
  });
});
