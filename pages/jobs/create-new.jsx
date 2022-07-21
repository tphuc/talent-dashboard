import { ArrowLeftIcon, CheckboxIcon, CheckIcon } from "@radix-ui/react-icons"

import { Box } from "components/Box"
import Button from "components/Button"
import { StyledCheckbox, StyledIndicator } from "components/Checkbox"
import Datepicker from "components/DatePicker"
import { DateRangePicker } from "components/DateRangePicker"
import SingleFileUploader from "components/FileUploader"
import { Row } from "components/Flex"
import { Input } from "components/Input"
import Select from "components/Select"
import { H3, Text } from "components/Text"
import { useToasts } from "components/Toast"
import dayjs from "dayjs"
import DashboardLayout from "layouts/DashboardLayout"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { useCRUDJob } from "services/crud/useCRUDJob"
import { useGetClients } from "services/swr/useGetClients"
import { useGetCommissionTypes } from "services/swr/useGetCommissionTypes"
import { useGetCompanies } from "services/swr/useGetCompanies"
import { useGetDepartments } from "services/swr/useGetDepartments"
import { useGetJobTypes } from "services/swr/useGetJobTypes"
import { useGetLocations } from "services/swr/useGetLocations"
import { useGetVNStates } from "services/swr/useGetVNStates"
import { styled } from "stitches.config"
import { toFormData } from "utils"

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const Panel = styled('div', {
    padding: "$2",
    background: "$gray2",
    borderRadius: "$4",
    minHeight: 300,

})

const StyledLabel = styled('div', {
    fontSize: '$3',
    fontWeight: 500,
    color: '$mauve12',
    userSelect: 'none',
    marginBottom: '$1'
});


const Card = styled('div', {
    background: 'white',
    borderRadius: "$4",
    padding: "$3",
    boxShadow: "0 2px 10px $colors$blackA3"
})


