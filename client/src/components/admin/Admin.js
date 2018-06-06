import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import AdminMenu from '../admin/AdminMenu';
import AdminOrders from '../admin/AdminOrders';
import * as menuActions from '../../actions/menu';
import * as catActions from '../../actions/categories';
import { connect } from 'react-redux';
const actions ={...menuActions,...catActions};

class Admin extends React.Component{
    componentDidMount(){
        this.props.fetchMenu();
        this.props.fetchCategories();
    };
    render(){
        return(
            <div className="admin">
                <aside>
                    <NavLink activeClassName="active" to="/admin/orders">Orders</NavLink>
                    <NavLink activeClassName="active" to="/admin/menu">Menu</NavLink>
                </aside>
                <Switch>
                    <Route exact path="/admin/orders" component={AdminOrders}/>
                    <Route exact path="/admin/menu" component={AdminMenu}/>
                </Switch>
            </div>
        );
    };
};

export default connect(null,actions)(Admin);