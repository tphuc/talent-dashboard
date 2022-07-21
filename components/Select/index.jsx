import { useSelectState } from '@react-stately/select';
import { Item } from '@react-stately/collections';
import { HiddenSelect, useSelect } from '@react-aria/select';
import { useListBox, useOption } from '@react-aria/listbox';
import { mergeProps } from '@react-aria/utils';
import { useButton } from '@react-aria/button';
import { useFocus } from '@react-aria/interactions';
import { FocusScope } from '@react-aria/focus';
import { useOverlay, DismissButton, useModal, useOverlayPosition } from '@react-aria/overlays';
import React from 'react';
import Button from 'components/Button';
import { styled } from 'stitches.config';
import { ChevronDownIcon } from '@radix-ui/react-icons';



const StyledSelectContainer = styled('div', {
    position: 'relative', display: 'inline-block',
    width: 'auto'
})

const StyledLabel = styled('div', {
    fontSize: '$3',
    fontWeight: 500,
    color: '$mauve12',
    userSelect: 'none',
    marginBottom: '$1'
});

const StyledOverlayUl = styled('ul', {
    position: 'absolute',
    width: '100%',
    minWidth:200,
    margin: '$1 0 0 0',
    padding: '$1',
    listStyle: 'none',
    background: '$mauve2',
    borderRadius: '$3',
    boxShadow: `0 2px 10px $colors$grayA7, 0 0 0 1px $colors$grayA3`,
    maxHeight:240,
    overflow:"scroll",
    zIndex:100

})

const StyledListItem = styled('li', {
    padding:"$1 $2",
    borderRadius:"$2",

    variants: {
        variant: {
            orange: {
                color: '$gray9',
                '&[aria-selected=true]':{
                    background:"$orange10",
                    color:"$mauve1"
                },
                '&:hover': { backgroundColor: '$mauve4', color:"$orange10" },
                // '&:focus': { boxShadow: `0 0 0 2px $colors$grayA6` },
            },
            violet: {
                color: '$gray9',
                '&[aria-selected=true]':{
                    background:"$violet10",
                    color:"$mauve1"
                },
                '&:hover': { backgroundColor: '$mauve4', color:"$orange10" },
                // '&:focus': { boxShadow: `0 0 0 2px $colors$grayA6` },
            },
    
            violetAlt: {
                color: '$gray9',
                '&[aria-selected=true]':{
                    background:"$violet10",
                    color:"$mauve1"
                },
                '&:hover': { backgroundColor: '$mauve4', color:"$orange10" },
                // '&:focus': { boxShadow: `0 0 0 2px $colors$grayA6` },
            },
            orangeAlt: {
                color: '$gray9',
                '&[aria-selected=true]':{
                    background:"$orange10",
                    color:"$mauve1"
                },
                '&:hover': { backgroundColor: '$mauve4', color:"$orange10" },
                // '&:focus': { boxShadow: `0 0 0 2px $colors$grayA6` },
            },
    
            white: {

                color:"$mauve12",
                '&[aria-selected=true]':{
                    background:"$gray11",
                    color:"$gray1"
                },
                '&:hover': {
                    backgroundColor: '$grayA2',
                },
                // '&:focus': { boxShadow: `0 0 0 2px $colors$grayA6` },
    
            },
            gray: {
                color:"$mauve12",
                '&[aria-selected=true]':{
                    background:"$mauve4",
                    color:"$mauve12"
                },
                '&:hover': {
                    backgroundColor: '$grayA2',
                },
                // '&:focus': { boxShadow: `0 0 0 2px $colors$grayA6` },
    
            },
        },
    },
    
    defaultVariants: {
        variant: 'gray',
    },
})



function ListBoxPopup({ state, triggerRef, variant, ...otherProps }) {
    let ref = React.useRef();

    // Get props for the listbox
    let { listBoxProps } = useListBox(
        {
            autoFocus: state.focusStrategy,
            disallowEmptySelection: true
        },
        state,
        ref
    );

    // Handle events that should cause the popup to close,
    // e.g. blur, clicking outside, or pressing the escape key.
    let overlayRef = React.useRef();
    let { overlayProps } = useOverlay(
        {
            onClose: () => state.close(),
            shouldCloseOnBlur: true,
            isOpen: state.isOpen,
            isDismissable: true
        },
        overlayRef
    );


    // let { modalProps } = useModal();

    // Get props for the dialog and its title


    // Wrap in <FocusScope> so that focus is restored back to the
    // trigger when the popup is closed. In addition, add hidden
    // <DismissButton> components at the start and end of the list
    // to allow screen reader users to dismiss the popup easily.
    return (
        <FocusScope restoreFocus>
            <div  {...mergeProps(overlayProps, otherProps)} ref={overlayRef}>
                <DismissButton onDismiss={() => state.close()} />
                <StyledOverlayUl
                    variant={variant}
                    {...mergeProps(listBoxProps, otherProps)}
                    ref={ref}
                >
                    {[...state.collection].map((item) => (
                        <Option variant={variant} key={item.key} item={item} state={state} />
                    ))}
                </StyledOverlayUl>
                <DismissButton onDismiss={() => state.close()} />
            </div>
        </FocusScope>
    );
}

function Option({ item, state, ...otherProps }) {
    // Get props for the option element
    let ref = React.useRef();
    let isDisabled = state.disabledKeys.has(item.key);
    let isSelected = state.selectionManager.isSelected(item.key);
    let { optionProps } = useOption(
        {
            key: item.key,
            isDisabled,
            isSelected,
            shouldSelectOnPressUp: true,
            shouldFocusOnHover: true
        },
        state,
        ref
    );

    // Handle focus events so we can apply highlighted
    // style to the focused option
    let [isFocused, setFocused] = React.useState(false);
    let { focusProps } = useFocus({ onFocusChange: setFocused });

    return (
        <StyledListItem
            {...mergeProps(optionProps, focusProps, otherProps)}
            ref={ref}
            style={{
                // background: isSelected
                //     ? 'blueviolet'
                //     : isFocused
                //         ? 'gray'
                //         : 'transparent',
                // color: isSelected || isFocused ? 'white' : 'black',
                outline: 'none',
                cursor: 'pointer'
            }}>
            {item.rendered}
        </StyledListItem>
    );
}



const Select = ({
    placeholder='select an option',
    buttonProps: _buttonProps,
    ...props
}) => {
    // Create state based on the incoming props
    let state = useSelectState({
        ...props
    });
    


    // Get props for child elements from useSelect
    let ref = React.useRef();
    let { labelProps, triggerProps, valueProps, menuProps } = useSelect(
        props,
        state,
        ref
    );

    let { buttonProps } = useButton(triggerProps, ref);

   

    // Get props for the button based on the trigger props from useSelect

    return (
        <>
        <StyledLabel {...labelProps}>{props.label}</StyledLabel>
        <StyledSelectContainer {...props}>

            <HiddenSelect
                state={state}
                triggerRef={ref}
                label={props.label}
                name={props.name}
            />
            <Button center={false} css={{width:'100%', poisition:"relative"}} {...buttonProps} {..._buttonProps} endEnhancer={<ChevronDownIcon />} {...triggerProps} ref={ref}>
                <span {...valueProps}>
                    {state.selectedItem
                        ? state.selectedItem.rendered
                        : placeholder}
                </span>
            </Button>
            {state.isOpen && (
                <ListBoxPopup variant={_buttonProps?.variant} {...menuProps} state={state} />
            )}
        </StyledSelectContainer>
        </>
    );
}


Select.Item = Item;


export default Select