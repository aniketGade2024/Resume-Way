import { AppConstants } from "@/utils/helpers/constants";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AppButton, AppInput } from "@/components/atoms";
import JdListingStyles from "./styles";
import { FilterList, MoreVert } from "@mui/icons-material";
import theme from "@/theme/theme";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const JDListing = () => {
  const styles = JdListingStyles();
  const methods = useForm();
  const navigate = useNavigate();
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
              onClick={()=>navigate("/createjd")}
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
                      <MoreVert />
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
