$(document).ready(function() {

    $('#studentID').change(function(e) {
        let studentID = $('#studentID').val();
        getCourse(studentID);
        loadReport(studentID, 'All');
    });

    $('#courseID').change(function(e) {
        let courseID = $('#courseID').val();
        let studentID = $('#studentID').val();
        loadReport(studentID, courseID);
    });


    function loadReport(studentID, courseID) {
        var data = {
            "action": "read",
            "studentID": studentID,
            "courseID": courseID,
        }

        $.ajax({
            method: "POST",
            url: "../api/student_report.php",
            data: data,
            dataType: "JSON",

            success: function(data) {
                var status = data.status;
                var message = data.message[0];

                if (status) {
                    $('#stdID').html(message['stdID']);
                    $('#stdName').html(message['stdName']);
                    $('#class').html(message['className']);
                    $('#total').html(message['Total']);
                    $('#present').html(message['Present']);
                    $('#absent').html(message['Absent']);

                    const { Total: total, Present: present, Absent: apsent } = message;
                    let rate = Math.round((present / total) * 100);
                    $('#rate').html(rate + '%');

                } else {}
            },
            error: function(data) {

            }



        });

    }


    getStudent();

    function getStudent() {
        var data = {
            "action": "getStudent",
        }

        $.ajax({
            method: "POST",
            url: "../api/student_report.php",
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
                    options = '<option value="" >Select student</option>';
                    message.forEach(function(item, i) {
                        $("#studentID").html("");
                        options += `<option value ="` + item['stdID'] + `">` + item['stdID'] + " - " + item['stdName'] + `  </option>`;
                        // }

                    });
                    $("#studentID").html(options);

                } else {}
            },
            error: function(data) {

            }



        });

    }

    function getCourse(studentID) {
        var data = {
            "action": "getCourse",
            "studentID": studentID
        }



        $.ajax({
            method: "POST",
            url: "../api/student_report.php",
            data: data,
            dataType: "JSON",
            async: true,

            success: function(data) {
                var status = data.status;
                var message = data.message;
                var options = '';
                $("#courseID").html('');

                if (status) {

                    options = '<option value="All">All</option>';
                    message.forEach(function(item, i) {
                        options += `<option value ="` + item['courseID'] + `">` + item['courseName'] + `  </option>`;

                    });

                    $("#courseID").html(options);

                } else {
                    console.log(message);
                }
            },
            error: function(data) {

            }



        });

    }






})