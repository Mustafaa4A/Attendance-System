$(document).ready(function() {
    loadExamdep();
    var btn_action = 'Insert';
    var modalPopup = $("#modal");

    $('#table tbody').on('click', 'button.delete', function() {
        var examdepID = $(this).attr("examdepID");
        console.log(examdepID);

        if (confirm("Are You sure to delete this Exam Department")) {
            deleteExamdep(examdepID);
        }
    })

    $('#table tbody').on('click', 'button.edit', function() {
        var examdepID = $(this).attr("examdepID");
        btn_action = 'Update';
        fetchExamdep(examdepID);


    })


    function deleteExamdep(examdepID) {
        var data = {
            "action": "delete",
            "examdepID": examdepID
        }


        $.ajax({
            method: "POST",
            url: "../api/examdep.php",
            data: data,
            dataType: "JSON",
            async: true,

            success: function(data) {
                var status = data.status;
                var message = data.message;

                if (status) {
                    message.forEach(function(item, i) {
                        console.log(message);
                        loadExamdep();
                    });
                } else {
                    console.log(message);
                }
            },
            error: function(data) {

            }



        });

    }


    function loadExamdep() {
        var data = {
            "action": "read",
            "examdepID": ""
        }


        $.ajax({
            method: "POST",
            url: "../api/examdep.php",
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
                        rows += `<td><button class= "btn btn-success edit" examdepID="` + item['depID'] + `"><i class = "fa fa-edit"></i></button>
                        <button class= "btn btn-danger delete" examdepID="` + item['depID'] + `"><i class = "fa fa-trash"></i></button></td>
                        `
                        rows += '</tr>';

                    });
                    $("#table thead").html(cols);
                    $("#table tbody").html(rows);
                    $("#table").dataTable();
                } else {}
            },
            error: function(data) {

            }



        });

    }


    function fetchExamdep(examdepID) {
        var data = {
            "action": "read",
            "examdepID": examdepID
        }


        $.ajax({
            method: "POST",
            url: "../api/examdep.php",
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
                        $("#examdepID").val(message[0]['depID']);
                        $("#examdepName").val(message[0]['campus']);
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
        var examdepID = $("#examdepID").val();
        var examdepName = $("#examdepName").val();
        var password = $("#password").val();

        if (btn_action == 'Insert') {
            var data = {
                "action": 'Insert',
                "examdepID": examdepID,
                "examdepName": examdepName,
                "password": password,

            }
        } else {
            var data = {
                "action": 'Update',
                "examdepID": examdepID,
                "examdepName": examdepName,
                "password": password,

            }
        }

        $.ajax({
            method: "POST",
            url: "../api/examdep.php",
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
                    loadExamdep();
                } else {

                }
            },
            error: function(data) {

            }



        });

    });


})