import React, { Component } from 'react';
import './ButtonScreen.css';
import axios from 'axios';


class ButtonScreen extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            items: []
        }
    }

    componentDidMount = async () => {
        try {
            const response = await axios.get("items.json");
            this.setState({
                items: response.data.items
            })
        } catch (e) {
            console.log(e.message)
        }
    }

    showModal = () => {
        this.setState({
            show: true
        })

    };

    hideModal = () => {
        this.setState({
            show: false
        });
    };

    render() {
        const allItems = this.state.items ?  this.state.items.map(item => {
            return (
                <div key={item.id} className='item-container'>
                    <img className='item-image' src={item.image} alt='item'/>
                    <div className='title-container'>
                       <h3 id={item.id} className='item-title'>{item.title}</h3> 
                    </div>
                   <h3 id={item.id} className='item-sku'>{item.sku}</h3>
                   <h3 id={item.id} className='item-price'>${item.price}</h3>
                   <button className='addtocart-btn'>add to cart</button>
                </div>
                
            )
        }): null;

        const modal = (this.state.show) ? 
            <div className='modal'>
                <section className="modal-section clearfix">
                    <button className='cancel-btn' onClick={this.hideModal}>X</button>
                    <div className='modal-title-div'>
                      <h1 className='modal-title'>Want to add one of these?</h1> 
                    </div>
                    <h4 className='modal-desc'>Customers who bought the <span className='text-bolder'>SPX3000</span> also bought these popular items:</h4> 
                    <div className='all-items-container'>
                        {allItems}
                    </div>
                    <button className='save-btn'>ADD THESE 4 ITEMS AND SAVE 10%</button>
                    <div className='checkout-and-nothanks-btns'>
                        <button className='checkout-btn'>CONTINUE TO CHECKOUT</button>
                        <button className='nothanks-btn'>No Thanks</button>
                    </div>
                    
                </section>
            </div> : null;

        return (
            <div className='modal-btn-div'>
                <div className='modal-btn-div-inner'>
                    <button className='modal-btn' onClick={this.showModal}>Modal</button>
                </div>
                {modal}
            </div>
        )
    }
}

export default ButtonScreen;