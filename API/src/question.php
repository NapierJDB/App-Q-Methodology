<?php

use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

//add question
function addQuestion(Request $request, Response $response)
{

    $data = json_decode($request->getBody());

    if (isset($data->number) && isset($data->question) && isset($data->researchID)) {

        $object = checkNumberQuest($data);

        if (!$object) {

            $sql = 'INSERT INTO questions (number, question, researchID) VALUES (:number, :question, :researchID)';

            try {

                $db = connect();
                $stmt = $db->prepare($sql);
                $stmt->bindParam('number', $data->number);
                $stmt->bindParam('question', $data->question);
                $stmt->bindParam('researchID', $data->researchID);
                $stmt->execute();

                return $response->withJson(['error' => false, 'message' => 'The question has been succesfully added']);

            } catch (PDOException $e) {

                return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

            }

        } else {

            return $response->withJson(['error' => true, 'message' => 'The number already exists']);

        }

    } else {

        return $response->withJson(['error' => true, 'message' => 'Missing attributes in JSON string. (number, question, researchID required)']);

    }

}

function viewQuestion(Request $request, Response $response)
{

    $data = json_decode($request->getBody());

    if (isset($data->researchID)) {

        $sql = 'SELECT * FROM questions WHERE researchID = :researchID';

        try {

            $db = connect();
            $stmt = $db->prepare($sql);
            $stmt->bindParam('researchID', $data->researchID);
            $stmt->execute();
            $object = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            return $response->withJson($object);

        } catch (PDOException $e) {

            return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

        }

    } else {

        return $response->withJson(['error' => true, 'message' => 'Missing attributes in JSON string. (researchID)']);

    }
}

function editQuestion(Request $request, Response $response)
{

    $data = json_decode($request->getBody());

    if (isset($data->id) && isset($data->number) && isset($data->question)) {

        $object = checkQuestion($data);

        if (!$object) {

           return $response->withJson(['error' => true, 'message' => 'The question does not exists']);
        
        } else {

            $sql = 'UPDATE questions SET number = :number, question = :question
            WHERE id = :id';

            try {

                $db = connect();
                $stmt = $db->prepare($sql);
                $stmt->bindParam('id', $data->id);
                $stmt->bindParam('number', $data->number);
                $stmt->bindParam('question', $data->question);
                $stmt->execute();

                return $response->withJson(['error' => false, 'message' => 'The question has been successfully modified']);

            } catch (PDOException $e) {

                return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

            }

        }

    } else {

        return $response->withJson(['error' => true, 'message' => 'Missing attributes in JSON string. (id, number, question required)']);

    }

}

function deleteQuestion(Request $request, Response $response)
{
    $data = json_decode($request->getBody());

    if (isset($data->id)) {

        $object = checkQuestion($data);

        if (!$object) {


                return $response->withJson(['error' => true, 'message' => 'The question does not exists']);

            

        } else {

            $sql = 'DELETE FROM questions WHERE id = :id';

            try {

                $db = connect();
                $stmt = $db->prepare($sql);
                $stmt->bindParam('id', $data->id);
                $stmt->execute();

                return $response->withJson(['error' => false, 'message' => 'The question has been successfully deleted']);

            } catch (PDOException $e) {

                return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

            }

        }

    } else {

        return $response->withJson(['error' => true, 'message' => 'Missing attributes in JSON string. (id)']);

    }

}

function checkNumberQuest($data)
{

    $sql = 'SELECT * FROM questions WHERE number = :number AND researchID = :researchID';

    try {

        $db = connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam('number', $data->number);
        $stmt->bindParam('researchID', $data->researchID);
        $stmt->execute();
        $object = $stmt->fetchObject();

        return $object;

    } catch (PDOException $e) {

        return array('error' => true, 'message' => $e->getMessage());

    }
}

function checkQuestion($data)
{

    $sql = 'SELECT * FROM questions WHERE id = :id';

    try {

        $db = connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam('id', $data->id);
        $stmt->execute();
        $object = $stmt->fetchObject();

        return $object;

    } catch (PDOException $e) {

        return array('error' => true, 'message' => $e->getMessage());

    }

}