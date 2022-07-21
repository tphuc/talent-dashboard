import * as React from "react";
import { useOverlay, DismissButton, FocusScope } from "react-aria";
import { styled } from "stitches.config";

// interface PopoverProps {
//   popoverRef?: React.RefObject<HTMLDivElement>;
//   children: React.ReactNode;
//   isOpen?: boolean;
//   onClose?: () => void;
// }



const StyledOverlayUl = styled('div', {
   zIndex:1000,
    position: 'absolute',
    width: '100%',
    margin: '0',
    listStyle: 'none',
    background: '$mauve1',
    borderRadius: '$3',
    boxShadow: `0 2px 10px $colors$grayA7, 0 0 0 1px $colors$grayA7`,
})

export function Popover(props) {
  let ref = React.useRef(null);
  let { popoverRef = ref, isOpen, onClose, children } = props;

  // Handle events that should cause the popup to close,
  // e.g. blur, clicking outside, or pressing the escape key.
  let { overlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      shouldCloseOnBlur: true,
      isDismissable: true
    },
    popoverRef
  );

  // Add a hidden <DismissButton> component at the end of the popover
  // to allow screen reader users to dismiss the popup easily.
  return (
    <FocusScope restoreFocus>
 
        <StyledOverlayUl {...overlayProps}
        ref={popoverRef}
        css={{
          zIndex:1000
        }}>
        {children}
        </StyledOverlayUl>
        <DismissButton onDismiss={onClose} />

    </FocusScope>
  );
}
