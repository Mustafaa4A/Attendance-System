$(document).ready(function() {

    $('#classID').change(function(e) {
        let classID = $('#classID').val();
        $('#table tbody').html('');
        loadReport(classID);
        getTotalPeriods(classID);
    });



    function loadReport(classID) {
        var data = {
            "action": "read",
            "classId": classID
        }


        $.ajax({
            method: "POST",
            url: "../api/class_report.php",
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
                        cols += '</tr>';
                        rows += '<tr>';
                        for (index in item) {
                            rows += '<td>' + item[index] + '</td>';
                        }
                        rows += '</tr>';

                    });

                    $("#table thead").html(cols);
                    $("#table tbody").html(rows);
                } else {
                    $("#table tbody").html('<h1 class="text-danger">No Data was found</h1>');
                }
            },
            error: function(data) {

            }



        });

    }



    getClass();

    function getClass(classID) {
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
                    options = '<option value="">Select a class</option>';
                    message.forEach(function(item, i) {
                        $("#classID").html("");
                        // for(index in item){
                        options += `<option value ="` + item['classID'] + `">` + item['classID'] + `  </option>`;
                        // }

                    });
                    // console.log(options);
                    $("#classID").html(options);

                } else {
                    console.log(message);
                }
            },
            error: function(data) {

            }



        });

    }

    function getTotalPeriods(classID) {
        $('.total').html('');
        var data = {
            "action": "getTotalPeriods",
            "classId": classID
        }



        $.ajax({
            method: "POST",
            url: "../api/class_report.php",
            data: data,
            dataType: "JSON",
            async: true,

            success: function(data) {
                var status = data.status;
                var message = data.message;

                if (status) {
                    $('.total').html(message['Total']);
                } else {}
            },
            error: function(data) {

            }



        });

    }






})