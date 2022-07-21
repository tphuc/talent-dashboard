import { DotsVerticalIcon, EyeOpenIcon, ReaderIcon, TrashIcon } from "@radix-ui/react-icons";
import { Box } from "components/Box";
import Button from "components/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuItemIndicator } from "components/DropdownMenu";
import { Row } from "components/Flex";
import { truncate } from "lodash";
import { RiDeleteBin4Line, RiDownload2Line, RiDownloadLine, RiEye2Line, RiEyeLine, RiPrinterLine } from "react-icons/ri";
import { styled } from "stitches.config";


const RightSlot = styled('div', {
    marginLeft: 'auto',
    paddingLeft: 20,
    color: '$mauve11',
   
  });

export default function CandidateResumeItem({item, actionButtons}){
    return <Row css={{alignItems:"center", background:"white", p:"$2", borderRadius:"$4", boxShadow:"0px 10px 20px $colors$blackA2"}}>
        <ReaderIcon></ReaderIcon>
        <Box css={{flex:1, px:"$2"}}>
            <span>{item.name}</span>
        </Box>
        {actionButtons}
       

        {/* <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button><DotsVerticalIcon/></Button>
            </DropdownMenuTrigger>



            <DropdownMenuContent sideOffset={5}>
                <DropdownMenuItem>
                <DropdownMenuItemIndicator>
               
              </DropdownMenuItemIndicator>
                    View
                    <RightSlot>
                        <RiEye2Line></RiEye2Line>
                    </RightSlot>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Print
                    <RightSlot>
                        <RiPrinterLine></RiPrinterLine>
                    </RightSlot>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Download
                    <RightSlot>
                        <RiDownload2Line></RiDownload2Line>
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
        
    </Row>
}