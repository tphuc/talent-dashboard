
import SideBar from 'components/SideBar';
import { styled } from 'stitches.config';
// import * as Popover from '@radix-ui/react-popover';
import { Avatar, AvatarFallback, AvatarImage } from 'components/Avatar';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from 'components/Popover';
import { PopoverAnchor } from '@radix-ui/react-popover';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from 'components/DropdownMenu';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';


const DashboardLayoutContainer = styled('div', {
    // top:0,
    // position:"fixed",
    display: "flex",
    flexDirection: "row",
    width: "100vw",
    // height:"100vh"
})


const NavLayoutContainer = styled('div', {
    boxSizing: "border-box",
    position: "fixed",
    background: "white",
    border: "1px solid $mauve3",
    display: "flex",
    alignItems: "center",
    right: 0,
    top: 0,
    borderRadius: "$4",
    height: "$7",
    width: "calc(100vw - 80px)",
    boxShadow: `$colors$blackA3 0px 20px 40px 0px`,
    padding: "0 $4",
    margin: "$2",
    zIndex:1


})


const Navigation = styled('div', {
    position: "relative", width: 60
})

const Main = styled('div', {
    flex: 1,  position: 'relative', paddingTop: "$7",
    maxWidth:"calc(100vw - 60px)"
})



export default function DashboardLayout({ children }) {

    return (
        <DashboardLayoutContainer>
            <Navigation>
                <SideBar />
            </Navigation>
            <Main>
                <NavLayoutContainer>
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <Avatar size='sm' css={{ marginLeft: "auto" }}>
                                <AvatarImage src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80' />
                                <AvatarFallback />
                            </Avatar>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent sideOffset={5}>
                            <DropdownMenuItem onClick={() => {
                                signOut({ callbackUrl: "/login" })
                            }}>
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </NavLayoutContainer>
                {children}
            </Main>
        </DashboardLayoutContainer>
    );
}