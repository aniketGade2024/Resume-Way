import { AppButton, AppInput } from "@/components/atoms";
import { CreateJDStyles } from "./styles";
import { Box, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import theme from "@/theme/theme";

const CreateJD = () => {
  const styles = CreateJDStyles();
  const methods = useForm();

  return (
    <Box sx={styles.page}>
      <Box>
        <Typography sx={styles.title}>Create Job Description</Typography>
      </Box>
      <Box sx={styles.contentBox}>
        <FormProvider {...methods}>
          <Box sx={{ ...styles.dFlex, gap: "20px" }}>
            <AppInput name="title" placeholder="Title" sx={styles.input} />
            <AppInput
              name="position"
              placeholder="Open Position"
              sx={styles.input}
            />
            <AppInput
              name="experience"
              placeholder="Experience"
              sx={styles.input}
            />
            <AppInput
              name="location"
              placeholder="Profile Location"
              sx={styles.input}
            />
          </Box>
          <Box sx={{ ...styles.dFlex, justifyContent: "space-between" ,gap:"20px"}}>
            <AppInput name="jd" placeholder="Upload Jd" sx={styles.input} />
            <Box sx={{ ...styles.dFlex, gap: "20px" }}>
              <AppButton
                text="Cancel"
                sx={{
                  background: theme.palette.info.main,
                  color: "rgba(0,0,0,0.5)",
                }}
              />
              <AppButton text="Create" />
            </Box>
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default CreateJD;
