import React, { useState } from "react";
import { styled } from "stitches.config";
import { useTextField } from '@react-aria/textfield';
import { EyeOpenIcon, EyeNoneIcon } from "@radix-ui/react-icons";





const StyledLabel = styled('label', {
    fontSize: '$3',
    fontWeight: 500,
    color: '$mauve12',
    userSelect: 'none',
    marginBottom: '$1'
});

const StyledInputContainer = styled('div', {
    position:"relative",
    display: "flex",
    boxSizing:"border-box",
    flexDirection: "column",
})

const StyledStartEnhancer = styled('span', {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: 1,
    marginRight: '$1',
})

const StyledEndEnhancer = styled('span', {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: 1,
    marginLeft: '$1',
})


const StyledInputWrapper = styled('div', {
    all: 'unset',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '$3',
    fontSize: '$3',
    padding: "0 $2",
    lineHeight: 1,
    fontWeight: 400,
    color: '$gray12',
    backgroundColor: '$gray3',
    boxShadow: `0 2px 20px $colors$blackA3, 0 0 0 1px $colors$grayA3`,

    '&:focus-within': { boxShadow: `0 2px 10px $colors$blackA3, 0 0 0 2px $colors$grayA7` },
})

const StyledDescription = styled('div', {
    fontSize: '$3',
    fontWeight: 350,
    color: "$mauve9",
    marginTop: "$1"
})

const StyledError = styled('div', {
    fontSize: '$3',
    fontWeight: 350,
    color: "$red10"
})


const StyledInput = styled('input', {
    width: "100%",
    boxShadow: "none",
    border: "none",
    borderRadius: '$3',
    fontSize: '$3',
    height: '$6',
    lineHeight: 1,
    fontWeight: 400,
    color: '$gray12',
    backgroundColor: 'transparent',
    '&::placeholder': {
        color: '$grayA8',
        fontWeight: 400
    },
    '&:focus': {
        outline: 'none'
    },


});

const StyledTextarea = styled('textarea', {
    maxWidth: "100%",
    width:"100%",
    minHeight:"$9",
    boxShadow: "none",
    padding:'$2',
    border: "none",
    borderRadius: '$3',
    fontSize: '$3',
    lineHeight: 1,
    fontWeight: 400,
    color: '$gray12',
    backgroundColor: '$gray1',
    boxShadow: `0 2px 20px $colors$blackA3, 0 0 0 1px $colors$grayA3`,
    '&::placeholder': {
        color: '$grayA8',
        fontWeight: 400
    },
    '&:focus': {
        outline: 'none'
    },


});





const Input = React.forwardRef(({
    startEnhancer,
    endEnhancer,
    css,
    label,
    labelProps,
    description,
    descriptionProps,
    errorMessage,
    errorMessageProps,
    ...props
}, forwardedRef) => {

    return <StyledInputContainer css={css}>
        {label && <StyledLabel {...labelProps}>
            {label}
        </StyledLabel>}
        <StyledInputWrapper>
            {startEnhancer && <StyledStartEnhancer>
                {startEnhancer}
            </StyledStartEnhancer>}
            <StyledInput {...props} ref={forwardedRef} />
            {endEnhancer && <StyledEndEnhancer>
                {endEnhancer}
            </StyledEndEnhancer>}
        </StyledInputWrapper>

        {description && (
            <StyledDescription {...descriptionProps} >
                {description}
            </StyledDescription>
        )}
        {errorMessage &&
            <StyledError {...errorMessageProps} >
                {errorMessage}
            </StyledError>
        }
    </StyledInputContainer>
})






const InputPassword = React.forwardRef(({
    startEnhancer,
    endEnhancer,
    css,
    label,
    labelProps,
    description,
    descriptionProps,
    errorMessage,
    errorMessageProps,
    ...props
}, forwardedRef) => {


    const [visiblePassword, setVisiblePassword] = useState(false);
    return <StyledInputContainer css={css}>
        {label && <StyledLabel {...labelProps}>
            {label}
        </StyledLabel>}
        <StyledInputWrapper>
            <StyledInput  type={visiblePassword ? 'text' : 'password'}  {...props} ref={forwardedRef} />
            <StyledEndEnhancer onClick={() => setVisiblePassword(!visiblePassword)}>
                {visiblePassword ? <EyeNoneIcon /> : <EyeOpenIcon />}
            </StyledEndEnhancer>
        </StyledInputWrapper>

        {description && (
            <StyledDescription {...descriptionProps} >
                {description}
            </StyledDescription>
        )}
        {errorMessage &&
            <StyledError {...errorMessageProps} >
                {errorMessage}
            </StyledError>
        }
    </StyledInputContainer>
})


Input.toString = `${StyledInput.className}`

export { Input, InputPassword, StyledTextarea as TextareaInput }



