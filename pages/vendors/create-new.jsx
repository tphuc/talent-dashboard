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
import { useGetLocations } from "services/swr/useGetLocations"
import { useGetStates } from "services/swr/useGetStates"
import { useGetDistricts } from "services/swr/useGetDistricts"
import { styled } from "stitches.config"
import { useGetWards } from "services/swr/useGetWards"

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useEffect } from "react"
import { useToasts } from "components/Toast"
import { useCRUDCompany } from "services/crud/useCRUDCompany"
import { useGetIndustries } from "services/swr/useGetIndustries"
import { useGetCompanySources } from "services/swr/useGetCompanySources"
import { toFormData } from "utils"
import { useCRUDVendor } from "services/crud/useCRUDVendor"
import { useGetVendorTypes } from "services/swr/useGetVendorTypes"

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
    maxWidth: 900,
    boxShadow: "0 2px 10px $colors$blackA3"
})


const schema = yup.object({
    // firstname: yup.string().required(),
    // lastname:  yup.string().required(),
    // email: yup.string().email().required(),
    // phone: yup.string().required()
  }).required();

export default function CreateNewVendor() {
    const router = useRouter();
    const toast = useToasts()
    const { create } = useCRUDVendor();


 

    const { register, formState, watch,  handleSubmit, setValue,  } = useForm({
        resolver: yupResolver(schema)
    });


    const {data: countries } = useGetCountries();
    const {data: industries } = useGetIndustries();
    const {data: sources} = useGetCompanySources();
    const {data: states, } = useGetStates(watch('country'));
    const {data: districts,} = useGetDistricts(watch('state'));
    const {data: wards, } = useGetWards(watch('district'));


    const {data:vendorTypes} = useGetVendorTypes()

    const onSubmit = async (vals) => {
        // console.log(values)
        let values = toFormData(vals)
        try{
            let res = await create(values)
            console.log(res.data, res.status)
            if(res.data.status){
                toast.add('Add vendor successfully')
                router.push('/vendors')
            }
            else{
                toast.add(res.data?.message)
            }

        } catch(e){
            toast.add('Add vendor failed')
            console.log(e)
        }

    }

    // useEffect(() => {
    //     const subscription = watch((value, { name, type }) => console.log(value, name, type));
    //     return () => subscription.unsubscribe();
    // }, [watch])





    

    return <Box css={{ padding: 20 }}>
        <Button onClick={() => router.push('/vendors')} css={{ background: "transparent", mb: "$1" }} startEnhancer={<ArrowLeftIcon />}>All companies</Button>
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
                            <StyledLabel>Logo</StyledLabel>
                            <SingleFileUploader preview onChange={(file) => setValue('logo',file)} />
                        </div>
                        <div></div>
                        <Input {...register('name')}  label='Vendor name' />
                        <Input {...register('email')}  label='Email' />
                        <Input {...register('mobile')}  label='Mobile' />

                        <div>
                            <Select onSelectionChange={(val) => setValue('source_id', val)} css={{ width: "100%" }} placeholder='select source' label='Sources'>
                                {sources?.map((item, id) => <Select.Item key={item.id} value={item.id} textValue={item.name}>{item.name}</Select.Item>)}
                            </Select>
                        </div>

                        <div>
                            <Select onSelectionChange={(val) => setValue('vendor_type_id', val)} css={{ width: "100%" }} placeholder='select vendor type' label='Vendor Type'>
                                {vendorTypes?.map((item, id) => <Select.Item key={item.id} value={item.id} textValue={item.name}>{item.name}</Select.Item>)}
                            </Select>
                        </div>

                      

                    
                        <Input {...register('representative')}  label='Representative name' />
                        <Input {...register('address')}  label='Address' />
                        {/* <div>
                            <StyledLabel>Birthday</StyledLabel>
                            <Datepicker onChange={(val) => setValue('birthday', dayjs(val).format('DD/MM/YYYY'))} css={{ width: "100%" }} ></Datepicker>
                        </div> */}
                        <div>
                            <Select onSelectionChange={(val) => setValue('country', val)} css={{ width: "100%" }} placeholder='select country' label='Country'>
                                {countries?.map((item, id) => <Select.Item key={item.id} value={item.id} textValue={item.country_name}>{item.country_name}</Select.Item>)}
                            </Select>
                        </div>
                        {/* <Input label='Source' /> */}
                        <div>
                            <Select onSelectionChange={(val) => {
                                    setValue('state', val)
                                }} 
                                css={{ width: "100%" }} placeholder='select state' label='State'>
                                {states?.map((item, id) => <Select.Item key={item.id} textValue={item.id?.toString()}>{item.name}</Select.Item>)}
                            </Select>
                        </div>

                        <div>
                            <Select  onSelectionChange={(val) => setValue('district', val)} css={{ width: "100%" }} placeholder='select district' label='District'>
                                {districts?.map((item, id) => <Select.Item key={item.id} textValue={item.id?.toString()}>{item.name}</Select.Item>)}
                            </Select>
                        </div>

                        <div>
                            <Select onSelectionChange={(val) => setValue('ward', val)} css={{ width: "100%" }} placeholder='select ward' label='Ward'>
                                {wards?.map((item, id) => <Select.Item key={item.id} textValue={item.id?.toString()}>{item.name}</Select.Item>)}
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
              
                </Panel>
            <br />
            <Button type='submit' variant='violetAlt'>Submit</Button>
        </form>
    </Box>
}


CreateNewVendor.getLayout = (page) => {
    return <DashboardLayout>
        {page}
    </DashboardLayout>
}