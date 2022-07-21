import { styled } from "@stitches/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "components/Accordion";
import { Avatar, AvatarImage } from "components/Avatar";
import { Box } from "components/Box";

import { Row } from "components/Flex";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/Tabs";
import { H2, H4, H5 } from "components/Text";
import CandidateSettings from "containers/Settings/CandidateSettings";
import CandidateLevels from "containers/Settings/CandidateSettings/Levels";
import CandidateSources from "containers/Settings/CandidateSettings/Source";
import CompanySettings from "containers/Settings/CompanySettings";
import SettingIndustry from "containers/Settings/CompanySettings/Industry";
import SettingCompanySources from "containers/Settings/CompanySettings/Source";
import SettingDepartment from "containers/Settings/DepartmentSettings";
import JobSettings from "containers/Settings/JobSettings";
import JobCategorySettings from "containers/Settings/JobSettings/JobCategoy";
import JobTypeSetting from "containers/Settings/JobSettings/JobType";
import JobSalaryRange from "containers/Settings/JobSettings/SalaryRange";
import SettingSkills from "containers/Settings/SkillSettings";
import UserRoleSettings from "containers/Settings/UserRoleSettings";
import VendorSetting from "containers/Settings/VendorSettings";
import SettingCommissionKpi from "containers/Settings/VendorSettings/CommissionKPI";
import SettingCommissionTypes from "containers/Settings/VendorSettings/CommissionTypes";
import SettingVendorTypes from "containers/Settings/VendorSettings/VendorTypes";
import dayjs from "dayjs";
import DashboardLayout from "layouts/DashboardLayout";
import Link from "next/link";

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

const overideStyles = {
    TabsTrigger: {
        paddingLeft: 0,
        height: 25,
        '&:hover': {
            color: '$orange10'
        },
        boxShadow: "none",
        '&[data-state="active"]': {
            color: '$orange10',
            backgroundColor: 'transparent',
            boxShadow: "none",
            fontWeight: 500

        },
    },
    Accordion: {
        boxShadow: "none",

    },
    AccordionContent: {
        background: "transparent",

    },
    AccordionTrigger: {
        height:'30px',
        fontWeight: 500,
        '&:hover': {
            color: "$mauve11",
            background: "transparent"
        }
    }
}


const TabTitle = styled('p', {
    fontWeight: 600,
    color: "$violet10",
    marginBottom: 5
})


