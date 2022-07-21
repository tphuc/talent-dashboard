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

export default function Companies() {


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
                <Text>Filter Vendors</Text>
                <Label htmlFor="follow-candidate">Followed Vendors</Label>
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
                    <Select.Item>Active</Select.Item>
                    <Select.Item>Deactived</Select.Item>
                </Select>
                <br />
                <div>
                    <StyledLabel>CREATED AT</StyledLabel>
                    <Datepicker></Datepicker>
                </div>
                <br />

                <Select label='LOCATION'>
                    {locations?.map((item, id) => <Select.Item key={item.id} textValue={item.id}>{item.location}</Select.Item>)}
                </Select>
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

                    <Button onClick={() => router.push('/vendors/create-new')} css={{ float: "right" }} variant='violetAlt' endEnhancer={<PlusIcon />}>Create new vendor</Button>

                </div>


                <PaginatedList
                    items={vendors || []}
                    renderItem={(item, id) => <VendorItem item={item} key={id}></VendorItem>}

                />
            </Column>
        </Row>


    </Box>
}

Companies.getLayout = (page) => {
    return <DashboardLayout>
        {page}
    </DashboardLayout>
}