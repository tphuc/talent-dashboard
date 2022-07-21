import { ArrowLeftIcon, DotsVerticalIcon, PlusIcon } from "@radix-ui/react-icons"
import { Avatar, AvatarFallback, AvatarImage } from "components/Avatar"
import { Box } from "components/Box"
import Button from "components/Button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "components/DropdownMenu"
import { Center, Column, Row } from "components/Flex"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/Tabs"
import { H2, H3, H4, H5, Text } from "components/Text"
import CandidateNoteItem from "containers/NoteItem"
import CandidateResumeItem from "containers/Candidates/ResumeItem"
import CompanyManageAcccounts from "containers/Companies/CompanieManageAccounts"
import { useGetCompnay } from "services/swr/useGetCompany"
import DashboardLayout from "layouts/DashboardLayout"
import Link from "next/link"
import { useRouter } from "next/router"
import { styled } from "stitches.config"
import CompanyNotes from "containers/Companies/CompanyNotes"



const JobAppliedContainer = styled(Row, {
    my: '$1',
    padding: "$2 $3",
    background: "white",
    borderRadius: "$4",
    width: "100%",
    boxShadow: `0 2px 20px $colors$blackA3, 0 0 0 1px $colors$grayA3`,

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
    minHeight: 200
})


const FieldSet = styled('span', {
    my: "$1",
    mx: "$2",
    minWidth: 100,
})

