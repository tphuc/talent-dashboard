import { styled } from "@stitches/react";
import { Avatar, AvatarImage } from "components/Avatar";
import { Box } from "components/Box";
import { MonthCalendar } from "components/Calendar/MonthCalendar";
import { WeekCalendar } from "components/Calendar/WeekCalendar";
import { Dialog, DialogContent, DialogTrigger } from "components/Dialog";
import { Row } from "components/Flex";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/Tabs";
import { H2, H4, H5 } from "components/Text";
import dayjs from "dayjs";
import DashboardLayout from "layouts/DashboardLayout";
import Link from "next/link";

const EventBadge = styled('div', {
    background: "$violet9",
    color: "white",
    padding: '1px $2',
    borderRadius: 4,
    cursor: 'pointer',
    transition: "0.4s ease all",
    margin: "$1",
    '&:hover': {
        background: "$violet10"
    }
})

const Panel = styled('div', {
    padding: "$2",
    background: "$gray2",
    borderRadius: "$4",
    minHeight: 300
})

const StyledEventLink = styled('div', {
    padding: "5px",
    borderRadius: '$3',
    background: "$mauve4",
    border: "1px solid $mauve4"
})


export default function Calendar() {
    return <Box css={{
        margin: 0,
        padding: "$3",
        paddingTop: "50px"
    }}>
        <Tabs defaultValue="month">
            <TabsList aria-label="Calendar">
                <TabsTrigger value="month">Monthly</TabsTrigger>
                <TabsTrigger value="week">Weekly</TabsTrigger>

            </TabsList>
            <TabsContent value="month">
                <Panel>
                    <MonthCalendar
                        events={[
                            {
                                title: 'Event A',
                                date: "2022-5-13",
                                startTime: '10:20',
                                endTime: '12:20'
                            },
                            {
                                title: 'Event B',
                                date: "2022-5-13",
                                startTime: '10:20',
                                endTime: '12:20'
                            },
                            {
                                title: 'Event C',
                                date: "2022-5-13",
                                startTime: '10:20',
                                endTime: '12:20'
                            },
                            {
                                title: 'Event D',
                                date: "2022-5-13",
                                startTime: '10:20',
                                endTime: '12:20'
                            },
                        ]}
                        renderEvent={(item, id) => <Dialog key={id}>
                            <DialogTrigger aria-describedby={item.title} asChild>
                                <EventBadge key={id}>
                                    {item.title}
                                </EventBadge>
                            </DialogTrigger>
                            <DialogContent>
                                <H2>{item.title}</H2>
                                <div style={{ display: "flex", }}>
                                    <span>{dayjs(item.date).toDate().toLocaleDateString()},</span>
                                    <span style={{ marginLeft: 5 }}>{item.startTime}-{item.endTime}</span>
                                </div>
                                <H4 style={{ marginBottom: 2 }}>Link</H4>
                                <Link href=''>
                                    <a target={'_blank'}>
                                        <StyledEventLink>
                                            <span>https://google.meet/abc</span>


                                        </StyledEventLink>
                                    </a>
                                </Link>

                                <H4 style={{ marginBottom: 2 }}>Invites</H4>
                                <Row css={{ alignItems: "center" }}>
                                    <Avatar size='sm' css={{ borderRadius: '50%' }} >
                                        <AvatarImage src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80' />
                                    </Avatar>
                                    <span style={{ marginLeft: 5 }}>Emily Nguyen</span>
                                </Row>

                            </DialogContent>
                        </Dialog>
                        }
                    />
                </Panel>
            </TabsContent>
            <TabsContent value="week">
                        <WeekCalendar 
                            renderEvent={(item, id) => <Dialog key={id}>
                                <DialogTrigger aria-describedby={item.title} asChild>
                                    <EventBadge key={id}>
                                        {item.title}
                                    </EventBadge>
                                </DialogTrigger>
                                <DialogContent>
                                    <H2>{item.title}</H2>
                                    <div style={{ display: "flex", }}>
                                        <span>{dayjs(item.date).toDate().toLocaleDateString()},</span>
                                        <span style={{ marginLeft: 5 }}>{item.startTime}-{item.endTime}</span>
                                    </div>
                                    <H4 style={{ marginBottom: 2 }}>Link</H4>
                                    <Link href=''>
                                        <a target={'_blank'}>
                                            <StyledEventLink>
                                                <span>https://google.meet/abc</span>
    
    
                                            </StyledEventLink>
                                        </a>
                                    </Link>
    
                                    <H4 style={{ marginBottom: 2 }}>Invites</H4>
                                    <Row css={{ alignItems: "center" }}>
                                        <Avatar size='sm' css={{ borderRadius: '50%' }} >
                                            <AvatarImage src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80' />
                                        </Avatar>
                                        <span style={{ marginLeft: 5 }}>Emily Nguyen</span>
                                    </Row>
    
                                </DialogContent>
                            </Dialog>
                            }
                        
                        />
            </TabsContent>
        </Tabs>


    </Box>
}


Calendar.getLayout = (page) => {
    return <DashboardLayout>
        {page}
    </DashboardLayout>
}