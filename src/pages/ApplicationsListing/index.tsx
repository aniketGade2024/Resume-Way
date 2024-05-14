import { AppConstants } from "@/utils/helpers/constants";
import {
  Box,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AppButton, AppInput, AppMenu } from "@/components/atoms";
import {
  DeleteOutlineOutlined,
  FilterList,
  MoreVert,
  QuestionAnswer,
  Visibility,
} from "@mui/icons-material";
import { FormProvider, useForm } from "react-hook-form";
import { ApplicationListStyles } from "./styles";
import React from "react";
import theme from "@/theme/theme";
import GenerateQuestionModal from "@/components/molecules/GenerateQuestionModal";
import { useModal } from "@/hooks";

type IApplication = {
  name: string;
  skill: string;
  experience: string;
  location: string;
  score: number;
};

const JDListing = () => {
  const styles = ApplicationListStyles();
  const methods = useForm();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [application, setApplication] = React.useState<IApplication>({
    name: "",
    skill: "",
    experience: "",
    location: "",
    score: 0,
  });
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget);
    console.log(index, "1111");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { generateQuestionModal, handleGenerateQuestionModal } = useModal();

  return (
    <Box sx={styles.page}>
      <Box sx={styles.container}>
        <Box
          sx={{
            ...styles.spaceBetween,
            background: "#F4F4F4",
            padding: "0 60px",
          }}
        >
          <Box sx={styles.flex}>
            <Typography sx={styles.title}>List of Applications</Typography>
            <Box sx={{ ...styles.flex, gap: 0 }}>
              <FilterList /> <Typography>Filters</Typography>
            </Box>
          </Box>
          <Box sx={styles.flex}>
            <Box sx={styles.flex}>
              <FormProvider {...methods}>
                <AppInput
                  type="search"
                  name="searchKey"
                  placeholder="Search here..."
                />
                <AppButton text="Search" />
              </FormProvider>
            </Box>
          </Box>
        </Box>
        <TableContainer sx={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Primary Skills</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {AppConstants.APPLICATIONS?.map((item, index) => {
                return (
                  <TableRow key={index} id={`${index}`}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.skill}</TableCell>
                    <TableCell>{item.experience}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell
                      sx={{
                        color:
                          item.score > 50
                            ? theme.palette.success.main
                            : item.score === 50
                            ? theme.palette.warning.main
                            : theme.palette.error.main,
                      }}
                    >
                      {item.score}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={(e) => handleClick(e, index)}>
                        <MoreVert />
                      </IconButton>
                      <AppMenu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleClose} disableRipple>
                          <Visibility /> View
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            console.log(index, "111");
                            setApplication({
                              name: AppConstants.APPLICATIONS?.[index].name,
                              skill: AppConstants.APPLICATIONS?.[index].skill,
                              experience:
                                AppConstants.APPLICATIONS?.[index].experience,
                              location:
                                AppConstants.APPLICATIONS?.[index].location,
                              score: AppConstants.APPLICATIONS?.[index].score,
                            });
                            handleClose();
                            handleGenerateQuestionModal();
                          }}
                          disableRipple
                        >
                          <QuestionAnswer /> {"Generate Questions"}
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                          <DeleteOutlineOutlined /> Delete
                        </MenuItem>
                      </AppMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <GenerateQuestionModal
        isOpen={generateQuestionModal}
        handleOpenModal={handleGenerateQuestionModal}
        application={application}
      />
    </Box>
  );
};

export default JDListing;
