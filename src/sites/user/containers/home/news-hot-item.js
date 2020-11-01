import React from 'react'
import moment from 'moment'
import { BrowserRouter, Router, NavLink, Link } from "react-router-dom";
const resource_url = "https://localhost:44334/"

// 

class NewsItem extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        console.log()
        return (
            <div className="item-list-news dplflex mgt30 ng-scope" ng-repeat="news in mc.listNews track by $index">
            <img className="fll img-hot-items txt-center" src={resource_url+this.props.image} />
            <div className="flr mgl30">
                <p className="user-date mgbt10">
                    <i className="fal fa-clock mgr5" />
                    {moment(this.props.time).format("DD-MM-YYYY")}
            </p>
        <h2 className="font20 line-height134 ovh two-rows-three-dotes"><a className="text-news">{this.props.title}</a></h2>
                <div className="sub-content-news mgt10  mgbt5 ovh two-rows-three-dotes ng-binding ng-scope" ng-if="news.meta_desc">{this.props.data.NewDescription} </div>

                <p className="line-height40 mgt10">
                   <a><Link onClick={()=>{window.scrollTo(0,0)}} to={{ pathname: '/tin-tuc/chi-tiet-tin/'+this.props.title, state: { product: this.props.data }, }}  title={this.props.title} className="btn-detail-news">Đọc tiếp</Link></a> 
                </p>

            </div>
        </div>
        )
    }
}
export default NewsItem