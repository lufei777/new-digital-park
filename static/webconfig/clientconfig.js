var czClient = (function (window, document) {
    window.isClient = false;
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