<?php

require_once '../vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader('../templates');
$twig = new \Twig\Environment($loader, [
    'debug' => true,
    'cache' => false,
]);

switch ($_SERVER['REQUEST_URI']) {
    case '/wtb.html':
        echo $twig->render('wtb.html.twig');
        return true;
    case '/':
        echo $twig->render('index.html.twig');
        return true;
    default:
        return false;
}

