chrome.tabs.executeScript(
  null, {code: 'chrome.runtime.sendMessage(location.host);'}
);
chrome.runtime.onMessage.addListener(function(host) {
  var build = document.getElementById('build');
  var input = document.getElementById('input');
  var keyInput = document.getElementById('key');
  keyInput.focus();
  var myKey = localStorage.getItem('key');
  if (myKey) {
    keyInput.value = myKey
  }
  build.addEventListener('click', function() {
      var key = keyInput.value;
      showPwd(host, key);
  })
  input.addEventListener('click', function() {
      var key = keyInput.value;
      showAndInputPwd(host, key);
  })
  keyInput.addEventListener('keydown', function(event){
    var key = keyInput.value;
    if( event.keyCode === 13) {
      showAndInputPwd();
      window.close(host, key);
    }
  })
  var getPwd = function (host, key) {
    var pwd = MD5(MD5(host + MD5('cloudzqy') + key))
    return pwd.slice(0,6) + pwd.slice(-6,-1);
  }
  var showPwd = function (host, key) {
    localStorage.setItem('key', key);
    document.getElementById('password').value = getPwd(host, key);
  }
  var showAndInputPwd = function (host, key) {
    showPwd(host, key);
    chrome.tabs.executeScript(
      null, {code: 'document.querySelectorAll("input[type=password]").forEach(function(el) {el.value = "'+getPwd(host, key)+'"})'}
    );
  }

});
