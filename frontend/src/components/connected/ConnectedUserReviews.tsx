import React, { useEffect, useMemo, useState } from 'react';
import { Button, Typography, Rating, TextField, Box, SxProps, Divider } from '@mui/material';
import { useAppSelector } from '../../app/store';
import { selectUser } from '../../app/features/user/userSelectors';
import { useAddReviewMutation, useGetProductReviewsQuery, useGetPurchaseHistoryQuery, useUpdateReviewMutation } from '../../app/api';
import { AddReviewRequest } from '../../app/models';

interface UserReviewsProps {
    productId: number;
    sx?: SxProps;
}

const ConnectedUserReviews: React.FC<UserReviewsProps> = ({ productId, sx }) => {
    const { data: productReviews = [] } = useGetProductReviewsQuery({ productId });
    const { data: purchases = [] } = useGetPurchaseHistoryQuery();
    const { data: reviews } = useGetProductReviewsQuery({ productId });
    const hasPurchasedProduct = useMemo(() => purchases.some(cartItem => cartItem.items.some(purchase => purchase.product.id === productId)), [purchases]);
    console.log(purchases, hasPurchasedProduct)
    console.log("reviews", reviews)

    const [addReview] = useAddReviewMutation();
    const [updatedReview] = useUpdateReviewMutation();

    const user = useAppSelector(selectUser);
    console.log(user)
    const sortedReviews = useMemo(() => {
        return [...productReviews].sort((a, b) => {
            if (a.user === user.id) return -1;
            if (b.user === user.id) return 1;
            return 0;
        });
    }, [productReviews, user.id]);

    const userReview = useMemo(() => sortedReviews.find(review => review.user === user.id), [sortedReviews, user.id]);

    const [rating, setRating] = useState<number | null>(userReview?.rating || 4);
    useEffect(() => {
        setRating(userReview?.rating ?? 4);
    }, [userReview?.rating])

    const [comment, setComment] = useState<string>(userReview?.comment || '');
    useEffect(() => {
        setComment(userReview?.comment ?? '');
    }, [userReview?.comment])

    console.log(sortedReviews)
    const handleAddOrUpdateReview = () => {
        if (rating && comment) {
            const newReview: AddReviewRequest = {
                product: productId,
                user: user.id,
                rating: rating,
                comment: comment,
            };

            // if the user already has a review - update it, otherwise - create it
            if (userReview) {
                updatedReview({
                    id: userReview.id,
                    ...newReview,
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
                console.log(newReview)
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
                <div key={review.id + review.comment + review.user}>
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
