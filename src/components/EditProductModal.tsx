import type { FC } from 'react';
import { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { editProduct } from '../features/products/productsSlice';
import type { ISize, IProduct, IComments } from '../types/common';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import { StyledModal, ModalContent } from '../styles/index.styles';
import AddIcon from '@mui/icons-material/Add';


interface EditProductModalProps {
    isOpen: boolean;
    product: IProduct;
    onUpdate: () => void;
    onClose: () => void;
}



const EditProductModal: FC<EditProductModalProps> = ({ isOpen, product, onUpdate, onClose }) => {
    const [name, setName] = useState(product.name);
    const [count, setCount] = useState(product.count);
    const [imageUrl, setImageUrl] = useState(product.imageUrl);
    const [size, setSize] = useState<ISize>(product.size);
    const [weight, setWeight] = useState(product.weight);
    const [comments, setComments] = useState<IComments[]>(product.comments);
    const dispatch = useAppDispatch();

    const handleUpdate = (e: any) => {
        e.preventDefault();
        if (!name || !count || !imageUrl || !size.width || !size.height || !weight) {
            alert('Please fill in all fields.');
            return;
        }

        const updatedProduct: IProduct = {
            ...product,
            name,
            count,
            imageUrl,
            size,
            weight,
            comments,
        };

        dispatch(editProduct(updatedProduct));
        onUpdate();
        onClose();
    };

    const handleCommentChange = (index: number, value: string) => {
        const newComments = comments.map((comment, i) => 
            i === index ? { ...comment, description: value } : comment
        );
        setComments(newComments);
    };

    const handleAddComment = () => {
        setComments([
            ...comments, 
            { 
                id: comments.length + 1,
                description: '', 
                productId: product.id,
                date: new Date().toLocaleString('uk-UA', { 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    day: '2-digit', 
                    month: '2-digit', 
                    year: 'numeric' 
                }).replace(',', '') 
                }
            ]);
    };

    return (
        <StyledModal isOpen={isOpen} onRequestClose={onClose}>
            <ModalContent>
                <Typography variant="h6">Edit Product</Typography>
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
                            onChange={(e) => handleCommentChange(index, e.target.value)}
                            fullWidth
                            multiline
                        />
                    ))}
                    <IconButton onClick={handleAddComment} color="primary">
                        <AddIcon />
                    </IconButton>
                </Box>
                <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button variant="contained" color="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                </Box>
            </ModalContent>
        </StyledModal>
    );
};

export default EditProductModal;