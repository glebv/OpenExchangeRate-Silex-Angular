'use strict';
angular.module('App')
    .controller('MainCtrl', function ($scope, openexchangerates, $log) {
        //default values
        $scope.currencies = [];
        $scope.rates = {};

//      init
        $scope.transaction = {
            result: '-',
            baseCur: 'USD',
            rate: 0,
            destCur : ''
        };
        openexchangerates.currencies().success(
            function(res) {
              $scope.currencies = Object.keys(res).map(function(k) { return {iso: k, desc: res[k]} } );
            }
        );


//      handlers
        $scope.changeDestCur = function ($item) {
            $scope.destCur = $item.iso;
            $scope.changeCur();
        };
        $scope.changeCur = function ($item) {
            var data  = { baseCur: $scope.transaction.baseCur, destCur: $scope.transaction.destCur};
            openexchangerates.rate( data ).success(function (rates) {
                    var rate_usd_base = rates[data.baseCur];
                    var rate_usd_dest = rates[data.destCur];
                    var rate =  rate_usd_dest * (1 / rate_usd_base );

                    $scope.transaction.rate = rate;
                    $log.debug(rate);
            });

        };

    });