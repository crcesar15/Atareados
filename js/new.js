var links = [];
var i = 0;
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
  }
});

$(window).on('beforeunload', function(e) {
  return 0;
});

$(window).on("unload",function (e) {
    for (var j = 0; j < links.length; j++) {
      link = links[j];
      link = link['value'];
      $.ajax({
        url: 'php/deletefile.php',
        type: 'POST',
        dataType: 'JSON',
        data: {name: link}
      })
      .fail(function() {
        console.log("");
      });
      console.log("");
    }
});

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
      $('select#sub').append(html);
    }else {
      Bootpop.alert('Primero Debe Agregar una Materia', { title:'Alerta', size: 'small',buttons:[ { btnClass : 'btn btn-success', btnLabel : 'Agregar Materia', btnValue : 'Y', btnAction : function(data){window.location.replace("subjects.html");} } ]});
    }
  })
  .fail(function() {
    console.log("error");
  });

});

$('form#nota').submit(function(e) {
  e.preventDefault();
  var info = [];
	var datos = $(this).serializeArray();
  for (var i = 0; i < links.length; i++) {
    info[i] = {name:"file"+(i+1),value:links[i].value};
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
      $(window).unbind('beforeunload');
      $(window).unbind('unload');
      $.ajax({
        url: 'php/addnote.php',
        type: 'POST',
        dataType: 'text',
        data: datos
      })
      .done(function(msg) {
        console.log(msg);
        if (msg == 0) {
          Bootpop.alert('Nota Creada Satisfactoriamente', { title:'Alerta', size: 'small',buttons:[ { btnClass : 'btn btn-success', btnLabel : 'OK', btnValue : 'Y', btnAction : function() {$('select#sub').focus();$('.modal').modal('hide'); window.location.replace("inicio.html");}} ]});
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


var buscar = function(file){
  for (var i = 0; i < links.length; i++) {
    if(links[i].name === file){
      dato = [links[i].value,i];
      return dato;
      break;
    }
  }
};
