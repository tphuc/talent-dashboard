import { ArrowRightIcon, ChevronRightIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarImage } from "components/Avatar";
import { Box } from "components/Box";
import Button from "components/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "components/DropdownMenu";
import { Row, Column } from "components/Flex";
import { Text } from "components/Text";
import Link from "next/link";
import { useRouter } from "next/router";
import { RiArrowRightLine, RiAwardLine, RiMapPin2Line, RiUser3Line } from "react-icons/ri";
import { styled } from "stitches.config";

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


var formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });


export default function CompanyItem({item}) {
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
                    <AvatarImage src={item?.logo_url} />
                    {/* <AvatarFallback /> */}
                </Avatar>
                <Box css={{ px: "$2", flex: 1 }}>
                    <Link href={`/companies/${item?.id}`}>
                    <Text css={{ my: "$1", cursor:"pointer", color: "$mauve12", fontWeight: "500" }}>{item?.company_name}</Text>
                    </Link>

                        <Text css={{ my: '$1' }}> <RiMapPin2Line></RiMapPin2Line>{item?.address}</Text>
                        {item?.skills?.map((item, id) => <Skill key={id}>{item.name}</Skill>)}
                 
                  
                   
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
                    <DropdownMenuItem onClick={() => router.push(`/companies/${item?.id}`)}>View</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </Box>
    </Row>
}