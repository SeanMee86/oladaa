import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    blue500,
    blue800,
    blue300,
    teal400,
    teal700,
    grey300,
    grey100,
    white,
    darkBlack,
    teal50,
    blueGrey800
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator'
const muiTheme = getMuiTheme({
    palette: {
        primary1Color: blue500,
        primary2Color: blue800,
        primary3Color: blue300,
        accent1Color: teal400,
        accent2Color: grey100,
        accent3Color: teal700,
        textColor: blueGrey800,
        alternateTextColor: white,
        canvasColor: grey100,
        borderColor: grey300,
        disabledColor: fade( darkBlack, 0.3 ),
        pickerHeaderColor: teal50,
        backCanvas: {
            viewportBackgroundColor: teal50,
            navDrawerBoxShadow: true
        }
    }
});
export default muiTheme;