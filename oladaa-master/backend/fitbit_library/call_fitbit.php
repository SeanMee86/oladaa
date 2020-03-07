<?php
session_start();
header("Access-Control-Allow-Origin: *");
use djchen\OAuth2\Client\Provider\Fitbit;
require_once __DIR__ . '/vendor/autoload.php';
require('fitbit_credentials.php');

$provider = new Fitbit([
'clientId'          => $my_client_id_from_fitbit,
'clientSecret'      => $my_client_secret_from_fitbit,
'redirectUri'       => $my_callback_url
]);


if (!isset($_GET['code'])) {
    
    $authorizationUrl = $provider->getAuthorizationUrl(['scope' =>['heartrate']]);

    $_SESSION['oauth2state'] = $provider->getState();

    header('Location: ' . $authorizationUrl);
    exit;

} /*elseif (empty($_GET['state']) || ($_GET['state'] !== $_SESSION['oauth2state'])) {
    unset($_SESSION['oauth2state']);
    exit('Invalid state');

}*/ else {

    try {
        
        $accessToken = $provider->getAccessToken('authorization_code', [
            'code' => $_GET['code']
        ]);

        $resourceOwner = $provider->getResourceOwner($accessToken);

        var_export($resourceOwner->toArray());

        $request = $provider->getAuthenticatedRequest(
            Fitbit::METHOD_GET,
            Fitbit::BASE_FITBIT_API_URL . '/1/user/-/activities/heart/date/today/7d.json',
            $accessToken,
            ['headers' => [Fitbit::HEADER_ACCEPT_LANG => 'en_US'], [Fitbit::HEADER_ACCEPT_LOCALE => 'en_US']]
        );
        $response = $provider->getParsedResponse($request);

        $fatBurnMin = $response['activities-heart'][5]['value']['heartRateZones'][1]['minutes'];
        $cardioMin = $response['activities-heart'][5]['value']['heartRateZones'][2]['minutes'];
        $peakMin = $response['activities-heart'][5]['value']['heartRateZones'][3]['minutes'];
        /**
         * @param $fatBurnMin
         * @param $cardioMin
         * @param $peakMin
         * @return float|int|string
         * @description - Pass in amount of minutes spent at different heart rate levels
         * to obtain an activity level based around the prior day.
         */
        function getActivityScore($fatBurnMin, $cardioMin, $peakMin){
            $fatBurnScore = $fatBurnMin*3;
            $cardioScore = $cardioMin*4;
            $peakScore = $peakMin*5;
            $totalScore = ($fatBurnScore+$cardioScore+$peakScore);
            $totalMin = 60+($fatBurnMin+$cardioMin+$peakMin);
            $activityScore = $totalScore/$totalMin;
            if ($activityScore >= 0 && $activityScore < 2){
                $activityScore = round($activityScore);
            }
            else if($activityScore > 2){
                $activityScore = 2;
            }
            else{
                $activityScore = 'Invalid Inputs';
            }
            $_SESSION["activity_score"] = $activityScore;
            return $activityScore;
        }
        $_SESSION["activity_score"] = getActivityScore($fatBurnMin,$cardioMin,$peakMin);
	print_r($_SESSION);
    } catch (\League\OAuth2\Client\Provider\Exception\IdentityProviderException $e) {

    exit($e->getMessage());

    }
}
header("location: https://www.oladaa.com/app/activity_note");
