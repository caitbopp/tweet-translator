$(document).ready(function () {


    var randomGeneratorBtn = $("#random-advice-btn");
    var retryButton = $("#retry-btn");
    var translateBtn = $(".modal-trigger");
    var advice;

    // $(randomGeneratorBtn).click(getRandomQuote());
    randomGeneratorBtn.click(getRandomAdvice);
    retryButton.click(getRandomAdvice);

    function getRandomAdvice() {
        fetch("https://api.adviceslip.com/advice", {
            "method": "GET",
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data.slip.advice);
                displayRandomAdvice(data);
            })
    }

    function displayRandomAdvice(data) {
        advice = data.slip.advice;
        //this will display the div so that the preview of the quote will show up
        //.hidden is intended to be: display:none initially
        $(".random-advice-div").removeClass("hidden");
        //#text-display is the element that will display the random quote
        $("#preview-advice").text(advice);
    }

    translateBtn.click(translateToYoda);


    function translateToYoda() {
        var yodaURL = "https://api.funtranslations.com/translate/yoda.json?text=" +
            advice;

        fetch(yodaURL, {
            "method": "GET",
            "headers": {
                "X-Funtranslations-Api-Secret": "vhS2_Udw2JFBuXRd2bX68weF"
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                console.log(data.contents.translated);
                showFinalResult(data);
            })
    }

    function showFinalResult(data) {
        var translatedAdvice = data.contents.translated;

        $("#translated-advice").text(translatedAdvice);

        //more needs to be here about making the modal visible and display it properly

    }

    $('.modal-trigger').leanModal();




})