console.log('You are awesome');
$(document).ready(function(){
  $("#loginform").validate({
   rules: {     
    user: {required: true},
    password: {required: true}
   },
   
   tooltip_options: {
    user: {trigger:'focus'},
    password: {placement:'right',html:true}
   },
   submitHandler: function(form) { 
    alert("No Error");
   }
   
  });
 });