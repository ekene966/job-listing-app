import React from 'react'
import {
    Box,
     Grid, 
     ThemeProvider, 
     FilledInput, 
     Select, 
     MenuItem, 
     Dialog,
     DialogHeader,
      DialogTitle, 
      DialogContent, 
      DialogActions ,
      Typography,
      makeStyles,
      Button,
      IconButton,
      CircularProgress
   } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import  { format  } from 'date-fns'
import { mergeClasses } from '@material-ui/styles';

const useStyles = makeStyles((theme) =>({
 info:{

    '& > *':{
        margin: '4px'
    }
 },

 skillChip: {
    margin: theme.spacing(0.5), 
    padding: theme.spacing(0.75), 
    backgroundColor: theme.palette.secondary.main,
    // cursor: 'pointer',
    fontWeight: 600,
    color: 'white',
    borderRadius: '5px',
    fontSize: '13.5px',


},

}))

export  default (props) => {
    const classes = useStyles();

    return(
    <Dialog open={!!Object.keys(props.job).length} fullWidth> 
 <DialogTitle> 
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    {props.job.title} @ {props.job.company}
                    <IconButton onClick={props.closeModal}  >
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box>
                    <Box className={classes.info} display="flex" >
                        <Typography variant="caption">Posted on: </Typography>
                        <Typography variant="body2">
                            {props.job.postedOn &&
                             format(props.job.postedOn, "dd/MM/yy HH:MM" )}
                            </Typography>
                    </Box>
                    <Box className={classes.info} display="flex" >
                        <Typography variant="caption">Job Location: </Typography>
                        <Typography variant="body2">{props.job.location}</Typography>
                    </Box>
                    <Box className={classes.info} display="flex" >
                        <Typography variant="caption">Job Description: </Typography>
                        <Typography variant="body2">{props.job.description}</Typography>
                    </Box>
                    <Box className={classes.info} display="flex" >
                        <Typography variant="caption">Company Name: </Typography>
                        <Typography variant="body2">{props.job.companyName}</Typography>
                    </Box>
                    <Box className={classes.info} display="flex" >
                        <Typography variant="caption">Company Website: </Typography>
                        <Typography variant="body2">{props.job.companyUrl}</Typography>
                    </Box>
                    <Box ml={0.5} >
                        <Typography variant="caption">Skills:</Typography>
                        <Grid container alignItems="center">
                            {props.job.skills && //if skills exist
                            props.job.skills.map((skill)=> (
                                <Grid item key={skill} className={classes.skillChip}>
                                    {skill}
                        </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button 
                
                variant="outlined"  
                component="a" href={props.job.link}
                target="_blank"
                
                >
                    Apply
                </Button>
            </DialogActions>
    </Dialog>

    )

                            }
