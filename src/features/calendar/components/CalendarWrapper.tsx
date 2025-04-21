import { v4 as uuidv4 } from "uuid";
import { CalendarSidebar } from "./CalendarSidebar";
import { CalendarContent } from "./CalendarContent";
import { useAppSelector } from "@/app/useAppSelector";
import { useAppDispatch } from "@/app/useAppDispatch";
import { Modal } from "@/shared/components";
import { Button } from "@/shared/components";
import { t } from "@/shared/locales";
import { Calendar } from "./Calendar";
import { addEvent, closeModal, updateEvent } from "../slices";
import { EventForm } from "./EventForm";

function CalendarWrapper() {
	const dispatch = useAppDispatch();
	const { isModalOpen, modalData } = useAppSelector((state) => state.calendarUI);
	const events = useAppSelector((state) => state.calendarEvent.events);
	const handleClose = () => dispatch(closeModal());

	const isEditMode = modalData?.mode === "edit";
	const eventId = isEditMode ? modalData.eventId : null;
	const selectedEvent = isEditMode ? events.find((e) => e.id === eventId) : undefined;
	return (
		<>
			<div data-testid="calendar-wrapper" className="relative isolate flex min-h-[100svh] w-full">
				<CalendarSidebar data-testid="calendar-sidebar" />
				<CalendarContent data-testid="calendar-content">
					<Calendar data-testid="calendar" />
				</CalendarContent>
			</div>
			{isModalOpen && (
				<Modal
					isOpen={isModalOpen}
					onClose={handleClose}
					title={isEditMode ? `${t.form.eventForm.editEvent}` : `${t.form.eventForm.createEvent}`}
					actionLabel={t.common.cancel}
					footer={
						<Button
							data-testid="cancel-button"
							type="button"
							variant="destructive"
							size="sm"
							onClick={handleClose}
						>
							{t.common.cancel}
						</Button>
					}
				>
					<EventForm
						mode={isEditMode ? "edit" : "create"}
						initialValues={selectedEvent}
						onSubmit={(data) => {
							if (isEditMode) {
								dispatch(
									updateEvent({
										...data,
										id: selectedEvent?.id || uuidv4(),
									}),
								);
							} else {
								dispatch(addEvent({ ...data, id: uuidv4() }));
							}
							handleClose();
						}}
					/>
				</Modal>
			)}
		</>
	);
}

export { CalendarWrapper };
