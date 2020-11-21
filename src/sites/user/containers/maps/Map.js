import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GoogleMap, LoadScript, InfoWindow, Marker } from '@react-google-maps/api';
import { DrawingManager } from '@react-google-maps/api';
import productProvider from '../../../../data-access/product-provider'
import MarkerInfo from './MarkerInfo'
import Product from '../product/product'

const containerStyle = {
    width: '900px',
    height: '600px'
  };
  
const center = {
    lat: 21.048095,
    lng: 105.785538
};


class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            drawMode: '',
            shapes: [],
            markers: [],
            openInfoWindowMarkerId: ''
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
    
    handleToggleOpen = (markerId) => {
        this.setState({
            openInfoWindowMarkerId: markerId
        });
    }

    onRectangleComplete = (rectangle) => {
        console.log(rectangle)
        let location = {
            south: rectangle.getBounds().Sa.i,
            north: rectangle.getBounds().Sa.j,
            west: rectangle.getBounds().Wa.i,
            east: rectangle.getBounds().Wa.j
        }
        this.setState({
            drawMode: null
        })
        productProvider.searchByLocation(location).then(res=>{

            console.log(res)
            this.setState({
                markers: res
            })
        }).then(e=>{
            console.log(e)
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
                    zoom={15}
                >
                    <DrawingManager
                        drawingMode = {this.state.drawMode}
                        onRectangleComplete = {this.onRectangleComplete}
                    />
                    {this.state.markers.length > 0 && this.state.markers.map((item, index)=>{
                        return (
                            <Marker
                                key={index}
                                position={{lat: item.lat, lng: item.lon}}
                                title={item.name}
                                onClick={() => this.handleToggleOpen(item.id)}
                            >
                                {this.state.openInfoWindowMarkerId == item.id && (
                                    <InfoWindow>
                                        <MarkerInfo
                                            image = {item.remote_thumbnail}
                                            title = {item.name}
                                            price = {item.price01}
                                            data = {item}
                                        />
                                        {/* <span dangerouslySetInnerHTML={{ __html: item.description }}></span> */}
                                    </InfoWindow>
                                )}
                            </Marker>
                        )
                    })}

                </GoogleMap>
                </LoadScript>
                <div className="search-results">
                    {this.state.markers.map((item, index)=> {
                        return(
                            <Product
                                key={index}
                                ProductThumbnail={item.remote_thumbnail}
                                ProductPrice={item.price01}
                                ProductName= {item.name}
                                ProductSummary={item.short_description}
                                ProductCreateDTime={item.created_at}
                                data={item}
                            />
                        )

                    })}
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


Map.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(Map));