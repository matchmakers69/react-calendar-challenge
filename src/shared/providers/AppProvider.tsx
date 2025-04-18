import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { BaseProps } from "../types";
import { StoreProvider } from "./StoreProvider";

type AppProviderProps = BaseProps;

function AppProvider({ children }: AppProviderProps) {
	return (
		<StoreProvider>
			<ErrorBoundary fallback={<div>Error boundry error</div>}>
				<BrowserRouter>{children}</BrowserRouter>
			</ErrorBoundary>
		</StoreProvider>
	);
}

export { AppProvider };
