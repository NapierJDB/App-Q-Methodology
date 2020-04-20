<?php

use \Firebase\JWT\JWT;
use \Psr\Http\Message\ServerRequestInterface as Request;

//validate token
$validate = function ($request, $response, $next) {

    $header = $request->getHeaders();
    //return $response->withJson(['error' => true, 'message' => $header['HTTP_AUTHORIZATION']]);

    if ($header) {

        $token = implode($header['HTTP_AUTHORIZATION']);

        $key = "sdfgd&&£2Q!1asDASDFFAs&(sdfsdfg;'#;!£^&asfsadf"; // needs to be stored in database

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

};

//Router
$app->group('/api', function () use ($app, $validate) {

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

        $app->post('/addAnchor', 'addAnchor');
        $app->post('/addAllAnchors', 'addAllAnchors');
    
        $app->post('/deleteAnchor', 'deleteAnchor');
        $app->post('/viewAnchor', 'viewAnchor');
        $app->post('/editAnchor', 'editAnchor');

        $app->post('/addStatement', 'addStatement');
        $app->post('/deleteStatement', 'deleteStatement');
        $app->post('/viewStatement', 'viewStatement');
        $app->post('/editStatement', 'editStatement');

        $app->post('/addQuestion', 'addQuestion');
        $app->post('/viewQuestion', 'viewQuestion');
        $app->post('/editQuestion', 'editQuestion');
        $app->post('/deleteQuestion', 'deleteQuestion');

        $app->post('/createFile', 'createFile');
        $app->post('/deleteUser', 'deleteUser');



    })->add($validate);

    $app->group('/user', function () use ($app, $validate) {

        $app->post('/checkCode', 'checkCode');
        $app->post('/getData', 'getData')->add($validate);
        $app->post('/sendResults', 'sendResults')->add($validate);

    });

});
