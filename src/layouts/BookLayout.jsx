import { Container, IconButton, Stack } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import WestIcon from '@mui/icons-material/West';

import { Outlet, useNavigate } from "react-router-dom";

export default function BookLayout() {

    return (
        <Container>
            {/* <Stack> */}
            <Header />
            <MainContent />
            {/* </Stack> */}
        </Container>
    );
}

function Header() {
    const navigate = useNavigate();

    return (
        <IconButton >
            <WestIcon onClick={() => navigate(-1)} />
        </IconButton>
    )
}

function MainContent() {
    return (<Outlet />)
}
