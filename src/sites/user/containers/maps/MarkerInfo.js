import React from 'react'
import { BrowserRouter, Router, NavLink, Link } from "react-router-dom";
class MarkerInfo extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        return(
            <div className="map-detail product-detail">
                <div className="cover-image">
                    <img src={this.props.image}/>
                </div>
                <div className="box-text">
                    <Link to={{ pathname: '/tin-dang/', state: { product: this.props.data }, }} className="title-product">{this.props.title}</Link>
                    <p className="price-product">Giá: {this.props.price}</p>
                </div>
            </div>
        )
    }
}
export default MarkerInfo