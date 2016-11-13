(function(){
    angular.module('app')
        .controller('EditBookController', 
        ['dataService', '$routeParams', 'books', '$cookies', '$cookieStore', '$log', '$location', EditBookController]);

    function EditBookController(dataService, $routeParams, books, $cookies, $cookieStore, $log, $location){
        var vm = this;
        
        dataService.getBookById($routeParams.bookId)
        .then(getBookSuccess)
        .catch(getBookError)

        function getBookSuccess(book){
            vm.currentBook = book;
            $cookieStore.put('lastEdited', vm.currentBook);
        }

        function getBookError(reason){
            $log.error(reason);
        }

        vm.saveBook = function(){
            dataService.updateBook(vm.currentBook)
            .then(updateBookSuccess)
            .catch(updateBookError);
        }

        function updateBookSuccess(message){
            $log.info(message);
            $location.path('/');
        }

        function updateBookError(errorMessage){
            $log.error(errorMessage);
        }

        vm.setAsFavorite = function(){
            $cookies.favoriteBook = vm.currentBook.title;
        }
    }
})();