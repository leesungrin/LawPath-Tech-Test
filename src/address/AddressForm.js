import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import { makeStyles } from "@material-ui/core/styles";
import AddressField from "./AddressTextField";
import AddressSelect from "./AddressSelect";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(2),
    height: 50,
  },
  errMessage: {
    color: "red",
    textAlign: "center",
    flex: 8,
  },
  button: {
    flex: 1,
  },
  formControl: {
    width: "100%"
  },
}));

const AddressForm = ({ setDone }) => {
  const classes = useStyles();
  const [addressState, setAddressState] = useState({
    address1: "",
    address2: "",
    state: "",
    suburb: "",
    postcode: "",
  });
  const [touchedState, setTouchedState] = useState({
    address1: false,
    address2: false,
    state: false,
    suburb: false,
    postcode: false,
  });
  const [isSuccessful, setIsSuccessful] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setAddressState({
      ...addressState,
      [name]: value,
    });
    if (!touchedState[name]) setTouchedState({ ...touchedState, [name]: true });
  };

  const setTouchedStateToTrue = () => {
    const newTouchedState = {};
    Object.keys(touchedState).forEach((key) => (newTouchedState[key] = true));
    setTouchedState(newTouchedState);
  };

  const handleVerify = async (e) => {
    setIsLoading(true);
    setTouchedStateToTrue();

    let url = `/postcode/search.json?q=${addressState.suburb}&state=${addressState.state}`;
    let options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "AUTH-KEY": "872608e3-4530-4c6a-a369-052accb03ca8",
      },
    };
    let response = await fetch(url, options);
    let responseOK = response && response.ok;
    if (responseOK) {
      let rawData = await response.json();
      let data = rawData["localities"]["locality"];
      if (data) {
        const addresses = data?.length
          ? data.map((e) => ({
              suburb: e.location,
              postcode: e.postcode,
              state: e.state,
            }))
          : [
              {
                suburb: data.location,
                postcode: data.postcode,
                state: data.state,
              },
            ];
        const result = addresses.filter(
          (e) => (e.postcode + "") === addressState.postcode
        );
        if (result.length > 0) {
          setIsSuccessful(true);
          setTimeout(() => setDone(true), 2000);
        } else setIsSuccessful(false);
      } else {
        setIsSuccessful(false);
      }
    } else {
      setIsSuccessful(false);
    }
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <Typography data-testid="heading" variant="h6" gutterBottom>
        Enter the address
      </Typography>
      <Grid data-testid="formContainer" container spacing={3}>
        <Grid item xs={12}>
          <AddressField
            name={"address1"}
            label={"Address line 1"}
            value={addressState.address1}
            isTouched={touchedState.address1}
            handleChangeFunc={handleChange}
            isRequired={false}
          />
        </Grid>
        <Grid item xs={12}>
          <AddressField
            name={"address2"}
            label={"Address line 2"}
            value={addressState.address2}
            isTouched={touchedState.address2}
            handleChangeFunc={handleChange}
            isRequired={false}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AddressField
            name={"suburb"}
            label={"Suburb"}
            value={addressState.suburb}
            isTouched={touchedState.suburb}
            handleChangeFunc={handleChange}
            isRequired={true}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AddressSelect
            name={"state"}
            label={"State"}
            value={addressState.state}
            isTouched={touchedState.state}
            handleChangeFunc={handleChange}
            isRequired={true}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AddressField
            name={"postcode"}
            label={"Post code"}
            value={addressState.postcode}
            isTouched={touchedState.postcode}
            handleChangeFunc={handleChange}
            isRequired={true}
          />
        </Grid>
      </Grid>

      <div data-testid="buttonContainer" className={classes.buttonContainer}>
        <p className={[classes.errMessage]}>
          {!isLoading && isSuccessful === false ? "Verification failed." : " "}
        </p>
        <Button
          variant="contained"
          disabled={isLoading || isSuccessful}
          color="primary"
          onClick={handleVerify}
          className={classes.button}
        >
          {isSuccessful ? <DoneIcon /> : "Verify"}
        </Button>
      </div>
    </React.Fragment>
  );
};

export default AddressForm;
