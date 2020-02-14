<?php
use \Firebase\JWT\JWT;
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

require '../config/connection.php';

function login(Request $request, Response $response)
{

    $data = json_decode($request->getBody());

    if (isset($data->email) && isset($data->password)) {

        $sql = "SELECT * FROM researcher WHERE email = :email";

        try {

            $db = connect();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("email", $data->email);
            $stmt->execute();
            $object = $stmt->fetchObject();

            return $response->withJson(validateCredentials($object, $data));

//$decoded = JWT::decode($token, $key, array('HS256'));
        } catch (PDOException $e) {

            return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

        }

    } else {

        return $response->withJson(['error' => true, 'message' => 'Missing attributes in JSON string. (email and password required']);

    }
}

function validateCredentials($object, $data)
{

    //verify email
    if (!$object) {

        return array(['error' => true, 'message' => 'You have entered an invalid email or password']);

    }

    //verify password
    if (!password_verify($data->password, $object->password)) {

        return array(['error' => true, 'message' => 'You have entered an invalid email or password']);

    }

    //check if account is active

    $isActive = 0; //default value = 0

    $sql = "SELECT isActive FROM registration WHERE researcherID = :id";

    try {

        $db = connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $object->id);
        $stmt->execute();
        $isActive = $stmt->fetchColumn();

    } catch (PDOException $e) {

        return array(['error' => true, 'message' => $e->getMessage()]);

    }

    if ($isActive == 0) {

        return array(['error' => true, 'message' => 'Please check your email and activate account']);

    }

    // create token

    $token = generateToken($object);

    return array(['error' => false, 'id' => $object->id, 'token' => $token]);

}

//generate token
function generateToken($object)
{

    $key = "sdfgd&&£2Q!1asDASDFFAs&(sdfsdfg;'#;!£^&asfsadf";

    $payload = [
        "iss" => "qmethodology", //issuer
        //"aud" => " " //audience
        "jti" => "QMET"+time(), //unique identifier
        "exp" => date() + 3600, // expiartion
        "iat" => date(), // the time it was issued

        "data" => [
            "id" => $object->id,
            "forename" => $object->forename,
            "surname" => $object->surname,
            "email" => $object->email,
        ],
    ];

    $token = JWT::encode($payload, $key);

    return $token;

}
