import { ArrowLeftIcon, DotsVerticalIcon, Pencil2Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons"
import { Avatar, AvatarFallback, AvatarImage } from "components/Avatar"
import { Box } from "components/Box"
import Button from "components/Button"
import { Dialog, DialogContent, DialogTrigger } from "components/Dialog"
import Dnd4 from "components/Dnd4"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "components/DropdownMenu"
import SingleFileUploader from "components/FileUploader"
import { Center, Column, Row } from "components/Flex"
import { Input } from "components/Input"
import Table from "components/Table"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/Tabs"
import { H2, H4, H5, Text } from "components/Text"
import CandidateNoteItem from "containers/NoteItem"
import CandidateResumeItem from "containers/Candidates/ResumeItem"
import JobSettingHiringComission from "containers/Jobs/JobSettingComission"
import JobSettingHiringPipeline from "containers/Jobs/JobSettingHiringPipeline"
import { useGetCompanies } from "services/swr/useGetCompanies"
import DashboardLayout from "layouts/DashboardLayout"
import { LoremIpsum } from "lorem-ipsum"
import { useRouter } from "next/router"
import { RiDeleteBin2Line, RiSearchLine } from "react-icons/ri"
import { styled } from "stitches.config"
import JobNotes from "containers/Jobs/JobNotes"
import JobMembers from "containers/Jobs/JobMembers"



const JobAppliedContainer = styled(Row, {
    my: '$1',
    padding: "$2 $3",
    background: "$gray3",
    borderRadius: "$4",
    width: "100%",
    // border:"1px solid $grayA5",
    // boxShadow: "0 2px 10px $colors$blackA3"
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
    minWidth: 120,
    fontWeight: 500,
    ml: "$2"
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


let columns = [
    { name: 'Name', uid: 'name' },
    { name: 'Type', uid: 'type' },
    { name: 'Level', uid: 'level' }
];

let rows = [
    { id: 1, name: 'Charizard', type: 'Fire, Flying', level: '67' },
    { id: 2, name: 'Blastoise', type: 'Water', level: '56' },
    { id: 3, name: 'Venusaur', type: 'Grass, Poison', level: '83' },
    { id: 4, name: 'Pikachu', type: 'Electric', level: '100' }
];



export default function JobProfile() {

    const router = useRouter();

    return <Box css={{
        margin: 0,
        padding: "$3",
        paddingTop: "50px"
    }}>
        <div>
            <Button onClick={() => router.push('/candidates')} startEnhancer={<ArrowLeftIcon />}>  Jobs</Button>
        </div>
        <br />
        <Row>

            <Avatar css={{ borderRadius: "$3" }} size='lg' >
                <AvatarImage src='https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bG9nb3xlbnwwfHwwfHw%3D?&w=128&h=128&dpr=2&q=80' />
                {/* <AvatarFallback /> */}
            </Avatar>
            <Box css={{ px: "$2" }}>

                <H2 css={{ fontWeight: "500", my: '0' }}>Senior full-stack developer</H2>
                <Text css={{ my: "$1" }}>HCM city, Vietnam</Text>
                <br />
            </Box>
        </Row>


        <Tabs defaultValue="candidates">
            <TabsList aria-label="Manage your account">
                <TabsTrigger value="candidates">Candidates</TabsTrigger>
                <TabsTrigger value="job-detail">Job detail</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="hiring">Hiring Teams</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="candidates">

                <Dnd4
                    items={{
                        "NEW APPLIED": [{ id: "1" }, { id: "2" }],
                        "SHORTLISTED": [{ id: "4" }, { id: "5" }, { id: "6" }],
                        "SENT": [],
                        "INTERVIEWED": [],
                        "EVALUATION": [],
                        "HIRED": []
                    }}
                    renderItem={(item) => <Row css={{ py: "$2", width: "100%" }}>
                        <Avatar size='md' css={{ borderRadius: '50%' }} >
                            <AvatarImage src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80' />
                            <AvatarFallback />
                        </Avatar>
                        <Box css={{ px: "$1", flex: 1 }}>
                            <span>Firstname, Lastname</span>
                        </Box>
                        <Box>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button><DotsVerticalIcon /></Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent sideOffset={5}>

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </Box>
                    </Row>}
                    renderBoard={(id) => <Row>
                        <H4 css={{ my: 0, flex: 1 }}>{id}</H4>
                        <Dialog modal>
                            <DialogTrigger asChild>
                                <Button css={{ float: "right" }} ><PlusIcon></PlusIcon></Button>
                            </DialogTrigger>
                            <DialogContent>
                                <p>place holder</p>
                            </DialogContent>
                        </Dialog>

                    </Row>}
                />


            </TabsContent>
            <TabsContent value="job-detail">
                <Box css={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr ))",
                    gridGap: "10px"
                }}>
                    <Panel>
                        <H4 css={{ my: "$1" }}>Logo</H4>
                        <Card>
                            <SingleFileUploader />
                        </Card>
                        <br />

                        <H4 css={{ my: "$1" }}>Job title</H4>
                        <Card>
                            <Text css={{ my: "$0" }}>
                                Senior full-stack developer

                            </Text>


                        </Card>
                        <br />

                        <H4 css={{ my: "$1" }}>Job descriptions</H4>
                        <Card>
                            <Text css={{ my: 0 }}>{new LoremIpsum().generateSentences(5)}</Text>
                        </Card>

                        <br />
                        <H4 css={{ my: "$1" }}>Skills</H4>
                        <Card>
                            <Row css={{ flexWrap: "wrap" }}>
                                <Skill>Adobe After Effect</Skill>
                                <Skill>HTML</Skill>
                                <Skill>CSS</Skill>
                            </Row>
                        </Card>
                    </Panel>

                    <Panel>
                        <H4 css={{ my: "$1" }}>Job detail</H4>
                        <Card css={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px,1fr ))" }}>
                            <Row>
                                <FieldSet>Categories: </FieldSet>
                                <Text css={{ my: "$1" }}>Design, Development</Text>
                            </Row>
                            <Row>
                                <FieldSet>Job type: </FieldSet>
                                <Text css={{ my: "$1" }}>Full time</Text>
                            </Row>
                            <Row>
                                <FieldSet>Experience: </FieldSet>
                                <Text css={{ my: "$1" }}>2 years</Text>
                            </Row>
                            <Row>
                                <FieldSet>Location: </FieldSet>
                                <Text css={{ my: "$1" }}>HCM city</Text>
                            </Row>
                            <Row>
                                <FieldSet>Salary: </FieldSet>
                                <Text css={{ my: "$1" }}>800$</Text>
                            </Row>
                        </Card>
                        <br />



                        <H4 css={{ my: "$1" }}>Hiring team</H4>
                        <Card>
                            <Row css={{ alignItems: "center" }}>
                                <Avatar size='sm' >
                                    <AvatarImage src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80' />
                                    {/* <AvatarFallback /> */}
                                </Avatar>
                                <Text css={{ ml: "$1" }}>Emily Pham - Hiring Manager</Text>
                            </Row>
                            <Row css={{ alignItems: "center" }}>
                                <Avatar size='sm' >
                                    <AvatarImage src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80' />
                                    {/* <AvatarFallback /> */}
                                </Avatar>
                                <Text css={{ ml: "$1" }}>Emily Pham - HR executive</Text>
                            </Row>


                        </Card>

                        <br />
                        <H4 css={{ my: "$1" }}>Additional Information</H4>
                        <Card>
                            <Row>
                                <FieldSet>Created at: </FieldSet>
                                <Text css={{ my: "$1" }}>20/12/2021</Text>
                            </Row>
                            <Row>
                                <FieldSet>Updated at: </FieldSet>
                                <Text css={{ my: "$1" }}>22/12/2021</Text>
                            </Row>
                            <Row>
                                <FieldSet>Created by: </FieldSet>
                                <Text css={{ my: "$1" }}>Emily Chou</Text>
                            </Row>
                        </Card>
                    </Panel>
                </Box>



            </TabsContent>
            <TabsContent value="notes">
                <Panel>
                    <JobNotes/>
                </Panel>

            </TabsContent>
            <TabsContent value="hiring">

                {/* <Row css={{ mt: "$1", justifyContent: "space-between" }}>
                    <Input placeholder='search...' startEnhancer={<RiSearchLine />}></Input>
                    <Button variant='violetAlt' endEnhancer={<PlusIcon />}>Add member</Button>
                </Row> */}

                <Panel css={{ mt: "$2" }}>
                    <JobMembers/>
                </Panel>

            </TabsContent>
            <TabsContent value="settings">

                <Tabs  defaultValue="application">
                    <TabsList aria-label="Manage your account">
                        <TabsTrigger variant='orange' value="application">Application form</TabsTrigger>
                        <TabsTrigger variant='orange' value="pipeline">Hiring pipeline</TabsTrigger>
                        <TabsTrigger variant='orange' value="comission">Comission</TabsTrigger>
                    </TabsList>
                    <TabsContent value='pipeline'>
                        <JobSettingHiringPipeline/>
                    </TabsContent>
                    <TabsContent value='comission'>
                        <JobSettingHiringComission/>
                    </TabsContent>
                </Tabs>


            </TabsContent>
        </Tabs>



    </Box >
}



JobProfile.getLayout = (page) => {
    return <DashboardLayout>
        {page}
    </DashboardLayout>
}