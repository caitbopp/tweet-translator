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

        var oneSentence = true;

        translatedAdvice = translatedAdvice.toString();
        console.log(typeof translatedAdvice);
        translatedAdvice = translatedAdvice.slice(0, -1);

        if (translatedAdvice.includes(".")) {
            console.log("More than 1 sentence");
            oneSentence = false;
            translatedAdvice = translatedAdvice.toLowerCase();
            translatedAdvice = translatedAdvice.split(".");
            console.log(translatedAdvice[0]);
            console.log(translatedAdvice[1]);

            var firstLetterOne = translatedAdvice[0].charAt(0);
            firstLetterOne = firstLetterOne.toUpperCase();
            var firstLetterTwo = translatedAdvice[1].charAt(0);
            firstLetterTwo = firstLetterTwo.toUpperCase();
            var translatedAdviceOne;
            translatedAdviceOne = translatedAdvice[0].slice(1);
            var translatedAdviceTwo;
            translatedAdviceTwo = translatedAdvice[1].slice(1);

            finalResult = '"' + firstLetterOne + translatedAdviceOne + '. ' + firstLetterTwo + translatedAdviceTwo + '."';
            $("#translated-advice").text(finalResult);
        } else {
            console.log("One sentence")
            console.log(translatedAdvice);
            oneSentence = true;
            translatedAdvice = translatedAdvice.toLowerCase();
            console.log(translatedAdvice);

            var firstLetter = translatedAdvice.charAt(0);
            firstLetter = firstLetter.toUpperCase();
            translatedAdvice = translatedAdvice.slice(1);
            var finalResult = firstLetter + translatedAdvice;
            console.log(finalResult);

            finalResult = '"' + finalResult + '."';

            $("#translated-advice").text(finalResult);
        
            
        }
    


            // if (translatedAdvice.includes("  ")) {
            //     translatedAdvice = translatedAdvice.split("  ");
            //     console.log(translatedAdvice);
            //     for (i = 0; i < translatedAdvice.length-1; i++) {
            //         newTranslatedAdvice = translatedAdvice[i] + " " + translatedAdvice[i+1];
            //         console.log(newTranslatedAdvice);
            //     }
            // }
        


        // translatedAdvice = translatedAdvice.toLowerCase();
        // translatedAdvice = translatedAdvice.split(".");
        // console.log(translatedAdvice);

        // if (translatedAdvice[1]) {
        //     translatedAdvice = translatedAdvice[0] + ". " + translatedAdvice[1] + ".";
        //     console.log(translatedAdvice);
        //     translatedAdvice[0].charAt(0).toUpperCase();
        //     translatedAdvice[1].charAt(0).toUpperCase();
        //     translatedAdvice = translatedAdvice[0] + ". " + translatedAdvice[1];
        // } else {
        //     console.log(translatedAdvice);
        //     console.log(typeof translatedAdvice);
        //     translatedAdvice = translatedAdvice.toString();
        //     console.log(translatedAdvice);
        //     translatedAdvice = translatedAdvice.charAt(0).toUpperCase() + translatedAdvice.slice(1);
        //     translatedAdvice = translatedAdvice + ".";
        // }

        

        //more needs to be here about making the modal visible and display it properly

    }

    $('.modal-trigger').leanModal();




})