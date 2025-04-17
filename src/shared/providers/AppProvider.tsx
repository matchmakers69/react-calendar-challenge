import { ErrorBoundary } from "react-error-boundary";
import StoreProvider from "./StoreProvider";
import { BaseProps } from "shared/types";

type AppProviderProps = BaseProps;

export default function AppProvider({ children }: AppProviderProps) {
	return (
		<StoreProvider>
			<ErrorBoundary fallback={<div>Something went wrong</div>}>{children}</ErrorBoundary>
		</StoreProvider>
	);
}
