import React, { useState, useEffect, useContext } from 'react'

import "../../styles/tour.css"

// import SearchBar from '../../shared/SearchBar'

import { Container, Row, Col } from 'reactstrap'
import useFetch from '../../hooks/useFetch'
import { BASE_URL } from '../../utils/config'
import CommonSection from '../../shared/CommonSection'
import TourCard from '../../shared/Tourcard'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'



const DeleteTour = () => {

  const {backendUrl,aToken} = useContext(AdminContext)

  const [tours,setTours] = useState([])

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

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
      <CommonSection title={"My Tours"} />
      <section>
        <Container>
          <Row>
            {/* <SearchBar /> */}
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          {loading && <h4 className="text-center pt-5">Loading......</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {
             !loading && !error &&  <Row>
             {
               tours?.map(tour => (
                 <Col lg="3" className="mb-4" key={tour._id}>
                   <TourCard tour={tour}  />
                 </Col>
               ))}
 
             <Col lg="12">
              <div className="pagination d-flex align-items-center
               justify-content-center mt-4 gap-3">
               {[ ...Array(pageCount).keys()].map(number=>(
                <span 
                key={number} 
                onClick={() => setPage(number)}
                className={page===number ? "active__page":""}
                >
                 {number+1}
                </span>
               ))}
              </div>
             </Col>
           </Row>
          }
          
        </Container>

      </section>
    </>
  )
}

export default DeleteTour
