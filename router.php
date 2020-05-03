<?php
session_start();
chdir(realpath(__DIR__.DIRECTORY_SEPARATOR.'dist'));
$parts = explode('?', $_SERVER['REQUEST_URI'], 2);
$filePath = realpath(ltrim($parts[0], '/'));
if ($filePath && is_dir($filePath)){
    // redirect without trailing slash
    if(substr($parts[0], -1) != '/') {
        header('Location: http://localhost:4000'.$parts[0].'/', true, 301);
        exit;
    }

    // attempt to find an index file
    foreach (['index.php', 'index.html'] as $indexFile){
        $indexFilePath = $filePath . DIRECTORY_SEPARATOR . $indexFile;

        if (realpath($filePath . DIRECTORY_SEPARATOR . $indexFile)){
            $filePath = $indexFilePath;
            break;
        }
    }
}
if ($filePath && is_file($filePath)) {
    // 1. check that file is not outside of this directory for security
    // 2. check for circular reference to router.php
    // 3. don't serve dotfiles
    if (strpos($filePath, __DIR__ . DIRECTORY_SEPARATOR) === 0 &&
        $filePath != __DIR__ . DIRECTORY_SEPARATOR . 'router.php' &&
        substr(basename($filePath), 0, 1) != '.'
    ) {
        return false;
    } else {
        // disallowed file
        header("HTTP/1.1 404 Not Found");
        echo "404 Not Found";
    }
} else {
    header("HTTP/1.1 404 Not Found");
    echo "404 Not Found";
}