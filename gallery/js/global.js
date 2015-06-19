// URLS
var getUrl = 'http://146.148.2.249:3000/artworks/artwork/';
var postUrl = 'http://146.148.2.249/artworks/updateShareCounter/'
var imgUrl = 'http://146.148.2.249/';
var imgParam;
var postResponse;


// Handle click on share icons.
function shareOn() {
  var name = event.target.className;
  var element = event.target;
  var currentHref = location.href;
  switch (name) {
    case 'fa fa-google-plus':
      postRequest(postUrl + 'googleplus/:' + imgParam);
      element.href = 'https://plus.google.com/share?url=' +
          currentHref;
      break;
    case 'fa fa-facebook':
      postRequest(postUrl + 'facebookplus/:' + imgParam);
      element.href =
          'http://www.facebook.com/sharer.php?t=Example text' +
          '&u=' + currentHref;
      break;
    case 'fa fa-twitter':
      postRequest(postUrl + 'twitterplus/:' + imgParam);
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
function postRequest(url) {
  var myRequest = new XMLHttpRequest();
  myRequest.open('POST', url, true);
  myRequest.send();
}


// Add image to DOM.
function displayImage() {
  var myImage = imgUrl + postResponse.imageURL;
  var img = document.createElement('IMG');
  img.setAttribute('src', myImage);
  img.setAttribute('class', 'my-image');
  document.getElementById('container').appendChild(img);
}


window.addEventListener('load', function() {
  imgParam = location.href.split('id=')[1];
  var createUrl = getUrl + imgParam;
  postResponse = JSON.parse(getRequest(createUrl));
  document.addEventListener('click', shareOn);
  displayImage();
});
