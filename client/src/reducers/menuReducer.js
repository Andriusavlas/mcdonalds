const menu=(state=[],action)=>{
    switch(action.type){
        case "FETCH_MENU":
            return [...action.payload.data.menu];
        case "ADD_ITEM":
            return [...state,action.payload];
        case "DELETE_ITEM":
            return [...state].filter(item=>item._id!==action.payload);
        default: return state;
    }
};

export default menu;