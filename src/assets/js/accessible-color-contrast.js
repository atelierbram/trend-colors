function getCorrectTextColor(hex){
'use strict';
/*
      From this W3C document: http://www.webmasterworld.com/r.cgi?f=88&d=9769&url=http://www.w3.org/TR/AERT#color-contrast

      Color brightness is determined by the following formula:
      ((Red value X 299) + (Green value X 587) + (Blue value X 114)) / 1000

      I know this could be more compact, but I think this is easier to read/explain.
      https://codepen.io/davidhalford/pen/ywEva

*/

  var threshold = 130; /* about half of 256. Lower threshold equals more dark text on dark background  */

  var hRed = hexToR(hex);
  var hGreen = hexToG(hex);
  var hBlue = hexToB(hex);

  function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
  function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
  function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
  function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

  var cBrightness = ((hRed * 299) + (hGreen * 587) + (hBlue * 114)) / 1000;
  if (cBrightness > threshold){return "#000000";} else { return "#ffffff";}
}

function colorTile() {
'use strict';
 var tile = document.querySelectorAll(".tiles li");
 var tileSpring = document.querySelectorAll(".tiles-spring li");
 var tileFall = document.querySelectorAll(".tiles-fall li");
 var modal = document.querySelectorAll(".modal_item");

  for( var i = 0; i < tile.length; i++ ) {
    tile[i].style.backgroundColor = tile[i].dataset.color_hex;
    tile[i].style.color = getCorrectTextColor(tile[i].dataset.color_hex);
  }


  for( var i = 0; i < tileSpring.length; i++ ) {

    tileSpring[i].addEventListener("mouseover", function() {
      this.parentNode.parentNode.style.backgroundColor = this.dataset.color_hex;
    });
    tileSpring[i].addEventListener("click", function() {
      this.parentNode.parentNode.style.backgroundColor = this.dataset.color_hex;
    });
  }

  for( var i = 0; i < tileFall.length; i++ ) {

    tileFall[i].addEventListener("mouseover", function() {
      this.parentNode.parentNode.style.backgroundColor = this.dataset.color_hex;
    });
    tileFall[i].addEventListener("click", function() {
      this.parentNode.parentNode.style.backgroundColor = this.dataset.color_hex;
    });
  }

  for( var i = 0; i < modal.length; i++ ) {
    modal[i].style.color = getCorrectTextColor(modal[i].dataset.color_hex);
  }


  var colorWhite = document.querySelectorAll("[style*='color: rgb(255, 255, 255)']");

  for( var i = 0; i < colorWhite.length; i++ ) {
    colorWhite[i].classList.add('color-white');
    colorWhite[i].classList.remove('color-black');
  }

}
colorTile();
