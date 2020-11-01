import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Nav';
import Loadable from 'react-loadable';
import { Redirect, Route, Switch } from 'react-router-dom';

import Slider from '../components/layout/Slider';


function Loading() {
    return <div></div>;
}

const routes = [
    // {
    //     path:'/ket-qua-kham/:id',
    //     component: Loadable({
    //         loader:()=>import('./../../user/containners/medical-record/ResultExam'),
    //         loading:Loading,
    //     })
    // },
    // {
    //     path: '/lich-dat-kham/:id',
    //     component: Loadable({
    //         loader: () => import('./../../user/containners/medical-record/MedicalExam'),
    //         loading: Loading,
    //     })
    // },

    {
        path: '/du-an/chi-tiet-du-an/:id',
        component: Loadable({
            loader: () => import('./../containers/project/ProjectDetail'),
            loading: Loading,
        })
    },

    {
        path: '/du-an',
        component: Loadable({
            loader: () => import('./../containers/project/index'),
            loading: Loading,
        })
    },
    {
        path: '/tin-tuc/chi-tiet-tin/:id',
        component: Loadable({
            loader: () => import('./../containers/new/new-detail'),
            loading: Loading,
        })
    },


    {
        path: '/san-pham',
        component: Loadable({
            loader: () => import('./../containers/product/all-product'),
            loading: Loading,
        })
    },

    {
        path: '/tin-dang',
        component: Loadable({
            loader: () => import('./../containers/product/product-detail'),
            loading: Loading,
        })
    },

    {
        path: '/tin-tuc',
        component: Loadable({
            loader: () => import('./../containers/new/index'),
            loading: Loading,
        })
    },

    {
        path: '/',
        component: Loadable({
            loader: () => import('../containers/home/home'),
            loading: Loading,
        })
    },


]

class LayoutTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {}

    }

    render() {
        return (
            <div className="wrapper">
                <Header />
                {/* <Slider /> */}
                <Switch>
                    {
                        routes.map((route, key) => {
                            if (route.component)
                                return <Route key={key}
                                    path={route.path}
                                    render={props => (
                                        <route.component {...props} />
                                    )} />
                            return null;
                        })
                    }
                </Switch>
                <Footer />
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        userApp: state.userApp
    };
}
export default connect(mapStateToProps)(LayoutTemplate);