export default function CreateNewJob() {
    const router = useRouter();

    const { data: companies } = useGetCompanies();
    const { data: commissionTypes} = useGetCommissionTypes();
    const { data: locations } = useGetLocations();
    const { data: clients } = useGetClients();
    const {data: departments} = useGetDepartments();
    const { data: jobCategories } = useGetJobTypes();
    const {data: VNlocations} = useGetVNStates()

    const {create} = useCRUDJob();
    const toast = useToasts()


    const { register, handleSubmit, setValue } = useForm();

    const onSubmit = async (vals) => {
        console.log(vals)
        let values = toFormData(vals)
        try{
            let res = await create(values)
            console.log(res.data)
            if(res.data.status){
                toast.add('Add job successfully')
            }
            else{
                toast.add(res.data?.message)
            }
        } catch(e){
            toast.add('Add job failed')
            console.log(e)
        }
    }



    return <Box css={{ padding: 20 }}>
        <Button onClick={() => router.push('/jobs')} css={{ background: "transparent", mb: "$1" }} startEnhancer={<ArrowLeftIcon />}>All jobs</Button>
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
            <Panel>
                <H3>Basic information</H3>
                <Card>
                    <Box css={{
                        display: "grid",
                        // gridTemplateColumns: "repeat(2, 1fr)",
                        justifyContent: "center",
                        gridGap: '$3',
                        '@mobile': {
                            gridTemplateColumns: '1fr'
                        },
                        '@bp3': {
                            gridTemplateColumns: "repeat(2, 1fr)",
                        }

                    }}>
                        {/* <div>
                            <StyledLabel>Logo</StyledLabel>
                            <SingleFileUploader preview />
                        </div> */}

                        <Input {...register('title')} label='Job title' />
                        <div>
                            <Select onSelectionChange={(val) => setValue('job_type_id', val)} css={{ width: "100%" }} placeholder='select category' label='Category'>
                                {jobCategories?.map((item, id) => <Select.Item key={id} textValue={item.id?.toString()}>{item.name}</Select.Item>)}
                            </Select>
                        </div>
                        <div>
                            <Select onSelectionChange={(val) => setValue('location_id', val)} css={{ width: "100%" }} placeholder='select location' label='Location'>
                                {VNlocations?.map((item, id) => <Select.Item key={id} textValue={item.id?.toString()}>{item.name}</Select.Item>)}
                            </Select>
                        </div>
                        <div>
                            <Select onSelectionChange={(val) => setValue('company_id', val)} css={{ width: "100%" }} placeholder='select company' label='Company'>
                                {companies?.map((item, id) => <Select.Item key={id} textValue={item.id?.toString()}>{item.company_name}</Select.Item>)}
                            </Select>
                        </div>

                    </Box>
                    <br />
                    <StyledLabel>Job description</StyledLabel>
                    <JoditEditor
                        onBlur={(val) => setValue('job_description', val)}
                        config={{
                            useSearch: false,
                            spellcheck: false,
                            enter: "P",
                            defaultMode: "1",
                            toolbarAdaptive: false,
                            toolbarSticky: false,
                            showCharsCounter: false,
                            showWordsCounter: false,
                            showXPathInStatusbar: false,
                            askBeforePasteHTML: false,
                            askBeforePasteFromWord: false,
                            minHeight: 200,
                            maxHeight: 500,
                            minWidth: null,
                            buttons:
                                "paragraph,bold,strikethrough,underline,italic,|,superscript,subscript,|,ul,ol,|,|,font,fontsize,brush,,link,|,align,undo,redo",
                            editorCssClass: "alic",
                            placeHolder: "job description",
                            controls: {
                                fontsize: {
                                    list: [
                                        "8",
                                        "9",
                                        "10",
                                        "11",
                                        "12",
                                        "14",
                                        "16",
                                        "18",
                                        "24",
                                        "30",
                                        "36",
                                        "48",
                                        "60",
                                        "72",
                                        "96",
                                        "100"
                                    ]
                                },
                                font: {
                                    command: "fontname",
                                    list: {
                                        "": "Default",
                                        "'Open Sans',sans-serif": "Open Sans",
                                        "Helvetica,sans-serif": "Helvetica",
                                        "Arial,Helvetica,sans-serif": "Arial",
                                        "Georgia,serif": "Georgia",
                                        "Impact,Charcoal,sans-serif": "Impact",
                                        "Tahoma,Geneva,sans-serif": "Tahoma",
                                        "'Times New Roman',Times,serif": "Times New Roman",
                                        "Verdana,Geneva,sans-serif": "Verdana"
                                    }
                                }
                            }
                        }} />
                    <br />
                    <Box css={{
                        display: "grid",
                        // gridTemplateColumns: "repeat(2, 1fr)",
                        justifyContent: "center",
                        gridGap: '$3',
                        '@mobile': {
                            gridTemplateColumns: '1fr'
                        },
                        '@bp3': {
                            gridTemplateColumns: "repeat(2, 1fr)",
                        }

                    }}>
                        <div>
                            <Select onSelectionChange={(val) => setValue('department_id', val)} css={{ width: "100%" }} placeholder='select department' label='Department'>
                                {departments?.map((item, id) => <Select.Item key={id} textValue={item.id?.toString()}>{item.name}</Select.Item>)}
                            </Select>
                        </div>
                        <Input {...register('skills')} label='Skills requirement' />
                        <Input {...register('total_positions')} type='number' label='Total positions' />

                        <div>
                            <StyledLabel>Recruitment period</StyledLabel>
                            <DateRangePicker onChange={(val) => {
                                const { startDate, endDate } = val;
                                setValue('start_date', dayjs(startDate).format('YYYY-MM-DD'))
                                setValue('end_date', dayjs(endDate).format('YYYY-MM-DD'))
                            }} css={{ width: "100%" }} ></DateRangePicker>
                        </div>
                        {/* <Input {...register('')} label='Experience in years' /> */}
                        <Input {...register('salary')} label='Salary' />

                    </Box>
                    <br />
                    <Row>
                        <Row>
                            <StyledCheckbox onCheckedChange={(checked) => setValue('is_shared', checked)}>
                                <StyledIndicator>
                                    <CheckIcon></CheckIcon>
                                </StyledIndicator>

                            </StyledCheckbox>
                            <StyledLabel css={{ marginLeft: 5 }}>Is Shared</StyledLabel>
                        </Row>
                        <Row css={{marginLeft:10}}>
                            <StyledCheckbox onCheckedChange={(checked) => setValue('share_with_affiliate', checked)}>
                                <StyledIndicator>
                                    <CheckIcon></CheckIcon>
                                </StyledIndicator>

                            </StyledCheckbox>
                            <StyledLabel css={{ marginLeft: 5 }}>Shared with affiliates</StyledLabel>
                        </Row>
                    </Row>
                </Card>
            </Panel>
            <br />

            <Button variant='violetAlt'>Submit</Button>
        </form>
    </Box>
}


CreateNewJob.getLayout = (page) => {
    return <DashboardLayout>
        {page}
    </DashboardLayout>
}