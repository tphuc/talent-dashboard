import React from 'react';
import { styled } from 'stitches.config';
import { violet, mauve, blackA, green, gray } from '@radix-ui/colors';
import * as TabsPrimitive from '@radix-ui/react-tabs';

const StyledTabs = styled(TabsPrimitive.Root, {
  display: 'flex',
  flexDirection: 'column',
  minWidth: 300,
//   boxShadow: `0 2px 10px ${blackA.blackA4}`,
  borderRadius:'$4',
  
});

const StyledList = styled(TabsPrimitive.List, {
//   flexShrink: 0,
  display: 'flex',
    marginBottom:"$1",
    backgroundColor:gray.gray2,
    alignSelf:"start",
    borderRadius:"$4"
  
//   borderBottom: `1px solid ${mauve.mauve6}`,
});

const StyledTrigger = styled(TabsPrimitive.Trigger, {
  all: 'unset',
  fontFamily: 'inherit',

  padding: '0 20px',
  height: '$6',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 15,
  lineHeight: 1,
  color: mauve.mauve11,
  userSelect: 'none',
  borderRadius:"$4",
//   '&:first-child': { borderTopLeftRadius: 6 },
//   '&:last-child': { borderTopRightRadius: 6 },


  

  '&:focus': { position: 'relative', boxShadow: `0 0 0 2px black` },
  variants: {
      size: {
          sm: {
              height:"$6"
          },
          md: {
            height:"$7"
        },
        lg: {
            height:"$8"
        }
      },
      variant: {
        orange: {
            '&:hover': { color: '$orange10' },
            '&[data-state="active"]': {
                color: '$orange10',
                backgroundColor: 'white',
                boxShadow: `0 2px 10px $colors$blackA3, 0 0 0 2px $colors$grayA2`
              },
        },
        violet: {
            '&:hover': { color: '$violet10' },
            '&[data-state="active"]': {
                color: '$violet10',
                backgroundColor: 'white',
                boxShadow: `0 2px 10px $colors$blackA3, 0 0 0 2px $colors$grayA2`
              },
        },

        violetAlt: {
            '&:hover': { color: '$violet10' },
            '&[data-state="active"]': {
                color: '$gray1',
                backgroundColor: '$violet10',
                boxShadow: `0 2px 10px $colors$blackA3`
              },
        },
        orangeAlt: {
            '&:hover': { color: '$orange10' },
            '&[data-state="active"]': {
                color: '$gray1',
                backgroundColor: '$orange10',
                boxShadow: `0 2px 10px $colors$blackA3`
              },
        },

      }
  },
  defaultVariants:{
      variant:"orangeAlt",
      size:"md"
  }
});

const StyledContent = styled(TabsPrimitive.Content, {
  flexGrow: 1,
  borderRadius:"$4",
  outline: 'none',
  // '&:focus': { boxShadow: `0 0 0 1px $colors$mauve4` },
});

// Exports
export const Tabs = StyledTabs;
export const TabsList = StyledList;
export const TabsTrigger = StyledTrigger;
export const TabsContent = StyledContent;
