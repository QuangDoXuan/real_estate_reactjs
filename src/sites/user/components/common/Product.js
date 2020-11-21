import React from 'react'
import { BrowserRouter, Router, NavLink, Link } from "react-router-dom";

class Product extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="pj-item d-flex border-radius-5px color-red">
                <div className="image-thumb">
                    <Link onClick={()=>{window.scrollTo(0,0)}} to={{ pathname: '/tin-dang', state: { product: this.props.data }}} >
                        <img className="lazy avatar" src={this.props.image} alt="Bảo Lộc Park Hills"/>
                        <div className="bg-opacity dangban">
                            <span className="status-bg">{this.props.status}</span>
                            <span className="status-icon" />
                        </div>
                    </Link>
                </div>

                <div className="right-side">
                    <Link to={this.props.slug} className="product-name">
                        {this.props.title}
                    </Link>
                    <div dangerouslySetInnerHTML={{ __html: this.props.description}} className="one-row-project-info d-flex">
                    </div>
                    <div className="border-bottom" style={{fontSize: 13, color: '#000'}}>{this.props.address}</div>

                    <div className="d-flex info-product" style={{color: '#000',  alignItems: 'center', marginTop: 20 }}>
                        <span style={{ padding: '0 24px', fontSize: 20,}}>{this.props.price}</span>
                        <span>{this.props.area}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default Product