/**** Validador de formulario ****/

jQuery.validator.addMethod("notNumber", function(value, element, param) {
  var reg = /[0-9]/;
  if(reg.test(value)){
    return false;
  }else{
    return true;
  }
}, "no se permiten n&uacute;meros");

function valRUT(rut){
    re=/^[1-9]{1}[0-9]*\.?[0-9]{3}\.?[0-9]{3}\-?[0-9kK]$/
    if(re.exec(rut))    {
        return true;
    }else{
        return false;
    }
}

function digito(T){var M=0,S=1;for(;T;T=Math.floor(T/10))
S=(S+T%10*(9-M++%6))%11;return S?S-1:'k';}
function valDV(dv){
    var dv_arr;
    var digito_final;
    var id_arr;
    var id;
    if(dv.indexOf("-")!= -1){
        dv_arr= dv.split("-");
        digito_final=dv_arr[1].toLowerCase();
        id_arr=dv_arr[0];
    }else{
        digito_final=dv.substring(dv.length-1,dv.length).toLowerCase();
        id_arr=dv.substring(0,dv.length-1);
    }   
    if(id_arr.indexOf(".")!=-1){
        id_arr=id_arr.split(".");
        id="";
        for (i=0;i<id_arr.length;i++){
            id +=id_arr[i];
         }
    }else{
        id=id_arr;
    }
     if(digito(id) == digito_final){
         return true;
     }else{
         return false;
     }
}



jQuery.validator.addMethod("rut", function(value, element) {
            return this.optional(element) || (valRUT(value)) && (valDV(value))
        }, "Ingresa un RUT v&aacute;lido.");

$(function(){
  $("#formularioForm").validate({
    errorPlacement: function(error, element) {
      // if(!element.parent().is('.wrapper')){
      //   element.wrap('<div class="wrapper"/>');
      // }
      element.parent().append(error);
    },
    //wrapper: "div",
    submitHandler:function(form){
      
      var action = $(form).attr("action");
      var datos = $(form).serialize();
      if((typeof action!='undefined')&&(action!="")){
        $.ajax({
          url: action,
          type: 'POST',
          data: datos,
          beforeSend: function(){
            //aca escondes el boton o le incluyes al click un return false, etc. para que no ocurra el multi submit.
            $('#formularioForm button').css('opacity', '0.4');
            $('#formularioForm button').on('click', function(){return false;});
          },
          success:function(respuesta){
            if(respuesta=='OK'){
              $("#exito").addClass('active');
              $("#formulario .titulo").css("display", "none");
              $("#formularioForm").css("display", "none");
            }else{
              $("#error").addClass('active');
              $("#formulario .titulo").css("display", "none");           
              $("#formularioForm").css("display", "none");
            }
          }
        }); 
      }else{
        $("#error").addClass('active').siblings().removeClass('active');
      }
      return false;
    },
    rules:{
      'nombre':{
        required:true,
        notNumber:true
      },
      'email':{
        required:true,
        email:true
      },
      'telefono':{
        required:true,
        number:true
      },
      'empresa':{
        required:true,
        notNumber:true
      }
    },
    messages:{
      'nombre':{
        required:'Debes escribir tu nombre y apellido'
      },
      'email':{
        required:'Debes escribir tu E-Mail',
        email:"Ingresa un correo válido"
      },
      'telefono':{
        required:'Debes escribir tu teléfono',
        number:'Debes ingresar solo n&uacute;meros'
      },
      'empresa':{
        required:'Debes escribir empresa/institución'
      }
      // 'telefono':{
      //   required:'Debes ingresar tu tel&eacute;fono',
      //   number:'Debes ingresar solo n&uacute;meros',
      //   rangelength:'El largo del tel&eacute;fono es entre 7 y 9'
      // }
    }
  });
});