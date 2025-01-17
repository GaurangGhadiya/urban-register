import MainLayout from '@/layout/MainLayout'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import style from './TransferList.module.css'
import { FormControl, FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material';
import CreateFamily from './stapper/CreateFamily';
import AddMemberInFamily from './AddMemberInFamily';

const ruralData = () => {
    const [dataArray, setDataArray] = useState([]);
    const [selectedValue, setSelectedValue] = useState("1")
    const route = useRouter()

    useEffect(() => {
        const storedData = sessionStorage.getItem('transferData');
        setDataArray(JSON.parse(storedData));
    }, []);
    return (
        <MainLayout>
            <div className={style.heading} style={{ marginBottom: "10px", }}>Rural to Urban Transfer</div>
            <Grid container spacing={5}>
                <Grid item md={12} >
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={selectedValue}
                            onChange={(e) => setSelectedValue(e.target.value)}
                            name="radio-1-group"
                            row
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Add Member in Existing Parivar " />
                            <FormControlLabel value="2" control={<Radio />} label="Create New Parivar" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>

            {selectedValue == 1 && <AddMemberInFamily selectedFamilyMember={dataArray} />}
            {selectedValue == 2 && <CreateFamily dataArray={dataArray} />}


        </MainLayout>
    )
}

export default ruralData
