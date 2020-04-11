import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

export const theme = createMuiTheme({
    typography: {
        fontFamily: [
            "Roboto",
            "-apple-system",
            "BlinkMacSystemFont",
            "Segoe UI",
            "Arial",
            "sans-serif"
        ].join(","),
        useNextVariants: true
    },
    palette: {
        primary: {
            light: '#e67e22',
            main: '#e67e22',
            dark: '#e67e22',
            contrastText: '#000'
        },
        secondary: {
            light: '#718792',
            main: '#455a64',
            dark: '#1c313a',
            contrastText: '#fff'
        },
        white: {
            main: '#FFF',
            contrastText: '#2f3640'
        },
        danger: {
            light: '#e74c3c',
            main: '#e74c3c',
            dark: '#e74c3c',
            contrastText: '#fff'
        }
    }
});

export default theme
