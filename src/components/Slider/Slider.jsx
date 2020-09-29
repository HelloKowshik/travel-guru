import React, { useEffect, useState } from 'react';
import coxsBazar from '../../images/Image/Rectangle1.png';
import sreemangal from '../../images/Image/Sreemongol.png';
import sundarbans from '../../images/Image/sundorbon.png';
import { Link } from 'react-router-dom';
import areaData from '../../utils/fakeData/areaData';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Carousel from 'react-material-ui-carousel';


const Item = ({item:{areaName,desc,img}}) => {
    
    const [sliderImage, setSliderImage] = useState([coxsBazar, sreemangal, sundarbans]);
    useEffect(() => {
        if (img === sreemangal) {
            setSliderImage([sreemangal, coxsBazar, sundarbans])
        }
        if (img === sundarbans) {
            setSliderImage([sundarbans, sreemangal, coxsBazar])
        }
    }, [img])

    return (
        <Container style={{ backgroundColor: 'transparent', color: 'white', marginTop: '30px' }}>
            <Row>
                <Col style={{ maxWidth: '25%', marginLeft: '3rem' }}>
                    <h2>{areaName}</h2>
                    <p>{desc}</p>
                    <Link to={`/area/${areaName}`}>
                        <Button variant="warning" className="CheckButton font-weight-bold">
                            Booking 
                        </Button>
                    </Link>
                </Col>
                <Col className="slider-right" style={{ width: '75%' }}>
                    <img className="active" src={sliderImage[0]} alt="" />
                    <img src={sliderImage[1]} alt="" />
                    <img src={sliderImage[2]} alt="" />
                </Col>
            </Row>
        </Container>
    )
}

const Slider = () => {
    return (
        <Carousel>
            {
                areaData.map((item, index) => <Item key={index} item={item} />)
            }
        </Carousel>
    );
};


export default Slider;