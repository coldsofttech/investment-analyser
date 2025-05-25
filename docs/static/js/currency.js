(function($){
    $.Currency = {
        currencies: [
            { currency: 'GBP', symbol: '£', icon: 'bi-currency-pound' },
            { currency: 'USD', symbol: '$', icon: 'bi-currency-dollar' },
            { currency: 'EUR', symbol: '€', icon: 'bi-currency-euro' },
            { currency: 'INR', symbol: '₹', icon: 'bi-currency-rupee' }
        ],
        getCurrencies: function() {
            return this.currencies;
        },
        getCurrency: function(currency) {
            return this.getCurrencies().find(c => c.currency === currency) || {
                currency: 'Unknown', symbol: '', icon: 'bi-cash'
            };
        },
        defaultCurrency: function() {
            return this.getCurrency('GBP');
        },
        _addIcon: function(selector, icon) {
            $(selector)
                .removeClass((_, c) => (c.match(/\bbi\S*/g) || []).join(' '))
                .addClass(`bi ${icon}`);
        },
        getDefaultCurrency: function(config = {}, selectors = {}) {
            const {
                customCurrency = null, 
                customSymbol = null
            } = config;

            const {
                currencySelector = '#defaultCurrency',
                currencyModal = '#defaultCurrencyModal',
                currencySaveButton = '#saveDefaultCurrency',
                currenciesList = '#defaultCurrencyList'
            } = selectors;

            const self = this;
            const $selector = $(currencySelector);
            const $modal = $(currencyModal);
            const $saveBtn = $(currencySaveButton);
            const $currencyList = $(currenciesList);
            const getCurrentCurrency = () => {
                const stored = localStorage.getItem('defaultCurrency');
                return this.getCurrency(stored) || this.defaultCurrency();
            };
            const updateUI = (currency) => {
                this._addIcon($selector, currency.icon);
                if (customCurrency) $(customCurrency).text(currency.currency);
                if (customSymbol) this._addIcon($(customSymbol), currency.icon);
            };

            const currency = getCurrentCurrency();
            updateUI(currency);

            $selector.on('click', () => {
                const currency = getCurrentCurrency();
                const options = self.getCurrencies()
                    .map(c => `<option value="${c.currency}">${c.currency} (${c.symbol})</option>`)
                    .join('');
                $currencyList.html(options).val(currency.currency);
                bootstrap.Modal.getOrCreateInstance($modal[0]).show();
            });

            $saveBtn.on('click', () => {
                const selected = self.getCurrency($currencyList.val());
                localStorage.setItem('defaultCurrency', selected.currency);
                updateUI(selected);
                bootstrap.Modal.getOrCreateInstance($modal[0]).hide();
            });
        }
    };
})(jQuery);