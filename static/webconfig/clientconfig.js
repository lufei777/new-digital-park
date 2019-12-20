var czClient = (function (window, document) {
    // window._3DClient = false;
    Cookies.set('_3DClient', false);
    function isClient() {
        // window._3DClient = true;
      Cookies.set('_3DClient', true);
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
