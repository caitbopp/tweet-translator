$(document).ready(function () {

//the button id needs to be added below
var randomGeneratorBtn = $("#random-generator-btn");
//the button id needs to be added below
var translateBtn = $("#translate-btn");
var advice;

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
    })
}

randomGeneratorBtn.click(getRandomQuote);

function displayQuote(data){
    advice = data.slip.advice;
    //this will display the div so that the preview of the quote will show up
    //.hidden is intended to be: display:none initially
    $(".hidden").removeClass("hidden");
    //#text-display is the element that will display the random quote
    $("#preview-text").text(advice);
}

translateBtn.click(displayTranslatedQuote);




})