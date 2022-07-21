

import { Checkbox, useCheckboxState } from "ariakit/checkbox";
import { Group, GroupLabel } from "ariakit/group";
import { styled } from "stitches.config"

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from "@radix-ui/react-icons";
const StyledLabel = styled(GroupLabel, {
    fontSize: '$3',
    fontWeight: 500,
    color: '$mauve12',
    userSelect: 'none',
    marginBottom: '$1'
});


const StyledCheckbox = styled(CheckboxPrimitive.Root, {
    all: 'unset',
    backgroundColor: '$gray4',
    width: 20,
    height: 20,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 2px 10px $blackA7`,
    '&[aria-checked="true"]':{
        backgroundColor:"$orange10"
    },
    '&:focus': { boxShadow: `0 0 0 2px black` },
})

const Label = styled('label', {
    display:"inline-flex",
    alignItems:"center",
    gap:5,
    fontSize: '$3',
})

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
    color: 'white',

});


export default function GroupCheckBox() {
    const checkbox = useCheckboxState({ defaultValue: [] });


    return (
        <Group >
            <StyledLabel>Your favorite fruits</StyledLabel>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                gap:5
            }}>
                <Label>
                    <StyledCheckbox state={checkbox} value="apple">
                        <StyledIndicator>
                            <CheckIcon/>
                        </StyledIndicator>
                    </StyledCheckbox>
                    Apple
                </Label>
                <Label>
                    <StyledCheckbox state={checkbox} value="apple">
                        <StyledIndicator>
                            <CheckIcon/>
                        </StyledIndicator>
                    </StyledCheckbox>
                    Apple
                </Label>
                <Label>
                    <StyledCheckbox state={checkbox} value="apple">
                        <StyledIndicator>
                            <CheckIcon/>
                        </StyledIndicator>
                    </StyledCheckbox>
                    Apple
                </Label>
            </div>
        </Group>
    );
}
