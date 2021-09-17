<?php
$servername = "localhost";
$username = "username";
$password = "password";

// // Create connection
// $conn = new mysqli($servername, $username, $password);
// // Check connection
// if ($conn->connect_error) {
//   die("Connection failed: " . $conn->connect_error);
// }

// // Create database
// $sql = "CREATE DATABASE register";
// if ($conn->query($sql) === TRUE) {
//   echo "Database created successfully";
// } else {
//   echo "Error creating database: " . $conn->error;
// }

// $conn->close();

// database connection code
// $con = mysqli_connect('localhost', 'database_user', 'database_password','database');

// $con = mysqli_connect($servername, $username, $password);

// // get the post records
// $username = $_POST['username'];
// $password = $_POST['password'];

// // database insert SQL code
// $sql = "INSERT INTO `registerTest` (`username`, `password`) 
// VALUES ('0', '$username', '$password')";

// // insert in database 
// $rs = mysqli_query($con, $sql);

// if($rs)
// {
// 	echo "Contact Records Inserted";
// } else {
//     echo "Error creating database: " . $conn->error;
//   }

  $username = $_GET["username"];
  $password = $_GET["password"];

  mysqli_connect("localhost", "root", "");
  mysql_select_db("register");
  mysqli_query("INSERT INTO registerTest VALUES('$username', '$password')");


?>
