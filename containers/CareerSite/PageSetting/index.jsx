import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Box } from "components/Box"
import { Popover } from "components/Popover"
import { SketchPicker } from "react-color"
import { useState } from "react"
import { ChromePicker } from "react-color"
import { styled } from "stitches.config"
import { ToggleGroup, ToggleGroupItem } from "components/ToggleGroup"
import { TextAlignLeftIcon, TextAlignRightIcon } from "@radix-ui/react-icons"
import { RiFacebookBoxFill, RiFacebookBoxLine, RiFacebookLine, RiGlobalFill, RiGlobalLine, RiGlobeFill, RiInstagramFill, RiLayoutBottomFill, RiLayoutColumnFill, RiLayoutLeft2Line, RiLayoutLeftFill, RiLayoutRight2Line, RiLayoutRightFill, RiLinkedinBoxFill, RiTwitterFill } from "react-icons/ri"
import { H4 } from "components/Text"
import Select from "components/Select"
import SingleFileUploader from "components/FileUploader"
import { Input } from "components/Input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "components/Accordion"
import { useCareerPageContext } from "../Page/usePageSettings"
import { Switch, SwitchThumb } from "components/Switch"
import { Row } from "components/Flex"
import { mauve } from "@radix-ui/colors"


const StyledColorPickerContainer = styled('div', {
    height: "$6",
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    padding: '$1 $2',
    background: "$gray2",
    borderRadius: '$3',
    color: "$mauve11"
})


const Card = styled('div', {
    background: 'white',
    borderRadius: "$4",
    padding: "$3",
    boxShadow: "0 2px 10px $colors$blackA5",
    gap: 5
})

const ColorPicker = ({initColor = '#222222',  onChange =()=>null}) => {
    const [color, setColor] = useState(initColor)
    return <Popover>
        <PopoverTrigger asChild>
            <StyledColorPickerContainer>
                {!color ? 'select color' : color}
                <Box css={{ width: '$4', borderRadius: "$2", height: '$4', background: color || '#aaa' }}>

                </Box>
            </StyledColorPickerContainer>
        </PopoverTrigger>
        <PopoverContent>
            <ChromePicker color={color} onChangeComplete={(val) => {
                setColor(val.hex)
                onChange(val.hex)
            }}/>
            <br />
        </PopoverContent>
    </Popover>
}



const StyledLabel = styled('label', {
    fontSize: '$3',
    fontWeight: 500,
    display: "block",
    color: '$mauve12',
    userSelect: 'none',
    marginBottom: '$1',
    marginTop: "$2"
});



