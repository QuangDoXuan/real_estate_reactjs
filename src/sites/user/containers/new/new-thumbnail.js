import React from 'react'
import moment from 'moment'
import { BrowserRouter, Router, NavLink, Link } from "react-router-dom";
const resource_url = "https://localhost:44334"
class NewItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div className="one-item-new">
                <img src={resource_url + this.props.image} />
                <p className="title-item-new"><Link onClick={()=>{window.scrollTo(0,0)}} to={{ pathname: '/tin-tuc/chi-tiet-tin/'+this.props.title, state: { product: this.props.data }, }}  title={this.props.title}>{this.props.title}</Link></p>
                {this.props.description ?
                    <p className="content-item-news">
                        {this.props.description}
                    </p>
                    : ""}
                 {this.props.createDtime ?
                    <p className="user-date">
                        <i className="fal fa-clock mgr5" aria-hidden="true"></i>
                       {moment(this.props.createDtime).format("DD-MM-YYYY")}
                    </p>
                    : ""}

            </div>
        )
    }
}
export default NewItem