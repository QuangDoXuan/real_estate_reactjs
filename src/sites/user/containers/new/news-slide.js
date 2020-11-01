import React from 'react'
import NewItem from './new-thumbnail'

import {
    Card, CardImg, CardText, CardBody, Button,
    CardTitle, Row, Col, Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption
} from 'reactstrap'

const NUM_NEW_PER_SLIDE = 3

class SlideNews extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0,
            animating: false,
            newsCarouselIndex: 0,
        }
    }

    getNewSlides = () => {
        let numSlides = this.getNumberNewsSlides()
        let items = []
        for (let i = 0; i < numSlides; i++) {
            let news = []
            let startIndex = i * NUM_NEW_PER_SLIDE
            for (let j = 0; j < NUM_NEW_PER_SLIDE; j++) {
                if (startIndex + j < this.props.slideItems.length) {
                    news.push(this.props.slideItems[startIndex + j])
                }

            }
            items.push(
                <CarouselItem key={i + 1} onExiting={() => { }} onExited={() => { }}>
                    <Row>
                        {news.map((d, index) => {
                            return (
                                <div key={index} className="col-md-4 item-news">
                                    <NewItem title={d.NewName}
                                             image={d.NewImage}
                                             data={d}
                                    />
                                </div>
                                
                            )
                        })}
                    </Row>
                </CarouselItem>
            )
        }
        return items
    }

    getNumberNewsSlides = () => {
        let totalNews = this.props.slideItems.length
        return totalNews % NUM_NEW_PER_SLIDE ? parseInt(totalNews / NUM_NEW_PER_SLIDE) + 1 : totalNews / NUM_NEW_PER_SLIDE
    }

    nextNewSlide = () => {
        let numberSlides = this.getNumberNewsSlides()
        let newsCarouselIndex = this.state.newsCarouselIndex
        if ((newsCarouselIndex + 1) < numberSlides) {
            newsCarouselIndex++
            this.setState({ newsCarouselIndex })
        }
    }

    prevNewSlide = () => {
        let newsCarouselIndex = this.state.newsCarouselIndex
        if ((newsCarouselIndex - 1) >= 0) {
            newsCarouselIndex--
            this.setState({ newsCarouselIndex })
        }
    }


    onClickDetail(){
        this.props.history.push({
            pathname:"/tin-dang",
            state:{product:this.props.slideItems}
        })
    }

    render() {
        return (
            <div className='container product-news-sold'>
                <Carousel activeIndex={this.state.newsCarouselIndex} next={this.nextNewSlide} previous={this.prevNewSlide}>
                    {this.getNewSlides()}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.prevNewSlide} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.nextNewSlide} />
                </Carousel>
            </div>
        )
    }

}
export default SlideNews