$(document).ready(function () {

//the button id needs to be added below
var randomGeneratorBtn = $("#");
//the button id needs to be added below
var translateBtn = $("#");
var advice;

// $(randomGeneratorBtn).click(getRandomQuote());

function getRandomQuote(){
    fetch("https://api.adviceslip.com/advice", {
        "method": "GET",
    })
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        console.log(data.slip.advice);
        displayQuote(data);
    })
}

function displayQuote(data){
    advice = data.slip.advice;
    //this will display the div so that the preview of the quote will show up
    //.hidden is intended to be: display:none initially
    $(".hidden").removeClass("hidden");
    //#text-display is the element that will display the random quote
    $("#text-display").text(advice);
}

$(translateBtn).click(displayTranslatedQuote());

function displayTranslatedQuote(){
    translateToYoda();
}

function translateToYoda(){
    var yodaURL = "https://api.funtranslations.com/translate/yoda.json?text=" +
    advice;
    
    fetch(yodaURL, {
        "method": "GET",
        "headers": {
            "X-Funtranslations-Api-Secret": "vhS2_Udw2JFBuXRd2bX68weF"
        }
    })
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        console.log(data.contents.translated);
        showFinalResult(data);
    })
  }

function showFinalResult(data){
    var translatedAdvice = data.contents.translated;
    
    $("#").text(translatedAdvice);

    //more needs to be here about making the modal visible and display it properly

}



})