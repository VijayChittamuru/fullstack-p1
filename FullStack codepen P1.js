$(document).ready(function(){
    $('#resetButton').click(function() {
      toastr.info('Form has been reset.');
      $(this).blur();
    });
  
    $('#submitButton').click(submitActions());
  });

function submitActions() {
  var valid = true;
  const details = [$("#username"), 
                   $("#firstName"),
                   $("#lastName"),
                   $("#phone"),
                   $("#fax"),
                   $("#email")];
  details.forEach(field => {
    if(field.val() == "") {
      field.addClass('has-error');
      valid = false;
    }
    else {
      field.removeClass('has-error');
    }
  });
  
  if(!valid) {
    toastr.error("Missing info. Please check all fields");
    return;
  }
  
  var cost = parseInt($("#cost").val());
  
  if($("#cost").val() == ""){
      toastr.error("Cost not calculated!");
      return;
    }
  
  if(cost < 0) {
    toastr.error("Cost is negative, please check the dates.")
    return;
  }
}