export default function Settings() {
    return <Box css={{
        margin: 0,
        padding: "$3",
        paddingTop: "50px"
    }}>
        <Tabs defaultValue="vendor_types">
            <Box css={{
                display: "grid",
                gridTemplateColumns: "260px 1fr",
                gridGap: 10
            }}>
                <TabsList css={{ flexDirection: "column", alignItems: "flex-start", background: "none", }}>
                    <Accordion defaultValue={'vendor'} css={overideStyles.Accordion} type='multiple' collapsible>
                        <AccordionItem value="vendor">
                            <AccordionTrigger css={overideStyles.AccordionTrigger}> <TabTitle>Vendor</TabTitle></AccordionTrigger>
                            <AccordionContent css={overideStyles.AccordionContent}>
                                <TabsTrigger css={overideStyles.TabsTrigger} value="vendor_types">Vendor Types</TabsTrigger>
                                <TabsTrigger css={overideStyles.TabsTrigger} value="commission_types">Commission types</TabsTrigger>
                                <TabsTrigger css={overideStyles.TabsTrigger} value="commission_kpis">Commission KPIs</TabsTrigger>
                            </AccordionContent>
                        </AccordionItem>


                        <AccordionItem value="company">
                            <AccordionTrigger css={overideStyles.AccordionTrigger}> <TabTitle>Company</TabTitle></AccordionTrigger>
                            <AccordionContent css={overideStyles.AccordionContent}>
                                <TabsTrigger css={overideStyles.TabsTrigger} value="company_industry">Industries</TabsTrigger>
                                <TabsTrigger css={overideStyles.TabsTrigger} value="company_sources">Sources</TabsTrigger>
                            </AccordionContent>
                        </AccordionItem>


                        <AccordionItem value="candidate">
                            <AccordionTrigger css={overideStyles.AccordionTrigger}> <TabTitle>Candidate</TabTitle></AccordionTrigger>
                            <AccordionContent css={overideStyles.AccordionContent}>
                                <TabsTrigger css={overideStyles.TabsTrigger} value="candidate_sources">Sources</TabsTrigger>
                                <TabsTrigger css={overideStyles.TabsTrigger} value="candidate_levels">Levels</TabsTrigger>
                            </AccordionContent>
                          
                                

                        </AccordionItem>


                        <AccordionItem value="job">
                            <AccordionTrigger css={overideStyles.AccordionTrigger}> <TabTitle>Job</TabTitle></AccordionTrigger>
                            <AccordionContent css={overideStyles.AccordionContent}>
                                <TabsTrigger css={overideStyles.TabsTrigger} value="job_type">Job Types</TabsTrigger>
                                <TabsTrigger css={overideStyles.TabsTrigger} value="job_category">Categories</TabsTrigger>
                                <TabsTrigger css={overideStyles.TabsTrigger} value="salary_range">Salary ranges</TabsTrigger>
                            </AccordionContent>
                        </AccordionItem>


                        <AccordionItem value="org">
                            <AccordionTrigger css={overideStyles.AccordionTrigger}> <TabTitle>Organization</TabTitle></AccordionTrigger>
                            <AccordionContent css={overideStyles.AccordionContent}>
                            <TabsTrigger css={overideStyles.TabsTrigger} value="department">Department</TabsTrigger>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="global">
                            <AccordionTrigger css={overideStyles.AccordionTrigger}> <TabTitle>Global</TabTitle></AccordionTrigger>
                            <AccordionContent css={overideStyles.AccordionContent}>
                                <TabsTrigger css={overideStyles.TabsTrigger} value="skills">Skills</TabsTrigger>
                            </AccordionContent>
                        </AccordionItem>








                    </Accordion>
                </TabsList>
                <Panel css={{ position: "relative" }}>


                    <TabsContent value="vendor_types">
                        <SettingVendorTypes />
                    </TabsContent>
                    <TabsContent value="commission_types">
                        <SettingCommissionTypes />
                    </TabsContent>
                    <TabsContent value="commission_kpis">
                        <SettingCommissionKpi />
                    </TabsContent>
                    <TabsContent value="company_industry">
                        <SettingIndustry />
                    </TabsContent>
                    <TabsContent value="company_sources">
                        <SettingCompanySources />
                    </TabsContent>

                    <TabsContent value="candidate_sources">
                        <CandidateSources />
                    </TabsContent>
                    <TabsContent value="candidate_levels">
                        <CandidateLevels />
                    </TabsContent>

                    <TabsContent value="job_type">
                        <JobTypeSetting />
                    </TabsContent>
                    <TabsContent value="job_category">
                        <JobCategorySettings />
                    </TabsContent>
                    <TabsContent value="salary_range">
                        <JobSalaryRange />
                    </TabsContent>
                    <TabsContent value="skills">
                        <SettingSkills />
                    </TabsContent>

                    {/* <TabsContent value="org">
                        <SettingDepartment />

                    </TabsContent>
                    <TabsContent value="global">

                        <Tabs aria-labelledby="global-setting-tabs" defaultValue="skills">
                            <TabsList aria-label="global_settings">
                                <TabsTrigger size='sm' variant='orange' value="skills">Skills</TabsTrigger>
                                <TabsTrigger size='sm' variant='orange' value="roles">User roles</TabsTrigger>
                            </TabsList>
                            <TabsContent value="skills">
                                <SettingSkills />
                            </TabsContent>
                            <TabsContent value="roles">
                                <UserRoleSettings />
                            </TabsContent>
                        </Tabs>

                    </TabsContent> */}
                </Panel>
            </Box>

        </Tabs>



    </Box>
}


Settings.getLayout = (page) => {
    return <DashboardLayout>
        {page}
    </DashboardLayout>
}