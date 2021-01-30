import React, {useState} from 'react';

function GenderRenderer(props) {
    const[gender, setGender] = useState(props.value);

    const onGenderChange = (event) => {
        props.onGenderChange(event.target.value);
        setGender(event.target.value);
    }
    return(
        <div>
            <select value={gender} onChange={onGenderChange}>
                <option value="male"> Male </option>
                <option value="female"> Female </option>
            </select>
        </div>
    )
}

export default GenderRenderer;