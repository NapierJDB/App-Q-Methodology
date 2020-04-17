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

                return $response->withJson(['error' => false, 'id' => $object->id, 'token' => $tokenUser]);

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

    $key = "sdfgd&&£2Q!1asDASDFFAs&(sdfsdfg;'#;!£^&asfsadf"; //needs to be stored in database

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

function getData(Request $request, Response $response)
{

    $data = json_decode($request->getBody());

    if (isset($data->id)) {

        $object = checkResearchId($data); //research.php

        if ($object) {

            return $response->withJson(['research' => getResearch($data), 'anchors' => getAnchors($data), 'statements' => getStatements($data)]);

        } else {

            return $response->withJson(['error' => true, 'message' => 'The research does not exist']);

        }

    } else {

        return $response->withJson(['error' => true, 'message' => 'Missing attributes in JSON string. (id)']);

    }

}

function getResearch($data)
{

    $sql = "SELECT name,description, box1, box2, box3, privacy_statement, debrief FROM research WHERE id = :id";

    try {

        $db = connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam('id', $data->id);
        $stmt->execute();
        $object = $stmt->fetch(PDO::FETCH_OBJ);

        return $object;

    } catch (PODException $e) {

        return array('error' => true, 'message' => $e->getMessage());

    }

}

function getAnchors($data)
{

    $sql = "SELECT markerNum, items FROM anchors WHERE researchID = :researchID ORDER BY  markerNum ASC";

    try {

        $db = connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam('researchID', $data->id);
        $stmt->execute();
        $object = $stmt->fetchAll(PDO::FETCH_OBJ);

        return $object;

    } catch (PODException $e) {

        return array('error' => true, 'message' => $e->getMessage());

    }

}

function getStatements($data)
{

    $sql = "SELECT number, description FROM q_sort_cards WHERE researchID = :researchID ORDER BY number ASC";

    try {

        $db = connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam('researchID', $data->id);
        $stmt->execute();
        $object = $stmt->fetchAll(PDO::FETCH_OBJ);

        return $object;

    } catch (PODException $e) {

        return array('error' => true, 'message' => $e->getMessage());

    }

}
function sendResults(Request $request, Response $response)
{
    $data = json_decode($request->getBody());

    if (isset($data->array) && isset($data->array->researchID) && isset($data->array->statements) && isset($data->array->email)) {

        try {

            // return $response->withJson(addUser($data));

            $userID = addUser($data);

            $researchID = $data->array->researchID;

            if (checkResults($userID, $researchID)) {

                if (checkIsMulti($userID)) {

                    if (isSecondResult($userID, $researchID)) {

                        return $response->withJson(['error' => true, 'message' => 'Your second results have already been submitted!']);

                    } else {

                        //$sql = "INSERT INTO results (statementNum, markerNum, userID, researchID, isSecondResult) VALUES (:statementNum, :markerNum, :userID, :researchID, :isSecondResult)";

                        $isSecondResult = 1;

                        $db = connect();

                        foreach ($data->array->statements as $result) {
                            $sql = "INSERT INTO markers (`$result->markerNum`, userID, researchID, isSecondResult) VALUES (:statementNum, :userID, :researchID, :isSecondResult)";
                            $stmt = $db->prepare($sql);
                            $stmt->bindParam("userID", $userID);
                            $stmt->bindParam("researchID", $data->array->researchID);
                            $stmt->bindParam("isSecondResult", $isSecondResult);
                            $stmt->bindParam("statementNum", $result->statement);
                            $stmt->execute();
                        }

                        updateSecondresult($userID);

                        return $response->withJson(['error' => false, 'message' => 'Second results have been added successfully!']);

                    }

                } else {

                    return $response->withJson(['error' => true, 'message' => 'Your results have already been submitted!']);

                }
            } else {

                $db = connect();

                foreach ($data->array->statements as $result) {

                    $sql = "INSERT INTO markers ( `$result->markerNum` , userID, researchID) VALUES (:statementNum, :userID, :researchID)";
                    $stmt = $db->prepare($sql);
                    $stmt->bindParam("userID", $userID);
                    $stmt->bindParam("researchID", $data->array->researchID);

                    $stmt->bindParam("statementNum", $result->statement);
                    
                    $stmt->execute();

                }

                return $response->withJson(['error' => false, 'message' => 'Results have been added successfully!']);

            }
        } catch (PODException $e) {

            return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

        }

        //return $response->withJson(['error' => false, 'data' => $data]);

    } else {

        return $response->withJson(['error' => true, 'message' => 'Missing attributes in JSON string. (array: {researchID: {}, statements: [{},{},{}], email: {}})']);

    }
}
// check if user's email already exists
function checkUser($data)
{

    $sql = "SELECT * FROM users WHERE email = :email";

    $db = connect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("email", $data->array->email);
    $stmt->execute();
    $object = $stmt->fetchObject();

    return $object;

}
//  if user not exists: add user and return id, else return users id
function addUser($data)
{

    $object = checkUser($data);

    if (!$object) {

        $sql = "INSERT INTO users (email) VALUES (:email)";
        $db = connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam('email', $data->array->email);
        $stmt->execute();

        $id = $db->lastInsertId();

        return $id;

    } else {

        return $object->id;

    }

}

function checkResults($userID, $researchID)
{

    $sql = "SELECT * FROM markers WHERE userID = :userID AND researchID = :researchID";

    $db = connect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("userID", $userID);
    $stmt->bindParam("researchID", $researchID);
    $stmt->execute();
    $object = $stmt->fetchObject();

    return $object;
}

function checkIsMulti($userID)
{

    $sql = "SELECT isMulti FROM users WHERE id = :userID";

    $db = connect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("userID", $userID);
    $stmt->execute();
    $object = $stmt->fetchObject();

    if ($object->isMulti != 0) {

        return true;

    }

    return false;

}

function isSecondResult($userID, $researchID)
{

    $sql = "SELECT isSecondResult FROM users WHERE id = :userID";
    $db = connect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("userID", $userID);
    $stmt->execute();
    $object = $stmt->fetchObject();

    if ($object->isSecondResult != 0) {

        return true;

    }

    return false;
}
function updateSecondResult($userID)
{

    $isSecondResult = 1;
    $sql = "UPDATE users SET isSecondResult = :isSecondResult WHERE id = :userID";
    $db = connect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("userID", $userID);
    $stmt->bindParam("isSecondResult", $isSecondResult);
    $stmt->execute();
}
