import { useRef, useContext } from "react";
import { useDay } from "@datepicker-react/hooks";
import DatepickerContext from "./datepickerContext";
import { styled } from "stitches.config";



const StyledDayContainer = styled('button', {
  border: 0,
  width:44,
  height:44,
  display:"flex",
  position:"relative",
  justifyContent:"center",
  alignItems:"center",
  padding:0
})

const StyledDayContent = styled('div', {
  width:'100%',
  height:'100%',
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
})

function getColor(
  isSelected,
  isSelectedStartOrEnd,
  isWithinHoverRange,
  isDisabled
) {
  return ({
    selectedFirstOrLastColor,
    normalColor,
    selectedColor,
    rangeHoverColor,
    disabledColor
  }) => {
    if (isSelectedStartOrEnd) {
      return selectedFirstOrLastColor;
    } else if (isSelected) {
      return selectedColor;
    } else if (isWithinHoverRange) {
      return rangeHoverColor;
    } else if (isDisabled) {
      return disabledColor;
    } else {
      return normalColor;
    }
  };
}

function Day({ dayLabel, date }) {
  const dayRef = useRef(null);
  const {
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateSelect,
    onDateFocus,
    onDateHover,
    isEndDate,
    isStartDate
  } = useContext(DatepickerContext);
  const {
    isSelected,
    isSelectedStartOrEnd,
    isWithinHoverRange,
    disabledDate,
    onClick,
    onKeyDown,
    onMouseEnter,
    tabIndex,
    
  } = useDay({
    date,
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateFocus,
    onDateSelect,
    onDateHover,
    dayRef
  });

  if (!dayLabel) {
    return <div />;
  }

  const getColorFn = getColor(
    isSelected,
    isSelectedStartOrEnd,
    isWithinHoverRange,
    disabledDate
  );

  return (
    <StyledDayContainer
    
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      tabIndex={tabIndex}
      type="button"
      ref={dayRef}
      css={{
        borderTopLeftRadius: isStartDate(date) ? '$3':'0px' ,
        borderBottomLeftRadius: isStartDate(date) ? '$3':'0px' ,
        borderTopRightRadius: isEndDate(date) ? '$3':'0px' ,
        borderBottomRightRadius: isEndDate(date) ? '$3':'0px' ,
        background: getColorFn({
          selectedFirstOrLastColor: "$violet3",
          normalColor: "#FFFFFF",
          selectedColor: "$violet3",
          rangeHoverColor: "$violet3",
          disabledColor: "#FFFFFF"
        })
      }}
    >
      <StyledDayContent css={{
           color: getColorFn({
            selectedFirstOrLastColor: "$mauve1",
            normalColor: "$mauve12",
            selectedColor: "$mauve12",
            rangeHoverColor: "$mauve12",
            disabledColor: "$mauve8"
          }),
          borderRadius:"$3",
          background: getColorFn({
            selectedFirstOrLastColor: "$violet9",
          })
      }}>
        {dayLabel}
      </StyledDayContent>
    </StyledDayContainer>
  );
}

export default Day;
