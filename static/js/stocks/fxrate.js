class FXRate {
    constructor(fromCurrency, toCurrency) {
        this.key = `${fromCurrency}${toCurrency}=X`;
        this.data = null;
        this.metadata = null;
    }

    async init() {
        const summary = await this.getSummary();
        this.data = summary['fxRate'];
        this.data['key'] = this.key;
        this.metadata = summary['metadata'];
    }

    async #makeAjaxRequest(url, isAsync = true) {
        return $.ajax({
            url: url,
            async: isAsync,
            dataType: 'json'
        });
    }

    async getSummary() {
        return await this.#makeAjaxRequest(
            `https://coldsofttech.github.io/investment-analyser-data/fxrates/${this.key}.json`
        );
    }
}