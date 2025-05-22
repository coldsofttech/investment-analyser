exports.onExecutePostLogin = async (event, api) => {
    const allowedEmails = [
    ];

    const userEmail = event.user.email;
    const userEmailVerified = event.user.email_verified;

    if (!userEmail || !userEmailVerified || !allowedEmails.includes(userEmail)) {
        api.access.deny("Unauthorized, missing, or unverified email");
    }
};