<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

function createFile(Request $request, Response $response)
{

    $data = json_decode($request->getBody());

    if (isset($data->researchID)) {

        try {

            $users = getUsers($data);

            $results = getAllData($data);

            $sortedResults = array();

            foreach ($results as $value) {
                $sortedResults[$value['markerNum']][] = $value;
            }

            //return $response->withJson($sortedResults);

            $fp = fopen("/var/www/html/API/downloads/results.txt", "w") or die("Unable to open file!");

            foreach ($users as $temp) {

                $user = $temp['userID'];

                $string = "userID " . strval($user) . ": ";
                
                foreach ($sortedResults as $key => $value) {

                    // echo "key: " . $key . ": ";
                    $string .= "marker: " . $key . " statements: ";

                    foreach ($value as $temp3) {

                        //echo $temp3['markerNum'];

                        if ($user == $temp3['userID'] && $temp3['markerNum'] == $key) {

                            //echo $temp3['statementNum']. " ";

                            $string .= strval($temp3['statementNum']) . " ";

                        } else {

                            continue;
                        }
                    }

                }
                $string .= PHP_EOL;
                fwrite($fp, $string);

            }
            fclose($fp);
            //return $response->withJson($users);

        } catch (PDOException $e) {

            return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

        }

    } else {

        return $response->withJson(['error' => true, 'message' => 'Missing attribute in JSON string. (researchID)']);

    }

}
function getAllData($data)
{

    $sql = "SELECT userID, markerNum, statementNum FROM results WHERE researchID = :researchID  ORDER BY userID";
    $db = connect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam('researchID', $data->researchID);
    $stmt->execute();

    return $stmt->fetchAll(\PDO::FETCH_ASSOC);

}

function getUsers($data)
{

    $sql = "SELECT userID FROM results WHERE researchID = :researchID GROUP BY userID ORDER BY 1";
    $db = connect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam('researchID', $data->researchID);
    $stmt->execute();

    return $stmt->fetchAll(\PDO::FETCH_ASSOC);
}
