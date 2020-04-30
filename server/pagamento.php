<?php

function create_payment($items, $compra_id)
{

    require __DIR__ . '/vendor/autoload.php';

    $enviroment = parse_ini_file('api.ini')['enviroment'];

    if($enviroment == 'prod'){
        $token = 'APP_USR-2951637698957695-040822-0c14dc9236eeec7b4cc57e856271a2a7-158961699';
    }else{
        $token = 'TEST-2951637698957695-040822-f6ed5155ac460e464720b4f75550c6aa-158961699';
    }

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