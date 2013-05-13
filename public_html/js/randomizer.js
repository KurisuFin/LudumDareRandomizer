function randomize() {
    var n = $("#count")[0].value;
    
    createCandidates(10);
}

function createCandidates(amount) {
    var area = $("#outputArea");
    
    //$("#outputArea").empty();
    
    var numberOfCandidates = 5;
    
    for (var i=0; i<amount; ++i) {
        var random = Math.floor((Math.random() * numberOfCandidates) + 1);
        printCandidate(area, random);
    }
}

function cleareElements(area) {
    var elements = $("#outputArea").children();
}


function printCandidate(area, number) {
    var elem = document.createElement("p");
    elem.appendChild(document.createTextNode(number));
    area.add(elem);
}


$(document).ready(function() {
    $("#randomizeButton")[0].addEventListener("click", randomize);
});
