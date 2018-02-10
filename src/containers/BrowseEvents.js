import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import '../style.scss';
import { changeSelectedEvent } from '../actions';
// import data from '../MockData';


class BrowseEvents extends Component {
  constructor(props) {
    super(props);
    this.state = { events: [] };
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
    axios.get('/api/events')
      .then((events) => {
        console.log('events data: ', events.data);
        this.setState({ events: events.data });
      })
      .catch(err => console.log(err));
  }

  render = () => (
    <div className='topLevelDiv center miniPadding profile event'>
      {this.props.sortReducer === 'Cuisine'
        ?
          <div>Sort has been clicked</div>
        : null
      }
      {this.state.events.map(event => (
        event.chef_id === null
        ?
          <Card
            key={event.id}
            className='eventCard'
            onClick={() => {
              console.log('Selected Event store: ', event);
              this.props.changeSelectedEvent(event);
              this.props.history.push('/selectedEvent');
          }}>
            <Card.Content>
              <Image floated='right' size='mini' src={event.img} />
              <Card.Header>
                {event.name} ({event.cuisine_type})
              </Card.Header>
              <Card.Meta>
                <div>{event.creator_username}</div>
              </Card.Meta>
              <Card.Description>
                <div>{event.description}</div>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <span className='partySize'>Size: {event.party_size}</span>
              <span className='eventBudget'>Budget: {event.budget}</span>
            </Card.Content>
          </Card>
        : null
      ))}
    </div>
  )
}

function mapStateToProps(state) {
  return { sortReducer: state.sortReducer };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeSelectedEvent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BrowseEvents));

