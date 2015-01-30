var requester;
requester = (function () {
    var getJSON = function getJSON(resourceURL) {
        var deferred = Q.defer();

        deferred.resolve(
            $.ajax({
                url: resourceURL,
                type: 'GET',
                contentType: 'application/json',
                success: function(data) {
                    deferred.resolve(data);
                },
                error: function(err) {
                    deferred.reject(err);
                }
            })
        );

        return deferred.promise;
    };

        var postJSON = function postJSON(resourceURL, data) {
        var deferred = Q.defer();
        deferred.resolve(
            $.ajax({
                url: resourceURL,
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function(data) {
                    deferred.resolve(data);
                },
                error: function(err) {
                    deferred.reject(err);
                }
            })
        );

        return deferred.promise;
    };


    return {
        getJSON: getJSON,
        postJSON: postJSON
    };
}());
