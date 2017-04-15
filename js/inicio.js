$(document).ready(function() {
  $.ajax({
    url: 'inicio.php',
    type: 'POST',
    dataType: 'JSON',
    data: {param1: 'value1'}
  })
  .done(function(msg) {
    console.log(msg);
  })
  .fail(function() {
    console.log("error");
  });
});
