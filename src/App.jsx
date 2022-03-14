import React, { useMemo, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

import useFetchData from "./helpers/useFetchData";
import TabPanel from "./components/TabPanel";
import ReportedCasesChart from "./components/ReportedCasesChart";
import RankedChart from "./components/RankedChart";

const DARK_THEME = "dark";
const LIGHT_THEME = "light";

const StyledTabs = styled(Tabs)`
  & .MuiTabs-flexContainer {
    justify-content: space-around;
  }
`;

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [countryCode, setCountryCode] = useState("OWID_WRL");

  const [activeTheme, setTheme] = useState(LIGHT_THEME);

  const { response: covidData, countryList, loading } = useFetchData();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: activeTheme,
        },
      }),
    [activeTheme]
  );

  const handleChangeColorMode = () =>
    activeTheme === LIGHT_THEME ? setTheme(DARK_THEME) : setTheme(LIGHT_THEME);

  const handleChangeTab = (_event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCountryChange = (value) => {
    if (value) {
      return setCountryCode(value.countryCode);
    }

    return setCountryCode("OWID_WRL");
  };

  if (!covidData || loading) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Switch
          checked={activeTheme === DARK_THEME}
          onChange={handleChangeColorMode}
          color="secondary"
        />
        <Typography component={"span"} variant={"body2"} color="inherit" noWrap>
          Dark Theme
        </Typography>
      </Toolbar>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Autocomplete
            disablePortal
            options={countryList}
            onChange={(_event, newValue) => handleCountryChange(newValue)}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select country" />
            )}
          />
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <StyledTabs
              value={activeTab}
              onChange={handleChangeTab}
              sx={{ mt: 2 }}
            >
              <Tab label="Reported cases" />
              <Tab label="Ranked charts" />
            </StyledTabs>
          </Box>
          <Box sx={{ mt: 4 }}>
            <TabPanel value={activeTab} index={0}>
              <ReportedCasesChart data={covidData[countryCode]} />
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
              <RankedChart data={covidData} selectedCountryCode={countryCode} />
            </TabPanel>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
