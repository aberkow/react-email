/*
Create a simple mockup of an email reader which uses React Router to handle routing. The app should have a sidebar which allows you to navigate between the inbox and the spam folder. Clicking on these should take you to a /inbox or /spam route. Each of the /inbox and /spam routes should display a list of emails. Clicking on an email should take you to a /email/:emailId route, which displays the email contents.
*/

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;
var Link = router.Link;

var EMAILS = {
  inbox: {
        0: {
            id: 0,
            from: "billg@microsoft.com",
            to: "TeamWoz@Woz.org",
            title: "Possible work opportunity",
            content: "Dear Woz.  Fancy a job at Mister Softee?  Bill x"
        },
        1: {
            id: 1,
            from: "zuck@facebook.com",
            to: "TeamWoz@Woz.org",
            title: "Do you know PHP?",
            content: "Dear Woz.  We are in need of a PHP expert.  Fast.  Zuck x"
        }
    },
    spam: {
        0: {
            id: 0,
            from: "ChEaPFl1ghTZ@hotmail.com",
            to: "TeamWoz@Woz.org",
            title: "WaNt CHEEp FlitZ",
            content: "Theyre CheEp"
        },
        1: {
            id: 1,
            from: "NiKEAIRJordanZ@hotmail.com",
            to: "TeamWoz@Woz.org",
            title: "JorDanz For SAle",
            content: "Theyre REELY CheEp"
        }
    }
}

var Email = function(props){
  return (
    <div>
      <p><strong>From: </strong>{props.from}</p>
      <p><strong>To: </strong>{props.to}</p>
      <h2>
        <Link to={'/email/' + props.id}>
          {props.title}
        </Link>
      </h2>
      <p>{props.content}</p>
    </div>
  );
};

var Spam = function(props){
  return (
    <div>
      <p><strong>From: </strong>{props.from}</p>
      <p><strong>To: </strong>{props.to}</p>
        <h2>
          <Link to={'/spam/' + props.id}>
            {props.title}
          </Link>
        </h2>
      <p>{props.content}</p>
    </div>
  );
};

var EmailList = function(props){
  var emails = Object.keys(props.emails).map(function(email, index){
    console.log(index, email, 'from EmailList');
    var email = props.emails[email];
    return (
      <div>
        <Email id={email.id}
          from={email.from}
          to={email.to}
          title={email.title}
          content={email.content}
          key={index} />
      </div>
    );
  });
  return (
    <div>
      {emails}
    </div>
  )
};

var SpamList = function(props){
  var spams = Object.keys(props.spams).map(function(spam, index){
    console.log(index, spam, 'from SpamList');
    var spam = props.spams[spam];
    return (
      <div>
        <Spam id={spam.id}
          from={spam.from}
          to={spam.to}
          title={spam.title}
          content={spam.content}
          key={index} />
      </div>
    );
  });
  return (
    <div>
      {spams}
    </div>
  );
}

var EmailContainer = function(props){
  console.log(props);
  var email = EMAILS[props.params.email];

  return (
    <Email id={email.id}
      from={email.from}
      to={email.to}
      title={email.title}
      content={email.content} />
  );
};

/*
var SpamContainer = function(props){
  var spam = EMAILS[props.params.spam];
  return (
    <Spam id={spam.id}
      from={spam.from}
      to={spam.to}
      title={spam.title}
      content={spam.content} />
  );
};
*/

var EmailListContainer = function(){
  return <EmailList emails={EMAILS.inbox} />;
};

var SpamListContainer = function(){
  return <SpamList spams={EMAILS.spam} />;
};

var App = function(props){
  return (
    <div>
      <header className='header'>
        <h1 className='header__title'>Email!</h1>
        <nav className='header__nav'>
          <ul className='nav__list'>
            <li className='nav__list-item'>
              <Link to={'/email'}>
                Email
              </Link>
            </li>
            <li className='nav__list-item'>
              <Link to={'/spam'}>
                Spam
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div>{props.children}</div>
    </div>
  );
};

var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={App} />
    <Route path='/email' component={App}>
      <IndexRoute component={EmailListContainer} />
      <Route path=':email' component={EmailContainer} />
    </Route>
    <Route path='/spam' component={App}>
      <IndexRoute component={SpamListContainer} />

    </Route>
  </Router>
);

//
// <Route path=':spam' component={SpamContainer} />

document.addEventListener('DOMContentLoaded', function(){
  ReactDOM.render(routes, document.getElementById('app'));
});
