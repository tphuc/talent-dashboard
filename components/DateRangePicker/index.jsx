
import { useState } from "react";
import { useDatepicker, START_DATE } from "@datepicker-react/hooks";
import DatepickerContext from "./datepickerContext";
import Month from "./Month";
import * as Popover from '@radix-ui/react-popover';
import { styled, keyframes } from "stitches.config";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, Cross2Icon } from "@radix-ui/react-icons";

const slideUpAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(-2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(-2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
});


const Text = styled('span', {
    display: "inline-block", fontWeight: '500', minWidth: 100
})


const StyledTrigger = styled('button', {
    all: 'unset',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing:"border-box",
    borderRadius: '$3',
    fontSize: '$3',
    padding:"0 $2",
    lineHeight: 1,
    fontWeight: 400,
    color: '$gray12',
    backgroundColor: '$gray3',
    boxShadow: `0 2px 10px $colors$blackA3`,
    height: '$6',
    cursor:"pointer",
    '&:focus': { boxShadow: `0 0 0 2px $colors$grayA7` },
})



const StyledClose = styled(Popover.Close, {
    all: 'unset',
    fontFamily: 'inherit',
    borderRadius: '100%',
    height: 30,
    width: 30,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 5,
    right: 5,

    '&:hover': { backgroundColor: '$violet3' },
    '&:focus': { boxShadow: `0 0 0 2px $colors$mauve10` },
});


const PopoverContent = styled(Popover.Content, {
    borderRadius: '$3',
    padding: '$3',
    width: 'auto',
    maxWidth: "95vw",
    backgroundColor: 'white',
    boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
    '@media (prefers-reduced-motion: no-preference)': {
        animationDuration: '400ms',
        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        animationFillMode: 'forwards',
        willChange: 'transform, opacity',

        '&[data-state="open"]': {
            '&[data-side="top"]': { animationName: slideDownAndFade },
            '&[data-side="right"]': { animationName: slideLeftAndFade },
            '&[data-side="bottom"]': { animationName: slideUpAndFade },
            '&[data-side="left"]': { animationName: slideRightAndFade },
        },
    },
    '@bp3': {
        minWidth: 660,
        gridTemplateColumns: "1fr 1fr"
    },
    '&:focus': {
        outline: "none",
    },
});


const StyledControlButton = styled('button', {
    all: 'unset',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '$3',
    padding: '0px $2',
    fontSize: '$3',
    height: '$6',
    lineHeight: 'normal',
    fontWeight: 400,
    userSelect: "none",
    boxShadow: `0 2px 10px $colors$blackA3`,
    transition: "0.2s ease all",
    cursor: "pointer",
    backgroundColor: '$grayA3',
    color: '$violet11',
    '&:hover': {
        backgroundColor: '$grayA4',
    },
    '&:focus': { boxShadow: `0 0 0 2px $colors$grayA7` },

})


const StyledConfirmButton = styled(Popover.Close, {
    
    all: 'unset',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '$3',
    padding: '0px $2',
    fontSize: '$3',
    height: '$6',

    lineHeight: 'normal',
    fontWeight: 400,
    userSelect: "none",
    boxShadow: `0 2px 10px $colors$blackA3`,
    transition: "0.2s ease all",
    cursor: "pointer",
    backgroundColor: '$violet9',
    color: '$mauve1',
    '&:hover': {
        backgroundColor: '$violet10',
    },
    '&:focus': { boxShadow: `0 0 0 2px $colors$grayA7` },
})


const IconButton = styled('button', {
    all: 'unset',
    fontFamily: 'inherit',
    borderRadius: '100%',
    height: 35,
    width: 35,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    boxShadow: `0 2px 10px $colors$grayA7`,
    '&:hover': { backgroundColor: '$violet3' },
    '&:focus': { boxShadow: `0 0 0 2px black` },
  });



const StyledCalendarContainer = styled('div', {
    display: "grid",
    gridGap: "0px $3"
});

function DateRangePicker({onChange = () => {}, ...props}) {
    const [state, setState] = useState({
        startDate: null,
        endDate: null,
        focusedInput: START_DATE
    });
    const {
        firstDayOfWeek,
        activeMonths,
        isDateSelected,
        isDateHovered,
        isFirstOrLastSelectedDate,
        isDateBlocked,
        isDateFocused,
        isEndDate,
        isStartDate,
        focusedDate,
        onDateHover,
        onDateSelect,
        onDateFocus,
        goToPreviousMonths,
        goToNextMonths,
        onResetDates
        
    } = useDatepicker({
        
        startDate: state.startDate,
        endDate: state.endDate,
        focusedInput: state.focusedInput,

        
        onDatesChange: handleDateChange
    });

    function handleDateChange(data) {
        if (!data.focusedInput) {
            setState({ ...data, focusedInput: START_DATE });
        } else {
            setState(data);
        }
        onChange(data)

    }

    return (
        <DatepickerContext.Provider
            value={{
                focusedDate,
                isDateFocused,
                isDateSelected,
                isDateHovered,
                isDateBlocked,
                isEndDate,
                isStartDate,
                isFirstOrLastSelectedDate,
                onDateSelect,
                onDateFocus,
                onDateHover,
                onResetDates
            }}
        >
            <Popover.Root>
                <Popover.Trigger asChild>
                    <StyledTrigger  css={{width:'auto', ...props.css}}>
                        {state.startDate||state.endDate ?  `${state.startDate?.toLocaleDateString() || ''} - ${state.endDate?.toLocaleDateString() || ''}` : 'select dates'}
                        <CalendarIcon style={{marginLeft:"2px"}}/>
                    </StyledTrigger>
                </Popover.Trigger>
                <Popover.Anchor />
                <PopoverContent  >
                    <div>
                        <Text>Start date:</Text>
                        <span>{state.startDate && state.startDate.toLocaleDateString()}</span>
                    </div>
                    <div>
                        <Text>End date:</Text>
                        {state.endDate && state.endDate.toLocaleDateString()}
                    </div>
                    <br />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <StyledControlButton onClick={goToPreviousMonths}>
                            <ChevronLeftIcon />
                            Previous
                        </StyledControlButton>
                        <StyledControlButton onClick={goToNextMonths}>
                            Next
                            <ChevronRightIcon />
                        </StyledControlButton>
                    </div>

                    <StyledCalendarContainer css={{
                        gridTemplateColumns: `repeat(auto-fill, minmax(300px,1fr ))`,
                    }}>
                        {activeMonths.map(month => (
                            <Month
                                key={`${month.year}-${month.month}`}
                                year={month.year}
                                month={month.month}
                                firstDayOfWeek={firstDayOfWeek}
                            />
                        ))}
                    </StyledCalendarContainer>
                    <StyledClose>
                        <Cross2Icon />
                    </StyledClose>
                    {/* <Popover.Arrow /> */}
           
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                    <StyledControlButton onClick={() => onResetDates()}>Reset</StyledControlButton>
                    <StyledConfirmButton>Confirm</StyledConfirmButton>
                   
                    </div>
                    
               
                </PopoverContent>
            </Popover.Root>
        </DatepickerContext.Provider>




    );
}

export { DateRangePicker };
