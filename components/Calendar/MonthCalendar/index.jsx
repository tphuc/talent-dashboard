import dayjs from "dayjs";
import React from "react";
import { range } from "lodash";
import { styled } from "stitches.config";
import { Box } from "components/Box";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import { Row } from "components/Flex";


const StyledWeekDay = styled('div', {
    textAlign: "center",
    fontWeight: "500",
    fontSize: "$3",
    border: '0.5px solid $mauve5',
    padding: "5px 0px",
    background: "white",
    color: "$violet10",


})


const DayContainer = styled('div', {
    border: 0,
    width: '100%',
    minHeight: 100,
    position: "relative",

    padding: 0,
    border: '0.5px solid $grayA3',
    color: '$mauve12',
    background: "white",
    padding: "5px 10px",
    '&:hover': {
        background: "$gray1"
    }

})



const FadeDay = styled(DayContainer, {
    color: "$mauve7"
})


const DayInner = styled('div', {
    width: "100%",
    height: "100%",
})

const StyledButton = styled('button', {
    all: 'unset',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '$4',
    padding: '0px $2',
    fontSize: '$3',
    height:"$6",
    lineHeight: 'normal',
    fontWeight: 400,
    userSelect: "none",
    // boxShadow: `0 2px 10px $colors$blackA3`,
    transition: "0.2s ease all",
    cursor: "pointer",
    boxSizing: "border-box",
    backgroundColor: 'white',
    border: "1px solid $gray4",
    marginLeft:5,

    '&:hover': {
        backgroundColor: '$grayA1',
    },
    '&:focus': { boxShadow: `0 0 0 2px $colors$grayA7` },
})

const MonthTitle = styled('p', {
    color: "$violet10",
    fontWeight: 500,
    fontSize:"24px"
})





const demoEvents = [
    {
        title: 'Event A',
        date: "2022-5-13",
        startTime: '10:20',
        endTime: '12:20'
    },
    {
        title: 'Event B',
        date: "2022-5-13",
        startTime: '10:20',
        endTime: '12:20'
    },
]


const serializeEvents = (events) => {
    let eventsObj = {}
    events?.map(item => {
        let key = dayjs(item.date).format('YYYY-MM-DD');
        if (!eventsObj[key]) {
            eventsObj[key] = [];
        }


        eventsObj[key].push(item)

    })
    return eventsObj
}




let CalendarContext = React.createContext({
    onSelectDate: (date) => { },
    onSelectTime: (time) => { },
    onSelectEvent: (eventId) => { },


    state: {
        selectedDate: null,
    }


})

export const useCalendarContext = () => {
    const context = React.useContext(CalendarContext);
    return context;
}

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const todayObj = dayjs()




export function MonthCalendar({
    events = demoEvents,
    renderEvent = (item) => null,
}) {


    const [state, setState] = React.useState({
        isMonthViewMode: false,
        isWeekViewMode: false,
        isWeekViewMode: false,

        selectedDate: dayjs(new Date()),
    });


    const handlePrev = () => {
        setState(state => ({
            ...state,
            selectedDate: dayObj.subtract(1, "month")
        }
        ))
    }

    const handleNext = () => {
        setState(state => ({
            ...state,
            selectedDate: dayObj.add(1, "month")
        }
        ))
    }


    let calendarEvents = serializeEvents(events)


    const dayObj = state.selectedDate



    const thisYear = dayObj.year()
    const thisMonth = dayObj.month() // (January as 0, December as 11)
    const daysInMonth = dayObj.daysInMonth()

    const dayObjOf1 = dayjs(`${thisYear}-${thisMonth + 1}-1`)
    const weekDayOf1 = dayObjOf1.day() // (Sunday as 0, Saturday as 6)

    const dayObjOfLast = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`)
    const weekDayOfLast = dayObjOfLast.day()



    const setSelectDate = React.useCallback((date) => {
        setState(state => ({
            ...state,
            selectedDate: date
        }
        ))
    }, [])


    const renderCalendarEvent = React.useCallback((date) => {

        let events = calendarEvents[date];
        if (events) {
            return events?.map((item, id) => {
                // if (renderEvent) {
                return renderEvent(item, id)
                // }
                // return <div key={id}>
                //     {item.title}
                // </div>
            })
        }

        return null;
    }, [events, renderEvent])



    return (
        <CalendarContext.Provider value={{
            state
        }}>
            <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5, marginTop: 5 }}>
                    <MonthTitle>{dayObj.format("MMM YYYY")}</MonthTitle>
                    <Row css={{alignItems:"center"}}>
                        <StyledButton onClick={handlePrev}>
                            <RiArrowLeftLine /> <span css={{marginLeft:10}}>prev</span>
                        </StyledButton>
                        <StyledButton onClick={handleNext}>
                      <span css={{marginRight:10}}>next</span> <RiArrowRightLine /> 
                        </StyledButton>
                    </Row>
                </div>

                <Box css={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    justifyContent: "center",
                    marginBottom: "10px",
                    fontSize: "10px",
                    borderRadius: 8,
                    overflow: "hidden",
                    border: "1px solid $mauve3",
                }}>
                    {weekDays.map(d => (
                        <StyledWeekDay key={d}>
                            {d}
                        </StyledWeekDay>
                    ))}
                </Box>
                <Box
                    css={{
                        display: "grid",
                        gridTemplateColumns: "repeat(7, 1fr)",
                        borderRadius: 10,
                        gap: 0,

                        borderRadius: 12,
                        overflow: "hidden",
                        border: "1px solid $grayA2",
                    }}
                >
                    {range(weekDayOf1).map(i => (
                        <FadeDay key={i}>
                            {dayObjOf1.subtract(weekDayOf1 - i, "day").date()}
                        </FadeDay>
                    ))}

                    {range(daysInMonth).map(i => {
                        return <DayContainer
                            onClick={() => setSelectDate(dayjs(`${thisYear}-${thisMonth + 1}-${i + 1}`))}
                            // className={`day-cell day-cell--in-month${i + 1 === todayObj.date() &&
                            //     thisMonth === todayObj.month() &&
                            //     thisYear === todayObj.year()
                            //     ? " day-cell--today"
                            //     : ""
                            //     }`}
                            key={i}
                        >
                            {i + 1}
                            {renderCalendarEvent(dayjs(`${thisYear}-${thisMonth + 1}-${i + 1}`).format('YYYY-MM-DD'))}
                        </DayContainer>
                    })}

                    {range(6 - weekDayOfLast).map(i => (
                        <FadeDay key={i}>

                            {dayObjOfLast.add(i + 1, "day").date()}

                        </FadeDay>
                    ))}
                </Box>
            </div>
        </CalendarContext.Provider>
    )
}