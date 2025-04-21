import { Provider } from "react-redux";
import { BaseProps } from "../types/BaseProps";
import { store } from "@/app";

type StoreProviderProps = BaseProps<React.JSX.Element | React.JSX.Element[]>;

function StoreProvider({ children }: StoreProviderProps) {
	return <Provider store={store}>{children}</Provider>;
}

export { StoreProvider };
