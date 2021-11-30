import React, { useState } from "react";
import ConcertDataService from "../services/concert";
import { Link } from "react-router-dom";
import '../style.css';

// const Concert = props => {
//   const initialConcertState = {
//     id: null,
//     user_name: "",
//     user_id: "",
//     bands: "",
//     street: "",
//     zipcode: "",
//     venueType: "",
//     genre: "",
//     venue_name: "",
//     date: "",
//     link: "",
//     state: "",
//     city: ""
//   };
//   const [concert, setConcert] = useState(initialConcertState);

const AddConcert = props => {
  let initialConcertState = {
    id: null,
    user_name: "",
    user_id: "",
    bands: "",
    street: "",
    zipcode: "",
    venueType: "",
    genre: "",
    venue_name: "",
    date: "",
    link: "",
    state: "",
    city: ""
  };

  let editing = false;

  // figure out the props.etc.etc
  if (props.location.state && props.location.state.currentConcert) {
    editing = true;
    initialConcertState = props.location.state.currentReview.text
  }

  const [concert, setConcert] = useState(initialConcertState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    setConcert(event.target.value);
  };

  const saveConcert = () => {
    // TODO: Change to list like 
    var data = {
      text: concert,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: props.match.params.id
    };

    if (editing) {
      data.review_id = props.location.state.currentReview._id
      ConcertDataService.updateConcert(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      ConcertDataService.createConcert(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

  };

  return (
    <div>
      {props.user ? (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={"/restaurants/" + props.match.params.id} className="btn btn-success">
              Back to Concerts
            </Link>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="description">{ editing ? "Edit" : "Create" } Concert</label>
              <input
                type="text"
                className="form-control"
                id="text"
                required
                value={concert}
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