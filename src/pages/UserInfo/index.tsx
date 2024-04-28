import { AppButton, AppCard } from "@/components/atoms";
import { Box } from "@mui/material";
import UserInfoStyles from "./styles";

const userInfo = {
    name:"Mr. Sachin Tendulkar",
    skills1:"Score : 7/10",
    skills2:"Score : 8/10",
    skills3:"Score : 4/10",
    skills4:"Score : 9/10",
}

const UserInfo = () =>{
    const styles = UserInfoStyles();

    return (
        <Box sx={styles.main}>
            <AppCard title="Name" subTitle={userInfo.name}/>
            <Box sx={styles.grid}>
            <AppCard title="Skills1" subTitle={userInfo.skills1}/>
            <AppCard title="Skills2" subTitle={userInfo.skills2}/>
            <AppCard title="Skills3" subTitle={userInfo.skills3}/>
            <AppCard title="Skills4" subTitle={userInfo.skills4}/>
            <AppCard title="Skills1" subTitle={userInfo.skills1}/>
            <AppCard title="Skills2" subTitle={userInfo.skills2}/>
            <AppCard title="Skills3" subTitle={userInfo.skills3}/>
            <AppCard title="Skills4" subTitle={userInfo.skills4}/>
            <AppCard title="Skills2" subTitle={userInfo.skills2}/>
            <AppCard title="Skills3" subTitle={userInfo.skills3}/>
            <AppCard title="Skills4" subTitle={userInfo.skills4}/>
            <AppCard title="Skills2" subTitle={userInfo.skills2}/>
            <AppCard title="Skills3" subTitle={userInfo.skills3}/>
            <AppCard title="Skills4" subTitle={userInfo.skills4}/>
            <AppCard title="Skills2" subTitle={userInfo.skills2}/>
            <AppCard title="Skills3" subTitle={userInfo.skills3}/>
            <AppCard title="Skills4" subTitle={userInfo.skills4}/>
            </Box>
            <AppButton text={"Generate Questionnaires"} sx={styles.btn}/>
        </Box>
    )
}
export default UserInfo;