import React from 'react';
import { connect } from 'react-redux';
import * as actionsCat from '../../actions/categories';
import * as actionsMenu from '../../actions/menu';
import { Field, reduxForm, reset } from 'redux-form'
import axios from 'axios';
import Dropzone from 'react-dropzone';

const actions = {...actionsCat,...actionsMenu};

class AdminMenu extends React.Component{
    state={
        message:'',
        items:[],
        file:''
    };
    addProduct=(values)=>{
        // values.category=this.props.active;
        console.log(values);
        // sukuriam objekta ir jam priskiriam formos savybes
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('price', values.price);
        formData.append('category', this.props.active);
        formData.append('item_image', this.state.file);
        axios.post('/api/admin/additem',formData).then((res)=>{
            this.setState({message:res.data.message});
            setTimeout(()=>{
                this.setState({message:''});
            },2000);
            // itraukiam nauja item i reduceri pagal gauta response
            console.log(res);
            const {_id, name, price, category, imglocation, imgpath}=res.data;
            this.props.addItem({_id, name, price, category, imglocation, imgpath});
        });
        this.setState({file:''});
        this.props.dispatch(reset('menu'));
    };
    deleteProduct=(id)=>{
        console.log(id);
        axios.post('/api/admin/remove/item',{id}).then((res)=>{
            this.setState({message:res.data.message});
            setTimeout(()=>{
                this.setState({message:''});
            },2000);
        });
        this.props.deleteItem(id);
    };
    uploadImage=(files)=>{
        this.setState({file:files[0]});
    };
    componentDidMount(){
        axios.get('/api/admin/getitems').then((res)=>{
            this.setState({items:res.data.items});
        });
    };
    render(){
        const categories=this.props.categories.map((item, i)=>{
            return <li
                className={item.name===this.props.active? "active-cat" : null}
                onClick={()=>this.props.switchCategory(item.name)}
                key={i}>
                {item.name}
            </li> 
        });
        const menu=this.props.menu.filter(item=>item.category===this.props.active).map((item, i)=>{
            return <div key={i} className="menu-admin-item">
                <h2>{item.name}</h2>
                <img src={item.imglocation} alt=""/>
                <h3>Price: {item.price}€</h3>
                <h5 onClick={()=>this.deleteProduct(item._id)}>Remove</h5>
            </div>
        });
        return(
            <div className="admin-menu">
                <ul>
                    {categories}
                </ul>
                {this.props.active &&
               <div>
                   <Dropzone
                        style={{
                            width:'120px',
                            height:'120px',
                            margin:'10px auto',
                            backgroundImage:`url(${this.state.file.preview})`,
                            backgroundSize:'cover',
                            backgroundPosition:'center',
                            border:'1px solid red',
                        }} 
                        onDrop={this.uploadImage}
                    >
                        {/*<p>{this.state.file.name}</p>*/}
                        {/*<img src={this.state.file.preview} alt=""/>*/}
                   </Dropzone>
                    <form onSubmit={this.props.handleSubmit(this.addProduct)}>
                        <Field autoComplete="off" name="name" component="input" type="text" placeholder="name"/>
                        <Field autoComplete="off" name="price" component="input" type="number" placeholder="price"/>
                        <button type="submit">Add</button>
                    </form>
               </div>
                }
                <h2>{this.state.message}</h2>
                <div className="menu-admin">
                    {menu}
                </div>
            </div>
        );
    };
};

const mapStateToProps=(state)=>{
    return{
        categories:state.categories,
        menu:state.menu,
        active:state.active
    };
};

AdminMenu = reduxForm({
    // a unique name for the form
    form: 'menu'
})(AdminMenu);

export default connect(mapStateToProps,actions)(AdminMenu);