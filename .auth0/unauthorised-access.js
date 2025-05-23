exports.onExecutePostLogin = async (event, api) => {
    const allowedEmails = [
    ];

    const userEmail = event.user.email;
    if (!userEmail || !allowedEmails.includes(userEmail)) {
        api.access.deny("Unauthoried access!");
    }
};