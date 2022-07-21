import { mauve, violet } from "@radix-ui/colors";
import { styled } from "stitches.config";


export const StyledDropdownItem = styled('div', {
    all: 'unset',
    fontSize: 13,
    lineHeight: 1,
    // borderRadius: '$4',
    display: 'flex',
    alignItems: 'center',
    height: '$6',
    padding: '0 $2',
    position: 'relative',
    userSelect: 'none',
    cursor: "default",
    transition: "0.2s ease all",
    '&[data-disabled]': {
        color: mauve.mauve8,
        pointerEvents: 'none',
    },
    '&:hover': {
        background: mauve.mauve4
    },
    '&:focus': {
        backgroundColor: violet.violet9,
    },
    '& a': {
        textDecoration:"none",
        color: mauve.mauve12
    }
})