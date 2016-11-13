(function(){
    angular.module('app').factory('dataService', ['$q', '$timeout', '$http', 'constants', dataService]);

    function dataService($q, $timeout, $http, constants){
        return{
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders,
            getBookById: getBookById,
            updateBook: updateBook
        };

        function getBookById(bookId){
            return $http({
                method: 'GET',
                url: 'api/books/' + bookId
            })
            .then(sendGetResponse)
            .catch(sendError);
        }

        function getAllBooks(){
            return $http({
                method: 'GET',
                url: 'api/books'
            })
            .then(sendGetResponse)
            .catch(sendError);
        }

        function updateBook(book){
            return $http({
                method: 'PUT',
                url: 'api/books/' + book.book_id,
                data: book
            })
            .then(sendUpdateResponse)
            .catch(sendError);
        }

        function sendUpdateResponse(response){
            return "Book Updated: " + response.config.data.title;
        }

        function sendGetResponse(response){
            return response.data;
        }

        function sendError(response){
            return $q.reject('Falied to retrieve. {HTTP status: ' + response.status +'}');
        }

        function getAllReaders(){

            var readersArray = [
                {
                    reader_id: 1,
                    name: 'Marie',
                    weeklyReadingGoal: 315,
                    totalMinutesRead: 5600
                },
                {
                    reader_id: 2,
                    name: 'Daniel',
                    weeklyReadingGoal:210,
                    totalMinutesRead: 3000
                },
                {
                    reader_id: 3,
                    name: 'Lanier',
                    weeklyReadingGoal: 140,
                    totalMinutesRead: 600
                }
            ];

            var deferred = $q.defer();

            $timeout(function(){
                var successful = true;
                if(successful){
                    deferred.notify('Just getting some readers...');
                    deferred.notify('Almost done gathering readers...');
                    deferred.resolve(readersArray);
                }
                else {
                    deferred.reject('Error retrieving readers');
                }
            }, 1500);

            return deferred.promise;
        }
    }

})();