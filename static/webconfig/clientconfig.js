var czClient = (function (window, document) {
    window._3DClient = false;
  sessionStorage.setItem('_3DClient', false);
    function isClient() {
        // window._3DClient = true;
      // sessionStorage.setItem('_3DClient', true);
      sessionStorage.setItem('token', token);
    }
    function setTokenByClient(token) {
        isClient();
        sessionStorage.setItem('token', token);
    }
    return {
        setTokenByClient: setTokenByClient
    }
}(window, document))
