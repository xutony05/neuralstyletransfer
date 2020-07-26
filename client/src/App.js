import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import { DropzoneArea } from 'material-ui-dropzone'
import "fontsource-roboto";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 50
  },
}))

export default function App() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography style={{ textAlign: 'center' }} variant="h2" gutterBottom>
            Paint like your favourite artist
        </Typography>
        </Grid>
        <Grid item xs={6}>
          <DropzoneArea
            acceptedFiles={['image/*']}
            showPreviews={true}
            showPreviewsInDropzone={false}
            maxFileSize={5000000}
            filesLimit={1}
          />
        </Grid>
        <Grid item xs={6}>
          <DropzoneArea
            acceptedFiles={['image/*']}
            showPreviews={true}
            showPreviewsInDropzone={false}
            maxFileSize={5000000}
            filesLimit={1}
          />
        </Grid>
      </Grid>
    </div >
  );
}
