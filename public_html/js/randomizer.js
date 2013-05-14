var settings = {
    perPage: 24,
	minLudumDare: 15
};


function randomize() {
    emptyOutput();
    
    var numberOfCandidates = getNumberOfCandidates();
    var howMany = $("#howMany").val();
	
    for (var i = 0; i < howMany; ++i) {
        var r = random(numberOfCandidates);
        createCandidate($("#output"), r);
    }
}


// Returns random integer between 0 and n-1
function random(n) {
	return Math.floor((Math.random() * n));
}


function createCandidate(area, number) {
    var page = Math.floor(number / settings.perPage) + 1;
    var game = number % settings.perPage + 1;
	
	var link = createLink(page);
	var text = "game "+game;
	
    area.append("<p>"+link+" "+text+"</p>");
}


function createLink(page) {
	var number = selectedLudumDare();
	var start = (page - 1) * settings.perPage;
	
	var type = selectedRadioButton();
	if (type === "all") type = "";
	if (type === "jam") {
		if (number >= 21)
			type = "open";
		else if (number >= 18 && number <= 20)
			type = "gamejam";
	}
	
	return "<a href=\"http://www.ludumdare.com/compo/ludum-dare-"+number+"/?action=preview&q=&etype="+type+"&start="+start+"\">page "+page+"</a>";
}


function getNumberOfCandidates() {
	var selected = selectedRadioButton();
	var i = selectedLudumDare();
	
	if (selected === "all")
		return ludumEntries[i-1][0] + ludumEntries[i-1][1];
	if (selected === "compo")
		return ludumEntries[i-1][0];
	if (selected === "jam")
		return ludumEntries[i-1][1];
}


function selectedRadioButton() {
	if ($("input[value='all']:checked").length > 0)
		return "all";
	else if ($("input[value='compo']:checked").length > 0)
		return "compo";
	else if ($("input[value='jam']:checked").length > 0)
		return "jam";
}


function createDropDownSelect() {
	for (var i = ludumEntries.length; i >= settings.minLudumDare; --i) {
		$("#ludumDareNumber").append("<option value=\""+i+"\">"+i+"</option>");
	}
}


function createRadioButtonTexts() {
	emptyOutput();
	
	var i = selectedLudumDare();
	var compoEntries = ludumEntries[i-1][0];
	var jamEntries = ludumEntries[i-1][1];
	
	$("#labelAll").empty();
	$("#labelAll").append("All Entries ("+ (compoEntries+jamEntries) +")");
	$("#labelCompo").empty();
	$("#labelCompo").append("48 Hour Compo Entries ("+ compoEntries +")");
	$("#labelJam").empty();
	$("#labelJam").append("Jam Entries ("+ jamEntries +")");
	
	$("#info").empty();
	if (i < 18)
		$("#info").append("<b>Note that before Ludum Dare 18 there was only competition.</b>");
}


function emptyOutput() {
	$("#output").empty();
}


function selectedLudumDare() {
	return $("#ludumDareNumber").val();
}


$(document).ready(function() {
    createDropDownSelect();
    createRadioButtonTexts();
	
	$("#ludumDareNumber").change(createRadioButtonTexts);
	$("input[name='chooser']").change(emptyOutput);
    $("#randomizeButton").click(randomize);
});
