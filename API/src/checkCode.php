<?php

use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

function checkCode(Request $request, Response $response)
{

    $data = json_decode($request->getBody());

    if (isset($data->code)) {

        $sql = "SELECT * FROM research WHERE code = :code";

        try {

            $db = connect();
            $stmt = $db->prepare($sql);
            $stmt->bindParam('code', $data->code);
            $stmt->execute();

            $object = $stmt->fetchObject();

            if (!$object) {

                return $response->withJson(['error' => true, 'message' => 'Please enter valid code']);

            } else {

                $tokenUser = generateTokenAdmin($object);

                return $response->withJson(['error' => false, 'id' => $object->id, 'name' => $object->name, 'token' => $tokenUser]);

            }

        } catch (PDOException $e) {

            return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

        }

    } else {

        return $response->withJson(['error' => true, 'message' => 'Missing attributes in JSON string. (code)']);

    }

}

function generateTokenUser($object)
{

    $key = "sdfgd&&£2Q!dRt34Sq@aqw1as(sdfsdfg;'#;!£^&asfsadf";

    $payload = [
        "iss" => "qmethodology", //issuer
        //"aud" => " " //audience
        "jti" => "QMET"+time(), //unique identifier
        "exp" => time() + 7200, // expiartion
        "iat" => time(), // the time it was issued

        "data" => [
            "id" => $object->id,
            "forename" => $object->name,
            "surname" => $object->created_date,
        ],
    ];

    $token = JWT::encode($payload, $key);

    return $token;

}
