(function() {

    angular.module('app')
        .controller('BooksController', ['$q', 'books', 'dataService', 'badgeService', '$cookies', '$cookieStore', '$log', BooksController]);


    function BooksController($q, books, dataService, badgeService, $cookies, $cookieStore, $log) {

        var vm = this;
        
        vm.appName = books.appName;

        vm.getbadge = badgeService.retrieveBadge;

        vm.favoriteBook = $cookies.favoriteBook;

        vm.lastEdited = $cookieStore.get('lastEdited');

        var booksPromise = dataService.getAllBooks();
        var readersPromise = dataService.getAllReaders();

        $q.all([booksPromise])
            .then(getAllDataSuccess)
            .catch(getAllDataError)
            .finally(getAllComplete);

        function getAllDataSuccess(dataArray){
            vm.allBooks = dataArray[0];
            vm.allReaders = dataArray[1];
        }

        function getAllDataError(reason){
            console.log(reason);
        }

        function getAllComplete(){
            console.log('all promises complete');
        }
    }
}());