export default function(state = null, action)
{
    switch (action.type) {
        case "FETCH_ROUTE":
            return action.payload;
        
        default:
            return state;
            break;
    }
}
