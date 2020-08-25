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
            this.wireSendEvent();
        },

        configureWebSocketClient: function () {
            ws.onopen = function () {
                ws.send('Hello from the client');
            };

            ws.onmessage = function (data) {
                console.log(data);
            };
        },

        wireSendEvent: function () {
            $('#send-message-btn').click(function () {
                ws.send('hello world');
            });
        }
    }

    namespace.SW = this.SW;
})(SW, jQuery);