export default function PageSetting() {
    const { 
        onChangeFont,
        onChangeHeaderlayout,
        onChangePrimaryColor, 
        onChangeButtonText, 
        onChangeTextColor, 
        onChangeButtonTextColor, 
        onChangeFooterLayout,
        setSocialURL,
        setToggleSocialURL,
        onChangeLogo,
        onChangeFooterBanner,
        state
    } = useCareerPageContext()
    return <Box css={{ width: "100%", height: "100%", background: "white", padding: 5 }}>
        <Accordion type='multiple' collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <H4 css={{ my: 0 }}>Global settings</H4>
                </AccordionTrigger>
                <AccordionContent>
                    <Card>
                        <StyledLabel>Logo</StyledLabel>
                        <SingleFileUploader initFile={state.logo} onChange={onChangeLogo} imageStyle={{ width: "100%", height: "auto" }} css={{ width: '100%' }} preview />
                        <StyledLabel>Fonts</StyledLabel>
                        <Select onSelectionChange={(value) => onChangeFont(value)} css={{ width: "100%" }}>
                            <Select.Item textValue='Quicksand'>Quicksand</Select.Item>
                            <Select.Item textValue='Nunito-sans'>Nunito-sans</Select.Item>
                        </Select>
                        <br />
                        <StyledLabel >Primary Color</StyledLabel>
                        <ColorPicker initColor={state.primaryColor} onChange={onChangePrimaryColor} />

                        <StyledLabel >Text Color</StyledLabel>
                        <ColorPicker initColor={state.textColor} onChange={onChangeTextColor} />
                    </Card>
                </AccordionContent>
            </AccordionItem>



            <AccordionItem value="item-2">
                <AccordionTrigger>
                    <H4 css={{ my: 5 }}>Header layout</H4>
                </AccordionTrigger>
                <AccordionContent>
                    <Card>
                        <ToggleGroup onValueChange={(val) => onChangeHeaderlayout(val)} css={{ width: "100%" }} type="single" defaultValue="left" aria-label="header-layout">
                            <ToggleGroupItem css={{ display: "flex", flex: 1, flexDirection: "column", padding: 5, gap: 5 }} value="left" aria-label="Left aligned">
                                <RiLayoutLeftFill size={24} />
                                <span style={{ fontSize: "small", textAlign: "center", }}>image left</span>
                            </ToggleGroupItem>
                            <ToggleGroupItem css={{ display: "flex", flex: 1, flexDirection: "column", padding: 5, gap: 5 }} value="center" aria-label="Middle aligned">
                                <RiLayoutBottomFill size={24} />
                                <span style={{ fontSize: "small", textAlign: "center", }}>image center</span>
                            </ToggleGroupItem>
                            <ToggleGroupItem css={{ display: "flex", flex: 1, flexDirection: "column", padding: 5, gap: 5 }} value="right" aria-label="Right aligned">
                                <RiLayoutRightFill size={24} />
                                <span style={{ fontSize: "small", textAlign: "center", }}>image right</span>
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </Card>
                </AccordionContent>
            </AccordionItem>


            <AccordionItem value="item-3">
                <AccordionTrigger>
                    <H4 css={{ my: 5 }}>Job feed settings</H4>
                </AccordionTrigger>
                <AccordionContent>
                    <Card>
                        <Input onChange={(e) => onChangeButtonText(e.target.value)} label='Button text' />
                        <br />
                        <StyledLabel>Button Text Color</StyledLabel>
                        <ColorPicker initColor={state.buttonTextColor} onChange={onChangeButtonTextColor} />
                    </Card>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
                <AccordionTrigger>
                    <H4 css={{ my: 5 }}>Footer settings</H4>
                </AccordionTrigger>
                <AccordionContent>
                    <Card>
                        <StyledLabel>Footer banner</StyledLabel>
                        <SingleFileUploader initFile={state.footerBanner} onChange={onChangeFooterBanner} imageStyle={{ width: "100%", height: "auto" }} css={{ width: '100%' }} preview />
                        <br/>
                        <StyledLabel>Footer layouts</StyledLabel>
                        <ToggleGroup onValueChange={(val) => onChangeFooterLayout(val)} css={{ width: "100%" }} type="single" defaultValue="left" aria-label="header-layout">
                            <ToggleGroupItem css={{ display: "flex", flex: 1, flexDirection: "column", padding: 5, gap: 5 }} value="left" aria-label="Left aligned">
                                <RiLayoutLeftFill size={24} />
                                <span style={{ fontSize: "small", textAlign: "center", }}>image left</span>
                            </ToggleGroupItem>
                            <ToggleGroupItem css={{ display: "flex", flex: 1, flexDirection: "column", padding: 5, gap: 5 }} value="center" aria-label="Middle aligned">
                                <RiLayoutBottomFill size={24} />
                                <span style={{ fontSize: "small", textAlign: "center", }}>image center</span>
                            </ToggleGroupItem>
                            <ToggleGroupItem css={{ display: "flex", flex: 1, flexDirection: "column", padding: 5, gap: 5 }} value="right" aria-label="Right aligned">
                                <RiLayoutRightFill size={24} />
                                <span style={{ fontSize: "small", textAlign: "center", }}>image right</span>
                            </ToggleGroupItem>
                        </ToggleGroup>

                        <StyledLabel>Socials</StyledLabel>
                        <Row style={{justifyContent:"space-between", alignItems:"center", gap:10}}>
                            <Switch onCheckedChange={(val) => setToggleSocialURL('facebookURL', val)}>
                                <SwitchThumb/>
                            </Switch>
                            <Input  onChange={(e) => setSocialURL('facebookURL', e.target.value)} startEnhancer={<RiFacebookBoxFill color={mauve.mauve10}/>} size='sm'/>
                        </Row>
                        <br/>
                        <Row style={{justifyContent:"space-between", alignItems:"center", gap:10}}>
                            <Switch  onCheckedChange={(val) => setToggleSocialURL('instagramURL', val)}>
                                <SwitchThumb/>
                            </Switch>
                            <Input onChange={(e) => setSocialURL('instagramURL', e.target.value)} startEnhancer={<RiInstagramFill color={mauve.mauve10}/>} size='sm'/>
                        </Row>
                        <br/>
                        <Row style={{justifyContent:"space-between", alignItems:"center", gap:10}}>
                            <Switch  onCheckedChange={(val) => setToggleSocialURL('twitterURL', val)}>
                                <SwitchThumb/>
                            </Switch>
                            <Input onChange={(e) => setSocialURL('twitterURL', e.target.value)} startEnhancer={<RiTwitterFill color={mauve.mauve10}/>} size='sm'/>
                        </Row>
                        <br/>
                        <Row style={{justifyContent:"space-between", alignItems:"center", gap:10}}>
                            <Switch  onCheckedChange={(val) => setToggleSocialURL('linkedinURL', val)}>
                                <SwitchThumb/>
                            </Switch>
                            <Input onChange={(e) => setSocialURL('linkedinURL', e.target.value)} startEnhancer={<RiLinkedinBoxFill color={mauve.mauve10}/>} size='sm'/>
                        </Row>
                        <br/>
                        <Row style={{justifyContent:"space-between", alignItems:"center", gap:10}}>
                            <Switch  onCheckedChange={(val) => setToggleSocialURL('websiteURL', val)}>
                                <SwitchThumb/>
                            </Switch>
                            <Input onChange={(e) => setSocialURL('websiteURL', e.target.value)} startEnhancer={<RiGlobalLine color={mauve.mauve10}/>} size='sm'/>
                        </Row>
                    </Card>
                </AccordionContent>
            </AccordionItem>

        </Accordion>
    </Box>
}