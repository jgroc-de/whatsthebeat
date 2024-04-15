<?php

require_once '../vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader('../templates');
$twig = new \Twig\Environment($loader, [
    'debug' => true,
    'cache' => false,
]);

switch ($_SERVER['REQUEST_URI']) {
    case '/tuner.html':
        echo $twig->render('tuner.html.twig', ['current_page' => 'tuner']);
        return true;
    case '/tap-the-beat.html':
        echo $twig->render('tap-the-beat.html.twig', ['current_page' => 'tap']);
        return true;
    case '/metronome.html':
        echo $twig->render('metronome.html.twig', ['current_page' => 'metronome']);
        return true;
    case '/':
        echo $twig->render('about.html.twig', ['current_page' => 'about']);
        return true;
    case '/settings.html':
        echo $twig->render('settings.html.twig', ['current_page' => 'settings']);
        return true;
    default:
        return false;
}

