import { useMonth } from "@datepicker-react/hooks";
import { styled } from "stitches.config";
import Day from "./Day";


const StyledContainer = styled('div', {
  borderRadius:"$3",
  py:"$2"
})

const StyledMonthLabel = styled('span', {
  fontSize:"$4"
})

const StyledWeekDay = styled('div', {
  textAlign:"center",
  fontWeight:"500",
  fontSize:"$2"
})



function StyledMonth({ year, month, firstDayOfWeek }) {
  const { days, weekdayLabels, monthLabel } = useMonth({
    year,
    month,
    firstDayOfWeek
  });

  return (
    <StyledContainer>
      <div style={{ textAlign: "center", margin: "0 0 16px" }}>
        <StyledMonthLabel>{monthLabel}</StyledMonthLabel>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          justifyContent: "center",
          marginBottom: "10px",
          fontSize: "10px"
        }}
      >
        {weekdayLabels.map(dayLabel => (
          <StyledWeekDay style={{ textAlign: "center" }} key={dayLabel}>
            {dayLabel}
          </StyledWeekDay>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap:0,

        }}
      >
        {days.map((day, index) => {
        
          if (typeof day === "object") {
            return (
              <Day
                date={day.date}
                key={day.date.toString()}
                dayLabel={day.dayLabel}
              />
            );
          }
          

          return <div key={index} />;
        })}
      </div>
    </StyledContainer>
  );
}

export default StyledMonth;
