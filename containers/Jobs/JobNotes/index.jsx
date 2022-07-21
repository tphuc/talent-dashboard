import { Pencil2Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { styled } from "@stitches/react";
import Button from "components/Button";
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "components/Dialog";
import { Column } from "components/Flex";
import { Input, TextareaInput } from "components/Input";
import { ConfirmModalDialog } from "components/modules/ConfirmModalDialog";
import PaginatedList from "components/PaginatedList";
import Table from "components/Table";
import { H4, Text } from "components/Text";
import { useToasts } from "components/Toast";
import NoteItem from "containers/NoteItem";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useCRUDNote } from "services/crud/useCRUDNote";
import { useCRUDVendoTypes } from "services/crud/useCRUDVendorTypes";
import { useGetNotesByCandidate } from "services/swr/useGetNotesByCandidate";
import { useGetNotesByJob } from "services/swr/useGetNotesByJob";



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
    const { handleSubmit, register } = useForm({
        defaultValues
    });

    const [loading, setLoading] = React.useState(false);

    const _onSubmit = async (params) => {
        setLoading(true)
        await onSubmit(params)
        setLoading(false)
    }

    return <Panel css={{ padding: "$4" }}>
        <Text css={{ my: '$2', color: "$mauve11" }}>{title}</Text>
        <form onSubmit={handleSubmit(_onSubmit)}>

            <TextareaInput type="textarea"  {...register('contents')} label='Content' />

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


export default function JobNotes() {

    const { id } = useRouter().query
    const { data, mutate } = useGetNotesByJob(id);
    const toast = useToasts()

    const { create, update, remove } = useCRUDNote();




    const onAdd = async (values) => {
        try {
            let res = await create({
                type: "job",
                notestable_id: id,
                ...values
            })


            if (res.data.status) {
                toast.add('Add note successfully')
                mutate()
            }
            else {
                toast.add(res.data?.message)
            }
        } catch (e) {
            toast.add('Add note failed')
            console.log(e)
        }

        return
    }

    const onEdit = async (_id, values) => {
        try {
            let res = await update(_id, {
                type: "job",
                notestable_id: id,
                ...values
            })

            if (res.data.status) {
                toast.add('Edit note successfully')
                mutate()
            }
            else {
                toast.add(res.data?.message)
            }
        } catch (e) {
            toast.add('Edit note failed')
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
        }

        return
    }



    return <div>
        <Column>
            <div style={{ marginBottom: 10, marginLeft: "auto", width: "auto" }}>
                <Dialog modal>
                    <DialogTrigger asChild>
                        <Button >Add new <PlusIcon></PlusIcon></Button>
                    </DialogTrigger>
                    <DialogContent css={{ maxWidth: 400 }} >
                        <Form title='Add new note' onSubmit={onAdd}></Form>
                    </DialogContent>
                </Dialog>
            </div>

            <PaginatedList items={data} renderItem={(item, id) =>
                <NoteItem key={item.id} item={item} actions={<div>
                    <Dialog modal>
                        <DialogTrigger asChild>
                            <Button ><Pencil2Icon /></Button>
                        </DialogTrigger>
                        <DialogContent css={{ maxWidth: 400 }} >
                            <Form title='Edit note' onSubmit={async (values) => onEdit(item.id, values)} defaultValues={{
                                contents: item.contents
                            }}></Form>
                        </DialogContent>
                    </Dialog>
                    <ConfirmModalDialog onConfirm={async () => {
                        await remove(item.id)
                        mutate()
                    }} alertText={'Are you sure to proceed action?'}>
                        <Button><TrashIcon /></Button>
                    </ConfirmModalDialog>
                </div>} />
            } />
        </Column>
        {/* <Table

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
            data={rows || []} /> */}

        { }


    </div>
}


