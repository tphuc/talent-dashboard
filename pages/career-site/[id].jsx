import { Box } from "components/Box"
import CareerPage from "containers/CareerSite/Page"
import { CareerPageProvider } from "containers/CareerSite/Page/usePageSettings"
import PageSetting from "containers/CareerSite/PageSetting"
import DashboardLayout from "layouts/DashboardLayout"


export default function CareerSite(){
    return <Box css={{
        margin: 0,
        padding: "$3",
        paddingTop: "50px"
        // background:"linear-gradient(120deg, rgb(198, 212, 249,), rgb(249, 216, 231));"
    }}>
        <CareerPageProvider>
        <Box css={{
            display:"grid",
            gridTemplateColumns:"1fr 300px",
            gridGap:"10px",
            height:800,
            width:"100%"
        }}>

            <Box css={{background:'white', boxShadow:"0 2px 10px $colors$grayA4"}}>
                <CareerPage/>
            </Box>
            <Box css={{background:'$gray2'}}>
                <PageSetting/>
            </Box>
        </Box>
        </CareerPageProvider>

    </Box>
}


CareerSite.getLayout = (page) => {
    return <DashboardLayout>
        {page}
    </DashboardLayout>
}