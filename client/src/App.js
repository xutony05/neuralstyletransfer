import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import { DropzoneArea } from 'material-ui-dropzone'
import "fontsource-roboto";
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

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

  const handlePhotoDrop = (file) => {
    if (file[0]) {
      setPhoto(file)
    }
  }

  const handlePaintingDrop = (file) => {
    if (file[0]) {
      setPainting(file)
    }
  }

  useEffect(() => {
    if (photo && painting) {
      var fd = new FormData();
      fd.append('photo', photo)
      fd.append('painting', painting)
      axios.post("http://127.0.0.1:5000/api/generateimage", fd)
        .then(res => setFinishedPhoto(res.data))
        .catch(err => console.log(err))
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
