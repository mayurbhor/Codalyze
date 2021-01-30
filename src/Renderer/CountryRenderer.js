import React, {useState} from 'react';

function CountryRenderer(props) {
    const[country, setCountry] = useState(props.value);

    const onCountryChange = (event) => {
        props.onCountryChange(event.target.value);
        setCountry(event.target.value);
    }
    return(
        <div>
            <select value={country} onChange={onCountryChange}>
                <option value="india"> India </option>
                <option value="usa"> USA </option>
            </select>
        </div>
    )
}

export default CountryRenderer;