import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import userProvider from '../../data-access/user-provider';
import { BrowserRouter, Router, NavLink } from "react-router-dom";

import Header from './components/layout/header'

// routes config
import routes from './configs/routes';

import WithRoot from './WithRoot';
// import './App.scss';
import Login from '../admin/components/account/login';

import {
    AppAside,
    AppBreadcrumb,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav,
} from '@coreui/react';

import DefaultAside from './components/layout/DefaultAside';
import DefaultHeader from './components/layout/DefaultHeader';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menus: [],
            activeSideBar:true
        }
    }  


    getMenu() {
        let allMenus = [
            {
                role: [],
                name: "Dashboard",
                url: '/admin/dashboard',
                imgUrl: '/images/icon/dashboard.svg',
                classActiveStyle: 'icon-sidebar ',
                
            },
             {
                //role: [16],
                name: "Người dùng",
                url: '/admin/user',
                imgUrl: '/images/icon/user-icon.svg',
                classActiveStyle: 'icon-sidebar ',
            }, {
                //role: [16384],
                name: " Slide",
                url: '/admin/slide',
                imgUrl: '/images/icon/picture.svg',
                classActiveStyle: 'icon-sidebar ',
            },  {
                // role: [536870912],
                name: "Tin tức",
                url: '/admin/news',
                imgUrl: '/images/icon/newspaper.svg',
                classActiveStyle: 'icon-sidebar news-item ',
                // classIconDrop:'icon-drop-menu',
                subMenu: [
                    {
                        role: [128],
                        name: "Danh mục tin tức",
                        url: '/admin/news-category',
                        classActiveStyle: 'doctor',
                    },
                    {
                        role: [128],
                        name: "Danh sách tin tức",
                        url: '/admin/news',
                        classActiveStyle: 'doctor',
                    }
                ]
            },
            {
                // role: [536870912],
                name: "Sản phẩm",
                url: '/admin/product',
                imgUrl: '/images/icon/product.svg',
                classActiveStyle: 'icon-sidebar news-item ',
                classIconDrop:'icon-drop-menu ',
                subMenu: [
                    {
                        role: [128],
                        name: "Danh mục sản phẩm",
                        url: '/admin/product-category',
                        classActiveStyle: 'doctor',
                    },
                    {
                        role: [128],
                        name: "Danh sách sản phẩm",
                        url: '/admin/product',
                        classActiveStyle: 'doctor',
                    }
                ]
            },
            
        ]
        return allMenus.filter(item => {
            if (!(item.role || []).length)
                return true;
            for (let i = 0; i < item.role.length; i++) {
                for (let j = 0; j < ((this.props.userApp.currentUser || {}).permission || {}).length; j++) {
                    if (item.role == (this.props.userApp.currentUser || {}).permission[j].value)
                        return true;
                }
            }
        })
    }
    openMenu(item) {
        item.open = !item.open;
        this.setState({ menus: [...this.state.menus] })
    }
    

    componentDidMount() {
        if(!this.props.userApp.currentUser){
            window.location.href="/dang-nhap";
        }
        this.setState({ menus: this.getMenu() })

    }
    render() {
        const { classes } = this.props;
        return (
            <div className="app">
               <Header/>
                {/* <AppHeader fixed>
                    <DefaultHeader />
                </AppHeader> */}
                <div className="app-body">
                    <div className={this.state.activeSideBar? "sidebar" : "sidebar enactive-sidebar"}>
                    {/* <AppSidebar fixed display="lg">
                        <AppSidebarHeader />
                        <AppSidebarForm /> */}
                        <div className="scrollbar-container Home-sidebar-1 sidebar-nav  ps--active-y ps-container">
                            <ul className="nav">
                                {
                                    this.state.menus.map((item,index) => {

                                        if (!(item.subMenu && item.subMenu.length)) {
                                            return <li key={index} className="nav-item"><NavLink className={'nav-link ' + `${item.classActiveStyle}`} activeclassname="active" to={item.url}><img src={item.imgUrl} alt="" /><span className="menu-item-name">{item.name}</span><span className={'icon-drop' + `${item.classIconDrop}`}></span></NavLink></li>
                                        }
                                        return <li key={index} className="nav-item"><a  className={'nav-link ' + `${item.classActiveStyle}`} activeclassname="active" onClick={this.openMenu.bind(this, item)}><img src={item.imgUrl} alt="" />{item.name}</a>
                                            {
                                                item.open &&
                                                <ul className="list-sub-menu">
                                                    {
                                                        item.subMenu.map((item2, index) => <li className="sub-menu-item" key={index}>
                                                            <NavLink className={'nav-link ' + `${item2.classActiveStyle}`} activeclassname="active" to={item2.url}><img src={item.imgUrl} alt="" /><span className="menu-item-name">{item2.name}</span></NavLink>
                                                        </li>)
                                                    }
                                                </ul>
                                            }
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                       {/* <div className="a"></div> */}
                        {/* <AppSidebarFooter />
                        <AppSidebarMinimizer />  */}
                     {/* </AppSidebar> */}
                        <div className={this.state.activeSideBar?"app-side-bar":"app-side-bar enactive-sidebar"}>
                            {this.state.activeSideBar?
                            <span  className ="icon-sidebar-foot icon-back" onClick={()=>this.setState({activeSideBar:!this.state.activeSideBar})}>
                               <i className="fas fa-chevron-left"></i>
                            </span>
                            : <span className="icon-sidebar-foot icon-forward" onClick={()=>this.setState({activeSideBar:!this.state.activeSideBar})}>
                                <i className="fas fa-chevron-right"></i>
                            </span>
                        }
                            
                        </div>
                    </div>
                    <main className={this.state.activeSideBar ? "main":"main main-minimize"}>
                        {/* <AppBreadcrumb appRoutes={routes} /> */}
                        <Container fluid>
                            <Switch>
                                {routes.map((route, idx) => {
                                    return route.component ? (
                                        <Route key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            render={props => (
                                                <route.component {...props} />
                                            )} />)
                                        : (null);
                                },
                                )}
                            </Switch>
                            {/* {
                                (!this.props.userApp.currentUser) &&
                                <Redirect to="/dang-nhap" component={Login} />
                            } */}

                            {/* <Redirect from="/admin" to="/admin/dashboard" /> */}
                        </Container>
                    </main>
                </div>
                 {/* <AppFooter>
          <DefaultFooter />
        </AppFooter>  */}
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = theme => ({
    sidebar: {
        textAlign: 'left',
    }
})

function mapStateToProps(state) {
    return {
        userApp: state.userApp
    };
}
export default connect(mapStateToProps)(WithRoot(withStyles(styles)(Home)));