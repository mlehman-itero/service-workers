/*
 * Namespace definition
*/
if (typeof SW === 'undefined' || SW === null)
    var SW = {};

(function PageController(namespace, $) {
    var ws = new WebSocket('ws://localhost:8080');

    this.PageController = {
        init: function () {
            this.formHandler();
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

            fetch(`http://www.omdbapi.com/?apikey=a57c2e77&s=${term}`)
                .then(response => {
                    if (response.status !== 200) {
                        console.log(`Error status: ${response.status}`);
                        return;
                    }

                    response.json()
                        .then(data => {
                            $('.loader').hide();
                            var results = data.Search;

                            var html = '';

                            $.each(results, function (i, item) {
                                html += `<div class="row">
                                    <div class="col-sm-12">
                                        ${item.Title} (${item.Year})
                                    </div>
                                    </div>`;
                            });

                            $('#results').html(html);        
                        });
                }).catch(err => {
                    $('.loader').hide();
                    console.log(err);
                });
        }
    }

    namespace.PageController = this.PageController;
})(SW, jQuery);