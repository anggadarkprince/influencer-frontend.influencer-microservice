import Wrapper from "./Wrapper";
import Banner from "../components/Banner";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Product} from "../classes/Product";
import constants from "../constants";

const Main = () => {
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selected, setSelected]: [number[], any] = useState([]);
    const [notify, setNotify] = useState({
        show: false,
        error: false,
        message: ''
    });

    useEffect(() => {
        (
            async () => {
                const response = await axios.get(`products?q=${searchText}`);

                setProducts(response.data.data);
            }
        )();
    }, [searchText]);

    const generateLink = async () => {
        try {
            const response = await axios.post('links', {
                products: selected
            });

            setNotify({
                show: true,
                error: false,
                message: `Link generated: ${constants.CHECKOUT_URL}/${response.data.data.code}`
            });
        } catch (e) {
            setNotify({
                show: true,
                error: true,
                message: 'You should be logged in to generate a link!'
            })
        } finally {
            setTimeout(() => {
                setNotify({
                    show: false,
                    error: false,
                    message: ''
                });
            }, 10000);
        }
    }

    const isSelected = (id: number) => selected.filter(s => s === id).length > 0;
    const selectProduct = (id: number) => {
        if (isSelected(id)) {
            setSelected(selected.filter(s => s !== id));
            return;
        }

        setSelected([...selected, id]);
    }

    let button, info;

    if (selected.length > 0) {
        button = (
            <div className="input-group-append">
                <button className="btn btn-info" onClick={generateLink}>Generate Link</button>
            </div>
        )
    }

    if (notify.show) {
        info = (
            <div className="col-md-12 mb-4">
                <div className={notify.error ? "alert alert-danger" : "alert alert-info"} role="alert">
                    {notify.message}
                </div>
            </div>
        )
    }

    return (
        <Wrapper>
            <Banner/>
            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row">
                        {info}

                        <div className="col-md-12 mb-4 input-group">
                            <input type="text" className="form-control" placeholder="Search"
                                   onKeyUp={e => setSearchText((e.target as HTMLInputElement).value)}
                            />
                            {button}
                        </div>
                    </div>

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {products.map((product: Product) => {
                            return (
                                <div className="col" key={product.id}>
                                    <div className={isSelected(product.id) ? "card card-product shadow-sm selected" : "card card-product shadow-sm"}
                                         onClick={() => selectProduct(product.id)}>
                                        <img src={product.image} className="card-img-top" width="100%" height="225" alt={product.title}/>
                                        <div className="card-body">
                                            <p className="card-text">{product.title}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-sm btn-outline-primary">View Detail</button>
                                                </div>
                                                <p className="fw-bold mb-0">${Number(product.price).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Main;