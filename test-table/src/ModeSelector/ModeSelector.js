import React from 'react'

export default props => {

const shortLink = `http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`
const longLink = `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`

    return (
        <div style={{display: 'flex', justifyContent: 'center', padding: '360px 0px'}} >
            <button onClick = {() => props.onSelect(shortLink)} className="btn btn-outline-dark">32 elements</button>
            <button onClick = {() => props.onSelect(longLink)} className="btn btn-outline-dark">1000 elements</button>
        </div>
    )
}