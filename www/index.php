<?php

require_once '../vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader('../templates');
$twig = new \Twig\Environment($loader, [
    'debug' => true,
    'cache' => false,
]);

switch ($_SERVER['REQUEST_URI']) {
    case '/tap-the-beat.html':
        echo $twig->render('tap-the-beat.html.twig');
        return true;
    case '/':
        echo $twig->render('index.html.twig');
        return true;
    case '/settings.html':
        echo $twig->render('settings.html.twig');
        return true;
    default:
        return false;
}

