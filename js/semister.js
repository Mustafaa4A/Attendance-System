$(document).ready(function() {
    loadSemister();
    var btn_action = 'Insert';
    var modalPopup = $("#modal");

    $('#table tbody').on('click', 'button.delete', function() {
        var semID = $(this).attr("semisterID");
        console.log(semID);

        if (confirm("Are You sure to delete this Semister")) {
            deleteSemister(semID);
        }
    })

    $('#table tbody').on('click', 'button.edit', function() {
        var semisterID = $(this).attr("semisterID");
        btn_action = 'Update';
        fetchSemister(semisterID);
    })


    function deleteSemister(semID) {
        var data = {
            "action": "delete",
            "semID": semID
        }


        $.ajax({
            method: "POST",
            url: "../api/semister.php",
            data: data,
            dataType: "JSON",
            async: true,

            success: function(data) {
                var status = data.status;
                var message = data.message;

                if (status) {
                    message.forEach(function(item, i) {
                        console.log(message);
                        loadSemister();
                    });
                } else {
                    console.log(message);
                }
            },
            error: function(data) {

            }
        });

    }


    function loadSemister() {
        var data = {
            "action": "read",
            "semisterID": ""
        }


        $.ajax({
            method: "POST",
            url: "../api/semister.php",
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
                        rows += `<td><button class= "btn btn-success edit" semisterID="` + item['semID'] + `"><i class = "fa fa-edit"></i></button>
                        <button class= "btn btn-danger delete" semisterID="` + item['semID'] + `"><i class = "fa fa-trash"></i></button></td>
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


    function fetchSemister(semisterID) {
        var data = {
            "action": "read",
            "semisterID": semisterID
        }


        $.ajax({
            method: "POST",
            url: "../api/semister.php",
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
                        $("#semisterID").val(message[0]['semID']);
                        $("#semisterName").val(message[0]['semesName']);

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



        var semisterID = $("#semisterID").val();
        var semisterName = $("#semisterName").val();


        if (btn_action == 'Insert') {
            var data = {
                "action": 'insert',
                "semisterID": semisterID,
                "semisterName": semisterName,
            }
        } else {
            var data = {
                "action": 'update',
                "semisterID": semisterID,
                "semisterName": semisterName,
            }
        }



        $.ajax({
            method: "POST",
            url: "../api/semister.php",
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
                    loadSemister();
                } else {
                    console.log(message);

                }
            },
            error: function(data) {

            }



        });

    });


})