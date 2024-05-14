import {
  Box,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldVariants,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import AppInputStyles from "./styles";
import { SearchRounded, Visibility, VisibilityOff } from "@mui/icons-material";

type InputProps = {
  name: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  label?: string;
  variant?: TextFieldVariants;
  [x: string]: any;
};

const AppInput = ({
  name,
  type,
  placeholder,
  label,
  variant,
  props,
}: InputProps) => {
  const { control } = useFormContext();
  const styles = AppInputStyles();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => {
        return (
          <Box sx={styles.inputBox}>
            {label && <Typography sx={styles.label}>{label}</Typography>}
            <TextField
              type={showPassword ? "text" : type}
              name={name}
              id={name}
              onChange={onChange}
              placeholder={placeholder}
              variant={variant ?? "outlined"}
              sx={styles.input}
              InputProps={{
                startAdornment: type === "search" && (
                  <InputAdornment position="start">
                    <IconButton edge="start" disableRipple color="primary">
                      <SearchRounded sx={styles.icon} />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: type === "password" && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      disableRipple
                    >
                      {showPassword ? (
                        <VisibilityOff sx={styles.icon} />
                      ) : (
                        <Visibility sx={styles.icon} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...props}
            />
            {error && <FormHelperText error>{error.message}</FormHelperText>}
          </Box>
        );
      }}
    />
  );
};

export default AppInput;
