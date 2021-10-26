// import logo from './logo.svg';
// import './App.css';
import React, { useState, useEffect } from "react";
import ConcertDataService from "../services/concert";
import { Link } from "react-router-dom";


const ConcertsList = props => {

    const [concerts, setConcerts] = useState([]);
    const [searchBands, setSearchBands] = useState("");
    const [searchZip, setSearchZip] = useState("");
    const [searchGenre, setSearchGenre] = useState("");
    const [genres, setGenres] = useState(["All Genres"]);


    useEffect(() => {
        retrieveConcerts();
        retrieveGenres();
    }, []);

    const onChangeSearchBands = e => {
        const searchBands = e.target.value;
        setSearchBands(searchBands);
    };

    const onChangeSearchZip = e => {
        const searchZip = e.target.value;
        setSearchZip(searchZip);
    };

    const onChangeSearchGenre = e => {
        const searchGenre = e.target.value;
        setSearchGenre(searchGenre);

    };

    const retrieveConcerts = () => {
        ConcertDataService.getAll()
            .then(response => {
                console.log(response.data);
                console.log("------------------------------");
                console.log(response.data.concerts);
                console.log("------------------------------");
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

    const refreshList = () => {
        retrieveConcerts();
    };

    const find = (query, by) => {
        ConcertDataService.find(query, by)
            .then(response => {
                console.log(response.data);
                setConcerts(response.data.concerts);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByBands = () => {
        find(searchBands, "bands")
    };

    const findByZip = () => {
        find(searchZip, "zipcode")
    };

    const findByGenre = () => {
        if (searchGenre == "All Genres") {
            refreshList();
        } else {
            find(searchGenre, "genre")
        }
    };


    return (
        <div>
            <div className="row pb-1">
                <div className="input-group col-lg-4">
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
                <div className="input-group col-lg-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by zip"
                        value={searchZip}
                        onChange={onChangeSearchZip}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByZip}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className="input-group col-lg-4">

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
            </div>
            <div className="row">
                {concerts.map((concert) => {
                    // TODO: may cause issues, I took out ${concert.address.building}
                    console.log("!!!!!!!!!!!!!!!!!!!!!");
                    try {
                        console.log(typeof(concert.address.street));
                    } catch(e) {
                        console.log("Err caught: " + e);
                    }
                    
                    console.log("!!!!!!!!!!!!!!!!!!!!!");
                    const address = `${concert.address.street}, ${concert.address.zipcode}`;
                    return (
                        <div className="col-lg-4 pb-1">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{concert.bands}</h5>
                                    <p className="card-text">
                                        <strong>Cuisine: </strong>{concert.genre}<br />
                                        <strong>Address: </strong>{address}
                                    </p>
                                    <div className="row">
                                        <Link to={"/concerts/" + concert._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                                            View Reviews
                                        </Link>
                                        <a target="_blank" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a>
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
