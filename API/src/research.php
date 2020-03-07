<?php

use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

//Add research
//Add research
function addResearch(Request $request, Response $response)
{

    // return $response->withJson(['error' => false, 'message' => generateCode()]); // test response

    $data = json_decode($request->getBody());

    if (isset($data->researcherID) && isset($data->name) && isset($data->description) && isset($data->box1) && isset($data->box2) && isset($data->box3) && isset($data->privacy_statement) && isset($data->debrief)) {

        $object = checkName($data);

        if (!$object) {

            $sql = 'INSERT INTO research (name, description, box1, box2, box3, code, created_date, researcherID, privacy_statement, debrief)
                    VALUES (:name, :description, :box1, :box2, :box3, :code, :created_date, :researcherID, :privacy_statement, :debrief)';
            $code = generateCode();

            $date = date('Y-m-d');

            try {

                $db = connect();
                $stmt = $db->prepare($sql);
                $stmt->bindParam('researcherID', $data->researcherID);
                $stmt->bindParam('name', $data->name);
                $stmt->bindParam('description', $data->description);
                $stmt->bindParam('box1', $data->box1);
                $stmt->bindParam('box2', $data->box2);
                $stmt->bindParam('box3', $data->box3);
                $stmt->bindParam('privacy_statement', $data->privacy_statement);
                $stmt->bindParam('debrief', $data->debrief);
                $stmt->bindParam('code', $code);
                $stmt->bindParam('created_date', $date);

                $stmt->execute();

                return $response->withJson(['error' => false, 'message' => 'The Research has been successfully created']);

            } catch (PDOException $e) {

                return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

            }

        } else {

            return $response->withJson(['error' => true, 'message' => 'The research already exists']);

        }

    } else {

        return $response->withJson(['error' => true, 'message' => 'Missing attributes in JSON string. (researcherID, name, description, box1, box2, box3, privacy_statement and debrief required)']);

    }

}

//Generate access code
function generateCode()
{

    $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomStr = '';
    $strLength = 1;

    for ($i = 0; $i < $strLength; $i++) {

        $index = rand(0, strlen($characters) - 1);
        $randomStr .= $characters[$index];
        $randomStr = 'Q' . $randomStr . date('is');

    }

    return $randomStr;

}

//Check if research name already exists
function checkName($data)
{

    $sql = 'SELECT * FROM research WHERE name = :name';

    try {

        $db = connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam('name', $data->name);
        $stmt->execute();
        $object = $stmt->fetchObject();

        return $object;

    } catch (PDOException $e) {

        return array(['error' => true, 'message' => $e->getMessage()]);

    }

}

//Check if research id exists
function checkId($data)
{

    $sql = 'SELECT * FROM research WHERE id = :id';

    try {

        $db = connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam('id', $data->id);
        $stmt->execute();
        $object = $stmt->fetchObject();

        return $object;

    } catch (PDOException $e) {

        return array(['error' => true, 'message' => $e->getMessage()]);

    }

}

//View research
function viewResearch(Request $request, Response $response)
{

    $data = json_decode($request->getBody());

    if (isset($data->researcherID)) {

        $sql = 'SELECT * FROM research WHERE researcherID = :researcherID';

        try {

            $db = connect();
            $stmt = $db->prepare($sql);
            $stmt->bindParam('researcherID', $data->researcherID);
            $stmt->execute();
            $object = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            return $response->withJson($object);

        } catch (PDOException $e) {

            return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

        }

    } else {

        return $response->withJson(['error' => true, 'message' => 'Missing attributes in JSON string. (researcherID)']);

    }

}

//Delete research
function deleteResearch(Request $request, Response $response)
{

    $data = json_decode($request->getBody());

    if (isset($data->id)) {

        $object = checkId($data);

        if (!$object) {

            if (is_array($object)) {

                return $response->withJson($object);

            } else {

                return $response->withJson(['error' => true, 'message' => 'The research does not exists']);

            }

        } else {

            $sql = 'DELETE FROM research WHERE id = :id';

            try {

                $db = connect();
                $stmt = $db->prepare($sql);
                $stmt->bindParam('id', $data->id);
                $stmt->execute();

                return $response->withJson(['error' => false, 'message' => 'The Research has been successfully deleted']);

            } catch (PDOException $e) {

                return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

            }

        }

    } else {

        return $response->withJson(['error' => true, 'message' => 'Missing attributes in JSON string. (id)']);

    }
}

function editResearch(Request $request, Response $response)
{

    $data = json_decode($request->getBody());

    if (isset($data->id) && isset($data->name) && isset($data->description) && isset($data->box1) && isset($data->box2) && isset($data->box3) && isset($data->privacy_statement) && isset($data->debrief)) {

        $object = checkId($data);

        if (!$object) {

            if (is_array($object)) {

                return $response->withJson($object);

            } else {

                return $response->withJson(['error' => true, 'message' => 'The research does not exists']);

            }

        } else {

            $date = date('Y-m-d');

            $sql = 'UPDATE research SET name = :name, description = :description, box1 = :box1, box2 = :box2, box3 = :box3, created_date = :created_date, privacy_statement = :privacy_statement, debrief = :debrief
            WHERE id = :id';

            try {

                $db = connect();
                $stmt = $db->prepare($sql);
                $stmt->bindParam('id', $data->id);
                $stmt->bindParam('name', $data->name);
                $stmt->bindParam('description', $data->description);
                $stmt->bindParam('box1', $data->box1);
                $stmt->bindParam('box2', $data->box2);
                $stmt->bindParam('box3', $data->box3);
                $stmt->bindParam('privacy_statement', $data->privacy_statement);
                $stmt->bindParam('debrief', $data->debrief);
                $stmt->bindParam('created_date', $date);

                $stmt->execute();

                return $response->withJson(['error' => false, 'message' => 'The research has been successfully modified']);

            } catch (PDOException $e) {

                return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

            }

        }

    } else {

        return $response->withJson(['error' => true, 'message' => 'Missing attributes in JSON string. (id, name, description, box1, box2, box3, privacy_statement, debrief required)']);

    }

}
