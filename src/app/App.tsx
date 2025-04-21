import { CalendarWrapper } from "@/features/calendar/components";
import { AppProvider } from "@/shared/providers";

function App() {
	return (
		<AppProvider>
			<CalendarWrapper />
		</AppProvider>
	);
}

export { App };
