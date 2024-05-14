import { AppConstants } from "@/utils/helpers/constants";
import {
  Box,
  Button,
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
import JdListingStyles from "./styles";
import {
  DeleteOutlineOutlined,
  EditOutlined,
  FilterList,
  MoreVert,
  Visibility,
} from "@mui/icons-material";
import theme from "@/theme/theme";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import React from "react";

const JDListing = () => {
  const styles = JdListingStyles();
  const methods = useForm();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <Typography sx={styles.title}>List of JD's</Typography>
            <Box sx={{ ...styles.flex, gap: 0 }}>
              <FilterList /> <Typography>Filters</Typography>
            </Box>
          </Box>
          <Box sx={styles.flex}>
            <AppButton
              text="Create JD"
              sx={{ backgroundColor: "rgb(0,108,156)" }}
              onClick={() => navigate("/createjd")}
            />
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
                <TableCell>Title</TableCell>
                <TableCell>Open Positions</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>Profile Location</TableCell>
                <TableCell>Update</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {AppConstants.JD_DATA?.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.openPositions}</TableCell>
                    <TableCell>{item.experience}</TableCell>
                    <TableCell>{item.profileLocation}</TableCell>
                    <TableCell>{item.updatedDate}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>
                      <Button
                        id="demo-customized-button"
                        aria-controls={
                          open ? "demo-customized-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        variant="contained"
                        disableElevation
                        sx={{
                          background: "transparent",
                          color: "rgba(0,0,0,0.6)",
                          "&:hover": { background: "transparent" },
                        }}
                        disableRipple
                        onClick={(e) => handleClick(e)}
                      >
                        <MoreVert />
                      </Button>
                      <AppMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                          "aria-labelledby": "demo-customized-button",
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleClose} disableRipple>
                          <Visibility /> View
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                          <EditOutlined /> Edit
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                          <DeleteOutlineOutlined /> Delete
                        </MenuItem>
                      </AppMenu>
                    </TableCell>

                    <TableCell sx={{ textAlign: "end" }}>
                      <AppButton
                        text="Analyze"
                        sx={{ background: theme.palette.success.main }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default JDListing;
