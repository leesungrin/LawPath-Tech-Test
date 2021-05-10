import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(2),
    height: 50
  },
  errMessage: {
    color: 'red',
    textAlign: 'center',
    flex: 8
  },
  button: {
      flex: 1
  },
}));

const AddressForm = ({ setDone }) => {
  const classes = useStyles();
  const [addressState, setAddressState] = useState({
      address1: "",
      address2: "",
      state: "",
      suburb: "",
      postcode: ""
  })
  const [touchedState, setTouchedState] = useState({
      address1: false,
      address2: false,
      state: false,
      suburb: false,
      postcode: false
  })
  const [isSuccessful, setIsSuccessful] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    setAddressState({
      ...addressState,
      [name]: value
    });
    if (!touchedState[name]) setTouchedState({ ...touchedState, [name]: true });
  }

  const setTouchedStateToTrue = () => {
    const newTouchedState = {};
    Object.keys(touchedState).forEach(key => newTouchedState[key] = true);
    setTouchedState(newTouchedState);
  }

  const handleVerify = async e => {
    setIsLoading(true);
    setTouchedStateToTrue();

    let url = `http://localhost:3000/postcode/search.json?q=${addressState.suburb}&state=${addressState.state}`;
    let options = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'AUTH-KEY': '872608e3-4530-4c6a-a369-052accb03ca8'
                }
            };
    let response = await fetch(url, options);
    let responseOK = response && response.ok;
    if (responseOK) {
        let rawData = await response.json();
        let data = rawData["localities"]["locality"];
        if (data) {
            const addresses = (data?.length) ? data.map(e => ({ suburb: e.location, postcode: e.postcode, state: e.state })) : [{ suburb: data.location, postcode: data.postcode, state: data.state }];
            const result = addresses.filter(e => e.postcode == addressState.postcode);
            if (result.length > 0) {
                setIsSuccessful(true)
                setTimeout(() => setDone(true), 2000);
            }
            else setIsSuccessful(false)
        } else {
            setIsSuccessful(false)
        }
    } else {
        setIsSuccessful(false)
    }

    setIsLoading(false)
  }

  const renderTextField = (name, label, value, isTouched, handleChangeFunc, isRequired) => {
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

  return (
    <React.Fragment>
      <Typography data-testid="heading" variant="h6" gutterBottom>
        Enter the address
      </Typography>
      <Grid data-testid="formContainer" container spacing={3}>
        <Grid item xs={12}>
            {renderTextField("address1", "Address line 1", addressState.address1, touchedState.address1, handleChange, true)}
        </Grid>
        <Grid item xs={12}>
            {renderTextField("address2", "Address line 2", addressState.address2, touchedState.address2, handleChange, false)}
        </Grid>
        <Grid item xs={12} sm={4}>
            {renderTextField("suburb", "Suburb", addressState.suburb, touchedState.suburb, handleChange, true)}
        </Grid>
        <Grid item xs={12} sm={4}>
            {renderTextField("state", "State", addressState.state, touchedState.state, handleChange, true)}
        </Grid>
        <Grid item xs={12} sm={4}>
            {renderTextField("postcode", "Post code", addressState.postcode, touchedState.postcode, handleChange, true)}
        </Grid>
      </Grid>

      <div data-testid="buttonContainer" className={classes.buttonContainer}>
        <p className={[classes.errMessage]}>{(!isLoading && isSuccessful === false) ? 'Verification failed.' : ' '}</p>
        <Button
            variant="contained"
            disabled={isLoading || isSuccessful}
            color="primary"
            onClick={handleVerify}
            className={classes.button}>
        {isSuccessful ? <DoneIcon /> : 'Verify'}
        </Button>
    </div>
    </React.Fragment>
  );
}

export default AddressForm;