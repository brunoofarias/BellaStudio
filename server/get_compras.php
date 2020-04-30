<?php
header("Access-Control-Allow-Origin: *");
include ('database.php');

$id_busca = $_GET['id_busca_compra'] ?? false;

if($id_busca){
    $busca = mysqli_query($link, "select * from compras_vouchers where voucher_compra_id = '{$id_busca}'");
}else{
    $busca = mysqli_query($link, "select * from compras_vouchers");
}

$result = $busca->fetch_assoc();
mysqli_close ($link);
echo(json_encode($result));