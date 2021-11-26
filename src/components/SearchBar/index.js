import React, { useState } from 'react';
import {
     Box,
      Button, 
      Select, 
      MenuItem,
       makeStyles,
        CircularProgress
    } from '@material-ui/core'
import { red } from '@material-ui/core/colors';


const useStyles = makeStyles({ 
    wrapper: {
        backgroundColor: '#f5f5f5',
        display: 'flex',
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        borderRadius: '5px',
        "& > *":{
            flex: 1, 
            height: "45px",
            margin: "8px"
        },
        
    },

}
)

export default (props) =>{
    const [loading, setLoading] = useState(false);
    const [jobSearch, setJobSearch] = useState(
        {
          type: 'Full time',
          location: 'Remote',  
        }
    );

    const handleChange = event => {
        event.persist();
        setJobSearch(oldState => ({ ...oldState,
             [event.target.name]:
              event.target.value,
             }));
};

const search = async () => {
 setLoading(true);
 await props.fetchJobsCustom(jobSearch)
    setLoading(false);
}

    const classes = useStyles(); // useStyles() returns an object with all the classes
    
    return(
    <Box p={2} mt={-5} mb={2} className={classes.wrapper}>
        <Select onChange={handleChange}  value={jobSearch.type} name="type" disableUnderline variant="filled">
            <MenuItem value="Full time">Full time </MenuItem>
            <MenuItem value="Part time">Part time</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>

        </Select>

        <Select onChange={handleChange} value={jobSearch.location} name="location" disableUnderline variant="filled" >
            <MenuItem value="Remote">Remote</MenuItem>
            <MenuItem value="In-office">In-office</MenuItem>
            

        </Select>
        <Button disabled={loading} 
        variant="contained"
         color="primary" 
         disableElevation
         onClick={search}
         >
        {loading ?(
                     <CircularProgress color="seconary" size={20} />
                    ) :(
                        'Search'

                    )}
        </Button>


    </Box>

    );
}
