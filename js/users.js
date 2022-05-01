$(document).ready(function() {
    loadUsers();
    var btn_action = 'Insert';
    var modalPopup = $("#modal");

    $('#table tbody').on('click', 'button.delete', function() {
        var userID = $(this).attr("userID");

        if (confirm("Are You sure to delete this Lecturer")) {
            deleteUsers(userID);
        }
    })

    $('#table tbody').on('click', 'button.edit', function() {
        var userID = $(this).attr("userID");
        btn_action = 'Update';
        fetchLecturer(userID);
    })


    function deleteUsers(userID) {
        var data = {
            "action": "delete",
            "userID": userID
        }


        $.ajax({
            method: "POST",
            url: "../api/users.php",
            data: data,
            dataType: "JSON",
            async: true,

            success: function(data) {
                var status = data.status;
                var message = data.message;

                if (status) {
                    loadUsers();
                } else {}
            },
            error: function(data) {

            }



        });

    }


    function loadUsers() {
        var data = {
            "action": "read",
            "userID": ""
        }


        $.ajax({
            method: "POST",
            url: "../api/users.php",
            data: data,
            dataType: "JSON",
            async: true,

            success: function(data) {
                var status = data.status;
                var message = data.message;
                var cols = '';
                var rows = '';

                if (status) {
                    message.forEach(function(item, i) {
                        cols = '<tr>';
                        for (index in item) {
                            cols += '<th>' + index + '</th>';
                        }
                        cols += '<th> Action </th>';
                        cols += '</tr>';
                        rows += '<tr>';
                        for (index in item) {
                            rows += '<td>' + item[index] + '</td>';
                        }
                        rows += `<td><button class= "btn btn-success edit" userID="` + item['user_id'] + `"><i class = "fa fa-edit"></i></button>
                        <button class= "btn btn-danger delete" userID="` + item['user_id'] + `"><i class = "fa fa-trash"></i></button></td>
                        `
                        rows += '</tr>';

                    });
                    $("#table thead").html(cols);
                    $("#table tbody").html(rows);
                    $("#table").dataTable();
                } else {
                    console.log(message);
                }
            },
            error: function(data) {

            }



        });

    }


    function fetchLecturer(userID) {
        var data = {
            "action": "read",
            "userID": userID
        }



        $.ajax({
            method: "POST",
            url: "../api/users.php",
            data: data,
            dataType: "JSON",
            async: true,

            success: function(data) {
                var status = data.status;
                var message = data.message;
                // var cols = '';
                // var rows = '';

                if (status) {
                    $("#userID").val(message[0]['user_id']);
                    $("#username").val(message[0]['username']);
                    $("#password").val(message[0]['password']);
                    $("#status").val(message[0]['status']);
                    $("#date").val(message[0]['reg_date']);
                    $("#lecturerID").val(message[0]['lecturer_id']);
                    modalPopup.modal('show');
                } else {}
            },
            error: function(data) {

            }

        });

    }

    $("#form").on('submit', function(e) {
        e.preventDefault();
        var userID = $("#userID").val();
        var username = $("#username").val();
        var password = $("#password").val();
        var status = $("#status").val();
        var date = $("#date").val();
        var lecturerID = $("#lecturerID").val();

        if (btn_action == 'Insert') {
            var data = {
                "action": 'Insert',
                "userID": userID,
                "username": username,
                "password": password,
                "status": status,
                "date": date,
                "lecturerID": lecturerID
            }
        } else {
            var data = {
                "action": 'Update',
                "userID": userID,
                "username": username,
                "password": password,
                "status": status,
                "date": date,
                "lecturerID": lecturerID

            }
        }



        $.ajax({
            method: "POST",
            url: "../api/users.php",
            data: data,
            dataType: "JSON",
            async: true,

            success: function(data) {
                var status = data.status;
                var message = data.message;

                if (status) {
                    if (btn_action == 'Update') {
                        btn_action = 'Insert';
                    }
                    loadUsers();
                } else {

                }
            },
            error: function(data) {

            }



        });

    });



    getLecturer();

    function getLecturer() {
        var data = {
            "action": "read",
            "lecturerID": ''
        }


        $.ajax({
            method: "POST",
            url: "../api/lecturer.php",
            data: data,
            dataType: "JSON",
            async: true,

            success: function(data) {
                var status = data.status;
                var message = data.message;
                var options = '';
                // var cols = '';
                // var rows = '';



                if (status) {
                    options = '<option vlaue="">Select Lecturer</option>';
                    message.forEach(function(item, i) {
                        $("#lecturerID").html("");
                        options += `<option value ="${item['lecID']}"> ${item['lecID']} - ${item['lecName']}  </option>`;

                    });
                    $("#lecturerID").html(options);


                } else {}
            },
            error: function(data) {

            }



        });
    }



})