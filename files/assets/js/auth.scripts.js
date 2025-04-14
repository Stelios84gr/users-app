$(document).ready(function(){ // με το που φορτώσει η σελίδα, φορτώνω και τη function

   $('.row').off('click', '.btnSubmit').on('click', '.btnSubmit', function () {

    let username = $("#username").val();
    let password = $("#password").val();
    
    const item = {
      'username': username,
      'password': password,
    }

    console.log($('.btnSubmit').val(), item);
    $.ajax({
      url: "http://localhost:3000/api/auth/login",
      type: "post",
      data: item,
      dataType: "JSON",
      // encode: true,
    })
    .done( function(response) { // αφού η παραπάνω async κλήση ολοκληρωθεί επιτυχώς
      // console.log(">>", response);
      
      let data = response.data;
      let status = response.status
  
      if (status) { 
          console.log(true,'Επιτυχής σύνδεση του χρήστη');
          alert(true,'Επιτυχής σύνδεση του χρήστη');
          $('#frmLogin')[0].reset();
          // Save the token to localStorage
          localStorage.setItem('jwt_token', data);  // δημιούργησε στο localStorage το jwt_token
          window.location.replace("http://localhost:3000/user/find.html") // redirect
      } else {
          console.log(false,'Πρόβλημα στην συνδεση του χρήστη ('+ data + ')');
          alert(false,'Πρόβλημα στην σύνδεση του χρήστη ('+ data + ')');
          $('#frmLogin')[0].reset();
          // console.log(data.message);
      }
    })
    .fail(function(err){
      console.log("Error>>", err.responseJSON.data);
      alert(false,err.responseJSON.data);
    });;

    return false
  });

});

function alert(status, message){
  if (status){
      $('.alert').addClass('alert-success');
      $('.alert').removeClass('alert-danger');
  } else {
      $('.alert').addClass('alert-danger');
      $('.alert').removeClass('alert-success');
  }
  $('.alert').html(message);
}