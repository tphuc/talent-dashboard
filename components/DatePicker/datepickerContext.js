
import React from 'react'

const datepickerContextDefaultValue = {
    focusedDate: null,
    isDateFocused: () => false,
    isDateSelected: () => false,
    isDateHovered: () => false,
    isDateBlocked: () => false,
    isFirstOrLastSelectedDate: () => false,
    isEndDate: () => false,
    isStartDate: () => false,
    onDateFocus: () => { },
    onDateHover: () => { },
    onDateSelect: () => { }
};

const DatepickerContext = React.createContext(datepickerContextDefaultValue);
export default DatepickerContext;