$(document).ready(function() {
    loadFacult();
    var btn_action = 'Insert';
    var modalPopup = $("#modal");

    $('#table tbody').on('click', 'button.delete', function() {
        var facultID = $(this).attr("facultID");
        console.log(facultID);

        if (confirm("Are You sure to delete this Faculy")) {
            deleteFacult(facultID);
        }
    })

    $('#table tbody').on('click', 'button.edit', function() {
        var facultID = $(this).attr("facultID");
        btn_action = 'Update';
        fetchFacult(facultID);
    })


    function deleteFacult(facultID) {
        var data = {
            "action": "delete",
            "facultID": facultID
        }


        $.ajax({
            method: "POST",
            url: "../api/faculty.php",
            data: data,
            dataType: "JSON",
            async: true,

            success: function(data) {
                var status = data.status;
                var message = data.message;

                if (status) {
                    message.forEach(function(item, i) {
                        console.log(message);
                        loadFacult();
                    });
                } else {
                    console.log(message);
                }
            },
            error: function(data) {

            }



        });

    }


    function loadFacult() {
        var data = {
            "action": "read",
            "facultID": ""
        }


        $.ajax({
            method: "POST",
            url: "../api/faculty.php",
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
                        rows += `<td><button class= "btn btn-success edit" facultID="` + item['Faculty ID'] + `"><i class = "fa fa-edit"></i></button>
                        <button class= "btn btn-danger delete" facultID="` + item['Faculty ID'] + `"><i class = "fa fa-trash"></i></button></td>
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


    function fetchFacult(facultID) {
        var data = {
            "action": "read",
            "facultID": facultID
        }


        $.ajax({
            method: "POST",
            url: "../api/faculty.php",
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
                        $("#facultID").val(message[0]['Faculty ID']);
                        $("#facultName").val(message[0]['Faculty Name']);

                        modalPopup.modal('show');
                    });
                } else {
                    console.log(message);
                }
            },
            error: function(data) {}



        });

    }

    $("#form").on('submit', function(e) {
        e.preventDefault();
        var facultID = $("#facultID").val();
        var facultName = $("#facultName").val();

        if (btn_action == 'Insert') {
            var data = {
                "action": 'Insert',
                "facultID": facultID,
                "facultName": facultName,

            }
        } else {
            var data = {
                "action": 'Update',
                "facultID": facultID,
                "facultName": facultName,

            }
        }

        $.ajax({
            method: "POST",
            url: "../api/faculty.php",
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
                    loadFacult();
                } else {}
            },
            error: function(data) {

            }



        });

    });


})