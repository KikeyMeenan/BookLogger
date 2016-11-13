(function() {

    var app = angular.module('app', ['ngRoute', 'ngCookies']);

    app.provider('books', ['constants', function(constants){

        var includeVersionIntitle = false;

        this.setIncludeVersionIntitle = function(value){
            includeversionInTitle = value;
        };

        this.$get = function(){
            var appName = constants.APP_TITLE;
            var version = constants.APP_VERSION;

            if(includeVersionIntitle){
                appName += ' ' + version;
            }

            var appDesc = constants.APP_DESCRIPTION;

            return {
                appName: appName,
                appDesc: appDesc
            };
        };

    }]);

    app.config(['booksProvider', '$routeProvider', 'constants', '$logProvider', function(booksProvider, $routeProvider, constants, $logProvider){
        booksProvider.setIncludeVersionIntitle(true);
        $logProvider.debugEnabled(false);

        $routeProvider
        .when('/', {
            templateUrl: 'app/templates/books.html',
            controller: 'BooksController',
            controllerAs: 'books'
        })
        .when('/AddBook', {
            templateUrl: 'app/templates/addBook.html',
            controller: 'AddBookController',
            controllerAs: 'addBook'
        })
        .when('/EditBook/:bookId', {
            templateUrl: 'app/templates/editBook.html',
            controller: 'EditBookController',
            controllerAs: 'bookEditor'
        })
        .otherwise('/');
    }]);

    app.run(['$rootScope', function($rootScope){
        $rootScope.$on('$routeChangeSuccess', function(event, current, previous){
            console.log('successfully changed routes');
        });

        $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
            console.log('error changing routes');

            console.log(event);
            console.log(current);
            console.log(previous);
            console.log(rejection);
        });
    }]);

}());