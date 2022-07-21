import { DotsVerticalIcon, Pencil2Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { styled } from "@stitches/react";
import Button from "components/Button";
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "components/Dialog";
import { Input } from "components/Input";
import { ConfirmModalDialog } from "components/modules/ConfirmModalDialog";
import Table from "components/Table";
import { H4, Text } from "components/Text";
import { useToasts } from "components/Toast";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useCRUDJobType } from "services/crud/useCRUDJobTypes";
import { useCRUDSalaryRange } from "services/crud/useCRUDSalaryRanges";
import { useGetJobTypes } from "services/swr/useGetJobTypes";
import { useGetSalaryRanges } from "services/swr/useGetSalaryRanges";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "components/DropdownMenu";
import { StyledDropdownItem } from "components/modules/StyledDropdownItem";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { StyledErrorMessage } from "components/modules/StyledErrorMessage";
import { CSVLink } from "react-csv";


const Panel = styled('div', {
    padding: "$2",
    background: "$gray2",
    borderRadius: "$4",
    position: "relative",
    minHeight: 100
})

const Card = styled('div', {
    padding: "$5",
    background: "white",
    borderRadius: '$5',
    minHeight: 100,
    boxShadow: "boxShadow: `0 2px 10px $colors$blackA7"
})

const StyledEventLink = styled('div', {
    padding: "5px",
    borderRadius: '$3',
    background: "$mauve4",
    border: "1px solid $mauve4"
})

const schema = yup.object().shape({
    salary_from: yup.number().typeError("Must be a number").min(0, 'must be greater than 0').required(),
    salary_to: yup.number().typeError('must be a number').min(0, 'must be greater than 0').required()
});


var USDformat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});


const Form = ({ title, onSubmit = async () => { }, defaultValues }) => {
    const closeRef = useRef()
    const { handleSubmit, register, formState: { errors } } = useForm({

        defaultValues,
        resolver: yupResolver(schema)
    });

    const [loading, setLoading] = React.useState(false);

    const _onSubmit = async (params) => {
        setLoading(true)
        let res = await onSubmit(params)
        setLoading(false)
        if (res)
            closeRef.current?.click()
    }

    return <Panel css={{ padding: "$4" }}>
        <Text css={{ my: '$2', color: "$mauve11" }}>{title}</Text>
        <form onSubmit={handleSubmit(_onSubmit)}>
            <Card>
                <Input {...register('salary_from')} placeholder='min salary (USD)' label='Min salary'></Input>
                <StyledErrorMessage>{errors.salary_from?.message}</StyledErrorMessage>
                <Input {...register('salary_to')} placeholder='max salary (USD)' label='Max salary'></Input>
                <StyledErrorMessage>{errors.salary_to?.message}</StyledErrorMessage>
            </Card>
            <br />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <DialogClose asChild>
                    <Button ref={closeRef}>Cancel</Button>
                </DialogClose>
                <Button isLoading={loading} css={{ ml: "$1" }} variant='orangeAlt' type='submit'>Submit</Button>
            </div>
        </form>
    </Panel>
}


export default function JobSalaryRange() {


    const { data, mutate } = useGetSalaryRanges();
    const toast = useToasts()

    const rows = data?.map((item, id) => ({
        id,
        salary: `${USDformat.format(item?.salary_from)} - ${USDformat.format(item?.salary_to)}`,
        _action: <div>
            <Dialog modal>
                <DialogTrigger asChild>
                    <Button ><Pencil2Icon /></Button>
                </DialogTrigger>
                <DialogContent css={{ maxWidth: 400 }} >
                    <Form title='Edit salary range' onSubmit={async (values) => onEdit(item.id, values)} defaultValues={{
                        salary_from: item.salary_from,
                        salary_to: item.salary_to
                    }}></Form>
                </DialogContent>
            </Dialog>
            <ConfirmModalDialog onConfirm={async () => {
                await remove(item.id)
                mutate()
            }} alertText={'Are you sure to proceed action?'}>
                <Button><TrashIcon /></Button>
            </ConfirmModalDialog>
        </div>
    }))
    const { create, update, remove } = useCRUDSalaryRange();




    const onAdd = async (values) => {
        try {
            let res = await create(values)
            const { salary_from, salary_to } = values;
            if (salary_from > salary_to) {
                toast.add('Min salary should not be greater than max salary')
                return false
            }


            if (res.data.status) {
                toast.add('Add item successfully')
                mutate()
            }
            else {
                toast.add(res.data?.message)
                return false
            }
        } catch (e) {
            toast.add('Add item failed')
            return false
        }

        return true
    }

    const onEdit = async (id, values) => {

        try {
            let res = await update(id, values)

            const { salary_from, salary_to } = values;
            if (salary_from >= salary_to) {
                toast.add('Min salary should not be equal or greater than max salary')
                return false
            }

            if (res.data.status) {
                toast.add('Edit item successfully')
                mutate()
            }
            else {
                toast.add(res.data?.message)
                return false
            }
        } catch (e) {
            toast.add('Edit item failed')
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
            return false
        }

        return true
    }

    const createModaltrigger = useRef()

    return <div>
        <div style={{ display: "flex", justifyContent: 'space-between', alignItems: "center", padding: 5 }}>
            <span><b>Salary Ranges</b></span>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button><DotsVerticalIcon /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={5}>
                    <DropdownMenuItem onSelect={() => createModaltrigger.current?.click()} >
                        <StyledDropdownItem>Create new one</StyledDropdownItem>
                    </DropdownMenuItem>
                    <DropdownMenuItem >
                        <StyledDropdownItem>Mass Upload</StyledDropdownItem>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CSVLink
                            data={data?.map(item => ({ salary_from: item.salary_from, salary_to: item.salary_to }))}
                            filename={"data.csv"}
                            target="_blank"
                            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
                        >
                            <StyledDropdownItem>
                                Export List
                            </StyledDropdownItem>
                        </CSVLink>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog modal>
                <DialogTrigger style={{ display: "none" }} ref={createModaltrigger} ></DialogTrigger>
                <DialogContent css={{ maxWidth: 400 }} >
                    <Form title='Add salary range' onSubmit={onAdd}></Form>
                </DialogContent>
            </Dialog>

        </div>

        <Table

            sortable
            rowsPerPage={10}
            columns={[
                {
                    Header: "No",
                    accessor: "id"
                },
                {
                    Header: 'Salary range',
                    accessor: 'salary',
                    filter: 'fuzzyText',
                },

                {
                    Header: 'Actions',
                    accessor: '_action',
                    disableSort: true
                },
            ]}
            data={rows || []} />


    </div>
}


