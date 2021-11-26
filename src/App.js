import React, { useState, useEffect } from "react";
import { Box,
   Grid,
    ThemeProvider, 
    Typography, 
    CircularProgress,
     Button 
    } from "@material-ui/core";
import theme from "./theme/theme";
import Header from "./components/Header"
import SearchBar from "./components/SearchBar";
import JobCard from "./components/Job/JobCard";
import { firestore, app } from "./firebase/config";
import NewJobModal from "./components/Job/NewJobModal";
import { Close as CloseIcon } from '@material-ui/icons'
import ViewJobModal from "./components/Job/ViewJobModal";


// import jobData from './dummyData'; // initialally used dummy data

export default () =>{
    const [jobs, setJobs] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const [customSearch, setCustomSearch] = useState(false)
    // create state modal
    const [newJobModal, setNewJobModal] = useState(false);
    const [viewJob, setViewJob] = useState({});




    const fetchJobs = async () =>{
      setCustomSearch(false)
      setLoading(true); // set loading to true
      const req = await firestore // firestore is a collection of all the jobs
      .collection("jobs")
      .orderBy("postedOn", "desc")
      .get();
      const tempJobs = req.docs.map((job) =>({ 
        ...job.data(), 
        id: job.id,
         postedOn: job.data().postedOn.toDate(),
         }));
      
      setJobs(tempJobs);  // set the jobs to the tempJobs
      setLoading(false);
    };
  
    const fetchJobsCustom = async jobSearch =>{

      setLoading(true); // set loading to true
      setCustomSearch(true);
      const req = await firestore // firestore is a collection of all the jobs
      .collection("jobs")
      .orderBy("postedOn", "desc")
      .where("location", "==", jobSearch.location)
      .where("type", "==", jobSearch.type)
      .get();
      const tempJobs = req.docs.map((job) =>({
         ...job.data(),
          id: job.id,
           postedOn: job.data().postedOn.toDate()
           }));
      
      setJobs(tempJobs);  // set the jobs to the tempJobs
      setLoading(false);
    }
  
  


    

  // post jobs to firestore database
    const postJob = async jobDetails =>{
      await firestore.collection("jobs").add({
        ...jobDetails,
        postedOn: app.firestore.FieldValue.serverTimestamp()
      });
      fetchJobs()// fetch jobs again after posting

    };

    useEffect(() => {
        fetchJobs();
    } , [])

  return (
    <ThemeProvider theme={theme}>
        <Header openNewJobModal ={() => setNewJobModal(true)} />
        <NewJobModal closeModal={() => setNewJobModal(false)} 
        newJobModal={newJobModal} postJob={postJob} 
        />
        <ViewJobModal job={viewJob} closeModal={() =>setViewJob({})} />
        <Box mb={5}>
        <Grid container justify="center">
          <Grid item xs={10}>
            <SearchBar fetchJobsCustom={fetchJobsCustom} />

            {loading ? ( 
              <Box display="flex" justifyContent="center" mt={2}>
              <CircularProgress color="secondary" />
              </Box>
              ):  (
                <>
                { customSearch  && 
                
               ( <Box my={2} display="flex" justifyContent="flex-end">
                  <Button onClick={fetchJobs}>
                  <CloseIcon size={20} />
                  Custom Search
                  </Button>
                  </Box>
               )}
              {jobs.map((job) => 
                <JobCard open={() => setViewJob(job)} key={job.id} {...job} />
              )}
                </>
              )}
            </Grid>
        </Grid>
        </Box>
    </ThemeProvider>
  ); 
 };