<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

//add anchor
function addAnchor(Request $request, Response $response)
{
    $data = json_decode($request->getBody());

    if (isset($data->markerNum) && isset($data->items) && isset($data->researchID)) {

        $object = checkMarkerNum($data);

        if (!$object) {

            if ($data->markerNum != 0) {

                $sql = 'INSERT INTO anchors (markerNum, items, researchID) VALUES (:markerNum, :items, :researchID),(:markerNum-(:markerNum*2), :items, :researchID)';

            } else {

                $sql = 'INSERT INTO anchors (markerNum, items, researchID) VALUES (:markerNum, :items, :researchID)';
            }

            try {

                $db = connect();
                $stmt = $db->prepare($sql);
                $stmt->bindParam('markerNum', $data->markerNum);
                $stmt->bindParam('items', $data->items);
                $stmt->bindParam('researchID', $data->researchID);
                $stmt->execute();

                return $response->withJson(['error' => false, 'message' => 'The anchor has been succesfully created']);

            } catch (PDOException $e) {

                return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

            }

        } else {

            return $response->withJson(['error' => true, 'message' => 'The anchor already exists']);
        }

    } else {

        return $response->withJson(['error' => true, 'message' => 'Missing attributes in JSON string. (markerNum, items, researchID required)']);

    }

}
//view anchor
function viewAnchor(Request $request, Response $response)
{

    $data = json_decode($request->getBody());

    if (isset($data->researchID)) {

        $sql = 'SELECT * FROM anchors WHERE researchID = :researchID';

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
// delete anchor
function deleteAnchor(Request $request, Response $response)
{
    $data = json_decode($request->getBody());

    if (isset($data->id)) {

        $object = checkAnchor($data);

        if (!$object) {

            if (is_array($object)) {

                return $response->withJson($object);

            } else {

                return $response->withJson(['error' => true, 'message' => 'The anchor does not exists']);

            }

        } else {

            $sql = 'DELETE FROM anchors WHERE id = :id';

            try {

                $db = connect();
                $stmt = $db->prepare($sql);
                $stmt->bindParam('id', $data->id);
                $stmt->execute();

                return $response->withJson(['error' => false, 'message' => 'The anchor has been successfully deleted']);

            } catch (PDOException $e) {

                return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

            }

        }

    } else {

        return $response->withJson(['error' => true, 'message' => 'Missing attributes in JSON string. (id)']);

    }
}
//edit anchor
function editAnchor(Request $request, Response $response)
{

    $data = json_decode($request->getBody());

    if (isset($data->id) && isset($data->markerNum) && isset($data->items)) {

        $object = checkAnchor($data);

        if (!$object) {

            if (is_array($object)) {

                return $response->withJson($object);

            } else {

                return $response->withJson(['error' => true, 'message' => 'The anchor does not exists']);

            }

        } else {

            $sql = 'UPDATE anchors SET markerNum = :markerNum, items = :items
            WHERE id = :id';

            try {

                $db = connect();
                $stmt = $db->prepare($sql);
                $stmt->bindParam('id', $data->id);
                $stmt->bindParam('markerNum', $data->markerNum);
                $stmt->bindParam('items', $data->items);
                $stmt->execute();

                return $response->withJson(['error' => false, 'message' => 'The anchor has been successfully modified']);

            } catch (PDOException $e) {

                return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

            }

        }

    } else {

        return $response->withJson(['error' => true, 'message' => 'Missing attributes in JSON string. (id, markerNum, items required)']);

    }

}
//Check if anchor id exists
function checkAnchor($data)
{

    $sql = 'SELECT * FROM anchors WHERE id = :id';

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
//Check if research name already exists
function checkMarkerNum($data)
{

    $sql = 'SELECT * FROM anchors WHERE markerNum = :markerNum';

    try {

        $db = connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam('markerNum', $data->markerNum);
        $stmt->execute();
        $object = $stmt->fetchObject();

        return $object;

    } catch (PDOException $e) {

        return array(['error' => true, 'message' => $e->getMessage()]);

    }

}
