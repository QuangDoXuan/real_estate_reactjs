import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import moment from 'moment'

import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import productCategory from '../../../../data-access/product-category-provider'
import productProvider from '../../../../data-access/product-provider'
import Project from '../project/project-hot'
import Product from '../product/product'

const resource_url = "https://localhost:44334"
class ProjectDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hotProject: [],
            childrenProduct: []
        }
    }


    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.location.state!== {}) {
    //         // do stuffs
    //         window.location.reload()
    //         // window.scrollTo(0)
    //     }
    // }

    componentDidMount() {
        this.loadPage()
    }

    loadPage() {
        this.loadProduct();
        this.loadProductCategory();
    }

    loadProduct() {
        let param = {
            ParentProductCategoryId: "DUAN"
        }
        productProvider.search(param).then(res => {
            if (res.Code == 200) {
                this.setState({
                    childrenProduct: res.Data
                })
            }
        }).catch(e => {
            console.log(e)
        })
    }

    loadProductCategory() {
        productCategory.getAll().then(res => {
            if (res.Code == 200) {
                this.setState({
                    hotProject: res.Data.filter(item => item.ParentProductCategoryId == "DUAN")
                })
            }
        })
    }

    render() {
        const { classes } = this.props
        const options = {
            loop: true,
            margin: 2,
            autoplay: true,
            nav: false,
            dots: true,
            items: 1,
        };
        return (
            <div className={classes.homeContent + " " + "content"}>
                <div className={"row app-bar-breadcumb " + classes.mgbt}>
                    <div className="container">
                        <ul className="col-md-5">
                            <li><a className="txt-color-blue3" title="Trang chủ"><i className="fas fa-home" /> Trang chủ</a> <span>></span></li>

                            <li className="pdl8"><a className="txt-color-blue3" title="Tin tức landber">Dự án</a></li>
                        </ul>
                    </div>

                </div>
                <div className={classes.headerNewsDetail}>
                    <div className="container">
                        <div className="fll">
                            <span className={classes.circle + " " + "txt-center fll font20 mgr10 mgt25 mgbt35"}>
                                <i className="far fa-bookmark"></i>
                            </span>
                            <b className="fll font20 title-category"><a title="Cẩm nang" className="ng-binding">Dự án</a></b>
                        </div>
                        <div className="flr">
                            {/* ngRepeat: catc in ndc.listCategories|filter:{parent: aliasCategoryParent} track by $index */}
                        </div>
                        <p className="clearboth" />
                    </div>
                </div>

                <div className="container news-detail-container">
                    <div className="row">
                        <div className="col-md-7 content-project">
                            <h2 style={{ fontSize: 26, fontWeight: 'bold', color: "#283c5a" }}>{this.props.location.state.product.ProductCategoryName}</h2>
                            <p class="user-date mgbt10"><i class="fal fa-clock mgr5" aria-hidden="true"></i>{moment(this.props.location.state.product.CreateDtime).format("DD-MM-YYYY")}</p>


                            <span className={classes.span}>{this.props.location.state.product.ProductCategoryTitle}</span>
                            <div style={{ marginTop: 32 }} dangerouslySetInnerHTML={{ __html: this.props.location.state.product.ProductCategoryDescription }} className="content-news">

                            </div>
                        </div>
                        <div className="col-md-1"></div>


                        <div style={{ height: '100%', paddingBottom: 22 }} className="col-xs-12 col-md-4 tin-noibat">
                            <div className="title-tinnoibat">
                                <h4>Các dự án khác</h4>
                            </div>
                            <div className="list-tin-noi-bat project-hot">
                                <OwlCarousel ref="slide" options={options}>
                                    {this.state.hotProject.slice(0,5).map((item, index) => {
                                        return (
                                            <Project
                                                key={index}
                                                data={item}
                                            />
                                        )
                                    })}

                                </OwlCarousel>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="container project-products">
                    <h5 className="project-related">Các sản phẩm thuộc {this.props.location.state.product.ProductCategoryName}</h5>
                    <div className="row">
                                {this.state.childrenProduct.map((item, index) => {
                                    return(
                                        <div className="col-xs-12 col-md-3 one-project-product">
                                        <Product
                                        key={index}
                                        ProductThumbnail={item.ProductThumbnail}
                                        ProductPrice={item.ProductPrice}
                                        ProductName={item.ProductName}
                                        ProductSummary={item.ProductSummary}
                                        ProductCreateDTime={item.ProductCreateDTime}
                                        data={item}
                                    />
                                    </div>
                                    )
                                   
                                })}
                    </div>
                </div>

            </div>
        )
    }

}
const styles = theme => ({
    homeContent: {
        position: 'relative',
        boxSizing: 'border-box',
        display: 'block',
        paddingTop: 50,

    },
    img: {
        width: '100%',
        height: 300
    },
    mgbt: {
        marginBottom: '0!important'
    },
    headerNewsDetail: {
        height: 65,
        borderBottom: '1px solid #ccc',
        lineHeight: '48px'
    },
    circle: {
        background: '#3897f1',
        color: '#fff',
        width: 40,
        height: 40,
        borderRadius: 30,
        alignItems: 'center',
        textAlign: 'center',
        lineHeight: '41px',
        marginTop: 4,
    },
    span: {
        fontSize: 16,
        fontWeight: 600,
        padding: '20px 0',
        marginTop: 32
    }

});


ProjectDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectDetail);