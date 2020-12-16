import "date-fns";
import React from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";

export const DatePicker = (props) => {
  // The first commit of Material-UI

  return (
    <KeyboardDatePicker
      disableToolbar
      variant="inline"
      format="MM/dd/yyyy"
      margin="normal"
      value={props.selectedDate}
      onChange={props.handleDateChange}
      disablePast={props.disablePast}
      KeyboardButtonProps={{
        "aria-label": "change date",
      }}
    />
  );
};