const Skill = styled('span', {
    padding: "$1 $2",
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





export default function CompanyProfile() {


    const router = useRouter();

    const {id} = router.query;
    const {data: companyData} = useGetCompnay(id);
    const company = companyData?.companie?.length ? companyData?.companie[0] : null ;

    return <Box css={{
        margin: 0,
        padding: "$3",
        paddingTop: "50px"
    }}>
        <Row css={{ flexWrap: "wrap" }}>

            <Column css={{ minWidth: "340px", maxWidth: "95vw" }}>
                <div>
                    <Button onClick={() => router.push('/companies')} startEnhancer={<ArrowLeftIcon />}>  Companies</Button>
                </div>

                <Center css={{ flexDirection: "column" }}>

                    <Avatar size='lg' >
                        <AvatarImage src={company?.logo_url} />
                        <AvatarFallback />

                    </Avatar>

                    <H3 css={{ fontWeight: "500", my: '$1', mr: "$2" }}>{company?.company_name}</H3>

                    <Text css={{ my: '$1' }}>{company?.address}</Text>
                    <Button variant='violetAlt'>Followed</Button>
                    <br />
                    <Panel css={{ width: "100%" }}>
                        <Row css={{ justifyContent: "space-between", alignItems: "center" }}>
                            <Text css={{ my: "$1" }} ><b>Opening jobs</b></Text>
                            <Button  css={{ background: "$gray4" }} ><PlusIcon  /></Button>
                        </Row>
                        <JobAppliedContainer>
                            <Box css={{ px: "$2", alignSelf: "stretch", flex: 1 }}>
                                <H4 css={{ my: 0 }}>Design Lead</H4>
                                <Text css={{ my: 0 }}>2 candidates</Text>
                            </Box>
                            <DropdownMenu >
                                <DropdownMenuTrigger asChild>
                                    <Button size='sm'><DotsVerticalIcon width={12} height={12} /></Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent sideOffset={5}>
                                    <DropdownMenuItem>Action 1</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </JobAppliedContainer>


                        <JobAppliedContainer>
                            <Box css={{ px: "$2", alignSelf: "stretch", flex: 1 }}>
                                <H4 css={{ my: 0 }}>Product Manager</H4>
                                <Text css={{ my: 0 }}>1 candidates</Text>
                            </Box>
                        </JobAppliedContainer>

                    </Panel>
                    <br />
                    <Panel css={{ width: "100%" }}>
                        <Row css={{ justifyContent: "space-between", alignItems: "center" }}>
                            <Text css={{ my: "$1" }} ><b>Opening jobs</b></Text>
                            <Button  css={{ background: "$gray4" }} ><PlusIcon  /></Button>
                        </Row>
                        <JobAppliedContainer>
                            <Avatar size='md' >
                                <AvatarImage src='https://picsum.photos/300/300' />
                                <AvatarFallback />

                            </Avatar>
                            <Box css={{ px: "$2", alignSelf: "stretch", flex: 1 }}>
                                <H4 css={{ my: 0 }}>Candidate name</H4>
                                <Text css={{ my: 0 }}>Design Lead</Text>
                            </Box>
                            <DropdownMenu >
                                <DropdownMenuTrigger asChild>
                                    <Button size='sm'>Interviewed</Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent sideOffset={5}>
                                    <DropdownMenuItem>Action 1</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </JobAppliedContainer>


                        <JobAppliedContainer>
                            <Avatar size='md' >
                                <AvatarImage src='https://picsum.photos/300/300' />
                                <AvatarFallback />

                            </Avatar>
                            <Box css={{ px: "$2", alignSelf: "stretch", flex: 1 }}>
                                <H4 css={{ my: 0 }}>Candidate name</H4>
                                <Text css={{ my: 0 }}>Design Lead</Text>
                            </Box>
                        </JobAppliedContainer>

                    </Panel>

                </Center>
            </Column>
            <Column css={{ flex: 1, px: "$2" }}>

                <Tabs defaultValue="profile">
                    <TabsList aria-label="Manage your account">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="accounts">Accounts</TabsTrigger>
                        <TabsTrigger value="notes">Notes</TabsTrigger>
                        <TabsTrigger value="activities">Activities</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile">
                        <Panel>
                            <H4 css={{ my: "$1" }}>Basic information</H4>
                            <Card>
                                <Box css={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px,1fr ))" }}>
                                    <Row>
                                        <FieldSet><strong>ID:</strong></FieldSet>
                                        <FieldSet>{id}</FieldSet>
                                    </Row>

                                    <Row>
                                        <FieldSet><strong>Representative:</strong></FieldSet>
                                        <FieldSet>Dante Nguyen</FieldSet>
                                    </Row>

                                    <Row>
                                        <FieldSet><strong>Phone number:</strong></FieldSet>
                                        <FieldSet>0889775268</FieldSet>
                                    </Row>

                                    <Row>
                                        <FieldSet><strong>Website:</strong></FieldSet>

                                        <FieldSet>{company?.website}</FieldSet>
                                    </Row>

                                    <Row>
                                        <FieldSet><strong>Industry:</strong></FieldSet>
                                        <FieldSet>marketing</FieldSet>
                                    </Row>

                                    <Row>
                                        <FieldSet><strong>Location:</strong></FieldSet>
                                        <FieldSet>HCM city</FieldSet>
                                    </Row>

                                    <Row>
                                        <FieldSet><strong>Address:</strong></FieldSet>
                                        <FieldSet>1010 AuCo, Ward 14, Tan Binh </FieldSet>
                                    </Row>
                                    <Row>
                                        <FieldSet><strong>Source:</strong></FieldSet>
                                        <FieldSet>Linkedn </FieldSet>
                                    </Row>
                                </Box>
                            </Card>
                            <br />

                            <H4 css={{ my: "$1" }}>Profile summary</H4>
                            <Card>
                                <Text css={{ my: "$0" }}>
                                    Lorem ipsum dolor sit amet. Id minus beatae quo maxime odit ut velit dolorum aut dolorum voluptatibus eum autem obcaecati in aperiam pariatur id eius tenetur! Et totam odit qui quibusdam voluptatem non dignissimos voluptate ea nisi cupiditate! Sed iusto rerum qui adipisci maiores aut cumque illo quo labore voluptatum qui quod placeat aut nihil voluptatem. Sed voluptate facilis ea quae rem accusantium omnis sit libero nisi?

                                </Text>


                            </Card>
                            <br />

                        
                        </Panel>
                    </TabsContent>
                    <TabsContent value="accounts">
                       <CompanyManageAcccounts/>

                    </TabsContent>
                    <TabsContent value="notes">
                        <Panel>
                            <CompanyNotes/>
                        </Panel>

                    </TabsContent>
                    <TabsContent value="activities">


                    </TabsContent>
                </Tabs>
            </Column>
        </Row>

    </Box>
}



CompanyProfile.getLayout = (page) => {
    return <DashboardLayout>
        {page}
    </DashboardLayout>
}