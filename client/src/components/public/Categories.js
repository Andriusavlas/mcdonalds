import React from 'react';
import { connect } from 'react-redux';
import * as categoryActions from '../../actions/categories';
import * as menuActions from '../../actions/menu';
import { Link } from 'react-router-dom';
const actions={...categoryActions,...menuActions};

const Categories=(props)=>{
    const categories=props.categories.map((item, i)=>{
        return <div
            onClick={()=>props.switchCategory(item.name)} 
            key={i} 
            className={props.active===item.name? "category active" : "category"}>
            <img src={item.img} alt=""/>
            {item.name}
        </div>
    });
    return(
        <div className="categories">
            {categories}
            {props.orders.length>0 && <Link to="/checkout">Checkout</Link>}
        </div>
    );
};

const mapStateToProps=(state)=>{
    return {
        categories:state.categories,
        active:state.active,
        orders:state.orders
    };
};

export default connect(mapStateToProps,actions)(Categories);