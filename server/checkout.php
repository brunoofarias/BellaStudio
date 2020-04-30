<?php
$compra_id = $_GET['idc'] ?? '';
$id_pref = $_GET['idpg'] ?? '';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="imagem/png" href="images/logo.png" />
    <title>Bella Studio Hair - Pagamento</title>
</head>
<body>
<div style="width: 100%; display: flex; justify-content: center; flex-direction: column">

    <div style="margin: 0 0 10px 0;">
        Olá! Seu voucher é o número <span style="color: #8b2e2f; font-weight: bold"><?php echo $compra_id ?></span>!
        <br>
        Agora é só realizar o pagamento clicando no botão abaixo :)
    </div>

    <div>
        <form action="https://vouchersbellastudio.grtech.space" method="POST">
            <script
                src="https://www.mercadopago.com.br/integrations/v1/web-payment-checkout.js"
                data-preference-id="<?php echo $id_pref; ?>">
            </script>
        </form>
    </div>
</div>
</body>
</html>
