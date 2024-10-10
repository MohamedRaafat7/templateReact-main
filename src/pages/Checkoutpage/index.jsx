import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
    const navigate = useNavigate();
    function checkToken() {
        let token = localStorage.getItem("Token") || sessionStorage.getItem("Token");
        let res = true;
        if (!res) {
            navigate('/');
        }
        return res;
    }

    useEffect(() => {
        checkToken();
    }, [])
    return (
        <>
            {
                checkToken() ? (
                    <div id="CheckoutPage">
                        <h1>Check out Page</h1>
                    </div>
                ) : null
            }
        </>

    )
}
