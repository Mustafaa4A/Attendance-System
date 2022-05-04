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
        <div class="alert ">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
            </button>
            <div class="message"></div>
        </div>
        <div class="row">
            <div class="col-8"></div>
            <div class="col-4">
                <select type="text" class="form-control " id="classID" name="classID" required>
                </select>
            </div>
        </div>
        <div class="row">

            <div class="table-responsive">
                <table id="table" class="table table-striped table-bordered zero-configuration">
                    <h1 class="text-muted">Total Period: <span class="total"></span></h1>
                    <thead>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
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
<script src="../js/class_report.js"></script>
<script>
    $('.alert').hide();
</script>