import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './tour-card.css'
import calculateAvgRating from '../utils/avgRating'
import { AdminContext } from '../context/AdminContext'

const TourCard = ({ tour }) => {
  const { _id, title, city, photo, price, featured, reviews } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const {aToken,deleteTour} = useContext(AdminContext)

  return (
<div className="tour__card">
  <div className="tour__card-inner">
    <div className="tour__img">
      <img src={photo} alt="tour-img" />
      {featured && <span>Featured</span>}
    </div>
    <div className="card__body">
      <div className="card__top d-flex align-items-center justify-content-between">
        <span className="tour__location d-flex align-items-center gap-1">
          <i className="ri-map-pin-line"></i>{city}
        </span>
        <span className="tour__rating d-flex align-items-center gap-1">
          <i className="ri-star-fill"></i>{avgRating === 0 ? null : avgRating}
          {totalRating === 0 ? ('Not Rated') : (<span>({reviews.length})</span>)}
        </span>
      </div>
      <h5 className="tour__title">
        <Link to={`/tours/${_id}`}>{title}</Link>
      </h5>
      <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
        <h5>₹{price} <span> /per person</span></h5>

        {aToken ? (
          ""
        ) : (
          <button className="btn booking__btn">
            <Link to={`/tours/${_id}`} className="booking__link">Book Tour</Link>
          </button>
        )}
      </div>
    </div>
  </div>
</div>

  )
}

export default TourCard
