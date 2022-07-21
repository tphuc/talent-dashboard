import { gray, violet } from "@radix-ui/colors"
import { ArrowLeftIcon, CheckCircledIcon, CheckIcon, CrossCircledIcon } from "@radix-ui/react-icons"
import { Box } from "components/Box"
import Button from "components/Button"
import { Column, Row } from "components/Flex"
import { H1, H3 } from "components/Text"
import DashboardLayout from "layouts/DashboardLayout"
import Link from "next/link"
import { RiArrowLeftLine, RiCheckboxLine } from "react-icons/ri"
import { styled } from "stitches.config"
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { useRouter } from "next/router"

const Panel = styled('div', {
    padding: "$2",
    background: "$gray2",
    borderRadius: "$4",
    minHeight: 300,
    position: "relative"
})


const Card = styled('div', {
    flex: 1
})


const StyledToggleGroup = styled(ToggleGroupPrimitive.Root, {
    display: 'inline-flex',
    width: "100%",
    alignItems: "stretch",
    gap: 10
});

const StyledItem = styled(ToggleGroupPrimitive.Item, {
    all: 'unset',
    boxSizing: "border-box",
    backgroundColor: gray.gray1,
    color: '$mauve10',
    background: "white",
    width: "100%",
    borderRadius: '$4',
    padding: '10px 10px',
    minHeight: 100,
    boxShadow: "boxShadow: `0 2px 10px $colors$blackA7",
    '&[data-state=on]': { backgroundColor: 'white', color: violet.violet11, boxShadow: "0px 0px 0px 2px $colors$orange10" },
    '&:focus': { position: 'relative', boxShadow: `0 0 0 2px black` },
});








