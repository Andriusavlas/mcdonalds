import React from 'react';
import Categories from './Categories';
import Orders from './Orders';
import Menu from './Menu';
import {Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as categoryActions from '../../actions/categories';
import * as menuActions from '../../actions/menu';
const actions={...categoryActions,...menuActions};

class Shop extends React.Component{
    componentDidMount(){
        this.props.fetchCategories();
        this.props.fetchMenu();
    };
    render(){
        return(
            <div className="shop">
                <Route path="/shop" component={Menu} exact/>
                <Categories/>
                <Orders/>
            </div>
        );
    };
};

const mapStateToProps=(state)=>{
    return{
        menu:state.menu,
        categories:state.categories
    }
};

export default connect(mapStateToProps,actions)(Shop);