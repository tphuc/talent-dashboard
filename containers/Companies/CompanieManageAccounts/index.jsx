
import { DoubleArrowDownIcon, DoubleArrowUpIcon, Pencil2Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons"
import { Box } from "components/Box"
import Button from "components/Button"
import Table from "components/Table"
import { H3, H4, Text } from "components/Text"
import react from "react"
import { styled } from "stitches.config"


const Panel = styled('div', {
    padding: "$2",
    background: "$gray2",
    borderRadius: "$4",
    minHeight: 300
})


const Badge = styled('span', {
    fontSize:'small',
    mx:"$1",
    background:"$gray2",
    padding:"$1 $2",
    borderRadius:"$2",
    color:"$orange9"
})
export default function CompanyManageAcccounts({ }) {


    return <div>
       

        <Panel>
        {/* <H4 css={{mt:0}}>Accounts</H4> */}
        <Button css={{ display:"flex", marginLeft:"auto", mb:"$1"}}  variant='violetAlt' endEnhancer={<PlusIcon/>}>Add new account </Button>
       
        <Table


            sortable={false}

            rowsPerPage={10}
            columns={[
                {
                    Header: 'Name',
                    accessor: 'name',
   
                },
                {
                    Header: 'Contact',
                    accessor: 'contact',
                },

                {
                    Header: 'Actions',
                    accessor: '_action',
                    disableSort: true
                },
            ]}
            data={[
                {
                    name: <div>
                    <span>John doe</span>
                    <Badge css={{display:"inline"}}>Main account</Badge>
                    </div>,
                    contact: 'johndoe@gmail.com',
                    description:"This is the descriptions",
                    _action: <>
                  
                    <Button><Pencil2Icon /></Button>
                    <Button><TrashIcon /></Button>
                </>
                },
                {
                    name: "Jane Doe",
                    contact: 'janedoe@gmail.com',
                    description:"This is the descriptions",
                    _action: <>
                   
                    <Button><Pencil2Icon /></Button>
                    <Button><TrashIcon /></Button>
                </>
                },


            ]} />
            </Panel>

    </div>
}