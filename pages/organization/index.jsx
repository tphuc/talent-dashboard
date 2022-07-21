import { MagnifyingGlassIcon, PlusIcon } from "@radix-ui/react-icons"
import { Label } from "@radix-ui/react-label"
import { styled } from "@stitches/react"
import { AutoComplete, AutoCompleteItem } from "components/AutoComplete"
import { Box } from "components/Box"
import Button from "components/Button"
import Datepicker from "components/DatePicker"
import { DateRangePicker } from "components/DateRangePicker"
import { Dialog, DialogContent, DialogTrigger } from "components/Dialog"
import { DropdownMenuItem } from "components/DropdownMenu"
import { Column, Row } from "components/Flex"
import { Input } from "components/Input"
import { Pagination } from "components/Pagination"
import Select from "components/Select"
import { Switch, SwitchThumb } from "components/Switch"
import { Text } from "components/Text"
import JobItem from "containers/Jobs/JobItem"
import { useGetCompanies } from "services/swr/useGetCompanies"
import { useGetJobApplications } from "services/swr/useGetJobApplications"
import { useGetJobTypes } from "services/swr/useGetJobTypes"
import { useGetLocations } from "services/swr/useGetLocations"
import DashboardLayout from "layouts/DashboardLayout"
import { Router, useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { RiArrowLeftLine } from "react-icons/ri";

import { useList } from "react-use";
import PaginatedList from "components/PaginatedList"
import { useGetVendors } from "services/swr/useGetVendors"
import VendorItem from "containers/Vendors/VendorItem"
import { Tabs, TabsList, TabsTrigger } from "components/Tabs"
import { TabsContent } from "@radix-ui/react-tabs"
import OrgUserItem from "containers/Organization/UserItem"


import dynamic from "next/dynamic"
import { gray } from "@radix-ui/colors"
import { Avatar, AvatarFallback, AvatarImage } from "components/Avatar"

const Tree = dynamic(() => import('react-organizational-chart').then(module => module.Tree), {ssr:false});
const TreeNode = dynamic(() => import('react-organizational-chart').then(module => module.TreeNode), {ssr:false});



const StyledNodeContainer = styled('div', {
  'border-radius': 8,
  display: 'inline-block',
  border: '1px solid $mauve5'
})

const UserNode = () => {
    return <div style={{minWidth:100, paddingLeft:5, paddingRight:5}}>
        <Avatar style={{marginTop:"-30px"}} size='md' >
            <AvatarImage src={`https://picsum.photos/200/200`} />
            <AvatarFallback>Logo</AvatarFallback>
        </Avatar>
        <Text css={{my:0}}>Susam</Text>
        <Text css={{my:5,color:"$mauve10"}}>General Manager</Text>

    </div>
}

const StyledTreeExample = () => (
  <Tree
    lineWidth={'2px'}
    lineColor={gray.gray5}
    lineHeight={'50px'}
    lineBorderRadius={'10px'}
    label={<StyledNodeContainer>
        <UserNode/>
    </StyledNodeContainer>}
  >
    <TreeNode label={<StyledNodeContainer>
        <UserNode/>
    </StyledNodeContainer>}>
      <TreeNode label={<StyledNodeContainer><UserNode/></StyledNodeContainer>} />
    </TreeNode>
    <TreeNode label={<StyledNodeContainer>Child 2</StyledNodeContainer>}>
      <TreeNode label={<StyledNodeContainer><UserNode/></StyledNodeContainer>}>
        <TreeNode label={<StyledNodeContainer>Great Grand Child 1</StyledNodeContainer>} />
        <TreeNode label={<StyledNodeContainer>Great Grand Child 2</StyledNodeContainer>} />
      </TreeNode>
    </TreeNode>
    <TreeNode label={<StyledNodeContainer>Child 3</StyledNodeContainer>}>
      <TreeNode label={<StyledNodeContainer>Grand Child 1</StyledNodeContainer>} />
      <TreeNode label={<StyledNodeContainer>Grand Child 2</StyledNodeContainer>} />
    </TreeNode>
  </Tree>
);


export default function Organization() {


    const router = useRouter();
    const { data: vendors } = useGetVendors();
    const { data: locations } = useGetLocations();




    return <Box css={{
        margin: 0,
        padding: "$3",
        paddingTop: "50px"
        // background:"linear-gradient(120deg, rgb(198, 212, 249,), rgb(249, 216, 231));"
    }}>
        <Tabs  defaultValue='directory'>
            <TabsList>
                <TabsTrigger value='directory'>Directory</TabsTrigger>
                <TabsTrigger value='chart'>Organization chart</TabsTrigger>
            </TabsList>


            <TabsContent value="directory">
                <Row css={{ justifyContent: "center", alignItems: "center" }}>
                    <Input startEnhancer={<MagnifyingGlassIcon />} css={{ flex: 1 }} placeholder='search for jobs' />
                    <Button variant='orangeAlt' css={{ ml: "$2" }}>Search</Button>
                </Row>
                <br />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button onClick={() => router.push('/vendors/create-new')} variant='violetAlt' endEnhancer={<PlusIcon />}>New member</Button>
                </div>

                <PaginatedList
                    items={[1, 2, 3]}
                    renderItem={(item, id) => <OrgUserItem item={item} key={id}></OrgUserItem>}
                />
            </TabsContent>
            <TabsContent value='chart'>
                <StyledTreeExample/>
            </TabsContent>
        </Tabs>


    </Box>
}

Organization.getLayout = (page) => {
    return <DashboardLayout>
        {page}
    </DashboardLayout>
}