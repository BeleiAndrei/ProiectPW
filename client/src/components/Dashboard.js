import React, { useState, useEffect } from "react";
import { Button, FormGroup, FormControl, FormLabel, Alert, Dropdown, Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import "./Dashboard.scss";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import {TextArea} from "semantic-ui-react";

export default function Dashboard() {
    // Common
    const [errorMessage, setErrorMessage] = useState("");
    const [infoMessage, setInfoMessage] = useState("");


    const [showAddProductModal, setShowAddProductModal] = useState(false);
    // Product add modal
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productProvider, setProductProvider] = useState("");

    // allProducts
    const [productsList, setProductsList] = useState([]);
    const [interval, setInterval] = useState(0);


    const [showEditProductModal, setEditProductModal] = useState(false);
    // Product edit modal
    const [productEId, setProductEId] = useState("");
    const [productEDescription, setEProductDescription] = useState("");
    const [productEPrice, setEProductPrice] = useState("");
    const [productEName, setEProductName] = useState("");

    const [showViewProductModal, setShowViewProductModal] = useState(false);
    // Product view modal
    const [povProduct, setpovProduct] = useState({});
    const [povFAQ, setpovFAQ] = useState([]);
    const [povQuestions, setpovQuestions] = useState([]);
    const [povReviews, setpovReviews] = useState([]);

    //Question submint
    const [questionText, setQuestionText] = useState("");

    const [reviewText, setReviewText] = useState("");

    function updateProducts() {
        if (interval < Date.now() - 500) {
            axios.get(global.serverUrl + "products/")
            .then((result) => {
                setProductsList(result.data);
            })
            .catch((err) => {
                console.log(err)
            });
            setInterval(Date.now());
        }
    }
    

    return (
        <div className="Dashboard">
            {sideBar()}
            <div className="AllProducts">
                {allProducts()}
            </div>
        </div>
    )

    function sideBar() {
        return(<div className="SideBar">
            {localStorage.getItem('role') === 'admin' ? <Button onClick={e => setShowAddProductModal(true)}>Add product</Button>: null}
            {editProductModal()}
            {addProductModal()}
            {viewProductModal()}
        </div>);
    }

    function clearView() {
        setpovProduct({});
        setpovFAQ([]);
        setpovQuestions([]);
        setpovReviews([]);
        setShowViewProductModal(false);
    }

    function questionSubmit() {
        if (questionText.length == 0) {
            return false;
        }

        axios.post(global.serverUrl + "questions/",
        {
            username: localStorage.getItem('username'),
            product_id: povProduct._id,
            message: questionText
        },{
            'headers': {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((result) => {
            clearView();
            setQuestionText("");
        })
        .catch((error) => {
            if (error.response !== undefined && error.response.data !== undefined) {
                setErrorMessage(error.response.data.error);
            } else {
                console.log(error);
            }
        });
    }

    function reviewSubmit() {
        if (reviewText.length == 0) {
            return false;
        }

        axios.post(global.serverUrl + "reviews/",
        {
            username: localStorage.getItem('username'),
            product_id: povProduct._id,
            message: reviewText
        },{
            'headers': {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((result) => {
            clearView();
            setReviewText("");
        })
        .catch((error) => {
            if (error.response !== undefined && error.response.data !== undefined) {
                setErrorMessage(error.response.data.error);
            } else {
                console.log(error);
            }
        });
    }

    function reviewUpdate(review_id, value) {
        if (value.length == 0) {
            return false;
        }

        axios.put(global.serverUrl + "reviews/",
        {
            data: {
                review_id: review_id,
                message: value
            }
        },{
            'headers': {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((result) => {
            clearView();
        })
        .catch((error) => {
            if (error.response !== undefined && error.response.data !== undefined) {
                setErrorMessage(error.response.data.error);
            } else {
                console.log(error);
            }
        });
    }

    function answerSubmit(question_id, value) {
        if (value.length == 0) {
            return false;
        }

        axios.post(global.serverUrl + "answers/",
        {
            username: localStorage.getItem('username'),
            question_id: question_id,
            message: value
        },{
            'headers': {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((result) => {
            clearView();
        })
        .catch((error) => {
            if (error.response !== undefined && error.response.data !== undefined) {
                setErrorMessage(error.response.data.error);
            } else {
                console.log(error);
            }
        });
    }

    function displayFAQ() {
        let questionsArea = povFAQ.map((question, index) => {
            let ret=[];

            ret.push(<span style={{color:"blue"}}>{question.user_id.username}</span>)
            ret.push(<p>{question.message}</p>)

            for (let i = 0; i < question.Answers.length; ++i) {
                ret.push(<span style={{color:"blue", "margin-left":"20px"}}>{question.Answers[i].user_id.username} </span>)
                ret.push(<span> answered</span>)
                ret.push(<p style={{"margin-left":"20px"}}>{question.Answers[i].message}</p>)
            }
            return ret;
        })

        return questionsArea;
    }

    function displayQuestions() {

        function mark(id) {
            axios.put(global.serverUrl + "questions/", {
                data: {
                    id: id
                }
            }, {
                'headers': {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(() => {clearView()})
            .catch((error) => {console.log(error)})
        }

        function deleteQuestion(id) {
            axios.delete(global.serverUrl + "questions/", 
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                data: {
                    id: id
                }
            })
            .then(() => {clearView()})
            .catch((error) => {console.log(error)})
        }
        
        let questionsArea = povQuestions.map((question, index) => {
            let ret=[];
            if (localStorage.getItem('role') == "support") {
                ret.push(<Button 
                    onClick = {e => mark(question._id)}
                    style={{
                    height: "inherit",
                    display:"inline-block",
                    width:"inherit",
                    "margin-right":"0%",
                    "margin-left":"0%",
                    "font-size": "10px"
                }}>Mark</Button>)
                ret.push(<Button 
                    onClick = {e => deleteQuestion(question._id)}
                    style={{
                    height: "inherit",
                    display:"inline-block",
                    width:"inherit",
                    "margin-right":"0%",
                    "margin-left":"5px",
                    "font-size": "10px"
                }}>Delete</Button>)
                ret.push(<div></div>)
            }


            ret.push(<span style={{color:"blue"}}>{question.user_id.username}</span>)
            ret.push(<p>{question.message}</p>)

            for (let i = 0; i < question.Answers.length; ++i) {
                ret.push(<span style={{color:"blue", "margin-left":"20px"}}>{question.Answers[i].user_id.username} </span>)
                ret.push(<span> answered</span>)
                ret.push(<p style={{"margin-left":"20px"}}>{question.Answers[i].message}</p>)
            }

            if (localStorage.getItem('role') == "support") {
                ret.push(
                    <form onSubmit={e => answerSubmit(question._id, global.answer)}>
                        <TextArea style={{
                                    width:"70%"
                                }}
                                onChange={e => global.answer = e.target.value}/>
                        <Button style={{
                                    display:"block",
                                    width:"inherit",
                                    "margin-right":"0%",
                                    "margin-left":"0%"
                                }}
                                type="submit">Submit answer</Button>
                    </form>)
                ret.push(<br></br>)
            }
            return ret;
        })

        if (localStorage.getItem('role') === "user" ) {
            questionsArea.push(
            <form onSubmit={questionSubmit}>
                <TextArea style={{
                            width:"70%"
                        }}
                        value = {questionText} 
                        onChange={e => setQuestionText(e.target.value)}/>
                <Button style={{
                            display:"block",
                            width:"inherit",
                            "margin-right":"0%",
                            "margin-left":"0%"
                        }}
                        type="submit">Submit question</Button>
            </form>)
        }
        return questionsArea;
    }

    function displayReviews() {
        function deleteReview(id) {
            axios.delete(global.serverUrl + "reviews/", 
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                data: {
                    id: id
                }
            })
            .then(() => {clearView()})
            .catch((error) => {console.log(error)})
        }

        let reviewsArea = povReviews.map((review, index) => {
            let ret=[];
            if (localStorage.getItem('role') == "support") {
                ret.push(<Button 
                    onClick = {e => deleteReview(review._id)}
                    style={{
                    height: "inherit",
                    display:"inline-block",
                    width:"inherit",
                    "margin-right":"0%",
                    "margin-left":"5px",
                    "font-size": "10px"
                }}>Delete</Button>)
                ret.push(<div></div>)
            }


            ret.push(<span style={{color:"blue"}}>{review.user_id.username}</span>)
            ret.push(<p>{review.message}</p>)

            if (localStorage.getItem('username') == review.user_id.username) {
                ret.push(
                    <form onSubmit={e => reviewUpdate(review._id, global.review)}>
                        <TextArea style={{
                                    width:"70%"
                                }}
                                onChange={e => global.review = e.target.value}/>
                        <Button style={{
                                    display:"block",
                                    width:"inherit",
                                    "margin-right":"0%",
                                    "margin-left":"0%"
                                }}
                                type="submit">Edit review</Button>
                    </form>)
                ret.push(<br></br>)
            }
            return ret;
        })

        if (localStorage.getItem('role') === "user" ) {
            reviewsArea.push(
            <form onSubmit={reviewSubmit}>
                <TextArea style={{
                            width:"70%"
                        }}
                        value = {reviewText} 
                        onChange={e => setReviewText(e.target.value)}/>
                <Button style={{
                            display:"block",
                            width:"inherit",
                            "margin-right":"0%",
                            "margin-left":"0%"
                        }}
                        type="submit">Submit review</Button>
            </form>)
        }

        return reviewsArea;
    }

    function addToCart(product) {
        if (global.cart == undefined) {
            global.cart = [];
        }

        global.cart.push(product);
        clearView();
    }

    function viewProductModal() {
        return (
            <Modal 
                style={{width: '70% !important'}}
                className="ProductView"
                isOpen={showViewProductModal}
                onAfterClose={e => clearView()}
            >
                    <div className="viewdiv">
                        <h3>{povProduct.name}</h3>
                        <br></br>
                        <h5>Description</h5>
                        <p>{povProduct.description}</p>
                        <p>Provider: {povProduct.provider !== undefined ? povProduct.provider.name : null}</p>
                        <p>Price: {povProduct.price}</p>
                        <p><Button onClick={e => addToCart(povProduct)}
                        style={{
                            width:"inherit",
                            "margin-right":"0%",
                            "margin-left":"0%"
                        }}>Add to cart</Button></p>
                        <h5>FAQ</h5>
                        {displayFAQ()}

                        <h5>Questions</h5>
                        {displayQuestions()}

                        <h5>Reviews</h5>
                        {displayReviews()}

                        <Button 
                            block onClick={e => clearView()}>
                            Close
                        </Button>
                    </div>
                        
                    
            </Modal>
        )
    }



    function openViewModal(id) {
        axios.get(global.serverUrl + "products/view", {
            params: {id: id}
        })
        .then((result) => {
            setpovProduct(result.data.Product);
            
            
            if (result.data.Questions !== undefined) {
                setpovFAQ(result.data.Questions.filter((question) => question.important));
                setpovQuestions(result.data.Questions.filter((question) => !question.important));
            }

            if (result.data.Reviews !== undefined) {
                setpovReviews(result.data.Reviews);
            }

            setShowViewProductModal(true);
        })
        .catch((err) => {
            console.log(err)
        });
    }

    function allProducts() {
        updateProducts();
        return productsList.map((product, index) => 
        {
            
            let ret = [<Card>
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>Description:{product.description}</Card.Text>
                    <Card.Text>Price: {product.price}lei</Card.Text>
                    <Card.Text>Provider: {product.provider.name}</Card.Text>
                    <Button onClick={e=> openViewModal(product._id)}>View</Button>
                    {localStorage.getItem('role') === 'admin' ? <Button onClick={e=>openEditModal(product._id,product.name,product.description,product.price)}>Edit</Button>: null}

                </Card.Body>
            </Card>]
            if ((index + 1) % 3 === 0) {
                ret.push(<div></div>)
            }
            
            if (index === productsList.length - 1) {
                for (let i = 3 - (index % 3); i > 1; --i) {
                    ret.push(<Card></Card>)
                }
            }

            return ret;
        });
    }

    function openEditModal(id, name, description, price) {
        setProductEId(id);
        setEProductName(name);
        setEProductPrice(price);
        setEProductDescription(description);
        setEditProductModal(true);
    }

    function clearMessages() {
        setErrorMessage("");
        setInfoMessage("");
    }

    function handelProductUpdate(event) {
        if ( productEPrice.length === 0) {
            setErrorMessage("Please enter a price");
            return false;
        }

        if ( productEDescription.length === 0) {
            setErrorMessage("Please enter a description");
            return false;
        }

        axios.put(global.serverUrl + "products/", {
            data: {
                id: productEId,
                description: productEDescription,
                price: productEPrice,
            }
        },{
            'headers': {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        )
        .then ((result) => {
            setInfoMessage("Product has been edited");
            setErrorMessage("");
            setEProductDescription("");
            setEProductPrice("");
            setEProductName("");
        })
        .catch((error) => {
            if (error.response !== undefined && error.response.data !== undefined) {
                setErrorMessage(error.response.data.error);
            } else {
                console.log(error);
            }
        });
        event.preventDefault()
    }

    function handleProductDelete() {
        axios.delete(global.serverUrl + "products/", 
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                data: {
                    id: productEId
                }
            })
            .then(() => {
                setEditProductModal(false);
                clearMessages();
            })
            .catch((error) => {console.log(error)})
    }

    function editProductModal() {
        return (
        <Modal
                isOpen={showEditProductModal}
                onAfterClose={e => clearMessages()}
            >
                <form onSubmit={handelProductUpdate}>
                    <h3>Editing {productEName}</h3>
                    { errorMessage.length===0 ? null :<Alert variant="danger">{errorMessage}</Alert>}
                    { infoMessage.length===0 ? null :<Alert variant="success">{infoMessage}</Alert>}
                    
                    <FormGroup controlId="productDescription">
                    <FormLabel >Description</FormLabel >
                    <FormControl
                        autoFocus
                        type="name"
                        value={productEDescription}
                        onChange={e => setEProductDescription(e.target.value)}
                    />
                    </FormGroup>
                    <FormGroup controlId="productPrice">
                    <FormLabel >Price</FormLabel >
                    <FormControl
                        autoFocus
                        type="number"
                        value={productEPrice}
                        onChange={e => setEProductPrice(e.target.value)}
                    />
                    </FormGroup>
                    <Button block type="submit">
                        Submit
                    </Button>
                    <Button block onClick={e => handleProductDelete()}>
                        Delete
                    </Button>
                    <Button block onClick={e => setEditProductModal(false)}>
                        Cancel
                    </Button>
                </form>
            </Modal>
        )
    }


    function handleProductSubmit(event) {
        if ( productName.length === 0) {
            setErrorMessage("Please enter a name");
            return false;
        }

        if ( productPrice.length === 0) {
            setErrorMessage("Please enter a price");
            return false;
        }

        if ( productDescription.length === 0) {
            setErrorMessage("Please enter a description");
            return false;
        }

        if ( productProvider.length === 0) {
            setErrorMessage("Please enter a provider name");
            return false;
        }


        axios.post(global.serverUrl + "products/", {
            name: productName,
            description: productDescription,
            price: productPrice,
            provider: productProvider
        },{
            'headers': {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        )
        .then ((result) => {
            setInfoMessage("Product has been added");
            setErrorMessage("");
            setProductName("");
            setProductPrice("");
            setProductProvider("");
            setProductDescription("");
        })
        .catch((error) => {
            if (error.response !== undefined && error.response.data !== undefined) {
                setErrorMessage(error.response.data.error);
            } else {
                console.log(error);
            }
        });
        event.preventDefault()
    }

    function addProductModal() {
        return (
        <Modal
                isOpen={showAddProductModal}
                onAfterClose={e => clearMessages()}
            >
                <form onSubmit={handleProductSubmit}>
                    { errorMessage.length===0 ? null :<Alert variant="danger">{errorMessage}</Alert>}
                    { infoMessage.length===0 ? null :<Alert variant="success">{infoMessage}</Alert>}
                    <FormGroup controlId="productName">
                    <FormLabel >Name</FormLabel >
                    <FormControl
                        autoFocus
                        type="name"
                        value={productName}
                        onChange={e => setProductName(e.target.value)}
                    />
                    </FormGroup>
                    <FormGroup controlId="productDescription">
                    <FormLabel >Description</FormLabel >
                    <FormControl
                        autoFocus
                        type="name"
                        value={productDescription}
                        onChange={e => setProductDescription(e.target.value)}
                    />
                    </FormGroup>
                    <FormGroup controlId="productPrice">
                    <FormLabel >Price</FormLabel >
                    <FormControl
                        autoFocus
                        type="number"
                        value={productPrice}
                        onChange={e => setProductPrice(e.target.value)}
                    />
                    </FormGroup>
                    <FormGroup controlId="productProvider">
                    <FormLabel >Provider name</FormLabel >
                    <FormControl
                        autoFocus
                        value={productProvider}
                        onChange={e => setProductProvider(e.target.value)}
                        type="name"
                    />
                    </FormGroup>
                    <Button block type="submit">
                        Submit
                    </Button>
                    <Button block onClick={e => setShowAddProductModal(false)}>
                        Cancel
                    </Button>
                </form>
            </Modal>
        )
    }
}