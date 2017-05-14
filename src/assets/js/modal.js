function keyPress() {
'use strict';

  document.onkeydown = function(evt) {

    evt = evt || window.event;
    if (evt.keyCode == 27) {
      document.querySelector(".modal_item:target").classList.add("is-hidden");
    }
  };

  var tiles = document.querySelectorAll(".tiles li");
  for( var i = 0; i < tiles.length; i++ ) {

    tiles[i].addEventListener("click", function() {
      var modalHidden = document.querySelectorAll(".is-hidden");

      for( var i = 0; i < modalHidden.length; i++ ) {
        modalHidden[i].classList.remove("is-hidden");
      };

    });
  }

}
keyPress();
