
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { styled } from 'stitches.config';


const StyledAvatar = styled(AvatarPrimitive.Root, {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    overflow: 'hidden',
    userSelect: 'none',
    width: 32,
    height: 32,
    borderRadius: '100%',
    backgroundColor: '#111',
    variants: {
      size: {
        sm: {
          width:32,
          height:32
        },
        md: {
          width:44,
          height:44
        },
        lg: {
          width:56,
          height:56
        }
      }
    },
    defaultVariants: {
      size:"md"
    }
  });

const StyledImage = styled(AvatarPrimitive.Image, {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 'inherit',
  });
  
  const StyledFallback = styled(AvatarPrimitive.Fallback, {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    color: '$violet11',
    fontSize: 15,
    lineHeight: 1,
    fontWeight: 500,
  });
  
  // Exports
  export const Avatar = StyledAvatar;
  export const AvatarImage = StyledImage;
  export const AvatarFallback = StyledFallback;