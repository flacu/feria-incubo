//Aspas de molino
var rotationSnap = 90;
Draggable.create(".boxes", {
    type:"rotation", 
    throwProps:true, //enables kinetic-based flicking (continuation of movement, decelerating after releasing the mouse/finger)
    snap:function(endValue) { 
        return Math.round(endValue / rotationSnap) *  rotationSnap;
    },
  // onThrowComplete: function(event){
  //   //console.log('giro');
  //   $('#box1').addClass('giro');
  // }
  onPress: function(event){
    $('.box').removeClass('autogiro');
  },
  minDuration :450
});

//Molino inicio
var rotationSnap = 90;
Draggable.create("#molino-inicio", {
    type:"rotation", 
    throwProps:true, //enables kinetic-based flicking (continuation of movement, decelerating after releasing the mouse/finger)
    snap:function(endValue) { 
        return Math.round(endValue / rotationSnap) *  rotationSnap;
    },
  // onThrowComplete: function(event){
  //   //console.log('giro');
  //   $('#box1').addClass('giro');
  // }
  onDragEnd: function(event){
    $('#black, #intro .molino, #intro .right, #textos-inicio, #intro .flecha, nav').removeClass('current');
  },
  onPress: function(event){
    $('#textos-inicio img').css('opacity', '0');
  },
  minDuration :450
});

//Botonera navegacion
$('nav a').on('click', function(e){
  e.preventDefault();

  if($(this).hasClass('menu')){
    $('nav').toggleClass('activo');
  }
  else{
    var seccion = $(this).data('seccion');
    $('#'+seccion).addClass('activo').siblings().removeClass('activo');
    $('body').css('background-image', 'url(assets/images/bg_'+seccion +'.jpg)');
    $(this).addClass('activo').siblings().removeClass('activo');

    //setTimeout(function(){
      $('nav').toggleClass('activo');
    //}, 700);
  }
});

//Boton header reload - Btn error volver fomrulario
$('header a, #error a').on('click', function(e){
  e.preventDefault();
  location.reload();
});
