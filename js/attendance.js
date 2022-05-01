$(document).ready(function() {
    loadAttendance();
    var btn_action = 'Insert';
    var modalPopup = $("#modal");

    // $('#table tbody').on('click','button.delete',function(){
    //     var attendancID = $(this).attr("attendanceID");
    //     console.log(attendanceID);

    //     if (confirm("Are You sure to delete this Attenda")){
    //         deleteAdmin(adminID);
    //     }
    // })

    $('#table tbody').on('click', 'button.edit', function() {
        var attendanceID = $(this).attr("attendanceID");
        btn_action = 'Update';
        fetchAttendance(attendanceID);
    })


    // function deleteAdmin(adminID){
    //     var data = {
    //         "action" : "delete",
    //         "adminID" : adminID
    //     }


    //     $.ajax({
    //         method:"POST",
    //         url:"../api/admin.php",
    //         data: data,
    //         dataType: "JSON",
    //         async: true,

    //         success : function(data){
    //             var status = data.status;
    //             var message = data.message;

    //             if(status){
    //                 message.forEach(function(item, i) {
    //                        console.log(message);
    //                        loadAdmin();
    //                     });
    //             }else{
    //                 console.log(message);
    //             }
    //         },
    //         error: function(data){

    //         }



    //     });

    // }


    function loadAttendance() {
        var data = {
            "action": "read",
            "attendanceID": ""
        }


        $.ajax({
            method: "POST",
            url: "../api/attendance.php",
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
                        rows += `<td><button class= "btn btn-success edit" attendanceID="` + item['Attendance ID'] + `"><i class = "fa fa-edit"></i></button>
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


    function fetchAttendance(attendanceID) {
        var data = {
            "action": "read",
            "attendanceID": attendanceID
        }


        $.ajax({
            method: "POST",
            url: "../api/attendance.php",
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
                        $("#attendanceID").val(message[0]['Attendance ID']);
                        $("#stdID").val(message[0]['Student ID']);
                        $("#classID").val(message[0]['Class ID']);
                        $("#courseID").val(message[0]['CourseID']);
                        $("#status").val(message[0]['Status']);
                        $("#date").val(message[0]['Date']);

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
        var attendanceID = $("#attendanceID").val();
        var stdID = $("#stdID").val();
        var classID = $("#classID").val();
        var courseID = $("#courseID").val();
        var status = $("#status").val();
        var Date = $("#date").val();

        if (btn_action == 'Insert') {
            var data = {
                "action": 'Insert',
                "attendanceID": attendanceID,
                "stdID": stdID,
                "classID": classID,
                "courseID": courseID,
                "status": status,
                "date": Date,

            }
        } else {
            var data = {
                "action": 'Update',
                "attendanceID": attendanceID,
                "stdID": stdID,
                "classID": classID,
                "courseID": courseID,
                "status": status,
                "date": Date,

            }
        }
        console.log(data);




        $.ajax({
            method: "POST",
            url: "../api/attendance.php",
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
                } else {
                    console.log(message);
                    loadAttendance();
                }
            },
            error: function(data) {

            }



        });

    });


})