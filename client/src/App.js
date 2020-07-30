import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import { DropzoneArea } from 'material-ui-dropzone'
import "fontsource-roboto";
import Grid from '@material-ui/core/Grid';
import model from './tfjs_model/model.json'
import * as tf from '@tensorflow/tfjs';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 50
  },
}))

export default function App() {
  const classes = useStyles()
  const [photo, setPhoto] = useState()
  const [painting, setPainting] = useState()
  const [finishedPhoto, setFinishedPhoto] = useState()
  const [m, setM] = useState()

  const handlePhotoDrop = (file) => {
    if (file[0]) {
      const im = new Image()
      var fr = new FileReader();
      fr.onload = function () {
        im.src = fr.result;
      }
      fr.readAsDataURL(file[0]);
      im.onload = () => {
        setPhoto(tf.browser.fromPixels(im))
      }
    }
  }

  const handlePaintingDrop = (file) => {
    if (file[0]) {
      const im = new Image()
      var fr = new FileReader();
      fr.onload = function () {
        im.src = fr.result;
      }
      fr.readAsDataURL(file[0]);
      im.onload = () => {
        setPainting(tf.browser.fromPixels(im))
      }
    }
  }

  const runML = async () => {
    const x = await tf.loadLayersModel(model)
    setM(x)
  }

  useEffect(() => {
    if (photo && painting) {
      runML()
      console.log(photo, painting)
    }
  }, [photo, painting])

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
            onChange={handlePhotoDrop}
          />
        </Grid>
        <Grid item xs={6}>
          <DropzoneArea
            acceptedFiles={['image/*']}
            showPreviews={true}
            showPreviewsInDropzone={false}
            maxFileSize={5000000}
            filesLimit={1}
            onChange={handlePaintingDrop}
          />
        </Grid>
      </Grid>
    </div >
  );
}
