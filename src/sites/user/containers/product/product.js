import React from 'react'
import {withRouter} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import moment from 'moment'
import {
    Card, CardImg, CardText, CardBody, Button,
    CardTitle, Row, Col, Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption
} from 'reactstrap'
import { BrowserRouter, Router, NavLink, Link } from "react-router-dom";
import clientUtils from '../../../../utils/client-utils'
import Detail from './product-detail'
const resource_url = "https://localhost:44334/"

class Product extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidUpdate(prevProps) {
        if (
          this.props.location.pathname !== prevProps.location.pathname
        ) {
          window.scrollTo(0, 0);
        }
    }

    onClickDetail(){
        this.props.history.push({
            pathname:"/tin-dang",
            state:{ product:this.props.data}
        })
    }

    render() {
        return (
            <Card>
                <div className='card-img-wrapper'>
                <Link onClick={()=>{window.scrollTo(0,0)}} to={{ pathname: '/tin-dang', state: { product: this.props.data }, }} ><CardImg className="img-thumbnail" top width="100%" src={this.props.ProductThumbnail} alt="" /></Link> 
                </div>
                <CardBody>
                    <div style={{borderBottom:'1px solid #dadada',padding:"8px 0"}} className="row-top-product">
                    <span style={{ fontWeight: 600, fontSize: 18 }}>{this.props.ProductPrice}</span>
                    <span style={{ marginTop: 3, float: 'right', fontSize: 12, color: '#8796ac' }}>{moment(this.props.CreateDtime).format("DD-MM-YYYY")}</span>
                    </div>
                    <CardTitle>
                        <span><i className="fas fa-expand"></i> {this.props.data.area}</span>
                        {/* <span><i className="fas fa-bath"></i> {this.props.data.bedrooms}</span>
                        <span><i className="fas fa-bed"></i> {this.props.data.bedrooms}</span> */}
                    </CardTitle>
                    
                    <CardText>{this.props.ProductSummary}</CardText>
                    <div style={{ textAlign: 'right' }}>
                        {/* <form id="form_detail">
                            <button type="submit"> */}
                                <Link to={{ pathname: '/tin-dang/', state: { product: this.props.data }, }} className='read-more'>Xem thêm</Link>
                            {/* </button>
                        </form> */}
                    </div>
                </CardBody>
            </Card>
        )
    }
}
export default withRouter(Product)