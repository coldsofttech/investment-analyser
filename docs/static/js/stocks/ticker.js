class Ticker {
    constructor(ticker, stocksOwned = null, avgPrice = null) {
        this.tickerCode = ticker;
        this.stocksOwned = stocksOwned;
        this.avgPrice = avgPrice;
        this.data = null;
        this.metadata = null;
    }

    async init() {
        const summary = await this.getSummary();
        this.data = summary[this.tickerCode];
        this.metadata = summary['metadata'];
        this.data['localInfo'] = {
            stocksOwned: this.stocksOwned,
            avgPrice: this.avgPrice
        }

        if (!this.data.data || this.data.data.length === 0) {
            throw new Error(`${this.tickerCode}: Stocks data has discrepancies.`);
        }
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
            `https://coldsofttech.github.io/investment-analyser-data/tickers/${this.tickerCode}.json`
        );
    }
}