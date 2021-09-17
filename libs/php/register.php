

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

  <?php

  $username = $_POST_POST["username"];
  $password = $_POST_POST["password"];

  mysqli_connect("localhost", "root", "");
  mysql_select_db("register");
  mysqli_query("INSERT INTO registerTest VALUES('$username', '$password')");

  ?>
    
</body>
</html>