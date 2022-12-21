import "./HomePage.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router,Switch,Route,Link, useLocation} from "react-router-dom";
import { useParams} from 'react-router-dom'
import gtag from "../imgs/gtag.png";

function Filter() {
    const {constraint} = useParams()
    const [foods, setFood] = useState([])
    const [arr, setArr] = useState([])
  
    useEffect(() => {
        fetch(`http://52.8.249.71:7000/api/v1/selector?constraint=${constraint}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setFood(data)
                let consArr = constraint.split('+')
                let tags=[]
                for(var i=0; i<data.length; i++){
                    for(var j=0; j<consArr.length; j++){
                        if(foods[i].tags.includes(consArr[j])===true){
                            if(consArr[j]==="成"){
                                tags.push("成年")
                            }else if(consArr[j]==="脂"){
                                tags.push("低脂")
                            }else if(consArr[j]==="骨"){
                                tags.push("骨頭")
                            }else{
                                tags.push(consArr[j])
                            }
                        }
                    }
                }
                
                
            })
    }, [constraint])

    function tagF(index){
        console.log(foods[index])
        let tags=[]
        let consArr = constraint.split('+')

            for(var i=0;i<consArr.length;i++){
                if(foods[index].tags.includes(consArr[i])===true){
                    if(consArr[i]==="成"){
                        tags.push("成年")
                    }else if(consArr[i]==="脂"){
                        tags.push("低脂")
                    }else if(consArr[i]==="骨"){
                        tags.push("骨頭")
                    }else{
                        tags.push(consArr[i])
                    }
                }
            }

        return(
            <div className="tagsSection">
            {tags.map((inner,ind)=>
                <div className="tagsG"><img id="tagPho" src={gtag}/><font id="tagF">{inner}</font></div>
            )}
            </div>
        )

    }
    return (
        <Container>
            <Row>
            {foods.map((inner, index) =>
                <Col xs={6} lg={6} md={6} xl={3} d-block="true" >
                    <Link to={`/detail/${inner.id}`}><img id="p1" className="img-fluid img-thumbnail rounded" src={Object.values(JSON.parse(inner.img))} /></Link>
                    <div className="des">
                        <font size="2" className="name">名稱 : </font>
                        <font size="2.5">{inner.name}</font>
                        <br />
                        <font size="2" className="brand" style={{color:"gray"}}>廠牌 : </font>
                        <font size="2" style={{color:"gray"}}>{inner.brand}</font>
                        <br />
                        {tagF(index)}
                    </div>
                </Col>
            )}
        </Row>
        </Container >
    )
}

export default Filter;