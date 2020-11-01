import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { BrowserRouter, Router, NavLink, Link } from "react-router-dom";

const resource_url ="https://localhost:44334"
class ProjectItem extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log(this.props.data)
        const { classes } = this.props
        return (
            <div style={{ background: '#fff', padding: 8 }} className="one-project-item">
                <img style={{ width: '100%' }} src={resource_url + this.props.data.ProductCategoryImage} />
                <div className="content-project">
                    <p className="text-time-project" style={{ marginTop: 8, opacity: 0.5 }}><i className="far fa-clock"></i> 1 năm trước</p>
                    <h2 className="title-project"><Link className="title-project" onClick={()=>{window.scrollTo(0,0)}} to={{ pathname: '/du-an/chi-tiet-du-an/'+this.props.data.ProductCategoryTitle, state: { product: this.props.data }, }}  title={this.props.data.ProductCategoryName}>{this.props.data.ProductCategoryName}</Link></h2>
                    <p className="project-title-content">{this.props.data.ProductCategoryTitle}</p>
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
    }
});
function mapStateToProps(state) {
    return {
        userApp: state.userApp
    };
}


ProjectItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(ProjectItem));