<?php
$fileName = 'results.txt';
$filePath = '/var/www/html/API/downloads/results.txt';
if(!is_readable($filePath)){
    die('File not found!');
} else {
    header("Cache-Control: public");
    header("Content-Disposition: attachment; filename=$fileName");
    header("Content-Type: application/octect-stream");
    header("Content-Transfer-Encoding: binary");
    readfile($filePath);
}
?>