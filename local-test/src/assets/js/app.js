$(document).foundation();





// This will rewitten with a toggle plugin
$(document).ready(function() {
  // Nav icon
  $('#x-menu').click(function() {
    // Get the parent selector and add .open when clicked 
    $(this)
      //.parent()
      .toggleClass('open');
    
    // Make the menu visible
    // Ideally this should be rewritten to take 
    // advantage of the offcanvas
    $("#menu-overlay").toggleClass("menu-show");
  });

});

// TODO... Eventually, if ever?
// Intregrate ScrollClass.JS to change the menu color from white to black dependeding on the background...
