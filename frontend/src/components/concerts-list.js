import React, { useState, useEffect } from "react";
import ConcertDataService from "../services/concert";
import { Link } from "react-router-dom";
import '../style.css';

const ConcertsList = props => {

    const [concerts, setConcerts] = useState([]);
    const [searchBands, setSearchBands] = useState("");
    const [searchVenueName, setSearchVenueName] = useState("");
    const [searchCity, setSearchCity] = useState("");

    const [searchGenre, setSearchGenre] = useState("");
    const [searchVenueType, setSearchVenueType] = useState("");

    const [genres, setGenres] = useState(["All Genres"]);
    const [venueTypes, setVenueTypes] = useState(["All Venue Types"]);


    useEffect(() => {
        retrieveConcerts();
        retrieveGenres();
        retrieveVenueTypes();
    }, []);

    const onChangeSearchBands = e => {
        const searchBands = e.target.value;
        setSearchBands(searchBands);
    };

    const onChangeSearchVenueName = e => {
        const searchVenueName = e.target.value;
        setSearchVenueName(searchVenueName);
    };

    const onChangeSearchCity = e => {
        const searchCity = e.target.value;
        setSearchCity(searchCity);
    };

    const onChangeSearchGenre = e => {
        const searchGenre = e.target.value;
        setSearchGenre(searchGenre);
    };

    const onChangeSearchVenueType = e => {
        const searchVenueType = e.target.value;
        setSearchVenueType(searchVenueType);
    };

    const retrieveConcerts = () => {
        ConcertDataService.getAll()
            .then(response => {
                console.log(response.data);
                setConcerts(response.data.concerts);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveGenres = () => {
        ConcertDataService.getGenres()
            .then(response => {
                console.log(response.data);
                setGenres(["All Genres"].concat(response.data));
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveVenueTypes = () => {
        ConcertDataService.getVenueTypes()
            .then(response => {
                console.log(response.data);
                setVenueTypes(["All Venue Types"].concat(response.data));
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveConcerts();
    };

    const find = (query, by) => {
        ConcertDataService.find(query, by)
            .then(response => {
                console.log(response.data);
                console.log("-------------------");
                console.log(response.data.filters);
                setConcerts(response.data.concerts);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByBands = () => {
        find(searchBands, "bands")
    };

    const findByVenueName = () => {
        find(searchVenueName, "venue_name")
    };
    
    const findByCity = () => {
        find(searchCity, "city")
    };

    const findByGenre = () => {
        if (searchGenre == "All Genres") {
            refreshList();
        } else {
            find(searchGenre, "genre")
        }
    };

    const findByVenueType = () => {
        if (searchVenueType == "All Venue Types") {
            refreshList();
        } else {
            find(searchVenueType, "venueType")
        }
    };

    return (
        <div>
            <div className="row pb-2">
                <div className="input-group col-lg-4 pb-1">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by bands"
                        value={searchBands}
                        onChange={onChangeSearchBands}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByBands}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className="input-group col-lg-4 pb-1">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Venue Name"
                        value={searchVenueName}
                        onChange={onChangeSearchVenueName}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByVenueName}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className="input-group col-lg-4 pb-1">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by city"
                        value={searchCity}
                        onChange={onChangeSearchCity}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByCity}
                        >
                            Search
                        </button>
                    </div>
                </div>

                <div className="input-group col-lg-4 pb-1">

                    <select onChange={onChangeSearchGenre}>
                        {genres.map(genre => {
                            return (
                                <option value={genre}> {genre.substr(0, 20)} </option>
                            )
                        })}
                    </select>
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByGenre}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className="input-group col-lg-4 pb-1">

                    <select onChange={onChangeSearchVenueType}>
                        {venueTypes.map(venueType => {
                            return (
                                <option value={venueType}> {venueType.substr(0, 20)} </option>
                            )
                        })}
                    </select>
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByVenueType}
                        >
                            Search
                        </button>
                    </div>
                </div>
                
            </div>
            <div className="row">
                {concerts.map((concert) => {
                    const address = `${concert.street}, ${concert.zipcode}`;
                    return (
                        <div className="col-lg-4 pb-1">
                            <div className="card">
                                {concert.img_link != null && 
                                <img className="card-img-top crd-img" src={concert.img_link} alt="Concert Flyer"></img>
                                }
                                <div className="card-body">
                                    <h5 className="card-title">{concert.bands}</h5>
                                    <p className="card-text">
                                        <strong>Date: </strong>{concert.date} <br />
                                        <strong>Genre: </strong>{concert.genre} <br />
                                        <strong>Address: </strong>{address} <br />
                                        <strong>Venue Name: </strong>{concert.venue_name} <br />
                                        <strong>Venue Type: </strong>{concert.venueType} <br />
                                        <strong>City: </strong>{concert.city}
                                    </p>
                                    <div className="row">
                                        <a href={concert.link} target="_blank" rel="noreferrer noopener" className="btn btn-primary col-lg-5 mx-1 mb-1 btn-color">
                                            View Details
                                        </a>
                                        <a target="_blank" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1 btn-color">View Map</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}


            </div>
        </div>
    );
};

export default ConcertsList;
