import type { FC } from 'react';
import Modal from 'react-modal';
import type { IProduct } from '../types/common';
import { Box, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import { DetailsModalContent, CommentsSection, StyledModal } from '../styles/index.styles';
Modal.setAppElement('#root');

interface ProductDetailsProps {
    isOpen: boolean;
    product: IProduct;
    onClose: () => void;
    onEdit: () => void;
}

const ProductDetails: FC<ProductDetailsProps> = ({ isOpen, product, onClose, onEdit }) => {
    return (
        <StyledModal isOpen={isOpen} onRequestClose={onClose}>
            <DetailsModalContent elevation={3}>
                <Typography variant="h4" gutterBottom>
                    {product.name}
                </Typography>
                <Typography variant="body1">Count: {product.count}</Typography>
                <Box component="img" src={product.imageUrl} alt={product.name} sx={{ width: '100%', height: 'auto', marginTop: '1rem' }} />
                <Typography variant="body1">Weight: {product.weight}</Typography>
                <Typography variant="body1">Height: {product.size.height}</Typography>
                <Typography variant="body1">Width: {product.size.width}</Typography>
                <Button variant="contained" color="primary" onClick={onEdit} sx={{ marginTop: '1rem' }}>
                    Edit Product
                </Button>
                <CommentsSection>
                    <Typography variant="h5" gutterBottom>
                        Comments
                    </Typography>
                    {product.comments.length > 0 ? (
                        <List>
                            {product.comments.map((comment, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={comment.description} />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography variant="body2">No comments yet.</Typography>
                    )}
                </CommentsSection>
                <Button variant="outlined" onClick={onClose} sx={{ marginTop: '1rem' }}>
                    Close
                </Button>
            </DetailsModalContent>
        </StyledModal>
    );
};

export default ProductDetails;