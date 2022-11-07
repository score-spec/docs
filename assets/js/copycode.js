function copyText(text) {
  let textArea = document.createElement("textarea");
  textArea.textContent = text;
  // make the textarea out of viewport
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.select();
  try {
    return document.execCommand("copy"); // Security exception may be thrown by some browsers.
  } catch (ex) {
    console.warn("Copy to clipboard failed.", ex);
    return prompt("Copy to clipboard: Ctrl+C, Enter", text);
  } finally {
    document.body.removeChild(textArea);
  }
}
+(function ($) {
  $(".highlight").hover(
    function () {
      const highlight = this;
      $(this).append(`
        <div id='copy-code-button' class="copy-code-button"><i class="far fa-copy mr-2"></i>Copy</div>
      `);
      $("#copy-code-button").click(function () {
        const codeElem = $(highlight).children(":first").children(":first");
        const text = codeElem
          .children("span")
          .map(function () {
            return $(this).text();
          })
          .get()
          .join("");
        copyText(text);
        $(this).first().text("Copied!");
      });
    },
    function () {
      $("#copy-code-button").remove();
    }
  );
})(jQuery);
