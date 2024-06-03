import React from 'react';
import {Flex, Image} from "@mantine/core";
import backIcon from "../assets/back-btn.svg";
import {useNavigate} from "react-router-dom";
import logo from "../assets/logo-with-text.svg";

const Header = () => {
    const navigate = useNavigate();

    return (
        <Flex justify='space-between' mb={36}>
            <Image style={{cursor: 'pointer'}} src={backIcon} w={45} h={45} onClick={() => navigate(-1)}/>
            <Image style={{cursor: 'pointer'}} src={logo} w={130} h={42} onClick={() => navigate('/')}/>
        </Flex>
    );
};

export default Header;
