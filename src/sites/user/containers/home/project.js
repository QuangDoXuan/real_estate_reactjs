import React from 'react'
import { BrowserRouter, Router, NavLink, Link } from "react-router-dom";

class Project extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="pj-item d-flex border-radius-5px color-red">
                <div className="image-thumb">
                    <Link to={{ pathname: '/du-an/chi-tiet-du-an/' + this.props.data.name, state: { product: this.props.data }, }}  title={this.props.data.name}>
                        <img className="lazy avatar" src={this.props.image} alt="Bảo Lộc Park Hills" style={{}} />
                        <div className="bg-opacity dangban">
                            <span className="status-bg">{this.props.status}</span>
                            <span className="status-icon" />
                        </div>
                    </Link>
                </div>

                <div className="right-side">
                    <Link to={{ pathname: '/du-an/chi-tiet-du-an/' + this.props.data.name, state: { product: this.props.data }, }}  title={this.props.data.name} className="project-name">
                        {this.props.title}
                    </Link>
                    <div className="ver-box-address info-address border-bottom">{this.props.address}</div>
                    <span className="ver-box-price info-price">
                        {this.props.price}
                    </span>
                    <div className="one-row-project-info d-flex">
                        <Link to={this.props.companySlug} className="info-icon info-investor ver-box-detail">{this.props.company}</Link>
                        <span className="info-acreage info-icon ver-box-detail" title="135, 500 m2">{this.props.totalArea}</span>
                    </div>
                    <div className="one-row-project-info d-flex">
                        <span className="info-finish info-icon ver-box-detail">Bàn giao: {this.props.releaseAt || "Đang cập nhật"}</span>
                        <span className="info-constructor info-icon ver-box-detail">{this.props.buildStatus}</span>
                    </div>

                    <div className="info-category">
                        <div className="info-category-box">
                            <a href="ban-dat-nen-du-an" className="ver-box-category border-radius-5px" title="Đất nền dự án">Đất nền dự án</a>
                        </div>
                        <div className="compare-box">
                            <a style={{ padding: 0, paddingLeft: 8 }} href="/so-sanh-du-an?ids=5033" title="Bảo Lộc Park Hills" className="btn-compare-desktop" onclick="AddProjectCompare(5033,'Bảo Lộc Park Hills','Đường Lý Thái Tổ, xã Đambri, thành phố Bảo Lộc, tỉnh Lâm Đồng','https://img.homedy.com/store/images/2020/10/26/122688534-3402322149875792-4202127064093550815-n-637393034769468197.jpg_480x320.jpg' , '/bao-loc-park-hills-pj27336200' ,'37 ','392','79 ','11.58136972080716' ,'107.80249323862306' )">
                                <span className="name-compare">So sánh</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Project