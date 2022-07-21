import { DotsVerticalIcon, MagnifyingGlassIcon, PlusIcon } from "@radix-ui/react-icons"
import { Label } from "@radix-ui/react-label"
import { styled } from "@stitches/react"
import { AutoComplete, AutoCompleteItem } from "components/AutoComplete"
import { Box } from "components/Box"
import Button from "components/Button"
import Datepicker from "components/DatePicker"
import { DateRangePicker } from "components/DateRangePicker"
import { Dialog, DialogContent, DialogTrigger } from "components/Dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "components/DropdownMenu"
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
import { Avatar, AvatarFallback, AvatarImage } from "components/Avatar"





const Badge = styled('span', {
    padding: "4px 6px",
    background: "$violet9",
    color: "white",
    borderRadius: '$4',
    fontSize: "small"
})

const StyledLabel = styled('label', {
    fontSize: '$3',
    fontWeight: 500,
    display: "block",
    color: '$mauve12',
    userSelect: 'none',
    marginBottom: '$1'
});

const CreateNewCandidateForm = () => {
    const { register } = useForm();
    return <Box>
        <Text>Add Job</Text>
        <Input label='job name' {...register('firstname')}></Input>

        <br />


    </Box>
}

export default function CareerSites() {


    const router = useRouter();
    const { data: vendors } = useGetVendors();
    const { data: locations } = useGetLocations();




    return <Box css={{
        margin: 0,
        padding: "$3",
        paddingTop: "50px"
        // background:"linear-gradient(120deg, rgb(198, 212, 249,), rgb(249, 216, 231));"
    }}>

        <Row css={{ flexWrap: "wrap" }}>
            <Column css={{
                minWidth: 240,
                alignItems: "start"
            }}>
                <Text>Filters</Text>
                <Label htmlFor="follow-candidate">Followed</Label>
                <Switch defaultChecked id='follow-candidate'>
                    <SwitchThumb />
                </Switch>
                <br />

                <Select label='STATUS' buttonProps={{
                    // labelProps: {
                    //     color:"$violet10"
                    // }
                }}>
                    <Select.Item>All</Select.Item>
                    <Select.Item>Public</Select.Item>
                    <Select.Item>Draft</Select.Item>
                </Select>
                <br />
                <div>
                    <StyledLabel>CREATED AT</StyledLabel>
                    <Datepicker></Datepicker>
                </div>

                <br />
                <Select label='HANDLING BY'>
                    <Select.Item>Red</Select.Item>
                    <Select.Item>Orange</Select.Item>
                    <Select.Item>Yellow</Select.Item>
                    <Select.Item>Green</Select.Item>
                    <Select.Item>Blue</Select.Item>
                    <Select.Item>Purple</Select.Item>
                    <Select.Item>Black</Select.Item>
                    <Select.Item>Black1</Select.Item>
                    <Select.Item>Black2</Select.Item>
                </Select>


            </Column>
            <Column css={{ flex: 1 }}>
                <Row css={{ justifyContent: "center", alignItems: "center" }}>
                    <Input startEnhancer={<MagnifyingGlassIcon />} css={{ flex: 1 }} placeholder='search for jobs' />
                    <Button variant='orangeAlt' css={{ ml: "$2" }}>Search</Button>

                </Row>
                <br />
                <div>
                    {/* <Dialog modal>
                        <DialogTrigger asChild>
                           
                        </DialogTrigger>
                        <DialogContent>
                            <CreateNewCandidateForm />
                        </DialogContent>
                    </Dialog> */}

                    <Button onClick={() => router.push('/career-site/create-new')} css={{ float: "right" }} variant='violetAlt' endEnhancer={<PlusIcon />}>Create new site</Button>

                </div>
                <br />
                <Box css={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                    gridGap: '10px'
                }}>
                    {[1, 2, 3].map((item, id) => <Box css={{ display: "flex", position:"relative", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 10, borderRadius: '$4', background: "$mauve3" }}>
                    <div style={{ width: "100%" }}>
                            <Badge>Published</Badge>
                        </div>

                        <br/>
                        <img style={{ width: '100%', height: 'auto', height:160, borderRadius: 10 }} src={`https://picsum.photos/300/300`} />

                        <Avatar style={{marginTop: '-20px'}} size='md' >
                            <AvatarImage src={`https://picsum.photos/2`} />
                            <AvatarFallback>Logo</AvatarFallback>
                        </Avatar>
                        <Text css={{ textAlign: "center" }}>Company A</Text>
                       
                        <Box css={{ position:"absolute", top:5, right:5, }}>
                            <DropdownMenu >
                                <DropdownMenuTrigger asChild>
                                    <Button variant='white'><DotsVerticalIcon /></Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent sideOffset={5}>
                                    {/* {dropdownItems} */}
                                    <DropdownMenuItem onClick={() => router.push(`/career-site/1`)}>Edit</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </Box>
                    </Box>)}
                </Box>


            </Column>
        </Row>


    </Box>
}

CareerSites.getLayout = (page) => {
    return <DashboardLayout>
        {page}
    </DashboardLayout>
}