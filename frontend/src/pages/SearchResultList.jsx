import React, {useState} from 'react'
import CommonSection from '../shared/CommonSection.jsx'
import { Container ,Row , Col} from 'reactstrap'

import { useLocation } from 'react-router-dom'
import TourCard from '../shared/Tourcard.jsx'
import Newsletter from '../shared/Newsletter.jsx'
import Footer from '../components/Footer/Footer.jsx'

const SearchResultList = () => {

  const location =useLocation();
  const [data] = useState(location.state);
  //console.log(data);



  return (
    <>
      <CommonSection title={'Tour Search- Result'} />
      <section>
  <div className="container">
    <div className="row">
      {
        data.length === 0 ? 
        <h4 className="text-center">No tour found</h4> 
        : data?.map(tour => (
          <div  key={tour._id}>
            <TourCard tour={tour} />
          </div>
        ))
      }
    </div>
  </div>
</section>
      <Newsletter />
      <Footer/>
    </>
  )
}

export default SearchResultList
