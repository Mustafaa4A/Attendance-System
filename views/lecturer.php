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
                <li class="breadcrumb-item active"><a href="javascript:void(0)">Lecturer Management</a></li>
            </ol>
        </div>
    </div>
    <!-- row -->

    <div class="container-fluid">
        <div class="row">
            <div class="col-12 text-right">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal">Add New Lecturer</button>
            </div>
            <div class="col-12"></div>
            <div class="table-responsive">
                <table id="table" class="table table-striped table-bordered zero-configuration">
                    <thead>
                        <tr>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- #/ container -->
</div>
<!--**********************************
            Content body end
        ***********************************-->
<div class="modal fade" id="modal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Lecturer Registration Form</h5>
                <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <form id="form" action="" method="POST">
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label ">ID</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="lecturerID" name="lecturerID" placeholder="Enter Lecturer ID">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Name</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="lecturerName" name="lecturerName" placeholder="Enter Lecturer Name">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Gender</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="gender" name="gender" placeholder="Enter Student gender">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="email" name="email" placeholder="Enter Lecturer Email">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Tell</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="tell" name="tell" placeholder="Enter Lecturer Tell">
                            </div>
                        </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
                </form>
            </div>
        </div>
    </div>
</div>
</div>

</div>
</div>
</div>
<!-- <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title">Modal title</h5>
                                                    <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="container-fluid">
                                                        <div class="row">
                                                            <div class="col-md-4">.col-md-4</div>
                                                            <div class="col-md-4 ml-auto">.col-md-4 .ml-auto</div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-3 ml-auto">.col-md-3 .ml-auto</div>
                                                            <div class="col-md-2 ml-auto">.col-md-2 .ml-auto</div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-6 ml-auto">.col-md-6 .ml-auto</div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-sm-9">Level 1: .col-sm-9
                                                                <div class="row">
                                                                    <div class="col-8 col-sm-6">Level 2: .col-8 .col-sm-6</div>
                                                                    <div class="col-4 col-sm-6">Level 2: .col-4 .col-sm-6</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    <button type="button" class="btn btn-primary">Save changes</button>
                                                </div>
                                            </div>
                                        </div> -->
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
<script src="../js/lecturer.js"></script>
<script>
    // $("#table").dataTable();
</script>