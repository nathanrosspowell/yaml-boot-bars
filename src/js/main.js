//o
function applyTemplate(div, script, data) {
    var theTemplateScript = $("#"+script+"-template").html(); 
    var theTemplate = Handlebars.compile(theTemplateScript);
    console.log(div);
    console.log(theTemplate(data));
    $(div).append(theTemplate(data)); 
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// On loaded function.
$(window).bind("load", function () {
    //applyTemplate(".shoesNav", "shoesNav", theData);
    applyTemplate("#navList", "navList", theData);
    applyTemplate("#sections", "sections", theData);
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
