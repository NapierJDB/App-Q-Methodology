<?php

use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

//add statement
function addStatement(Request $request, Response $response)
{

    $data = json_decode($request->getBody());

    if (isset($data->number) && isset($data->description) && isset($data->researchID)) {

        $object = checkNumber($data);

        if (!$object) {

            $sql = 'INSERT INTO q_sort_cards (number, description, researchID) VALUES (:number, :description, :researchID)';

            try {

                $db = connect();
                $stmt = $db->prepare($sql);
                $stmt->bindParam('number', $data->number);
                $stmt->bindParam('description', $data->description);
                $stmt->bindParam('researchID', $data->researchID);
                $stmt->execute();

                return $response->withJson(['error' => false, 'message' => 'The statement has been succesfully created']);

            } catch (PDOException $e) {

                return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

            }

        } else {

            if (is_array($object)) {

                return $response->withJson($object);

            } else {

                return $response->withJson(['error' => true, 'message' => 'The statement already exists']);

            }

        }

    } else {

        return $response->withJson(['error' => true, 'message' => 'Missing attributes in JSON string. (description, researchID required)']);

    }

}

//view statement
function viewStatement(Request $request, Response $response)
{

    $data = json_decode($request->getBody());

    if (isset($data->researchID)) {

        $sql = 'SELECT * FROM q_sort_cards WHERE researchID = :researchID';

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

//delete statement
function deleteStatement(Request $request, Response $response)
{

    $data = json_decode($request->getBody());

    if (isset($data->id)) {

        $object = checkStatement($data);

        if (!$object) {

            if (is_array($object)) {

                return $response->withJson($object);

            } else {

                return $response->withJson(['error' => true, 'message' => 'The statement does not exists']);

            }

        } else {

            $sql = 'DELETE FROM q_sort_cards WHERE id = :id';

            try {

                $db = connect();
                $stmt = $db->prepare($sql);
                $stmt->bindParam('id', $data->id);
                $stmt->execute();

                return $response->withJson(['error' => false, 'message' => 'The statement has been successfully deleted']);

            } catch (PDOException $e) {

                return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

            }

        }

    } else {

        return $response->withJson(['error' => true, 'message' => 'Missing attributes in JSON string. (id)']);

    }
}

function editStatement(Request $request, Response $response)
{

    $data = json_decode($request->getBody());

    if (isset($data->id) && isset($data->number) && isset($data->description)) {

        $object = checkStatement($data);

        if (!$object) {

            if (is_array($object)) {

                return $response->withJson($object);

            } else {

                return $response->withJson(['error' => true, 'message' => 'The statement does not exists']);

            }

        } else {

            $sql = 'UPDATE q_sort_cards SET number = :number, description = :description
            WHERE id = :id';

            try {

                $db = connect();
                $stmt = $db->prepare($sql);
                $stmt->bindParam('id', $data->id);
                $stmt->bindParam('number', $data->number);
                $stmt->bindParam('description', $data->description);
                $stmt->execute();

                return $response->withJson(['error' => false, 'message' => 'The statement has been successfully modified']);

            } catch (PDOException $e) {

                return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

            }

        }

    } else {

        return $response->withJson(['error' => true, 'message' => 'Missing attributes in JSON string. (id, markerNum, items required)']);

    }

}

//check if statement already exists
function checkNumber($data)
{

    $sql = 'SELECT * FROM q_sort_cards WHERE number = :number AND researchID = :researchID';

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

//check if statements id exists
function checkStatement($data)
{

    $sql = 'SELECT * FROM q_sort_cards WHERE id = :id';

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
