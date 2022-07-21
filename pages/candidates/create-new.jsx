import { ArrowLeftIcon } from "@radix-ui/react-icons"

import { Box } from "components/Box"
import Button from "components/Button"
import Datepicker from "components/DatePicker"
import SingleFileUploader from "components/FileUploader"
import { Input } from "components/Input"
import Select from "components/Select"
import { H3 } from "components/Text"
import dayjs from "dayjs"
import DashboardLayout from "layouts/DashboardLayout"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { useGetCountries } from "services/swr/useGetCountries"
import { useGetStates } from "services/swr/useGetStates"
import { useGetDistricts } from "services/swr/useGetDistricts"
import { styled } from "stitches.config"
import { useGetWards } from "services/swr/useGetWards"

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useEffect } from "react"
import { useCRUDCandidate } from "services/crud/useCRUDCandidate"
import { useToasts } from "components/Toast"
import { toFormData } from "utils"
import { useGetCandidateSources } from "services/swr/useGetCandidateSources"
import { useGetCandidateLevels } from "services/swr/useGetCandidateLevels"
import { useGetExpectLocations } from "services/swr/useGetExpectLocations"

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


const schema = yup.object({
    first_name: yup.string().max(255, 'maxium 256 characters').required(),
    last_name:  yup.string().max(255, 'maxium 256 characters').required(),
    email: yup.string().email('should be a valid email format').max(255, 'maxium 256 characters').required(),
    phone: yup.number().typeError('phone must be a number').required()
  }).required();

export default function CreateNewCandidateForm() {
    const router = useRouter();
    const toast = useToasts()
    const { create: createNewCandidate } = useCRUDCandidate();


 

    const { register, formState, watch,  handleSubmit, setValue,  } = useForm({
        resolver: yupResolver(schema)
    });


    const {data: countries } = useGetCountries();
    const {data: expectedLocations} = useGetExpectLocations();
    const {data: sources} = useGetCandidateSources();
    const {data: states, mutate: mutateStates } = useGetStates();
    const {data: districts, mutate: mutateDistricts } = useGetDistricts(watch('city_id'));
    const {data: wards, mutate: mutateWards } = useGetWards(watch('district_id'));
    const {data: candidateLevels} = useGetCandidateLevels()


    const onSubmit = async (rawData) => {
   
        let values = toFormData(rawData)
        try{
            let res = await createNewCandidate(values)
            if(res?.data?.status){
                toast.add(`Candidate ${rawData.first_name} ${rawData.last_name} is successfully created, you can manage, edit & view on the list.`)
                router.push('/candidates')
            }
            else{
                toast.add(res?.data?.message)
            }
        } catch(e){
            toast.add('Add candidate failed')
            console.log(e)
        }

    }

    

    return <Box css={{ padding: 20 }}>
        <Button onClick={() => router.push('/candidates')} css={{ background: "transparent", mb: "$1" }} startEnhancer={<ArrowLeftIcon />}>All candidates</Button>
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
                        <div>
                            <StyledLabel>Avatar</StyledLabel>
                            <SingleFileUploader preview onChange={(file) => setValue('logo',file)} />
                        </div>
                        <div></div>

                       

                        <Input {...register('first_name')} errorMessage={formState.isSubmitted && formState.errors.first_name?.message} label={<span>First name <span style={{color:'red'}}>*</span></span>} />

                        <Input {...register('last_name')} errorMessage={ formState.isSubmitted && formState.errors.last_name?.message}  label={<span>Last name <span style={{color:'red'}}>*</span></span>} />
                        <Input {...register('headline')}  label='Headline' />
                        <Input  {...register('phone')} errorMessage={formState.isSubmitted && formState.errors.phone?.message}  label={<span>Phone <span style={{color:'red'}}>*</span></span>} />
                        <Input {...register('email')} errorMessage={formState.isSubmitted && formState.errors.email?.message}  label={<span>Email <span style={{color:'red'}}>*</span></span>} />
                        <div>
                            <StyledLabel>Birthday</StyledLabel>
                            <Datepicker initialSelectedDate={new Date('1/1/2000')} max={dayjs().toDate()} onChange={(val) => setValue('birth_day', dayjs(val).format('YYYY-MM-DD'))} css={{ width: "100%" }} ></Datepicker>
                        </div>
                        <div>
                            <Select  onSelectionChange={(val) => setValue('national_id', val)} css={{ width: "100%" }} placeholder='select country' label='Country'>
                                {countries?.map((item, id) => <Select.Item key={item.id.toString()} value={`${item.id}`} textValue={item.name}>{item.name}</Select.Item>)}
                            </Select>
                        </div>
                        {/* <Input label='Source' /> */}
                        <div>
                            <Select onSelectionChange={(val) => setValue('city_id', val)} 
                                css={{ width: "100%" }} placeholder='select state' label='State'>
                                {states?.map((item, id) => <Select.Item key={item.id} textValue={`${item.id}`}>{item.name}</Select.Item>)}
                            </Select>
                        </div>

                        <div>
                            <Select  onSelectionChange={(val) => setValue('district_id', val)} css={{ width: "100%" }} placeholder='select district' label='District'>
                                {districts?.map((item, id) => <Select.Item key={item.id} textValue={`${item.id}`}>{item.name}</Select.Item>)}
                            </Select>
                        </div>

                        <div>
                            <Select onSelectionChange={(val) => setValue('ward', val)} css={{ width: "100%" }} placeholder='select ward' label='Ward'>
                                {wards?.map((item, id) => <Select.Item key={item.id} textValue={`${item.id}`}>{item.name}</Select.Item>)}
                            </Select>
                        </div>
                        
                        <Input {...register('address')}   label='Address' />
                        <div>
                            <Select  onSelectionChange={(val) => setValue('expect_location_id', val)} css={{ width: "100%" }} placeholder='select location' label='Expect work location'>
                                {expectedLocations?.map((item, id) => <Select.Item key={item.id} value={item.id} textValue={`${item.id}`}>{item.name}</Select.Item>)}
                            </Select>
                        </div>

                        <div>
                            <Select  onSelectionChange={(val) => setValue('source_id', val)} css={{ width: "100%" }} placeholder='select source' label='Source'>
                                {sources?.map((item, id) => <Select.Item key={item.id} value={item.id} textValue={`${item.id}`}>{item.name}</Select.Item>)}
                            </Select>
                        </div>

                

                    </Box>
                </Card>
 


                <H3>Profile summary</H3>
                <Card>
                    <JoditEditor 
                        onBlur={(val) => setValue('summary', val)}
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
                        placeHolder: "",
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
                </Card>
              
  
                <H3>Professional Information</H3>
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
                        <Input {...register('job_title')} label='Current job title' />
                        <Input {...register('qualification')} label='Qualification' />
                        <Input {...register('current_salary')} label='Current Salary ' />
                        <Input {...register('expected_salary')} label='Expected Salary' />
                        <Input {...register('experience_year')} label='Experience in year' />
                        <div>
                            <Select  onSelectionChange={(val) => setValue('candidate_level_id', val)} css={{ width: "100%" }} placeholder='select level' label='Level'>
                                {candidateLevels?.map((item, id) => <Select.Item key={item.id} value={item.id} textValue={`${item.id}`}>{item.name}</Select.Item>)}
                            </Select>
                        </div>
                    </Box>
                </Card>
                </Panel>
            <br />
           
            <br />
            <Button type='submit' variant='orangeAlt'>Submit</Button>
           
        </form>
    </Box>
}


CreateNewCandidateForm.getLayout = (page) => {
    return <DashboardLayout>
        {page}
    </DashboardLayout>
}