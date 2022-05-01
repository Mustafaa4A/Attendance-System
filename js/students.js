$(document).ready(function() {
    loadStudent();
    var btn_action = 'Insert';
    var modalPopup = $("#modal");

    $('#table tbody').on('click', 'button.delete', function() {
        var studentID = $(this).attr("studentID");

        if (confirm("Are You sure to delete this Student")) {
            deleteStudent(studentID);
        }
    })

    $('#table tbody').on('click', 'button.edit', function() {
        var studentID = $(this).attr("studentID");
        btn_action = 'Update';
        getClass();
        fetchStudent(studentID);
    })


    function deleteStudent(studentID) {
        var data = {
            "action": "delete",
            "studentID": studentID
        }


        $.ajax({
            method: "POST",
            url: "../api/students.php",
            data: data,
            dataType: "JSON",
            async: true,

            success: function(data) {
                var status = data.status;
                var message = data.message;

                if (status) {
                    loadStudent();
                } else {}
            },
            error: function(data) {

            }



        });

    }


    function loadStudent() {
        var data = {
            "action": "read",
            "studentID": ""
        }


        $.ajax({
            method: "POST",
            url: "../api/students.php",
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
                        rows += `<td><button class= "btn btn-success edit" studentID="` + item['stdID'] + `"><i class = "fa fa-edit"></i></button>
                        <button class= "btn btn-danger delete" studentID="` + item['stdID'] + `"><i class = "fa fa-trash"></i></button></td>
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


    function fetchStudent(studentID) {
        var data = {
            "action": "read",
            "studentID": studentID
        }



        $.ajax({
            method: "POST",
            url: "../api/students.php",
            data: data,
            dataType: "JSON",
            async: true,

            success: function(data) {
                var status = data.status;
                var message = data.message;
                // var cols = '';
                // var rows = '';

                if (status) {
                    $("#studentID").val(message[0]['stdID']);
                    $("#studentName").val(message[0]['stdName']);
                    $("#gender").val(message[0]['gender']);
                    $("#email").val(message[0]['email']);
                    $("#tell").val(message[0]['telephone']);
                    $("#class").val(message[0]['classID']);
                    $("#password").val(message[0]['password']);

                    modalPopup.modal('show');

                } else {}
            },
            error: function(data) {

            }

        });

    }

    $("#form").on('submit', function(e) {
        e.preventDefault();
        var studentID = $("#studentID").val();
        var studentName = $("#studentName").val();
        var gender = $("#gender").val();
        var email = $("#email").val();
        var tell = $("#tell").val();
        var classID = $("#class").val();

        if (btn_action == 'Insert') {
            var data = {
                "action": 'Insert',
                "studentID": studentID,
                "studentName": studentName,
                "gender": gender,
                "email": email,
                "tell": tell,
                "classID": classID,

            }
        } else {
            var data = {
                "action": 'Update',
                "studentID": studentID,
                "studentName": studentName,
                "gender": gender,
                "email": email,
                "tell": tell,
                "classID": classID,

            }
        }

        $.ajax({
            method: "POST",
            url: "../api/students.php",
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
                    loadStudent();
                } else {

                }
            },
            error: function(data) {

            }



        });

    });



    getClass();

    function getClass() {
        var data = {
            "action": "getClass"
        }


        $.ajax({
            method: "POST",
            url: "../api/students.php",
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
                    options = '';
                    message.forEach(function(item, i) {
                        $("#class").html("");
                        options += `<option value ="` + item['classID'] + `">` + item['className'] + `  </option>`;

                    });
                    $("#class").html(options);


                } else {}
            },
            error: function(data) {

            }



        });

    }


})