var CZClient = (function (window, document) {
  function setToken(token) {
    localStorage.setItem('token', token);
    localStorage.setItem('isCZClient', true);
    window.location.reload();
  }
  return {
    setToken: setToken
  }
}(window, document));