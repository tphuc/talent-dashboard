
import { Box } from "components/Box";
import { Center, Column, Row } from "components/Flex";
import { H2, H3, H4, H5, Text } from "components/Text";
import Select from "components/Select";
import Datepicker from "components/DatePicker";
import { styled } from "stitches.config";


import dynamic from "next/dynamic";

const Chart = dynamic(() => import('react-apexcharts'), {ssr:false})




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


export default function CompanyReport() {
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
            <Box css={{ display: 'flex', alignItems: "stretch", gap: 10, flexWrap: "wrap", justifyContent: "space-between" }}>
                <Card css={{ textAlign: "center", flex: 1, }}>
                    <Text css={{ mt: 0, color: "inherit" }} >TOTAL COMPANIES</Text>
                    <Text css={{ fontWeight: 500, color: "inherit" }}>2000</Text>

                </Card>
                <Card css={{ textAlign: "center", flex: 1, color: "$violet11" }}>
                    <Text css={{ mt: 0, color: "inherit" }} >TOTAL JOBS</Text>
                    <Text css={{ fontWeight: 500, color: "inherit" }}>2000</Text>

                </Card>
                <Card css={{ textAlign: "center", flex: 1, color: "$orange10" }}>
                    <Text css={{ mt: 0, color: "inherit" }} >REVENUE</Text>
                    <Text css={{ fontWeight: 500, color: "inherit" }}>2000 hr</Text>
                </Card>
                <Card css={{ textAlign: "center", flex: 1, color: "$blue10" }}>
                    <Text css={{ mt: 0, color: "inherit" }} >COMISSION</Text>
                    <Text css={{ fontWeight: 500, color: "inherit" }}>2000</Text>
                </Card>
            </Box>
            <br />
            <Card>
                <Chart
                    options={{
                        chart: {
                            id: "basic-bar",
                            type: "line"
                        },
                        xaxis: {
                            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                        },
                        stroke: {
                            width: [0, 4]
                        },
                        markers: {
                            size: 10,
                            offsetX: 0,
                            strokeWidth: 0,
                            strokeOpacity: 0.9,
                            strokeDashArray: 0,
                            offsetY: 0
                        },
                        
                    }}
                    series={[
                        {
                            name: "Quantity",
                            type: "column",

                            data: [30, 40, 45, 50, 49, 60, 70, 91, 17, 57, 28]
                        },
                        {
                            name: "Revenue",
                            type: "line",

                            data: [10, 20, 25, 40, 59, 28, 10, 27, 39, 100, 120]
                        }
                    ]}

                    type="bar"
                    width="100%"
                />
            </Card>
        </Box>

    </Box>
}