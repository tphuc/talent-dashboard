import { Pencil2Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { styled } from "@stitches/react";
import { Avatar, AvatarImage } from "components/Avatar";
import { Box } from "components/Box";
import Button from "components/Button";
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "components/Dialog";
import { Column } from "components/Flex";
import { Input, TextareaInput } from "components/Input";
import { ConfirmModalDialog } from "components/modules/ConfirmModalDialog";
import PaginatedList from "components/PaginatedList";
import Select from "components/Select";
import Table from "components/Table";
import { H3, H4, Text } from "components/Text";
import { useToasts } from "components/Toast";
import NoteItem from "containers/NoteItem";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useCRUDJobMember } from "services/crud/useCRUDJobMember";
import { useCRUDNote } from "services/crud/useCRUDNote";
import { useCRUDVendoTypes } from "services/crud/useCRUDVendorTypes";
import { useGetMembersByJob } from "services/swr/useGetMembersByJob";
import { useGetNotesByCandidate } from "services/swr/useGetNotesByCandidate";
import { useGetNotesByJob } from "services/swr/useGetNotesByJob";
import { useGetUserRoles } from "services/swr/useGetUserRoles";
import { useGetUsers } from "services/swr/useGetUsers";



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
    console.log(defaultValues)
    const { handleSubmit, register, setValue } = useForm({
        defaultValues
    });

    const { data: users } = useGetUsers();
    const { data: userRoles } = useGetUserRoles();

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
            <Box css={{
                display: "grid",
                // gridTemplateColumns: "repeat(2, 1fr)",
                justifyContent: "center",
                gridGap: '$3',
                '@mobile': {
                    gridTemplateColumns: '1fr'
                },
                '@bp3': {
                    gridTemplateColumns: "repeat(1,1fr)",
                }

            }}>
                <div>
                    <Select selectedKey={defaultValues?.user_id?.toString()} onSelectionChange={(val) => setValue('user_id', val)} css={{ width: "100%" }} placeholder='select user' label='User'>
                        {users?.map((item, id) => <Select.Item key={item.id} value={item.id} textValue={item.name}>{item.name}</Select.Item>)}
                    </Select>
                </div>
                <div>
                    <Select defaultSelectedKey={defaultValues?.role_id?.toString()} onSelectionChange={(val) => setValue('role_id', val)} css={{ width: "100%" }} placeholder='select role' label='Role'>
                        {userRoles?.map((item, id) => <Select.Item key={item.id} value={item.id} textValue={item.name}>{item.name}</Select.Item>)}
                    </Select>
                </div>
            </Box>
           
            </Card>
            <br/>


            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <DialogClose asChild>
                    <Button>Cancel</Button>
                </DialogClose>
                <Button isLoading={loading} css={{ ml: "$1" }} variant='orangeAlt' type='submit'>Submit</Button>
            </div>
        </form>
    </Panel>
}


export default function JobMembers() {

    const { id } = useRouter().query
    const { data, mutate } = useGetMembersByJob(id);
    console.log(data)
    const toast = useToasts()

    const { create, update, remove } = useCRUDJobMember();





    const onAdd = async (values) => {
        try {
            let res = await create({
                job_id: id,
                ...values
            })


            if (res.data.status) {
                toast.add('Add job member successfully')
                mutate()
            }
            else {
                toast.add(res.data?.message)
            }
        } catch (e) {
            toast.add('Add job member failed')
            console.log(e)
        }

        return
    }

    const onEdit = async (_id, values) => {
        try {
            let res = await update(_id, {
                job_id: id,
                ...values
            })

            if (res?.data?.status) {
                toast.add('Edit member successfully')
                mutate()
            }
            else {
                console.log(res)
                toast.add(res?.data?.message)
            }
        } catch (e) {
            toast.add('Edit member failed')
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
                        <Button variant='violetAlt' >Add member<PlusIcon></PlusIcon></Button>
                    </DialogTrigger>
                    <DialogContent css={{ maxWidth: 400 }} >
                        <Form title='Add new member' onSubmit={onAdd}></Form>
                    </DialogContent>
                </Dialog>
            </div>


            <Table
                        // renderRowSelectedActions={(selectedRowIds) => {
                        //     return <ActionIcon color='red' variant="filled">
                        //         <RiDeleteBin4Line />
                        //     </ActionIcon>
                        // }}

                        sortable

                        rowsPerPage={10}
                        columns={[
                            {
                                Header: 'Name',
                                accessor: 'name',
                                filter: 'fuzzyText',
                            },
                            {
                                Header: 'Contact',
                                accessor: 'contact',
                            },
                            {
                                Header: 'Department',
                                accessor: 'department',
                            },
                            {
                                Header: 'Role',
                                accessor: 'role',
                            },
                            {
                                Header: 'Actions',
                                accessor: '_action',
                                disableSort: true
                            },
                        ]}
                        data={data?.map((user,_id) => ({
                            name: <div>
                                <Avatar size='sm' css={{ mr: "$2" }} >
                                    <AvatarImage src={user?.profile_image_url} />
                                    {/* <AvatarFallback /> */}
                                </Avatar>
                                {user?.users?.name}
                            </div>,
                            contact: user?.users?.email,
                            department: "Design Team",
                            role: 'Hiring Manager',
                            _action: <div>
                            <Dialog modal>
                                <DialogTrigger asChild>
                                    <Button ><Pencil2Icon /></Button>
                                </DialogTrigger>
                                <DialogContent css={{ maxWidth: 400 }} >
                                    <Form title='Edit member' onSubmit={async (values) => onEdit(item.id, values)} defaultValues={{
                                        role_id: user.role_id,
                                        user_id: user.user_id
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
                        })) || []}
                        />

            {
                data?.map((item, id) => <div key={id}>
                    <H3>{item.name}</H3>

                    

                    
                </div>)
            }


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


