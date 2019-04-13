import React from 'react'
import { connect } from 'react-redux';
import { Grid, Container, Header, Divider } from 'semantic-ui-react'
import { itemsFetchData, selectMovie } from '../actions/items';
import MovieCard from './MovieCard';

class MovieGrid extends React.Component {
    componentDidMount(){
        this.props.fetchData("http://localhost:4000/all_movies");
    }
    render() {
        const {hasErrored, isLoading, items} = this.props;
        if (items.length === 0)
            return <div> Loading </div>
        console.log(items);
        const renderedMovies = items.map((item) => {
            console.log(item);
            let description = "no description";
            if (item.description !== null)
            description = item.description.substring(0, Math.min(95, item.description.length)) + "...";
            
            return <Grid.Column stretched key = { item.id } onClick = { (e) => {this.props.handeClick(item.id)} }> <MovieCard title = { item.title }
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
    console.log(state);
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url)),
        handeClick: (id) => dispatch(selectMovie(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieGrid);