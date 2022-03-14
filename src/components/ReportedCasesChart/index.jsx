import React, { useState } from "react";
import {
  LineChart,
  LinearYAxis,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
} from "reaviz";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const DEATH_COUNT_MODE = 0;
const CONFIRMED_CASES_MODE = 1;

const mapDataToDailyNewValues = ({ data }) =>
  data
    .map((item) => ({ key: new Date(item.date), data: item.new_deaths }))
    .filter((item) => item.data !== undefined);

const mapDataToConfirmedCases = ({ data }) =>
  data
    .map((item) => ({ key: new Date(item.date), data: item.total_cases }))
    .filter((item) => item.data !== undefined);

const ReportedCasesChart = ({ data }) => {
  const [chartMode, setChartMode] = useState(DEATH_COUNT_MODE);

  const handleModeChange = (e) => setChartMode(parseInt(e.target.value));

  const mappedData =
    chartMode === DEATH_COUNT_MODE
      ? mapDataToDailyNewValues(data)
      : mapDataToConfirmedCases(data);

  return (
    <Box sx={{ width: "100%" }}>
      <LineChart
        height={250}
        data={mappedData}
        yAxis={<LinearYAxis type="value" axisLine={null} />}
        xAxis={
          <LinearXAxis
            type="time"
            orientation="horizontal"
            position="end"
            axisLine={null}
            tickSeries={
              <LinearXAxisTickSeries
                line={null}
                label={<LinearXAxisTickLabel padding={5} position="end" />}
              />
            }
          />
        }
      />
      <FormControl sx={{ mt: 1 }}>
        <FormLabel>Chart Mode:</FormLabel>
        <RadioGroup
          name="radio-buttons-group"
          onChange={handleModeChange}
          value={chartMode}
        >
          <FormControlLabel
            value={DEATH_COUNT_MODE}
            control={<Radio />}
            label="Death count"
          />
          <FormControlLabel
            value={CONFIRMED_CASES_MODE}
            control={<Radio />}
            label="Confirmed cases"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default ReportedCasesChart;
