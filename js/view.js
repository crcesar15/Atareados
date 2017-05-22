var modify = $('button#modify');
var save = $('button#save');
var del = $('button#del');
var reminder = $('button#reminder');
var share = $('button#share');
var links = [];
var i = 0;
$(document).ready(function() {
  $(".dz-hidden-input").prop("disabled",true);
  $.ajax({
    url: 'php/view.php',
    dataType: 'JSON'
  })
  .done(function(msg) {
    a = JSON.parse(msg[0]);
    $('input#title').val(a['titulo']);
    $('select#sub').html('<option>'+a['nombre_materia']+'</option>');
    $('textarea#desc').val(a['descripcion']);
  })
  .fail(function() {
    console.log("error");
  });

  $.ajax({
    url: 'php/files.php',
    dataType: 'JSON'
  })
  .done(function(msg) {
    html = '';
    for (var j = 0; j < msg.length; j++) {
      b = JSON.parse(msg[j]);
      nombre = b['link'];
      nombre = nombre.substring(nombre.indexOf('/')+1);
      nombre = nombre.substring(nombre.indexOf('/')+1);
      html = html + '<div id="file'+i+'"class="dz-preview dz-processing dz-image-preview dz-success dz-complete">'+
        '<div class="dz-image">';
        if (b['tipo'] === "jpg" || b['tipo'] === "jpeg" ) {
          html = html + '<img data-dz-thumbnail="" alt="'+nombre+'" src="'+b['link']+'" height="120" width="120">';
        }else {
          html = html + '<img data-dz-thumbnail="" src="" height="120" width="120" style="background-color:rgb(207, 207, 207)">';
        }
        html = html + '</div>  <div class="dz-details">'+
          '<div class="dz-size">'+
            '<span data-dz-size=""><strong>'+b['tipo']+'</strong></span>'+
          '</div>'+
          '<div class="dz-filename">'+
            '<span data-dz-name="">'+nombre+'</span>'+
          '</div>'+
        '</div>';
        html = html + '<center><a href="'+b['link']+'" target="_blank" >Vista Previa</a><br>'+
                  '<a href="'+b['link']+'" download>Descargar</a><br>'+
                '<a class="delfile hide" onclick="delfile(this);" value="'+nombre+'" >Eliminar</a>'+
              '</div></center>';

        add = {'name':nombre,'value':nombre};
        links[i] = add;
        i = i+1;
    }
    $("div#mydz").append(html);
  })
  .fail(function() {
    console.log("error");
  });

  $.ajax({
    url: 'php/reminder2.php',
    dataType: 'JSON',
  })
  .done(function(msg) {
    if(msg!==0){
      $('button#delrem').removeClass('hide');
      $('button#reminder').html('<span class="glyphicon glyphicon-time"></span> Modificar Recordatorio');
      $('input#rtitle').val(msg['titulo_rec']);
      $('input#rdate').val(msg['fecha_rec'].date.substring(0,10));
      $('input#rhour').val(msg['fecha_rec'].date.substring(11,19));
      $('textarea#rdesc').val(msg['texto_rec']);
    }
  })
  .fail(function() {
    console.log("error");
  });

});

$("div#mydz").dropzone({
  url: "php/uploadfile.php",
  acceptedFiles : "image/*,.pdf,.docx,.doc,.xlsx,.pptx,.txt",
  addRemoveLinks:"true",
  dictRemoveFile:"Eliminar",
  parallelUploads: 1,
  dictInvalidFileType:"No puede subir archivos de este tipo",
  dictDefaultMessage:"Clic o Arrastre Archivos Aqui",
  maxFilesize: 10,
  init: function() {
    this.on("removedfile", function(file) {
      dato = buscar(file.name);
      $.ajax({
        url: 'php/deletefile.php',
        type: 'POST',
        dataType: 'text',
        data: {name: dato[0]}
      })
      .done(function(msg) {
        i = i-1;
        links.splice(dato[1],1);
      })
      .fail(function() {
        console.log("error");
      });
    });
    this.on("success",function(file,msg){
      name = file.name;
      add = {'name':name,'value':msg};
      links[i] = add;
      i = i+1;
    });
    this.on("addedfile",function(){
      modify.click();
    });
  }
});

modify.click(function(event) {
  $(".dz-hidden-input").prop("disabled",false);
  $('a.delfile').removeClass('hide');
  modify.addClass('hide');
  del.addClass('hide');
  reminder.addClass('hide');
  share.addClass('hide');
  save.removeClass('hide');

  $('input#title').attr('disabled', false);
  $('select#sub').attr('disabled', false);
  $('textarea#desc').attr('disabled', false);

  $.ajax({
    url: 'php/subjects.php',
    type: 'GET',
    dataType: 'JSON',
  })
  .done(function(data) {
    html = '<option value=0>Seleccione una Materia</option>';
    if (data.length>0) {
      for (var j = 0; j < data.length; j++) {
        d = JSON.parse(data[j]);
        html = html + '<option value="'+d[0]+'">'+d[1]+'</option>';
      }
      $('select#sub').html(html);
    }else {
      Bootpop.alert('Primero Debe Agregar una Materia', { title:'Alerta', size: 'small',buttons:[ { btnClass : 'btn btn-success', btnLabel : 'Agregar Materia', btnValue : 'Y', btnAction : function(data){window.location.replace("subjects.html");} } ]});
    }
  })
  .fail(function() {
    console.log("error");
  });
});

