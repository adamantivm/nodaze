$('document').ready(function(){
  $.get('/data/5', function( data) {
    console.dir(data);
    alert(data);
  });
});
