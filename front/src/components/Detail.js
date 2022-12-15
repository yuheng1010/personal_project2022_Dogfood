import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';
import './Detail.css';

function Detail() {
    const { id } = useParams()
    const [datas, setData] = useState([])
    useEffect(() => {
        fetch(`http://localhost:7000/api/v1/detail?id=${id}`)
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
    }, [])

    function imgs() {
        if (datas.img) {
            const img = JSON.parse(datas.img)
            if (Object.keys(img).length > 1) {
                return (
                    <Col xs={4} lg={4} md={4} xl={4} > 
                    <Carousel variant="dark"style={{width:"350px",marginRight:"550px"}}>
                        {Object.values(img).map((inner,index)=>
                            <Carousel.Item >
                            <img style={{width:"350px"}}
                                className="img-fluid img-thumbnail rounded d-block w-100"
                                src={inner}
                            />
                            </Carousel.Item>
                        )}
                    </Carousel>
                    </Col>
                )
            } else {
                return (<img className="img-fluid img-thumbnail rounded dpic" src={Object.values(img)[0]}></img>)
            }
        }
    }
    function comparePrice() {

    }
    return (
        <div className='detailsAll'>
            <Container >
                <Row className='justify-content-center'>
                    {/* <Col xs={4} lg={4} md={4} xl={4} > */}
                        {imgs()}
                    {/* </Col> */}
                    <Col xs={4} lg={4} md={4} xl={4} >
                        <h5>{datas.name}</h5>
                        <br />
                        <font>編號 : {datas.id}</font><br />
                        <font>廠商 : {datas.brand}</font>
                        <hr />
                        <br /><br />
                    </Col>
                </Row >
                <br />
            </Container>
        </div>
    )
}

export default Detail;