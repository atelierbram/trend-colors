;(function (window, document, undefined) {
  'use strict';
  // Add a class when the script loads
  document.documentElement.classList.add( 'has-index-script-loaded' );

  document.addEventListener('click', function (event) {

    // Make sure the .toggle-tiles link was clicked
    if ( !event.target.classList.contains('toggle-tiles') ) return;
   // Prevent default
    event.preventDefault();
   // Show or hide the content
    var content = document.querySelector( event.target.hash );
    if ( !content ) return;
    content.classList.toggle( 'is-active' );
    content.parentNode.classList.toggle('is-in-view');

  }, false);


})(window, document);


;(function () {
  'use strict';
  var page = document.querySelector('#page');
  var tile = document.querySelectorAll(".tile");

  var varSel = document.createElement('section');
  varSel.setAttribute('class', 'variables-selection');
  varSel.setAttribute('id', 'variablesSelection');

  var varSelList = document.createElement('ul');
  varSelList.setAttribute('class', 'variables-selection_list');
  varSelList.setAttribute('id', 'variablesSelectionList');

  var toggleView = document.createElement('li');
  toggleView.setAttribute('class', 'toggle-view');
  toggleView.setAttribute('id', 'toggleView');

  var toggleViewImgCollapse = document.createElement('span');
  toggleViewImgCollapse.setAttribute('class', 'toggle-view-image-collapse');

  // var toggleViewImgExpand = document.createElement('span');
  // toggleViewImgExpand.setAttribute('class', 'toggle-view-image-expand');
  //
  page.appendChild(varSel);
  varSel.appendChild(varSelList);
  varSelList.appendChild(toggleView);
  toggleView.appendChild(toggleViewImgCollapse);
  // toggleView.appendChild(toggleViewImgExpand);

  toggleView.addEventListener('click', function(event) {

    this.parentNode.parentNode.classList.toggle('is-offscreen');

    event.preventDefault();
  }, false);


  for( var i = 0; i < tile.length; i++ ) {

    tile[i].addEventListener("click", function(event) {

      var clonedEl = this.cloneNode(true);

      varSelList.appendChild(clonedEl);

      event.preventDefault();
    }, false);
  }

})();
