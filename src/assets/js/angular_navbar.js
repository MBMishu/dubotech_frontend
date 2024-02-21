var angular_navbar = function () {
  // Open dropdowns on hover
  if ($(window).width() > 992) {
    $(".navbar-expand-lg .navbar-nav .dropdown").hover(
      function () {
        $(this)
          .find(".dropdown-menu")
          .first()
          .stop(true, true)
          .delay(250)
          .slideDown();
      },
      function () {
        $(this)
          .find(".dropdown-menu")
          .first()
          .stop(true, true)
          .delay(100)
          .slideUp();
      }
    );
  }

  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 50) {
      $(".navbar").addClass("active");
    } else {
      //remove the background property so it comes transparent again (defined in your css)
      $(".navbar").removeClass("active");
    }
  });

  $(".js-scroll-trigger").click(function () {
    $(".navbar-collapse").collapse("hide");
  });
};
