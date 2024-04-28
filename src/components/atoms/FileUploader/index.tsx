import { Box, Typography } from "@mui/material";
import FileUploadIcon from "@/assets/uploadIcon.png"
import FileUploaderStyles from "./styles";
import theme from "@/utils/theme/theme";
import { convertToBase64 } from "@/utils/helpers/common";
import React from "react";

type IFileUploader = {
  title?: string;

}

const FiledUploader = ({ title }: IFileUploader) => {
  const [,setFileValue]= React.useState();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      const selectedFile = e.target.files[0];
      const base64File = await convertToBase64(selectedFile);
      if(base64File){
        setFileValue(base64File as any);
      }
    }
  }
  const styles = FileUploaderStyles(theme);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.card}>
        <Typography variant="h3">{title ?? "Upload File"}</Typography>
        <Box sx={styles.dropBox}>
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
        </Box>
      </Box>
    </Box>
  )
}

export default FiledUploader