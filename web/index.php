<?php

require_once __DIR__ . '/../vendor/autoload.php';
$app = require __DIR__ . '/../src/bootstrap.php';
require_once __DIR__ . '/../src/controller.php';
require __DIR__ . '/../src/config.php';

$app->run();