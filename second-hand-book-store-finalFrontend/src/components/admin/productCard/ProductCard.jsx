import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash,faPenToSquare } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash,faPenToSquare);

const ProductCard = ({ product,deleteProduct }) => {
    const productDiscount = ((((product.price - product.sellPrice)/product.price))*100).toFixed(2);
    return (
        <section className="py-2">
            <div className="container bg-white shadow border border-3 p-2" style={{ borderRadius: "10px" }}>
                <div className="row gx-5">
                    <aside className="col-lg-4">
                        <div className="shadow"
                            style={{ borderRadius: "10px", padding: '0px' }}>
                            <img
                                style={{ width: "100%", 
                                         height: '500px !important',
                                         borderRadius:'10px',
                                         margin: "auto",
                                        objectFit:'cover' }}
                                alt="product_image" 
                                className="rounded-4 fit"
                                src={product && product.image} />
                        </div>
                    </aside>

                    <main className="col-lg-8">
                        <div className="ps-lg-3">
                            <h4 className="title text-dark my-2">
                                {product && product.name}
                            </h4>
                            <p className="title text-dark my-2">
                                Author : {product && product.author}
                            </p>

                            <div className="d-flex flex-row my-3">
                                <span className="text-muted"> Stock :{product && product.stock} items</span>
                                <span className="text-success ms-2"> in stock</span>
                            </div>

                            <div className="mb-3">
                                <span className="text-muted"><del style={{color:'#fb5c42'}}>Rs.{product.price}.00</del></span>
                                <span className="h5"> &nbsp;Rs {product && product.sellPrice}.00</span>
                            </div>
                            <p className="title text-dark my-2">
                                Discount : {productDiscount} %
                            </p>
                            <p>
                                {product && product.description}
                            </p>
                            <hr />
                            <div className="row">
                                <dt className="col-4 col-lg-3">Category:</dt>
                                <dd className="col-8 col-lg-9">{product && product.category.name}</dd>
                            </div>
                            <hr />
                            <Link to={'/update-product/' + product.id }>
                                <button className='btn btn-main text-white'
                                    style={{ marginLeft: "10px", width: "7rem" }}>
                                  <FontAwesomeIcon icon={faPenToSquare} /> Update
                                </button>
                            </Link>
                            <button onClick={() => deleteProduct(product.id)}
                            style={{ marginLeft: "10px", width: "7rem" }}
                             className='btn btn-dark mx-3 px-3 text-center'>
                              <FontAwesomeIcon icon={faTrash} /> Delete
                            </button>
                        </div>

                    </main>

                </div>

            </div>

        </section>
    )
}

export default ProductCard;
