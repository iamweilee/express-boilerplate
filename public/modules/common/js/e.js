window.onload = function() {
  var s = 5, timeEl = getEl('time');
  
  setText(timeEl, s);
  var timer = setInterval(function() {
    s--;
    if (!s) {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      location.replace('/');
    }
    else {
      setText(timeEl, s);
    }
  }, 1000);

  getEl('link').addEventListener('click', function() {
    location.replace('/');
  }, false);

  function getEl(id) {
    return document.getElementById(id);
  }

  function setText(el, text) {
    'textContent' in el ? (el.textContent = text) : (el.innerText = text);
  }
};