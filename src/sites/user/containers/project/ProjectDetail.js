import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import moment from 'moment'

import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import projectProvider from '../../../../data-access/project-provider'
import productProvider from '../../../../data-access/product-provider'
import companyProvider from '../../../../data-access/company-provider'
import Project from '../project/project-hot'
import Product from '../product/product'
import Lightbox from 'react-image-lightbox';

const resource_url = "https://localhost:44334"
class ProjectDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hotProject: [],
            childrenProduct: [],
            page: 1,
            per: 20,
            isOpen: false,
            listImage: [],
            photoIndex: 0,
            company: {}
        }
    }
    componentDidMount() {
        this.loadProduct()
        this.loadRelatedProject()
        this.getProjectImagesById()
    }

    loadProduct() {
        projectProvider.getAllProduct(this.props.location.state.product.id, {page: this.state.page, per: this.state.per}).then(res => {
            console.log(res)
            this.setState({
                childrenProduct: res
            })
        }).catch(e => {
            console.log(e)
        })
    }

    loadRelatedProject() {
        companyProvider.getAllProject(this.props.location.state.product.company_id).then(res => {
            console.log(res)
            this.setState({
                hotProject: res
            })
        })
    }

    getProjectImagesById() {
        projectProvider.show(this.props.location.state.product.id).then(res => {
            this.setState({
                listImage: res.project_images.map(x=>x.name),
                company: res.company
            })
        }).catch(e => {
            console.log(e)
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
        const options2 = {
            items: 4,
            nav: true,
            rewind: true,
            autoplay: true,
            navText: [],
            margin: 4,
        };
         
        const events = {
            onDragged: function(event) {},
            onChanged: function(event) {}
        };
        const { photoIndex, isOpen, listImage } = this.state
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
                <div className="container news-detail-container">

                    <div style={{marginBottom: 80, marginTop: 15}} class="row">
                        <div className="col-md-7" style={{position:'relative'}}>
                            <div onClick={() => this.setState({ isOpen: true })} className="opa08 color-white height32 span-common">Xem {this.state.listImage.length} ảnh</div>
                            <img className={classes.img} src={this.props.location.state.product.image} />
                        </div>
                        <div className="col-md-5">
                            <h2 className="font-22 txt-color-black3">{this.props.location.state.product.name}</h2>
                            <div className="area-thoathuan">
                                <div className="row-thoathuan">
                                    <span style={{fontSize: 14}} className="txt-color-black3">Địa chỉ: {this.props.location.state.product.address}</span>
                                </div>
                                <div className="row-thoathuan">
                                    <span style={{fontSize: 14}} className="txt-color-black3">Diện tích: {this.props.location.state.product.total_area}</span>
                                </div>

                                <div className="row-thoathuan">
                                    <div style={{fontSize: 14}} >Chủ đầu tư: </div>
                                    <img className="company-logo" src={this.state.company && this.state.company.image ? this.state.company.image: ''}></img>
                                    <span style={{fontSize: 14}} className="txt-color-black3">{this.state.company && this.state.company.name ? this.state.company.name:'' }</span>
                                </div>
                                <div className="row-thoathuan">
                                    <span style={{fontSize: 14}} className="txt-color-black3">Khoảng giá: {this.props.location.state.product.price_range}</span>
                                </div>
                                <div className="row-thoathuan">
                                    <span style={{fontSize: 14}} className="txt-color-black3">Giá/m2: {this.props.location.state.product.pricem2}</span>
                                </div>
                                <div className="row-thoathuan">
                                    <span style={{fontSize: 14}} className="txt-color-black3">Trạng thái: {this.props.location.state.product.build_status}</span>
                                </div>
                                <div className="row-thoathuan">
                                    <span style={{fontSize: 14}} className="txt-color-black3">Thời gian hoàn thành: {this.props.location.state.product.release_at}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-7 content-project">
                            <h2 style={{ fontSize: 26, fontWeight: 'bold', color: "#283c5a" }}>{this.props.location.state.product.ProductCategoryName}</h2>
                            <span className={classes.span}>{this.props.location.state.product.name}</span>
                            <div style={{ marginTop: 32 }} dangerouslySetInnerHTML={{ __html: this.props.location.state.product.description }} className="content-news">

                            </div>
                        </div>
                        <div className="col-md-1"></div>


                        <div style={{ height: '100%', paddingBottom: 22 }} className="col-xs-12 col-md-4 tin-noibat">
                            <div className="title-tinnoibat">
                                <h4>Các dự án liên quan</h4>
                            </div>
                            <div className="list-tin-noi-bat project-hot">
                                <OwlCarousel ref="slide" options={options}>
                                    {this.state.hotProject.map((item, index) => {
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
                    <h5 className="project-related">Các sản phẩm thuộc {this.props.location.state.product.name}</h5>
                    <div className="row">
                        <OwlCarousel ref="product" options={options2} events={events} >
                            {this.state.childrenProduct.length > 0 && this.state.childrenProduct.map((item, index)=>{
                                return(
                                    <div key={index}>
                                    <Product
                                        key={index}
                                        ProductThumbnail={item.remote_thumbnail}
                                        ProductPrice={item.price01}
                                        ProductName= {item.name}
                                        ProductSummary={item.short_description}
                                        ProductCreateDTime={item.created_at}
                                        data={item}
                                    />
                                    </div>
                                )
                            })}
                        </OwlCarousel>
                    </div>
                </div>

                {isOpen && (
                    <Lightbox
                        mainSrc={listImage[photoIndex]}
                        nextSrc={listImage[(photoIndex + 1) % listImage.length]}
                        prevSrc={listImage[(photoIndex + listImage.length - 1) % listImage.length]}
                        onCloseRequest={() => this.setState({ isOpen: false})}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + listImage.length - 1) % listImage.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % listImage.length,
                            })
                        }
                    />
                )}
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