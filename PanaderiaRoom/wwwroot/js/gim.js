var GlobalIdentity = (function () {
    'use strict';

    GIM = window.GIM || (window.GIM = []);

    /*_executeRequest.*/

    var _executeRequest = function (spec) {
        var url = spec.url || '';
        var method = spec.method || '';
        var headers = spec.headers || {};
        var params = spec.params || undefined;
        var successCallback = spec.successCallback || function () { };
        var errorCallback = spec.errorCallback || function () { };
        var headersKeys = Object.keys(headers);
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var resText = xhr.responseText || '{}';
                var response = JSON.parse(resText);

                if ((xhr.status == 200 || xhr.status == 201)) {
                    successCallback(response);
                } else {
                    errorCallback(response);
                }
            }
        };

        xhr.open(method, url, true);

        for (var i = 0; i < headersKeys.length; i++) {
            var key = headersKeys[i];
            xhr.setRequestHeader(key, headers[key]);
        }

        xhr.withCredentials = true;
        xhr.send(params);
    };

    var _validateSession = function (successCallback, errorCallback) {
        var spec = {
            url: 'http://172.16.2.160:8000/api/Authenticate/ValidateSessionId',
            method: 'GET',
            successCallback: successCallback,
            errorCallback: errorCallback,
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        };

        _executeRequest(spec);
    }

    GIM.checkLoginStatus = function (clientid, redirecturi, scopes, responsetype) {
        var loginURI = 'http://172.16.2.160:8000/?clientid=' + clientid + '&redirecturi=' + redirecturi + '&scopes=' + scopes + '&responsetype=' + responsetype + '';

        return new Promise(function (resolve, reject) {
            _validateSession(
                function (e) {
                    console.log('=> ', e);
                },
                function (e) {
                    //console.log(e.operation_reports[0].message);

                    resolve(
                        {
                            'errorMessage': "e.operation_reports[0].message",
                            'urlLogin': loginURI
                        }
                    );
                });
        });
    };

})();

if (window.gimInit) {
    window.gimInit();
}