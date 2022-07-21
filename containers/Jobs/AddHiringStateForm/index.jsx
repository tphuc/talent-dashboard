import styled from 'stitches.config';
import Button from 'components/Button';
import { Input } from 'components/Input';

const Panel = styled('div', {
    padding: "$2",
    background: "$gray2",
    borderRadius: "$4",
    minHeight: 300,

})

const StyledLabel = styled('div', {
    fontSize: '$3',
    fontWeight: 500,
    color: '$mauve12',
    userSelect: 'none',
    marginBottom: '$1'
});


const Card = styled('div', {
    background: 'white',
    borderRadius: "$4",
    padding: "$3",
    boxShadow: "0 2px 10px $colors$blackA3"
})

export default function AddHiringStageForm(){

    return (<Panel>
        <form>
            <Card>
                <Input label='Stage name'></Input>
                <Input label='Stage description'></Input>
            </Card>
            <Button variant='violetAlt'>Confirm</Button>
        </form>
    </Panel>)
}