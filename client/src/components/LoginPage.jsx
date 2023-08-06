import { useState } from "react";
import AlertPage from "./AlertPage"
import "../loginPage.css";


export default function LoginPage() {
    const [userDetails, setUserDetails] = useState({
        name:"",
        email:"",
        password:""
    });
    const [isLogged, setIsLogged] = useState(false);

    async function loginHandler(e) {

        e.preventDefault() // to prevent the default action of the button of submit type

        let response = await fetch("http://localhost:9002/login", 
        {
            method: "POST",
            body: JSON.stringify(userDetails),
            headers: {
                "Content-Type": "application/json"
            }
        });

        response = await response.json();
        console.log(response)

        if (response.status == 200) {
            setIsLogged(true);
        }

    }

    async function signUpHandler(e) {
        e.preventDefault() // to prevent the default action of the button of submit type

        let response = await fetch("http://localhost:9002/signup",
        {
            method: "POST",
            body: JSON.stringify(userDetails),
            headers: {
                "Content-Type": "application/json"
            }
        });

        response = await response.json()

        console.log(response.data);

    }

    return (
       <>
        {isLogged ? (<AlertPage/>) :(<div className="container">
            <div className="login-form">
                <form>
    
                <div className="form-group">
                        <label >Name</label>
                        <input name = "name" type="text" className="form-control"  aria-describedby="emailHelp" placeholder="Enter name" value={userDetails
                        .name} onChange={(e) => {
                            // e.target is of object type
                            const {name, value} = e.target;
                            setUserDetails({...userDetails, [name]:value})
                        }}/>
                    </div>
                    <div className="form-group">
                        <label >Email address</label>
                        <input name = "email" type="email" className="form-control"  aria-describedby="emailHelp" placeholder="Enter email" value={userDetails
                        .email} onChange={(e) => {
                            // e.target is of object type
                            const {name, value} = e.target;
                            setUserDetails({...userDetails, [name]:value})
                        }}/>
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input name="password" type="password" className="form-control"  placeholder="Password" value = {userDetails.password} onChange={ e => {
                            const {name, value} = e.target;
                            setUserDetails({...userDetails, [name]:value});
                        }}/>
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary" onClick={(e) => loginHandler(e)}>Login</button>
                    <button type="submit" className="btn btn-primary" onClick={(e) => signUpHandler(e)}>Sign Up</button>
                </form>
            </div>
        </div>)}
       </>

        
    );
}
