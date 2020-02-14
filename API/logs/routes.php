<?php

// account group
$app->group('/account', function () use ($app) {
    $app->post('/login', 'login');
    $app->post('/register', 'register');
    $app->get('/activate', 'activate');

});
