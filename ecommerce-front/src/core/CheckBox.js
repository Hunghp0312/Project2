import React, { useState } from "react";

function CheckBox({ categories, handlerFilters }) {
    const [checked, setChecked] = useState([]);

    const handlerToggle = (c) => () => {
        //return the first index or -1
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked];

        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }

        setChecked(newCheckedCategoryId);
        handlerFilters(newCheckedCategoryId);
    };
    return categories.map((c, i) => (
        <li key={i} className="list-unstyled">
            <input
                onChange={handlerToggle(c._id)}
                type="checkbox"
                className="form-check-input"
                value={checked.indexOf(c._id === -1)}
            ></input>
            <label className="form-check-label">{c.name}</label>
        </li>
    ));
}
export default CheckBox;
