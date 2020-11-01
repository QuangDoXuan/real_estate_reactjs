import React from 'react'
import Product from '../../containers/product/product'


import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GoogleMap from './maps'

import productProvider from '../../../../data-access/product-provider'
import productCategoryProvider from '../../../../data-access/product-category-provider'
import areaProvider from '../../../../data-access/area-provider'
import priceSold from '../../../../data-access/pricesold-provider'

import LinearProgress from '@material-ui/core/LinearProgress';
import { ClickAwayListener } from '@material-ui/core';

class AllProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lstProduct: [],
      productList: this.props.location.state.data ? this.props.location.state.data : [],
      province: this.props.location.state.productAddress ? this.props.location.state.productAddress : 'Thành phố Hà Nội',
      activeType: false,
      listType: [],
      type: 'Loại nhà đất',
      priceTitle: "Gía",
      areaTitle: "Diện tích",
      openPrice: false,
      openArea: false,
      productCategoryId: '',
      fromPrice: '',
      toPrice: '',
      fromArea: '',
      toArea: '',
      parentCategoryId: this.props.location.state.data&&this.props.location.state.data[0]?this.props.location.state.data[0].ProductCategory.ParentProductCategoryId:'',
      listParentCategory:[],
      parentProductCategoryTitle:'Chọn',
      productAddress:this.props.location.state.productAddress ? this.props.location.state.productAddress : '',
    }
  }

  componentDidMount() {
    // this.checkSearch()
    this.getAllType()
    this.getAllParent()
  }

  // checkSearch() {
  //   if (!this.props.location.state.data) {
  //     productProvider.getAll().then(res => {
  //       if (res.Code == 200) {
  //         this.setState({
  //           productList: res.Data
  //         })
  //       }
  //     }).catch(e => {
  //       console.log(e)
  //     })
  //   }

  // }
  getAllType() {
    productCategoryProvider.getAll().then(res => {
      console.log(res)
      if (res.Code == 200) {
        this.setState({
          listType: res.Data
        })
      }
    }).catch(e => {
      console.log(e)
    })
  }

  search=()=>{
    this.setState({progress:true})
    let param = {
      ProductCategoryId: this.state.productCategoryId,
      ProductPriceStart: this.state.fromPrice,
      ProductPriceEnd: this.state.toPrice,
      ProductAreaStart: this.state.fromArea,
      ProductAreaEnd: this.state.toArea,
      ProductAddress: this.state.productAddress,
      ParentProductCategoryId: this.state.parentCategoryId
  }

    productProvider.search(param).then(res=>{
        if(res.Code==200){
          this.setState({
            productList: res.Data,
            progress:false
          })
        }
    }).catch(e=>{
      console.log(e)
      this.setState({progress:false})
    })
  }

  getAllParent(){
    productCategoryProvider.getAll().then(res=>{
      if(res.Code==200){
        this.setState({
          listParentCategory: res.Data.filter(item=>item.ParentProductCategoryId==1)
        })
      }
    }).catch(e=>{
      console.log(e)
    })
  }

  checkPrice=(e)=>{
    if(e.target.value!==''){
      // this.setState({

      // })
      this.search()
    }
  }
  checkArea=(e)=>{
    if(e.target.value!==''){
      this.search()
    }
  }


  render() {
    const { classes } = this.props
    return (
      <div className={classes.homeContent + " " + "content box-filter"}>
        <div className="utility">
          <div className="container-1">
            <div className="row" id="mybox">
              <div className="col search-auto">
                <form ng-submit="goToPageSearch" method="post" className="ng-pristine ng-valid">
                  <div className="search  search-box">
                    <div className="select">
                      <select name="loaiTinName" onChange={(e)=>this.setState({parentCategoryId:e.target.value})} className="ng-pristine ng-valid ng-not-empty ng-touched">
                        {this.state.listParentCategory.length> 0 ?
                          this.state.listParentCategory.map((item,index)=>{
                            return(
                              <option key={index} value={item.ProductCategoryId} >{item.ProductCategoryTitle}</option>
                            )
                          })
                      :''}
                      </select>
                    </div>
                    <div className="search-ipt">
                      <input onChange={(e) => { this.setState({ productAddress: e.target.value }) }} type="text" className="form-control ng-pristine ng-valid ui-autocomplete-input ng-not-empty ng-touched" placeholder="Tìm kiếm theo địa chính, dự án, địa chỉ" />
                      <button onClick={()=>this.search()} className="btn-search"  type="button"><i className="fas fa-search" /> <span className="text" /></button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col search-type search-resize search-loainhadat">
                <div className="option search-custom">
                  <div className="select">
                    <a onClick={() => this.setState({ activeType: !this.state.activeType })} className="search-link ng-binding">{this.state.type}</a>
                  </div>
                  <div className="search-pop" style={{}}>
                    {this.state.activeType ?
                      <ul>
                        {this.state.listType.map((item, index) => {
                          return (
                            <li key={index} onClick={() => this.setState({ type: item.ProductCategoryTitle, activeType: false,productCategoryId:item.productCategoryId })}>{item.ProductCategoryTitle}</li>
                          )
                        })}
                      </ul> : ""}

                  </div>
                </div>
              </div>
              <div className="col search-price search-resize">
                <div className="option search-custom">
                  <div className="select">
                      <input onChange={()=>this.search()} value={this.state.priceTitle} disabled className="search-link ng-binding"/>
                      <i onClick={() => this.setState({ openPrice: !this.state.openPrice })}  className="fas fa-chevron-down"></i>
                  </div>
                
                  {this.state.openPrice ?
                    <ClickAwayListener onClickAway={()=>this.setState({openPrice:false})}>
                    <div className="search-pop" >

                      <ul>
                        <li>
                          <input onChange={(e) => this.setState({ fromPrice: e.target.value })} type="text" placeholder="Từ" />
                          <input onChange={(e) => this.setState({ toPrice: e.target.value })} onBlur={(e)=>this.checkPrice(e)} type="text" placeholder="Đến" />
                        </li>
                        {priceSold.map((item, index) => {
                          return (
                            <li onClick={() => { this.setState({ priceTitle: item.title, fromPrice: item.from, toPrice: item.to,openPrice:false },()=>this.search()) }} key={index}>{item.title}</li>
                          )
                        })}

                      </ul>
                    </div>
                    </ClickAwayListener>
                    : ''}
               
                </div>
              </div>
              <div className="col search-meter search-resize">
                <div className="option search-custom">
                  <div className="select">
                      <input onChange={this.search} value={this.state.areaTitle} disabled className="search-link ng-binding"/>
                      <i  onClick={() => this.setState({ openArea: !this.state.openArea })}  className="fas fa-chevron-down"></i>
                  </div>
                  
                  {this.state.openArea ?
                  <ClickAwayListener onClickAway={()=>this.setState({openArea:false})}>
                    <div className="search-pop" style={{}}>
                      <ul className="form">
                        <li>
                          <input onChange={(e) => this.setState({ fromArea: e.target.value })} type="text" pattern="[0-9]*" placeholder="Từ" />
                          <input onChange={(e) => this.setState({ toArea: e.target.value })} onBlur={(e)=>this.checkArea(e)} type="text" pattern="[0-9]*" placeholder="Đến" />
                        </li>
                        {areaProvider.map((item, index) => {
                          return (
                            <li key={index} onClick={() => this.setState({ areaTitle: item.title, fromArea: item.from, toArea: item.to, openArea:false },()=>this.search())}>{item.title}</li>
                          )
                        })}
                      </ul>
                    </div>
                    </ClickAwayListener>
                    : ''}
               
                </div>
              </div>


            </div>
          </div>
        </div>

        <div className=" all-product">
          {this.props.location.state.productAddress ? <h4>Bán bất động sản tại {this.props.location.state.productAddress}</h4> : <h4>Bất động sản tại thành phố Hà Nội</h4>}

          <div className="row">
            <div className="col-xs-12 col-md-6 list-product">

            {this.state.progress ? <LinearProgress /> : null}

              <div className="row">
                {this.state.productList&&this.state.productList.length>0?this.state.productList.map((item, index) => {
                  return (
                    <div key={index} className="col-xs-6 col-md-6 one-product-item">
                      <Product
                        ProductPrice={item.ProductPrice}
                        CreateDTime={item.CreateDTime}
                        ProductThumbnail={item.ProductThumbnail}
                        ProductSummary={item.ProductSummary}
                        data={item}
                      />
                    </div>
                  )

                })

                :"Không có kết quả"}
                {/* {this.state.progress?<div>Đang tải...</div>:''} */}
              </div>
            </div>
            <div className="maps col-xs-12 col-md-6">
              <GoogleMap
                lat={this.props.location.state.lat ? this.props.location.state.lat : 21.0294498}
                lon={this.props.location.state.lon ? this.props.location.state.lon : 105.8544441}
                address={this.state.productAddress?this.state.productAddress:'Thành phố Hà Nội'}
                hasAddress={this.state.productAddress?true:false}
              />

            </div>
          </div>

        </div>


      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userApp: state.userApp
  };
}


const styles = theme => ({
  homeContent: {
    position: 'relative',
    boxSizing: 'border-box',
    display: 'block',
    paddingTop: 50,
  }
});


AllProduct.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(AllProduct));