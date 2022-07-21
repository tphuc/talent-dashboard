import { Box } from "components/Box"
import Button from "components/Button"
import { DialogClose } from "components/Dialog"
import { Input } from "components/Input"
import { H3, Text } from "components/Text"
import { useForm } from "react-hook-form"
import { styled } from "stitches.config"
import React, { useState } from 'react'
import Datepicker from "components/DatePicker"
import Select from "components/Select"
import dynamic from "next/dynamic"
import SingleFileUploader from "components/FileUploader"
import { useGetCountries } from "services/swr/useGetCountries"
import { useGetVNStates } from "services/swr/useGetVNStates"
import { useGetStates } from "services/swr/useGetStates"
import { useGetDistricts } from "services/swr/useGetDistricts"
import { useGetWards } from "services/swr/useGetWards"
import dayjs from "dayjs"
import { useGetCandidateSources } from "services/swr/useGetCandidateSources"
import { useGetExpectLocations } from "services/swr/useGetExpectLocations"
import { useGetCandidateLevels } from "services/swr/useGetCandidateLevels"

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });


const Panel = styled('div', {
    padding: "$2",
    background: "$gray2",
    borderRadius: "$4",
    position: "relative",
    minHeight: 100
})


const StyledLabel = styled('div', {
    fontSize: '$3',
    fontWeight: 500,
    color: '$mauve12',
    userSelect: 'none',
    marginBottom: '$1'
});


const Card = styled('div', {
    padding: "$5",
    background: "white",
    borderRadius: '$5',
    minHeight: 100,
    boxShadow: "boxShadow: `0 2px 10px $colors$blackA7"
})




export const EditCandidateForm = ({ onSubmit = async () => { }, defaultValues }) => {
    const { handleSubmit, watch, register, formState, setValue } = useForm({
        defaultValues
    });


    const [summary, setSummary] = useState(defaultValues.summary);


    const {data: countries } = useGetCountries();
    const {data: expectedLocations} = useGetExpectLocations();
    const {data: sources} = useGetCandidateSources();
    const {data: states, mutate: mutateStates } = useGetStates();
    const {data: districts, mutate: mutateDistricts } = useGetDistricts(watch('city_id'));
    const {data: wards, mutate: mutateWards } = useGetWards(watch('district_id'));
    const {data: candidateLevels} = useGetCandidateLevels()

    const [loading, setLoading] = React.useState(false);

    const _onSubmit = async (params) => {
        setLoading(true)
        await onSubmit(params)
        setLoading(false)
    }

    return <Panel css={{  }}>
        {/* <Text css={{ my: '$2', color: "$mauve11" }}>Edit Candidate</Text> */}
        <form onSubmit={handleSubmit(_onSubmit)}>
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

                       

                        <Input {...register('first_name')} errorMessage={formState.isSubmitting && formState.errors.firstname?.message} label='First name' />

                        <Input {...register('last_name')} errorMessage={ formState.isSubmitting && formState.errors.lastname?.message}  label='Last name' />
                        <Input {...register('headline')}  label='Headline' />
                        <Input  {...register('phone')} errorMessage={formState.isSubmitting && formState.errors.phone?.message}  label='Phone number' />
                        <Input {...register('email')} errorMessage={formState.isSubmitting && formState.errors.email?.message}  label='Email' />
                        <div>
                            <StyledLabel>Birthday</StyledLabel>
                            <Datepicker initialSelectedDate={new Date(defaultValues.birth_day)} onChange={(val) => setValue('birth_day', dayjs(val).format('YYYY-MM-DD'))} css={{ width: "100%" }} ></Datepicker>
                        </div>
                        <div>
                            <Select defaultSelectedKey={defaultValues?.national_id?.toString()}  onSelectionChange={(val) => setValue('national_id', val)} css={{ width: "100%" }} placeholder='select country' label='Country'>
                                {countries?.map((item, id) => <Select.Item key={item.id.toString()} value={`${item.id}`} textValue={item.name}>{item.name}</Select.Item>)}
                            </Select>
                        </div>
                        {/* <Input label='Source' /> */}
                        <div>
                            <Select  defaultSelectedKey={defaultValues?.city_id?.toString()} onSelectionChange={(val) => setValue('city_id', val)} 
                                css={{ width: "100%" }} placeholder='select state' label='State'>
                                {states?.map((item, id) => <Select.Item key={item.id} textValue={`${item.id}`}>{item.name}</Select.Item>)}
                            </Select>
                        </div>

                        <div>
                            <Select  defaultSelectedKey={defaultValues?.district_id?.toString()} onSelectionChange={(val) => setValue('district_id', val)} css={{ width: "100%" }} placeholder='select district' label='District'>
                                {districts?.map((item, id) => <Select.Item key={item.id} textValue={`${item.id}`}>{item.name}</Select.Item>)}
                            </Select>
                        </div>

                        <div>
                            <Select   defaultSelectedKey={defaultValues?.ward_id?.toString()} onSelectionChange={(val) => setValue('ward_id', val)} css={{ width: "100%" }} placeholder='select ward' label='Ward'>
                                {wards?.map((item, id) => <Select.Item key={item.id} textValue={`${item.id}`}>{item.name}</Select.Item>)}
                            </Select>
                        </div>
                        
                        <Input {...register('address')}   label='Address' />
                        <div>
                            <Select  defaultSelectedKey={defaultValues?.exepect_location_id?.toString()}  onSelectionChange={(val) => setValue('expect_location_id', val)} css={{ width: "100%" }} placeholder='select location' label='Expect work location'>
                                {expectedLocations?.map((item, id) => <Select.Item key={item.id} value={item.id} textValue={`${item.id}`}>{item.name}</Select.Item>)}
                            </Select>
                        </div>

                        <div>
                            <Select  defaultSelectedKey={defaultValues?.source_id?.toString()}  onSelectionChange={(val) => setValue('source_id', val)} css={{ width: "100%" }} placeholder='select source' label='Source'>
                                {sources?.map((item, id) => <Select.Item key={item.id} value={item.id} textValue={`${item.id}`}>{item.name}</Select.Item>)}
                            </Select>
                        </div>

                

                    </Box>
                </Card>
 


                <H3>Profile summary</H3>
                <Card>
                    <JoditEditor 
                        onBlur={(val) => { 
                            setSummary(val)
                            setValue('summary', val)
                        }}
                        value={summary}
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
                            <Select defaultSelectedKey={defaultValues?.candidate_level_id?.toString()}  onSelectionChange={(val) => setValue('candidate_level_id', val)} css={{ width: "100%" }} placeholder='select level' label='Level'>
                                {candidateLevels?.map((item, id) => <Select.Item key={item.id} value={item.id} textValue={`${item.id}`}>{item.name}</Select.Item>)}
                            </Select>
                        </div>
                    </Box>
                </Card>
                <br />
                <Button  type='submit' variant='orangeAlt'>Submit</Button>
                </Panel>
           
           
           
            
           
        </form>
       
    </Panel>
}


