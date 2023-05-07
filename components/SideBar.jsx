import React, { useState } from 'react';
import { Box, Slider, FormControl, Select, OutlinedInput, MenuItem, Checkbox, ListItemText, Chip } from '@mui/material';
import axios from 'axios';


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

const SideBar = (props) => {
    const { setFilmList, setLoading, filmList, getAllFilms, isOpen, setIsOpen } = props
    const defaultFilter = { rating: [0, 10], year: [1970, 2025], genres: [], country: null }

    const [filter, setFilter] = useState(defaultFilter)

    async function handleForm(e) {
        e.preventDefault()
        console.log(filter)
        setLoading(true)
        const response = await axios.post('/api/films/getfilteredfilms', { filter }).catch(error => console.log(error))
        if (response && response.status === 200) {
            console.log('Ok!')
            setFilmList(response.data)
            console.log(filmList)
        }
        setLoading(false)
    }

    function handleYear(e, newValue) {
        setFilter({ ...filter, ['year']: newValue })
    }

    function handleGenres(e) {
        const {
            target: { value },
        } = e;
        setFilter({
            ...filter, ['genres']: typeof value === 'string' ? value.split(',') : value,
        });
    }

    function handleCountry(e) {
        setFilter({ ...filter, ['country']: e.target.value })
    }

    function handleRating(e, newValue) {
        setFilter({ ...filter, ['rating']: newValue })
    }

    return (
        <>
            <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} className={`fixed bg-gradient-to-b from-blue-500 to-cyan-500 left-0 top-0 z-10 h-screen bg-black w-72 text-2xl ${!isOpen && `-translate-x-72 sm:-translate-x-48`} ${isOpen && 'overflow-y-auto overflow-x-hidden'} duration-300 px-5 py-36`}>
                <form onSubmit={handleForm} className='flex flex-col items-center gap-y-10 h-full'>
                    <i className="block sm:hidden fa-solid fa-xmark text-3xl absolute top-20 right-5 cursor-pointer" onClick={() => setIsOpen(false)}></i>
                    <span className='text-3xl font-medium'>FILTER</span>
                    <hr className='bg-slate-300 w-full' />
                    <span className='text-lg select-none cursor-pointer flex items-center gap-x-2' onClick={() => { getAllFilms(); setIsOpen(false); return setFilter(defaultFilter) }}>Remove all filters <i className="fa-solid fa-xmark"></i></span>
                    <div className='flex flex-col gap-y-1 items-center w-full'>
                        Year
                        <Box sx={{ width: '100%' }}>
                            <Slider
                                name='year'
                                value={filter.year}
                                min={1970}
                                max={2025}
                                step={1}
                                onChange={handleYear}
                                getAriaLabel={() => 'Temperature range'}
                                valueLabelDisplay="auto"
                            />
                        </Box>
                    </div>
                    <div className='flex flex-col gap-y-1 items-center w-full'>
                        Rating
                        <Box sx={{ width: '100%' }}>
                            <Slider
                                name='rating'
                                value={filter.rating}
                                min={1}
                                max={10}
                                step={1}
                                onChange={handleRating}
                                getAriaLabel={() => 'Temperature range'}
                                valueLabelDisplay="auto"
                            />
                        </Box>
                    </div>
                    <div className='flex flex-col gap-y-1 items-center w-full'>
                        Genres
                        <FormControl sx={{ width: '100%' }}>
                            <Select
                                multiple
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                value={filter.genres}
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
                                        <Checkbox checked={filter.genres.indexOf(genre) > -1} />
                                        <ListItemText primary={genre.slice(0, 1)[0].toLocaleUpperCase() + genre.slice(1, genre.length)} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className='flex flex-col gap-y-1 items-center w-full'>
                        Country
                        <FormControl sx={{ width: '100%' }}>
                            <Select
                                sx={{ bgcolor: 'white' }}
                                size='small'
                                name='country'
                                value={filter.country}
                                onChange={handleCountry}
                                MenuProps={MenuProps}
                            >
                                {countries.map(c => (
                                    <MenuItem key={c} value={c}>{c.slice(0, 1)[0].toLocaleUpperCase() + c.slice(1, c.length)}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <button className='bg-violet-500 px-3 py-1 shadow-lg mb-10 rounded-sm hover:-translate-y-1 hover:translate-x-1 duration-300' onClick={() => setIsOpen(false)}>Update</button>
                </form>
            </div>
        </>
    );
}

export default SideBar;
