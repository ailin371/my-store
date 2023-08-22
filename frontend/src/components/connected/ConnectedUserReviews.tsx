import React, { useMemo, useState } from 'react';
import { Button, Typography, Rating, TextField, Box, SxProps, Divider } from '@mui/material';
import { useAppSelector } from '../../app/store';
import { selectUser } from '../../app/features/user/userSelectors';
import { useAddReviewMutation, useGetProductReviewsQuery, useUpdateReviewMutation } from '../../app/api';
import { AddReviewRequest } from '../../app/models';

interface UserReviewsProps {
    productId: number;
    sx?: SxProps;
}

const ConnectedUserReviews: React.FC<UserReviewsProps> = ({ productId, sx }) => {
    const { data: productReviews = [] } = useGetProductReviewsQuery({ productId });
    const [addReview] = useAddReviewMutation();
    const [updatedReview] = useUpdateReviewMutation();
    console.log(productReviews)

    const user = useAppSelector(selectUser);

    const sortedReviews = useMemo(() => {
        return [...productReviews].sort((a, b) => {
            if (a.userId === user.userId) return -1;
            if (b.userId === user.userId) return 1;
            return 0;
        });
    }, [productReviews, user.userId]);

    const hasPurchasedProduct = useMemo(() => {
        return sortedReviews.some(review => review.userId === user.userId);
    }, [sortedReviews, user]);
    const userReview = useMemo(() => sortedReviews.find(review => review.userId === user.userId), [sortedReviews, user.userId]);
    const [rating, setRating] = useState<number | null>(userReview?.rating || 4);
    const [comment, setComment] = useState<string>(userReview?.comment || '');

    const handleAddOrUpdateReview = () => {
        if (rating && comment) {
            const newReview: AddReviewRequest = {
                productId: productId,
                userId: user.userId,
                rating: rating,
                comment: comment,
            };

            // if the user already has a review - update it, otherwise - create it
            if (userReview) {
                updatedReview({
                    id: userReview.id,
                    ...newReview
                })
                    .unwrap()
                    .then(response => {
                        console.log('Success!', response);
                    })
                    .catch((error) => {
                        console.log('Error!', error);
                    });
            }
            else {
                addReview(newReview)
                    .unwrap()
                    .then(response => {
                        console.log('Success!', response);
                    })
                    .catch((error) => {
                        console.log('Error!', error);
                    });
            }
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
            {sortedReviews.length > 0 && <Divider sx={{ my: 2 }} />}
            <Typography variant="h5" gutterBottom>
                Reviews
            </Typography>
            {sortedReviews.map(review => (
                <div key={review.id}>
                    <Rating value={review.rating} readOnly />
                    <Typography variant="body2">{review.comment}</Typography>
                    <hr />
                </div>
            ))}
            {sortedReviews.length === 0 && <Typography>No reviews yet...</Typography>}
        </Box>
    );
};

export default ConnectedUserReviews;
