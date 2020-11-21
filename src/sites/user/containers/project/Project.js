import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { BrowserRouter, Router, NavLink, Link } from "react-router-dom";
import moment from 'moment'

const resource_url ="https://localhost:44334"
class ProjectItem extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log(this.props.data)
        const { classes } = this.props
        return (
            <div style={{ background: '#fff', padding: 8 }} className="col-xs-12 col-md-4 one-project-item">
                <img style={{ width: '100%', padding:8 }} src={this.props.data.image} />
                <div className="content-project">
                    <p className="text-time-project" style={{ marginTop: 8, opacity: 0.5 }}><i className="far fa-clock"></i> {moment(this.props.data.created_at).format("DD-MM-YYYY")}</p>
                    <h2 className="title-project"><Link className="title-project" onClick={()=>{window.scrollTo(0,0)}} to={{ pathname: '/du-an/chi-tiet-du-an/' + this.props.data.name, state: { product: this.props.data }, }}  title={this.props.data.name}>{this.props.data.name}</Link></h2>
                    <p className="project-title-content">{this.props.data.name}</p>
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