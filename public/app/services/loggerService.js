(function(){
    angular.module('app').service('logger', BookAppLogger);

    function LoggerBase(){

    }

    LoggerBase.prototype.output = function(message){
        console.log('LoggerBase: ' + message);
    };

    function BookAppLogger(){
        LoggerBase.call(this);

        this.logbook = function(book){
            console.log('book: ' + book.title);
        };
    }

    BookAppLogger.prototype = Object.create(LoggerBase.prototype);
})();