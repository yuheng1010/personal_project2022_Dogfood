import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';
import './Detail.css';
import afoot from "../imgs/afoot.png"
import dogProfile from "../imgs/dogProfile.png"

function Detail() {
    const { id } = useParams()
    const [datas, setData] = useState([])
    const [ratingVal, setRatingVal] = React.useState(0);
  const [comments,setComments] = React.useState([]);
  const [commentGrade,setCommentGrade]=React.useState([])
    useEffect(() => {
        fetch(`http://52.8.249.71:7000/api/v1/detail?id=${id}`)
            .then(res => res.json())
            .then(data => {
                setData(data)
            })

            fetch(`http://52.8.249.71:7000/api/v1/productComment?Id=${id}`)
            .then(res => res.json())
            .then(data => {
              setComments(data.result)
              var grades=[]
              for(var i=0; i<data.result.length;i++){
                var grade=[]
                for(var j=0;j<data.result[i].grade;j++){
                  grade.push(j)
                }
                grades.push(grade)
              }
              setCommentGrade(grades)
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

    function aboutComment() {
        return (
            <div className="form">
              <div className="zi_box_1">
                <div className="rating" id="rating">
                  <i className="fa-regular fa-star fa-7xs" aria-hidden="true"></i>
                  <i className="fa-regular fa-star fa-7xs" aria-hidden="true"></i>
                  <i className="fa-regular fa-star fa-7xs" aria-hidden="true"></i>
                  <i className="fa-regular fa-star fa-7xs" aria-hidden="true"></i>
                  <i className="fa-regular fa-star fa-7xs" aria-hidden="true"></i>
                  </div>
                </div>
                <font id="rating-value"></font>
    
              <div className="form__field">
              <div className="zi_box_2">
                {/* <div className="form__field-name" id='content'>評論</div> */}
                <textarea className="form__field-input" />
                </div>
              </div>
              <button className="submitCommentBtn" id="submitCommentBtn" onClick={submit}>新增</button>
            </div>
        )
      }
      function commentBlock() {
        document.querySelector('#infoModal').showModal();
        const stars = document.querySelector(".rating").children;
        let ratingValue
        let index
        for (let i = 0; i < stars.length; i++) {
          stars[i].addEventListener("mouseover", function () {
            for (let j = 0; j < stars.length; j++) {
              stars[j].classList.remove("fa-solid")
              stars[j].classList.add("fa-regular")
            }
            for (let j = 0; j <= i; j++) {
              stars[j].classList.remove("fa-regular")
              stars[j].classList.add("fa-solid")
            }
          })
          stars[i].addEventListener("click", function () {
            ratingValue = i + 1
            index = i
            document.getElementById("rating-value").innerText = "分數 : " + ratingValue;
            setRatingVal(ratingValue);
          })
          stars[i].addEventListener("mouseout", function () {
            for (let j = 0; j < stars.length; j++) {
              stars[j].classList.remove("fa-solid")
              stars[j].classList.add("fa-regular")
            }
            for (let j = 0; j <= index; j++) {
              stars[j].classList.remove("fa-regular")
              stars[j].classList.add("fa-solid")
            }
          })
        }
      }
      function close() {
        document.querySelector('#infoModal').close();
      }

      function submit() {
        let jwtToken=''
        if(window.localStorage.getItem('token')){
             jwtToken = window.localStorage.getItem('token')
        }
       
        var grade = ratingVal;
        var content = document.querySelector('.form__field-input').value;
        if (!content || grade === 0) {
          alert('請填寫完整評論')
        } else {
            fetch('http://52.8.249.71:7000/api/v1/addComment',{
                body: JSON.stringify({grade:grade,content:content,pId:id}),
                headers: new Headers({
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${jwtToken}`,
                }),
                method: 'POST',
              }).then((response) => response.json());
            }
          close()
          window.location.reload()
    
      }
      function getProductComment(){
        console.log(comments)
        if(comments.length===0){return '尚無評論'}
      }


    return (
        <div >
                <Container >
                    <div className='detailsAll'>
                    <Row className='justify-content-center align-items-center'>
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
                            <button className="addCommentBtn" id="addCommentBtn" onClick={commentBlock}>新增評論</button>
                            <button className="showCommentBtn" id="showCommentBtn" >查看評價</button>
                            </div>
                        </div>
                    </Row >
                    <br />
                    </div>
                </Container>

                 <div className="commentArea">
      {getProductComment()}
        {comments.map((comment,index)=>(
          <div className="comment">
            <div className="profileback"><img className="commentPic" src={dogProfile} ></img></div>
            <div>
              <div className="commentId">編號 : {comment.cId}</div>
              <div className="commentgrade">
                {commentGrade[index].map((x)=>(<i className="fa-solid fa-star small" aria-hidden="true"></i>))}
                評分 : {comment.grade}
              </div>
              <div className="commentUserId">使用者id : {comment.userId}</div>
              <div className="commentContent">評論 : {comment.text}</div>
            </div>
          </div>
        ))}

      </div> 
      <dialog id="infoModal">
        <input type='button' id="close" onClick={close} value='X' />
        {aboutComment()}
      </dialog>
    </div>

            
           
      
    )
}

export default Detail;