angular
    .module('App', [
        'ui.bootstrap',
        'fiestah.money',
        'jmdobry.angular-cache'
    ])
    .config(function ($angularCacheFactoryProvider) {
        $angularCacheFactoryProvider.setCacheDefaults({
            maxAge: 600000,
            deleteOnExpire: 'aggressive'
        });
    })
    .run(function ($angularCacheFactory) {
        var info = $angularCacheFactory.info();
    });
