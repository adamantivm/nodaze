$('document').ready(function(){
  var month = $('#month').html();
  $.get('/days/'+month, function(data) {
    renderAll(data, month);
  });
});

function renderAll(data, month) {
  $('#list').empty();
  $(data).each(function(ix, userid){
    userid = userid.split(':')[1];
    $('#list').append('<li id="element_'+userid+'"></li>');
    $.get('/days/'+month+'/'+userid, function(data) {
      renderOne(data, userid);
    });
  });
}

function renderOne(data, userid) {
  $('#element_'+userid).append('<span id="name_'+userid+'">'+userid+'</span> didn\'t work '+data.length+' days: ' + data.join(", "));
  $.get('/users/'+userid, function(data) {
    $('#name_'+userid).html(data.name);
  });
}
