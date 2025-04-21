import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./rootReducer";

const store = configureStore({
	reducer: appReducer,
});

export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;
export { store };
