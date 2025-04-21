import { useAppDispatch } from "@/app/useAppDispatch";
import { useAppSelector } from "@/app/useAppSelector";
import { useEffect } from "react";
import { fetchCalendarEvents } from "../thunks/fetchCalendarEventsThunk";
import { LoadingStatus } from "@/shared/types/LoadingStatus";

const useFetchCalendarEvents = () => {
	const { loadingStatus, didLoadFromStorage, events, error } = useAppSelector((state) => state.calendarEvent);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (didLoadFromStorage && events.length === 0) {
			dispatch(fetchCalendarEvents());
		}
	}, [dispatch, events.length, didLoadFromStorage]);

	return {
		isLoadingEvents: loadingStatus === LoadingStatus.PENDING,
		isError: error !== null || loadingStatus === LoadingStatus.FAILED,
		events,
	};
};

export { useFetchCalendarEvents };
