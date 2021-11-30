import React, { useState } from 'react';

import addConcertImport from './imports/addConcertImport';

export default function AddConcertForm() {

    const [bands, setBands] = useState("");
    const [genre, setGenre] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const newConcert = {
            bands,
            genre
        }
        console.log(newConcert);
    }

    let concertData = {
        handleSubmit,
        setBands,
        setGenre
    }

    return (
        <div>
            <div>
                <div>
                    <addConcertImport concertState={concertData} />
                </div>
            </div>
        </div>
    )
}

export default AddConcertForm;