export default function ChangeSubcription() {
    const router = useRouter()

    return <Box css={{ padding: 20 }}>
        <Button onClick={() => router.back()} startEnhancer={<RiArrowLeftLine />}>Change subcription package for your company</Button>
        <br />
        <br />
        <Panel>
            <StyledToggleGroup type='single' >

                <Card css={{ flex: 1 }}>
                    <StyledItem value='package1'>
                        <H3 css={{ my: 0 }}>Package 1</H3>
                        <H1>3$ <span style={{ fontSize: "medium", fontWeight: 400 }}>/ User</span></H1>
                        <Column>
                            <Row css={{ alignItems: "center", my: 5, gap: 5 }}>
                                <CheckCircledIcon color='green' />
                                <span> Unlimited jobs</span>
                            </Row>
                            <Row css={{ alignItems: "center", my: 5, gap: 5 }}>
                                <CheckCircledIcon color='green' />
                                <span> Unlimited candidates</span>
                            </Row>
                            <Row css={{ alignItems: "center", my: 5, gap: 5 }}>
                                <CheckCircledIcon color='green' />
                                <span> 3 team member accounts</span>
                            </Row>
                            <Row css={{ alignItems: "center", my: 5, gap: 5 }}>
                                <CheckCircledIcon color='green' />
                                <span> 30 clients accounts</span>
                            </Row>
                            <Row css={{ alignItems: "center", my: 5, gap: 5 }}>
                                <CrossCircledIcon color={'red'} />
                                <span> Hubspot integration</span>
                            </Row>
                            <Row css={{ alignItems: "center", my: 5, gap: 5 }}>
                                <CheckCircledIcon color='green' />
                                <span> Hubspot integration</span>
                            </Row>
                            <Row css={{ alignItems: "center", my: 5, gap: 5 }}>
                                <CheckCircledIcon color='green' />
                                <span> Mailchimp integration</span>
                            </Row>
                            <Row css={{ alignItems: "center", my: 5, gap: 5 }}>
                                <CheckCircledIcon color='green' />
                                <span> Google calendar integration</span>
                            </Row>
                            <Row css={{ alignItems: "center", my: 5, gap: 5 }}>
                                <CrossCircledIcon color={'red'} />
                                <span> Other system integration</span>
                            </Row>
                        </Column>
                    </StyledItem>
                </Card>


                <Card css={{ flex: 1 }}>
                    <StyledItem value='package2'>
                        <H3 css={{ my: 0 }}>Package 2</H3>
                        <H1>4.5$ <span style={{ fontSize: "medium", fontWeight: 400 }}>/ User</span></H1>
                        <Column>
                            <Row css={{ alignItems: "center", my: 5, gap: 5 }}>
                                <CheckCircledIcon color='green' />
                                <span> Unlimited jobs</span>
                            </Row>
                            <Row css={{ alignItems: "center", my: 5, gap: 5 }}>
                                <CheckCircledIcon color='green' />
                                <span> Unlimited candidates</span>
                            </Row>
                            <Row css={{ alignItems: "center", my: 5, gap: 5 }}>
                                <CheckCircledIcon color='green' />
                                <span> 3 team member accounts</span>
                            </Row>
                            <Row css={{ alignItems: "center", my: 5, gap: 5 }}>
                                <CheckCircledIcon color='green' />
                                <span> 30 clients accounts</span>
                            </Row>
                            <Row css={{ alignItems: "center", my: 5, gap: 5 }}>
                                <CrossCircledIcon color={'red'} />
                                <span> Hubspot integration</span>
                            </Row>
                            <Row css={{ alignItems: "center", my: 5, gap: 5 }}>
                                <CheckCircledIcon color='green' />
                                <span> Hubspot integration</span>
                            </Row>
                            <Row css={{ alignItems: "center", my: 5, gap: 5 }}>
                                <CheckCircledIcon color='green' />
                                <span> Mailchimp integration</span>
                            </Row>
                            <Row css={{ alignItems: "center", my: 5, gap: 5 }}>
                                <CheckCircledIcon color='green' />
                                <span> Google calendar integration</span>
                            </Row>
                            <Row css={{ alignItems: "center", my: 5, gap: 5 }}>
                                <CrossCircledIcon color={'red'} />
                                <span> Other system integration</span>
                            </Row>
                        </Column>
                    </StyledItem>
                </Card>

                <Card css={{ flex: 1 }}>
                    <StyledItem value='package3'>
                        <H3 css={{ my: 0 }}>Package 2</H3>
                        <H1>8$ <span style={{ fontSize: "medium", fontWeight: 400 }}>/ User</span></H1>
                        <Column>
                            <Row css={{ alignItems: "center", my: 5, gap: 5 }}>
                                <CheckCircledIcon color='green' />
                                <span> Unlimited jobs</span>
                            </Row>
                            <Row css={{ alignItems: "center", my: 5, gap: 5 }}>
                                <CheckCircledIcon color='green' />
                                <span> Unlimited candidates</span>
                            </Row>
                            <Row css={{ alignItems: "center", my: 5, gap: 5 }}>
                                <CheckCircledIcon color='green' />
                                <span> 3 team member accounts</span>
                            </Row>
                            <Row css={{ alignItems: "center", my: 5, gap: 5 }}>
                                <CheckCircledIcon color='green' />
                                <span> 30 clients accounts</span>
                            </Row>
                            <Row css={{ alignItems: "center", my: 5, gap: 5 }}>
                                <CrossCircledIcon color={'red'} />
                                <span> Hubspot integration</span>
                            </Row>
                            <Row css={{ alignItems: "center", my: 5, gap: 5 }}>
                                <CheckCircledIcon color='green' />
                                <span> Hubspot integration</span>
                            </Row>
                            <Row css={{ alignItems: "center", my: 5, gap: 5 }}>
                                <CheckCircledIcon color='green' />
                                <span> Mailchimp integration</span>
                            </Row>
                            <Row css={{ alignItems: "center", my: 5, gap: 5 }}>
                                <CheckCircledIcon color='green' />
                                <span> Google calendar integration</span>
                            </Row>
                            <Row css={{ alignItems: "center", my: 5, gap: 5 }}>
                                <CrossCircledIcon color={'red'} />
                                <span> Other system integration</span>
                            </Row>
                        </Column>
                    </StyledItem>
                </Card>
            </StyledToggleGroup>

        </Panel>
        <br/>
        <Button variant='orangeAlt'>Confirm</Button>
    </Box>
}


ChangeSubcription.getLayout = (page) => {
    return <DashboardLayout>
        {page}
    </DashboardLayout>
}