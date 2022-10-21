(function ($) {
  $(".glossary-tag-option").hover(
    function () {
      $(this).addClass("glossary-active-tag");
      $("#glossary-tag-description").css("visibility", "visible");
      $("#glossary-tag-description")
        .children()
        .first()
        .html($(this).attr("data-description"));
    },
    function () {
      $(this).removeClass("glossary-active-tag");
      $("#glossary-tag-description").css("visibility", "hidden");
      $("#glossary-tag-description").children().first().html("__Description__");
    }
  );
})(jQuery);
