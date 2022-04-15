import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { capitalize } from 'lib/Utilities';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useRouter } from 'next/router';

const CreateList = (props) => {
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState('');
    const [currentAmount, setCurrentAmount] = useState(1);
    const router = useRouter();

    const onChange = (e) => {
        switch(e.target.name) {
            case 'item':
                setCurrentItem(e.target.value);
                break;
            case 'amount':
                setCurrentAmount(e.target.value);
                break;
        }
    }

    const onAdd = () => {
        if(currentItem != '' && currentAmount != 0) {
            setItems([...items, { name: capitalize(currentItem), amount: currentAmount }]);
            setCurrentItem('');
            setCurrentAmount(1);
        }
    }

    const onKeyPress = (e) => {
        if(e.which == 13) {
            onAdd();
        }
    }

    const onSave = async (e) => {
        let response;
        try {
            response = await axios.post('/api/list/create', { items: items });
            if(response.status == 200) {
                router.push('/shopping');
            }
            
        }
        catch(e) {
            console.log(e);
        }
    }

    return (
        <Box>
            <h1>Create a new list</h1>
            {items.map(el => (
                <Box sx={{ display: 'flex', width: '30%', justifyContent: 'space-between', mb: '10px' }}>
                    {el.name}
                    <Box>
                        <Button sx={{ backgroundColor: 'blue' }}>
                            <EditIcon sx={{ color: 'white' }} />
                        </Button>
                        <Button sx={{ backgroundColor: 'red' }}>
                            <DeleteIcon sx={{ color: 'white' }} />
                        </Button>
                    </Box>
                </Box>
            ))}
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '30%' }}>
                <TextField name='item' onChange={onChange} value={currentItem} onKeyPress={onKeyPress} />
                <TextField type='number' name='amount' defaultValue='1' onChange={onChange} value={currentAmount} onKeyPress={onKeyPress} />
                <Button variant='contained' sx={{ height: '55px', mb: '10px' }} onClick={onAdd}>Add</Button>
                <Button variant='contained' sx={{ height: '55px', backgroundColor: 'green' }} onClick={onSave}>Save</Button>
            </Box>
        </Box>
    )
}

export default CreateList;