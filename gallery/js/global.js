// URLS
var getUrl = 'http://146.148.2.249:3000/artworks/artwork/';
var imgUrl = 'http://146.148.2.249/';


// Handle click on share icons.
function shareOn() {
  var name = event.target.className;
  var element = event.target;
  var currentHref = location.href;
  switch (name) {
    case 'fa fa-google-plus':
      element.href = 'https://plus.google.com/share?url=' +
          currentHref;
      break;
    case 'fa fa-facebook':
      element.href =
          'http://www.facebook.com/sharer.php?t=Example text' +
          '&u=' + currentHref;
      break;
    case 'fa fa-twitter':
      element.href = 'https://twitter.com/intent/tweet?text=' +
          'Example text @GOOGLECANNES ' +
          currentHref;
      break;
  }
};


// Handle GET request.
function getRequest(url) {
  var myRequest = new XMLHttpRequest();
  myRequest.open('get', url, false);
  myRequest.send();
  return myRequest.responseText;          
}


// Handle POST request
function postRequest() {
  var myRequest = new XMLHttpRequest();
}


// Get Param(id) from url, then get the image using the param.
// Add image to DOM.
function getImage() {
  var imgParam = location.href.split('id=')[1];
  var createUrl = getUrl + imgParam;
  var json_obj = JSON.parse(getRequest(createUrl));
  var myImage = imgUrl + json_obj.imageURL;
  var img = document.createElement('IMG');
  img.setAttribute('src', myImage);
  img.setAttribute('class', 'my-image');
  document.getElementById('container').appendChild(img);
  // console.log(img);
  // var element = document.getElementsByTagName('BODY');
  // element[0].style.backgroundImage = 'url(' + myImage + ')';
}


window.addEventListener('load', function() {
  document.addEventListener('click', shareOn);
  getImage();
});
