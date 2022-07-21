import React from 'react';
import { styled } from '@stitches/react';
import { violet, blackA, gray } from '@radix-ui/colors';
import { CheckIcon, DividerHorizontalIcon } from '@radix-ui/react-icons';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import {VisuallyHidden} from '@react-aria/visually-hidden';
import {useFocusRing} from '@react-aria/focus';
import { useToggleState } from 'react-stately';
import { useCheckbox } from 'react-aria';

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
    all: 'unset',
    backgroundColor: '$gray3',
    width: 20,
    height: 20,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border:"1px solid $mauve4",
    boxShadow: `0 2px 10px ${blackA.blackA5}`,

    '&:hover': { backgroundColor: gray.gray4 },
    '&:focus': { boxShadow: `0 2px 10px ${blackA.blackA3}, 0 0 0 2px ${blackA.blackA5}` },
});

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
    color: gray.gray12,
});



export {
    StyledCheckbox,
    StyledIndicator
}



