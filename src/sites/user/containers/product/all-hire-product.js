import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Product from '../../components/common/Product'
import productProvider from '../../../../data-access/product-provider'
import districtProvider from '../../../../data-access/district-provider'
import areaProvider from '../../../../data-access/area-provider'
import priceSoldProvider from '../../../../data-access/pricesold-provider'
import priceHireProvider from '../../../../data-access/pricehire-provider'
import categoryProvider from '../../../../data-access/category-provider';
import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");
class AllHireProduct extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      openSelectAddress: false,
      openSelectCategory: false,
      openSelectPrice: false,
      openSelectArea: false,
      address:'',
      category: '',
      listSell: [],
      listCategories: [],
      fromPrice:0,
      toPrice:100000000000,
      price:'',
      fromArea: 0,
      toArea: 100000,
      area:'',
      page: 1,
      size: 20
    }
  }
  componentDidMount(){
    this.getListSell();
    this.getListCategories();
  }

  getListSell(){
    productProvider.search({type: 2, page: this.state.page, per: this.state.size}).then(res=>{
      console.log(res)
      this.setState({
        listSell: res
      })
    }).catch(e=>{
      console.log(e)
    })
  }

  getListCategories(){
    categoryProvider.getByParent(2).then(res=>{
      console.log(res)
      this.setState({
        listCategories: res
      })
    }).catch(e=>{
      console.log(e)
    })
  }

  onSelectAddress(item){
    this.setState({
      address: item.Title, 
      openSelectAddress: !this.state.openSelectAddress
    }, ()=>this.search())
  }

  onSelectCategory(item){
    this.setState({
      category: item.name, 
      openSelectCategory: !this.state.openSelectCategory
    },()=>this.search())
  }

  onSelectPrice(item){
    this.setState({
      price: item.title,
      fromPrice: item.from,
      toPrice: item.to,
      openSelectPrice: !this.state.openSelectPrice
    }, ()=>this.search())

  }

  onSelectArea(item){
    this.setState({
      area: item.title,
      fromArea: item.from,
      toArea: item.to,
      openSelectArea: !this.state.openSelectArea
    }, ()=>this.search())
  }

  search(){
    this.setState({progress: true})
    let body = {
      page: this.state.page,
      per: this.state.per,
      priceStart: this.state.fromPrice,
      priceEnd: this.state.toPrice,
      areaStart: this.state.fromArea,
      areaEnd: this.state.toArea,
      address: this.state.address,
      parentCategory: 2
    }
    productProvider.filter(body).then(res=>{
      this.setState({
        listSell: res
      }, ()=>this.setState({progress: false}))
    }).catch(e=>{
      console.log(e)
    })
  }

  handlePageChange(pageNumber) {
    this.setState({page: pageNumber},()=>this.search());
    window.scrollTo(0, 0)
  }

  render(){
    const { classes } = this.props
    const {listCategories} = this.state
    return (
      <div className={classes.homeContent}>
        <div className="search-bar">
          <div className="container select-list-items d-flex">
            <div className="select-item select-address">
            <div onClick = {()=> this.setState({ openSelectAddress: !this.state.openSelectAddress })} className="box-selected selected-address">{this.state.address == '' ? "Quận/Huyện" : this.state.address}</div>
              {this.state.openSelectAddress ? 
                <ul className="list-parent-cateogry">
                  {districtProvider.map((item, index) => {
                    return (
                      <li onClick={()=> this.onSelectAddress(item)} key={index} className="item-select-search"><a>{item.Title}</a></li>
                    )
                  })}
                </ul>
              :''}
            </div>
            <div className="select-item select-category">
                <div onClick = {()=> this.setState({openSelectCategory: !this.state.openSelectCategory})} className="box-selected selected-category">{this.state.category == '' ? "Loại BĐS" : this.state.category}</div>
              {this.state.openSelectCategory ? 
              <ul className="list-parent-cateogry">
                {listCategories && listCategories.length > 0 ? listCategories.map((item,index)=>{
                  return (
                    <li key={index} onClick={()=> this.onSelectCategory(item)} className="item-select-search"><a>{item.name}</a></li>
                  )
                }):''}

              </ul>
              : ''}
            </div>
            <div className="select-item select-price">
              <div onClick={()=> this.setState({openSelectPrice: !this.state.openSelectPrice})} className="box-selected selected-price">{this.state.price == '' ? 'Khoảng giá': this.state.price}</div>
              {this.state.openSelectPrice ? 
                <ul className="list-parent-cateogry">
                  {priceHireProvider.map((item, index) => {
                    return(
                      <li onClick={()=> this.onSelectPrice(item)} className="item-select-search"><a>{item.title}</a></li>
                    )
                  })}
                </ul>
              :''}
            </div>
            <div className="select-item select-area">
                <div onClick={()=>this.setState({ openSelectArea: !this.state.openSelectArea })} className="box-selected selected-area">{this.state.area == '' ? 'Diện tích': this.state.area}</div>
              {this.state.openSelectArea ? 
              <ul className="list-parent-cateogry">
                {areaProvider.map((item, index)=>{
                  return(
                    <li onClick={()=>this.onSelectArea(item)} className="item-select-search"><a>{item.title}</a></li>
                  )
                })}
              </ul>
              :''}
            </div>
          </div>
        </div>
        {/* Ko cos san pham */}
        <div className="container content-sell">
          <div className="row">
              <h3 style={{padding: '0 15px', fontSize: 20}} className="title-sell">Bất động sản Hà Nội - Mua bán nhà đất tại Hà Nội 2020</h3>
          </div>
          {/* <div className="row row-sort">
            <div className="col-md-8 sorted-bar">
                <select>
                  <option value="NEWEAST">Mới nhất</option>
                  <option value="EXPENSIVE">Giá cao nhất</option>
                  <option value="CHEAPEST">Giá thấp nhất</option>
                </select>
            </div>
          </div> */}
          <div className="row">
            <div className="col-md-8 list-sell">
              {this.state.listSell && this.state.listSell.length > 0 ? this.state.listSell.map((item, index) => {
                  return (
                    <Product
                      key={index}
                      title={item.name}
                      address={item.address}
                      area={item.area}
                      price={item.price01}
                      description={item.description}
                      image={item.remote_thumbnail}
                      data={item}
                    />
                  )
              })
              :''}
               <Pagination
                activePage={this.state.page}
                itemsCountPerPage={20}
                totalItemsCount={450}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange.bind(this)}
              />
            </div>
          </div>

        </div>
        {this.state.progress == true && 
            <div className="loading-overlay">
                <img src="/images/loading.webp"/>
            </div>
        }
      </div>
    )
  }
}
const styles = theme => ({
  homeContent: {
      position: 'relative',
      boxSizing: 'border-box',
      display: 'block',
      paddingTop: 119,
  },
  backGround: {
      marginTop: 10
  },
  slider: {
      backgroundImage: `url(/images/bg061020_2.jpg)`,
      position: 'relative',
      top: 115,
      width: '100%',
      backgroundSize: 'cover!important',
      backgroundPosition: 'bottom',
      height: 300
  }
});

AllHireProduct.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllHireProduct);