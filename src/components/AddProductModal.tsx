import type { FC } from 'react';
import { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { addProduct } from '../features/products/productsSlice';
import type { ISize, IProduct, IComments } from '../types/common';
import { Box, Button, TextField, Typography } from '@mui/material';
import { StyledModal, ModalContent } from '../styles/index.styles';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AddProductModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const AddProductModal: FC<AddProductModalProps> = ({ isOpen, onRequestClose }) => {
    const [name, setName] = useState('');
    const [count, setCount] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [size, setSize] = useState<ISize>({ width: 0, height: 0 });
    const [weight, setWeight] = useState('');
    const [comments, setComments] = useState<IComments[]>([]);
    const dispatch = useAppDispatch();
    const productId = Date.now();

    const handleAddProduct = async () => {
        if (!name || count <= 0 || !imageUrl || size.width <= 0 || size.height <= 0 || !weight) {
            alert('Please fill in all fields correctly.');
            return;
        }

        const newProduct: IProduct = {
            id: productId,
            name,
            count,
            imageUrl,
            size,
            weight,
            comments,
        };

        try {
            await fetch('http://localhost:3001/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct)
            })

            dispatch(addProduct(newProduct));
        } catch (e: any) {
            console.error('Failed to save product', e);
        } finally {
            setName('');
            setCount(0);
            setImageUrl('');
            setSize({ width: 0, height: 0 });
            setWeight('');
            setComments([]);
        }
        onRequestClose();
    };

    return (
        <StyledModal isOpen={isOpen} onRequestClose={onRequestClose}>
            <ModalContent>
                <Typography variant="h6">Add New Product</Typography>
                <TextField
                    label="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Product Count"
                    type="number"
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                    fullWidth
                />
                <TextField
                    label="Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Size (Width)"
                    type="number"
                    value={size.width}
                    onChange={(e) => setSize({ ...size, width: Number(e.target.value) })}
                    fullWidth
                />
                <TextField
                    label="Size (Height)"
                    type="number"
                    value={size.height}
                    onChange={(e) => setSize({ ...size, height: Number(e.target.value) })}
                    fullWidth
                />
                <TextField
                    label="Weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    fullWidth
                />
                <Box>
                    <Typography variant="body1">Comments:</Typography>
                    {comments.map((comment, index) => (
                        <TextField
                            key={index}
                            value={comment.description}
                            onChange={(e) => {
                                const newComments = [...comments];
                                newComments[index].description = e.target.value;
                                setComments(newComments);
                            }}
                            fullWidth
                            multiline
                        />
                    ))}
                    <IconButton
                        onClick={() => setComments([...comments, { 
                            id: Date.now(), 
                            description: '', 
                            productId, 
                            date: new Date().toLocaleString('uk-UA', { 
                                hour: '2-digit', 
                                minute: '2-digit', 
                                day: '2-digit', 
                                month: '2-digit', 
                                year: 'numeric' 
                            }).replace(',', '') 
                        }])}
                        color="primary"
                        >
                        <AddIcon />
                    </IconButton>
                </Box>
                <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button variant="contained" color="primary" onClick={handleAddProduct}>
                        Add Product
                    </Button>
                    <Button variant="outlined" onClick={onRequestClose}>
                        Cancel
                    </Button>
                </Box>
            </ModalContent>
        </StyledModal>
    );
};

export default AddProductModal;