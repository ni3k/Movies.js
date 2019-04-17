import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setFilter } from '../actions/items';


class FilterGenres extends React.PureComponent {
  render() {
    // console.log(this.props);
    const {
      options, setFilter: triggerSetFilter, filters, onChangeHappened, page,
    } = this.props;
    return (
      <Dropdown
        text="Filter By Genres"
        icon="filter"
        floating
        labeled
        multiple
        button
        className="icon"
        options={options}
        value={filters}
        onChange={async (e, { value }) => {
          await triggerSetFilter(value); await onChangeHappened(page);
        }}
      />
    );
  }
}

// console.log(state);
const mapStateToProps = state => ({
  options: state.genres,
  filters: state.filters,
  page: state.setedPage,
});
export default connect(mapStateToProps, { setFilter })(FilterGenres);
