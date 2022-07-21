import { SelectItemCheck } from "ariakit"
import { Avatar, AvatarFallback, AvatarImage } from "components/Avatar"
import { Box } from "components/Box"
import Select from "components/Select"
import { SelectMultiple } from "components/SelectMultiple"
import { H3, H4, Text } from "components/Text"
import { useCallback } from "react"
import { useGetJobTypes } from "services/swr/useGetJobTypes"
import { useGetVNStates } from "services/swr/useGetVNStates"




import { Checkbox, useCheckboxState } from "ariakit/checkbox";
import { Group, GroupLabel } from "ariakit/group";
import { styled } from "stitches.config"
import GroupCheckBox from "components/GroupCheckbox"
import { CheckIcon } from "@radix-ui/react-icons"
import { useGetJobCategories } from "services/swr/useGetJobCategories"
import truncate from "truncate"
import PaginatedList from "components/PaginatedList"
import Button from "components/Button"
import { useCareerPageContext } from "./usePageSettings"
import Link from "next/link"
import { RiFacebookBoxFill, RiGlobalLine, RiInstagramFill, RiLinkedinBoxFill, RiTwitterFill } from "react-icons/ri"
import { Row } from "components/Flex"
const StyledLabel = styled(GroupLabel, {
    fontSize: '$3',
    fontWeight: 500,
    color: '$mauve12',
    userSelect: 'none',
    marginBottom: '$1'
});





export default function CareerPage({ header }) {

    const { state } = useCareerPageContext()

    const { data: VNlocations } = useGetVNStates();
    const { data: JobTypes } = useGetJobTypes()
    const { data: jobCategories } = useGetJobCategories()

    const renderHeader = useCallback(() => {
        switch (state.headerLayout) {
            case 'left':

                return <Box css={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
                    height: 300,
                    background: "$gray2"

                }}>
                    <Box css={{
                        padding: "1em",

                    }}>
                        <Box css={{ display: "flex", alignItems: "center" }}>
                            <Avatar>
                                <AvatarImage src={state?.logo ? URL.createObjectURL(state?.logo) : null} />
                                <AvatarFallback>logo</AvatarFallback>
                            </Avatar>
                            <H3 css={{ marginLeft: 10 }}>Company name</H3>

                        </Box>
                        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                    </Box>
                    <Box css={{
                        background: "$gray2",
                        backgroundColor: "$gray5",
                        backgroundImage: 'url(https://picsum.photos/1000/1000)',
                        objectFit: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover",
                    }}>

                    </Box>



                </Box>


            case 'center':
                return <Box>
                    <Box css={{
                        width: "100%",
                        background: "$gray2",
                        backgroundImage: 'url(https://picsum.photos/1000/1000)', objectFit: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", height: 300
                    }}
                    />
                    <Box css={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: '1em' }}>
                        <Avatar css={{ marginTop: "-40px" }}>
                            <AvatarImage src={state?.logo ? URL.createObjectURL(state?.logo) : null} />
                            <AvatarFallback>logo</AvatarFallback>
                        </Avatar>
                        <H3 css={{ mt: 0, marginLeft: 10 }}>Company name</H3>
                        <Text css={{ textAlign: "center" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                    </Box>


                </Box>

            default:
            case 'right':

                return <Box css={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
                    height: 300,
                    background: "$gray2",
                }}>

                    <Box css={{
                        backgroundColor: "$gray5",
                        backgroundImage: 'url(https://picsum.photos/1000/1000)',
                        objectFit: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover",
                    }}>

                    </Box>
                    <Box css={{
                        color: "inherit",
                        padding: "1em",
                    }}>
                        <Box css={{ display: "flex", alignItems: "center", color: "inherit" }}>
                            <Avatar>
                                <AvatarImage src={state?.logo ? URL.createObjectURL(state?.logo) : null} />
                                <AvatarFallback>logo</AvatarFallback>
                            </Avatar>
                            <H3 css={{ marginLeft: 10, color: state.primaryColor }}>Company name</H3>

                        </Box>
                        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                    </Box>
                </Box>
        }
    }, [state])


    const renderFooter = useCallback(() => {
        switch (state.footerLayout) {
            case 'left':
            default:

                return <Box css={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
                    height: 300,
                    background: "$gray2"

                }}>
                    <Box css={{
                        padding: "1em",

                    }}>
                        <Box css={{ display: "flex", alignItems: "center" }}>
                            <Avatar>
                                <AvatarImage src={state?.logo ? URL.createObjectURL(state?.logo) : null} />
                                <AvatarFallback>logo</AvatarFallback>
                            </Avatar>
                            <H3 css={{ marginLeft: 10 }}>Company name</H3>
                        </Box>
                        <Row css={{ gap: 10 }}>
                            {state.toggle?.facebookURL && <Link href={state.socials.facebookURL}>
                                <a target={'_blank'} style={{ color: state.textColor }}>
                                    <RiFacebookBoxFill size={24} />
                                </a>
                            </Link>}
                            {state.toggle?.instagramURL && <Link href={state.socials.instagramURL}>
                                <a target={'_blank'} style={{ color: state.textColor }}>
                                    <RiInstagramFill size={24} />
                                </a>
                            </Link>}
                            {state.toggle?.twitterURL && <Link href={state.socials.twitterURL}>
                                <a target={'_blank'} style={{ color: state.textColor }}>
                                    <RiTwitterFill size={24} />
                                </a>
                            </Link>}
                            {state.toggle?.linkedinURL && <Link href={state.socials.linkedinURL}>
                                <a target={'_blank'} style={{ color: state.textColor }}>
                                    <RiLinkedinBoxFill size={24} />
                                </a>
                            </Link>}
                            {state.toggle?.websiteURL && <Link href={state.socials.websiteURL}>
                                <a target={'_blank'} style={{ color: state.textColor }}>
                                    <RiGlobalLine size={24} />
                                </a>
                            </Link>}
                        </Row>

                    </Box>
                    <Box css={{
                        background: "$gray2",
                        backgroundColor: "$gray5",
                        backgroundImage: state?.footerBanner ? `url(${URL.createObjectURL(state?.footerBanner)})` : null,
                        objectFit: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover",
                    }}>

                    </Box>



                </Box>


            case 'center':
                return <Box>
                    <Box css={{
                        width: "100%",
                        background: "$gray2",
                        backgroundImage: state?.footerBanner ? `url(${URL.createObjectURL(state?.footerBanner)})` : null,
                        objectFit: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", height: 300
                    }}
                    />
                    <Box css={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: '1em' }}>
                        <Avatar css={{ marginTop: "-40px" }}>
                            <AvatarImage src={state?.logo ? URL.createObjectURL(state?.logo) : null} />
                            <AvatarFallback>logo</AvatarFallback>
                        </Avatar>
                        <H3 css={{ my: 0, marginLeft: 10 }}>Company name</H3>
                    </Box>
                    <Row css={{ gap: 10, justifyContent:"center" }}>
                            {state.toggle?.facebookURL && <Link href={state.socials.facebookURL}>
                                <a target={'_blank'} style={{ color: state.textColor }}>
                                    <RiFacebookBoxFill size={24} />
                                </a>
                            </Link>}
                            {state.toggle?.instagramURL && <Link href={state.socials.instagramURL}>
                                <a target={'_blank'} style={{ color: state.textColor }}>
                                    <RiInstagramFill size={24} />
                                </a>
                            </Link>}
                            {state.toggle?.twitterURL && <Link href={state.socials.twitterURL}>
                                <a target={'_blank'} style={{ color: state.textColor }}>
                                    <RiTwitterFill size={24} />
                                </a>
                            </Link>}
                            {state.toggle?.linkedinURL && <Link href={state.socials.linkedinURL}>
                                <a target={'_blank'} style={{ color: state.textColor }}>
                                    <RiLinkedinBoxFill size={24} />
                                </a>
                            </Link>}
                            {state.toggle?.websiteURL && <Link href={state.socials.websiteURL}>
                                <a target={'_blank'} style={{ color: state.textColor }}>
                                    <RiGlobalLine size={24} />
                                </a>
                            </Link>}
                        </Row>
                        <br/>

                </Box>


            case 'right':

                return <Box css={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
                    height: 300,
                    background: "$gray2",
                }}>

                    <Box css={{
                        backgroundColor: "$gray5",
                        backgroundImage: state?.footerBanner ? `url(${URL.createObjectURL(state?.footerBanner)})` : null,
                        objectFit: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover",
                    }}>

                    </Box>
                    <Box css={{
                        color: "inherit",
                        padding: "1em",
                    }}>
                        <Box css={{ display: "flex", alignItems: "center", color: "inherit" }}>
                            <Avatar>
                                <AvatarImage src={state?.logo ? URL.createObjectURL(state?.logo) : null} />
                                <AvatarFallback>logo</AvatarFallback>
                            </Avatar>
                            <H3 css={{ marginLeft: 10, color: state.primaryColor }}>Company name</H3>

                        </Box>
                        <Row css={{ gap: 10 }}>
                            {state.toggle?.facebookURL && <Link href={state.socials.facebookURL}>
                                <a target={'_blank'} style={{ color: state.textColor }}>
                                    <RiFacebookBoxFill size={24} />
                                </a>
                            </Link>}
                            {state.toggle?.instagramURL && <Link href={state.socials.instagramURL}>
                                <a target={'_blank'} style={{ color: state.textColor }}>
                                    <RiInstagramFill size={24} />
                                </a>
                            </Link>}
                            {state.toggle?.twitterURL && <Link href={state.socials.twitterURL}>
                                <a target={'_blank'} style={{ color: state.textColor }}>
                                    <RiTwitterFill size={24} />
                                </a>
                            </Link>}
                            {state.toggle?.linkedinURL && <Link href={state.socials.linkedinURL}>
                                <a target={'_blank'} style={{ color: state.textColor }}>
                                    <RiLinkedinBoxFill size={24} />
                                </a>
                            </Link>}
                            {state.toggle?.websiteURL && <Link href={state.socials.websiteURL}>
                                <a target={'_blank'} style={{ color: state.textColor }}>
                                    <RiGlobalLine size={24} />
                                </a>
                            </Link>}
                        </Row>
                    </Box>
                </Box>
        }
    }, [state])


    const renderBody = useCallback(() => {
        return <Box css={{
            marginTop: "1em",
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: '1em',
            '@mobile': {
                gridTemplateColumns: '1fr'
            },
            '@bp1': {
                gridTemplateColumns: "300px 1fr",
            },

        }}>
            <Box css={{
                display: "flex",
                flexDirection: "column",
                padding: 10,
            }}>
                <Select label='LOCATION'>
                    {VNlocations?.map((item, id) => <Select.Item key={item.id} textValue={item.id}>{item.name}</Select.Item>)}
                </Select>
                <br />
                <Select label='JOB TYPE'>
                    {JobTypes?.map((item, id) => <Select.Item key={item.id} textValue={item.id}>{item.name}</Select.Item>)}
                </Select>
                <br />
                <SelectMultiple label='JOB CATEGORY'
                    renderValue={(value) => {
                        if (value?.length == 0)
                            return "select job category"
                        else
                            return <span>{truncate(`${jobCategories?.filter(item => value.includes(item.id))?.map(item => item.name)}`, 30)} {value.length}</span>
                    }}
                >
                    {jobCategories?.map((item, id) => <SelectMultiple.Item key={item.id} value={item.id}>
                        <SelectItemCheck>
                            <CheckIcon />
                        </SelectItemCheck>
                        {item.name}
                    </SelectMultiple.Item>)}
                </SelectMultiple>


            </Box>
            <Box css={{ padding: 10 }}>
                <PaginatedList items={[1, 2, 3]} renderItem={(item, id) => {
                    return <Box key={id} css={{ padding: "10px", borderRadius: '$4', background: "$gray2", }}>
                        <Box css={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                            justifyContent: "space-between",
                        }}>
                            <h3 style={{ margin: 0, color: state.primaryColor, fontWeight: 400 }}>Senior UI/UX Designer</h3>
                            <span style={{ margin: 0, color: "inherit", textAlign: "right", fontWeight: 400 }}>HCM city, vietnam</span>
                            <span style={{ margin: 0, color: "inherit", fontWeight: 400 }}>Design, Full-time</span>
                            <span style={{ margin: 0, color: "inherit", textAlign: "right", fontSize: "small", fontWeight: 400 }}>4 hours ago</span>

                        </Box>
                        <Box css={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Box css={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gridTemplateRows: "1fr 1fr",
                                gridAutoFlow: "column",
                                gridGap: "10px"
                            }}>
                                <span style={{ fontWeight: 500 }}>Experience</span>
                                <span>1 years</span>

                                <span style={{ fontWeight: 500 }}>Salary</span>
                                <span>1200$</span>
                            </Box>
                            <Button css={{
                                backgroundColor: state.primaryColor,

                                "&:hover": {
                                    backgroundColor: state.primaryColor
                                },
                                color: state.buttonTextColor,
                            }}>{state.buttonText}</Button>
                        </Box>



                    </Box>
                }} />
            </Box>
        </Box>
    }, [VNlocations, JobTypes, state])

    return <div >
        {renderHeader()}
        {renderBody()}
        {renderFooter()}

    </div>
}