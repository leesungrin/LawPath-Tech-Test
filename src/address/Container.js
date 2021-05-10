import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import Success from "./Success";

const useStyles = makeStyles((theme) => ({
    // Material-UI spacing is 8px by default.
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    width: 600,
    marginLeft: "auto",
    marginRight: "auto",
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2)
  },
  formContainer: {
    padding: theme.spacing(3),
  }
}));

export default function Checkout() {
  const classes = useStyles();
  const [done, setDone] = useState(false);

  return (
    <React.Fragment>
      <AppBar data-testid="appBar" position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            LawPath
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography data-testid="title" component="h1" variant="h4" align="center">
            Validate Australian address
          </Typography>
          <div className={classes.formContainer}>
            {done ? <Success /> : <AddressForm setDone={setDone} /> }
          </div>
        </Paper>
      </main>
    </React.Fragment>
  );
}
