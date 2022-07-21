import { createContext } from 'react';
import { useContext, useState, } from 'react';

const CareerPageContext = createContext({
    state: {},
    onChangePrimaryColor: (color) => {},
    onChangeTextColor: () => {},
    onChangeFont: () => {},
    onChangeButtonText: () => {},
    onChangeButtonTextColor: () => null,
    onChangeHeaderlayout: () => null,
    onChangeFooterLayout: () => null,
    setSocialURL: () => null,
    setToggleSocialURL: () => null
})


export const useCareerPageContext = () => {
    const context = useContext(CareerPageContext);
    return context;
}


export const CareerPageProvider = (props) => {

    const [state, setState] = useState({
        primaryColor:"#222222",
        textColor:"#222222",
        buttonText:"Apply",
        buttonTextColor:"#ffffff",
        headerLayout:"left",
        footerLayout:"left",
        logo: null,
        footerBanner:null,

        // socials
        socials:{
            facebookURL: '',
            instagramURL: '',
            twitterURL:'',
            linkedinURL:'',
            websiteURL:'',
        },
        // toggle social
        toggle: {
            facebookURL: false,
            instagramURL: false,
            twitterURL: false,
            linkedinURL:false,
            websiteURL: false
        }
        
    });

    const onChangeLogo = (file) => {
        setState({
            ...state, 
            logo:file
        })  
    }

    const onChangeFooterBanner = (file) => {
        setState({
            ...state, 
            footerBanner:file
        })  
    }

    const onChangePrimaryColor = (color) => {
        setState({
            ...state, 
            primaryColor:color
        })  
    }

    const onChangeTextColor = (color) => {
        setState({
            ...state, 
            textColor:color
        })  
    }


    const onChangeFont = (val) => {
        setState({
            ...state, 
            font:val
        })  
    }

    const onChangeHeaderlayout = (value) => {
        setState({
            ...state, 
            headerLayout:value
        })  
    }

    const onChangeButtonText = (value) => {
        setState({
            ...state, 
            buttonText:value
        })  
    }

    const onChangeButtonTextColor = (value) => {
        setState({
            ...state, 
            buttonTextColor:value
        })  
    }

    const onChangeFooterLayout = (val) => {
        setState({
            ...state,
            footerLayout: val
        })
    }

    const setSocialURL = (key, val) => {
        setState(prev => ({
            ...prev,
            socials: {
                ...prev.socials,
                [key]: val
            }
            
        }))
    }

    const setToggleSocialURL = (key, val) => {
        setState(prev => ({
            ...prev,
            toggle: {
                ...prev.toggle,
                [key]: val
            }
            
        }))
    }





    return <CareerPageContext.Provider value={{ 
        state, 
        onChangePrimaryColor, 
        onChangeTextColor, 
        onChangeFont, 
        onChangeButtonText,
        onChangeButtonTextColor,
        onChangeHeaderlayout,
        onChangeLogo,
        onChangeFooterBanner,
        onChangeFooterLayout,
        setToggleSocialURL,
        setSocialURL,


    }}>
        {props.children}
    </CareerPageContext.Provider>
}  

