import { styled } from "@stitches/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/Tabs";

import React from "react";
import JobCategorySettings from "./JobCategoy";
import JobTypeSetting from "./JobType";
import JobSalaryRange from "./SalaryRange";


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




export default function JobSettings() {

    return <div>
        <Tabs aria-labelledby="job-setting-tabs" defaultValue="job-type">
            <TabsList aria-label="job_setting">
                    <TabsTrigger size='sm' variant='orange' value="job-type">Job types</TabsTrigger>
                    <TabsTrigger size='sm' variant='orange' value="job-category">Job categories</TabsTrigger>
                    <TabsTrigger size='sm' variant='orange' value="salary-range">Salary range</TabsTrigger>
                </TabsList>
            <TabsContent value="job-type">
                <JobTypeSetting/>
            </TabsContent>
            <TabsContent value="job-category">
                <JobCategorySettings/>
            </TabsContent>
            <TabsContent value="salary-range">
                <JobSalaryRange/>
            </TabsContent>
          
        </Tabs>
        {/* <Text css={{fontSize:"$6"}}>Industries</Text> */}
     


    </div>
}


