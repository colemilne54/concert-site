// import React, { useState } from 'react';

// import addConcertImport from './imports/addConcertImport';

// export default function AddConcertForm() {

//     const [bands, setBands] = useState("");
//     const [genre, setGenre] = useState("");

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         const newConcert = {
//             bands,
//             genre
//         }
//         console.log(newConcert);
//     }

//     let concertData = {
//         handleSubmit,
//         setBands,
//         setGenre
//     }

//     return (
//         <div>
//             <div>
//                 <div>
//                     <addConcertImport concertState={concertData} />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default AddConcertForm;

import React, { useState } from "react";
import ConcertDataService from "../services/concert";
import { Link } from "react-router-dom";

const AddConcert = props => {
    const initialConcertState = {
      city: "",
      state:"",
      genre:"",
      bands:"",
      concert_id:"",
      venue_name:"",
      venueType:"",
      street:"",
      zipcode:"",
      link:"",
      date:""
   };

  

  const [concert, setConcert] = useState(initialConcertState);
  const [city, setCity] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    setConcert(event.target.value);
  };

  const saveConcert = () => {
    var data = {
      city: city

      // need help here
    };

    // if (editing) {
    //   data.review_id = props.location.state.currentReview._id
    //   RestaurantDataService.updateReview(data)
    //     .then(response => {
    //       setSubmitted(true);
    //       console.log(response.data);
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // } else {
      ConcertDataService.createConcert(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    // }

   };

  return (
    <div>
      {props.user ? (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={"/concerts-list/" + props.match.params.id} className="btn btn-success">
              Back to Concerts
            </Link>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="description">{ "Create" } City</label>
              <input
                type="text"
                className="form-control"
                id="text"
                required
                value={city}
                onChange={handleInputChange}
                name="text"
              />
            </div>
            <button onClick={saveConcert} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>

      ) : (
      <div>
        Please log in.
      </div>
      )}

    </div>
  );
};

export default AddConcert;

