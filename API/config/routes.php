<?php

use \Firebase\JWT\JWT;
use \Psr\Http\Message\ServerRequestInterface as Request;

// account group
$app->group('/api', function () use ($app) {

    $app->group('/account', function () use ($app) {

        $app->post('/login', 'login');
        $app->post('/register', 'register');
        $app->get('/activate', 'activate');

    });

    $app->group('/admin', function () use ($app) {

        $app->post('/addResearch', 'addResearch');
        $app->post('/deleteResearch', 'deleteResearch');
        $app->post('/viewResearch', 'viewResearch');
        $app->post('/editResearch', 'editResearch');

    })->add(function ($request, $response, $next) {

        $header = $request->getHeaders();

        if ($header) {

            $token = implode($header['HTTP_AUTHORIZATION']);
            $key = "sdfgd&&£2Q!1asDASDFFAs&(sdfsdfg;'#;!£^&asfsadf";

            try {

                $decoded = JWT::decode($token, $key, array('HS256'));

                $response = $next($request, $response);

                return $response;

            } catch (UnexpectedValueException $e) {

                return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

            } catch (Exception $e) {

                return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

            }

        } else {

            return $response->withJson(['error' => true, 'message' => 'Empty header!']);

        }

    });

});
