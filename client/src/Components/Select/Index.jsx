import { InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import FormControl from '@mui/material/FormControl';

const Index = ({ data, setData }) => {
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        let value = event.target.value;
        setAge(value);
        if(value == 'Order By Latest')
        {
            const newData = [...data].sort((d1, d2) => new Date(d2.createdAt).getTime() - new Date(d1.createdAt).getTime())         // for latest
            setData(newData)
        }
        else
        {
            const newData = [...data].sort((d1, d2) => new Date(d1.createdAt).getTime() - new Date(d2.createdAt).getTime())      // for older   
            setData(newData)
        }
    };

    return (
        <>
        <FormControl fullWidth sx={{background:'white'}}>
        <InputLabel id="demo-simple-select-label">Order By</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
            sx={{heigth:'30px',p:'0'}}
        >
            <MenuItem sx={{p:'13px 10px'}} value={"Order By Latest"}>Order By Latest</MenuItem>
            <MenuItem sx={{p:'13px 10px'}} value={'Order By Oldest'}>Order By Oldest</MenuItem>
        </Select>
        </FormControl>




            {/* <InputLabel id="demo-simple-select-label">Sory By</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-helper"
                /valueage
                label="Age"
                onChange={handleChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem selected value={"Order By Latest"}>Order By Latest</MenuItem>
                <MenuItem value={20}>Order By Oldest</MenuItem>
            </Select> */}
        </>
    )
}
export default Index