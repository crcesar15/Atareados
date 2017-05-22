var materias = $('div#materias');
var num = 0;
var dias = ['Lunes','Martes','Miercoles','Jueves','Viernes'];

$(document).ready(function() {
  $('input#tags').bootcomplete({
      url:'php/subjects2.php',
      method: 'POST',
      minLength:2
  });

  $.ajax({
    url: 'php/subjects.php',
    type: 'POST',
    dataType: 'JSON'
  })
  .done(function(msg) {
    var html = '<div class="table-responsive"><table class="table table-striped table-hover"><tr><th class="text-center" width="5%">Nº</th><th width="65%" class="text-center">Nombre Materia</th><th class="text-center" width="30%">Accion</th></tr>';
    for (var i = 0; i < msg.length; i++) {
      var aux = JSON.parse(msg[i]);
      i = i+1;
      html = html+'<tr><td class="text-center">'+i+'</td><td class="text-center">'+aux[1]+'</td><td><center><div class="btn-group btn-group-sm">'+
      '<button class="btn btn-info info" onclick="modal(this)" data-toggle="modal" data-target="#myModal" value="'+aux[0]+'"><span class="glyphicon glyphicon-info-sign"></span> Info</button>'+
      '<button class="btn btn-warning" value="'+aux[0]+'"><span class="glyphicon glyphicon-pencil"></span> Modificar</button>'+
      '<button class="btn btn-danger" onclick="delsub(this)" value="'+aux[0]+'"><span class="glyphicon glyphicon-trash"></span> Eliminar</button>'+
      '</div></td></center></tr>';
      i=i-1;
    }
    html = html+'</table></div>';
    materias.html(html);
  })
  .fail(function() {
    console.log('Error');
  });
});

var delsub = function(e){
  $.ajax({
    url: 'php/namesubjects.php',
    type: 'POST',
    dataType: 'text',
    data: {id: e.value}
  })
  .done(function(msg) {
    msg = JSON.parse(msg);
    Bootpop.ask('Esta seguro de ELIMINAR la materia "'+msg[0]+'" y Todas sus notas almacenadas',
    {
    title:'Bootpop Alert',
    size: 'small',
    buttons:[{ btnClass : 'btn btn-success', btnLabel : 'SI', btnValue : 'Y', btnAction : function(data){
      $.ajax({
        url: 'php/deletesubject.php',
        type: 'POST',
        dataType: 'text',
        data: {id: e.value}
      })
      .done(function(msg) {
        location.reload(false);
      })
      .fail(function() {
        console.log("error");
      });
      $('.modal').modal('hide') } },
            {
                btnClass : 'btn btn-danger',
                btnLabel : 'NO',
                btnValue : 'N',
                btnAction : function(answer){
                    $('.modal').modal('hide')
                }
            }]
  });
  })
  .fail(function() {
    console.log("error");
  });
};

var modal = function(e){
  $.ajax({
    url: 'php/subjectinfo.php',
    type: 'POST',
    dataType: 'JSON',
    data: {mat: e.value}
  })
  .done(function(msg) {
    num = 1;
    var html = '';
    for (var i = 0; i < msg.length; i++) {
      a = JSON.parse(msg[i]);
      inicio = a[1].date;
      inicio = inicio.substring(11, 16);
      fin = a[2].date;
      fin = fin.substring(11, 16);
      if (i>0) {
        html = html +'<hr>';
      }
      html = html + '<div class="row"><div class="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3">'+
          '<p class="text-center"><strong>Dia '+num+'</strong></p>'+
          '<select class="form-control" value="'+a[0]+'" name="dia'+num+'" disabled>';
          for (var j = 1; j < 6; j++) {
            if (a[0] === j) {
              html  = html + '<option value="'+j+'" selected>'+dias[j-1]+'</option>';
            }else {
              html  = html + '<option value="'+j+'">'+dias[j-1]+'</option>';
            }
          }
          html = html +'</select>'+
        '</div>'+
      '</div>'+
      '<div class="row">'+
        '<div class="col-xs-10 col-xs-offset-1 col-md-3 col-md-offset-3">'+
          '<label for="">Inicio</label>'+
          '<input type="time" name="ini'+num+'" class="form-control" required="true" disabled value="'+inicio+'">'+
        '</div>'+
        '<div class="col-xs-10 col-xs-offset-1 col-md-3 col-md-pull-1">'+
          '<label for="">Fin</label>'+
          '<input type="time" name="fin'+num+'" class="form-control" required="true" disabled value="'+fin+'">'+
        '</div>'+
      '</div> <br>';
      num = num + 1;
    }
    $('div#infoMateria').html(html);
  })
  .fail(function() {
    html = '<h4>No se encontraron Horarios para esta materia</h4>';
    $('div#infoMateria').html(html);
  });
};

$('button#addsubject').click(function(event) {
  num = num + 1;
  var html = '<hr><div class="row">'+
    '<div class="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3">'+
      '<p class="text-center"><strong>Dia '+num+'</strong></p>'+
      '<select class="form-control" name="dia'+num+'" request>'+
        '<option value="1">Lunes</option>'+
        '<option value="2">Martes</option>'+
        '<option value="3">Miercoles</option>'+
        '<option value="4">Jueves</option>'+
        '<option value="5">Viernes</option>'+
      '</select>'+
    '</div>'+
  '</div>'+
  '<div class="row">'+
    '<div class="col-xs-10 col-xs-offset-1 col-md-3 col-md-offset-3">'+
      '<label for="">Inicio</label>'+
      '<input type="time" name="ini'+num+'" class="form-control" required="true">'+
    '</div>'+
    '<div class="col-xs-10 col-xs-offset-1 col-md-3 col-md-pull-1">'+
      '<label for="">Fin</label>'+
      '<input type="time" name="fin'+num+'" class="form-control" required="true">'+
    '</div>'+
  '</div> <br>';
  $('div#addModal').append(html);
});

$('form#add').submit(function(event) {
  var modalFooter = $('div#addfotter');
  $('button#btn1').addClass('hide');
  $('button#btn2').addClass('hide');
  modalFooter.html('<center><img src="./img/loading.gif" class="img-responsive" height="100" width="100"></center>');
  event.preventDefault();
  a = $(this).serializeArray();
  if (a[1].name !== '0') {
    a[1].value = a[1].name;
  }
  a[1].name = 'id';
  var add = {'name':'num','value':num};
  a.push(add);
  console.log(a);


  $.ajax({
    url: 'php/addsubject.php',
    type: 'POST',
    dataType: 'text',
    data: a
  })
  .done(function(msg) {
    modalFooter.html('');
    $('div#alertmsg').removeClass('hide');
    if (msg==0) {
      $('div#alertmsg').addClass('alert-danger');
      $('div#alertmsg').text('Error, Intente más Tarde');
    }
    if (msg==1) {
      $('div#alertmsg').addClass('alert-warning');
      $('div#alertmsg').text('Alerta, Esta materia ya fue Agregada a su Cuenta');
    }
    if (msg==2) {
      $('div#alertmsg').addClass('alert-success');
      $('div#alertmsg').text('Materia Agregada Exitosamente');
    }
    $('div#alertmsg').fadeOut(8000);
    $('button#btn1').removeClass('hide');
    $('button#btn1').addClass('btn-block');

  })
  .fail(function() {
    console.log("error");
  });

});

$('input#tags').keydown(function(event) {
  $(this).attr('name', '0');
});
