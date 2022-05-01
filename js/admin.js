$(document).ready(function() {
    loadAdmin();
    var btn_action = 'Insert';
    var modalPopup = $("#modal");

    $('#table tbody').on('click', 'button.delete', function() {
        var adminID = $(this).attr("adminID");
        console.log(adminID);

        if (confirm("Are You sure to delete this Admin")) {
            deleteAdmin(adminID);
        }
    })

    $('#table tbody').on('click', 'button.edit', function() {
        var adminID = $(this).attr("adminID");
        btn_action = 'Update';
        fetchAdmin(adminID);
    })


    function deleteAdmin(adminID) {
        var data = {
            "action": "delete",
            "adminID": adminID
        }


        $.ajax({
            method: "POST",
            url: "../api/admin.php",
            data: data,
            dataType: "JSON",
            async: true,

            success: function(data) {
                var status = data.status;
                var message = data.message;

                if (status) {
                    message.forEach(function(item, i) {
                        console.log(message);
                        loadAdmin();
                    });
                } else {
                    console.log(message);
                }
            },
            error: function(data) {

            }



        });

    }


    function loadAdmin() {
        var data = {
            "action": "read",
            "adminID": ""
        }


        $.ajax({
            method: "POST",
            url: "../api/admin.php",
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
                        rows += `<td><button class= "btn btn-success edit" adminID="` + item['adminID'] + `"><i class = "fa fa-edit"></i></button>
                        <button class= "btn btn-danger delete" adminID="` + item['adminID'] + `"><i class = "fa fa-trash"></i></button></td>
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


    function fetchAdmin(adminID) {
        var data = {
            "action": "read",
            "adminID": adminID
        }


        $.ajax({
            method: "POST",
            url: "../api/admin.php",
            data: data,
            dataType: "JSON",
            async: true,

            success: function(data) {
                var status = data.status;
                var message = data.message;
                // var cols = '';
                // var rows = '';


                if (status) {
                    message.forEach(function(item, i) {
                        $("#adminID").val(message[0]['adminID']);
                        $("#adminName").val(message[0]['adminName']);
                        $("#password").val(message[0]['password']);
                        modalPopup.modal('show');
                    });
                } else {
                    console.log(message);
                }
            },
            error: function(data) {

            }



        });

    }

    $("#form").on('submit', function(e) {
        e.preventDefault();
        var adminID = $("#adminID").val();
        var adminName = $("#adminName").val();
        var password = $("#password").val();

        if (btn_action == 'Insert') {
            var data = {
                "action": 'Insert',
                "adminID": adminID,
                "adminName": adminName,
                "password": password,

            }
        } else {
            var data = {
                "action": 'Update',
                "adminID": adminID,
                "adminName": adminName,
                "password": password,

            }
        }
        console.log(data);




        $.ajax({
            method: "POST",
            url: "../api/admin.php",
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
                    loadAdmin();
                } else {
                    console.log(message);

                }
            },
            error: function(data) {

            }



        });

    });


})