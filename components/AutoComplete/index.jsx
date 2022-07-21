import React from 'react';
import { Item, useAsyncList, useComboBoxState } from "react-stately";
import { useComboBox, useFilter } from "react-aria";

import { ListBox } from "./ListBox";
import { Popover } from "./Popover";
import {Input} from 'components/Input';
import { styled } from 'stitches.config';



// export { Item, Section } from "react-stately";

const StyledContainer = styled('div', {
  position:"relative",
})

const StyledLabel = styled('label', {
  display:"block",
  fontSize: '$3',
  fontWeight: 400,
  color: '$mauve12',
  userSelect: 'none',
  marginBottom: '$1'
});


export function BaseAutocomplete({css, startEnhancer, endEnhancer, variant, ...props}) {
  let { contains } = useFilter({ sensitivity: "base" });
  let state = useComboBoxState({ ...props, defaultFilter: contains });

  let inputRef = React.useRef(null);
  let listBoxRef = React.useRef(null);
  let popoverRef = React.useRef(null);


  let { inputProps, listBoxProps, labelProps } = useComboBox(
    {
      ...props,
      inputRef,
      listBoxRef,
      popoverRef
    },
    state
  );

  return (
    <StyledContainer css={css}>
      {props.label && <StyledLabel {...labelProps}>{props.label}</StyledLabel>}
      <Input  startEnhancer={startEnhancer} endEnhancer={endEnhancer} variant={variant} {...inputProps}  ref={inputRef} ></Input>
    
      {state.isOpen && (
        <Popover
          popoverRef={popoverRef}
          isOpen={state.isOpen}
          onClose={state.close}
        >
          <ListBox
            {...listBoxProps}
            listBoxRef={listBoxRef}
            state={state}
            loadingState={props.loadingState}
            onLoadMore={props.onLoadMore}
          />
        </Popover>
      )}
    </StyledContainer>
  );
}





const AutoComplete = ({
  load,
  onChange = (val) => {},
  ...props
}) => {
  let list = useAsyncList({
    load
  });
  return <BaseAutocomplete
    items={list.items}
    inputValue={list.filterText}
    onInputChange={(val) => {
      list.setFilterText(val);
      onChange && onChange(val)
    }}
    loadingState={list.loadingState}
    onLoadMore={list.loadMore}
    {...props}
  >
    {props.children}
  </BaseAutocomplete>
}




export {
  AutoComplete,
  Item as AutoCompleteItem
}
