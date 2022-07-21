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
import { useGetUsers } from "services/swr/useGetUsers"
import { useGetJobs } from "services/swr/useGetJobs"
import PaginatedList from "components/PaginatedList"







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

export default function Jobs() {


    const router = useRouter();
    const { companies: qCompanies } = useRouter().query;
    const { data: companies } = useGetCompanies();
    const { data: locations } = useGetLocations();
    const { data: jobCategories } = useGetJobTypes();
    const { data: handlingUsers } = useGetUsers();

    const {data: jobs} = useGetJobs();


    const {filter, setFilter } = useState({});
    const {data: jobApplications} = useGetJobApplications();


    return <Box css={{
        margin: 0,
        padding: "$3",
        paddingTop: "50px"
        // background:"linear-gradient(120deg, rgb(198, 212, 249,), rgb(249, 216, 231));"
    }}>

        <Row css={{ flexWrap: "wrap" }}>
            <Column css={{
                minWidth: 300,
                alignItems: "start"
            }}>
                <Text>Filter Jobs</Text>
                <Label htmlFor="follow-candidate">Followed jobs</Label>
                <Switch defaultChecked id='follow-candidate'>
                    <SwitchThumb />
                </Switch>
                <br />

                <Select label='STATUS' 
                
                buttonProps={{
                    
                }}>
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
                <br />
                <div>
                    <StyledLabel>CREATED AT</StyledLabel>
                    <DateRangePicker></DateRangePicker>
                </div>
                <br />
                <Select label='HIRING COMPANY' onSelectionChange={(val) =>
                    router.push({
                        pathname: "/jobs",
                        query: {
                            companies: [val],
                        },
                    })
                }>
                    {companies?.map((item, id) => <Select.Item key={id} textValue={item.id}>{item.company_name}</Select.Item>)}
                </Select>

                <br />
                <Select label='LOCATION'>
                    {locations?.map((item, id) => <Select.Item key={item.id} textValue={item.id}>{item.location}</Select.Item>)}
                </Select>
                <br />
                <Select label='HANDLING BY'>
                {handlingUsers?.map((item, id) => <Select.Item key={item.id} textValue={item.id}>{item.name}</Select.Item>)}
                </Select>

                <br />
                <Select label='JOB TYPES'>
                    {jobCategories?.map((item, id) => <Select.Item key={item.id} textValue={item.id}>{item.name}</Select.Item>)}
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
                        <DialogTrigger asChild> */}
                            <Button  onClick={() => router.push('/jobs/create-new')} css={{ float: "right" }} variant='violetAlt' endEnhancer={<PlusIcon />}>Create new job</Button>
                        {/* </DialogTrigger>
                        <DialogContent>
                            <CreateNewCandidateForm />
                        </DialogContent>
                    </Dialog> */}

                </div>

                <PaginatedList
                    renderItem={(item, id) => <JobItem item={item} key={id}></JobItem>}
                    items={jobs}
                />


            </Column>
        </Row>



    </Box>
}

Jobs.getLayout = (page) => {
    return <DashboardLayout>
        {page}
    </DashboardLayout>
}