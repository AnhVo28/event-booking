import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Card,
    Grid,
    Header,
    Icon,
    Image,
    Item,
    List,
    Segment,
    Tab
} from 'semantic-ui-react';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import differenceInYears from 'date-fns/difference_in_years';
import format from 'date-fns/format';
import { userDetailedQuery } from '../userQueries';
import LazyLoad from 'react-lazyload';
import LoadingComp from '../../../app/layout/LoadingComp';
import moment from 'moment';
import { getUserEvent } from '../userActions';

const actions = {
    getUserEvent
};
const mapState = (state, ownProps) => {
    let userUid = null;
    let profile = {};

    if (ownProps.match.params.id === state.auth.id) {
        profile = state.firebase.profile;
    } else {
        profile =
            !isEmpty(state.firestore.ordered.profile) &&
            state.firestore.ordered.profile[0];
        userUid = ownProps.match.params.id;
    }

    return {
        profile,
        userUid,
        events:state.events,
        eventLoading: state.async.loading,
        auth: state.firebase.auth,
        photos: state.firestore.ordered.photos,
        requesting: state.firestore.status.requesting
    };
};

const panes  = [
    { menuItem: 'All Events', pane: {key:'allEvents'}},
    { menuItem: 'Past Events', pane: {key:'pastEvents'}},
    { menuItem: 'Future Events', pane: {key:'futureEvents'}},
    { menuItem: 'Hosting', pane: {key:'hostedEvents'}},
];

class UserDetailedPage extends Component {
    async componentDidMount() {
        await this.props.getUserEvent(this.props.userUid);
        
    }

    changeTab = (e, data)=>{
        this.props.getUserEvent(this.props.userUid, data.activeIndex);
        
        
    }

    render() {
        const { profile, photos, auth, match, requesting, events, eventLoading } = this.props;
        const isCurrentUser = auth.uid === match.params.id;

        const loading = Object.values(requesting).some(a => a === true);

        if (loading) {
            return <LoadingComp inverted={true} />;
        }

        // format createdAt date
        let createdAt;
        if (profile.createdAt) {
            if (typeof profile.createdAt === 'string') {
                createdAt = moment(parseInt(profile.createdAt, 10)).format(
                    'D MMM YYYY'
                );
            } else {
                createdAt = format(profile.createdAt.toDate(), 'D MMM YYYY');
            }
        }

        // count years
        let age;
        if (profile.dateOfBirth) {
            age = differenceInYears(Date.now(), profile.dateOfBirth.toDate());
        } else {
            age = 'unkown age';
        }

        return (
            <Grid>
                <Grid.Column width={16}>
                    <Segment>
                        <Item.Group>
                            <Item>
                                <Item.Image
                                    avatar
                                    size="small"
                                    src={profile.photoURL || '/assets/user.png'}
                                />
                                <Item.Content verticalAlign="bottom">
                                    <Header as="h1">
                                        {profile.displayName}
                                    </Header>
                                    <br />
                                    <Header as="h3">
                                        {profile.occupation}
                                    </Header>
                                    <br />

                                    <Header as="h3">
                                        {age}, Lives in {profile.origin}
                                    </Header>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={12}>
                    <Segment>
                        <Grid columns={2}>
                            <Grid.Column width={10}>
                                <Header
                                    icon="smile"
                                    content={profile.displayName}
                                />
                                <p>
                                    I am a:{' '}
                                    <strong>{profile.occupation}</strong>
                                </p>
                                <p>
                                    Originally from{' '}
                                    <strong>{profile.origin}</strong>
                                </p>
                                <p>
                                    Member Since: <strong>{createdAt}</strong>
                                </p>
                                <p>{profile.about}</p>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Header
                                    icon="heart outline"
                                    content="Interests"
                                />
                                {profile.interests ? (
                                    <List>
                                        {profile.interests &&
                                            profile.interests.map(
                                                (inter, index) => {
                                                    return (
                                                        <Item key={index}>
                                                            <Icon name="heart" />
                                                            <Item.Content>
                                                                {inter}
                                                            </Item.Content>
                                                        </Item>
                                                    );
                                                }
                                            )}
                                    </List>
                                ) : (
                                    <p>No interests</p>
                                )}
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Segment>
                        {isCurrentUser ? (
                            <Button
                                as={Link}
                                to="/settings"
                                color="teal"
                                fluid
                                basic
                                content="Edit Profile"
                            />
                        ) : (
                            <Button
                                color="teal"
                                fluid
                                basic
                                content="Follow User"
                            />
                        )}
                    </Segment>
                </Grid.Column>

                <Grid.Column width={12}>
                    <Segment attached>
                        <Header icon="image" content="Photos" />

                        <Image.Group size="small">
                            {photos &&
                                photos.map((photo, index) => (
                                    <LazyLoad
                                        key={photo.id}
                                        height={200}
                                        placeholder={
                                            <Image src="/assets/user.png" />
                                        }
                                    >
                                        <Image src={photo.url} />
                                    </LazyLoad>
                                ))}
                        </Image.Group>
                    </Segment>
                </Grid.Column>

                <Grid.Column width={12}>
                    <Segment attached loading={eventLoading}>
                        <Header icon="calendar" content="Events" />
                        <Tab onTabChange={(e, data)=>this.changeTab(e,data)} panes={panes} menu={{secondary: true, poiting: 'true'}}/>
                        <br/>

                        <Card.Group itemsPerRow={5}>
                            {events && events.map(event=>(
                                <Card as={Link} to={`/event/${event.id}`} key={event.id}>
                                    <Image
                                        src={`/assets/categoryImages/${event.category}.jpg`}
                                    />
                                    <Card.Content>
                                        <Card.Header textAlign="center">
                                            {event.title}
                                        </Card.Header>
                                        <Card.Meta textAlign="center">
                                            <div>{format(event.date && event.date.toDate(), 'DD MMMM YYYY')}</div>
                                            <div>{format(event.date && event.date.toDate(), 'h:mm A')}</div>
                                        </Card.Meta>
                                    </Card.Content>
                                </Card>

                            ))}
                            

                            
                        </Card.Group>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}

export default connect(
    mapState,
    actions
)(
    firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid))(
        UserDetailedPage
    )
);
