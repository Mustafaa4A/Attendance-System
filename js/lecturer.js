$(document).ready(function() {
    loadLecturer();
    var btn_action = 'Insert';
    var modalPopup = $("#modal");

    $('#table tbody').on('click', 'button.delete', function() {
        var lecturerID = $(this).attr("lecturerID");

        if (confirm("Are You sure to delete this Lecturer")) {
            deleteLecturer(lecturerID);
        }
    })

    $('#table tbody').on('click', 'button.edit', function() {
        var lecturerID = $(this).attr("lecturerID");
        btn_action = 'Update';
        fetchLecturer(lecturerID);
    })


    function deleteLecturer(lecturerID) {
        var data = {
            "action": "delete",
            "lecturerID": lecturerID
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

                if (status) {
                    loadLecturer();
                } else {}
            },
            error: function(data) {

            }



        });

    }


    function loadLecturer() {
        var data = {
            "action": "read",
            "lecturerID": ""
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
                        rows += `<td><button class= "btn btn-success edit" lecturerID="` + item['lecID'] + `"><i class = "fa fa-edit"></i></button>
                        <button class= "btn btn-danger delete" lecturerID="` + item['lecID'] + `"><i class = "fa fa-trash"></i></button></td>
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


    function fetchLecturer(lecturerID) {
        var data = {
            "action": "read",
            "lecturerID": lecturerID
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
                // var cols = '';
                // var rows = '';

                if (status) {
                    $("#lecturerID").val(message[0]['lecID']);
                    $("#lecturerID").val(message[0]['lecName']);
                    $("#gender").val(message[0]['gender']);
                    $("#email").val(message[0]['email']);
                    $("#tell").val(message[0]['telephone']);
                    modalPopup.modal('show');

                } else {}
            },
            error: function(data) {

            }

        });

    }

    $("#form").on('submit', function(e) {
        e.preventDefault();
        var lecturerID = $("#lecturerID").val();
        var lecturerName = $("#lecturerName").val();
        var gender = $("#gender").val();
        var email = $("#email").val();
        var tell = $("#tell").val();
        var classID = $("#class").val();

        if (btn_action == 'Insert') {
            var data = {
                "action": 'Insert',
                "lecturerID": lecturerID,
                "lecturerName": lecturerName,
                "gender": gender,
                "email": email,
                "tell": tell,
                "classID": classID
            }
        } else {
            var data = {
                "action": 'Update',
                "lecturerID": lecturerID,
                "lecturerName": lecturerName,
                "gender": gender,
                "email": email,
                "tell": tell,
                "classID": classID,

            }
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

                if (status) {
                    if (btn_action == 'Update') {
                        btn_action = 'Insert';
                    }
                    loadLecturer();
                } else {

                }
            },
            error: function(data) {

            }



        });

    });





})