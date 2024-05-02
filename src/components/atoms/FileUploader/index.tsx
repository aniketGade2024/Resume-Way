import { Box, Typography } from "@mui/material";
import FileUploadIcon from "@/assets/uploadIcon.png"
import FileUploaderStyles from "./styles";
import theme from "@/theme/theme";
import { convertToBase64 } from "@/utils/helpers/common";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type IFileUploader = {
  name: string;
  title?: string;

}

const FiledUploader = ({ name, title }: IFileUploader) => {
  const { control, setValue } = useFormContext();
  const [file, setFile] = React.useState();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      console.log(selectedFile);
      const base64File = await convertToBase64(selectedFile);
      if (base64File) {
        setValue(name, String(base64File).split(",")[1]);
      }
      setFile(URL.createObjectURL(selectedFile) as any);
    }
  }

  const handleRemove = () => {
    setValue(name, undefined);
    setFile(undefined);
  }
  const styles = FileUploaderStyles(theme);

  return (
    <Controller name={name} control={control} render={() => {
      return (
        <Box sx={styles.container}>
          <Box sx={styles.card}>
            <Typography variant="h3">{title ?? "Upload File"}</Typography>
            <Box sx={{ ...styles.dropBox, borderStyle: file ? "none" : "dotted", boxShadow: file ? "0px 0px 10px 0px rgba(0, 0, 0, 0.5)" : "none", maxHeight: file ? "500px" : "auto" }}>
              {
                file ? (
                  <Box sx={styles.selectedImg}>
                    <img src={file} />
                  </Box>
                ) : (
                  <>
                    <Box sx={styles.imageContainer}>
                      <img src={FileUploadIcon} alt="UploadIcon" />
                    </Box>
                    <Typography sx={styles.h4}>Select File here</Typography>
                    <Typography sx={styles.p}>Files Supported: jpg, jpeg, png, webp </Typography>
                    <input type="file" accept="image/*" id="fileId" style={{ display: "none" }} onChange={(e) => handleChange(e)} />
                    <label htmlFor="fileId">
                      <Typography sx={styles.btn}>
                        Choose File
                      </Typography>
                    </label>

                  </>
                )
              }
              {
                file && <Box sx={styles.removeBtn} onClick={() => handleRemove()}>
                  <Typography sx={styles.rmText}>X</Typography>
                </Box>
              }
            </Box>

          </Box>
        </Box>
      )
    }} />
  )
}

export default FiledUploader