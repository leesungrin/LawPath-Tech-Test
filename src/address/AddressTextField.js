import React from "react";
import TextField from "@material-ui/core/TextField";

const AddressField = ({ name, label, value, isTouched, handleChangeFunc, isRequired} ) => {
    const error = isRequired && isTouched && value.length === 0;
    return (
      <TextField
          data-testid={name}
          error={error}
          helperText={error ? "Required" : ""}
          id={name}
          name={name}
          label={label}
          value={value}
          onChange={handleChangeFunc}
          fullWidth
      />
    )
}

export default AddressField;