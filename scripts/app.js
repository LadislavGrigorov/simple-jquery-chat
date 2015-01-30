/*globals $ */
$(function () {
    var appResource = 'http://crowd-chat.herokuapp.com/posts',
        name = sessionStorage.getItem('name');

    $('#logout-panel').hide();
    $('#message-panel').hide();

    if (name || name !== null) {
        login(name);
    }


    setInterval(function () {
        requester.getJSON(appResource)
            .then(function (data) {
                var $chatContainer = $('#chat-content');
                var lastTenIndex = getLastTenIndex(data);

                $chatContainer.text('');
                for (var i = lastTenIndex; i < data.length; i++) {
                    $('<p>')
                        .html(data[i].by + ':' + ' ' + data[i].text)
                        .appendTo($chatContainer);
                }
            }, function (err) {
                console.log(err);
            })
    }, 1500);

    $('#login-btn').on('click', function () {
        var inputName = $('#name-input').val();
        sessionStorage.setItem('name', inputName);
        login(inputName);
    });

    $('#logout-btn').on('click', function () {
        sessionStorage.removeItem('name');
        logout();
    });

    $('#send-btn').on('click', function () {
        var message = $('#message-input').val();
        var name = sessionStorage['name'];
        var data = {
            user: name,
            text: message
        };

        requester.postJSON(appResource, data)
            .then(function (data) {
                console.log(1);
            }, function (err) {
                console.log(err);
            })
    });

    function getLastTenIndex(data) {
        var startIndex = 0;

        if (data.length - 10 > 0) {
            startIndex = data.length - 10;
        }

        return startIndex;
    }

    function login(name) {
        if (typeof(name) !== 'string' || name.length < 3) {
            alert('Name must be at least 3 symbols');
            return;
        }

        $('#logout-panel').show();
        $('#login-name').text(name);
        $('#message-panel').show();
        $('#login-panel').hide();
    }

    function logout() {
        $('#logout-panel').hide();
        $('#message-panel').hide();
        $('#login-panel').show();
    }
});

