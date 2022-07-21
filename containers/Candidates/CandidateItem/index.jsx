import { DotsVerticalIcon } from "@radix-ui/react-icons"
import { Avatar, AvatarImage } from "components/Avatar"
import { Box } from "components/Box"
import Button from "components/Button"
import { Row } from "components/Flex"
import { Popover, PopoverContent, PopoverTrigger } from "components/Popover"
import { Text } from "components/Text"
import { styled } from "stitches.config"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from 'components/DropdownMenu';
import { BASE_MEDIA_URL, BASE_URL } from "configs"



const Skill = styled('span', {
    padding: "0 $2",
    background: "$orange8",
    borderRadius: "$3",
    color: "$mauve1",
    cursor: "default",
    transition: "0.2s ease all",
    '&:hover': {
        background: "$orange9"
    }

})

export default function CandidateItem({ dropdownItems, item, ...props }) {
    return <Box css={{
        position: "relative",
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "$2",
        background: "$gray2",
        borderRadius: "$4",
        my: "$1",
        border: "1px solid $mauve3"
    }} {...props}>

        <Avatar size='lg' >
            <AvatarImage src={`${BASE_MEDIA_URL}&id=${item?.id}`} />
            {/* <AvatarFallback /> */}
        </Avatar>
        <Box css={{ px: "$2", flex: 1 }}>
            <Text css={{ my: "$1", color: "$mauve12", fontWeight: "500" }}>{item.first_name} {item.last_name}</Text>
            <Text css={{ my: '$1' }}>{item.job_title}</Text>
            {/* {item?.skills?.map((item, id) => <Skill key={id}>{item.name}</Skill>)} */}
            {/* {item?.skills?.length ? <Skill>{item?.skills}</Skill> : null} */}
        </Box>
        <Box css={{ alignSelf: "stretch" }}>
            <Button css={{ mx: "$1" }}>Follow</Button>
            {dropdownItems}
        </Box>

    </Box>
}