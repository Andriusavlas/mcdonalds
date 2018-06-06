const categories=(state=[],action)=>{
    switch(action.type){
        case 'FETCH_CATEGORIES':
            return [...action.payload.data.categories];
        default: return state;
    }
};

export default categories;