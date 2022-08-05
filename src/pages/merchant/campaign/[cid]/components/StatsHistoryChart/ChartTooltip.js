import { Paper, Stack, Typography } from "@mui/material";
import { TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

// Styles
import * as SC from "./index.styles";

const ChartTooltip = (props) => {
  const { active, label, payload } = props;

  if (!active) return null;

  return (
    <Paper sx={{ px: 2, py: 1, bgcolor: "black", color: "white" }}>
      <Stack alignItems="center">
        <Typography>{label}</Typography>
        <Stack direction="row" sx={{ "> :not(:last-child)": { mr: 2 } }}>
          {payload?.map((p) => (
            <Stack key={p.name} alignItems="center" direction="row">
              <SC.ChartTooltipItem color={p.color ?? "white"} />
              <Typography>{p.value}</Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ChartTooltip;
