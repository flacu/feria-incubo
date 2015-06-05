//Aspas de molino
var rotationSnap = 90;
Draggable.create(".box", {
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