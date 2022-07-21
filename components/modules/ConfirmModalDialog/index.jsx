import { Box } from 'components/Box';
import Button from 'components/Button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from 'components/Dialog';
import { Text } from 'components/Text';
import React from 'react';





export const ConfirmModalDialog = ({children, triggerRef, asChild=true, triggerStyle, alertText, onConfirm}) => {
    return <Dialog>
        <DialogTrigger ref={triggerRef} style={triggerStyle} asChild={asChild}>
            {children}
        </DialogTrigger>
        <DialogContent css={{maxWidth: 500}}>
            <Box css={{padding:"$3", background:"$gray1", borderRadius:"$5"}}>
                {alertText}
                <div style={{display:'flex', justifyContent:"flex-end"}}>
                <DialogClose asChild>
                    <Button>Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button css={{ml:"$2"}} onClick={onConfirm} variant='orangeAlt'>Okay</Button>
                </DialogClose>
                </div>
            </Box>
        </DialogContent>
    </Dialog>
}