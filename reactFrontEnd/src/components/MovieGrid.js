import React from 'react'
import { Grid, Container, Header, Divider } from 'semantic-ui-react'
import MovieCard from './MovieCard';

const CardExampleColumnCount = () => {
    return (
        <Container>
            <Header size='huge'> Movies </Header>
            <Divider />
            <br /> 
            <Grid columns={4} relaxed centered >
            <Grid.Column>
                <MovieCard />
            </Grid.Column>
            <Grid.Column>
                <MovieCard />
            </Grid.Column>
            <Grid.Column>
                <MovieCard />
            </Grid.Column>
            <Grid.Column>
                <MovieCard />
            </Grid.Column>
            <Grid.Column>
                <MovieCard />
            </Grid.Column>
            <Grid.Column>
                <MovieCard />
            </Grid.Column>
            <Grid.Column>
                <MovieCard />
            </Grid.Column>
            </Grid>
        </Container>
    )
   
}

export default CardExampleColumnCount