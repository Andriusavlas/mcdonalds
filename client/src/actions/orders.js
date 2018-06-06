export function addOrder(value){
    return{
        type:"ADD_ORDER",
        payload:value
    };
};
export function deleteOrder(index){
    return{
        type:"DELETE_ORDER",
        payload:index
    };
};
export function clearCart(){
    return{
        type:"CLEAR_CART",
        payload:69
    };
};