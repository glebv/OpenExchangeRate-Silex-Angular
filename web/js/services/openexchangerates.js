angular.module('App')
    .factory('openexchangerates', function openexchangerates ($http, $angularCacheFactory, $log, $q) {
        $angularCacheFactory('curCache', {
            maxAge: 360000,
            cacheFlushInterval: 360000
        });
        $angularCacheFactory('rateCache', {
            maxAge: 60000,
            cacheFlushInterval: 60000
        });

        openexchangerates.currencies = function () {
            return $http.get('/api/currencies', {cache: $angularCacheFactory.get('curCache') });
        };
        openexchangerates.rate = function (data) {
            return $http.get('/api/latest', {cache: $angularCacheFactory.get('rateCache'), params: {} })
                .success(
                    function(rates) {
                        if ( ! data.baseCur || ! data.destCur )
                            return $q.reject('not specified data');
                        return rates;
                    }
                );
        };

        return openexchangerates;
    });