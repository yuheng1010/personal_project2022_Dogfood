import "./HomePage.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";


function HomePage() {
    const [foods, setFood] = useState([])
    useEffect(() => {
        fetch("http://52.8.249.71:7000/api/v1/allfoods")
            .then(res => res.json())
            .then(data => {
                setFood(data)
            })
    }, [])

    return (
        <Container>
            <Row>
            {foods.map((inner, index) =>
                <Col xs={6} lg={6} md={6} xl={3} d-block="true" >
                    <Link to={`/detail/${inner.id}`}><img id="p1" className="img-fluid img-thumbnail rounded" src={Object.values(JSON.parse(inner.img))[0]} /></Link>
                    <div className="des">
                        <font size="2" className="name">名稱 : </font>
                        <font size="2.5">{inner.name}</font>
                        <br />
                        <font size="2" className="brand" style={{color:"gray"}}>廠牌 : </font>
                        <font size="2" style={{color:"gray"}}>{inner.brand}</font>
                    </div>
                </Col>
            )}
        </Row>
        </Container >
    )
}

export default HomePage;