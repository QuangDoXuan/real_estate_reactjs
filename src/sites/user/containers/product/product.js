import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import moment from 'moment'
import {
    Card, CardImg, CardText, CardBody, Button,
    CardTitle, Row, Col, Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption
} from 'reactstrap'
import { BrowserRouter, Router, NavLink, Link } from "react-router-dom";
import clientUtils from '../../../../utils/client-utils'
const resource_url = "https://localhost:44334/"

class Product extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            // <div className="one-new col-sm-6 col-md-3">
                <Card>
                    <div className='card-img-wrapper'>
                    <Link onClick={()=>{window.scrollTo(0,0)}} to={{ pathname: '/tin-dang', state: { product: this.props.data }, }} ><CardImg className="img-thumbnail" top width="100%" src={resource_url + this.props.ProductThumbnail} alt="" /></Link> 
                    </div>
                    <CardBody>
                        <div style={{borderBottom:'1px solid #dadada',padding:"8px 0"}} className="row-top-product">
                        <span style={{ fontWeight: 600, fontSize: 18 }}>{Number(this.props.ProductPrice).formatMoney()}đ</span>
                        <span style={{ marginTop: 3, float: 'right', fontSize: 12, color: '#8796ac' }}>{moment(this.props.CreateDtime).format("DD-MM-YYYY")}</span>
                        </div>
                        <CardTitle>
                            <span><i className="fas fa-expand"></i> {this.props.data.ProductArea}m<sup>2</sup></span>
                            <span><i className="fas fa-bath"></i> {this.props.data.ProductBathrooms}</span>
                            <span><i className="fas fa-bed"></i> {this.props.data.ProductBedrooms}</span>
                        </CardTitle>
                        
                        <CardText>{this.props.ProductSummary}</CardText>
                        <div style={{ textAlign: 'right' }}>

                            <Link onClick={()=>{window.scrollTo(0,0)}} to={{ pathname: '/tin-dang', state: { product: this.props.data }, }} className='read-more'>Xem thêm</Link>

                        </div>
                    </CardBody>
                </Card>
            // </div>
        )
    }
}
export default Product