<?php

namespace middleware;
use \Firebase\JWT\JWT;


class authMiddleWare
{
    public function _invoke($request, $response, $next)
    {

        $header = $request->getHeaders();
        //return $response->withJson(['error' => true, 'message' => $header['HTTP_AUTHORIZATION']]);

        if ($header) {
            //$token = $header['HTTP_AUTHORIZATION'];
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

    }
}