import { Theme } from "@mui/material";

export const AppLoaderStyles = (theme: Theme) => ({
    appLoader: {
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "rgba(0,0,0,0.7)",
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        zIndex: 100,
        overflow: "hidden"
    },
    bouncingLoader: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: "20px",
    },
    bouncingBall: {
        width: 16,
        height: 16,
        margin: '3px 6px',
        borderRadius: '50%',
        backgroundColor: '#a3a1a1',
        opacity: 1,
        animation: '$bouncingLoader 0.6s infinite alternate',
    },
    '@keyframes bouncingLoader': {
        '0%': {
            opacity: 1,
            transform: 'translateY(0)',
        },
        'to': {
            opacity: 0.1,
            transform: 'translateY(-16px)',
        },
    },
    bouncingBall2: {
        animationDelay: '0.2s',
    },
    bouncingBall3: {
        animationDelay: '0.4s',
    },
    title: {
        color: theme.palette.info.main
    }
})