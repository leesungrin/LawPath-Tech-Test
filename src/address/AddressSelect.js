import React from "react";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import { StateEnum } from './enum'

const AddressSelect = ({ name, label, value, isTouched, handleChangeFunc, isRequired, options} ) => {
    const error = isRequired && isTouched && value.length === 0;
    return (
      <FormControl fullWidth error={error}>
        <InputLabel id="state-select-label">{label}</InputLabel>
        <Select
            data-testid={name}
            id={name}
            name={name}
            value={value}
            onChange={handleChangeFunc}
        >
          {Object.keys(StateEnum).map(state => <MenuItem value={StateEnum[state]}>{StateEnum[state]}</MenuItem>)}
        </Select>
        <FormHelperText>{error ? "Required" : ""}</FormHelperText>
      </FormControl>
    )
}

export default AddressSelect;