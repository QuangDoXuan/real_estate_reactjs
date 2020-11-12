import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FeedsTop from './feedTop'
import SlideSell from './product'
import SlideHire from './hire'
import RegisterEmail from './register-email'
import NewsContainer from './news-container'
import Fade from 'react-reveal/Fade';
import productProvider from '../../../../data-access/product-provider'

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {

        const { classes } = this.props
        return (
            <div>
                <div className={classes.slider + ' ' + 'slider-home'}>
                    <div className="container">
                        <div className="home-search">
                            <h3 className="slogan">
                                Kênh tra cứu thông tin bất động sản,<br/>so sánh bất động sản mới nhất tại Hà Nội
                            </h3>
                        </div>

                    </div>
                </div>

                <div className={classes.homeContent + " " + "content"}>
                    <Fade>
                        <FeedsTop />
                    </Fade>

                    <Fade>
                        <SlideSell/>
                    </Fade>

                    <Fade>
                        <SlideHire/>
                    </Fade>

                    <Fade>
                        {/* <NewsContainer /> */}
                    </Fade>
                    <Fade>
                        <RegisterEmail />
                    </Fade>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        userApp: state.userApp
    };
}

const styles = theme => ({
    homeContent: {
        position: 'relative',
        boxSizing: 'border-box',
        display: 'block',
        paddingTop: 50,
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


Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(Home));