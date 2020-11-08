import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GoogleMap, LoadScript, InfoWindow } from '@react-google-maps/api';
import { DrawingManager } from '@react-google-maps/api';

const containerStyle = {
    width: '1000px',
    height: '600px'
  };
  
const center = {
    lat: 21.027763,
    lng: 105.834160
};


class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            drawMode: 'rectangle'
        }
    }

    componentDidMount() {
    }

    onLoad = drawingManager => {
        console.log(drawingManager)
    }
    
    onPolygonComplete = polygon => {
        console.log(polygon)
    }
    
    onRectangleComplete = (rectangle) => {
        console.log(rectangle.getBounds().getNorthEast().lat())
        console.log()
        this.setState({
            drawMode: null
        })
    }
      

    render() {
        const { classes } = this.props
        return (
            <div className="maps-page">
                <LoadScript
                    googleMapsApiKey='AIzaSyBU20LsK6P6h4x7a41wAyDoOoEaqGr6GC4&libraries=drawing'
                >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={20}
                >
                    <DrawingManager
                        drawingMode = {this.state.drawMode}
                        // onLoad={this.onLoad()}
                        // onPolygonComplete={this.onPolygonComplete()}
                        onRectangleComplete = {this.onRectangleComplete}
                    />
                    
                </GoogleMap>
                </LoadScript>
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


Map.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(Map));