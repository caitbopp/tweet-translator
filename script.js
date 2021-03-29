$(document).ready(function () {

function getRandomQuote(){
        fetch("https://api.adviceslip.com/advice", {
            "method": "GET",
        })
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            console.log(data.slip.advice);
            translateToYoda(data);
        })
    }

getRandomQuote();

function translateToYoda(data){
    var advice = data.slip.advice;
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
})