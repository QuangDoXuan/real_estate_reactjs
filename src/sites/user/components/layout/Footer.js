import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

class Footer extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { classes } = this.props
        return (
            <footer className={classes.backGround}>
                <div className="row row-top-footer">
                    <div className="col-sm-6 col-md-3 one-menu-footer">
                        <ul className="menu-item-footer">
                            <li><a>Nhà đất</a></li>
                            <li><a>Bán nhà</a></li>
                            <li><a>Mua bán nhà</a></li>
                            <li><a>Thuê phòng trọ</a></li>
                            <li><a>Bán chung cư</a></li>
                            <li><a>Mở rộng</a></li>
                        </ul>
                    </div>
                    <div className="col-sm-6  col-md-3  one-menu-footer">
                        <ul className="menu-item-footer">
                            <li><a>Nhà đất</a></li>
                            <li><a>Bán nhà</a></li>
                            <li><a>Mua bán nhà</a></li>
                            <li><a>Thuê phòng trọ</a></li>
                            <li><a>Bán chung cư</a></li>
                            <li><a>Mở rộng</a></li>
                        </ul>
                    </div>
                    <div className="col-sm-6 col-md-3  one-menu-footer">
                        <ul className="menu-item-footer">
                            <li><a>Nhà đất</a></li>
                            <li><a>Bán nhà</a></li>
                            <li><a>Mua bán nhà</a></li>
                            <li><a>Thuê phòng trọ</a></li>
                            <li><a>Bán chung cư</a></li>
                            <li><a>Mở rộng</a></li>
                        </ul>
                    </div>
                    <div className="col-sm-6 col-md-3  one-menu-footer">
                        <ul className="menu-item-footer">
                            <li><a>Nhà đất</a></li>
                            <li><a>Bán nhà</a></li>
                            <li><a>Mua bán nhà</a></li>
                            <li><a>Thuê phòng trọ</a></li>
                            <li><a>Bán chung cư</a></li>
                            <li><a>Mở rộng</a></li>
                        </ul>
                    </div>
                </div>
                <div className="container">

                    <div className="row pdt30 row-bottom-footer">
                        <div className="col-xs-12 col-md-5">
                            <ul className="footer__bottom--address fll mgr30 font14 roboto-fontfamily-light txt-color-blue3">
                                <li className="mgbt15">
                                    <b className="font16 text-title-footer roboto-fontfamily-medium txt-color-blue2">Công ty cổ phần đầu tư Reway
                            Group</b>
                                </li>
                                <li className="mgbt10">
                                    <p className="fll">
                                        Hotline: 024 73091888 - 096 100 46 91
                        </p>
                                </li>
                                <li className="mgbt10">
                                    CS1: Tầng 27 - Tòa nhà Handico, đường Phạm Hùng, Nam Từ Liêm, Hà Nội
                    </li>
                                <li className="mgbt20">
                                    CS2: Tầng 6 - Tòa nhà Sacombank, đường Lê Đức Thọ, Nam Từ Liêm, Hà Nội
                    </li>
                                <li className="box-list-social-footer txt-center font22">
                                    <p className="fll mgr10">
                                        <a
                                            className="icon-facebook">
                                            <i className="fab fa-facebook-f txt-color-blue3 line-height40" aria-hidden="true"></i>
                                        </a>
                                    </p>
                                    <p className="fll mgr10">
                                        <a target="_blank"
                                            className="icon-youtube" >
                                            <i className="fab fa-youtube txt-color-blue3 line-height40" aria-hidden="true"></i>
                                        </a>
                                    </p>
                                    <p className="fll">
                                        <a className="icon-twitter" target="_blank"
                                        >
                                            <i className="fab fa-twitter txt-color-blue3 line-height40" aria-hidden="true"></i>
                                        </a>
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-xs-12 col-md-3">

                            <ul className="footer__bottom--ad fll mgr30 font14 roboto-fontfamily-light txt-color-blue3">
                                <li className="mgbt15">
                                    <b className="font16 text-title-footer roboto-fontfamily-medium txt-color-blue2">Liên hệ quảng cáo</b>
                                </li>
                                <li className="mgbt10">
                                    Sdt: 096 100 46 91
        </li>
                                <li className="mgbt20">
                                    Email: info@landber.com
        </li>
                                <li style={{ display: 'flex' }}>
                                    <a className="dmca-badge" >
                                        <img src="//images.dmca.com/Badges/dmca_protected_sml_120x.png?ID=e8b12a48-e9be-4727-a731-0b037b893c16" />
                                    </a>
                                    <a  >
                                        <img src="https://landber.com/web/asset/img/dang-ky.png" />
                                    </a>
                                </li>
                            </ul>

                        </div>

                        <div className="col-xs-12 col-md-4">
                            <ul className="footer__bottom--download flr font14 roboto-fontfamily-light txt-color-blue3">
                                <li className="mgbt15">
                                    <b className="font16 text-title-footer roboto-fontfamily-medium txt-color-blue2">Tải ứng dụng</b>
                                </li>
                                <li className="mgbt10">
                                    Tải ngay ứng dụng Bất Động Sản Landber để tìm nhà
                                </li>
                                <li className="mgbt30">
                                    Lựa chọn nền tảng cho thiết bị của bạn!
                                </li>
                                <li>
                                    <a className="fll mgr15"  >
                                        <img src="https://landber.com/web/asset/img/app_ios.jpg" alt="" />
                                    </a>
                                    <a className="fll"  >
                                        <img src="https://landber.com/web/asset/img/app_android.jpg" alt="" />
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <div className="footer__bottom__menu clearboth txt-center overflow-hidden line-height20 pdt60">
                        <a  className="roboto-fontfamily-medium font16 txt-color-blue3 mgr25">Giới thiệu</a>
                        <a  className="roboto-fontfamily-medium font16 txt-color-blue3 mgr25"> Điều khoản</a>
                        <a  className="roboto-fontfamily-medium font16 txt-color-blue3 mgr25">Quy định đăng tin</a>
                        <a  className="roboto-fontfamily-medium font16 txt-color-blue3 mgr25">Báo giá và Nạp tiền </a>
                        <a  style={{ display: 'none' }} className="roboto-fontfamily-medium font16 txt-color-blue3 mgr25" target="_blank">Báo giá chi tiết</a>
                        <a  className="roboto-fontfamily-medium font16 txt-color-blue3 mgr25">Những câu hỏi thường gặp</a>
                        <a  className="roboto-fontfamily-medium font16 txt-color-blue3 mgr25">Liên hệ</a>
                    </div>


                </div>

                <div className="footer__bottom__copyright txt-center bdt1px border-color-gray2 mgt10 pdt10 pdbt10">
                    <p className="roboto-fontfamily-light font14 txt-color-blue3 line-height134">
                        Giấy phép ICP số 3399/GP-STTTT - ® Ghi rõ nguồn "Landber.com" khi phát hành lại thông tin từ website này.
			            </p>
                    <p className="roboto-fontfamily-light font14 txt-color-blue3 line-height134">
                        Copyright © 2016 Reway Group
			            </p>
                </div>

            </footer>
        )
    }
}
const styles = theme => ({
    backGround: {
        backGround: '#ccc',
        position: 'relative'
    },

});


Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);