import {AppShell, Container, Image} from "@mantine/core";
import {Link, Outlet} from "react-router-dom";
import profileIcon from '../assets/profile-icon.svg'
import {ReactNode} from "react";

const Layout = ({children} : {children: ReactNode}) => {
    return (
        <AppShell
            navbar={{width: 95, breakpoint: 'md', collapsed: {mobile: true}}}
            withBorder={false}
        >
            <AppShell.Navbar p={25} className='navbar'>
                <Link to='/login'>
                    <Image src={profileIcon} w={45} h={45}/>
                </Link>
            </AppShell.Navbar>
            <AppShell.Main>
                <Container fluid py={25} m={0}>
                    {children}
                </Container>
            </AppShell.Main>
        </AppShell>
    );
};

export default Layout;
