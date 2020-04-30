<?php

$enviroment = parse_ini_file('api.ini')['enviroment'];

if($enviroment == 'prod'){
    $hostname = '';
    $user = '';
    $pass = '';
    $dtbs = '';
}else{
    $hostname = 'localhost';
    $user = '';
    $pass = '';
    $dtbs = 'voucherbellastudio';
}

$link = mysqli_connect($hostname, $user, $pass, $dtbs);
