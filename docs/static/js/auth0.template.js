let auth0Client = null;

const configureAuth0Client = async() => {
    auth0Client = await auth0.createAuth0Client({
        domain: "__AUTH0_DOMAIN__",
        clientId: "__AUTH0_CLIENT_ID__"
    });
};

const updateAuth0UI = async() => {
    const isAuthenticated = await auth0Client.isAuthenticated();
    if (isAuthenticated) {
        window.location.href = '/investment-analyser/menu.html';
    }
};