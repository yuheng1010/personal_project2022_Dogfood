import "./Collection.css"
import doging from "../imgs/doging.gif"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Collection() {
    const [collection, setCollection] = useState([])
    let token = window.localStorage.getItem('token');
    useEffect(() => {
        document.getElementById("notFound").style.display="none";
        fetch("http://localhost:7000/api/v1/getPersonCollection", {
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }),
            method: 'POST',
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setCollection(data)
            })
    }, [])

    return (
        <div className="collectionPage">
            
            <img id="doging" src={doging}/>
            <div className="myCollections">My Collections</div><br/>
            <Container className="collectionSection">
           
                <Row>
                    {collection.map((inner, index) =>
                        <Col xs={6} lg={6} md={6} xl={3} d-block="true" >
                            <Link to={`/detail/${inner.id}`}><img id="p1" className="img-fluid img-thumbnail rounded" src={Object.values(JSON.parse(inner.img))[0]} /></Link>
                            <div className="des">
                                <font size="2" className="name">名稱 : </font>
                                <font size="2.5">{inner.name}</font>
                                <br />
                                <font size="2" className="brand" style={{ color: "gray" }}>廠牌 : </font>
                                <font size="2" style={{ color: "gray" }}>{inner.brand}</font>
                            </div>
                        </Col>
                    )}
                </Row>
            </Container >
        </div>
    )
}

export default Collection;