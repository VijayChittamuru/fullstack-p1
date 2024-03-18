$(document).ready(function(){
  toastr.options = {
    'closeButton': true,
  };
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
  const details = [{ field: $("#username"), label: "Username" },
                   { field: $("#firstName"), label: "First Name" },
                   { field: $("#lastName"), label: "Last Name" },
                   { field: $("#phone"), label: "Phone" },
                   { field: $("#fax"), label: "Fax" },
                   { field: $("#email"), label: "Email" }];
  details.forEach(item => {
    if(item.field.val() == "") {
      item.field.closest('.form-group').addClass('has-error');
      toastr.error("Missing " + item.label);
    }
    else {
      item.field.closest('.form-group').removeClass('has-error');
    }
  });


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