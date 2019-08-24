/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import './styles.scss';

export class InputForm extends React.Component {

    state = {
        showDropdown: 'none',
        mouseOnDropdown: false,
        phoneBook: {},
        numbers: [],
        sortAsc: false,
        maxMin: {},
        error: false
    }


    handleInputChange = event => {
        const { name, value } = event.target;
        if(isNaN(value)) {
            this.setState({error: true});
        } else if(!isNaN(value)) {
            if(value < 10000 && value > 0) {
                this.setState({error: false});
                this.setState({ phoneBook: {[name]: value }});
            } else if(value >= 10000 || value <= 0) {
                this.setState({error: true});
            }
        }
    }

    handleGeneratePhoneNumber = event => {
        event.preventDefault();
        const mobileNumbers = [];
        const { phoneBook } = this.state;
        for(let i=0; i < phoneBook.amount; i++) {
            const rand = Math.ceil(Math.random() * 100000000) + "";
            if(rand.length < 8) {
                mobileNumbers.push("07" + rand + Math.floor(Math.random() * 10));
            } else if (rand.length > 8) {
                mobileNumbers.push('07'+rand.slice(0, -1));
            } else {
                mobileNumbers.push('07'+rand);
            }
        }
        this.setState({numbers: mobileNumbers})
        this.updateSte(mobileNumbers);
        localStorage.setItem("numbers", mobileNumbers);
    }

    updateSte = (mobileNumbers) => {
        const maxMinn = {
            max: mobileNumbers && Math.max(...mobileNumbers),
            min: mobileNumbers && Math.min(...mobileNumbers)
        }
        this.setState({maxMin: maxMinn});
        localStorage.setItem('maxMini', JSON.stringify(maxMinn));
    }

    handleOnMouseEnter = () => {
        this.setState({showDropdown: 'block' })
    }

    onMouseLeave = () => {
        const { mouseOnDropdown } = this.state;
        if(mouseOnDropdown) {
            this.setState({showDropdown: 'block' })
        } else {
            this.setState({showDropdown: 'none' })
        }
    }

    handleMouseOnDropdown = () => {
        // setMouseOnDropdown();
        this.setState({showDropdown: 'block'})
    }

    getPhoneNumbers = () => {
        const { sortAsc } = this.state;
        const phonelist = localStorage.getItem('numbers');
        const phoneList = phonelist && phonelist.split(',');
        
        if(sortAsc){
            return phoneList && phoneList.sort().map((num, i) => {
                return <div key={i} className="number-list">{num}</div>
            })
        }
        if(!sortAsc) {
            return phoneList && phoneList.sort().reverse().map((num, i) => {
                return <div key={i} className="number-list">{num}</div>
            })
        }
    }

    handleSortAscending = () => {
        this.setState({sortAsc: true });
    }
    handleSortDescending = () => {
        this.setState({sortAsc :false});
    }
    
    render() {
        const maxiMini = JSON.parse(localStorage.getItem('maxMini'));
        return(
            <div className="form-parent__container">
                <div className="contain-form">
                    <div className="label-text__container">
                        <label className="form__label">
                            Random Number Generator:
                            <hr />
                        </label>
                    </div>
                    <div className="generators-container">
                        <form className="buttons__controllers" onSubmit={this.handleGeneratePhoneNumber}>
                            <input type="text"
                                required onChange={this.handleInputChange}
                                style={{ border: this.state.error ? `1px solid red` : 'none'}}
                                name="amount"
                                placeholder="Amount to generate"
                                className="form-amount__input"
                            />
        
                            <button type="submit" className="bt-random-number">Generate!</button>
        
                            <button
                                type="button"
                                className="bt-random-number bt-sort"
                                onMouseEnter={this.handleOnMouseEnter}
                                onMouseLeave={this.onMouseLeave}
                            >
                                Sort
                            </button>
                            <div className="sort__dropdown"
                                onMouseEnter={this.handleMouseOnDropdown}
                                onMouseLeave={this.onMouseLeave}
                                style={{ display: this.state.showDropdown }}
                            >
                                <div className="sort_buttons bt-ascend"
                                    onClick={this.handleSortAscending}
                                >
                                    Ascending
                                </div>
                                    <hr />
                                <div className="sort_buttons bt-descend" onClick={this.handleSortDescending}>Descending</div>
                            </div>
                            <div className="max-min">
                                <div>
                                    <label className="min-max__labels">Max Number:</label> <br />
                                    0{maxiMini && maxiMini.max}
                                </div>
                                <div style={{ marginTop: '1rem'}}>
                                <label className="min-max__labels">Min Number:</label> <br />
                                    0{maxiMini && maxiMini.min}
                                </div>
                            </div>
                        </form>
                        <div className="list-number">
                            <div className="phone-container">
                                { this.getPhoneNumbers() }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default InputForm;