//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// On loaded function.
$(window).bind("load", function () {
    console.log("$ LOADED");
    var shoesData = [{name:"Nike", price:199.00 }, {name:"Loafers", price:59.00 }, {name:"Wing Tip", price:259.00 }];
    //Get the HTML from the template   in the script tag
    var theTemplateScript = $("#shoe-template").html(); 
    //Compile the template
    var theTemplate = Handlebars.compile (theTemplateScript); 
    $(".shoesNav").append (theTemplate(shoesData)); 
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /* affix the navbar after scroll below header */
    $('#nav').affix({
          offset: {
            top: $('header').height()-$('#nav').height()
          }
    }); 
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /* highlight the top nav as scrolling occurs */
    $('body').scrollspy({ target: '#nav' })
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /* smooth scrolling for scroll to top */
    $('.scroll-top').click(function(){
      $('body,html').animate({scrollTop:0},1000);
    })
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /* smooth scrolling for nav sections */
    $('#nav .navbar-nav li>a').click(function(){
      var link = $(this).attr('href');
      var posi = $(link).offset().top+20;
      $('body,html').animate({scrollTop:posi},700);
    })
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~