import React from "react";
import Typography from "@material-ui/core/Typography";

const Success = () => {
    return (
        <React.Fragment>
            <Typography color="textPrimary" variant="h5" gutterBottom>
                Well done!
            </Typography>
            <Typography color="textSecondary" variant="subtitle1">
                You have verified your address successfully.
            </Typography>
        </React.Fragment>
    )
}

export default Success;