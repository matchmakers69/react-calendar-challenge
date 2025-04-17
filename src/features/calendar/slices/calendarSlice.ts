import { createSlice } from "@reduxjs/toolkit";

interface CalendarState {
  events: Event[];
  past: Event[][];
  future: Event[][];
}

const loadFromStorage = (): Event[] => {
  const stored = localStorage.getItem("events");
  return stored ? JSON.parse(stored) : [];
};

const initialState: CalendarState = {
  events: loadFromStorage(),
  past: [],
  future: [],
};


const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {},
});

const calendarReducer = calendarSlice.reducer;

export default calendarReducer;