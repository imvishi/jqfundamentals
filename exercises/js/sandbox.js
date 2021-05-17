$(document).ready(() => {

  // 1. Select all of the div elements that have a class of "module".
  $("div.module").css("background", "#ff00ff");

  // 2. Come up with three selectors that you could use to get the third item in the #myList unordered list. Which is the best to use? Why?
  // First solution
  $('#myList li').eq(2).css("background", "#ffff00");
  // Second solution
  $('#myList li:eq(2)').css("background", "#ffff00");
  // Third solution
  $('#myList li:nth-child(3)').css("background", "#ffff00");

  // 3. Select the label for the search input using an attribute selector.
  $("label[for='q']").css("background", "#ffff00");

  // 4. Figure out how many elements on the page are hidden
  const hiddenElement = $('*').filter(function() {
    return $(this).is(":hidden");
  });
  console.log(hiddenElement.length);

  // 5. Figure out how many image elements on the page have an alt attribute.
  const imageWithAlt = $('img').filter(function() {
    return $(this).attr("alt");
  });
  console.log(imageWithAlt.length);

  // 6. Select all of the odd table rows in the table body.
  $('body tr:odd').css('background', '#ffff00');

});
