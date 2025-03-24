import React, { useState, useEffect, useContext } from 'react'

import "../../styles/tour.css"



import { Container, Row, Col } from 'reactstrap'
import useFetch from '../../hooks/useFetch'
import CommonSection from '../../shared/CommonSection'
import TourCard from '../../shared/Tourcard'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import SearchBar from '../../shared/SearchBar'

const MyTour = () => {
  const [tours,setTours] = useState([])

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
   const {backendUrl,aToken} = useContext(AdminContext)

  const getTours = async () => {
    

    try {
      const response = await axios.get(`${backendUrl}/api/v1/tours`);
      console.log(response.data.data);
      setTours(response.data.data)  // Now you can access the data properly
    } catch (err) {
      console.error("Error fetching tours:", err);
    }
  }

  const {loading,error} = useFetch(`${backendUrl}/api/v1/tours`)
  
  const {data:tourCount} = useFetch(`${backendUrl}api/v1/tours/search/getTourCount`)


  useEffect(() => {
    const pages = Math.ceil(tourCount / 8);
    setPageCount(pages);
    window.scrollTo(0,0);
  }, [page,tourCount,tours]);

  useEffect(()=>{
    getTours()
  },[aToken])


  return (
    <>
      <CommonSection title={"All Tours"} />
  <section>
    <Container>
      <Row>
        <SearchBar />
      </Row>
    </Container>
  </section>
  <section className="pt-0">
    <Container>
      {loading && <h4 className="text-center pt-5">Loading......</h4>}
      {error && <h4 className="text-center pt-5">{error}</h4>}
      {!loading && !error && (
        <Row>
          {tours?.map((tour) => (
            <div className="tour-card-container" key={tour._id}>
              <TourCard tour={tour} />
            </div>
          ))}

          <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
            {[...Array(pageCount).keys()].map((number) => (
              <span
                key={number}
                onClick={() => setPage(number)}
                className={page === number ? "active__page" : ""}
              >
                {number + 1}
              </span>
            ))}
          </div>
        </Row>
      )}
    </Container>
  </section>

    </>
  )
}

export default MyTour