var delfile = function(file) {
  file = $(file).attr('value');
  dato = buscar(file);
  $.ajax({
    url: 'php/deletefile.php',
    type: 'POST',
    dataType: 'text',
    data: {name: dato[0]}
  })
  .done(function(msg) {
    i = i-1;
    $('div#file'+dato[1]).html('');
    links.splice(dato[1],1);
  })
  .fail(function() {
    console.log("error");
  });
  console.log(links);
};

var buscar = function(file){
  for (var j = 0; j < links.length; j++) {
    if(links[j].name === file){
      dato = [links[j].value,j];
      return dato;
      break;
    }
  }
};

$('form#nota').submit(function(e) {
  e.preventDefault();
  var info = [];
	var datos = $(this).serializeArray();
  for (var j = 0; j < links.length; j++) {
    info[j] = {name:"file"+(j+1),value:links[j].value};
  }

  datos = datos.concat(info);
  info = [];
  info[0] = {name:"numfiles",value:links.length}
  datos = datos.concat(info);
  if (datos[1].value == 0) {
    Bootpop.alert('Debe Seleccionar una Materia', { title:'Alerta', size: 'small',buttons:[ { btnClass : 'btn btn-success', btnLabel : 'OK', btnValue : 'Y', btnAction : function() {$('select#sub').focus();$('.modal').modal('hide');}} ]});
  }else {
    if (links.length === 0) {
      Bootpop.alert('Debe Agregar Algun Archivo', { title:'Alerta', size: 'small',buttons:[ { btnClass : 'btn btn-success', btnLabel : 'OK', btnValue : 'Y', btnAction : function() {$('select#sub').focus();$('.modal').modal('hide');}} ]});
    } else {
      var a = new  Date();
      hora = a.getHours();
      minuto = a.getMinutes();
      segundos = a.getSeconds();
      dia = a.getDate();
      mes = a.getMonth()+1;
      year = a.getFullYear();
      fecha = [];
      date = year+"-"+mes+"-"+dia+" "+hora+":"+minuto+":"+segundos;
      fecha = {name:'fecha',value: date};
      datos = datos.concat(fecha);
      console.log(datos);
      $.ajax({
        url: 'php/updatenote.php',
        type: 'POST',
        dataType: 'text',
        data: datos
      })
      .done(function(msg) {
        console.log(msg);
        if (msg == 0) {
          Bootpop.alert('Nota Modificada Satisfactoriamente', { title:'Alerta', size: 'small',buttons:[ { btnClass : 'btn btn-success', btnLabel : 'OK', btnValue : 'Y', btnAction : function() {$('select#sub').focus();$('.modal').modal('hide'); window.location.replace("inicio.html");}} ]});
        } else {
          console.log('Error');
        }
      })
      .fail(function() {
        console.log("error");
      });

    }
  }
});

$('form#record').submit(function(event) {
  var datos = $(this).serializeArray();
  event.preventDefault();
  $.ajax({
    url: 'php/reminder.php',
    type: 'POST',
    dataType: 'JSON',
    data: datos
  })
  .done(function(msg) {
     if (msg) {
       Bootpop.alert('Recordatorio Asignado', { title:'Alerta', size: 'small',buttons:[ { btnClass : 'btn btn-success', btnLabel : 'OK', btnValue : 'Y', btnAction : function() {$('select#sub').focus();$('.modal').modal('hide'); window.location.replace("inicio.html");}} ]});
     }
  })
  .fail(function() {
    console.log("error");
  });
});

$('button#delrem').click(function(event) {
  $.ajax({
    url: 'php/deletereminder.php',
    dataType: 'JSON',
  })
  .done(function(msg) {
    if (msg) {
      Bootpop.alert('Recordatorio Eliminado', { title:'Alerta', size: 'small',buttons:[ { btnClass : 'btn btn-success', btnLabel : 'OK', btnValue : 'Y', btnAction : function() {$('select#sub').focus();$('.modal').modal('hide');location.reload();}} ]});
    }
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
});

del.click(function(event) {
  Bootpop.ask('Esta seguro de Eliminar esta Nota y Todos sus archivos',
  {
  title:'Alerta',
  size: 'small',
  buttons:[{ btnClass : 'btn btn-success', btnLabel : 'SI', btnValue : 'Y', btnAction : function(data){
    $.ajax({
      url: 'php/deletenote.php',
      dataType: 'text',
    })
    .done(function(msg) {
      console.log(msg);
      if (msg) {
        Bootpop.alert('Nota Eliminada', { title:'Alerta', size: 'small',buttons:[ { btnClass : 'btn btn-success', btnLabel : 'OK', btnValue : 'Y', btnAction : function() {$('.modal').modal('hide');window.location.replace("index.php");}} ]});
      }else {
        Bootpop.alert('No se puedo eliminar', { title:'Alerta', size: 'small',buttons:[ { btnClass : 'btn btn-success', btnLabel : 'OK', btnValue : 'Y', btnAction : function() {$('.modal').modal('hide');location.reload();}} ]});
      }
    })
    .fail(function() {
      console.log("error");
    });
     } },
          {
              btnClass : 'btn btn-default',
              btnLabel : 'NO',
              btnValue : 'N',
              btnAction : function(answer){
                  $('.modal').modal('hide')
              }
          }]
});
});
