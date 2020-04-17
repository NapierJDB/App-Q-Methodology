<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

function deleteUser(Request $request, Response $response)
{

    $data = json_decode($request->getBody());

    if (isset($data->email)) {

        try {

            $object = findEmail($data);

            if (!$object) {

                return $response->withJson(['error' => true, 'message' => 'email address does not exist']);

            } else {

                deleteResults($object->id);

                deleteEmail($object->id);

                return $response->withJson(['error'=> false, 'message' => 'The user has successfully been removed']);

            }

        } catch (PDOException $e) {

            return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

        }

    } else {

        return $response->withJson(['error' => true, 'message' => 'Missing attribute in JSON string. (email)']);

    }
}

function findEmail($data)
{
    $sql = "SELECT id FROM users WHERE email = :email";
    $db = connect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam('email', $data->email);
    $stmt->execute();
    return $stmt->fetchObject();
}

function deleteResults($userID)
{
    $sql = "DELETE FROM results WHERE userID = :userID";
    $db = connect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam('userID', $userID);
    $stmt->execute();
}

function deleteEmail($userID)
{
    $sql = "DELETE FROM users WHERE id = :id";
    $db = connect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam('id', $userID);
    $stmt->execute();
}
