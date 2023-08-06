import React from "react";
import "../style.css"


export default function ExtraDetail () {

    const sendHandler = async (event) => {
        let response = await fetch('http://localhost:9001/details', {

            method:"POST",
            body:JSON.stringify({
                name: event.target.name.value,
                description: event.target.description.value
            }),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        }).then(res => res.json());

        console.log(response.body);
    }

    return (
    <div>
        <form className="form" onSubmit={(event) => sendHandler(event)}>
            <input type="text" name="name" placeholder="Enter Your Name" />
            <br/>
            <input type="text" name="description" placeholder="Write Description"/>
            <br/>
            <input type="submit" className="btn btn-warning" value="Send" />
        </form>
    </div>
        );
}