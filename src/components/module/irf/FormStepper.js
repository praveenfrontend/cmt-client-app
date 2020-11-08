import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  stepcolor: {
    color: "#28a745 !important"
  }
}));

function FormStepper({ step, steps }) {
  const classes = useStyles();

  return (
    <Stepper activeStep={step} alternativeLabel className="mt-4">
      {steps.map(label => (
        <Step key={label}>
          <StepLabel
            StepIconProps={{
              classes: {
                completed: classes.stepcolor,
                active: classes.stepcolor
              }
            }}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default FormStepper;
