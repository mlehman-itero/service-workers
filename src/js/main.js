/*
 * Namespace definition
*/
if (typeof SW === 'undefined' || SW === null)
    var SW = {};

(function SW(namespace, $) {
    var ws = new WebSocket('ws://localhost:8080');

    this.SW = {
        init: function () {
            this.configureWebSocketClient();
            this.sendMessage();
        },

        configureWebSocketClient: function () {
            ws.onopen = function () {
                ws.send('hello from the client');
            };

            ws.onmessage = function (message) {
                console.log(message.data);
            };
        },

        sendMessage: function(msg) {
            $('#send-message-btn').on('click', function(event) {
                ws.send('button click');
            });
        }
    }

    namespace.SW = this.SW;
})(SW, jQuery);