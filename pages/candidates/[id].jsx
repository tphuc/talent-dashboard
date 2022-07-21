import { ArrowLeftIcon, DotsVerticalIcon, Pencil1Icon } from "@radix-ui/react-icons"
import { Avatar, AvatarFallback, AvatarImage } from "components/Avatar"
import { Box } from "components/Box"
import Button from "components/Button"
import { Dialog, DialogContent, DialogTrigger } from "components/Dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "components/DropdownMenu"
import { Center, Column, Row } from "components/Flex"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/Tabs"
import { H2, H4, H5, Text } from "components/Text"
import { useToasts } from "components/Toast"
import CandidateNotesTab from "containers/Candidates/CandidateNotes"
import { EditCandidateForm } from "containers/Candidates/EditCandidateForm"
import CandidateNoteItem from "containers/NoteItem"
import CandidateResumeItem from "containers/Candidates/ResumeItem"
import DashboardLayout from "layouts/DashboardLayout"
import { useRouter } from "next/router"
import { useCRUDCandidate } from "services/crud/useCRUDCandidate"
import { useGetCandidateById } from "services/swr/useGetCandidateById"
import { styled } from "stitches.config"
import dayjs from "dayjs"
import { useRef } from "react"
import CandidateResume from "containers/Candidates/CandidateResume"



const JobAppliedContainer = styled(Row, {
    my: '$1',
    padding: "$2 $3",
    background: "white",
    borderRadius: "$4",
    width: "100%",
    border: "1px solid $grayA3",
    boxShadow: "0 2px 10px $colors$blackA2"
})



const Card = styled('div', {
    background: 'white',
    borderRadius: "$4",
    padding: "$2",
    boxShadow: "0 2px 10px $colors$blackA3"
})


const Panel = styled('div', {
    padding: "$2",
    background: "$gray2",
    borderRadius: "$4",
    minHeight: 300
})


const FieldSet = styled('span', {
    my: "$1",
    mx: "$1",
    minWidth: 50,

})

const Skill = styled('span', {
    padding: "0 $2",
    background: "$orange8",
    borderRadius: "$3",
    mx: "$1",
    color: "$mauve1",
    cursor: "default",
    transition: "0.2s ease all",
    '&:hover': {
        background: "$orange9"
    }

})




