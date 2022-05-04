$(document).ready(function() {
    var classID = sessionStorage.getItem('classID');
    var courseID = sessionStorage.getItem('courseID');
    var date = $('#date').val();
    loadStudents(classID, courseID, date);



    $('#form').on('click', '#back', function() {
        window.location = 'dashboard1.php';
        loadAttendance();

    });

    //date on change
    $('#date').change(function(e) {
        e.preventDefault();
        date = $('#date').val();
        $("input[name='check_all']").prop("checked", false);
        loadStudents(classID, courseID, date);
    });



    $("input[name='check_all']").on('change', function() {
        if ($(this).is(":checked")) {
            $("#form input[type='checkbox']").prop("checked", true);

        } else {
            $("#form input[type='checkbox']").prop("checked", false);
        }
    });


    // $('#table tbody').on('click','button.delete',function(){
    //     var adminID = $(this).attr("adminID");
    //     console.log(adminID);

    //     if (confirm("Are You sure to delete this Admin")){
    //         deleteAdmin(adminID);
    //     }
    // })
    // fetchAttendance();
    // $('#table tbody').on('click','button.edit',function(){
    //     var adminID = $(this).attr("adminID");
    //     btn_action = 'Update';
    //     fetchAttendance();
    // })

    function loadStudents(classID, courseID, date) {
        var data = {
            "action": "read",
            "classId": classID,
            "courseID": courseID,
            "date": date
        }


        $.ajax({
            method: "POST",
            url: "../api/takeattendance.php",
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
                        cols += `<th>status</td>`
                        cols += '</tr>';
                        rows += '<tr>';
                        for (index in item) {
                            rows += '<td>' + item[index] + '</td>';
                        }
                        rows += `<td><input type="checkbox" id="${item['stdID']}" name="status[]" student_id='${item['stdID']}'>
                        `;

                        rows += '</tr>';

                    });

                    $("#table thead").html(cols);
                    $("#table tbody").html(rows);
                } else {
                    console.log(message);
                }
            },
            error: function(data) {

            }



        });

    }

    function loadAttendance(classID) {
        var data = {
            "action": "read",
            "classId": classID,
        }

        $.ajax({
            method: "POST",
            url: "../api/takeattendance.php",
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
                        cols += '<th> Status </th>';
                        cols += '</tr>';
                        rows += '<tr>';
                        for (index in item) {
                            rows += '<td>' + item[index] + '</td>';
                        }
                        rows += `<td><input type="checkbox" id="${item['stdID']}" name="status[]" student_id='${item['stdID']}'>
                        `
                        rows += '</tr>';

                    });
                    $("#table thead").html(cols);
                    $("#table tbody").html(rows);
                } else {
                    console.log(message);
                }
            },
            error: function(data) {

            }



        });

    }


    function fetchAttendance() {
        var data = {
            "action": "read",
            "adminID": ""
        }


        $.ajax({
            method: "POST",
            url: "../api/takeattendance.php",
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
                        var stdID = '';
                        var date = $("#date").value;
                        var classe = '';
                        var course = 'yyy';
                        var status = ''
                        var hash = '';
                        stdID = message[i]['stdID'];
                        classe = message[i]['classID'];
                        status = message[i]['Status[i]'];

                        // if(message[i]['#'].checked){
                        //     status = present;
                        // }
                        // else{
                        //     status = absent;
                        // }
                        console.log(stdID);
                        console.log(classe);
                        console.log(course);
                        console.log(status);
                        console.log(date);
                    });
                } else {
                    console.log(message);
                }
            },
            error: function(data) {

            }



        });

    }


    function getClass(classID) {
        var data = {
            "action": "getClass"
        }


        $.ajax({
            method: "POST",
            url: "../api/takeattendance.php",
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
                        // for(index in item){
                        options += `<option value ="` + item['classID'] + `">` + item['classID'] + `  </option>`;
                        // }

                    });
                    // console.log(options);
                    $("#class").html(options);

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

        let course_id = $('#course').val();
        let date = $('#date').val();
        var clas = classID;
        let cours = courseID;
        studentsId = [];
        var student_id = [];
        var student_status = [];

        $('input[name="status[]"]').each(function() {
            if ($(this).is(':checked')) {
                student_id.push($(this).attr('student_id'));
                student_status.push('Present');

                // studentsId.push({
                //     student_id: $(this).attr('student_id'),
                //     status: "Present"
                // });
            } else {
                // studentsId.push({
                //     student_id: $(this).attr('student_id'),
                //     status: "Absent"
                // });
                student_id.push($(this).attr('student_id'));
                student_status.push('Absent');

            }
        });


        let data = {
                'action': 'Insert',
                // 'students_data': studentsId,
                'student_id': student_id,
                'student_status': student_status,
                'course_id': cours,
                'date': date,
                'class_id': clas,

            }
            // data['students_data'].forEach(item => {
            //     console.log(item['student_id'] + ' ' + item['status'])
            // })




        $.ajax({
            method: "POST",
            url: "../api/takeattendance.php",
            data: data,
            dataType: "JSON",
            async: true,

            success: function(data) {
                var status = data.status;
                var message = data.message;

                if (status) {
                    $(".alert").removeClass("alert-danger");
                    $(".alert").addClass("alert-success");
                    $(".alert .message").html(message);
                    $(".alert").show();
                } else {
                    $(".alert").removeClass("alert-success");
                    $(".alert").addClass("alert-danger");
                    $(".alert .message").html(message);
                    $(".alert").show();
                }

                setTimeout(() => {
                    $(".alert").hide();
                }, 3000);
            },
            error: function(data) {

            }



        });

    });


})