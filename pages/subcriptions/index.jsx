import { DownloadIcon } from "@radix-ui/react-icons";
import { styled } from "@stitches/react";
import { Avatar, AvatarFallback, AvatarImage } from "components/Avatar";
import { Box } from "components/Box";
import Button from "components/Button";

import { Center, Row } from "components/Flex";
import Table from "components/Table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/Tabs";
import { H2, H3, H4, H5 } from "components/Text";

import DashboardLayout from "layouts/DashboardLayout";
import Link from "next/link";
import { useRouter } from "next/router";

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


export default function Subcriptions() {

    const router = useRouter()
    return <Box css={{
        margin: 0,
        padding: "$3",
        paddingTop: "50px"
    }}>
        <Box css={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gridGap:'1em'
        }}>
            <Center css={{ flexDirection: "column" }}>
                <Avatar size='lg' >
                    <AvatarImage src={'https://picsum.photos/300/300'} />
                    <AvatarFallback />

                </Avatar>

                <H3 css={{ fontWeight: "500", my: '$1', mr: "$2" }}> Company name </H3>
                <span>Payment cycle: monthly</span>
                <span>Next payment: {new Date().toLocaleDateString()}</span>
                <br />
                <Button onClick={() => router.push('/subcriptions/change')} variant='orangeAlt'>Change payment</Button>

            </Center>
            <Panel>
                <H3>Payment history</H3>
                <Table

                    sortable
                    rowsPerPage={10}
                    columns={[
                        {
                            Header: 'Transaction date',
                            accessor: 'transact_date',
                            filter: 'fuzzyText',
                        },
                        {
                            Header: 'Package',
                            accessor: 'package',
                            filter: 'fuzzyText',
                        },
                        {
                            Header: 'Duration',
                            accessor: 'duration',
                            filter: 'fuzzyText',
                        },
                        {
                            Header: 'Payment method',
                            accessor: 'payment_method',
                            filter: 'fuzzyText',
                        },
                        {
                            Header: 'Type',
                            accessor: 'type',
                            filter: 'fuzzyText',
                        },
                        {
                            Header: 'Amount',
                            accessor: 'amount',
                            filter: 'fuzzyText',
                        },

                        {
                            Header: 'Actions',
                            accessor: '_action',
                            disableSort: true
                        },
                    ]}
                    data={[
                        {
                            transact_date: '22/12/2021',
                            package:"Package A",
                            duration: '14 May 2022 - 13 Jun 2022',
                            type:"professional",
                            amount: formatter.format(1500000),
                            _action: <Button><DownloadIcon/></Button>
                        },
                        {
                            transact_date: '5/1/2022',
                            package:"Package B",
                            duration: '14 May 2022 - 13 Jun 2022',
                            type:"professional",
                            amount: formatter.format(1200000),
                            _action: <Button><DownloadIcon/></Button>
                        },
                        {
                            transact_date: '5/6/2022',
                            package:"Package C",
                            duration: '14 May 2022 - 13 Jun 2022',
                            type:"professional",
                            amount: formatter.format(1100000),
                            _action: <Button><DownloadIcon/></Button>
                        }
                    ]} />
            </Panel>
        </Box>



    </Box>
}


Subcriptions.getLayout = (page) => {
    return <DashboardLayout>
        {page}
    </DashboardLayout>
}