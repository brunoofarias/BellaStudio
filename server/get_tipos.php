<?php

include ('database.php');
header("Access-Control-Allow-Origin: *");

$query = mysqli_query($link, "select * from tipos_vouchers");
$result = array(); 
while($row = $query->fetch_assoc()){
    $result[] = $row;
}
mysqli_close ($link);
echo(json_encode($result));
