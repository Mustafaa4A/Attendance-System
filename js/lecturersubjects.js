$(document).ready(function() {
    loadLecturer();
    var btn_action = 'Insert';
    var modalPopup = $("#modal");

    $('#table tbody').on('click', 'button.delete', function() {
        var id = $(this).attr("id");

        if (confirm("Are You sure to delete this Lecturer")) {
            deleteLecturer(id);
        }
    })

    $('#table tbody').on('click', 'button.edit', function() {
        var id = $(this).attr("id");
        btn_action = 'Update';
        fetchLecturer(id);
    })


    function deleteLecturer(id) {
        var data = {
            "action": "delete",
            "id": id
        }

        $.ajax({
            method: "POST",
            url: "../api/lecturersubjects.php",
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
            "id": ""
        }


        $.ajax({
            method: "POST",
            url: "../api/lecturersubjects.php",
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
                        rows += `<td><button class= "btn btn-success edit" id="` + item['ID'] + `"><i class = "fa fa-edit"></i></button>
                        <button class= "btn btn-danger delete" id="` + item['ID'] + `"><i class = "fa fa-trash"></i></button></td>
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


    function fetchLecturer(id) {
        var data = {
            "action": "read",
            "id": id
        }



        $.ajax({
            method: "POST",
            url: "../api/lecturersubjects.php",
            data: data,
            dataType: "JSON",
            async: true,

            success: function(data) {
                var status = data.status;
                var message = data.message;
                // var cols = '';
                // var rows = '';

                if (status) {
                    $("#id").val(message[0]['ID']);
                    $("#lecturerID").val(message[0]['lecID']);
                    $("#classID").val(message[0]['classID']);
                    $("#courseID").val(message[0]['courseID']);

                    modalPopup.modal('show');

                } else {}
            },
            error: function(data) {

            }

        });

    }

    $("#form").on('submit', function(e) {
        e.preventDefault();
        var id = $("#id").val();
        var lecturerID = $("#lecturerID").val();
        var classID = $("#classID").val();
        var courseID = $("#courseID").val();

        if (btn_action == 'Insert') {
            var data = {
                "action": 'Insert',
                "id": id,
                "lecturerID": lecturerID,
                "classID": classID,
                "courseID": courseID,
            }
        } else {
            var data = {
                "action": 'update',
                "id": id,
                "lecturerID": lecturerID,
                "classID": classID,
                "courseID": courseID

            }
        }




        $.ajax({
            method: "POST",
            url: "../api/lecturersubjects.php",
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
                    options = '<option vlaue="">Select Class</option>';
                    message.forEach(function(item, i) {
                        $("#classID").html("");
                        options += `<option value ="` + item['classID'] + `">` + item['className'] + `  </option>`;

                    });
                    $("#classID").html(options);


                } else {}
            },
            error: function(data) {

            }



        });

    }

    getLecturer();

    function getLecturer() {
        var data = {
            "action": "read",
            "lecturerID": ''
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
                var options = '';
                // var cols = '';
                // var rows = '';



                if (status) {
                    options = '<option vlaue="">Select Lecturer</option>';
                    message.forEach(function(item, i) {
                        $("#lecturerID").html("");
                        options += `<option value ="` + item['lecID'] + `">` + item['lecName'] + `  </option>`;

                    });
                    $("#lecturerID").html(options);


                } else {}
            },
            error: function(data) {

            }



        });
    }

    getCourse();

    function getCourse(classID) {
        var data = {
            "action": "getCourse"
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
                    options = '<option vlaue="">Select Course</option>';
                    message.forEach(function(item, i) {
                        $("#courseID").html("");
                        options += `<option value ="` + item['courseID'] + `">` + item['courseName'] + `  </option>`;

                    });
                    console.log(options);
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