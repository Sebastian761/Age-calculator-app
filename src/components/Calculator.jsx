import React, { useState } from 'react'
import './styles/calculator.css'

export const Calculator = () => {

    const [dayValue, setDayValue] = useState(null)
    const [monthValue, setMonthValue] = useState(null)
    const [yearValue, setYearValue] = useState(null)

    const [dayAge, setDayAge] = useState('--')
    const [monthAge, setMonthAge] = useState('--')
    const [yearAge, setYearyAge] = useState('--')

    const [dayError, setDayError] = useState('')
    const [monthError, setMonthError] = useState('')
    const [yearError, setYearError] = useState('')


    const date  = new Date()
    let day = date.getDate()
    let month = 1 + date.getMonth()
    let year = date.getFullYear()

    const daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    function changeColor() {
        style = {
            borderColor: 'red'
        }
    }

    function validate() {
        const inputs = document.querySelectorAll("input")
        
        let validator = true
        inputs.forEach((i) => {
            if (dayValue < 1 || dayValue > 31) {
                setDayError('Must be a valid day')
                validator = false
            } else if (monthValue < 1 || monthValue > 12) {
                validator = false
                setMonthError('Must be a valid month')
            } else if (yearValue > year){
                validator = false
                setYearError('Must be in the past')
            } else {
                validator = true
                setDayError('')
                setMonthError('')
                setYearError('')
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
                            <small className='error' style={{if (dayError) {
                                changeColor()
                            }}}>{dayError}</small>
                        </div>
                        <div className='input__container'>
                            <label htmlFor="month">MONTH</label>
                            <input type="number" required={true}  placeholder='MM' onChange={(event) => setMonthValue(event.target.value)}/>
                            <small className='error' >{monthError}</small>
                        </div>
                        <div className='input__container'>
                            <label htmlFor="year">YEAR</label>
                            <input type="number" required={true}   placeholder='YYYY' onChange={(event) => setYearValue(event.target.value)}/>
                            <small className='error' >{yearError}</small>
                        </div>
                    </div>
                    <div className='button__container'>
                        <hr className='divider' />
                        <button onClick={handleSubmit}>
                            <img src='/down-arrow.png' className='arrow__icon'></img>
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
