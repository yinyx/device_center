$(document).ready(function(){
    $(".c1").animate({
        height: "70%"
    },1000);
    $(".c2").animate({
        height: "50%"
    },1000);
    $(".c3").animate({
        height: "33%"
    },1000);
    $(".c4").animate({
        height: "23%"
    },1000);
    $(".c5").animate({
        height: "13%"
    },1000);
    $('#container1').hotSpot({
        slideshow : true,
        triggerBy : 'click',
        autoHide : true});
})