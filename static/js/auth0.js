let auth0Client = null;

const configureAuth0Client = async() => {
    auth0Client = await auth0.createAuth0Client({
        domain: "coldsofttech.uk.auth0.com",
        clientId: "ftVRPjwMbmDUAxI8hyy0qMAakFF3FkpP"
    });
};

const isAuth0Authenticated = async() => {
    await auth0Client.isAuthenticated();
}

const updateAuth0UI = async() => {
    const isAuthenticated = await auth0Client.isAuthenticated();
    if (isAuthenticated) {
        window.location.href = '/investment-analyser/menu.html';
    }
};

const loginAuth0 = async() => {
    await auth0Client.loginWithRedirect({
        authorizationParams: {
            redirect_uri: `${window.location.origin}/investment-analyser/menu.html`
        }
    });
};

const logoutAuth0 = async() => {
    await auth0Client.logout({
        logoutParams: {
            returnTo: `${window.location.origin}/investment-analyser/index.html`
        }
    });
};

const handleAuth0RedirectCallback = async() => {
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
        await auth0Client.handleRedirectCallback();
        window.history.replaceState({}, document.title, "/investment-analyser/menu.html");
        updateAuth0UI();
    }
};

const requireAuth = async() => {
    const isAuthenticated = await auth0Client.isAuthenticated();
    if (!isAuthenticated) {
        const msg = encodeURIComponent("Not authenticated.");
        window.location.href = `/investment-analyser/index.html?error=${msg}`;
    }
};

const getAuth0UserInfo = async() => {
    return await auth0Client.getUser();
};