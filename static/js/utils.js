(function($) {
    $.Error = {
        loadError: function() {
            const urlParams = new URLSearchParams(window.location.search);
            const msg = urlParams.get('error');

            if (msg && msg !== null && msg !== undefined) {
                return $.Error.displayError(decodeURIComponent(msg));
            } else {
                return $.Error.removeError();
            }
        },
        removeError: function({
            errorContainer = '#errorMessageContainer',
            errorElementId = '#errorMessage'
        } = {}) {
            $(errorElementId).hide().text('');
            $(errorContainer).hide();
        },
        displayError: function(message, {
            redirect = false,
            redirectUrl = '',
            source = '',
            errorContainer = '#errorMessageContainer',
            errorElementId = '#errorMessage'
        } = {}) {
            if (redirect) {
                const urlParams = new URLSearchParams(window.location.search);
                urlParams.set('error', message);

                const queryString = urlParams.toString();
                if (redirectUrl) {
                    const finalUrl = redirectUrl.includes('{source}')
                        ? redirectUrl.replace('{source}', source)
                        : redirectUrl;

                    window.location.href = `/investment-analyser/${finalUrl}?${queryString}`;
                } else {
                    console.warn('Redirect requested but no redirectUrl provided.');
                }
            } else {
                const $error = $(errorElementId);
                const $container = $(errorContainer);

                if ($error.length) {
                    $error.text(message).show();
                    $container.show();
                } else {
                    $container.html(`
                        <div class="alert alert-danger" role="alert" id="${errorElementId.replace('#', '')}">${message}</div>
                    `).show();
                }
            }
        }
    }
})(jQuery);