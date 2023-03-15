$(document).ready(function(){
    $(".custom-carousel").owlCarousel({
    autoWidth: true,
    loop: true,
    autoplay:true,
    autoplayHoverPause:true,
    responsive:{
        0:{
          items:1,
          loop:true
        },
        600:{
          items:3,
          loop:true
        },
        1000:{
          items:4,
          loop:true
        }
      }
  });
});
  

$(document).ready(function () {
    $(".custom-carousel .item").click(function () {
        $(".custom-carousel .item").not($(this)).removeClass("active");
        $(this).toggleClass("active");
    });
});
$('.play').on('click',function(){
    owl.trigger('play.owl.autoplay',[5000])
})
$('.stop').on('click',function(){
    owl.trigger('stop.owl.autoplay')
})