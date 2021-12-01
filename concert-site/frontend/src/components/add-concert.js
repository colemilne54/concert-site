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
  //   const initialConcertState = {
  //     city: "",
  //     state:"",
  //     genre:"",
  //     bands:"",
  //     concert_id:"",
  //     venue_name:"",
  //     venueType:"",
  //     street:"",
  //     zipcode:"",
  //     link:"",
  //     date:""
  //  };

  

  // const [concert, setConcert] = useState(initialConcertState);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [genre, setGenre] = useState("");
  const [bands, setBands] = useState("");
  const [concert_id, setConcert_id] = useState("12345678");
  const [venue_name, setVenue_name] = useState("");
  const [venueType, setVenueType] = useState("");
  const [street, setStreet] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [link, setLink] = useState("");
  const [date, setDate] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const handleInputChangeCity = event => {
    setCity(event.target.value);
  };

  const handleInputChangeState = event =>{
    setState(event.target.value);
  };

  const handleInputChangeGenre = event => {
    setGenre(event.target.value);
  };

  const handleInputChangeBands = event => {
    setBands(event.target.value);
  };
  // for this concert id i need to genreate a random number for the id
  const handleInputChangeConcertId = event => {
    setConcert_id(event.target.value);
  };

  const handleInputChangeVenueName = event => {
    setVenue_name(event.target.value);
  };

  const handleInputChangeVenueType = event => {
    setVenueType(event.target.value);
  };

  const handleInputChangeStreet = event => {
    setStreet(event.target.value);
  };

  const handleInputChangeZipcode = event => {
    setZipcode(event.target.value);
  };

  const handleInputChangeLink = event => {
    setLink(event.target.value);
  };

  const handleInputChangeDate = event => {
    setDate(event.target.value);
  }

  const saveConcert = () => {
    var data = {
      city: city,
      state: state,
      genre: genre,
      bands: bands,
      concert_id: concert_id,
      venue_name: venue_name,
      venueType: venueType,
      street: street,
      zipcode: zipcode,
      link: link,
      date: date
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
            <h3>Please fill out the info fields with the information about your concert</h3>
          <form>
              
              <label htmlFor="description">{ "Add the  City:" }</label>
              
              <input
                type="text"
                className="form-control"
                id="text"
                required
                value={city}
                onChange={handleInputChangeCity}
                name="text"
              />

              <label htmlFor="description">{ "Add the State:" }</label>
              
              <input
                type="text"
                className="form-control"
                id="textState"
                required
                value={state}
                onChange={handleInputChangeState}
                name="textState"
              />

              <label htmlFor="description">{ "Add the Music Genre:" }</label>
              
              <input
                type="text"
                className="form-control"
                id="textGenre"
                required
                value={genre}
                onChange={handleInputChangeGenre}
                name="textGenre"
              />

              <label htmlFor="description">{ "Add the Band name:" }</label>
              
              <input
                type="text"
                className="form-control"
                id="textBands"
                required
                value={bands}
                onChange={handleInputChangeBands}
                name="textBands"
              />

              <label htmlFor="description">{ "Add the Venue Name:" }</label>
              
              <input
                type="text"
                className="form-control"
                id="textVenueName"
                required
                value={venue_name}
                onChange={handleInputChangeVenueName}
                name="textVenueName"
              />

              <label htmlFor="description">{ "Add the Venue Type:" }</label>
              
              <input
                type="text"
                className="form-control"
                id="textVenueType"
                required
                value={venueType}
                onChange={handleInputChangeVenueType}
                name="textVenueType"
              />

              <label htmlFor="description">{ "Add the Street Address:" }</label>
              
              <input
                type="text"
                className="form-control"
                id="textStreet"
                required
                value={street}
                onChange={handleInputChangeStreet}
                name="textStreet"
              />
              
              <label htmlFor="description">{ "Add the Zipcode:" }</label>
              
              <input
                type="text"
                className="form-control"
                id="textZipcode"
                required
                value={zipcode}
                onChange={handleInputChangeZipcode}
                name="textZipcode"
              />

                <label htmlFor="description">{ "Add the Website Link to buy tickets:" }</label>
              
              <input
                type="text"
                className="form-control"
                id="textLink"
                required
                value={Link}
                onChange={handleInputChangeLink}
                name="textLink"
              />

              <label htmlFor="description">{ "Add the Date of the Concert:" }</label>
              
              <input
                type="text"
                className="form-control"
                id="textDate"
                required
                value={date}
                onChange={handleInputChangeDate}
                name="textDate"
              />
            
            <button onClick={saveConcert} className="btn btn-success">
              Submit
            </button>
          
          </form>
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

