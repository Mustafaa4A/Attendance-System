$(document).ready(function() {
    loadCourse();
    var btn_action = 'Insert';
    var modalPopup = $("#modal");

    $("#new").click(function() {
        getSem();
        getFaculty();
    })


    $('#table tbody').on('click', 'button.delete', function() {
        var courseID = $(this).attr("courseID");
        console.log(courseID);

        if (confirm("Are You sure to delete this Course?")) {
            deleteCourse(courseID);
        }
    })

    $('#table tbody').on('click', 'button.edit', function() {
        var courseID = $(this).attr("courseID");
        btn_action = 'Update';
        getSem();
        getFaculty();
        fetchCourse(courseID);
    })


    function deleteCourse(courseID) {
        var data = {
            "action": "delete",
            "courseID": courseID
        }


        $.ajax({
            method: "POST",
            url: "../api/course.php",
            data: data,
            dataType: "JSON",
            async: true,

            success: function(data) {
                var status = data.status;
                var message = data.message;

                if (status) {
                    message.forEach(function(item, i) {
                        console.log(message);
                        loadCourse();
                    });
                } else {
                    console.log(message);
                }
            },
            error: function(data) {

            }



        });

    }


    function loadCourse() {
        var data = {
            "action": "read",
            "courseID": ""
        };

        $.ajax({
            method: "POST",
            url: "../api/course.php",
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
                        rows += `<td><button class= "btn btn-success edit" courseID="` + item['courseID'] + `"><i class = "fa fa-edit"></i></button>
                        <button class= "btn btn-danger delete" courseID="` + item['courseID'] + `"><i class = "fa fa-trash"></i></button></td>
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


    function fetchCourse(courseID) {
        var data = {
            "action": "read",
            "courseID": courseID
        }


        $.ajax({
            method: "POST",
            url: "../api/course.php",
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
                        $("#courseID").val(message[0]['courseID']);
                        $("#courseName").val(message[0]['courseName']);
                        $("#semID").val(message[0]['semID']);
                        $("#facultyID").val(message[0]['facID']);

                        modalPopup.modal('show');


                    });
                } else {}
            },
            error: function(data) {

            }



        });

    }



    function getSem() {
        var data = {
            "action": "getSem"
        }


        $.ajax({
            method: "POST",
            url: "../api/course.php",
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
                        options += `<option value ="` + item['semID'] + `">` + item['semID'] + `  </option>`;
                    });
                    $("#SemID").html(options);

                } else {}
            },
            error: function(data) {

            }



        });

    }



    function getFaculty(courseID) {
        var data = {
            "action": "getFaculty"
        }


        $.ajax({
            method: "POST",
            url: "../api/course.php",
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
                        $("#facultyID").html("");
                        options += `<option value ="` + item['ID'] + `">` + item['facultyName'] + `  </option>`;
                    });

                    $("#facultyID").html(options);

                } else {}
            },
            error: function(data) {

            }



        });

    }



    $("#form").on('submit', function(e) {
        e.preventDefault();
        var courseID = $("#courseID").val();
        var courseName = $("#courseName").val();
        var SemID = $("#SemID").val();
        var facultyID = $("#facultyID").val();

        if (btn_action == 'Insert') {
            var data = {
                "action": 'Insert',
                "courseID": courseID,
                "courseName": courseName,
                "SemID": SemID,
                "facultyID": facultyID,

            }
        } else {
            var data = {
                "action": 'Update',
                "courseID": courseID,
                "courseName": courseName,
                "SemID": SemID,
                "facultyID": facultyID,

            }
        }

        $.ajax({
            method: "POST",
            url: "../api/course.php",
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
                    loadCourse();
                } else {

                }
            },
            error: function(data) {

            }



        });

    });


})