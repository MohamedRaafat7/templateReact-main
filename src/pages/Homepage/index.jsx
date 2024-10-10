import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import "./index.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop } from "@fortawesome/free-solid-svg-icons";
export default function Homepage() {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [token, setToken] = useState();

    async function getAllProducts() {
        const querySnapshot = await getDocs(collection(db, "products"));
        let final = [];
        querySnapshot.forEach((doc) => {
            let productsObj = doc.data();
            productsObj.id = doc.id;
            final.push(productsObj);
        });
        setProducts(final);
        console.log(final);
    }

    const checkToken = () => {
        let Token = sessionStorage.getItem("Token") || localStorage.getItem("Token");
        Token ? setToken(Token) : null;
    }
    const addToCart = (obj) => {
        let cart = JSON.parse(sessionStorage.getItem("cart"));
        if (!cart) {
            cart = [];
        }
        let index = cart.findIndex((pro) => { return pro.id == obj.id });
        if (index == -1) {
            cart.push(obj);
        }
        else {
            cart[index].product_qty++;
        }
        sessionStorage.setItem("cart", JSON.stringify(cart));
    }

    const handleSubmit = async (id) => {
        let obj = {
            product_id: id,
            product_qty: 1,
        }
        const docRef = await addDoc(collection(db, `users/${token}/cart`), obj);
        token ? docRef : addToCart(obj);
    }

    useEffect(() => {
        checkToken();
        getAllProducts();
    }, []);

    return (
        <div id="Homepage" className="col-12">
            <header className="col-12 d-flex bg-dark align-items-center justify-content-between p-3">
                <FontAwesomeIcon style={{ fontSize: "2rem", color: "white" }} icon={faShop} />
                <nav className="d-flex gap-2">
                    <Link>Home</Link>
                    <Link>Shop</Link>
                    <Link>Cart</Link>
                    <Link>Profile</Link>
                </nav>
            </header>
            <div className="col-12 container">
                {
                    products.map((product) => {
                        return (
                            <div key={product.id} className="card" style={{ width: "18rem" }}>
                                <img src={product.product_img[0]} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{product.product_name}</h5>
                                    <p className="card-text">price : {product.product_price_after} - <del>{product.product_price}</del></p>
                                    <a onClick={() => { handleSubmit(product.id) }} className="btn btn-primary">
                                        Add to cart
                                    </a>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
// Users [cart - loign - register]
// Products [Home - Shop - details]
// Orderes [Dashboard]
// wishlist / cart

