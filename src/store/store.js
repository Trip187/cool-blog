import { compose, createStore, applyMiddleware } from "redux";
import { loggerMiddleware } from "../middleware/logger";
//import { logger } from "redux-logger";
import { rootReducer } from "./root-reducer";
const middlewares = [loggerMiddleware];
const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
export default store;
