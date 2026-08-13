import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// const theme = createTheme({
//     cssVariables: true,
//     palette: {
//         background: {
//             default: 'hsl(210, 14%, 7%)'
//         },
//         text: {
//             primary: "#fff"
//         },
//         primary: {
//             main: '#556cd6',
//         },
//         secondary: {
//             main: '#19857b',
//         },
//         error: {
//             main: red.A400,
//         },
//     },
// });
const theme = createTheme({
  palette: {
    mode: "dark",
  },
});
export default theme;
