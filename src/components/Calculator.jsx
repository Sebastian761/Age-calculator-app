import React, { useRef, useState } from 'react'
import './styles/calculator.css'

export const Calculator = () => {

    const [dayValue, setDayValue] = useState(null)
    const [monthValue, setMonthValue] = useState(null)
    const [yearValue, setYearValue] = useState(null)

    const [dayAge, setDayAge] = useState('--')
    const [monthAge, setMonthAge] = useState('--')
    const [yearAge, setYearyAge] = useState('--')


    const date  = new Date()
    let day = date.getDate()
    let month = 1 + date.getMonth()
    let year = date.getFullYear()

    const daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    function validate() {
        const inputs = document.querySelectorAll("input")
        let validator = true
        inputs.forEach((i) => {
            const parent = i.parentElement
            if(!i.value) {
                i.style.borderColor = 'red'
                parent.querySelector("small").innerText="This field is required."
                validator = false
            } else if (monthValue >12) {
                monthValue.style.borderColor = 'red'
                monthValue.parent.querySelector("small").innerText="Must be a valid number."
                validator = false
            } else if (dayValue > 31) {
                dayValue.style.borderColor = 'red'
                dayValue.parentelement.querySelector("small").innerText="Must be a valid number."
            } else {
                i.style.borderColor = "black"
                parent.querySelector("small").innerText = ""
                validator = true
            }
        })
        return validator
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (validate()) {
            if (dayValue > day) {
                day = day + daysOfMonth[month - 1]
                month = month - 1
            }
            if (monthValue > month) {
                month = month + 12
                year= year -1
            }

            const d = day - dayValue
            setDayAge(d)

            const m = month - monthValue
            setMonthAge(m)

            const y = year - yearValue
            setYearyAge(y)

        }
    }
    
    return (
            <section className='form__container'>
                <form className='date__form'>
                    <div className='date__container'>
                        <div className='input__container'>
                            <label htmlFor='day'>DAY</label>
                            <input type="number" required={true} name='day' placeholder='DD'  onChange={(event) => setDayValue(event.target.value)}/>
                            <small></small>
                        </div>
                        <div className='input__container'>
                            <label htmlFor="month">MONTH</label>
                            <input type="number" required={true}  placeholder='MM' onChange={(event) => setMonthValue(event.target.value)}/>
                            <small></small>
                        </div>
                        <div className='input__container'>
                            <label htmlFor="year">YEAR</label>
                            <input type="number" required={true}   placeholder='YYYY' onChange={(event) => setYearValue(event.target.value)}/>
                            <small></small>
                        </div>
                    </div>
                    <div className='button__container'>
                        <hr className='divider' />
                        <button onClick={handleSubmit}>
                            <img src='./src/assets/down-arrow.png' className='arrow__icon'></img>
                        </button>
                    </div>
                </form>
                <div className='total__container'>
                    <div className='years__container age'>
                        <span>{yearAge}</span>
                        <p>years</p>
                    </div>
                    <div className='months__container age'>
                        <span>{monthAge}</span>
                        <p>months</p>
                    </div>
                    <div className='days__container age'>
                        <span>{dayAge}</span>
                        <p>days</p>
                    </div>
                </div>
            </section>
    )
}
