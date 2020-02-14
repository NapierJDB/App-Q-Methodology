<?php

$app->group('/api', function () use ($app){
         // account group
          $app->group('/account', function () use ($app) {
          	$app->post('/login','login');
                $app->post('/register','register');
                $app->post('/test','test');
         });
});
?>