import React, { useState } from "react";
import { BarChart, BarSeries } from "reaviz";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

const TOTAL_DEATH_MODE = 0;
const TOTAL_CASES_MODE = 1;

const mapDataTotalDeathTopToList = (data, countryCount = 10) =>
  Object.keys(data)
    .map((region) => {
      if (!region.startsWith("OWID_")) {
        return {
          key: region,
          data: data[region].data.slice(-1)[0].total_deaths,
        };
      }
    })
    .filter((item) => item !== undefined)
    .filter((item) => item.data !== undefined)
    .sort((a, b) => b.data - a.data)
    .slice(0, countryCount);

const mapDataTotalCasesTopToList = (data, countryCount = 10) =>
  Object.keys(data)
    .map((region) => {
      if (!region.startsWith("OWID_")) {
        return {
          key: region,
          data: data[region].data.slice(-1)[0].total_cases,
        };
      }
    })
    .filter((item) => item !== undefined)
    .filter((item) => item.data !== undefined)
    .sort((a, b) => b.data - a.data)
    .slice(0, countryCount);

const RankedChart = ({ data, selectedCountryCode }) => {
  const [chartMode, setChartMode] = useState(TOTAL_DEATH_MODE);
  const [countryCount, setCountryCount] = useState(10);

  const handleCountryCountChange = (e) =>
    setCountryCount(parseInt(e.target.value));

  const handleModeChange = (e) => setChartMode(parseInt(e.target.value));

  const mappedData =
    chartMode === TOTAL_DEATH_MODE
      ? mapDataTotalDeathTopToList(data, countryCount)
      : mapDataTotalCasesTopToList(data, countryCount);

  return (
    <Box sx={{ width: "100%" }}>
      <BarChart
        series={
          <BarSeries
            colorScheme={(data) =>
              data.key === selectedCountryCode ? "#418AD7" : "#ACB7C9"
            }
          />
        }
        height={250}
        data={mappedData}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          rowGap: 1,
        }}
      >
        <Box>
          <FormControl sx={{ mt: 1 }} fullWidth>
            <FormLabel>Chart Mode:</FormLabel>
            <RadioGroup
              name="radio-buttons-group"
              onChange={handleModeChange}
              value={chartMode}
            >
              <FormControlLabel
                value={TOTAL_DEATH_MODE}
                control={<Radio />}
                label="Death count"
              />
              <FormControlLabel
                value={TOTAL_CASES_MODE}
                control={<Radio />}
                label="Confirmed cases"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Number of countries
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={countryCount}
              label="Number of countries"
              sx={{ width: 150 }}
              onChange={handleCountryCountChange}
            >
              {Object.keys(data).map((_item, index) => (
                <MenuItem key={`menu-item-${index}`} value={index + 1}>
                  {index + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default RankedChart;
