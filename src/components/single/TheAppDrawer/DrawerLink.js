import { ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";

// Utilities
import theme from "../../../styles/theme";

const DrawerLink = (props) => {
  const { disabled = false, selected = false, text, to } = props;

  return (
    <Link href={to} passHref>
      <ListItemButton
        component="a"
        dense
        disabled={disabled}
        selected={selected}
        sx={{
          borderRadius: 2,
          fontWeight: 800,
          py: 1,
          "&.Mui-selected": {
            backgroundColor: `${theme.palette.secondary.main}1a`,
            "&:hover": {
              backgroundColor: `${theme.palette.secondary.main}26`,
            },
          },
          ".MuiTypography-root": {
            fontWeight: 500,
            textTransform: "uppercase",
          },
        }}
      >
        <ListItemText>{text}</ListItemText>
      </ListItemButton>
    </Link>
  );
};

export default DrawerLink;
