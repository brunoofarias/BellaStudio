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
            light: '#5cdbe2',
            main: '#09a9b0',
            dark: '#007981',
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
        }
        
    }
});

export default theme
