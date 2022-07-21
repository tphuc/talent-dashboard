import { Pencil2Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { styled } from "@stitches/react";
import Button from "components/Button";
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "components/Dialog";
import { Input } from "components/Input";
import { ConfirmModalDialog } from "components/modules/ConfirmModalDialog";
import Select from "components/Select";
import Table from "components/Table";
import { H4, Text } from "components/Text";
import { useToasts } from "components/Toast";
import React from "react";
import { useForm } from "react-hook-form";
import { useCRUDDepartment } from "services/crud/useCRUDDepartment";
import { useCRUDSkills } from "services/crud/useCRUDSkills";
import { useGetDepartments } from "services/swr/useGetDepartments";


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
    const { handleSubmit, register, setValue } = useForm({
        defaultValues
    });

    const {data: departments} = useGetDepartments();
    const [loading, setLoading] = React.useState(false);

    const _onSubmit = async (params) => {
        setLoading(true)
        await onSubmit(params)
        setLoading(false)
    }

    return <Panel css={{ padding: "$4" }}>
        <Text css={{ my: '$2', color: "$mauve11" }}>{title}</Text>
        <form onSubmit={handleSubmit(_onSubmit)}>
            <Card>
                <Input {...register('name')} label='Name'></Input>
                <br/>
                <div>
                    <Select defaultSelectedKey={defaultValues?.parent_id?.toString()} onSelectionChange={(val) => setValue('parent_id', val)} css={{ width: "100%" }} placeholder='select parent department' label='Parent department'>
                        {departments?.map((item, id) => <Select.Item key={item.id} value={item.id} textValue={item.name}>{item.name}</Select.Item>)}
                    </Select>
                </div>
            </Card>
            <br />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <DialogClose asChild>
                    <Button>Cancel</Button>
                </DialogClose>
                <Button isLoading={loading} css={{ ml: "$1" }} variant='orangeAlt' type='submit'>Submit</Button>
            </div>
        </form>
    </Panel>
}


export default function SettingDepartment() {


    const { data, mutate } = useGetDepartments();
    const toast = useToasts()

    const rows = data?.map((item, id) => ({
        name: item?.name,
        _action: <div>
            <Dialog modal>
                <DialogTrigger asChild>
                    <Button ><Pencil2Icon /></Button>
                </DialogTrigger>
                <DialogContent css={{ maxWidth: 400 }} >
                    <Form title='Edit department' onSubmit={async (values) => onEdit(item.id, values)} defaultValues={{
                        name: item?.name,
                        parent_id: item?.parent_id
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
    const { create, update, remove } = useCRUDDepartment();




    const onAdd = async (values) => {
        try {
            let res = await create(values)


            if (res.data.status) {
                toast.add('Add item successfully')
                mutate()
            }
            else {
                toast.add(res.data?.message)
            }
        } catch (e) {
            toast.add('Add item failed')
            console.log(e)
        }

        return
    }

    const onEdit = async (id, values) => {
        console.log(id, values)
        try {
            let res = await update(id, values)

            if (res.data.status) {
                toast.add('Edit item successfully')
                mutate()
            }
            else {
                toast.add(res.data?.message)
            }
        } catch (e) {
            toast.add('Edit item failed')
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
        }

        return
    }

    return <div>
        <div style={{ marginBottom: 10, float: 'right', width: "auto" }}>
            <Dialog modal>
                <DialogTrigger asChild>
                    <Button >Add new <PlusIcon></PlusIcon></Button>
                </DialogTrigger>
                <DialogContent css={{ maxWidth: 400 }} >
                    <Form title='Add new department' onSubmit={onAdd}></Form>
                </DialogContent>
            </Dialog>
        </div>

        <Table

            sortable
            rowsPerPage={10}
            columns={[
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


