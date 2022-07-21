import { DotsVerticalIcon, EyeOpenIcon, Pencil2Icon, ReaderIcon, TrashIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarImage } from "components/Avatar";
import { Box } from "components/Box";
import Button from "components/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuItemIndicator } from "components/DropdownMenu";
import { Row } from "components/Flex";
import { H4, Text } from "components/Text";
import { RiDownload2Line, RiEye2Line, RiPrinterLine } from "react-icons/ri";
import { styled } from "stitches.config";


const RightSlot = styled('div', {
    marginLeft: 'auto',
    paddingLeft: 20,
    color: '$mauve11',

});

export default function NoteItem({item, actions}) {
    return <Row css={{ alignItems: "center", background: "white", p: "$2", borderRadius: "$4", mb: "$1", boxShadow: `0 2px 20px $colors$blackA3, 0 0 0 1px $colors$grayA2`,}}>
        <Avatar size='lg' >
            <AvatarImage src={item?.users?.profile_image_url} />
            {/* <AvatarFallback /> */}
        </Avatar>
        <Box css={{ flex: 1, px: "$2" }}>
            <H4 css={{ my: 0 }}>{item?.name}</H4>
            {/* <Text css={{ my: 0, fontSize: "$3" }}>
                {new Date(item?.updated_at).toLocaleString()}
            </Text> */}
            <Text css={{ my: '$1' }}>
                {item?.contents}
            </Text>
        </Box>
        <Box css={{ alignSelf: "stretch" }}>
            {actions}
            {/* <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <Button><DotsVerticalIcon /></Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent sideOffset={5}>
                    <DropdownMenuItem>
                        <DropdownMenuItemIndicator>

                        </DropdownMenuItemIndicator>
                        Edit
                        <RightSlot>
                            <Pencil2Icon></Pencil2Icon>
                        </RightSlot>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Delete
                        <RightSlot>
                            <TrashIcon></TrashIcon>
                        </RightSlot>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu> */}

        </Box>

    </Row>
}