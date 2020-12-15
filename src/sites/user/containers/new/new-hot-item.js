import React from 'react'
import moment from 'moment'
import { BrowserRouter, Router, NavLink, Link } from "react-router-dom";
const resource_url = "http://localhost:3001"
class NewHotItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <div style={{ display: 'flex' }} className="one-item-new">
                    <img style={{ minWidth: 115,width:115, height: 75, margin: '8px 16px 8px 0px' }} src={resource_url + this.props.image} />
                    <p className="title-item-new"><Link onClick={()=>{window.scrollTo(0,0)}} to={{ pathname: '/tin-tuc/chi-tiet-tin/'+this.props.title, state: { product: this.props.data }, }}  title={this.props.title}>{this.props.title}</Link></p>
                    

                </div>
                <p style={{padding:0,borderBottom:'none'}} className="user-date">
                    <i className="fal fa-clock mgr5" aria-hidden="true"></i>
                    {moment(this.props.createDtime).format("DD-MM-YYYY")}

                </p>
            </div>
        )
    }
}
export default NewHotItem