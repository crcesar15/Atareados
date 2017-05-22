var resultados = $('div#notas');
var ini = 0;
var fin = 5;
var info;
var paginas = 0;
var pagina = 1;
$(document).ready(function() {
    $.ajax({
      url: 'php/subjects.php',
      type: 'GET',
      dataType: 'JSON',
    })
    .done(function(data) {
      html = '';
      if (data.length>0) {
        for (var i = 0; i < data.length; i++) {
          d = JSON.parse(data[i]);
          html = html + '<option value="'+d[0]+'">'+d[1]+'</option>';
        }
        $('select#tags').append(html);
      }else {
        Bootpop.alert('Primero Debe Agregar una Materia', { title:'Alerta', size: 'small',buttons:[ { btnClass : 'btn btn-success', btnLabel : 'Agregar Materia', btnValue : 'Y', btnAction : function(data){window.location.replace("subjects.html");} } ]});
      }
    })
    .fail(function() {
      console.log("error");
    });
});

$('form#browser').submit(function(event) {
  event.preventDefault();
  datos = $(this).serializeArray();

  $.ajax({
    url: 'php/search.php',
    type: 'POST',
    dataType: 'JSON',
    data: datos
  })
  .done(function(data) {
     mostrarNotas(data);
     info = data;
  })
  .fail(function() {
    paginador(0);
    html = '<p class="text-center default">No se encontraron coincidencias</p>';
    resultados.html(html);
  });
});

var mostrarNotas = function(data){
  num = data.length;
  paginador(num);
  html = '<div class="col-xs-12 col-sm-8 col-sm-offset-2">';
  if (num<fin) {
    fin = num;
  }
  for (var i = ini; i < fin; i++) {
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
  html = html + '</div>'
  resultados.html(html);
}

var paginador = function(num){
      if (num!=0) {
          $('div#paginador').removeClass('hide');
          if (num>0 && num <5) {
            $('ul.pagination').html('<li><a disabled>1</li>');

          }else {
            cant = Math.ceil(num/5);
            html = '<li><a onclick="ant()">&laquo;</a></li>';
            for (var i = 0; i < cant; i++) {
              html = html+'<li><a onclick="pag('+(i+1)+')">'+(i+1)+'</a></li>';
            }
            paginas = cant;
            html = html + '<li><a onclick="sig()">&raquo;</a></li>';
            $('ul.pagination').html(html);
          }
      }else {
        $('div#paginador').addClass('hide');
      }
}

var pag = function(a){
  pagina = a;
  fin = (a*5);
  ini = fin - 5;
  mostrarNotas(info);
};

var ant = function(){
    if (pagina !== 1 ) {
      console.log('entra');
      pag(pagina-1);
    }
}


var sig = function(){
    if (pagina !== paginas) {
      console.log('lol');
        pag(pagina+1);
    }
}

$('input.form-control').click(function(event) {
  $('button#search').html('<span class="glyphicon glyphicon-search"></span> Buscar');
});
