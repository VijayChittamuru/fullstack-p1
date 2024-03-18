$(document).ready(function(){
  // On click action for the reset button
  $('#resetButton').click(() => {
    toastr.info('Form has been reset.');
    $(this).blur();
  });

  // On click action for the submit button
  $('#submitButton').click(() => {
    submitActions();
    $(this).blur();
  });

  // Listens for changes in schedule components
  $('#adults, #checkin, #checkout').change(scheduleChange);
});

  function scheduleChange(){
    var adults = $('#adults').val();
    var checkIn = $('#checkin').val();
    var checkOut = $('#checkout').val();
    if (adults && checkIn && checkOut) {
      var days = moment(checkOut).diff(moment(checkIn), 'days');
      $('#days').val(days);
      $('#cost').val(adults * days * 150);
    }
  }
  
  function submitActions() {
    event.preventDefault();
    var valid = true;
    const details = [$("#username"), 
                     $("#firstName"),
                     $("#lastName"),
                     $("#phone"),
                     $("#fax"),
                     $("#email")];
    details.forEach(field => {
      if(field.val() == "") {
        field.closest('.form-group').addClass('has-error');
        valid = false;
      }
      else {
        field.closest('.form-group').removeClass('has-error');
      }
    });
    
    if(!valid) {
      toastr.error("Missing info. Please check marked fields");
      return;
    }

    if($("#cost").val() == ""){
      toastr.error("Cost not calculated, please check the dates.");
      return;
    }

    var cost = parseInt($("#cost").val());

    if(cost <= 0) {
      toastr.error("Cost must be positive, please check the dates.");
      return;
    }

    toastr.success("Successfully submitted!");
  }