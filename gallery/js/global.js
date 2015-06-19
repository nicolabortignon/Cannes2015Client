// URLS
var getUrl = 'http://146.148.2.249:3000/artworks/artwork/';
var postUrl = 'http://146.148.2.249:3000/artworks/updateShareCounter/'
var imgUrl = 'http://146.148.2.249/';
var imgParam;
var postResponse;


// Handle click on share icons.
function shareOn(event) {
  var name = event.target.className;
  var element = event.target;
  var currentHref = location.href;
  switch (name) {
    case 'fa fa-google-plus':
      getRequest(postUrl + 'googleplus/' + imgParam);
      element.href = 'https://plus.google.com/share?url=' +
          postResponse.shortURL;
      break;
    case 'fa fa-facebook':
      getRequest(postUrl + 'facebook/' + imgParam);
      // element.href =
            // 'https://www.facebook.com/dialog/share?' +
            // 'app_id=650727728361999' +
            // '&display=popup' +
            // '&href=http://146.148.2.249/' +
            // '&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer';
            FB.ui(
             {
              method: 'share',
              href: 'http://146.148.2.249/gallery/?id=9'
            }, function(response){});
      break;
    case 'fa fa-twitter':
      getRequest(postUrl + 'twitter/' + imgParam);
      element.href = 'https://twitter.com/intent/tweet?text=' +
          'Example text @GOOGLECANNES ' +
          postResponse.shortURL + '&hashtags=hello,anotherone';
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
