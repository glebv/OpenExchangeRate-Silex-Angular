<?php

use Symfony\Component\HttpFoundation\Request;

$app->get("/", function() use($app) {
    return $app['twig']->render("index.html");
})->bind('homepage');

$app->get("/api/currencies", function() use($app) {
    $queryData = array(
        "app_id" => $app['config']['openexchangerates_app_id']
    );
    $url = "http://openexchangerates.org/api/currencies.json?" . http_build_query($queryData);

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $json = curl_exec($ch);
    curl_close($ch);
    $currencies = json_decode($json);
    return $app->json($currencies, 200);

})->bind('currencies');

$app->get("/api/latest", function(Request $request) use($app) {
    $queryData = array(
        "base" => $request->get("baseCur") ?: 'USD',
        "app_id" => $app['config']['openexchangerates_app_id']
    );
    $url = "http://openexchangerates.org/api/latest.json?" . http_build_query($queryData);
    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $json = curl_exec($ch);
    curl_close($ch);
    $result = json_decode($json);
    return $app->json($result->rates, 200);

})->bind('latest');

return $app;