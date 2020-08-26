/*
 * Namespace definition
*/
if (typeof SW === 'undefined' || SW === null)
    var SW = {};

(function PageController(namespace, $) {
    var ws = new WebSocket('ws://localhost:8080');

    this.PageController = {
        init: function () {
            this.configureWebSocketClient();
            this.formHandler();
        },

        configureWebSocketClient: function () {
            ws.onopen = function () {
                ws.send('hello from the client');
            };

            ws.onmessage = function (message) {
                console.log(message.data);
            };
        },

        formHandler: function () {
            $('.loader').hide();

            $('#searchForm').submit(function (event) {
                event.preventDefault();
                var term = $('#movieSearch').val();
                SW.PageController.searchMovies(term);
            });
        },

        searchMovies: function (term) {
            $('.loader').show();

            $.get(`http://www.omdbapi.com/?apikey=a57c2e77&s=${term}`)
                .done(function (data) {
                    $('.loader').hide();
                    console.log(data);
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                });
        }
    }

    namespace.PageController = this.PageController;
})(SW, jQuery);