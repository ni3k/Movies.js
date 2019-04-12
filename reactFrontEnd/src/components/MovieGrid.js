import React from 'react'
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/items';
import { Grid, Container, Header, Divider } from 'semantic-ui-react'
import MovieCard from './MovieCard';

class CardExampleColumnCount extends React.Component {
    componentDidMount(){
        this.props.fetchData("http://localhost:4000/all_movies");
    }
    render() {
        const {hasErrored, isLoading, items} = this.props;
        
        console.log(items);
        const renderedMovies = items.map((item) => {
            let description = item.description.substring(0, Math.min(95, item.description.length)) + "...";
            
            return <Grid.Column stretched> <MovieCard title = { item.title }
                                            key = { item.id }
                                            year = { item.year }
                                            description = { description }
                                            rating = { item.rating }
                                            poster = { item.poster }
                                            id = { item.id }
                                            /> </Grid.Column>;
        }) 
        if (hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }
        if (isLoading) {
            return <p>Loading…</p>;
        }
        return (
            <Container>
                <Header size='huge'> Movies </Header>
                <Divider />
                <br /> 
                <Grid columns={4} relaxed centered >
                    {renderedMovies}
                </Grid>
            </Container>
        )
    }
   
}

const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardExampleColumnCount);