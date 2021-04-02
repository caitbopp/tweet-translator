$(document).ready(function () {

    var randomGeneratorBtn = $("#random-advice-btn");
    var ownAdviceBtn = $("#own-advice-btn");
    var retryButton = $("#retry-btn");
    var translateBtn1 = $(".modal-trigger");
    var translateBtn2 = $(".modal-trigger");
    var ownTextArea = $("#text-area");
    var doneBtn = $("#done-btn");
    var translatedList = [];
    var translatedAdvice;
    var advice;
    var dt = new Date();

    $("#date-time").text(dt);

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
        $(".own-advice-div").addClass("hidden");
        //#text-display is the element that will display the random quote
        $("#preview-advice").text(advice);
    }

    ownAdviceBtn.click(displayOwnAdvice);

    function displayOwnAdvice() {
        $(".own-advice-div").removeClass("hidden");
        $(".random-advice-div").addClass("hidden");
   
    }
    
    doneBtn.click(setLocalStorage);

    function setLocalStorage(){
        translatedList.push(translatedAdvice);
        console.log(translatedList);
        localStorage.setItem("previous-translation-list", translatedList);
        $("#translated-advice").val("");
    }

    translateBtn1.click(translateToYoda);

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

    translateBtn2.click(translateOwnAdvice);

    function translateOwnAdvice() {
        if (!ownTextArea.val()) {
            return;
        }
        else {
            advice = ownTextArea.val();
            translateToYoda(advice);
        }
    }

    function showFinalResult(data) {
        translatedAdvice = data.contents.translated;

        translatedAdvice = '"' + translatedAdvice + '"';

        $("#translated-advice").text(translatedAdvice);

        //more needs to be here about making the modal visible and display it properly

    }

    $('.modal-trigger').leanModal();




})