import React, { useState, Fragment } from "react";

function RadioBox({ prices, handlerFilters }) {
    const [value, setValue] = useState(0);
    const handlerChange = (e) => {
        handlerFilters(e.target.value);
        setValue(e.target.value);
    };
    return prices.map((p, i) => (
        <div key={i}>
            <input
                onChange={handlerChange}
                type="radio"
                name={p}
                className="form-check-input"
                value={`${p._id}`}
            ></input>
            <label className="form-check-label">{p.name}</label>
        </div>
    ));
}
export default RadioBox;
