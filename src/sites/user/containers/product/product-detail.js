import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import moment from 'moment'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'
import productProvider from '../../../../data-access/product-provider'
import productCategoryProvider from '../../../../data-access/product-category-provider'
import SlideClosed from '../../containers/home/product'

const resource_url = "https://localhost:44334"
class ProductDetail extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()  
        this.state = {
            photoIndex: 0,
            isOpen: false,
            listClosed: [],
            listKeyword: [],
            productCategory: '',
            listImage: []
        }
    }

    componentDidMount() {
        this.myRef.current.scrollTo(0, 0);
        this.getAll()
        this.getCategoryById()
        this.getProductImagesById()
    }

    getCategoryById() {
        productCategoryProvider.getById(this.props.location.state.product.category_id).then(res => {
            this.setState({
                productCategory: res
            })
        }).catch(e => {
            console.log(e)
        })
    }
    getProductImagesById() {
        productProvider.getById(this.props.location.state.product.id).then(res => {
            this.setState({
                listImage: res.product_images.map(x=>x.name)
            })
        }).catch(e => {
            console.log(e)
        })
    }

    getAll() {
        productProvider.getAll({type: 2}).then(res => {
            this.setState({
                listClosed: res.Data,
                listKeyword: res.Data.map(x => x.ProductName)
            })
        }).catch(e => {
            console.log(e)
        })
    }



    render() {
        const { photoIndex, isOpen, listImage } = this.state
        const { classes } = this.props

        return (
            <div ref={this.myRef} className={classes.homeContent + " " + "content"}>
                <div className="row app-bar-breadcumb">
                    <div className="container">
                        <ul className="col-md-3">
                            <li><a className="txt-color-blue3" title="Trang chủ"><i className="fas fa-home" /> Trang chủ</a> <span></span></li>
                            <li className="pdl8"><a className="txt-color-blue3" title="Tin tức landber">Sản phẩm</a></li>
                        </ul>
                    </div>
                </div>
                <div className="container">
                    <div className="row row-image-sanpham">
                        <div className="col-md-4" style={{position:'relative'}}>
                            <div onClick={() => this.setState({ isOpen: true })} className="opa08 color-white height32 span-common">Xem {listImage.length} ảnh</div>
                            <img className={classes.img} src={this.props.location.state.product.remote_thumbnail} />
                        </div>
                        <div className="col-md-8">
                            <h2 className="font-22 txt-color-black3">{this.props.location.state.product.name}</h2>
                            <div className="area-thoathuan">
                                <p className="font-22 txt-color-blue"> {this.props.location.state.product.price01}</p>
                                <div className="row-thoathuan">
                                    <span className="icon-thoathuan icon-area"><i className="fas fa-expand"></i></span>
                                    <span className="text-thoathuan txt-color-black3">Diện tích: {this.props.location.state.product.area}</span>
                                </div>
                                <div className="row-thoathuan">
                                    <span className="icon-thoathuan icon-area"><i className="fas fa-map-marker-alt"></i></span>
                                    <span className="text-thoathuan txt-color-black3">Địa chỉ: {this.props.location.state.product.address}</span>
                                </div>
                                <div className="row-thoathuan">
                                    <span className="icon-thoathuan icon-area"><i className="fas fa-calendar"></i></span>
                                    <span className="text-thoathuan txt-color-black3">Ngày đăng: {moment(this.props.location.state.product.created_at).format("DD-MM-YYYY")}</span>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-md-3">
                            <div className="box-contact">
                                <div className="row-contact row-top-contact">
                                    <img style={{ width: 40 }} src="/images/avatar.jpg" className="left-contact avatar-contact" />
                                    <span className="noidung-contact">lethanh</span>
                                </div>
                                <div className="row-contact row-duoicontact">
                                    <div className="left-contact"></div>
                                    <i className="fas fa-phone-volume"></i>
                                    <span className="noidung-contact">0944044****</span>
                                </div>
                                <div className="button-chat">
                                    <img className="icon-chat"></img>
                                    <span >Chat với chủ nhà</span>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="row">
                        <div className="col-md-9">
                            <div className="product-summary">
                                <p className="title-dacdiem">Chi tiết</p>
                                <div className="summary-detail">
                                    <p className="one-row-detail" dangerouslySetInnerHTML={{ __html: this.props.location.state.product.description }}></p>
                                    <p className="one-row-detail">Diện tích: {this.props.location.state.product.area}</p>
                                    {/* <p className="one-row-detail">Gồm {this.props.location.state.product.ProductBedrooms} phòng ngủ đầy đủ tiện nghi giường tủ tivi, điều hoà, tủ lạnh, máy giặt... chỉ việc vào ở.</p> */}
                                    <p className="one-row-detail">Giá: {this.props.location.state.product.price01}</p>
                                </div>
                            </div>


                            <div className=" product-summary product-dacdiem">
                                <p className="title-dacdiem">Đặc điểm</p>
                                <div className="summary-detail dacdiem-sum">
                                    <p className="one-row-detail"><label className="span-dacdiem">Loại tin rao:</label>{this.state.productCategory.name}</p>
                                    <p className="one-row-detail"><label className="span-dacdiem">Giá:</label>{this.props.location.state.product.price01}</p>
                                    <p className="one-row-detail"><label className="span-dacdiem">Diện tích:</label> {this.props.location.state.product.area}</p>
                                    <p className="one-row-detail"><label className="span-dacdiem">Địa chỉ:</label> {this.props.location.state.product.address}</p>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-3">
                            <img style={{ width: '100%', marginTop: 32 }} src="https://s3-ap-southeast-1.amazonaws.com/landber/c9f4176d-9f90-45b5-98c3-84ea3cbefdef.jpg" />
                        </div>
                    </div>


                    <div className="product-related">

                        {this.state.listClosed.length > 0 ?
                            <SlideClosed
                                dataTitle="Các tin liên quan"
                                dataClasses="title-dacdiem"
                                slideItems={this.state.listClosed}
                            /> : ""
                        }

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
        paddingTop: 116,
    },
    img: {
        width: '100%',
        height: 300
    }
});


ProductDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductDetail);