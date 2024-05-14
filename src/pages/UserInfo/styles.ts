import IStyle from "@/types/common";

const UserInfoStyles = () =>({
    main:{
        paddingX:"60px",
        paddingTop:"40px",
    },
    grid:{
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"space-between"
    },
    btn:{
        margin:"40px 0"
    }
} as IStyle);

export default UserInfoStyles;
