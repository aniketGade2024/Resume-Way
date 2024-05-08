const HomePageStyles = () => ({
    card: {
        width: "90%",
        borderRadius: "10px",
        backgroundColor: "#ffffff",
        margin: "0 auto",
        marginTop: "6%",
        padding: "20px 0",
    },
    dFlex: {
        display: "flex",
        justifyContent: "space-between",
    },

    score: {
        textAlign: "center",
    },

    span: {
        fontSize: "18px",
        fontWeight: "bolder",
    },

    justifyEnd: {
        display: "flex",
        justifyContent: "flex-end",
    },

    flex1: {
        flex: 1,
        margin: "20px 40px",
    },

    justifyCenter: {
        display: "flex",
        justifyContent: "center"
    },
    processBtn: {
        marginTop: "5%"
    },
    flex: {
        display: "flex",
        alignItems: "center"
    },
    colFlex: {
        display: "flex", flexDirection: "column", gap: "5px"
    },
    input:{
        width:"60px",
    }
})

export default HomePageStyles;