
import React from "react";
import { useButton } from '@react-aria/button';
import { styled, keyframes } from "stitches.config";



const spin = keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
})

const StyledLoading = styled('span', {
    borderWidth: '1px',
    borderStyle: "solid",
    borderColor: 'inherit',
    height: 18,
    width: 18,
    borderTopColor: 'transparent',
    borderRadius: '50%',
    animation: `${spin} .8s linear infinite`,
    backgroundColor: 'transparent',
    boxShadow: `0 2px 10px $colors$grayA7`
})

const StyledButton = styled('button', {
    all: 'unset',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '$4',
    padding: '0px $2',
    fontSize: '$3',
    height: '$6',
    lineHeight: 'normal',
    fontWeight: 400,
    userSelect: "none",
    // boxShadow: `0 2px 10px $colors$blackA3`,
    transition: "0.2s ease all",
    cursor: "pointer",
    boxSizing:"border-box",

    variants: {
        center: {
            true: {
                justifyContent:"center"
            },
            false: {
                justifyContent:"space-between"
            }
        },
        size: {
            sm: {
                fontSize: '$2',
                padding: '0 $2',
                height: '$5',
                minWidth:'$5',
                borderRadius:"$3"
            },
            md: {
                fontSize: '$3',
                padding: '0 $2',
                height: '$6',
            },
            lg: {
                fontSize: '$4',
                height: '$7',
            },

        },

        variant: {
            orange: {
                backgroundColor: '$gray3',
                color: '$orange10',
                
                '&:hover': { backgroundColor: '$mauve4' },
                '&:focus': { boxShadow: `0 0 0 2px $colors$grayA7` },
            },
            violet: {
                backgroundColor: '$gray3',
                color: '$violet10',
                '&:hover': { backgroundColor: '$mauve4' },
                '&:focus': { boxShadow: `0 0 0 2px $colors$grayA7` },
            },

            violetAlt: {
                backgroundColor: '$violet9',
                color: '#ffffff',
                boxShadow: `0 2px 10px $colors$blackA3`,
                '&:hover': { backgroundColor: '$violet10' },
                '&:focus': { boxShadow: `0 2px 10px $colors$blackA3, 0 0 0 2px $colors$violetA7` },
            },
            orangeAlt: {
                backgroundColor: '$orange9',
                color: '#ffffff',
                boxShadow: `0 2px 10px $colors$blackA3`,
                '&:hover': { backgroundColor: '$orange10' },
                '&:focus': { boxShadow: `0 2px 10px $colors$blackA3, 0 0 0 2px $colors$orangeA7` },
            },

            white: {
                backgroundColor: '$gray1',
                '&:hover': {
                    backgroundColor: '$gray2',
                },
                '&:focus': { boxShadow: `0 0 0 2px $colors$grayA7` },

            },
            gray: {
                backgroundColor: '$grayA3',
                '&:hover': {
                    backgroundColor: '$grayA4',
                },
                '&:focus': { boxShadow: `0 0 0 2px $colors$grayA7` },

            },


            disabled: {
                backgroundColor: '$mauve2',
                color: '$mauve7',
                cursor: 'not-allowed',
                border: "1px solid $mauve6",
                pointerEvents: 'none',
                '&:hover': { backgroundColor: '$mauve3' },
                '&:focus': { borderColor: `$violet10` },
            },

        },
    },

    defaultVariants: {
        variant: 'gray',
        size: "md",
        center: true
    },


});

const ChildrenLoading = styled('span', {
    display: 'flex',
    lineHeight:"normal",
    mr: '$1'
})

const StyledStartEnhancer = styled('span', {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: 1,
    marginRight: '1em',
})

const StyledEndEnhancer = styled('span', {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: 1,
    marginLeft: '1em',
})



const Button = React.forwardRef(({
    children,
    isLoading,
    startEnhancer,
    endEnhancer,
    css,
    ...props
}, forwardedRef) => {





    return <StyledButton {...props} css={{
        pointerEvents: isLoading ? "none" : "inital",
        ...css
    }} ref={forwardedRef}>
        {isLoading ? (
            <>
                <ChildrenLoading>{children}</ChildrenLoading>
                <StyledLoading />
            </>

        ) : (
            <>
                {startEnhancer && (
                    <StyledStartEnhancer>
                        {startEnhancer}
                    </StyledStartEnhancer>
                )}
                <span>{children}</span>
                {endEnhancer && (
                    <StyledEndEnhancer>
                        {endEnhancer}
                    </StyledEndEnhancer>
                )}
            </>
        )}
    </StyledButton>
})

Button.toString = () => `.${StyledButton.className}`;

export default Button

