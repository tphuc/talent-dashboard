import { ArrowDownIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import {
    Select,
    SelectArrow,
    SelectItem,
    SelectItemCheck,
    SelectLabel,
    SelectPopover,
    useSelectState,
} from "ariakit/select";
import { RiArrowDownLine } from "react-icons/ri";
import { styled } from "stitches.config";
// import list from "./list";
import {  useCallback} from 'react'
import truncate from "truncate";

const Container = styled('div', {
    display:"flex",
    flexDirection:"column",
    gap: '0.5rem'
})

const StyledLabel = styled(SelectLabel, {
    fontSize: '$3',
    fontWeight: 500,
    color: '$mauve12',
    userSelect: 'none',
    marginBottom: '$1'
});

const StyledSelect = styled(Select, {

    all: 'unset',
    display: 'inline-flex',
    width:"auto",
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
    '&:focus': { boxShadow: `0 0 0 2px $colors$mauve5` },
})


const StyledPopover = styled(SelectPopover, {
    display:"flex",
    flexDirection:"column",
    overscrollBehavior:"contain",
    padding: '$1',
    width: 'auto',
    maxWidth: "95vw",
    borderRadius: '$3',
    backgroundColor: 'white',
    boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
    '&:focus':{
        outline:'none',
        boxShadow: `0 2px 10px $colors$grayA7, 0 0 0 1px $colors$grayA3`,
    },
    '@media (prefers-reduced-motion: no-preference)': {
        animationDuration: '400ms',
        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        animationFillMode: 'forwards',
        willChange: 'transform, opacity',

        // '&[data-state="open"]': {
        //     '&[data-side="top"]': { animationName: slideDownAndFade },
        //     '&[data-side="right"]': { animationName: slideLeftAndFade },
        //     '&[data-side="bottom"]': { animationName: slideUpAndFade },
        //     '&[data-side="left"]': { animationName: slideRightAndFade },
        // },
    },

})


const StyledItem = styled(SelectItem, {
    borderRadius:"$2",
    display: 'flex',
    cursor: 'default',
    scrollMargin: '0.5rem',
    alignItems: 'center',
    borderRadius: '0.25rem',
    color:"$gray11",
    padding: '$1',
    '&:hover': {
        backgroundColor: '$mauve3'
    },
    // '&[data-active-item]':{
    //     background:'$gray2',
    // },
    '&[aria-selected="true"]':{
        color:"$gray12",
    },
   
})





const SelectMultiple = ({ label, defaultValue, renderValue, children, ...props }) => {
    const select = useSelectState({
        defaultValue: [],
        sameWidth: true,
    });

    const _renderValue = useCallback((value) => {
        if (value.length === 0) return "not selected";
        if (value.length === 1) return value[0];
        return truncate(`${value}`);
    },[renderValue])

    return (
        <Container>
            <StyledLabel state={select}>{label}</StyledLabel>
            <StyledSelect state={select}>
                { renderValue ? renderValue(select.value) : _renderValue(select.value)}
                <ChevronDownIcon/>
            </StyledSelect>
            {select.mounted && (
                <StyledPopover state={select}>
                    {children}
                </StyledPopover>
            )}
        </Container>
    );
}


SelectMultiple.Item = StyledItem;


export {
    SelectMultiple
}
