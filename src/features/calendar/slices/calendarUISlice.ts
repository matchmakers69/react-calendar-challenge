import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalPayload = { mode: "create" } | { mode: "edit"; date: string; eventId: string };

type CalendarUIState = {
	isSidebarOpen: boolean;
	isModalOpen: boolean;
	modalData: ModalPayload | null;
};

const initialState: CalendarUIState = {
	isSidebarOpen: false,
	isModalOpen: false,
	modalData: null,
};

const CalendarUISlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		toggleSidebar(state) {
			state.isSidebarOpen = !state.isSidebarOpen;
		},
		openModal(state, action: PayloadAction<ModalPayload>) {
			state.isModalOpen = true;
			state.modalData = action.payload;
		},
		closeModal(state) {
			state.isModalOpen = false;
			state.modalData = null;
		},
	},
});

export const { toggleSidebar, openModal, closeModal } = CalendarUISlice.actions;
const calendarUIReducer = CalendarUISlice.reducer;
export { calendarUIReducer };
