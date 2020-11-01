import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FeedsTop from './feedTop'
import SlideNews from './product'
import SlideHire from './hire'
import RegisterEmail from './register-email'
import NewsContainer from './news-container'
import Fade from 'react-reveal/Fade';
import productProvider from '../../../../data-access/product-provider'

import productCategoryProvider from '../../../../data-access/product-category-provider';
import listDistrict from '../../../../data-access/district-provider'
import listHire from '../../../../data-access/pricehire-provider'
import listSold from '../../../../data-access/pricesold-provider'
import listArea from '../../../../data-access/area-provider'
//UI
import { ClickAwayListener } from '@material-ui/core';

const listCategoryOfProduct = []

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            listNews: [],
            listHire: [],
            listSold: [],

            activeLeft: false,
            districtId: '',
            districtName: '',
            address: '',
            activeAddress: false,
            activeCategory: false,
            activePrice: false,
            activeArea: false,
            priceTitle: "Giá",
            fromPrice: '',
            toPrice: '',
            fromArea: '',
            toArea: '',
            categoryName: "Loại ",
            areaTitle: 'Diện tích',
            ParentProductCategory: '',
            ProductCategoryId: '',
            lstCategoryProduct: [],
            listProductSearch: [],
            lat: '',
            lon: '',
            activeProject: false,
            activeIndex: 0,
            listCategory: [],
            defaultCategoryId: '',

        }
    }

    componentDidMount() {
        this.loadPage()
    }

    loadPage() {
        this.getlistHire()
        this.loadProductCategory()
    }

    // setListCategory(){
    //     console.log()
    // }


    getlistHire() {
        productProvider.getAll().then(res => {
            if (res.Code == 200) {
                this.setState({
                    listHire: res.Data
                })
            }
        }).catch(e => {
            console.log(e)
        })
    }
    //slider
    loadProductCategory() {
        productCategoryProvider.getAll().then(res => {
            if (res.Code == 200) {
                this.setState({
                    listCategory: res.Data.filter(x => x.ParentProductCategoryId == 1),
                    defaultCategoryId: res.Data[0].ProductCategoryId
                }, () => {
                    // for(let i = 0 ; i<this.state.listCategory.length;i++){
                    //     productCategoryProvider.getByParent(this.state.listCategory[i].ProductCategoryId).then(res=>{
                    //         console.log(res)
                    //         let dict = {}
                    //     })
                    // }
                    this.setState({
                        lstCategoryProduct:res.Data.filter(x=>x.ParentProductCategoryId===this.state.defaultCategoryId)
                    })
                    this.state.listCategory.map((item, index) => {
                        productCategoryProvider.getByParent(item.ProductCategoryId).then(res => {
                            let district = {}
                            district.key = item.ProductCategoryId
                            district.value = res.Data
                            listCategoryOfProduct.push(district)
                        })
                    })
                    console.log(listCategoryOfProduct)
                })
            }
        }).catch(e => {
            console.log(e)
        })
    }

    handleClickLeft = () => {
        this.setState({
            activeLeft: true,
        })
    }

    handleClickRight = () => {
        this.setState({
            activeLeft: false,
        })
    }

    selectDistrict = (item, name, lat, lon) => {
        this.setState({
            activeAddress: false,
            districtId: item,
            districtName: name,
            lat: lat,
            lon: lon
        })
    }


    openAddress = () => {
        this.setState({
            activeAddress: !this.state.activeAddress,
        })
    }

    searchAllProduct = () => {
        let param = {
            ProductCategoryId: this.state.ProductCategoryId,
            ProductPriceStart: this.state.fromPrice,
            ProductPriceEnd: this.state.toPrice,
            ProductAreaStart: this.state.fromArea,
            ProductAreaEnd: this.state.toArea,
            ProductAddress: this.state.districtName,
            ParentProductCategoryId: this.state.parentCategoryId
        }
        productProvider.search(param).then(res => {
            if (res.Code == 200) {
                this.setState({
                    listProductSearch: res.Data
                }, () => {
                    this.props.history.push({
                        pathname: '/san-pham',
                        state: {
                            data: this.state.listProductSearch,
                            productAddress: this.state.districtName,
                            lat: this.state.lat,
                            lon: this.state.lon
                        }
                    })
                })
            }
        }).catch(e => {
            console.log(e)
        })
    }

    activeIndex = (id, index) => {
        this.setState({
            parentCategoryId: id,
            activeIndex: index,
            
        }, () => {
            console.log(listCategoryOfProduct.filter(x => x.key === this.state.parentCategoryId).map(item => item.value))
            this.setState({
                lstCategoryProduct: listCategoryOfProduct.filter(x => x.key === this.state.parentCategoryId).map(item => item.value)
            })
        })
    }


    render() {

        const { classes } = this.props
        return (
            <div>
                {/* <Slider /> */}

                <div className={classes.slider + ' ' + 'slider-home'}>
                    <div className="container">
                        <div className="home-search">
                            <h3 className="slogan">
                                Kênh tra cứu thông tin bất động sản,<br/>so sánh bất động sản mới nhất tại Hà Nội
                            </h3>
                        </div>

                    </div>
                </div>



                <div className={classes.homeContent + " " + "content"}>
                    <Fade>
                        <FeedsTop />
                    </Fade>



                    <Fade>
                        <SlideNews slideItems={this.state.listHire} />
                    </Fade>
                    <Fade>
                        <SlideHire slideItems={this.state.listHire} />
                    </Fade>
                    <Fade>
                        <NewsContainer />
                    </Fade>
                    <Fade>
                        <RegisterEmail />
                    </Fade>



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


Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(Home));