import { Pencil2Icon, PlusIcon, TrashIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
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
import { useCRUDCommissionTypes } from "services/crud/useCRUDComissionTypes";
import { useGetCommissionTypes } from "services/swr/useGetCommissionTypes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "components/DropdownMenu";
import { StyledDropdownItem } from "components/modules/StyledDropdownItem";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { CSVLink } from "react-csv";
const schema = yup.object().shape({
    name: yup.string().required('field should not be empty'),
});



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



const Form = ({ title, onSubmit = async () => { }, defaultValues }) => {
    const closeRef = useRef()
    const { handleSubmit, register, formState } = useForm({
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
                <Input {...register('name')} errorMessage={formState.errors.name?.message} label='Name'></Input>
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


export default function SettingCommissionTypes() {


    const { data, mutate } = useGetCommissionTypes();
    const toast = useToasts()

    const rows = data?.map((item, id) => ({
        id,
        name: item?.name,
        _action: <div>
            <Dialog modal>
                <DialogTrigger asChild>
                    <Button ><Pencil2Icon /></Button>
                </DialogTrigger>
                <DialogContent css={{ maxWidth: 400 }} >
                    <Form title={'Edit commission type'} onSubmit={async (values) => onEdit(item.id, values)} defaultValues={{
                        name: item.name
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
    const { create, update, remove } = useCRUDCommissionTypes();




    const onAdd = async (values) => {
        try {
            let res = await create(values)


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
            console.log(e)
            return false
        }

        return true
    }

    const onEdit = async (id, values) => {
        console.log(id, values)
        try {
            let res = await update(id, values)

            if (res.data.status) {
                toast.add('Edit vendor type successfully')
                mutate()
            }
            else {
                toast.add(res.data?.message)
                return false
            }
        } catch (e) {
            toast.add('Edit vendor failed')
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
            <span><b>Commission types</b></span>
            <DropdownMenu  >
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
                            data={data?.map(item => ({ name: item.name }))}
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
                    <Form title='Add commission type' onSubmit={onAdd}></Form>
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
                    Header: 'Name',
                    accessor: 'name',
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


