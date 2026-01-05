const { useState, useMemo } = React;

export function CurrencyConverter() {
  const [quantity, setQuantity] = useState(1);
  const [strcurr, setStrcurr] = useState("USD");
  const [trgcurr, setTrgcurr] = useState("EUR");

  const exchangeRate = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.74,
    JPY: 157.06,
  }

  const convertCurrency = useMemo(() => {
    //IF start currency is empty RETURN empty object
    if(!strcurr) return {};
    
    //CONVERT quantity to a number
    //IF quantity is not a valid number RETURN empty object
    const amount = Number(quantity);
    if(!Number.isFinite(amount)) return {};

    //GET the exchange rate for the start currency
    //IF start rate does not exist RETURN empty object
    const strRate = exchangeRate[strcurr];
    if(!strRate) return {};

    //CONVERT quantity to base currency (USD)
    //base amount = quantity divided by start rate
    const baseAmount = amount / strRate;

    //CREATE empty object called result
    const result = {};

    //FOR EACH currency in exchange rate list:
      //GET currency code
      //GET currency rate
      //CALCULATE converted amount:
        //base amount multiplied by currency rate
      //STORE result using currency code as key
    for(const[code, rate] of Object.entries(exchangeRate)){
      result[code] = baseAmount * rate
    }
    return result;

  }, [quantity, strcurr]);

  const converted = convertCurrency[trgcurr];

  return (
    <div
      className="cvt-container"
    >
      <form>
        <h1>Currency Converter</h1>
        <label>EUR to GBP Conversion
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
          />
        </label>
        <label>Start Currency:<br/>
          <select
            value={strcurr}
            onChange={(e) => setStrcurr(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
          </select>
        </label>
        <label>Target Currency:<br/>
          <select
            value={trgcurr}
            onChange={(e) => setTrgcurr(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
          </select>
        </label>
        <div
          className="cvt-result"
        >
          <h2>Converted Amount:</h2>
          <p>{converted == null ? "" : converted.toFixed(2)} {trgcurr}</p>
        </div>
      </form>
    </div>
  )
}