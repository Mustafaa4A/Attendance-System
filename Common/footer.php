 <!--**********************************
            Footer start
        ***********************************-->
 <div class="footer">
     <div class="copyright">
         <p>Copyright &copy; Designed & Developed by <a href="#">Abdirizak</a> 2022</p>
     </div>
 </div>
 <!--**********************************
            Footer end
        ***********************************-->
 </div>
 <!--**********************************
        Main wrapper end
    ***********************************-->

 <!--**********************************
        Scripts
    ***********************************-->
 <script src="../assets/plugins/common/common.min.js"></script>
 <script src="../assets/js/custom.min.js"></script>
 <script src="../assets/js/settings.js"></script>
 <script src="../assets/js/gleek.js"></script>
 <script src="../assets/js/styleSwitcher.js"></script>

 <script>
     let menu = `
                    <li>
                        <a class="has-arrow" href="students.php" aria-expanded="false">
                            <i class="icon-speedometer menu-icon"></i> <span class="nav-text">Students</span>
                        </a>
                    </li>
                    <li>
                        <a class="has-arrow" href="lecturer.php" aria-expanded="false">
                            <i class="icon-speedometer menu-icon"></i> <span class="nav-text">Lecturer</span>
                        </a>
                    </li>
                    <li>
                        <a class="has-arrow" href="class.php" aria-expanded="false">
                            <i class="icon-speedometer menu-icon"></i> <span class="nav-text">Classes</span>
                        </a>
                    </li>
                    <li>
                        <a class="has-arrow" href="course.php" aria-expanded="false">
                            <i class="icon-speedometer menu-icon"></i> <span class="nav-text">Course</span>
                        </a>
                    </li>
                    <li>
                        <a class="has-arrow" href="users.php" aria-expanded="false">
                            <i class="icon-speedometer menu-icon"></i> <span class="nav-text">Users</span>
                        </a>
                    </li>
                    <li>
                        <a class="has-arrow" href="javascript:void()" aria-expanded="false">
                            <i class="icon-speedometer menu-icon"></i> <span class="nav-text">Report</span>
                        </a>
                        <ul aria-expanded="false">
                            <li><a href="">Home 1</a></li>
                        </ul>
                    </li>
     `;
     if (sessionStorage.getItem('username') == 'admin') {
         $('#menu').append(menu);
     }
 </script>

 </body>


 <!-- Mirrored from demo.themefisher.com/quixlab/layout-blank.html by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 21 Apr 2022 11:27:26 GMT -->

 </html>