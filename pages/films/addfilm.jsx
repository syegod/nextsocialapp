import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { OutlinedInput, Box, Chip, TextField, Select, FormControl, MenuItem, Checkbox, ListItemText } from '@mui/material';



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const genres = [
    'action',
    'drama',
    'adventure',
    'comedy',
    'crime',
    'fantasy',
    'horror',
    'mystery',
    'romance',
    'war',
    'thriller',
    'sci-fi'
];
const countries = [
    'usa',
    'england',
    'australia',
    'canada',
    'france',
    'germany',
    'austria',
    'ukraine',
    'italy',
    'spain',
    'japan',
    'china',
    'korea',
    'india',
    'norway'
]

const Addfilm = () => {
    const [form, setForm] = useState({
        title: '', description: '', genres: [], country: '', releaseDate: null
    })

    
    const handleGenres = (e) => {
        const {
            target: { value },
        } = e;
        setForm({
            ...form, ['genres']: typeof value === 'string' ? value.split(',') : value,
        });
    }

    const handleInputs = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleForm = async (e) => {
        e.preventDefault()
        console.log(form)
        if (!form.releaseDate) {
            return NotificationManager.error('Set release date!')
        }
        const response = await axios.post('/api/films/addfilm', { form }).catch(e => NotificationManager.error(e.response.data.message))
        if (response && response.status === 201) {
            return NotificationManager.success(response.data.message)
        } else if (response && response.status === 300) {
            return NotificationManager.error(response.data.message)
        }
    }

    return (
        <div className='flex flex-col w-full text-center my-16 max-w-[35ch] min-w-[5ch] gap-y-5'>
            <span className='text-4xl font-extrabold'>Add new film</span>
            <form onSubmit={e => handleForm(e)} className='flex flex-col gap-y-5 w-full'>
                <hr className='w-full'/>
                <div className='flex flex-col gap-y-1'>
                    <span className='text-2xl'>Title*:</span>
                    <TextField variant='standard' name="title" className='px-1' id="outlined-multiline-flexible" sx={{ bgcolor: 'white', borderRadius: '3px' }} onChange={handleInputs} multiline maxRows={2} required={true} />
                </div>
                <div className='flex flex-col gap-y-1'>
                    <span className='text-2xl'>Description*:</span>
                    <TextField variant='standard' name="description" id="outlined-multiline-flexible" className='pt-1 px-1' sx={{ bgcolor: 'white', borderRadius: '3px' }} onChange={handleInputs} multiline maxRows={5} required={true} />
                </div>

                <div className='flex flex-col'>
                    <span className='text-2xl'>Genre*:</span>
                    <FormControl sx={{  }}>
                        <Select
                            multiple
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            value={form.genres}
                            onChange={handleGenres}
                            name='genres'
                            sx={{ bgcolor: 'white' }}
                            size='small'
                            multiline
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}>
                            {genres.map((genre) => (
                                <MenuItem key={genre} value={genre}>
                                    <Checkbox checked={form.genres.indexOf(genre) > -1} />
                                    <ListItemText primary={genre.slice(0, 1)[0].toLocaleUpperCase() + genre.slice(1, genre.length)} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <span className='text-2xl'>Country*:</span>
                    <FormControl >
                        <Select
                            sx={{ bgcolor: 'white' }}
                            size='small'
                            name='country'
                            value={form.country}
                            onChange={handleInputs}
                            MenuProps={MenuProps}
                        >
                            {countries.map(c => (
                                <MenuItem key={c} value={c}>{c.slice(0, 1)[0].toLocaleUpperCase() + c.slice(1, c.length)}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <span className='text-2xl'>Release date*:</span>
                    <input type="date" className='w-full outline-none rounded-sm text-xl text-black text-center' onChange={e => setForm({ ...form, ['releaseDate']: new Date(e.target.value) })} />
                </div>
                <button type='submit' className='mt-5 bg-white text-violet-600 text-2xl shadow-lg rounded hover:scale-105 duration-300 outline-none'>Add film</button>
            </form >
        </div >
    );
}
export default Addfilm;