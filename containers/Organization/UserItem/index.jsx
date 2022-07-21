import { ArrowRightIcon, ChevronRightIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarImage } from "components/Avatar";
import { Box } from "components/Box";
import Button from "components/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "components/DropdownMenu";
import { Row, Column } from "components/Flex";
import { Text } from "components/Text";
import { BASE_URL } from "configs";
import Link from "next/link";
import { useRouter } from "next/router";
import { RiArrowRightLine, RiAwardLine, RiMailLine, RiMapPin2Line, RiPhoneLine, RiUser3Line } from "react-icons/ri";
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


export default function OrgUserItem({ item }) {
    const router = useRouter()
    return <Row css={{
        position: "relative",
        width: "100%",
        // boxShadow: `0 2px 10px $colors$blackA3, 0 0 0 1px $colors$grayA3`,
        padding: "$2",
        background: "$gray2",
        borderRadius: "$4",
        my: "$1",
        border: "1px solid $grayA3",
        display: "inline-grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
        justifyContent: "space-between",
    }}>

        <Row>
            <Avatar size='lg' >
                <AvatarImage src={`${BASE_URL}/${item?.logo}`} />
                {/* <AvatarFallback /> */}
            </Avatar>
            <Box css={{ px: "$2", flex: 1 }}>
                <Link href={`/vendors/${item?.id}`}>
                    <Text css={{ my: "$1", cursor: "pointer", color: "$mauve12", fontWeight: "500" }}>User ABC</Text>

                </Link>
                <Text css={{ my: "$1", cursor: "pointer", color: "$mauve11", fontWeight: "500" }}>Senior UX/UI desinger</Text>
            </Box>
        </Row>

        <Box css={{ color: "$mauve11" }}>
            <Row css={{ my: 5, alignItems: "center", gap: 5 }}>
                <RiMapPin2Line />
                Ho Chi Minh city, Vietnam
            </Row>
            <Row css={{ my: 5, alignItems: "center", gap: 5 }}>
                <RiMailLine />
                andyng@gmail.com</Row>
            <Row css={{ my: 5, alignItems: "center", gap: 5 }}>
                <RiPhoneLine />
                +840123123221</Row>
        </Box>
        <Box css={{ display: "flex", justifyContent: "flex-end", alignItems: "start", gap: 10, }}>

            <Row css={{ display: "inline-grid", alignItems: "center", gridTemplateColumns: '120px 1fr 1fr', justifyContent: "start", gap: 5 }}>
                <span>    Report to  </span>
                <Avatar size='sm' >
                    <AvatarImage src={`${BASE_URL}/${item?.logo}`} />
                    {/* <AvatarFallback /> */}
                </Avatar>
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <Button><DotsVerticalIcon /></Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent sideOffset={5}>
                        {/* {dropdownItems} */}
                        <DropdownMenuItem  onClick={() => router.push('/organization/1')}>View</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Text>Created at {new Date().toDateString()}</Text>
            </Row>


        </Box>
    </Row>
}