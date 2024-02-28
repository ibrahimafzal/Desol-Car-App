import React, { useEffect, useState } from 'react'
import CarItem from '../components/CarItem'
import Link from "next/link"
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import axios from 'axios'

const carslist = () => {

    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(false)

    const getCars = async () => {
        setLoading(true)
        try {
            const response = await axios.get(
                `http://localhost:5000/api/cars/`
            );
            setCars(response.data.getCars)
            setLoading(false)
            setData(response?.data);
        } catch (error) {
            setLoading(false)
            console.error('Error fetching cars:', error.message);
        }
    };

    useEffect(() => {
        getCars();
    }, []);

    console.log("cars =", cars);

    return (
        <Box>
            {
                loading ?
                    <Box display='flex' alignItems='center' justifyContent='center' height='100vh'>
                        <CircularProgress />
                    </Box> : <>
                        <Link href={'/submitpage'}>
                            <Button variant="contained" sx={{ marginTop: "3rem" }}>Add Car</Button>
                        </Link>
                        <Box display='flex' alignItems='center' justifyContent='center' gap={5}>
                            {cars.length > 0 ? cars?.map((car) => (
                                <CarItem key={car?._id} car={car} />
                            )) :
                                <Typography>
                                    No Cars
                                </Typography>
                            }
                        </Box>
                    </>
            }

        </Box>
    )
}

export default carslist