import React, { useEffect, useState } from "react";
import { Typography, Box, Grid, Container } from "@mui/material";
import moment from "moment";
import AppButton from "../Button/Index";
import { AiOutlinePlus } from "react-icons/ai";
import AppCard from "../Card/Index";
import Search from "../Search/Index";
import AppSelect from "../Select/Index";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncDeleteProject,
  asyncGetProjects,
} from "../../Store/Project/ProjectAsync";
import { IMG_URL } from "../../Services/api";
import { NestCamWiredStandTwoTone } from "@mui/icons-material";
import dayjs from 'dayjs';

const AppProject = ({ projectType }) => {
  const navigate = useNavigate();
  const { searchValue } = useSelector((s) => s.project);
  const { user } = useSelector((s) => s.user);
  const [state, setState] = useState(false);
  const dispatch = useDispatch();
  const [data,setData] = useState([])
  function getProjects() {
    dispatch(asyncGetProjects(user._id));
  }
  useEffect(() => {
    getProjects();
  }, [state]);

  useEffect(()=>{
    setData(projectType)
  },[projectType])

  if (!!searchValue) {
    const newData = projectType?.filter((v) => {
      return v.projectName.toLowerCase() == searchValue.toLowerCase();
    });
    setData(newData)
  }
  const handleDelete = async (id) => {
    let confirm = window.confirm("Are you sure? you want to delete this item?");
    if (confirm) {
      try {
        let res = await dispatch(asyncDeleteProject(id)).unwrap();
        if (res.success || !res.success) {
          setState(true);
          if (state) setState(false);
          alert(res.message);
        }
      } catch (err) {
        alert(err);
      }
    }
  };
  const handleEdit = (data) => {
    navigate("/project", { state: data });
  };
  const handleDate = (date) => {
    if(date){
      let DateData =date.split(' ');
      console.log(date);
      return `${DateData[0]}, ${DateData[2]} ${DateData[1]} ${DateData[3]}`;
    }
    else
    {
      return null;
    }
  }

  return (
    <div>
      <Container maxWidth="xl">
        <Box
          display="flex"
          marginTop={3}
          marginBottom={3}
          justifyContent="flex-end"
        >
          <AppButton
            value="Add New Project"
            onClick={() => navigate("/project")}
            icon={<AiOutlinePlus />}
            variant="contained"
          />
        </Box>
        <Box display="flex" alignItems="flex-end" justifyContent="space-between">
          <Typography variant="h4" marginTop={2}>
            All Projects
          </Typography>
          <Box  width="40%" display="flex" gap="1rem" >
            <Box width="60%">
               <Search />
            </Box>
            <Box width="40%">
              <AppSelect data={data} setData={setData} />
            </Box>
          </Box>
        </Box>
      </Container>
      <Box marginTop={3}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {data && data.length ? (
              data.map((item, index) => {
                let mydate = moment(item.createdAt).format("MMM Do, YYYY");
                return (
                  <Grid key={index} item xs={12} sm={6} md={4}>
                    <AppCard
                      sx={{boxShadow:"0px 3px 13px -9px rgb(0 0 0 / 50%)"}}
                      handleDelete={() => handleDelete(item._id)}
                      handleEdit={() => handleEdit(item)}
                      title={item.projectName}
                      subtitle={mydate}
                      image={IMG_URL + item.uploadImage}
                      desc={item.description}
                      liveUrl={item.liveUrl}
                      strDate={handleDate(item.strDate)}
                      gitHubUrl={item.gitHubLink}
                      status={item.status}
                      id={item._id}
                    />
                  </Grid>
                );
              })
            ) : (
              <Container maxWidth="xl">
                <Typography variant="body2">No Data found!</Typography>
              </Container>
            )}
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default AppProject;
