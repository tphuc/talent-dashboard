import { DotsVerticalIcon, MagnifyingGlassIcon, PlusIcon } from "@radix-ui/react-icons"
import { Label } from "@radix-ui/react-label"
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
import { H1, H2, Text } from "components/Text"
import CandidateItem from "containers/Candidates/CandidateItem"
import { useGetJobApplications } from "services/swr/useGetJobApplications"
import DashboardLayout from "layouts/DashboardLayout"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { RiArrowLeftLine } from "react-icons/ri";

import { useList } from "react-use";
import PaginatedList from "components/PaginatedList"
import { useGetJobs } from "services/swr/useGetJobs"
import { useGetCandidates } from "services/swr/useGetCandidates"
import { ConfirmModalDialog } from "components/modules/ConfirmModalDialog"
import { useCRUDCandidate } from "services/crud/useCRUDCandidate"
import { StyledDropdownItem } from "components/modules/StyledDropdownItem"
import { CSVLink } from "react-csv"



const LIMIT = 10;




export default function Candidates() {

    const router = useRouter();



    const { companies: qCompanies } = useRouter().query;



    const { filter, setFilter } = useState({});
    const { data: candidates, mutate } = useGetCandidates();
    const { remove } = useCRUDCandidate()

    const dropdownRef = useRef()
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
                <Text>Filter candidates</Text>
                <Label htmlFor="follow-candidate">Followed candidates</Label>
                <Switch defaultChecked id='follow-candidate'>
                    <SwitchThumb />
                </Switch>
                <br />


                <Select label='STATUS' buttonProps={{

                    // labelProps: {
                    //     color:"$violet10"
                    // }
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
                <Select label='CREATED AT'>
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
                <Select label='IN-JOBS'>
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
                <Select label='LOCATION'>
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

                <br />
                <Select label='JOB TYPE'>
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
                {/* <Select label='HIRING COMPANY' onSelectionChange={(val) =>
                    router.push({
                        pathname: "/candidates",
                        query: {
                            companies: [val],
                        },
                    })
                }>
                    {companies?.map((item, id) => <Select.Item key={id} textValue={item.id}>{item.company_name}</Select.Item>)}
                </Select> */}

            </Column>
            <Column css={{ flex: 1 }}>
                <Row css={{ justifyContent: "center", alignItems: "center" }}>
                    <Input startEnhancer={<MagnifyingGlassIcon />} css={{ flex: 1 }} placeholder='search for condidates' />
                    <Button variant='orangeAlt' css={{ ml: "$2" }}>Search</Button>

                </Row>
                <br />
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 5 }}>
                    <DropdownMenu  >
                        <DropdownMenuTrigger asChild>
                            <Button><DotsVerticalIcon /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent sideOffset={5}>
                            <DropdownMenuItem >
                                <StyledDropdownItem>Mass Upload</StyledDropdownItem>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CSVLink
                                    data={candidates}
                                    filename={"data.csv"}
                                    target="_blank"
                                    style={{ textDecoration: "none", color: "inherit", width: "100%" }}
                                >
                                    <StyledDropdownItem>
                                        Export list
                                    </StyledDropdownItem>
                                </CSVLink>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button onClick={() => router.push('/candidates/create-new')} css={{ float: "right" }} variant='orangeAlt' startEnhancer={<PlusIcon />}>New candidate</Button>


                </div>

                <PaginatedList
                    items={candidates}
                    renderItem={(item, id) => <CandidateItem key={id} item={item} key={id} dropdownItems={<>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild >
                                <Button><DotsVerticalIcon /></Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent sideOffset={5}>
                                <DropdownMenuItem onClick={() => router.push(`/candidates/${item.id}`)}>View profile</DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => {
                                    dropdownRef.current?.click()
                                }}>
                                    Delete
                                </DropdownMenuItem>


                            </DropdownMenuContent>
                        </DropdownMenu>
                        <ConfirmModalDialog
                            asChild={false}
                            triggerRef={dropdownRef}
                            triggerStyle={{ display: 'none' }}
                            onConfirm={async () => {
                                
                                let res = await remove(item.id)
                                console.log('----', item.id, res)
                                mutate()
                                return
                            }} alertText={'Are you sure to proceed action?'} />



                    </>} />}


                />


            </Column>
        </Row>


    </Box>
}

Candidates.getLayout = (page) => {
    return <DashboardLayout>
        {page}
    </DashboardLayout>
}