import React, { useState } from "react";

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


const useStyles = makeStyles(theme => ({
    skillchip: {
        margin: theme.spacing(0.5), 
        padding: theme.spacing(0.75), 
        border: `1px solid ${theme.palette.secondary.main}`,
        // cursor: 'pointer',
        fontWeight: 600,
        color: 'black',
        borderRadius: '5px',
        fontSize: '13.5px',
        cursor: 'pointer',


        
        "&:hover": {
            backgroundColor: theme.palette.secondary.main,
            color: 'white',



    },

    
    },
    included:{
        backgroundColor: theme.palette.secondary.main,
        color: 'white',

    }
}));

const initialState = {
    title: 'Java dev',
    type: '',
    companyName: '',
    companyUrl: '',
    location: 'Remote',
    link: '',
    description: '',
    skills: [],
}

    
export default props => {
    // a state to handle loading when the user submits the form
    const [loading, setLoading] = useState(false);

    const [jobDetails, setJobDetails] = useState(initialState);
       


    const handleChange = event => {
        event.persist();
        setJobDetails(oldState => ({ ...oldState,
             [event.target.name]:
              event.target.value,
             }));

    };


    const addRemoveSkill = (skill) => 
        jobDetails.skills.includes(skill)
        // if skill is in the array, remove it

        ? setJobDetails(oldState => ({  // if skill is not in the array, add it
            ...oldState,
             skills: oldState.skills.filter((s) => s !== skill),
                }))
        // if skill is not in the array, add it
        :
        setJobDetails(oldState => 
            ({ ...oldState,
                skills: oldState.skills.concat(skill)
            }));

            
        
            const handleSubmit = async () =>{ // submit the form
                
                for (const field in jobDetails) {
                    if(typeof jobDetails[field] === 'string' && jobDetails[field].length === 0)
                        return ;
                        
                   
                }
                if(jobDetails.skills.length === 0)
                return; 

                setLoading(true);
                await props.postJob(jobDetails);
                closeModal();
            };

            //close the modal
            const closeModal = () => {
                setJobDetails(initialState);
                setLoading(false);
                props.closeModal();


            };
   

        



    const classes = useStyles();// useStyles() returns an object with all the classes

    const skills = [
        "Javascript",
        "React",
        "Node",
        "Express",
        "MongoDB",
        "Python",
        "Django",
        "Flask",
    ];
   
    console.log(jobDetails);//
    return(
        <Dialog open={props.newJobModal} fullWidth>
            <DialogTitle> 
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    Post Job
                    <IconButton onClick={closeModal}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent> 
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FilledInput
                        onChange={handleChange}
                        name="title"
                        value={jobDetails.title}
                         placeholder="Job title *" 
                         disableUnderlines fullWidth
                         />
                    </Grid>
                    <Grid item xs={6} >
                    <Select
                    onChange={handleChange}
                    name="type"
                    value={jobDetails.type}
                     fullWidth 
                    disableUnderline 
                    variant="filled" 
                    defaultValue="Full time"
                    >
                        <MenuItem value="Full time">Full time </MenuItem>
                        <MenuItem value="Part time">Part time</MenuItem>
                        <MenuItem value="Contract">Contract</MenuItem>

        </Select>
                    </Grid>

                    <Grid item xs={6}>
                        <FilledInput 
                        onChange={handleChange}

                        name="companyName"
                        value={jobDetails.companyName}
                        autoComplete="off"
                         placeholder="Company Name *" 
                         disableUnderlines 
                         fullWidth
                         />
                    </Grid>

                    <Grid item xs={6}>
                        <FilledInput 
                        onChange={handleChange} 
                        name="companyUrl"
                        value={jobDetails.companyUrl}
                        autoComplete="off"
                         placeholder="Company URL *"
                         disableUnderlines
                          fullWidth
                          />
                    </Grid>

                    <Grid item xs={6}>
                    <Select 
                    onChange={handleChange}
                    fullWidth 
                    name="location"
                    value={jobDetails.location}
                    disableUnderline 
                    variant="filled"
                    
                     >
                        <MenuItem value="Remote">Remote</MenuItem>
                        <MenuItem value="In-office">In-office</MenuItem>
            

        </Select>

                        </Grid>

                    <Grid item xs={6}>
                        <FilledInput 
                        onChange={handleChange}

                        name="link"
                        value={jobDetails.link}
                        autoComplete="off"
                         placeholder="Job Link *"
                         disableUnderlines
                          fullWidth
                          />
                    </Grid>

                    <Grid item xs={12}>
                        <FilledInput
                        onChange={handleChange}
                        name="description"
                        value={jobDetails.description}
                         placeholder="Job Descrtiption *"
                         disableUnderlines
                          fullWidth
                          multiline
                          rows={4}
                          />
                    </Grid>


                    </Grid>


            <Box mt={2}>
                <Typography>Skills*</Typography>
                <Box display="flex">
                {skills.map(skill =>
                     <Box  onClick={() => addRemoveSkill(skill)} 
                     className={`${classes.skillchip} ${jobDetails.
                        skills.includes(skill) && classes.included
                    }`}
                      key={skill}>
                         {skill}
                         </Box>
                         )}
                </Box>

            </Box>

            </DialogContent>

            <DialogActions>
                <Box 
                color="red"
                 width="100%"
                  display="flex"
                   justifyContent="space-between"
                    alignItems="center"
                    >

                    <Typography  variant="caption">*Required Fields</Typography>
                    <Button 
                     onClick={handleSubmit} // submit the form
                     variant="contained"
                     disableElevation
                     color="primary"
                     disabled={loading}
                     >   
                     {loading ?(
                     <CircularProgress color="seconary" size={20} />
                    ) :(
                        'Post Job'

                    )}
                    
                    </Button>
                </Box>

                </DialogActions>
        </Dialog>

    )

}