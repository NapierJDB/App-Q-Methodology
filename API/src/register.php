<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

//Register researcher
function register(Request $request, Response $response)
{

    require_once '../config/connection.php';

    $data = json_decode($request->getBody());

    try {

        if (isset($data->email) && isset($data->forename) && isset($data->surname) && isset($data->password)) {

            $object = checkEmail($data);

            if (!$object) {

                createUser($data);

                $token = createToken($data);

                return $response->withJson(sendValidMail($data, $token));

            } else {

                return $response->withJson(['error' => true, 'message' => 'This email address is already registered']);

            }

        } else {

            return $response->withJson(['error' => true, 'message' => 'Missing attributes in JSON string']);

        }

    } catch (PDOException $e) {

        removeAccount($data);
        return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

    }

}
// send confirmation email
function sendValidMail($data, $token)
{

    require '/usr/share/php/libphp-phpmailer/class.phpmailer.php';

    require '/usr/share/php/libphp-phpmailer/class.smtp.php';

    $mail = new PHPMailer; // create a new object

    try {
        $mail->IsSMTP(); // enable SMTP
        $mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
        $mail->SMTPAuth = true; // authentication enabled
        $mail->SMTPSecure = "ssl"; // secure transfer enabled REQUIRED for Gmail
        $mail->Host = "smtp.gmail.com"; //smtp sever address
        $mail->Port = 465; // or 587
        $mail->IsHTML(true);
        $mail->Username = "qmethodologyapp@gmail.com"; //smtp user
        $mail->Password = 'Qmethodology'; //smtp password
        $mail->SetFrom("qmethodologyapp@gmail.com"); //sent from
        $mail->Subject = "Test";
        $mail->AddAddress($data->email); // sent to
        $mail->Body = '
                  <h1>QMet App</h1>
                  <p>Thank You!</p>
                  <p>Your account has been created, you can login with the following credentials after you have activated your account by pressing the url below.</p>

                  <p>------------------------</p>
                  <p>Username: ' . $data->email . '</p>
                  <p>Password: ' . $data->password . '</p>
                  <p>------------------------</p>

                  <p>Please click this link to activate your account:</p>
                  <p>http://soc-web-liv-60.napier.ac.uk/API/public/account/activate?token=' . $token . '</p>
    ';

        if (!$mail->Send()) {

            removeAccount($data);

        } else {

            return array(['error' => false, 'message' => 'Your account has been successfully registered, please check your email']);

        }

    } catch (phpmailerException $e) {

        removeAccount($data);

        return array(['error' => true, 'message' => $e->getMessage()]);

    } catch (Exception $e) {

        removeAccount($data);

        return array(['error' => true, 'message' => $e->getMessage()]);

    }

}

//check if email already exists
function checkEmail($data)
{

    $sql = "SELECT * FROM researcher WHERE email = :email";

    $db = connect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("email", $data->email);
    $stmt->execute();
    $object = $stmt->fetchObject();

    return $object;

}

function checkRegistration($id)
{
    $sql = "SELECT * FROM registration WHERE id = :id";

    $db = connect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("id", $id);
    $stmt->execute();
    $object = $stmt->fetchObject();

    return $object;

}

//create user
function createUser($data)
{

    $hashPass = password_hash($data->password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO researcher (forename, surname, email, password)
          VALUES (:forename, :surname, :email, :password)";

    $db = connect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("forename", $data->forename);
    $stmt->bindParam("surname", $data->surname);
    $stmt->bindParam("email", $data->email);
    $stmt->bindParam("password", $hashPass);
    $stmt->execute();

}

// create token
function createToken($data)
{

    $token = md5($data->email . time());

    $sql = "INSERT INTO registration (token, isActive, researcherID) VALUES (:token, :isActive, (SELECT id FROM researcher WHERE email = :email))";

    $db = connect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("token", $token);
    $stmt->bindParam("email", $data->email);
    $stmt->bindValue("isActive", 0);
    $stmt->execute();

    return $token;

}
// checks if user exists and remove them from database

function removeResearcher($data)
{

    $sql = "DELETE FROM researcher WHERE email = :email";

    $db = connect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("email", $data->email);
    $stmt->execute();

}

function removeRegistration($id)
{

    $sql = "DELETE FROM registration WHERE researcherID = :id";

    $db = connect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam(":id", $id);
    $stmt->execute();

}

function removeAccount($data)
{

    $objResearcher = checkEmail($data);

    if ($objResearcher) {

        $id = $objResearcher->id;
        $objRegister = checkRegistration($id);

        if ($objRegister) {

            removeRegistration($id);
            removeResearcher($data);

        } else {

            removeResearcher($data);

        }

    }

}
