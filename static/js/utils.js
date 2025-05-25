function loadError() {
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('error');

    if (msg && msg !== null && msg !== undefined) {
        return displayError(decodeURIComponent(msg));
    } else {
        return removeError();
    }
}

function removeError({
    errorContainer = '#errorMessageContainer',
    errorElementId = '#errorMessage'
} = {}) {
    $(errorElementId).hide();
    $(errorContainer).html();
}

function displayError(message, {
    redirect = false,
    redirectUrl = '',
    source = '',
    errorContainer = '#errorMessageContainer',
    errorElementId = '#errorMessage'
} = {}) {
    if (redirect) {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('error', message);

        if (redirectUrl) {
            const params = encodeURIComponent(urlParams.toString());
            if (redirectUrl.includes('{source}')) {
                const finalUrl = redirectUrl.replace('{source}', source);
                window.location.href = `/investment-analyser/${finalUrl}?${params}`;
            } else {
                window.location.href = `/investment-analyser/${redirectUrl}?${params}`;
            }
        } else {
            console.warn('Redirect requested but no redirectUrl provided.');
        }
    } else {
        const $error = $(errorElementId);
        
        if ($error.length) {
            $error.text(message).show();
        } else {
            $(errorContainer).html(`
                <div class="alert alert-danger" role="alert" id="${errorElementId.replace('#', '')}">${message}</div>
            `);
        }
    }
}