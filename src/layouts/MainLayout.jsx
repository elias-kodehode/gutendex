import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import HomeIcon from "@mui/icons-material/Home";
import { Button, Container, FormControl, IconButton, InputLabel, MenuItem, Select, Stack } from "@mui/material"
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import CategorySelection from "../components/CategorySelection";


export default function MainLayout() {
  return (
    <Container sx={{ pt: 1 }}>
      <Stack >
        <Header />
        <MainContent />
        <Footer />
      </Stack>
    </Container>
  );
}



function Header() {
  return (
    <header>
      <Stack direction="row" spacing={2}>
        {/* <IconButton >
          <HomeIcon />
        </IconButton> */}
        <SearchBar />
        <CategorySelection />
      </Stack>
    </header>
  );
}

function MainContent() {
  return (
    <main >
      <Outlet />
    </main>
  )
}

function Footer() {
  return (<footer></footer>)
}
