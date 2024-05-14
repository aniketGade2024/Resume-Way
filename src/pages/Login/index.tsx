import { AppAlert, AppButton, AppInput } from "@/components/atoms";
import { AccountCircle } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { LoginPageStyles } from "./styles";
import theme from "@/theme/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILoginValidation } from "@/types/auth";
import { LoginSchema } from "@/types/Schemas/auth";
import { useMutation } from "@tanstack/react-query";
import UserLogin from "@/services/auth";
import React from "react";
import { ISnackBar } from "@/types/common";
import { useToggleSnackBar } from "@/hooks";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [snackBar, setSnackBar] = React.useState<ISnackBar>({
    title: "",
    subTitle: "",
    severity: "info",
  });
  const { showToggle, toggleSnackBar } = useToggleSnackBar();
  const navigate = useNavigate();

  const styles = LoginPageStyles(theme);

  const methods = useForm<ILoginValidation>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = methods;

  const LoginMutation = useMutation({
    mutationKey: ["userLogin"],
    mutationFn: (payload: ILoginValidation) => UserLogin(payload),
    onSuccess: (data) => {
      console.log(data, "1111");
      if (data?.success) {
        setSnackBar({
          title: "Success",
          subTitle: "User Logged In Successfully.",
          severity: "success",
        });
        toggleSnackBar();
        navigate("/home");
      } else {
        setSnackBar({
          title: "Error",
          subTitle: "User not found !",
          severity: "error",
        });
        toggleSnackBar();
      }
    },
    onError: () => {
      setSnackBar({
        title: "Error",
        subTitle: "Something went wrong !",
        severity: "error",
      });
      toggleSnackBar();
    },
  });

  const onSubmit = async (data: ILoginValidation) => {
    await LoginMutation.mutateAsync(data);
  };

  return (
    <Box sx={styles.page}>
      <Box sx={styles.containerBox}>
        <Box sx={styles.contentBox}></Box>
        <Box sx={styles.contentBox}>
          <Box sx={styles.dFlex}>
            <AccountCircle />
            <Typography sx={styles.text}>Log In</Typography>
          </Box>
          <FormProvider {...methods}>
            <AppInput name="email" label="Email" placeholder="Enter Email" />
            <AppInput
              name="password"
              type="password"
              label="Enter Password"
              placeholder="Enter Password"
            />
            <AppButton
              text="Log In"
              sx={styles.appBtn}
              onClick={handleSubmit(onSubmit)}
            />
          </FormProvider>
        </Box>
      </Box>
      {Boolean(showToggle) && (
        <AppAlert
          isOpen={showToggle}
          handleClose={toggleSnackBar}
          title={snackBar.title}
          subTitle={snackBar.subTitle}
          severity={snackBar.severity}
        />
      )}
    </Box>
  );
};
export default AuthPage;
