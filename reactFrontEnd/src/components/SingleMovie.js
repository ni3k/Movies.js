import React from 'react'
import { connect } from 'react-redux';
import { Embed } from 'semantic-ui-react'
import { itemFetch } from '../actions/items';
//1ex5mfpsklibrz1rffy0irtubby51f
class SingleMovie extends React.Component{
    componentDidMount(){
        const {id} = this.props.match.params;
        this.props.fetchData(id);
        
    }
    
    render()
    {
        const {hasErrored, isLoading, item} = this.props;
        if (hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }
        if (isLoading) {
            return <p>Loading…</p>;
        }

        return (
        <div>
            {item.Ticket} | {item.imdbID}
            <Embed
            icon='right circle arrow'
            placeholder='/images/image-16by9.png'
            url={`https://videospider.stream/getvideo?key=gIBI3N1PHUQ0H9mB&video_id=${item.imdbID}&ticket=${item.Ticket}`}
        />
        </div>)
    }
}


const mapStateToProps = (state) => {
    console.log(state);
    return {
        item: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (id) => dispatch(itemFetch(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleMovie);