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
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useCRUDNote } from "services/crud/useCRUDNote";
import { useCRUDVendoTypes } from "services/crud/useCRUDVendorTypes";
import { useGetNotesByCandidate } from "services/swr/useGetNotesByCandidate";
import { useGetVendorTypes } from "services/swr/useGetVendorTypes";
import CandidateNoteItem from "containers/NoteItem";
import { useCRUDCandidateResume } from "services/crud/useCRUDCandidateResume";
import CandidateResumeItem from "../ResumeItem";
import { useGetCandidateResumes } from "services/swr/useGetCandidateResumes";
import SingleFileUploader from "components/FileUploader";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { StyledErrorMessage } from "components/modules/StyledErrorMessage";
import { Box } from "components/Box";
import { RiDeleteBin4Line, RiDownloadLine, RiEyeLine } from "react-icons/ri";
import Link from "next/link";
// import { PDFViewer } from "components/PDFView";


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

const schema = yup.object({
    resume: yup.mixed()
        .test('required', "You need to provide a file", (value) => {
            return value && value.name
        })
}).required();



const Form = ({ title, onSubmit = async () => { }, defaultValues }) => {
    const closeRef = useRef()
    const { handleSubmit, register, formState, setValue } = useForm({
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

            <SingleFileUploader onChange={(file) => setValue('resume', file)} />
            <StyledErrorMessage>{formState.isSubmitted && formState.errors.resume?.message}</StyledErrorMessage>

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


export default function CandidateResume() {

    const { id } = useRouter().query
    const { data, mutate } = useGetCandidateResumes(id);
    const toast = useToasts()

    const { create, remove } = useCRUDCandidateResume();


    const onAdd = async (values) => {
        try {
            let res = await create(id, {
                ...values
            })

            if (res.data.status) {
                toast.add('Add resume successfully')
                mutate()
                return true
            }
            else {
                toast.add(res.data?.message)
                return false
            }
        } catch (e) {
            toast.add('Add resume failed')
            console.log(e)
            return false
        }

        return true
    }



    const onRemove = async (_id) => {
        try {
            let res = await remove(_id)

            if (res.data.status) {
                toast.add('Remove note successfully')
                mutate()
                return
            }
            else {
                toast.add(res.data?.message)
            }
        } catch (e) {
            toast.add('Remove note failed')
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
                        <Button variant='violetAlt'>Add resume <PlusIcon></PlusIcon></Button>
                    </DialogTrigger>
                    <DialogContent css={{ maxWidth: 400 }} >
                        <Form title='Add new resume' onSubmit={onAdd}></Form>
                    </DialogContent>
                </Dialog>
            </div>

            <PaginatedList items={data} renderItem={(item, id) =>

                <CandidateResumeItem key={item.id} item={item} actionButtons={
                    <Box style={{ display: 'flex', gap: 5 }}>
                        {/* <Dialog modal>
                            <DialogTrigger asChild>
                                <Button ><RiEyeLine/></Button>
                            </DialogTrigger>
                            <DialogContent css={{ maxWidth: 400, height:800, width:400, background:"white" }} >
                                <PDFViewer fil={{url:item?.link_download}}/>
                            </DialogContent>
                        </Dialog> */}
                       
                        <a style={{ color: 'inherit' }} href={item?.link_download} download>
                            <Button>
                                <RiDownloadLine></RiDownloadLine>
                            </Button>
                        </a>

                        <ConfirmModalDialog onConfirm={async () => {
                            await remove(item.id)
                            mutate()
                        }} alertText={'Are you sure to proceed action?'}>
                            <Button>
                                <RiDeleteBin4Line />
                            </Button>
                        </ConfirmModalDialog>
                    </Box>

                } />
            } />
        </Column>



    </div>
}


