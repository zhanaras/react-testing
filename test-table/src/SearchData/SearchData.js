import React, {useState} from 'react'

export default props => {

    const [value, setValue] = useState('')

    const valueChangeHandler = event => {
        setValue(event.target.value)
    }

    return(
        <div class="input-group mb-3 mt-3">

        <input 
            type="text" 
            className="form-control" 
            placeholder="Введите данные..." 
            onChange = {valueChangeHandler}
            value = {value} />

        <div class="input-group-append">
        <button className="btn btn-outline-secondary" 
                    onClick = {() => props.onSearch(value)}>
                Поиск</button>
         </div>
        </div>
    )
}
