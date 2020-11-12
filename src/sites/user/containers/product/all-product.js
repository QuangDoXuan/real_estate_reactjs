import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AllProduct extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const { classes } = this.props
    return (
      <div className={classes.homeContent}>
        <div className="search-bar d-flex">
          <div className="select-list-items">
            <div className="select-item select-parent-category">
              <ul className="list-parent-cateogry">
                <li className="item-select-search">Mua bán</li>
                <li>Cho thuê</li>
                <li>Dự án</li>
              </ul>
            </div>
            <div className="select-item select-category"></div>
            <div className="select-item select-price"></div>
            <div className="select-item select-area"></div>
            {/* <div className="select-item select-district"></div> */}

          </div>
        </div>
        Ko cos san pham
      </div>
    )
  }
}
const styles = theme => ({
  homeContent: {
      position: 'relative',
      boxSizing: 'border-box',
      display: 'block',
      paddingTop: 119,
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

AllProduct.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllProduct);