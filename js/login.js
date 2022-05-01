$(document).ready(function() {

    function showAlert(type, message) {

        if (type == 'success') {
            $(".alert").removeClass("alert-danger");
            $(".alert").addClass("alert-success");
        } else {
            $(".alert").removeClass("alert-success");
            $(".alert").addClass("alert-danger");
        }

        $(".alert .message").html(message);
        $(".alert").show();
    }



    $("#form").on("submit", function(e) {
        e.preventDefault();
        var action = 'login';
        var username = $("#username").val();
        var password = $("#password").val();
        var role = ($("#role").is(':checked')) ? true : false;

        action = role ? 'adminLogin' : action;

        var data = {
            "action": action,
            "username": username,
            "password": password

        };


        $.ajax({
            method: "POST",
            url: '../api/login.php',
            data: data,
            dataType: "JSON",
            async: true,
            success: function(data) {
                var status = data.status;
                var message = data.message[0];

                if (status == true) {
                    sessionStorage.setItem('username', message['username']);

                    window.location = 'dashboard1.php'
                } else {
                    showAlert('error', message)
                    window.scroll(0, 0);


                }
            },
            error: function(data) {

            }
        });

    });






});