import { createMuiTheme } from '@material-ui/core/styles';

export const COLOR = {
    BODY: '#f0f5f4',
    LIGHT_BODY: '#fbfdff',
    WHITE: '#FFFFFF',
    LIGHT_GREY: '#eff1f9',
    GREY: '#9c9c9c',
    BLACK: '#414042',
    DARK: '#575757',
    PRIMARY: '#08b783',
    DARK_PRIMARY: '#23a67f',
    LIGHT_PRIMARY: '#9bdaca',
    SECONDARY: '#e54c4a',
    DARK_SECONDARY: '#bf4947',
    LIGHT_SECONDARY: '#f89771',
    WARNING: '#f7be22'
};

const theme = createMuiTheme({
    palette: {
        primary: {
            light: COLOR.LIGHT_PRIMARY,
            main: COLOR.PRIMARY,
            dark: COLOR.DARK_PRIMARY,
            contrastText: COLOR.WHITE,
        },
        secondary: {
            light: COLOR.LIGHT_SECONDARY,
            main: COLOR.SECONDARY,
            dark: COLOR.DARK_SECONDARY,
            contrastText: COLOR.WHITE,
        },
    },
    overrides: {
        MuiButton: {
            root: {
                height: 50,
                textTransform: 'none',
                borderRadius: 15,
                padding: '5px 20px'
            },
            contained: {
                boxShadow: '0 7px 7px -7px rgba(136,136,136,0.75)',
            },
            outlined: {
                borderWidth: '2px !important'
            },
            sizeSmall: {
                height: 35
            }
        },
        MuiCard: {
            root: {
                borderRadius: 10,
                boxShadow: '0 3px 15px 5px rgba(221,221,221,0.15)'
            },
        },
        MuiAccordion: {
            root: {
                '&:before': {
                    backgroundColor: 'transparent'
                },

                borderRadius: '10px !important',
                boxShadow: ' 0px 10px 10px 0px rgba(221,221,221,0.25)'
            }
        },
        MuiAlert: {
            root: {
                borderRadius: 10
            }
        },
        MuiTableCell: {
            root: {
                padding: 10
            }
        }
    }
});

export default theme;
