import "./HomePage.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom'
import gtag from "../imgs/gtag.png";
import notfound from "../imgs/dogNotFound.png";

 //排順序的func!!!!!!!!!!!!!!!!
 function selectionSort(arr) {
    const length = arr.length;
    // 有幾個元素，就要找幾輪的最小值
    // 這邊的 i 代表 i 以前的元素都排序好了
    for (let i = 1; i < length; i++) {
        // 先預設第一個是最小的
        let min = arr[i]["corresTags"].length;
        let minIndex = i;

        // 從還沒排好的元素開始找最小值
        for (let j = i; j < length; j ++) {
            if (arr[j]["corresTags"].length < min) {
                min = arr[j]["corresTags"].length;
                minIndex = j;
            }
        }

        // ES6 的用法，交換兩個數值
        [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
    }
    return arr.reverse();
}





function Filter() {
    const { constraint } = useParams()
    const [foods, setFood] = useState([])
    const [arr, setArr] = useState([])
    console.log(constraint)

    useEffect(() => {
        fetch(`http://localhost:7000/api/v1/selector?constraint=${constraint}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.length)
                if(data.length === 0){
                    document.getElementById("notFound").style.display="block";
                }
                setFood(data)
                // console.log(typeof (data))
                // console.log(data)
                // console.log(typeof (foods))


                //這邊開始是先暫寫排序的測試qq
                let consArr = constraint.split('+')
                let transTemp = data;
                for (var i = 0; i < data.length; i++) {
                    let correspondTags = []; // 有符合的條件放進這個arr
                    let sortArr = [] //暫存偶數位是arr 奇數位是有符合的條件數
                    for (var j = 0; j < consArr.length; j++) {
                        if (data[i].tags.includes(consArr[j]) === true) {
                            if (consArr[j] === "成") {
                                correspondTags.push("成年")
                            } else if (consArr[j] === "脂") {
                                correspondTags.push("低脂")
                            } else if (consArr[j] === "骨") {
                                correspondTags.push("骨頭")
                            } else {
                                correspondTags.push(consArr[j])
                            }
                        }
                    }
                    // console.log(transTemp[i])
                    transTemp[i]['corresTags'] = correspondTags;
                    // console.log(transTemp[i])
                    sortArr.push(transTemp[i])
                    sortArr.push(correspondTags.length) //把符合的條件數記錄下來
                    // console.log(sortArr)
                }
                console.log(transTemp)
                // console.log(transTemp[0]["corresTags"])
                console.log(selectionSort(transTemp))
                setFood(transTemp)



            })
    }, [constraint])
    // console.log(foods)

    function tagF(index) {
        let tags = foods[index]['corresTags']
        let consArr = constraint.split('+')

        return (
            <div className="tagsSection">
                {tags.map((inner, ind) =>
                    <div className="tagsG"><img id="tagPho" src={gtag} /><font id="tagF">{inner}</font></div>
                )}
            </div>
        )

    }
    return (
        
        <Container>
          
            <div className="notFound" id="notFound" style={{ display: "none" }}>Not Found ! <img src={notfound}></img></div>
            <Row>
                {foods.map((inner, index) =>
                    <Col xs={6} lg={6} md={6} xl={3} d-block="true" >
                        <Link to={`/detail/${inner.id}`}><img id="p1" className="img-fluid img-thumbnail rounded" src={Object.values(JSON.parse(inner.img))[0]} /></Link>
                        <div className="des">
                            <font size="2" className="name">名稱 : </font>
                            <font size="2.5">{inner.name}</font>
                            <br />
                            <font size="2" className="brand" style={{ color: "gray" }}>廠牌 : </font>
                            <font size="2" style={{ color: "gray" }}>{inner.brand}</font>
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