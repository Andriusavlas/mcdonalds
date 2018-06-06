import React from 'react';
import { connect } from 'react-redux';

const Orders=(props)=>{
    const orders=props.orders.map((item,i)=>{
        return <div key={i} className="order">{item.name}</div>
    });
    return(
        <div className="orders">
            {orders}
        </div>
    );
};

const mapStateToProps=(state)=>{
    return{
        orders:state.orders
    }
};

export default connect(mapStateToProps)(Orders);