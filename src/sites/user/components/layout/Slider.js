import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';
// import {Background} from '/images/slide1.jpg'

import listDistrict from '../../../../data-access/district-provider'
import listHire from '../../../../data-access/pricehire-provider'
import listSold from '../../../../data-access/pricesold-provider'
import listArea from '../../../../data-access/area-provider'
//UI
import { ClickAwayListener } from '@material-ui/core';
import productProvider from '../../../../data-access/product-provider';
import productCategoryProvider from '../../../../data-access/product-category-provider';

import  { Redirect } from 'react-router-dom'

const listCategory = [
    { id: 1, CategoryName: "Thích thì bán" },
    { id: 2, CategoryName: "Không thích thì thôi" },
    { id: 3, CategoryName: "Làm gì được nhau" },
    { id: 4, CategoryName: "Bán nhà đất" },
]

class Slide extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeLeft: false,
            districtId: '',
            districtName: '',
            address: '',
            activeAddress: false,
            activeCategory: false,
            activePrice:false,
            activeArea:false,
            priceTitle:"Giá",
            fromPrice:'',
            toPrice:'',
            fromArea:'',
            toArea:'',
            categoryName: "Loại nhà đất",
            areaTitle:'Diện tích',
            ParentProductCategory:'',
            ProductCategoryId:'',
            lstCategoryProduct:[]
        }
    }

    componentDidMount() {
        this.loadProductCategory()
    }

    loadProductCategory(){
        productCategoryProvider.getAll().then(res=>{
            if(res.Code==200){
                this.setState({
                    lstCategoryProduct:res.Data
                })
            }
        })
    }
    // searchProduct(){
    //     productProvider.
    // }


    handleClickLeft = () => {
        this.setState({
            activeLeft: true,
            ParentProductCategory:2
        })
    }

    handleClickRight = () => {
        this.setState({
            activeLeft: false,
            ParentProductCategory:1
        })
    }

    selectDistrict = (item, name) => {
        this.setState({
            activeAddress: false,
            districtId: item,
            districtName: name
        })
    }


    openAddress = () => {
        this.setState({
            activeAddress: !this.state.activeAddress,
        })
    }

    searchAllProduct = ()=>{
        let param = {
            ProductCategoryId: this.state.ProductCategoryId,
            ProductPriceStart: this.state.fromPrice,
            ProductPriceEnd: this.state.toPrice,
            ProductAreaStart: this.state.fromArea,
            ProductAreaEnd: this.state.toArea,
            ProductAddress: this.state.districtName

        }
       productCategoryProvider.getAll().then(res=>{
           console.log(res)
           if(res.Code==200){
            this.context.router.history.push('/san-pham')
           }
       }).catch(e=>{
           console.log(e)
       })
    }

    render() {
        const { classes } = this.props
        const { provinceId, districtId, address } = this.state
        return (
            <div className={classes.slider + ' ' + 'slider-home'}>
                <div className="container">
                    <div className="home-search">
                        <h1 className="slogan">
                            Tìm kiếm bất động sản<br /> với hơn 20.000 tin mỗi ngày
                        </h1>
                        <p className="txt-center lst-btn-loaitin clb">
                            <a onClick={this.handleClickLeft} className={this.state.activeLeft ? "btn-loaitin mgr10 active" : "btn-loaitin mgr10 "} title="Bán">Bán</a>
                            <a onClick={this.handleClickRight} className={this.state.activeLeft == false ? "btn-loaitin active" : "btn-loaitin"} title="Cho thuê">Cho thuê</a>
                        </p>

                        <div className="box-search-input clb position-re font18">
                            <input onChange={(event) => this.setState({ districtName: event.target.value })} value={this.state.districtName} type="text" className="fll pdl10 ng-pristine ng-valid ui-autocomplete-input ng-not-empty ng-touched" />
                            <a onClick={this.openAddress} style={{ color: '#00000' }} className="select-city-search fll" title="Thành phố">
                                Thành phố
                                <i className="fas fa-chevron-down"></i>
                                {
                                    this.state.activeAddress ?
                                        <ClickAwayListener onClickAway={this.openAddress}>
                                            <div >
                                                {
                                                    <div className="list-data-address">
                                                        <p className="title-chon-tinh">
                                                            CHỌN QUẬN/HUYỆN
                                                        </p>
                                                        <ul className="list-tinh">
                                                            {listDistrict.map((item, index) => {
                                                                return (
                                                                    <li key={index} onClick={() => this.selectDistrict(item.ID, item.Title)}>{item.Title}</li>
                                                                )
                                                            })}

                                                        </ul>
                                                    </div>
                                                }
                                            </div>
                                        </ClickAwayListener>
                                        : ""}
                            </a>
                            <button onClick={this.searchAllProduct} className="btn-search-home flr" >
                                <i className="fas fa-search"></i>
                            </button>
                        </div>

                        <div className="rowduoi">
                            <ClickAwayListener onClickAway={() => this.setState({ activeCategory: false })}>
                                <div onClick={() => this.setState({ activeCategory: !this.state.activeCategory })} className="select col-md-4 ">{this.state.categoryName}
                                    <i className="fas fa-chevron-down"></i>
                                    {this.state.activeCategory ?
                                        <div className="list-cateproduct">
                                            <ul className="list-loaisp">
                                                {
                                                    this.state.lstCategoryProduct.map((item, index) => {
                                                        return (
                                                            <li onClick={()=>this.setState({categoryName:item.CategoryName})} key={index}>{item.CategoryName}</li>
                                                        )

                                                    })
                                                }
                                            </ul>
                                        </div> : ""
                                    }

                                </div>
                            </ClickAwayListener>
                            <ClickAwayListener onClickAway={()=>this.setState({activePrice:false})}>
                            <div onClick={()=>{this.setState({activePrice:!this.state.activePrice})}} className="select col-md-4 mg08">
                                {this.state.priceTitle}
                                <i className="fas fa-chevron-down"></i>
                                {this.state.activePrice? 
                                <ul className="list-price">
                                    {this.state.activeLeft?
                                        listSold.map((item,index)=>{
                                            return(
                                                <li onClick={()=>{this.setState({priceTitle:item.title,fromPrice:item.from,toPrice:item.to})}} key={index}>{item.title}</li>
                                            )
                                        })
                                    :
                                        listHire.map((item,index)=>{
                                            return (
                                            <li onClick={()=>{this.setState({priceTitle:item.title,fromPrice:item.from,toPrice:item.to})}} key={index}>{item.title}</li>
                                            )
                                        })
                                    }
                                </ul> :""}
                            </div>
                            </ClickAwayListener>
                            <ClickAwayListener onClickAway={()=>this.setState({activeArea:false})}>
                            <div onClick={()=>{this.setState({activeArea:!this.state.activeArea})}} className="select col-md-4">
                               {this.state.areaTitle}
                                <i className="fas fa-chevron-down"></i>
                                {
                                    this.state.activeArea?
                                    <ul className="list-area">
                                        {listArea.map((item,index)=>{
                                            return(
                                            <li onClick={()=>this.setState({areaTitle:item.title,fromArea:item.from,toArea:item.to})}>{item.title}</li>
                                            )
                                        })}
                                       
                                    </ul>
                                :""}
                            </div>
                            </ClickAwayListener>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}



const styles = theme => ({
    backGround: {
        marginTop: 10
    },
    slider: {
        backgroundImage: `url(/images/bg061020_2.jpg)`,
        position: 'relative',
        top: 115,
        width: '100%',
    }
});


Slide.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Slide);