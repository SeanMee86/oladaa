import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import LandingPage from './components/landing_page/landing_page';
import Home from './components/home/home'
import About from './components/aboutus/about_us';
import SelectInterests from './components/select_interests/select_interests_form';
import RegisterForm from './components/register_new_user/register_new_user';
import LoginForm from './components/login/login_form';
import ViewAllEventsList from './components/view_all_events/view_all';
import require_auth from './components/auth/require_auth';
import RecommendedEventList from './components/recommended_events/recommended_events';
import ActivityNote from './components/activity_note/activity_note';
import WelcomeNote from './components/welcome_new_user/welcome_new_user';
import FitbitLogin from './components/mock_fitbit_login/fitbit_login';
import EventCard from './components/event_card/event_card';
import ViewAllEventCard from './components/event_card/view_all_event_card';
import Teapot from './components/teapot/teapot';

export default  (
    <div>
        <Route path="/">
            <IndexRoute component={ LandingPage } />
            <Route path="login" component={ LoginForm }/>
            <Route path="app" component={ App }>
                <Route path="home" component={ Home }/>
                <Route path="about" component={ About }/>
                <Route path="view_all" component={ ViewAllEventsList }/>
                <Route path="view_all_event_card" component={ ViewAllEventCard }/>
                <Route path="recommended_events" component={ RecommendedEventList }/>
                <Route path="activity_note" component={ ActivityNote } />
                <Route path="welcome_user" component={ WelcomeNote }/>
                <Route path="event_card" component={ EventCard } />
            </Route>
        <Route path="register" component={ RegisterForm }/>
        <Route path="fitbit_login" component={ FitbitLogin } />
        <Route path="select_interests" component={ SelectInterests }/>
        <Route path="*" component={Teapot}/>
        </Route>
    </div>
);