import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { styled } from 'stitches.config';

export const Seperator = styled(SeparatorPrimitive.Root, {
    backgroundColor: '$mauve6',
    '&[data-orientation=horizontal]': { height: 1, width: '100%' },
    '&[data-orientation=vertical]': { height: '100%', width: 1 },
  });