export default function Candidateprofile() {


    const router = useRouter();

    const { id } = router.query

    const { data, mutate } = useGetCandidateById(id);

    const toast = useToasts()

    const {update} = useCRUDCandidate()


    const {
        logo,
        first_name, last_name,
        expect_location_id,
        headline, phone, email, birth_day, 
        national_id, source_id, city_id, district_id, ward_id, address, exepect_location_id,
        summary, job_title, qualification, current_salary, expected_salary, 
        experience_years: experience_year, candidate_level_id
    } = data || {};


    const onEdit = async (id, values) => {
        console.log(values)
        try {
            let res = await update(id, values)
            console.log(res)
            if (res.data.status) {
                EditToggleRef.current?.click()
                toast.add('Edit candidate successfully')
                mutate()
                
            }
            else {
                toast.add(res.data?.message)
            }
        } catch (e) {
            toast.add('Edit candidate failed')
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
        }

        return
    }


    const EditToggleRef = useRef()


    return <Box css={{
        margin: 0,
        padding: "$3",
        paddingTop: "50px"
    }}>
        <Row css={{ flexWrap: "wrap" }}>

            <Column css={{ minWidth: "340px", maxWidth: "95vw" }}>
                <div>
                    <Button onClick={() => router.push('/candidates')} startEnhancer={<ArrowLeftIcon />}>  Candidates</Button>
                </div>

                <Center css={{ flexDirection: "column" }}>

                    <Avatar size='lg' >
                        <AvatarImage src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80' />
                        <AvatarFallback />

                    </Avatar>
                    <H2 css={{ fontWeight: "500", my: '$1' }}>{data?.first_name} {data?.last_name}</H2>
                    <Text css={{ my: "$1" }}>{data?.headline}</Text>
                    <br />
                    <Button>Follow</Button>
                    <Text><b>Applied jobs</b></Text>
                    <Panel css={{ width: "100%" }}>
                        <JobAppliedContainer>
                            <Avatar size='md' css={{ borderRadius: '$3' }} >
                                <AvatarImage src='https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bG9nb3xlbnwwfHwwfHw%3D?&w=128&h=128&dpr=2&q=80' />
                                <AvatarFallback />
                            </Avatar>
                            <Box css={{ px: "$2", alignSelf: "stretch", flex: 1 }}>
                                <H4 css={{ my: 0 }}>Design Lead</H4>
                                <Text css={{ my: 0 }}>Interviewd</Text>
                            </Box>
                            <DropdownMenu >
                                <DropdownMenuTrigger asChild>
                                    <Button><DotsVerticalIcon /></Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent sideOffset={5}>
                                    <DropdownMenuItem>Action 1</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </JobAppliedContainer>

                        <JobAppliedContainer>
                            <Avatar size='md' css={{ borderRadius: '$3' }} >
                                <AvatarImage src='https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bG9nb3xlbnwwfHwwfHw%3D?&w=128&h=128&dpr=2&q=80' />
                                <AvatarFallback />
                            </Avatar>
                            <Box css={{ px: "$2", alignSelf: "stretch", flex: 1 }}>
                                <H4 css={{ my: 0 }}>Design Lead</H4>
                                <Text css={{ my: 0 }}>Short listed</Text>
                            </Box>
                        </JobAppliedContainer>
                    </Panel>

                </Center>
            </Column>
            <Column css={{ flex: 1, px: "$2" }}>

                <Tabs defaultValue="profile">
                    <TabsList aria-label="Manage your account">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="resume">Resume</TabsTrigger>
                        <TabsTrigger value="notes">Notes</TabsTrigger>
                        <TabsTrigger value="activities">Activities</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile">
                        <Panel>
                            <Dialog modal>
                                <DialogTrigger asChild>
                                    <Button ref={EditToggleRef} css={{ float: "right" }}><Pencil1Icon /></Button>
                                </DialogTrigger>
                                <DialogContent  css={{ maxWidth: 800, overflow: "scroll" }} >
                                    <EditCandidateForm 
                                        onSubmit={async (values) => onEdit(id, values)}
                                        defaultValues={{
                                            logo,
                                            first_name, last_name,
                                            expect_location_id,
                                            headline, phone, email, birth_day: dayjs(birth_day).format('DD/MM/YYYY'),
                                            national_id, source_id, city_id, district_id, ward_id, address,
                                            exepect_location_id,
                                            summary, job_title, qualification, current_salary, expected_salary, 
                                            experience_year, candidate_level_id
                                    }} />
                                </DialogContent>
                            </Dialog>


                            <br />
                            <H4 css={{ my: "$1" }}>Basic information</H4>
                            <Card>
                                <Box css={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr ))" }}>
                                    <Row>
                                        <FieldSet><strong>ID:</strong></FieldSet>
                                        <FieldSet>{data?.id}</FieldSet>
                                    </Row>

                                    <Row>
                                        <FieldSet><strong>Full Name:</strong></FieldSet>
                                        <FieldSet>{data?.first_name} {data?.last_name}</FieldSet>
                                    </Row>

                                    <Row>
                                        <FieldSet><strong>Phone:</strong></FieldSet>
                                        <FieldSet>{data?.phone}</FieldSet>
                                    </Row>

                                    <Row>
                                        <FieldSet><strong>Email:</strong></FieldSet>
                                        <FieldSet>{data?.email}</FieldSet>
                                    </Row>

                                    <Row>
                                        <FieldSet><strong>Birthday:</strong></FieldSet>
                                        <FieldSet>{dayjs(data?.birthday).format('DD/MM/YYYY') }</FieldSet>
                                    </Row>
                                    <Row>
                                        <FieldSet><strong>Address:</strong></FieldSet>
                                        <FieldSet>{data?.address}</FieldSet>
                                    </Row>
                                    <Row>
                                        <FieldSet><strong>Source:</strong></FieldSet>
                                        <FieldSet>{data?.source?.name}</FieldSet>
                                    </Row>
                                </Box>
                            </Card>
                            <br />

                            <H4 css={{ my: "$1" }}>Profile summary</H4>
                            <Card>
                                <div  dangerouslySetInnerHTML={{__html: data?.summary }}>
                                   

                                </div>


                            </Card>
                            <br />

                            <H4 css={{ my: "$1" }}>Personal information</H4>
                            <Card>
                                <Box css={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr ))" }}>
                                    <Row>
                                        <FieldSet><strong>Current job title:</strong></FieldSet>
                                        <FieldSet>{data?.job_title}</FieldSet>
                                    </Row>

                                    <Row>
                                        <FieldSet><strong>Qualification:</strong></FieldSet>
                                        <FieldSet>{data?.qualification}</FieldSet>
                                    </Row>

                                    <Row>
                                        <FieldSet><strong>Current salary:</strong></FieldSet>
                                        <FieldSet>{data?.current_salary}</FieldSet>
                                    </Row>

                                    <Row>
                                        <FieldSet><strong>Expected salary:</strong></FieldSet>
                                        <FieldSet>{data?.expected_salary}</FieldSet>
                                    </Row>

                                    <Row>
                                        <FieldSet><strong>Level:</strong></FieldSet>
                                        <FieldSet>{data?.candidate_level?.name}</FieldSet>
                                    </Row>

                                    <Row>
                                        <FieldSet><strong>Years of experience:</strong></FieldSet>
                                        <FieldSet>{data?.experience_years}</FieldSet>
                                    </Row>

                                </Box>
                            </Card>

                            <br />
                            <H4 css={{ my: "$1" }}>Skills</H4>
                            <Card>
                                <Row css={{ flexWrap: "wrap" }}>
                                    {!data?.skills?.length ? <span>N/A</span> :  <Skill> {data?.skills}</Skill>}
                                   


                                </Row>
                            </Card>
                        </Panel>
                    </TabsContent>
                    <TabsContent value="resume">
                    <Panel>
                        <CandidateResume />     
                        </Panel>    

                    </TabsContent>
                    <TabsContent value="notes">
                        <Panel>
                           <CandidateNotesTab />
                        </Panel>

                    </TabsContent>
                    <TabsContent value="activities">


                    </TabsContent>
                </Tabs>
            </Column>
        </Row>

    </Box>
}



Candidateprofile.getLayout = (page) => {
    return <DashboardLayout>
        {page}
    </DashboardLayout>
}