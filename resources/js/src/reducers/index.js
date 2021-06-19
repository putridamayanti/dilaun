import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import UserReducer from "./UserReducer";
import ServiceReducer from "./ServiceReducer";
import ProductReducer from "./ProductReducer";

const rootReducer = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    service: ServiceReducer,
    product: ProductReducer
});

export default rootReducer;
