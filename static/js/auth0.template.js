let auth0Client = null;

const auth0Config = {
    domain: "__AUTH0_DOMAIN__",
    client_id: "__AUTH0_CLIENT_ID__",
    redirect_uri: window.location.origin + "/menu.html"
};

async function initAuth0() {
    auth0Client = await auth0.createAuth0Client(auth0Config);
}

async function login() {
    try {
        await auth0Client.loginWithRedirect();
    } catch (err) {
        const msg = encodeURIComponent(err.message || "Login failed");
        window.location.href = `index.html?error=${msg}`;
    }
}

async function logout() {
    auth0Client.logout({
        returnTo: window.location.origin + "/index.html"
    });
}

async function handleRedirectCallbackIfPresent() {
    if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
        try {
            await auth0Client.handleRedirectCallback();
            window.history.replaceState({}, document.title, "/menu.html");
        } catch (err) {
            const msg = encodeURIComponent(err.message || "Auth redirect error");
            window.location.href = `index.html?error=${msg}`;
        }
    }
}

async function requireAuth() {
    const isAuthenticated = await auth0Client.isAuthenticated();
    if (!isAuthenticated) {
        const msg = encodeURIComponent("Not Authenticated");
        window.location.href = `index.html?error=${msg}`;
    }
}

async function getUserInfo() {
    return await auth0Client.getUser();
}