/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from "react";
import { useListBox, useOption } from "react-aria";
import { CheckIcon } from '@radix-ui/react-icons'
import { styled } from "stitches.config";

// interface ListBoxProps extends AriaListBoxOptions<unknown> {
//   listBoxRef?: React.RefObject<HTMLUListElement>;
//   state: ListState<unknown>;
//   loadingState?: LoadingState;
//   onLoadMore?: () => void;
// }

// interface OptionProps {
//   item: Node<unknown>;
//   state: ListState<unknown>;
// }

const Box = styled('div', {

})

const List = styled('ul', {
  overflow: "auto",
  maxHeight: "300",
  px: '0',
  // py:"$2",
  mx: "0",
  my: "0",
  display: "flex",
  flexDirection: "column"
})

const ListItem = styled('li', {
  whiteSpace:"nowrap",
  px: "$2",
  py: "$2",
  borderRadius: "$3",
  color: "&gray10",
  cursor: "default",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "transparent",
  '&:hover': {
    backgroundColor: '$grayA3',
  },
  '&:focus': { boxShadow: `0 0 0 2px $colors$grayA7` },
  '&[aria-selected="true"]': {
    backgroundColor: "$mauve4",
  }
})

export function ListBox(props) {
  let ref = React.useRef(null);
  let { listBoxRef = ref, state } = props;
  let { listBoxProps } = useListBox(props, state, listBoxRef);

  let onScroll = (e) => {
    let scrollOffset =
      e.currentTarget.scrollHeight - e.currentTarget.clientHeight * 2;
    if (e.currentTarget.scrollTop > scrollOffset && props.onLoadMore) {
      props.onLoadMore();
    }
  };

  return (
    <List
      {...listBoxProps}
      ref={listBoxRef}

      onScroll={onScroll}
    >
      {[...state.collection].map((item) => (
        <Option key={item.key} item={item} state={state} />
      ))}
      {props.loadingState === "loadingMore" && (
        // Display a spinner at the bottom of the list if we're loading more.
        // role="option" is required for valid ARIA semantics since
        // we're inside a role="listbox".
        <span>loading more...</span>
      )}
    </List>
  );
}

function Option({ item, state }) {
  let ref = React.useRef(null);
  let { optionProps, isSelected, isFocused } = useOption(
    {
      key: item.key
    },
    state,
    ref
  );

  return (
    <ListItem
      {...optionProps}
      ref={ref}
      css={{

      }}

    >
      {item.rendered}
      {isSelected && <CheckIcon />}
    </ListItem>
  );
}
