<?php
require('../Common/head.php');
require('../Common/hearder.php');
require('../Common/sidebar.php');
?>
<link href="../assets/plugins/tables/css/datatable/dataTables.bootstrap4.min.css" rel="stylesheet">
<link href="../assets/plugins/toastr/css/toastr.min.css" rel="stylesheet">
<!--**********************************
            Content body start
        ***********************************-->
<div class="content-body">

    <div class="row page-titles mx-0">
        <div class="col p-md-0">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="javascript:void(0)">Dashboard</a></li>
                <li class="breadcrumb-item active"><a href="javascript:void(0)">Class Report</a></li>
            </ol>
        </div>
    </div>
    <!-- row -->

    <div class="container-fluid">
        <div class="row">
            <div class="col-8"></div>
            <div class="col-4">
                <select type="text" class="form-control " id="studentID" name="studentID" required>
                </select>
            </div>
        </div>
        <div class="row mt-5 p-2" id="body">
            <div class="col-1"></div>
            <div class="col-10">
                <div class="card">
                    <div class="card-header ">
                        <div class="row">
                            <div class="col-6">
                                <h3 class="text-muted">Student ID: <span id="stdID"></span></h3>
                            </div>
                            <div class="col-6">
                                <h3 class="text-muted">Student Name: <span id="stdName"></span></h3>
                            </div>
                            <div class="col-6">
                                <h4 class="text-muted">Select Course</h4>
                                <select type="text" class="form-control d-inline" id="courseID" name="courseID" required>
                                </select>
                            </div>
                            <div class="col-6">
                                <h4 class="text-muted">Class: <span id="class"></span></h4>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="col-2"></div>
                        <div class="col-8">
                            <table class="table table-sm">
                                <tr>
                                    <td>Total Periods</td>
                                    <td id="total"></td>
                                </tr>
                                <tr>
                                    <td>Present Periods</td>
                                    <td id="present"></td>
                                </tr>
                                <tr>
                                    <td>Absent Periods</td>
                                    <td id="absent"></td>
                                </tr>
                                <tr>
                                    <td>Attendance Rate</td>
                                    <td id="rate"></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<?php
require('../Common/footer.php');
?>
<script src="../assets/plugins/tables/js/jquery.dataTables.min.js"></script>
<script src="../assets/plugins/tables/js/datatable/dataTables.bootstrap4.min.js"></script>

<script src="../assets/plugins/toastr/js/toastr.min.js"></script>
<script src="../assets/plugins/toastr/js/toastr.init.js"></script>
<script src="../js/student_report.js"></script>
<script>
    $('.alert').hide();
</script>