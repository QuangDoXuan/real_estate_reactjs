import React from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Container } from '@material-ui/core'
import SubMenu from '../../containers/home/sub-menu'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import productCategoryProvider from '../../../../data-access/product-category-provider'
import abcProvider from '../../../../data-access/abc-provider'
import MenuItem from '../../containers/home/MenuLevel1'
// import Logo from '../../../../../public/images/land.png'
// import axios from 'axios'
class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            openSubMenu: false,
            openSubMenuHire: false,
            listForSale: [],
            listForHire: [],
            mainItem: []
        }

    }

    componentDidMount() {
        // this.getAllProductCategory()
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    setOpen = () => {
        this.setState({
            openSubMenu: !this.state.openSubMenu
        })
    }

    getAllProductCategory = () => {
        productCategoryProvider.getAll().then(res => {
            console.log(res.Data.filter(x => x.ParentProductCategoryId == 1))
            this.setState({
                mainItem: res.Data.filter(x => x.ParentProductCategoryId == 1),
                // listForSale:res.Data.filter(x=>x.ParentProductCategoryId=="THUE"),
                // listForHire:res.Data.filter(x=>x.ParentProductCategoryId=="B"),
            })
        }).catch(e => {
            console.log(e)
        })
    }


    render() {
        const { classes } = this.props
        const { isOpen } = this.state
        return (
            // <div className="landb-header">
            //     <Navbar className="nav-fixed-top " color="light" light expand="md">
            //         <div className="container">
            //             <NavbarBrand className="logo-header" href="/">
            //                 <img src="/images/logo-xanh.svg" />
            //             </NavbarBrand>
            //             <NavbarToggler onClick={this.toggle} />
            //             <Collapse isOpen={isOpen} navbar>
            //                 <Nav className=" mr-auto nav-main" navbar>
            //                     {this.state.mainItem.filter(x=>x.IsActive).map((item,index)=>{
            //                         return(
            //                         <MenuItem key={index} 
            //                                   data= {item}
            //                                   parentId ={item.ProductCategoryId}
            //                                   href={item.ProductCategoryKeyword}
            //                         />
            //                         )

            //                     })}

            //                 </Nav>
            //             </Collapse>
            //         </div>
            //     </Navbar>
            // </div>
            <>
                <div className="header fixed">
                    <div className="container">
                        <div className="d-flex">
                            <div className="left">
                                {/* Chỉ sử dụng cho Mobile */}
                                <div className="ic-menu-bar">
                                    <div className="bar1" />
                                    <div className="bar2" />
                                    <div className="bar3" />
                                </div>
                                <h1><a className="logo" href="/" title="Cổng thông tin số 1 về Dự án Bất động sản - Homedy.com">
                                    </a>                                
                                </h1>
                            </div>
                            <div className="center box-menu-bar">
                                <div className="box-search">
                                    <div className="input-search">
                                        <div>
                                            <form id="form_search" className="d-flex form-search">
                                                <div className="input-option">
                                                    <button onclick="show_type()" type="button" className="btn-input-option">Mua bán</button>
                                                    <ul style={{ display: 'none' }}>
                                                        <li onclick="type_changed(1, 'Mua bán')">Mua bán</li>
                                                        <li onclick="type_changed(2, 'Cho thuê')">Cho thuê</li>
                                                    </ul>
                                                </div>
                                                <input name="keyword" className="text-search" id="Keyword" type="text" placeholder="Tìm kiếm" autoComplete="off" />
                                                <button type="submit" className="btn-search" />
                                            </form>
                                        </div>
                                    </div>
                                    <a href="/maps" className="btn-map"><img src="https://static.homedy.com/src/images/icon/map/map.svg" width={16} /> Bản đồ</a>
                                </div>
                            </div>
                            {/* <div className="ic-menu-news" style={{ display: 'none' }}>
                        <div className="ic fa fa-circle" />
                        <div className="ic fa fa-circle" />
                        <div className="ic fa fa-circle" />
                    </div> */}
                        </div>
                    </div>
                </div>

                {/* header2 */}
                <div className="header h-second fixed">
                    <div className="container header-second-content">
                        <ul className="menu-list-content d-flex">
                            <li className="item-content"><a style={{textDecoration: 'none'}} href="/nha-dat-ban">Mua bán</a></li>
                            <li className="item-content"><a style={{textDecoration: 'none'}} href="/cho-thue-nha-dat">Cho thuê</a></li>
                            <li className="item-content"><a style={{textDecoration: 'none'}} href="/du-an">Dự án</a></li>
                            <li className="item-content"><a style={{textDecoration: 'none'}} href="/so-sanh-du-an">So sánh</a></li>
                            {/* <li className="item-content"><a style={{textDecoration: 'none'}}>Tin tức</a></li> */}
                        </ul>
                    </div>  
                </div>
            </>
        )
    }
}

const styles = theme => ({
    mainMenu: {
        position: 'relative!important',

    },
    subMenu: {
        position: 'absolute',
        background: '#fff',
        zIndex: 10,
        boxShadow: '0 8px 15px 1px rgba(0,0,0,0.3)',
        top: 36
    },
    ul: {
        listStyle: 'none',
        minWidth: 300,
        padding: '8px 16px',
        margin: 0,
        width: 280
    },
    li: {
        padding: 4
    }

});

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);