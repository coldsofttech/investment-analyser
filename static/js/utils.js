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

(function($) {
    $.Breadcrumb = {
        items: [],
        container: '#breadcrumb',
        isMobileView: window.innerWidth < 768,

        loadBreadcrumb: function(items, container = '#breadcrumb') {
            this.items = items;
            this.container = container;

            const $breadcrumb = $(container);
            const isMobile = window.innerWidth < 768;

            $breadcrumb.empty();
            if (isMobile && items.length > 1) {
                const prevItem = items[items.length - 2];
                $breadcrumb.html(`
                    <li class="breadcrumb-separator mobile">&#x2039;</li>
                    <li class="breadcrumb-item">
                        <a href="${prevItem.url}">${prevItem.label}</a>
                    </li>
                `);
            } else {
                let content = '';
                items.forEach((item, idx) => {
                    if (idx > 0) {
                        content += `<li class="breadcrumb-separator">&#8594;</li>`;
                    }

                    if (item.url && idx < items.length - 1) {
                        content += `
                            <li class="breadcrumb-item">
                                <a href="${item.url}">${item.label}</a>
                            </li>
                        `;
                    } else {
                        content += `
                            <li class="breadcrumb-item active" aria-current="page">${item.label}</li>
                        `;
                    }
                });

                $breadcrumb.html(content);
            }

            this.isMobileView = isMobile;
        },

        handleResize: function() {
            const currentMobile = window.innerWidth < 768;
            if (currentMobile !== this.isMobileView) {
                this.loadBreadcrumb(this.items, this.container);
            }
        },

        initResizeListener: function() {
            let resizeTimer;
            $(window).on('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    this.handleResize();
                }, 200);
            });
        }
    };
})(jQuery);