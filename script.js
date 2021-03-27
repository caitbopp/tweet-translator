$(document).ready(function () {


fetch(url)
    .then(function(response) {
        if (!response.ok) {
            throw response.json();
        }

        return response.json();
    });











});