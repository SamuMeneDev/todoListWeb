import { AppBar, Box, Button, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { MdMenu, MdOutlineQuestionMark } from "react-icons/md";
import { Outlet } from "react-router";

export default function RootLayout() {
    return (
        <>
        <Box component={"header"}>
            <AppBar>
            <Toolbar>
                <Grid >
                    <Grid >

                    </Grid>


                </Grid>
            </Toolbar>
        </AppBar>
        </Box>
            <Outlet />
        </>
    )
}