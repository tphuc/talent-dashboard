import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react'
import { styled } from 'stitches.config';
import { RiArrowLeftLine, RiBuilding2Line, RiBuilding4Line, RiCalendar2Line, RiClipboardLine, RiCloseLine, RiGroupLine, RiHome2Line, RiIndentIncrease, RiPieChartLine, RiSettings3Line, RiShieldLine, RiSuitcase2Line, RiTerminalBoxLine, RiTerminalWindowFill, RiUser2Line } from 'react-icons/ri'
import Link from 'next/link';
import { BackpackIcon, ClipboardIcon } from '@radix-ui/react-icons';
// item {
//     path,
//     id,
//     label
// }


const SideBarContainer = styled('div', {
    display: "inline-flex",
    top: 0,
    left: 0,
    bottom: 0,
    position: "fixed",
    height: "100vh",
    backgroundColor: '#916bfb',
    px: '$2',
    py: '$2',
    minWidth:'60px',
    boxSizing: "border-box",
    borderTopRightRadius: '$3',
    borderBottomRightRadius: '$3',
    zIndex:1000
})


const SideBarAnimated = styled(motion.div, {
    display: "inline-flex",
    flexDirection: "column",
    width: "auto",

})

const IconMenuButton = styled('div', {
    display: "inline-flex",
    alignItems: "center",
    // justifyContent:'center',
    padding: "$2 $2",
    boxSizing: "border-box",
    color: 'white',
    borderRadius: '$2',
    transition: "0.2s ease all",
    my: "2px",
    '&:hover': {
        backgroundColor: "rgba(255,255, 255, 0.3)"
    },
    '& svg': {
        display: 'inline-block',
        verticalAlign: 'middle',
    },
})

const IconMenuLabel = styled(motion.span, {
    userSelect: 'none',
    cursor: "pointer",

})




const routes = [
    {
        path: "/",
        label: "Dashboard",
        icon: <RiHome2Line size={20} />,
    },
    {
        path: "/jobs",
        label: "Jobs",
        icon: <BackpackIcon width={20} height={20} />,
    },
    {
        path: "/candidates",
        label: "Candidates",
        icon: <RiUser2Line size={20} />,
    },
    {
        path: "/companies",
        label: "Companies",
        icon: <RiBuilding4Line size={20} />,
    },
    {
        path: "/vendors",
        label: "Vendors",
        icon: <RiBuilding2Line size={20} />,
    },
    {
        path: "/career-site",
        label: "Career site",
        icon: <RiTerminalWindowFill size={20} />,
    },
    {
        path: "/calendar",
        label: "Calendar",
        icon: <RiCalendar2Line size={20} />,
    },
    {
        path: "/organization",
        label: "Organization",
        icon: <RiGroupLine size={20} />,
    },
    {
        path: "/subcriptions",
        label: "Subcriptions",
        icon: <RiShieldLine size={20} />,
    },
    {
        path: "/report",
        label: "Reports",
        icon: <RiPieChartLine size={20} />,
    },
    
    {
        path: "/settings",
        label: "Settings",
        icon: <RiSettings3Line size={20} />,
    },

    
];

function SideBar({
    items = routes,
    onChange
}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const router = useRouter();



    return <SideBarContainer>
        <AnimatePresence>
            <SideBarAnimated animate={{
                width: isOpen ? '200px' : 'auto',
                transition: {
                    duration: 0.5,
                }
            }}>
                {!isOpen ?
                    <IconMenuButton onClick={toggle}>
                        <RiIndentIncrease size={20} />
                    </IconMenuButton>
                    :
                    <IconMenuButton onClick={toggle}>
                        <RiArrowLeftLine size={20} />
                    </IconMenuButton>
                }
                <br />

                {items?.map((item, id) => <Link key={id} href={item.path}><IconMenuButton
                    css={{
                        backgroundColor: router.asPath === item.path || ( router.asPath.startsWith(item.path) && item.path!='/')  ? 'rgba(255,255,255,0.2)' : "transparent"
                    }}
                >
                    {item.icon}

                    {isOpen && <IconMenuLabel
                        css={{
                            marginLeft: "$1"
                        }}
                    >
                        {item.label}
                    </IconMenuLabel>}
                </IconMenuButton></Link>)}
            </SideBarAnimated>
        </AnimatePresence>
    </SideBarContainer>
}


export default SideBar