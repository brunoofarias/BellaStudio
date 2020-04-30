<?php

$enviroment = parse_ini_file('api.ini')['enviroment'];

if($enviroment == 'prod'){
    $hostname = '192.185.213.50';
    $user = 'grtech91_absh';
    $pass = 'adminBella*567';
    $dtbs = 'grtech91_voucherbellastudio';
}else{
    $hostname = 'localhost';
    $user = 'root';
    $pass = '';
    $dtbs = 'voucherbellastudio';
}

$link = mysqli_connect($hostname, $user, $pass, $dtbs);