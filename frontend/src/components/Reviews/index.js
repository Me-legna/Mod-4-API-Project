import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSpotReviews } from '../../store/reviews'
import OpenModalButton from '../OpenModalButton'
import AllSingleReviews from './AllSingleReviews'
import CreateReviewFormModal from './CreateReviewFormModal'
import DeleteReviewModal from './DeleteReviewModal'
import solidStar from '../../assets/spotImages/star-solid.svg'
import './Reviews.css'


function Reviews() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const spot = useSelector(state => state.spots.singleSpot)
    const user = useSelector(state => state.session.user)
    const isOwner = spot?.ownerId === user?.id
    const spotReviews = useSelector(state => state.reviews.spot)
    const spotReviewsArr = Object.values(spotReviews)
    const userReview = spotReviewsArr.find(review => review?.userId === user?.id)
    // const forceUpdate = use
    console.log('ownerId', isOwner)

    useEffect(() => {
        dispatch(getSpotReviews(id))

    }, [dispatch, id])


    return (
        <div>
            <div>
                <div>
                    {isNaN(spot.avgStarRating)
                        ? (
                            <div></div>
                        )
                        : (
                            <div>
                                <img className="solid-star" src={solidStar} alt="solid-black-star" />
                                <span>{spot.avgStarRating}</span>
                                <span className="dot-space">·</span>
                                <span>{spot.numReviews} {spot.numReviews === 1 ? 'review' : 'reviews'}</span>
                            </div>
                        )}
                </div>
                <div>
                    {user
                        ? isOwner
                            ? (<div></div>)
                            : userReview
                                ? (
                                    <OpenModalButton
                                        buttonText='Delete Review'
                                        modalComponent={<DeleteReviewModal review={userReview} />}
                                    />
                                )
                                : (

                                    <OpenModalButton
                                        buttonText='Create Review'
                                        modalComponent={<CreateReviewFormModal />}
                                    />
                                )
                        : (
                            <div>Log in to create a Review</div>
                        )
                    }
                </div>

                <AllSingleReviews spotReviews={spotReviewsArr} />
            </div>

        </div>
    )
}

export default Reviews
