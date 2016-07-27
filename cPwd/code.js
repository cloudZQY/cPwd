chrome.tabs.executeScript(
  null, {code: 'chrome.runtime.sendMessage(location.host);'}
);
chrome.runtime.onMessage.addListener(function(host) {
  var build = document.getElementById('build');
  var input = document.getElementById('input');
  var key = document.getElementById('key').value;
  build.addEventListener('click', function() {
      showPwd();
  })
  input.addEventListener('click', function() {
      showAndInputPwd();
  })
  document.getElementById('key').addEventListener('keydown', function(event){
    if( event.keyCode === 13) {
      showAndInputPwd();
      window.close();
    }
  })
  var getPwd = function (host, key) {
    var pwd = MD5(MD5(host + MD5('cloudzqy') + key))
    return pwd.slice(0,6) + pwd.slice(-6,-1);
  }
  var showPwd = function (host, key) {
    document.getElementById('password').value = getPwd(host, key);
  }
  var showAndInputPwd = function (host, key) {
    showPwd(host, key);
    chrome.tabs.executeScript(
      null, {code: 'document.querySelectorAll("input[type=password]").forEach(function(el) {el.value = "'+getPwd(host, key)+'"})'}
    );
  }

});
