import { AppCard } from "@/components/atoms";
import { Box } from "@mui/material";
import UserInfoStyles from "./styles";
import useAppStore from "@/store";


const UserInfo = () => {
    const styles = UserInfoStyles();
    const { resumeInfo } = useAppStore();
    return (
        <Box sx={styles.main}>
            <AppCard resumeInfo={resumeInfo} />
        </Box>
    )
}
export default UserInfo;