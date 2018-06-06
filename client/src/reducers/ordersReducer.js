const orders=(state=[],action)=>{
    switch(action.type){
        case "ADD_ORDER":
            console.log(action.payload);
            return [...state, action.payload];
        case "DELETE_ORDER":
            console.log(action.payload);
            return [...state].filter((item,i)=>i!==action.payload);
        case "CLEAR_CART":
            return [];
        default: return state;
    }
};

export default orders;