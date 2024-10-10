import { useEffect, useRef, useState } from "react"
import { useRecoilState } from "recoil";
import { $Users } from "../../store";
import { useNavigate, useParams } from "react-router-dom/dist";

export default function JoinPage() {
    // Validation
    const params = useParams();
    const email = useRef();
    const navigate = useNavigate();
    const [joinType, setJoinType] = useState();

    const [users] = useRecoilState($Users);

    const handleChange = () => {
        let emailVal = email.current.value;
        let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let emailPaternCheck = pattern.test(emailVal);
        if (emailPaternCheck) {
            checkEmailExisit(emailVal)
        }
        else {
            setJoinType();
        }
    }

    function checkEmailExisit(email) {
        let emailIndex = users.findIndex((user) => { return user.email.toLowerCase() == email.toLowerCase() })
        if (emailIndex == -1) {
            setJoinType("register");
        }
        else {
            setJoinType("login");
        }
    }

    useEffect(() => {
        if (params.join_type == "register") {
            setJoinType('register');
        }
        else if (params.join_type == "login") {
            setJoinType('login');
        }
        else if (params.join_type == undefined) {
            console.log(params.join_type);
        } else {
            navigate('/page404');
        }
    }, [])
    return (
        <div className="col-12" id="JoinPage">
            <input type="email" ref={email} onChange={handleChange} />
            {
                // joinType == "login" ? <Joinform /> : (joinType == "register" ? <Registerform /> : null)
                joinType == "login" ? <h1>Login Form</h1> : (joinType == "register" ? <h1>Register Form</h1> : null)
            }
        </div>
    )
}
