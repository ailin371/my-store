import React, { useEffect, useMemo, useState } from 'react';
import { Button, Typography, Rating, TextField, Box, SxProps, Divider } from '@mui/material';
import Review from '../../models/Review';
import { useAppSelector } from '../../app/store';
import { selectUser } from '../../app/features/user/userSelectors';

interface UserReviewsProps {
    productId: number;
    hasPurchasedProduct: boolean;
    initialReviews: Review[];
    sx?: SxProps;
}

const ConnectedUserReviews: React.FC<UserReviewsProps> = ({ productId, hasPurchasedProduct, initialReviews, sx }) => {
    const user = useAppSelector(selectUser);

    const sortedReviews = useMemo(() => {
        return [...initialReviews].sort((a, b) => {
            if (a.userId === user.userId) return -1;
            if (b.userId === user.userId) return 1;
            return 0;
        });
    }, [initialReviews, user.userId]);

    const [reviews, setReviews] = useState<Review[]>(sortedReviews);

    const userReview = useMemo(() => reviews.find(review => review.userId === user.userId), [reviews, user.userId]);
    const [rating, setRating] = useState<number | null>(userReview?.rating || 4);
    const [comment, setComment] = useState<string>(userReview?.comment || '');

    const handleAddOrUpdateReview = () => {
        if (rating && comment) {
            const newReview: Review = {
                id: userReview?.id || Date.now(), // TODO: ID should be generated in backend
                productId: productId,
                userId: user.userId,
                rating: rating,
                comment: comment,
                createdAt: userReview?.createdAt || new Date() // TODO: Date should be generated in backend
            };

            // TODO: save to backend
            setReviews(prev => {
                const updatedReviews = [newReview, ...prev.filter(review => review.userId !== user.userId)];
                return updatedReviews.sort((a, b) => {
                    if (a.userId === user.userId) return -1;
                    if (b.userId === user.userId) return 1;
                    return 0;
                });
            });
        }
    };

    return (
        <Box sx={sx}>
            {hasPurchasedProduct && (
                <div>
                    <Rating
                        value={rating}
                        onChange={(_event, newValue) => setRating(newValue)}
                    />
                    <TextField
                        label="Comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        fullWidth
                        required
                    />
                    <Button
                        variant="contained"
                        onClick={handleAddOrUpdateReview}
                        sx={{ mt: 1 }}
                        disabled={!comment.trim()}
                    >
                        {userReview ? 'Update Review' : 'Submit Review'}
                    </Button>
                </div>
            )}
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" gutterBottom>
                Reviews
            </Typography>
            {reviews.map(review => (
                <div key={review.id}>
                    <Rating value={review.rating} readOnly />
                    <Typography variant="body2">{review.comment}</Typography>
                    <hr />
                </div>
            ))}
        </Box>
    );
};

export default ConnectedUserReviews;
