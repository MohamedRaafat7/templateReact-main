import { useEffect, useRef } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
export default function Loginpage() {
    const navigate = useNavigate();
    const email = useRef();
    const password = useRef();
    const rememebrIndex = useRef();

    function checkToken() {
        let token = localStorage.getItem("Token") || sessionStorage.getItem("Token");
        axios.post("http://localhost/react/template427/public/php/check.php")
        let res = false;
        if (res) {
            navigate('/');
        }
        return res;
    }
    const handelSubmit = () => {
        event.preventDefault();
        let emailVal = email.current.value;
        let passVal = password.current.value;
        if (emailVal && passVal) {
            let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            let check = pattern.test(emailVal);
            if (!check) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Email is invalid",
                    timer: 2000,
                })
            } else {
                axios.post("http://localhost/react/template427/public/php/index.php/api/auth/check", {
                    email: emailVal,
                    password: passVal
                }).then((res) => {
                    console.log(res);
                    if (!res.data.err) {
                        let token = res.data.data.token;

                        if (rememebrIndex.current.checked) {
                            localStorage.setItem("Token", token);
                        }
                        else {
                            sessionStorage.setItem("Token", token);
                        }
                        navigate('/checkout');
                    }
                    else {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Wrong Email or PAssword!",
                            timer: 2000,
                        })
                    }
                    console.log(res.data);
                }).catch((err) => {
                    console.log(err);
                })
            }

        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "data is empty!",
                timer: 2000,
            })
        }

    }
    // function checkLogin() {
    //     let token = 1234;
    //     sessionStorage.setItem("Token", token);
    //     navigae('/');
    // }
    useEffect(() => {
        checkToken();
    }, [])
    return (
        <form id="Loginpage" onSubmit={handelSubmit}>
            <input ref={email} type="text" />
            <input ref={password} type="password" />
            <div>
                <input ref={rememebrIndex} type="checkbox" name="" id="rember" />
                <label htmlFor="rember">Remember Me</label>
            </div>
            <button>login</button>
        </form>
    )
}
