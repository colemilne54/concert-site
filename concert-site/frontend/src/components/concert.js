// import logo from './logo.svg';
// import './App.css';
import React, { useState, useEffect } from "react";
import ConcertDataService from "../services/concert"
import { Link } from "react-router-dom";



const Concert = props => {
  const initialConcertState = {
    id: null,
    bands: "",
    street: "",
    zipcode: "",
    venueType: "",
    genre: "",
    venue_name: ""
  };
  const [concert, setConcert] = useState(initialConcertState);

  const getConcert = id => {
    ConcertDataService.get(id)
      .then(response => {
        setConcert(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getConcert(props.match.params.id);
  }, [props.match.params.id]);

  const deleteConcert = (concert_id, index) => {
    ConcertDataService.deleteReview(concert_id, props.user.id)
      .then(response => {
        setConcert((prevState) => {
          prevState.genres.splice(index, 1)
          return({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
  };

// link on 62 may need / and thats it
// also this is for adding review for a concert
// we want to add a concert for a venue

  return (
    <div>
      {concert ? (
        <div>
          <h5>{concert.bands}</h5>
          <p>
            <strong>Cuisine: </strong>{concert.genres}<br/>
            <strong>Address: </strong>{concert.venue_name} {concert.street}, {concert.zipcode}
          </p>
          <Link to={"/concerts/" + props.match.params.id + "/review"} className="btn btn-primary">
            Add Review
          </Link>
          <h4> Reviews </h4>
          <div className="row">
            {concert.reviews.length > 0 ? (
             concert.reviews.map((review, index) => {
               return (
                 <div className="col-lg-4 pb-1" key={index}>
                   <div className="card">
                     <div className="card-body">
                       <p className="card-text">
                         {review.text}<br/>
                         <strong>User: </strong>{review.name}<br/>
                         <strong>Date: </strong>{review.date}
                       </p>
                       {props.user && props.user.id === review.user_id &&
                          <div className="row">
                            <a onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                            <Link to={{
                              pathname: "/concerts/" + props.match.params.id + "/review",
                              state: {
                                currentReview: review
                              }
                            }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                          </div>                   
                       }
                     </div>
                   </div>
                 </div>
               );
             })
            ) : (
            <div className="col-sm-4">
              <p>No genres yet.</p>
            </div>
            )}

          </div>

        </div>
      ) : (
        <div>
          <br />
          <p>No concert selected.</p>
        </div>
      )}
    </div>
  );
};

export default Concert;
