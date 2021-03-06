import axios from 'axios';

export function fetchMenu(){
    return async function(dispatch){
        const response = await axios.get('/api/menu');
        dispatch({
            type:'FETCH_MENU',
            payload:response
        });
    };
};

export function addItem(item){
    return{
        type:"ADD_ITEM",
        payload:item
    };
};

export function deleteItem(id){
    return{
        type:"DELETE_ITEM",
        payload:id
    };
};