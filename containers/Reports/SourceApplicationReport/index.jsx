
import { Box } from "components/Box";
import { Center, Column, Row } from "components/Flex";
import { H2, H3, H4, H5, Text } from "components/Text";
import Select from "components/Select";
import Datepicker from "components/DatePicker";
import { styled } from "stitches.config";


import dynamic from "next/dynamic";
import Table from "components/Table";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })




const StyledLabel = styled('label', {
    fontSize: '$3',
    fontWeight: 500,
    display: "block",
    color: '$mauve12',
    userSelect: 'none',
    marginBottom: '$1'
});


const Card = styled('div', {
    background: 'white',
    borderRadius: "$4",
    padding: "$2",
    boxShadow: "0 2px 10px $colors$blackA3"
})


export default function SourceApplicationReport() {
    return <Box css={{
        display: "grid",
        gridTemplateColumns: "200px 1fr",
        gridGap: '5px'
    }}>
        <Card>
            <H4 css={{ mt: 0 }}>Filter</H4>
            <Column css={{
                width: "100%",
                alignItems: "stretch"
            }}>



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
                <div>
                    <StyledLabel>DATE</StyledLabel>
                    <Datepicker css={{ width: "100%" }}></Datepicker>
                </div>


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


            </Column>
        </Card>
        <Box>

            <Table

                rowsPerPage={10}
                columns={[
                    {
                        Header: 'Applied',
                        accessor: 'applied',

                    },
                    {
                        Header: 'Phone Screen',
                        accessor: 'phone',

                    },
                    {
                        Header: 'Interviewed',
                        accessor: 'interviewed',
                    },
                    {
                        Header: 'Rejected',
                        accessor: 'rejected',
                    },
                    {
                        Header: 'Hired',
                        accessor: 'hired',
                    },

                ]}

    
                data={[
                    {
                        applied: 1,
                        phone: 2,
                        interviewed: 3,
                        rejected: 4,
                        hired: 5,
                    },
                    {
                        applied: 12,
                        phone: 7,
                        interviewed: 8,
                        rejected: 7,
                        hired: 9,

                    },


                ]} />
            <br />
            <Card>
                <Text>Source contribution</Text>
                <Chart
                    options={{
                        chart: {
                            id: "basic-bar",


                        },
                        labels: ['Apples', 'Oranges', 'Berries', 'Grapes'],
                        markers: {
                            size: 10,
                            offsetX: 0,
                            strokeWidth: 0,
                            strokeOpacity: 0.9,
                            strokeDashArray: 0,
                            offsetY: 0
                        }
                    }}
                    series={[44, 55, 13, 33]}

                    type='donut'
                    width={500}
                />
            </Card>
        </Box>

    </Box>
}