$(document).ready(function() {
    loadClass();
    var btn_action = 'Insert';
    var modalPopup = $("#modal");

    $("#new").click(function() {
        getSem();
    })


    $('#table tbody').on('click', 'button.delete', function() {
        var classID = $(this).attr("classID");
        console.log(classID);

        if (confirm("Are You sure to delete this Class?")) {
            deleteClass(classID);
        }
    })

    $('#table tbody').on('click', 'button.edit', function() {
        var classID = $(this).attr("classID");
        console.log(classID);
        btn_action = 'Update';
        getSem()
        fetchClass(classID);
    })


    function deleteClass(classID) {
        var data = {
            "action": "delete",
            "classID": classID
        }


        $.ajax({
            method: "POST",
            url: "../api/class.php",
            data: data,
            dataType: "JSON",
            async: true,

            success: function(data) {
                var status = data.status;
                var message = data.message;

                if (status) {
                    message.forEach(function(item, i) {
                        console.log(message);
                        loadClass();
                    });
                } else {
                    console.log(message);
                }
            },
            error: function(data) {

            }



        });

    }


    function loadClass() {
        var data = {
            "action": "read",
            "classID": ""
        }


        $.ajax({
            method: "POST",
            url: "../api/class.php",
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
                        rows += `<td><button class= "btn btn-success edit" classID="` + item['classID'] + `"><i class = "fa fa-edit"></i></button>
                        <button class= "btn btn-danger delete" classID="` + item['classID'] + `"><i class = "fa fa-trash"></i></button></td>
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


    function fetchClass(classID) {
        var data = {
            "action": "read",
            "classID": classID
        }


        $.ajax({
            method: "POST",
            url: "../api/class.php",
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
                        $("#classID").val(message[0]['classID']);
                        $("#className").val(message[0]['className']);
                        $("#semID").val(message[0]['semID']);

                        modalPopup.modal('show');
                    });
                } else {}


            },
            error: function(data) {

            }



        });

    }





    function getSem(classID) {
        var data = {
            "action": "getSem"
        }


        $.ajax({
            method: "POST",
            url: "../api/class.php",
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
                        $("#semID").html("");
                        options += `<option value ="` + item['semID'] + `">` + item['semesName'] + `  </option>`;

                    });
                    $("#SemID").html(options);

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
        var classID = $("#classID").val();
        var className = $("#className").val();
        var SemID = $("#SemID").val();

        if (btn_action == 'Insert') {
            var data = {
                "action": 'Insert',
                "classID": classID,
                "className": className,
                "SemID": SemID,

            }
        } else {
            var data = {
                "action": 'Update',
                "classID": classID,
                "className": className,
                "semID": SemID,

            }
        }

        $.ajax({
            method: "POST",
            url: "../api/class.php",
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
                    loadClass();
                } else {
                    console.log(message);

                }
            },
            error: function(data) {

            }



        });

    });


})