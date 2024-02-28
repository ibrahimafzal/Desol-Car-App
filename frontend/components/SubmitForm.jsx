import React, { useState } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Grid,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    InputLabel,
    Select,
    MenuItem,
    Input,
    CircularProgress,
    FormHelperText,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

const SubmitForm = () => {
    const [carModel, setCarModel] = useState('');
    const [price, setPrice] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [city, setCity] = useState('lahore');
    const [maxPictures, setMaxPictures] = useState(1);
    const [selectedPictures, setSelectedPictures] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [uploadError, setUploadError] = useState('');

    const router = useRouter()

    const handleCarModelChange = (e) => {
        setCarModel(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleMaxPicturesChange = (e) => {
        setMaxPictures(Number(e.target.value));
        setSelectedPictures([]);
        setUploadError('');
    };

    // ****** Image Uploader Starts ****** //
    const uploadImages = (files) => {
        if (files?.length !== maxPictures) {
            setUploadError(`Please upload exactly ${maxPictures} pictures.`);
            return;
        }

        const uploadedImages = [];

        const uploadPromises = Array.from(files).map((file) => {
            return new Promise((resolve, reject) => {
                if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg") {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('upload_preset', 'upload');
                    formData.append('cloud_name', 'cloudinaryphoto');

                    fetch("https://api.cloudinary.com/v1_1/cloudinaryphoto/image/upload", {
                        method: 'post',
                        body: formData
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            uploadedImages.push({
                                public_id: res.public_id,
                                url: res.url.toString()
                            });
                            console.info('Pics uploaded successfully!')
                            resolve();
                        })
                        .catch((err) => {
                            reject(err);
                        });
                } else {
                    reject("Please select images in JPEG/JPG or PNG format only!");
                }
            });
        });

        Promise.all(uploadPromises)
            .then(() => {
                setSelectedPictures(uploadedImages)
            })
            .catch((error) => {
                console.error(error);
            });
    };
    // ****** Image Uploader Ends ****** //


    const handlePictureChange = (e) => {
        const files = e.target.files;
        uploadImages(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            await axios.post('https://desol-car-app-backend.vercel.app/api/cars/create', {
                carModel,
                price,
                phoneNumber,
                maxPictures,
                city,
                images: selectedPictures,
            });
            setCarModel('')
            setPrice("")
            setPhoneNumber('')
            setMaxPictures('')
            setCity('')
            setSelectedPictures([])
            router.push('/carslist')
        } catch (error) {
            console.error(error);
            setError('Error submitting form. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <div>
                <Typography component="h1" variant="h5" align="center" style={{ marginBottom: "20px" }}>
                    Submit Car Details
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Car Model"
                                variant="outlined"
                                type="text"
                                value={carModel}
                                onChange={handleCarModelChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Price"
                                variant="outlined"
                                type="number"
                                value={price}
                                onChange={handlePriceChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                variant="outlined"
                                type="tel"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                            <Typography variant="subtitle1" gutterBottom style={{ marginBottom: "0px" }}>
                                City
                            </Typography>
                            <FormControl component="fieldset" >
                                <RadioGroup
                                    row
                                    aria-label="city"
                                    name="city"
                                    value={city}
                                    onChange={handleCityChange}
                                >
                                    <FormControlLabel
                                        value="lahore"
                                        control={<Radio />}
                                        label="Lahore"
                                    />
                                    <FormControlLabel
                                        value="karachi"
                                        control={<Radio />}
                                        label="Karachi"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="max-pictures-label">No. of Pictures</InputLabel>
                                <Select
                                    label="Max Pictures"
                                    value={maxPictures}
                                    onChange={handleMaxPicturesChange}
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                                        <MenuItem key={number} value={number}>
                                            {number}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel>Upload Pictures</InputLabel>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => handlePictureChange(e)}
                                style={{ display: 'none' }}
                                id="upload-pictures"
                                required
                            />
                            <label htmlFor="upload-pictures">
                                <Button component="span" variant="outlined" color="primary">
                                    Select Pictures
                                </Button>
                            </label>
                            <Grid container spacing={1} style={{ marginTop: "5px" }}>
                                {selectedPictures?.map((image, index) => (
                                    <Grid item key={index}>
                                        <img src={image?.url} alt={`Uploaded ${index + 1}`} width="100" height="100" style={{ position: "relative" }} />
                                    </Grid>
                                ))}
                            </Grid>
                            {uploadError && (
                                <FormHelperText error sx={{ mt: 1 }}>
                                    {uploadError}
                                </FormHelperText>
                            )}
                        </Grid>
                    </Grid>
                    {loading && <CircularProgress sx={{ mt: 2 }} />}
                    {error && (
                        <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        Submit
                    </Button>
                </form>
                <Link href={'/carslist'}>
                    <Button
                        type='button'
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        View all cars
                    </Button>
                </Link>
            </div>
        </Container>
    );
};

export default SubmitForm;