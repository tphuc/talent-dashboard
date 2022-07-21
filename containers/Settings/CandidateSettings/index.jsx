import { styled } from "@stitches/react";
import Button from "components/Button";
import { DialogClose } from "components/Dialog";
import { Input } from "components/Input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/Tabs";
import { H4, Text } from "components/Text";
import React from "react";
import { useForm } from "react-hook-form";
import CandidateSources from "./Source";


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




export default function CandidateSettings() {


    

    return <div>
        <Tabs aria-labelledby="company-setting-tabs" defaultValue="source">
            <TabsList aria-label="company_setting">
                <TabsTrigger size='sm' variant='orange' value="source">Sources</TabsTrigger>
                </TabsList>
            <TabsContent value="source">
               <CandidateSources/>
            </TabsContent>
          
        </Tabs>


     


    </div>
}


