import { styled } from "@stitches/react";
import Button from "components/Button";
import { DialogClose } from "components/Dialog";
import { Input } from "components/Input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/Tabs";
import { H4, Text } from "components/Text";
import React from "react";
import { useForm } from "react-hook-form";
import SettingCommissionKpi from "./CommissionKPI";
import SettingCommissionTypes from "./CommissionTypes";
import SettingVendorTypes from "./VendorTypes";


const Panel = styled('div', {
    padding: "$2",
    background: "$gray2",
    borderRadius: "$4",
    position: "relative",
    minHeight: 100
})

const Card = styled('div', {
    padding: "$5",
    background: "white",
    borderRadius: '$5',
    minHeight: 100,
    boxShadow: "boxShadow: `0 2px 10px $colors$blackA7"
})

const StyledEventLink = styled('div', {
    padding: "5px",
    borderRadius: '$3',
    background: "$mauve4",
    border: "1px solid $mauve4"
})




export default function VendorSetting() {


    

    return <div>
        <Tabs aria-labelledby="vendor-setting-tabs" defaultValue="vendor-type">
            <TabsList aria-label="vendor_setting">
                <TabsTrigger size='sm' variant='orange' value="vendor-type">Vendor Type</TabsTrigger>
                <TabsTrigger size='sm' variant='orange' value="commission-type">Comission Types</TabsTrigger>
                <TabsTrigger size='sm' variant='orange' value="commission-kpi">Commission KPI</TabsTrigger>
            </TabsList>
            <TabsContent value="vendor-type">
                <SettingVendorTypes/>
            </TabsContent>
            <TabsContent value="commission-type">
                <SettingCommissionTypes/>
            </TabsContent>
            <TabsContent value="commission-kpi">
                <SettingCommissionKpi/>
            </TabsContent>
        </Tabs>


    </div>
}


