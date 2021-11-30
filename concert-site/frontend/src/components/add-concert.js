import React, { useEffect, useState } from 'react'

const Contact = () => {

    const [concertData, setConcertData] = useState({});

    const concertData = async() => {
        try {
            const res = await fetch('/', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            console.log(data);
            setConcertData(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
        }
    }

    userEffect(() => {
        userConcert();
    }, []);

}