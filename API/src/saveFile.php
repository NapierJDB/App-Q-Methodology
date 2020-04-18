<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

function createFile(Request $request, Response $response)
{

    $data = json_decode($request->getBody());

    if (isset($data->researchID)) {

        try {

            $users = getUsers($data);

            $results = getResults($data);

            $answers = getAnswers($data);

            $sortedResults = array();

            foreach ($results as $value) {
                $sortedResults[$value['markerNum']][] = $value;
            }

            //return $response->withJson($sortedResults);

            $fp = fopen("/var/www/html/API/downloads/results.txt", "w") or die("Unable to open file!");

            foreach ($users as $temp) {

                $user = $temp['userID'];

                $string = "userID " . strval($user) . PHP_EOL . "Sort: " . PHP_EOL;

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

                $string .= PHP_EOL . "Answers: " . PHP_EOL;

                foreach ($answers as $temp) {

                    if ($user == $temp['userID']) {

                        $number = $temp['q_number'];
                        $answer = $temp['answer'];

                        $string .= "Number: " . $number . " Answer: " . $answer . PHP_EOL;
                    }
                }

                $string .= PHP_EOL;

                fwrite($fp, $string);

            }
            fclose($fp);

            return $response->withJson(['error' => false, 'message' => 'The file has been successfully created']);

        } catch (PDOException $e) {

            return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

        }

    } else {

        return $response->withJson(['error' => true, 'message' => 'Missing attribute in JSON string. (researchID)']);

    }

}
function getResults($data)
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

function getAnswers($data)
{

    $sql = "SELECT userID, q_number, answer FROM q_answers WHERE researchID = :researchID ORDER BY q_number, userID ASC";
    $db = connect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam('researchID', $data->researchID);
    $stmt->execute();

    return $stmt->fetchAll(\PDO::FETCH_ASSOC);

}
