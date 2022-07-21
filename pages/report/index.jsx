import { DownloadIcon } from "@radix-ui/react-icons";
import { styled } from "@stitches/react";
import { Avatar, AvatarFallback, AvatarImage } from "components/Avatar";
import { Box } from "components/Box";
import Button from "components/Button";

import { Center, Column, Row } from "components/Flex";
import Table from "components/Table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/Tabs";
import { H2, H3, H4, H5, Text } from "components/Text";

import DashboardLayout from "layouts/DashboardLayout";
import Link from "next/link";
import { useRouter } from "next/router";

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { mauve, violet } from "@radix-ui/colors";
import Select from "components/Select";
import Datepicker from "components/DatePicker";
import JobReport from "containers/Reports/JobReport";
import dynamic from "next/dynamic";
import ApplicationReport from "containers/Reports/ApplicationReport";
import SourceApplicationReport from "containers/Reports/SourceApplicationReport";
import CompanyReport from "containers/Reports/CompanyReport";
import VendorReport from "containers/Reports/VendorReport";



const StyledLabel = styled('label', {
    fontSize: '$3',
    fontWeight: 500,
    display: "block",
    color: '$mauve12',
    userSelect: 'none',
    marginBottom: '$1'
});

const StyledToggleGroup = styled(ToggleGroupPrimitive.Root, {
    display: 'flex',
    flexDirection: "column",
    alignItems: "flex-start",
    borderRadius: 4,
});

const StyledItem = styled(ToggleGroupPrimitive.Item, {
    all: 'unset',
    color: mauve.mauve11,
    display: 'flex',
    padding: '$1',
    paddingLeft: 0,
    fontSize: 15,
    lineHeight: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 1,
    '&:hover': { color: violet.violet11 },
    '&[data-state=on]': { color: violet.violet10, fontWeight: 500 },
});

const EventBadge = styled('div', {
    background: "$violet9",
    color: "white",
    padding: '1px $2',
    borderRadius: 4,
    cursor: 'pointer',
    transition: "0.4s ease all",
    margin: "$1",
    '&:hover': {
        background: "$violet10"
    }
})

const Panel = styled('div', {
    padding: "$2",
    background: "$gray2",
    borderRadius: "$4",
    minHeight: 300
})

const StyledEventLink = styled('div', {
    padding: "5px",
    borderRadius: '$3',
    background: "$mauve4",
    border: "1px solid $mauve4"
})

var formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const Card = styled('div', {
    background: 'white',
    borderRadius: "$4",
    padding: "$2",
    boxShadow: "0 2px 10px $colors$blackA3"
})


const overideStyles = {
    TabsTrigger: {
        paddingLeft: 0,
        height: 35,
        '&:hover': {
            color: '$violet10'
        },
        boxShadow: "none",
        '&[data-state="active"]': {
            color: '$violet10',
            backgroundColor: 'transparent',
            boxShadow: "none",
            fontWeight: 500

        },
    }
}



export default function Reports() {

    const router = useRouter()
    return <Box css={{
        margin: 0,
        padding: "$3",
        paddingTop: "50px"
    }}>
        <Tabs defaultValue='jobs'>


            <Box css={{
                display: "grid",
                gridTemplateColumns: "260px 1fr",
                gridGap: 10
            }}>
                <Box>
                    <H4>Choose report</H4>
                    <TabsList  css={{ flexDirection: "column", alignItems: "flex-start", background: "none", }}>
                        <TabsTrigger css={overideStyles.TabsTrigger} value="jobs">Jobs</TabsTrigger>
                        <TabsTrigger css={overideStyles.TabsTrigger} value="applications">Application & candidates</TabsTrigger>
                        <TabsTrigger css={overideStyles.TabsTrigger} value="sources_candidate">Sources of application & candidates</TabsTrigger>
                        <TabsTrigger css={overideStyles.TabsTrigger} value="companies">Companies</TabsTrigger>
                        <TabsTrigger css={overideStyles.TabsTrigger} value="vendors">Vendors</TabsTrigger>
                    </TabsList>

                </Box>


                <Panel>
                    <TabsContent value='jobs'>
                        <JobReport/>
                    </TabsContent>
                    <TabsContent value='applications'>
                        <ApplicationReport/>
                    </TabsContent>
                    <TabsContent value='sources_candidate'>
                        <SourceApplicationReport/>
                    </TabsContent>
                    <TabsContent value='companies'>
                        <CompanyReport/>
                    </TabsContent>
                    <TabsContent value='vendors'>
                        <VendorReport/>
                    </TabsContent>

                </Panel>



            </Box>


        </Tabs>


    </Box>
}


Reports.getLayout = (page) => {
    return <DashboardLayout>
        {page}
    </DashboardLayout>
}