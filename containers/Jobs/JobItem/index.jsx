import { ArrowRightIcon, ChevronRightIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarImage } from "components/Avatar";
import { Box } from "components/Box";
import Button from "components/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "components/DropdownMenu";
import { Row, Column } from "components/Flex";
import { Text } from "components/Text";
import { useRouter } from "next/router";
import { RiArrowRightLine, RiAwardLine, RiMapPin2Line, RiUser3Line } from "react-icons/ri";
import { styled } from "stitches.config";



var formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });


export default function JobItem({item}) {
    const router = useRouter()
    return <Row css={{
        position:"relative",
        width: "100%",
        // boxShadow: `0 2px 10px $colors$blackA3, 0 0 0 1px $colors$grayA3`,
        padding: "$2",
        background: "$gray2",
        borderRadius: "$4",
        my: "$1",
        border: "1px solid $grayA3"
    }}>
        <Column css={{ flex: 1 }}>
            <Row>
                <Avatar size='lg' >
                    <AvatarImage src='https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bG9nb3xlbnwwfHwwfHw%3D?&w=128&h=128&dpr=2&q=80' />
                    {/* <AvatarFallback /> */}
                </Avatar>
                <Box css={{ px: "$2", flex: 1 }}>
                    <Text css={{ my: "$1", color: "$mauve12", fontWeight: "500" }}>{item?.title}</Text>
                    <Row>
                        <Text css={{ my: '$1' }}> <RiMapPin2Line></RiMapPin2Line> HCM city, Vietnam</Text>
                        <Text css={{ my: '$1', ml:"$5" }}> <RiUser3Line/> 24 Candidates</Text>
                        <Text css={{ my: '$1', ml:"$5" }}> <RiAwardLine/> Commision: {formatter.format(14000000)}</Text>
                    </Row>
                    <Row css={{alignItems:"center", background:"$gray4", display:"inline-flex", borderRadius:"$3"}}>
                        <Text css={{mx:"$2", my:'$1'}}>17 Shortlisted</Text>
                        <ChevronRightIcon/>
                        <Text css={{mx:"$2", my:'$1'}}>12 Sent</Text>
                        <ChevronRightIcon/>
                        <Text css={{mx:"$2", my:'$1'}}>13 Interviewed</Text>
                        <ChevronRightIcon/>
                        <Text css={{mx:"$2", my:'$1'}}>4 Evaluation</Text>
                        <ChevronRightIcon/>
                        <Text css={{mx:"$2", my:'$1'}}>1 Hired</Text>
                    </Row>
                   
                </Box>
            </Row>
        </Column>
        <Box css={{ alignSelf: "stretch" }}>
            <Button css={{ mx: "$1" }}>Follow</Button>
            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <Button><DotsVerticalIcon /></Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent sideOffset={5}>
                    {/* {dropdownItems} */}
                    <DropdownMenuItem onClick={() => router.push(`/jobs/${item.id}`)}>View</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </Box>
    </Row>
}