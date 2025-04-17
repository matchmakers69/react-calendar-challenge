import CalendarWrapper from "src/features/calendar/components/CalendarWrapper";
import AppProvider from "src/shared/providers/AppProvider";

export default function App() {
	return (
		<AppProvider>
			<CalendarWrapper />
		</AppProvider>
	);
}
