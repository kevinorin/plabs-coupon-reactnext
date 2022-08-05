import { SvgIconComponent } from "@mui/icons-material";
import React from "react";

// Styles
import * as SC from "./index.styles";

const UserTypeCard = (props) => {
  const { Icon, selected = false, title, onSelect } = props;

  return (
    <SC.Card selected={selected} onClick={onSelect}>
      <Icon color="primary" sx={{ fontSize: 48 }} />
      <SC.CardTitle>{title}</SC.CardTitle>
    </SC.Card>
  );
};

export default UserTypeCard;
