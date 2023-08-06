import React from "react";
import { useState } from "react";
import geoLocationApi from "../services/geoLocationApi";
import "../style.css";
import sos from "../assets/sos.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExtraDetail from "./ExtraDetail";
import NavBar from "./NavBar";



export default function AlertPage() {

    const [location, setLocation] = useState({});
    const [sendDetails, setSendDetails] = useState(false);
    const onAlertHandler = async () => {

        toast.info("Alerting the Police");
        let currLocation = await geoLocationApi();
        setLocation(currLocation);

        let response = await fetch('http://localhost:9002/alert', {
            body: JSON.stringify(currLocation),
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());

        response = JSON.parse(response.body);

        toast.success(
            <div>
                <b>Alerted the police</b> <br /> Email sent at: {response.to}. Can be viewed at: <a href={response.mailUrl} >Here</a>
            </div>);

        if (confirm("Want to Add extra details")) {
            setSendDetails(true);
        }


    }

    return (
        <div id="main" className="container">
            <NavBar/>
            <div className="container">
                <div className="image-container" onClick={onAlertHandler}>
                    <img src={sos} width={300} height={300} />
                </div>
                <div className="text-container">
                    <p className="text-center">After pressing the SOS button, we will<br></br>
                        alert the nearest police<br></br> station to your current location</p>
                </div>
            </div>
            <ToastContainer autoClose={2500} theme="colored" newestOnTop={true} toastStyle={{ backgroundColor: "crimson" }} limit={1} />
            {sendDetails && (
            <>
                <ExtraDetail/>
            </>)
            }
        </div>
    );
}