$(document).ready(function () {

    var randomGeneratorBtn = $("#random-advice-btn");
    var ownAdviceBtn = $("#own-advice-btn");
    var retryButton = $("#retry-btn");
    var translateBtn1 = $("#translate-btn-1");
    var translateBtn2 = $("#translate-btn-2");
    var ownTextArea = $("#text-area");
    // var doneBtn = $("#done-btn");
    var translatedList = [];
    var translatedAdvice;
    var advice;
    var finalResult;
    var carouselItem = document.querySelectorAll(".carousel-item");

    // var dt = new Date();

    // $("#date-time").text(dt);

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
    
    // doneBtn.click(setLocalStorage);

    function setLocalStorage(finalResult){
        translatedList.unshift(finalResult);
        console.log(translatedList);
        localStorage.setItem("previous-translation-list", JSON.stringify(translatedList));
        $("#final-result").val("");
    }

    function getLocalStorage() {
        var previousTranslation = localStorage.getItem("previous-translation-list");

        if (!previousTranslation) {
            return;
        } else {
        previousTranslation = JSON.parse(previousTranslation);

        for (i = 0; i < previousTranslation.length; i++) {
            $(carouselItem[i]).text(previousTranslation[i]);
        }

        // $("#previous-advice").text(previousTranslation[0]);
        // $("#previous-translations").removeClass("hidden");
        // }
    }
}

    function initialize() {
        getLocalStorage();
    }

    initialize();

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
            translateToYoda();
        }
    }

    function showFinalResult(data) {
        translatedAdvice = data.contents.translated;

        translatedAdvice = translatedAdvice.toString();
        console.log(typeof translatedAdvice);
        translatedAdvice = translatedAdvice.slice(0, -1);

        if (translatedAdvice.includes(".")) {
            console.log("More than 1 sentence");
            translatedAdvice = translatedAdvice.toLowerCase();
            
            translatedAdvice = translatedAdvice.split(".");

            var firstLetterOne = translatedAdvice[0].charAt(0);
            firstLetterOne = firstLetterOne.toUpperCase();
            var firstLetterTwo = translatedAdvice[1].charAt(0);
            firstLetterTwo = firstLetterTwo.toUpperCase();
            var translatedAdviceOne;
            translatedAdviceOne = translatedAdvice[0].slice(1);
            var translatedAdviceTwo;
            translatedAdviceTwo = translatedAdvice[1].slice(1);

            finalResult = '"' + firstLetterOne + translatedAdviceOne + '. ' + firstLetterTwo + translatedAdviceTwo + '."';

            finalResult = finalResult.replace(",", ", ");

            $("#final-result").text(finalResult);
            // $("#previous-advice").text(finalResult);
            setLocalStorage(finalResult);
            getLocalStorage();
        } else {
            console.log("One sentence")
            translatedAdvice = translatedAdvice.toLowerCase();

            var firstLetter = translatedAdvice.charAt(0);
            firstLetter = firstLetter.toUpperCase();
            translatedAdvice = translatedAdvice.slice(1);
            finalResult = firstLetter + translatedAdvice;

            finalResult = '"' + finalResult + '."';

            finalResult = finalResult.replace(",", ", ");

            $("#final-result").text(finalResult);
            // $("#previous-advice").text(finalResult);
            setLocalStorage(finalResult);
            getLocalStorage();
        }
    }

    $('.modal-trigger').leanModal();

    $(document).ready(function(){
        $('.carousel').carousel();
      });


})