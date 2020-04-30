<?php

function create_payment($items, $compra_id)
{
    require __DIR__ . '/vendor/autoload.php';

    $enviroment = parse_ini_file('api.ini');
    $token = $enviroment['token'];
   
    MercadoPago\SDK::setAccessToken($token);

    $preference = new MercadoPago\Preference();

    $items_pgmto = array();

    foreach ($items as $item){
        $newItem = new MercadoPago\Item();
        $newItem->title = "voucher n° " .$compra_id;
        $newItem->description = "voucher n° " .$compra_id;
        $newItem->quantity = $item->quantity;
        $newItem->unit_price = $item->price;
        array_push($items_pgmto, $newItem);
    }
    
    $preference->items = $items_pgmto;
    $preference->save();

    return $preference->id;
}
?>
