import { FC, useEffect, useState } from "react";
import currensy from "../assets/currency.json";
import react from "../react.svg";

interface CurrencyType {
    Flag?: string;
    CountryName: string;
    Currency: string;
    Code: string;
    Rate: number;
}

const Select: FC = () => {
    const [open, setOpen] = useState(false);
    const [select, setSelect] = useState<CurrencyType | null>(null);
    const [result, setResult] = useState<number | null>(null);
    const [currentValue, setCurrentValue] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const currentUsd = currensy.find((currency) => currency.Code === "USD");

    useEffect(() => {
        setSelect(currensy[235]);
    }, []);

    const handleSelect = (curren: CurrencyType) => {
        setSelect(curren);
        setOpen(false);
    };

    const handleCurrent = () => {
        if (currentUsd && select && result) {
            const curren = (result * select.Rate) / currentUsd.Rate;
            setCurrentValue(curren);
        }
    };

    const searchValue = currensy.filter(
        (currency) =>
            currency.CountryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            currency.Code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-md mx-auto mt-16 p-6 bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-indigo-800">Currency Converter</h1>
        <div className="mb-5">
          <label className="block text-lg font-semibold text-gray-800 mb-2">Enter Amount (USD):</label>
          <input
            type="number"
            value={result || ""}
            onChange={(e) => setResult(Number(e.target.value))}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-indigo-400 focus:outline-none transition-shadow text-gray-900 placeholder-gray-400"
            placeholder="Enter amount in USD"
          />
        </div>
  
        <div
          className={`relative mb-5 border rounded-lg p-3 cursor-pointer transition-all hover:shadow-lg ${open ? "border-indigo-500" : "border-gray-300"}`}
          onClick={() => setOpen(!open)}
        >
          {!open && select && (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  className="w-8 h-8 rounded-full"
                  src={select.Flag}
                  alt={select.CountryName}
                />
                <p className="text-gray-800 font-bold text-lg">{`${select.Code} - ${select.Currency}`}</p>
              </div>
              <span className="text-indigo-600 font-bold text-lg">▼</span>
            </div>
          )}
          {open && (
            <div>
              <input
                type="search"
                placeholder="Search currencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="w-full p-3 border-b border-gray-300 focus:outline-none text-gray-700"
              />
              <ul className="absolute w-full bg-white z-10 mt-2 border rounded-lg shadow-xl max-h-48 overflow-y-auto">
                {searchValue.map((curren, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 p-3 hover:bg-indigo-50 cursor-pointer transition-all"
                    onClick={() => handleSelect(curren)}
                  >
                    <img
                      className="w-7 h-7 rounded-full"
                      src={curren.Flag}
                      alt={curren.CountryName}
                    />
                    <p className="text-gray-800 font-medium">{`${curren.Code} - ${curren.Currency}`}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
  
        <button
          onClick={handleCurrent}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg hover:from-purple-600 hover:to-indigo-500 transition-all duration-300 shadow-lg text-lg font-semibold"
        >
          Convert
        </button>
  
        {currentValue !== null && (
          <p className="mt-6 text-center text-xl font-semibold text-indigo-700">
            Converted Value: <span className="text-indigo-900 font-bold">{currentValue.toLocaleString()}</span> {select?.Code}
          </p>
        )}
      </div>
    );
};

export default Select;
