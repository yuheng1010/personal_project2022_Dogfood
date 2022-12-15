import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';
import './Detail.css';
import afoot from "../imgs/afoot.png"

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
                        <Carousel variant="dark" style={{ width: "350px", marginRight: "550px" }}>
                            {Object.values(img).map((inner, index) =>
                                <Carousel.Item >
                                    <img style={{ width: "350px" }}
                                        className="img-fluid  d-block w-100 pics"
                                        src={inner}
                                    />
                                </Carousel.Item>
                            )}
                        </Carousel>
                    </Col>
                )
            } else {
                return (<img className="img-fluid dpic" src={Object.values(img)[0]} ></img>)
            }
        }
    }
    function comparePrice() {
        if (datas.price) {
            const url = Object.keys(JSON.parse(datas.price))
            const sortPri = []
            const sortUrl = []
            sortPri.push(Object.values(JSON.parse(datas.price)).sort(function (a, b) { return a - b; }))
            for (var i = 0; i < sortPri[0].length; i++) {
                sortUrl.push(url[Object.values(JSON.parse(datas.price)).indexOf(sortPri[0][i])])
            }
            return (
                <div>
                    {sortUrl.map((inner, index) => {
                        if (inner.includes("pchome") === true) {
                            return (<div><a className="brandUrl" href={inner}><img className="afoot" src={afoot}/>Pchome : </a><font style={{fontSize:"4px"}}> &ensp;TWD. </font><font>{sortPri[0][index]}</font></div>)
                        }
                        if (inner.includes("maoup") === true) {
                            return (<div><a className="brandUrl" href={inner}><img className="afoot" src={afoot}/>Mao Up : </a><font style={{fontSize:"4px"}}> &ensp;TWD. </font><font>{sortPri[0][index]}</font></div>)
                        }
                        if (inner.includes("momo") === true) {
                            return (<div><a className="brandUrl" href={inner}><img className="afoot" src={afoot}/>Momo : </a><font style={{fontSize:"4px"}}> &ensp;TWD.</font><font>{sortPri[0][index]}</font></div>)
                        }
                    }

                    )}
                </div>
            )
        }
    }
    return (
        <div >
            <div className='detailsAll'>
                <Container >
                    <Row className='justify-content-center'>
                        {imgs()}
                        <div className='detail' >
                            <h5>{datas.name}</h5>
                            <font className="pID">Product ID :</font><font> {datas.id}</font><br />
                            <font className="pBrand">Brand : {datas.brand}</font>
                            <br /><br />
                            <div className='compareArea'>
                                {comparePrice()}
                            </div>
                            <div>
                            <button className="addCommentBtn" id="addCommentBtn" >新增評論</button>
                            <button className="showCommentBtn" id="showCommentBtn" >查看評價</button>
                            </div>
                        </div>
                    </Row >
                    <br />
                </Container>
            </div>
            {/* <div className="commentArea">
            </div> */}
        </div>
    )
}

export default Detail;