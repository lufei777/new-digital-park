var czClient = (function (window, document) {
    window._3DClient = false;
    function isClient() {
        window._3DClient = true;
    }
    function setTokenByClient(token) {
        isClient();
        sessionStorage.setItem('token', token);
    }
    return {
        setTokenByClient: setTokenByClient
    }
}(window, document))
