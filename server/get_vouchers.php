<?php

include ('database.php');
header("Access-Control-Allow-Origin: *");

$query = mysqli_query($link, "SELECT * FROM `vouchers` order by voucher_nome asc");
$result = array();

while($row = $query->fetch_assoc()) {
    $result[] = array(
        "voucher_id" => $row['voucher_id'],
        "tipo_voucher_id_fk" => $row['tipo_voucher_id_fk'],
        "voucher_nome" => utf8_encode($row['voucher_nome']),
        "voucher_desc" => utf8_encode($row['voucher_desc']),
        "voucher_preco_antigo" => $row['voucher_preco_antigo'],
        "voucher_preco_novo" => $row['voucher_preco_novo'],
        "voucher_image" => $row['voucher_image']
    );
}

mysqli_close($link);

echo(json_encode($result, true));
