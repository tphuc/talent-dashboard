import { styled } from "@stitches/react";
import Button from "components/Button";
import { DialogClose } from "components/Dialog";
import { Input } from "components/Input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/Tabs";
import { H4, Text } from "components/Text";
import React from "react";
import { useForm } from "react-hook-form";
import SettingIndustry from "./Industry";
import SettingCompanySources from "./Source";


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




export default function CompanySettings() {


    

    return <div>
        <Tabs aria-labelledby="company-setting-tabs" defaultValue="industry">
            <TabsList aria-label="company_setting">
                    <TabsTrigger size='sm' variant='orange' value="industry">Industry</TabsTrigger>
                    <TabsTrigger size='sm' variant='orange' value="sources">Sources</TabsTrigger>
                </TabsList>
            <TabsContent value="industry">
                <SettingIndustry/>
            </TabsContent>
            <TabsContent value="sources">
                <SettingCompanySources/>
            </TabsContent>
          
        </Tabs>
        {/* <Text css={{fontSize:"$6"}}>Industries</Text> */}

      
     


    </div>
}


