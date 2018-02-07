import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUserInfo, updateCuisineSelection } from '../actions';
import '../style.scss';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: '',
      id: window.localStorage.getItem('userId'),
      dish: '',
      type: '',
      price: '',
      description: '',
      pic: '',
    };
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
    axios.get('/api/user/menus', { params: { id: this.state.id } })
      .then((menuItems) => {
        this.setState({ menu: menuItems.data });
      });
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  setDish = e => this.setState({ dish: e.target.value })

  setType = e => this.setState({ type: e.target.value })

  setPrice = e => this.setState({ price: e.target.value })

  setDescription = e => this.setState({ description: e.target.value })

  setPicture = e => this.setState({ pic: e.target.value })

  saveMenuItem = () => {
    axios.post('/api/user/saveMenuItem', {
      chef_id: Number(this.state.id),
      dish: this.state.dish,
      pic: this.state.pic,
      description: this.state.description,
      cuisine_type: this.state.type,
      price: Number(this.state.price),
    })
      .then(() => this.setState({
        menu: [...this.state.menu, {
          id: 7777,
          chef_id: Number(this.state.id),
          dish: this.state.dish,
          pic: this.state.pic,
          description: this.state.description,
          cuisine_type: this.state.type,
          price: Number(this.state.price),
        }],
        dish: '',
        pic: '',
        description: '',
        type: '',
        price: '',
      }));
  }

  openMenuForm = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  handleRateChange = (e, { value }) => {
    this.setState({ rate: value });
    const eventObj = {
      id: this.state.id,
      rate: this.state.rate,
    };
    const url = '/api/updateChefRate';
    axios.post(url, eventObj);
  }

  handleCuisineSelection = (e, { value }) => {
    this.props.updateCuisineSelection(value);
  }

  render() {
    return (
      <div className='topLevelDiv'>
        <h1 className='center softText'>User Settings</h1>
        <div className='boxed center'>
          {/* ***** Cuisine Accordian ***** */}
          <div className='miniPadding'>
            <Accordion className='lightlyColored' fluid styled>
              <Accordion.Title index={0} onClick={this.handleClick}>
                <Icon name='dropdown' />
                Cuisines
              </Accordion.Title>
              <Accordion.Content active={this.state.activeIndex === 0}>
                <Grid>
                  <Grid.Column width={5}>
                    <Form>
                      <Form.Group grouped>
                        <Form.Checkbox checked={this.props.user.cuisine.Asian} label='Asian' value='Asian' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.props.user.cuisine.African} label='African' value='African' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.props.user.cuisine.Chinese} label='Chinese' value='Chinese' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.props.user.cuisine.French} label='French' value='French' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.props.user.cuisine.Cajun} label='Cajun' value='Cajun' onChange={this.handleCuisineSelection} />
                      </Form.Group>
                    </Form>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Form>
                      <Form.Group grouped>
                        <Form.Checkbox checked={this.props.user.cuisine.Indian} label='Indian' value='Indian' onChange={this.handleCuisineSelection}/>
                        <Form.Checkbox checked={this.props.user.cuisine.Italian} label='Italian' value='Italian' onChange={this.handleCuisineSelection}/>
                        <Form.Checkbox checked={this.props.user.cuisine.Southern} label='Southern' value='Southern' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.props.user.cuisine.Pastry} label='Pastry' value='Pastry' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.props.user.cuisine.Mexican} label='Mexican' value='Mexican' onChange={this.handleCuisineSelection} />
                      </Form.Group>
                    </Form>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Form>
                      <Form.Group grouped>
                        <Form.Checkbox checked={this.props.user.cuisine.BBQ} label='BBQ' value='BBQ' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.props.user.cuisine.Thai} label='Thai' value='Thai' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.props.user.cuisine.Vegan} label='Vegan' value='Vegan' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.props.user.cuisine.Vegetarian} label='Vegetarian' value='Vegetarian' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.props.user.cuisine.Seafood} label='Seafood' value='Seafood' onChange={this.handleCuisineSelection} />
                      </Form.Group>
                    </Form>
                  </Grid.Column>
                  <Checkbox checked={this.props.user.cuisine.custom} label='Custom' />
                  <Form.Field>
                    <input
                      placeholder='Description...'
                      value={this.state.custom}
                    />
                  </Form.Field>
                </Grid>
              </Accordion.Content>
            </Accordion>
          </div>
          {/* ***** Rate Accordian ***** */}
          <div>
            <Accordion className='lightlyColored' fluid styled>
              <Accordion.Title index={1} onClick={this.handleClick}>
                <Icon name='dropdown' />
                Rate
              </Accordion.Title>
              <Accordion.Content active={this.state.activeIndex === 1}>
                <Form>
                  <Form.Group grouped>
                    <Form.Checkbox checked={this.state.rate === '1'} label='Budget' value='1' onChange={this.handleRateChange} />
                    <Form.Checkbox checked={this.state.rate === '2'} label='Moderate' value='2' onChange={this.handleRateChange} />
                    <Form.Checkbox checked={this.state.rate === '3'} label='High' value='3' onChange={this.handleRateChange} />
                    <Form.Checkbox checked={this.state.rate === '4'} label='Luxury' value='4'onChange={this.handleRateChange} />
                    <Form.Checkbox checked={this.state.rate === '5'} label='Custom' value='5'onChange={this.handleRateChange} />
                  </Form.Group>
                </Form>
              </Accordion.Content>
            </Accordion>
          </div>
        </div>
        {/* ***** Add Menus ***** */}
        <h1 className='center miniPadding softText'>Add Menus</h1>
        <h5 className='center miniPadding softText'
        onClick={this.openMenuForm}>Add a menu item!</h5>
        {this.state.menuOpen
          ?
            <Form className='boxed center' onSubmit={() => {
              this.openMenuForm();
              this.saveMenuItem();
            }}>
                <Form.Field>
                  <label>dish</label>
                  <input placeholder='Dish Name' onChange={this.setDish}/>
                </Form.Field>
                <Form.Field style={{ width: '50%' }}>
                  <label>type</label>
                  <input placeholder='Type of cuisine' onChange={this.setType}/>
                </Form.Field>
                <Form.Field style={{ width: '50%' }}>
                  <label>price</label>
                  <input placeholder='Price' onChange={this.setPrice}/>
                </Form.Field>
                <Form.Field>
                  <label>description</label>
                  <input placeholder='Description' onChange={this.setDescription}/>
                </Form.Field>
                <Form.Field>
                  <label>picture</label>
                  <input placeholder='picture URL' onChange={this.setPicture}/>
                </Form.Field>
                <Button type='submit'>Save!</Button>
              </Form>
          : null
        }
        {this.state.menu.map(item => (
            <div
            className='boxed center lightlyColored'
            key={item.id}
            style={{ 'margin-bottom': '1%' }}>
              <div>{item.dish}</div>
              <div>{item.description}</div>
              <div>{item.price}</div>
              <div>{item.cuisine_type}</div>
              <image src={item.pic}/>
            </div>
          ))}

        {/* ***** Contact Info ***** */}
        <h1 className='center miniPadding softText'>Contact Info</h1>
        <div className='boxed center'>
          <Segment className='lightlyColored'>
            <Grid>
              <Grid.Row>
                <Grid.Column width={4}>Name:</Grid.Column>
                <Grid.Column width={12}>{this.props.user.name}</Grid.Column>
                <Grid.Column width={4}>Address:</Grid.Column>
                <Grid.Column width={12}>{this.props.user.streetAddress}</Grid.Column>
                <Grid.Column width={4}></Grid.Column>
                <Grid.Column width={12}>
                  {this.props.user.city}, {this.props.user.props} {this.props.user.zipcode}
                  </Grid.Column>
                <Grid.Column width={4}>Phone:</Grid.Column>
                <Grid.Column width={12}>{this.props.user.phone}</Grid.Column>
                <Grid.Column width={4}>Email:</Grid.Column>
                <Grid.Column width={12}>{this.props.user.email}</Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </div>
        <div className='center miniPadding'><Link to='/contactInfo'>Update Contact Info</Link></div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUserInfo,
    updateCuisineSelection,
  }, dispatch);
}

function mapStateToProps(state) {
  return { user: state.loggedInUserInfo };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Settings));
