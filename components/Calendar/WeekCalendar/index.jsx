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


const Cell = styled('div', {
    padding:'2px 5px',
    border:"0.5px solid $mauve4",
    '&:hover':{
        background:"$mauve2"
    }

})

const StyledButton = styled('button', {
    all: 'unset',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '$4',
    padding: '0px $1',
    fontSize: '$2',
    height:"$5",
    lineHeight: 'normal',
    fontWeight: 400,
    userSelect: "none",
    // boxShadow: `0 2px 10px $colors$blackA3`,
    transition: "0.2s ease all",
    cursor: "pointer",
    boxSizing: "border-box",
    backgroundColor: 'white',
    border: "1px solid $gray4",
    color:"$mauve11",
    marginLeft:5,

    '&:hover': {
        color:"$mauve12",
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
        let key = `${dayjs(item.date).format('YYYY-MM-DD')} ${item?.startTime?.split(':')?.length ? item?.startTime?.split(':')[0] : 0}`;
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




export function WeekCalendar({
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
            selectedDate: dayObj.subtract(1, "week")
        }
        ))
    }

    const handleNext = () => {
        setState(state => ({
            ...state,
            selectedDate: dayObj.add(1, "week")
        }
        ))
    }


    let calendarEvents = serializeEvents(events)


    const dayObj = state.selectedDate



    const thisYear = dayObj.year()
    const thisMonth = dayObj.month() // (January as 0, December as 11)
    const daysInMonth = dayObj.daysInMonth()

    const startWeekDay = dayObj.subtract(dayObj.day(), 'day') // Sunday-0, Sat-6




    const setSelectDate = React.useCallback((date) => {
        setState(state => ({
            ...state,
            selectedDate: date
        }
        ))
    }, [])

    console.log(calendarEvents)
    const renderCalendarEvent = React.useCallback((date, timeslot) => {

        let events = calendarEvents[`${date} ${timeslot}`];
        
        console.log(`${date} ${timeslot}`)
        if (events) {
          
            return events?.map((item, id) => {
                return renderEvent(item, id)
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
                    gridTemplateColumns: "50px repeat(7, 1fr)",
                    justifyContent: "center",
                    fontSize: "10px",
                    overflow: "hidden",
                    border: "0.5px solid $mauve3",
                    borderTopLeftRadius:10,
                    borderTopRightRadius:10,
                    border: '0.5px solid $gray5',
                    borderBottomWidth:0
                }}>
                    <StyledWeekDay></StyledWeekDay>
                    {weekDays.map((d,i) => (
                        <StyledWeekDay key={d}>
                            <p style={{marginTop:2, marginBottom:2, fontWeight:300}}>{startWeekDay.add(i, "day").format('DD')}</p>
                            
                            <p style={{marginTop:2, marginBottom:2, fontSize:16,}}>{d}</p>
                        
                        </StyledWeekDay>
                    ))}
                </Box>
                <Box
                    css={{
                        display: "grid",
                        gridTemplateColumns: "50px repeat(7, 1fr)",
                        gridTemplateRows: "repeat(24, 1fr)",
                        justifyContent: "center",
                        gap: 0,
                        gridAutoFlow:"column",
                        maxHeight:600,
                        overflow:"scroll",
                        borderBottomLeftRadius:10,
                        borderBottomRightRadius:10,
                        border: '0.5px solid $gray5',
                        borderTopWidth:0
                        
             
             
            
            
                    }}
                >
                    {/* <StyledWeekDay></StyledWeekDay> */}
                    {range(12).map((item, id) => <Cell css={{fontSize:"12px", textAlign:"end", color:"$mauve11", fontWeight:300, fontFamily:"system-ui"}} key={id}>{item + 1} AM</Cell>)}
                    {range(12).map((item, id) => <Cell  css={{fontSize:"12px", textAlign:"end", color:"$mauve11", fontWeight:300, fontFamily:"system-ui"}} key={id}>{item + 1} PM</Cell>)}

                    {/* <StyledWeekDay>{`${weekDays[0]} ${startWeekDay.add(0, "day").format('DD')}`}</StyledWeekDay> */}
                    {range(24).map((_, id) => <Cell key={id}>
                        {renderCalendarEvent(startWeekDay.add(0, "day").format('YYYY-MM-DD'), id+1)}
                    </Cell>)}

                    {/* <StyledWeekDay>{`${weekDays[1]} ${startWeekDay.add(1, "day").format('DD')}`}</StyledWeekDay> */}
                    {range(24).map((_, id) => <Cell key={id}>
                        {renderCalendarEvent(startWeekDay.add(1, "day").format('YYYY-MM-DD'), id+1)}
                    </Cell>)}

                    {/* <StyledWeekDay>{`${weekDays[2]} ${startWeekDay.add(2, "day").format('DD')}`}</StyledWeekDay> */}
                    {range(24).map((_, id) => <Cell key={id}>
                        {renderCalendarEvent(startWeekDay.add(2, "day").format('YYYY-MM-DD'), id+1)}
                    </Cell>)}

                    {/* <StyledWeekDay>{`${weekDays[3]} ${startWeekDay.add(3, "day").format('DD')}`}</StyledWeekDay> */}
                    {range(24).map((_, id) => <Cell key={id}>
                        {renderCalendarEvent(startWeekDay.add(3, "day").format('YYYY-MM-DD'), id+1)}
                    </Cell>)}

                    {/* <StyledWeekDay>{`${weekDays[4]} ${startWeekDay.add(4, "day").format('DD')}`}</StyledWeekDay> */}
                    {range(24).map((_, id) => <Cell key={id}>
                        {renderCalendarEvent(startWeekDay.add(4, "day").format('YYYY-MM-DD'), id+1)}
                    </Cell>)}

                    {/* <StyledWeekDay>{`${weekDays[5]} ${startWeekDay.add(5, "day").format('DD')}`}</StyledWeekDay> */}
                    {range(24).map((item, id) => <Cell key={id}>
                        {renderCalendarEvent(startWeekDay.add(5, "day").format('YYYY-MM-DD'), id+1)}
                    </Cell>)}

                    {/* <StyledWeekDay>{`${weekDays[6]} ${startWeekDay.add(6, "day").format('DD')}`}</StyledWeekDay> */}
                    {range(24).map((item, id) => <Cell key={id}>
                        {renderCalendarEvent(startWeekDay.add(6, "day").format('YYYY-MM-DD'), id+1)}
                    </Cell>)}

                    {/* {range(7).map(i => {
                        return <DayContainer
                            // onClick={() => setSelectDate(dayjs(`${thisYear}-${thisMonth + 1}-${i + 1}`))}
                            // className={`day-cell day-cell--in-month${i + 1 === todayObj.date() &&
                            //     thisMonth === todayObj.month() &&
                            //     thisYear === todayObj.year()
                            //     ? " day-cell--today"
                            //     : ""
                            //     }`}
                            key={i}
                        >
                            {startWeekDay}
                          
                        </DayContainer>
                    })} */}

                    {/* {range(6 - weekDayOfLast).map(i => (
                        <FadeDay key={i}>

                            {lastDate.add(i + 1, "day").date()}

                        </FadeDay>
                    ))} */}
                </Box>
            </div>
        </CalendarContext.Provider>
    )
}