function setColorInfo() {
  "use strict";
var tile = document.querySelectorAll("rect");
var html = document.documentElement;
var output = document.getElementById("output");

  for( var i = 0; i < tile.length; i++ ) {

    tile[i].addEventListener("mouseover", function() {
      html.style.backgroundColor = this.getAttributeNS(null, "fill");
      output.firstChild.nodeValue = this.getAttributeNS(null, "data-color_id");
    });
    tile[i].addEventListener("click", function() {
      html.style.backgroundColor = this.getAttributeNS(null, "fill");
      output.firstChild.nodeValue = this.getAttributeNS(null, "data-color_id");
    });
  }
}
setColorInfo();
