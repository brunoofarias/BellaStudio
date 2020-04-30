<?php
header("Access-Control-Allow-Origin: *");
include "database.php";

$nome = $_GET['nome'];
$email = $_GET['email'];
$telefone = $_GET['telefone'];

$has_interesse = mysqli_query($link, "select id_interesse from interesses where email_cliente = '{$email}'");

if($has_interesse->num_rows == 0){
    $insert_interesse = mysqli_query($link, "insert into interesses (nome_cliente, email_cliente, telefone_cliente) values ('{$nome}', '{$email}', '{$telefone}')");
    if($insert_interesse){
        $result = array(
            'success' => true,
            'msg' => 'Obrigada pelo interesse! :) Em breve entraremos em contato com você <3'
        );
    }else{
        $result = array(
            'success' => false,
            'msg' => 'Algo de errado aconteceu :('
        );
    }
}else{
    $result = array(
        'success' => false,
        'msg' => 'Você já registrou interesse com esse email! :) Fique tranquilo que em breve entraremos em contato com você'
    );
}

mysqli_close ($link);
echo(json_encode($result));
