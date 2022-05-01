$(document).ready(function() {
    read();

    function read() {
        var data = {
            "action": "read",
            "LecturerID": ''
        }

        $.ajax({
            type: "POST",
            url: "../api/dashboard1.php",
            data: data,
            dataType: "JSON",
            success: function(data) {

                var status = data.status;
                var message = data.message;
                let dash = '';

                if (status) {
                    message.forEach(function(item, i) {
                        dash += `
                        <button class="btn col-lg-3 col-sm-6" classID='${message[i]['classID']}' courseID='${message[i]['courseID']}'>
                            <div class="card gradient-1">
                                 <div class="card-body text-center">
                                    <h3 class="card-title text-white">${message[i]['className']}</h3>
                                    <div>
                                     <h6 class="card-subtitle text-white">${message[i]['courseName']}</h6>
                                    </div>
                                </div>
                            </div>
                        </button>
                        `;
                    });

                    $('#dash').html(dash);
                } else {
                    $('#dash').html('<h3 class="text-center m-5">No Courses had been registered yet.</h3>');
                }
            }
        });

    }


    //click button
    $('#dash').on('click', '.btn', function() {
        sessionStorage.clear();

        sessionStorage.setItem("classID", $(this).attr('classID'));
        sessionStorage.setItem("courseID", $(this).attr('courseID'));

        window.location = 'takeattendance.php';

    })
});