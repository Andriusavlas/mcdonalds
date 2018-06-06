import React from 'react';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../actions/orders';

let Checkout=(props)=>{
    const getValues=(values)=>{
        console.log(values);
        const order={
            name:values.name,
            address:values.address,
            phone:values.phone,
            orders:props.orders
        };
        axios.post('/api/orders', order);
    };
    const {handleSubmit}=props;
    const orders=props.orders.map((item, i)=>{
        return <div 
            key={i} 
            className="order-item">{item.name} - {item.price}€
            <span onClick={()=>props.deleteOrder(i)}>Remove from cart</span>
        </div>
    });
    const total=props.orders.reduce((total,order)=>{
        return total+=order.price;
    },0);
    return(
        <div className="checkout">
            <div className="order">
                <h1>Your order:</h1>
                {orders}
            </div>
            <div className="wrapper">
                <div className="back" onClick={()=>props.history.push('/shop')}>Back</div>
                <div className="total">Total: {total.toFixed(2)}€</div>
                <form onSubmit={handleSubmit(getValues)}>
                    <Field name="name" type="text" component="input" placeholder="Your name"/>
                    <Field name="address" type="text" component="input" placeholder="Your address"/>
                    <Field name="phone" type="text" component="input" placeholder="Your phone number"/>
                    <button className="submit" type="submit">Order</button>
                </form>
                <div className="clear" onClick={props.clearCart}>Clear cart</div>
            </div>
        </div>
    );
};

Checkout=reduxForm({
    // a unique name for the form
    form:'contant'
})(Checkout);

const mapStateToProps=(state)=>{
    return{
        orders:state.orders
    };
};

export default connect(mapStateToProps,actions)(Checkout);