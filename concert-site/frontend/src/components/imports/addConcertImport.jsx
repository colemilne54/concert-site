import React, { props } from 'react';

export default function addConcertImport(props) {

    let {
        handleSubmit,
        setBands,
        setGenre
    } = props.concertState;


    return (
        <div className="col-sm-7 bg-color">
            <div className="form-section">
                <div className="title">
                    <h3>Add a new conert</h3>
                </div>
                <div>
                    <form method="POST" onSubmit={handleSubmit}>

                        <div className="form-group form-box">
                            <input type="text" id="bands" className="input-text" onChange={e => setBands(e.target.value)} placeholder="Band(s) Name" />
                        </div>

                        <div className="form-group form-box">
                            <input type="text" id="genre" className="input-text" onChange={e => setGenre(e.target.value)} placeholder="Genre" />
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}

export default addConcertImport;