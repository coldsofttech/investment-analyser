let auth0Client = null;

const configureAuth0Client = async() => {
    auth0Client = await auth0.createAuth0Client({
        domain: "coldsofttech.uk.auth0.com",
        clientId: "ftVRPjwMbmDUAxI8hyy0qMAakFF3FkpP"
    });
};