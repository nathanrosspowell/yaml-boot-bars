/*! yaml-boot-bars - v0.0.1 - 2014-06-13 */function applyTemplate(a,b,c){var d=$("#"+b+"-template").html(),e=Handlebars.compile(d);$(a).append(e(c))}$(window).bind("load",function(){applyTemplate("#navList","navList",theData),applyTemplate("#sections","sections",theData)});