<?php
function send_email_cliente($nome_cliente, $email_cliente, $id_compra, $itens, $id_pref)
{

    $headers = "MIME-Version: 1.1\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";
    $headers .= "From: bellastudiocontato@gmail.com\r\n";

    $itens = implode(", ", $itens);

    $mensagem = "Olá <b style='color: #8b2e2f'>{$nome_cliente}!</b> Tudo bem? 
                        <br> O número de seu voucher é <b style='color: #8b2e2f'>{$id_compra}</b>
                        <br>
                        Você comprou <b>{$itens}</b>.
                        <br><br>
                        Para realizar o pagamento, é só clicar nesse link: https://checkout.vouchers.grtech.space/?idc={$id_compra}&idpg={$id_pref}
                        <br>
                        <span style='font-size: 11px; color: #d60000'>Se já realizou o pagamento, por favor desconsidere o link acima :)</span>
                        <br><br>
                        Se houver alguma dúvida, nos contate :)
                        <br>
                        Nosso instagram é o <a style='color: rgba(139,46,47,0.81)' href='https://www.instagram.com/bellastudiohairgv'>bellastudiohairgv</a>.
                        <br>
                        Se preferir, nos ligue no número <a href='tel:1141699140'>11 4169-9140</a>
                        ou <a href='tel:11930760849'>11 93076-0849</a> ou pelo whatsapp clicando <a style='color: #8b2e2f' href='https://whats.link/bellastudiohair'>aqui</a>
                        <br><br>
                        Estamos localizados na Av São Camilo, 384 - Granja Vianna (Estacionamento gratuito no n° 386).
                        <br><br>
                        Agradecemos pela confiança! 🥰";
    $to = $email_cliente;
    $assunto = "Voucher Bella studio hair :)";
    return mail($to, $assunto, $mensagem, $headers);
}

function send_email_vendedor($nome_cliente, $email_cliente, $id_compra, $itens, $email_vendedor, $id_pref, $telefone_comprador)
{

    $headers = "MIME-Version: 1.1\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";
    $headers .= "From: bellastudiocontato@gmail.com\r\n";

    $itens = implode(", ", $itens);

    $mensagem = "Olá! <br><br> O cliente <b>{$nome_cliente}</b> comprou o voucher número <b>{$id_compra}</b>! <br><br>
                    Entre em contato com o cliente pelo email $email_cliente.<br>
                    Ou pelo telefone {$telefone_comprador}.
                    Se preferir ir direto para o whatsapp, clique <a href='https://api.whatsapp.com/send?phone=55{$telefone_comprador}'>aqui</a>.
                    <br>
                    Os itens vendidos foram <b>{$itens}</b>.
                    <br>
                    Caso o cliente precise do link de pagamento, é esse aqui: https://checkout.vouchers.grtech.space/?idc={$id_compra}&idpg={$id_pref}
                    <br><br>
                    <span style='font-size: 11px; color: #d60000'>Atenção: Na lista de atividades do mercado pago aparecerá o número do voucher junto ao nome do produto.
                    Ex: 'Você vendeu voucher n° 4653'. <br>
                    Ao clicar na atividade, você verá mais detalhes da compra. (Taxas, itens, etc.) <br>
                    Você pode pesquisar o pagamento no mercado pago pelo número do voucher que o cliente passar, por isso 
                    adicionamos o número do voucher na descrição da atividade.</span>";
    $to = $email_vendedor;
    $assunto = "Compra voucher :)";
    return mail($to, $assunto, $mensagem, $headers);
}
