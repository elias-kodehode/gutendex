import { NavLink as RouterNavLink } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";

export default function NavLink({ className, ...props }) {
    return (
        <MuiLink
            component={RouterNavLink}
            className={className}
            {...props}
        />
    );
}