import * as Popover from "@radix-ui/react-popover";
import React from "react";
import { styled } from "stitches.config";



const StyledPopoverContent = styled(Popover.Content, {
    position: "relative",
    background: "$mauve1",
    borderRadius: 4,
    overflow:"hidden",
    boxShadow: `0 2px 20px $colors$blackA3, 0 0 0 1px $colors$grayA3`,
    '&:focus-within': {
        outline: "none",
        '&:focus-within': { boxShadow: `0 2px 10px $colors$blackA3, 0 0 0 1px $colors$grayA5` },

    },
    padding:0,
   

})

const Row = styled('div', {
    position: "relative",
    width:"100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    height:"100%",
   

})
const Column = styled('div', {
    position: "relative",
    display: 'flex',
    flexDirection: "column",
    minHeight: 100,
    maxHeight: 300,
    height:"100%",
    minWidth: 50,
 
    
})


const Option = styled('div', {
    color: "$mauve11",
    marginLeft: 2,
    marginRight: 2,
    marginTop: 1,
    padding: '0 5px',
    borderRadius: 5,
    cursor: "default",
    userSelect: "none",
    '&:hover': {
        background: "$mauve4"
    },
    variants: {
        selected: {
            true: {
                background: "$mauve4",
                color: "$mauve12",
            }
        }
    },
})

const prefixWithZeros = (n, length) => String(n).padStart(length, '0');
const ColumnTitle = styled('span', {
    background: "$mauve4",
    padding: "0 5px",
    borderBottom:'1px solid $gray5'
})

const StyledTrigger = styled('button', {

    all: 'unset',
    display: 'inline-flex',
    width:"auto",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '$4',
    fontSize: '$3',
    padding:"0 $2",
    lineHeight: 1,
    fontWeight: 400,
    color: '$gray12',
    backgroundColor: '$gray3',
    boxShadow: `0 2px 10px $colors$blackA3`,
    height: '$6',
    cursor:"pointer",
    boxShadow: `0 2px 10px $colors$blackA3, 0 0 0 1px $colors$grayA5`,
    '&:focus': { boxShadow: `0 2px 10px $colors$blackA3, 0 0 0 1px $colors$grayA5` },
})


const Scroll = styled('div', {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "scroll",


    /* width */
    '&::-webkit-scrollbar': {
        width: 5,
        height:0,

    },

    /* Track */
    '&::-webkit-scrollbar-track': {
        background: '$mauve1',

    },

    /* Handle */
    '&::-webkit-scrollbar-thumb': {
        background: '$mauve3',
        borderRadius: 10,
    },

    /* Handle on hover */
    '&::-webkit-scrollbar-thumb:hover': {
        background: '$mauve7',
    }
})
const TimePicker = ({
    initialValue = '00:00',
    onChange = (v) => { }
}) => {

    const [selectTime, setSelectTime] = React.useState({
        hour: parseInt(initialValue?.split(':')[0]),
        minute: parseInt(initialValue?.split(':')[1])
    });


    React.useEffect(() => {
        if (selectTime.hour && selectTime.minute) {
            onChange(`${prefixWithZeros(selectTime.hour, 2)}:${prefixWithZeros(selectTime.minute, 2)}`)
        }
    }, [selectTime])


    return <Popover.Root>
        <Popover.Trigger asChild>
        <StyledTrigger>
            {selectTime.hour && selectTime.minute ? `${prefixWithZeros(selectTime.hour, 2)}:${prefixWithZeros(selectTime.minute, 2)}` : 'Select time'}
        </StyledTrigger>
        </Popover.Trigger>
        <StyledPopoverContent>
            <Row>

                <Column>
                    <ColumnTitle>h</ColumnTitle>
                    <Scroll>
                        {Array.from({ length: 24 }, (v, k) => k + 1).map((n, i) => <Option key={i} selected={selectTime.hour === n} onClick={() => setSelectTime({ ...selectTime, hour: n })}>{n}</Option>)}
                    </Scroll>
                </Column>
                <Column>
                    <ColumnTitle>m</ColumnTitle>
                    <Scroll>
                        {Array.from({ length: 60 }, (v, k) => k + 1).map((n, i) => <Option key={i} selected={selectTime.minute === n} onClick={() => setSelectTime({ ...selectTime, minute: n })}>{n}</Option>)}
                    </Scroll>
                </Column>
            </Row>
        </StyledPopoverContent>
    </Popover.Root>
}


export { TimePicker }