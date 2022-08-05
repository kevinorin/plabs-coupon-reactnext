import { Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import {
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineProps as LinePropsBase,
  Tooltip,
  XAxisProps as XAxisPropsBase,
  Legend,
} from "recharts";

// Components
import ChartTooltip from "./ChartTooltip";

const fakeData = [
  { date: "2022-12-11", claimed: 2, sent: 2 },
  { date: "2022-12-12", claimed: 8, sent: 5 },
  { date: "2022-12-13", claimed: 6, sent: 3 },
  { date: "2022-12-14", claimed: 8, sent: 3 },
  { date: "2022-12-15", claimed: 13, sent: 6 },
  { date: "2022-12-16", claimed: 6, sent: 3 },
];

const StatsHistoryChart = () => {
  /** Format the chart amount labels to hide "0" number (y axis) */
  const formatAmountLabel = (label) => {
    return label !== 0 ? `${label}` : "";
  };

  /** Format the chart date labels (x axis) */
  const formatDateLabel = (label) => {
    return dayjs(label).format("MMM DD");
  };

  /*** Format the chart legend item text */
  const formatLegendLabel = (value) => {
    return (
      <Typography color="InfoText" sx={{ display: "inline" }} variant="body1">
        Coupons {value}
      </Typography>
    );
  };

  // NOTE: Using 'LineProps' type caused an error with 'Line' component?
  const getLineProps = (color) => ({
    activeDot: {
      fill: "white",
      stroke: color,
      strokeWidth: 3,
      radius: 16,
    },
    dot: false,
    stroke: color,
    strokeWidth: 2,
    type: "linear",
  });

  const axisProps = {
    axisLine: false,
    tickSize: 0,
    tickMargin: 8,
  };

  return (
    <Paper elevation={0} sx={{ p: 2 }} variant="outlined">
      <ResponsiveContainer height={300} width="100%">
        <LineChart data={fakeData} margin={{ top: 8, bottom: 8, right: 8, left: -24 }}>
          <CartesianGrid stroke="#ededed" vertical={false} />
          <Tooltip content={ChartTooltip} cursor={{ strokeDasharray: 6 }} />
          <Line {...getLineProps("#30b4ff")} dataKey="sent" />
          <Line {...getLineProps("#ffae73")} dataKey="claimed" />
          <Legend
            align="right"
            iconType="circle"
            formatter={formatLegendLabel}
            verticalAlign="top"
            wrapperStyle={{ top: -2 }}
          />
          <XAxis {...axisProps} dataKey="date" tickFormatter={formatDateLabel} tickMargin={16} />
          <YAxis {...axisProps} tickFormatter={formatAmountLabel} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default StatsHistoryChart;
