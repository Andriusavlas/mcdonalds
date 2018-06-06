import React from 'react';
import { connect } from 'react-redux';
import * as  actions from '../../actions/orders';

const Menu=(props)=>{
    const menu=props.menu.filter(item=>item.category===props.active).map((item, i)=>{
        return <div key={i} className="menu-item" onClick={()=>props.addOrder(item)}>
            <h2>{item.name}</h2>
            <img src={item.img} alt=""/>
            <h3>Price: {item.price}€</h3>
        </div>
    });
    return(
        <div className="menu">
            {props.active===''? <h1>No category selected</h1> : menu}
        </div>
    );
};

const mapStateToProps=(state)=>{
    return{
        menu:state.menu,
        active:state.active
    };
};

export default connect(mapStateToProps,actions)(Menu);