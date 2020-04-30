<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

include "database.php";
include "pagamento.php";

$data = json_decode(file_get_contents('php://input'));

// Array de objetos com ID, preço atual, quantidade e nome dos vouchers
$vouchers = $data->vouchers;
$email = $data->email;
$nome = $data->name;
$telefone = $data->phone;

$result = array(
    'success' => false
);

if($email && $nome && $telefone){
    $insert_compra = mysqli_query($link, "insert into compras_vouchers (email_comprador, telefone, nome_comprador) values ('{$email}', '{$telefone}', '{$nome}')");

    if ($insert_compra) {
        $compra_id = $link->insert_id;

        $preference_id = create_payment($vouchers, $compra_id);

        $result = array(
            'success' => true,
            'compra_id' => $compra_id,
            'preference_id' => $preference_id
        );

        if($enviroment == 'prod'){
            include "send_email.php";

            $itens = array_map(function ($vouchers){
                return $vouchers->name;
            }, $vouchers);

            $send_email_cliente = send_email_cliente($nome, $email, $compra_id, $itens, $preference_id);
            $send_email_bella_studio = send_email_vendedor($nome, $email, $compra_id, $itens, "bellacontato@yahoo.com", $preference_id, $telefone);
            $send_email_devs = send_email_vendedor($nome, $email, $compra_id, $itens, "gresende.contato@gmail.com", $preference_id, $telefone);
            $result['send_email_bella_studio'] = $send_email_bella_studio;
            $result['send_email_devs'] = $send_email_devs;
            $result['success_send_email_cliente'] = $send_email_cliente;
        }

        foreach ($vouchers as $voucher){
            mysqli_query($link, "insert into compras_vouchers_itens (voucher_compra_id_fk, voucher_id_fk, preco_voucher, qtd_vouchers) values ({$compra_id}, {$voucher->id}, {$voucher->price}, {$voucher->quantity})");
        }

    }
}

mysqli_close ($link);
echo(json_encode($result));
?>