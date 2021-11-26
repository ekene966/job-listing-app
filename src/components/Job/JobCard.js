import React from "react";
import { Box, Grid, Typography, Button, makeStyles} from '@material-ui/core'

import { differenceInMinutes } from 'date-fns'

// const skills =  ["Javascript", "React.js", "Node.js"];
// const skillsList = skills.map((skill, index) => {
//     return <Typography key={index} variant="body2" color="textSecondary" component="p">
//         {skill}
//     </Typography>



const useStyles = makeStyles((theme) =>({
    wrapper: {
        border: '1px solid #e0e0e0',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',

        "&:hover": {
            backgroundColor: '#f5f5f5',
            boxShadow: ' rgba(240, 46, 170, 0.4) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px, rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px',
            
            borderleft: '1px solid #e0e0e0',

        },
        "&:active": {
            backgroundColor: '#f5f5f5',
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        },
        "&:focus": {
            backgroundColor: '#f5f5f5',
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        },
    },

    companyName: {
        fontSize: '13.5px',
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.main, 
        borderRadius: '5px',
        display: 'inline-block',
        
        padding: theme.spacing(0.75), 

    },

    skillchip: {
        margin: theme.spacing(0.5), 
        padding: theme.spacing(0.75), 
        backgroundColor: theme.palette.secondary.main,
        // cursor: 'pointer',
        fontWeight: 600,
        color: 'white',
        borderRadius: '5px',
        fontSize: '13.5px',


    },

}));

export default props => {

    const classes = useStyles();// useStyles() returns an object with all the classes

    return(
        <Box p={2} className={classes.wrapper}>
        <Grid container alignItems="center">
            <Grid item xs>
                <Typography variant="subtitle1">{props.title}</Typography>
               
                <Typography className={classes.companyName} variant="subtitle1">{props.companyName}</Typography>
            </Grid>
            <Grid item container xs>
                
                {props.skills.map((skill) => (
                <Grid key={skill} className={classes.skillchip} item>
                    {skill}
                    </Grid>
                ))}
                
                 </Grid>
            <Grid item container direction="column" alignItems="flex-end" xs>
                <Grid item>
                <Typography variant="caption"> 
                    {differenceInMinutes(Date.now(),props.postedOn)} min ago | {" "} 
                    {props.type} | {props.location}
                </Typography>
                    </Grid>
                    <Grid item>
                        <Box mt={2}>
                <Button onClick={props.open} variant="outlined">Check</Button>
                </Box>
                </Grid>
                 </Grid>
        </Grid>
        </Box>
        
        )

    }
