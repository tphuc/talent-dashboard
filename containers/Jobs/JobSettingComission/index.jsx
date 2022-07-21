
import { DoubleArrowDownIcon, DoubleArrowUpIcon, Pencil2Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons"
import Button from "components/Button"
import Table from "components/Table"
import { H3, H4, Text } from "components/Text"
import react from "react"
import { styled } from "stitches.config"


const Panel = styled('div', {
    padding: "$2",
    background: "$gray2",
    borderRadius: "$4",
    minHeight: 300
})

export default function JobSettingHiringComission() {


    return <div>
        <Button css={{ display: "flex", marginLeft: "auto" }} variant='violetAlt' endEnhancer={<PlusIcon />}>Add new stage </Button>
        <Panel>
            <H4 css={{ mt: 0 }}>Customize hiring pipeline</H4>

            <Table


                sortable={false}

                rowsPerPage={10}
                columns={[
                    {
                        Header: 'Vendor',
                        accessor: 'vender',

                    },
                    {
                        Header: 'Vendor type',
                        accessor: 'vendorType',
                    },
                    {
                        Header: 'Comission Type',
                        accessor: 'comissionType',
                    },
                    {
                        Header: 'Value',
                        accessor: 'value',
                    },
                    {
                        Header: 'Calculation metric',
                        accessor: 'calculationMetric',
                    },
                    {
                        Header: 'KPI',
                        accessor: 'kpi',
                    },
                    {
                        Header: 'Actions',
                        accessor: '_action',
                        disableSort: true
                    }
                ]}
                data={[
                    {
                        vender: "New Applied",
                        vendorType: 'Affiliate',
                        comissionType: "Percentage",
                        value: '10%',
                        calculationMetric: 'Interview quantity',
                        kpi: "Per interview",
                        _action: <>

                            <Button><Pencil2Icon /></Button>
                            <Button><TrashIcon /></Button>
                        </>
                    },

                ]}
            />
        </Panel>

    </div>
}