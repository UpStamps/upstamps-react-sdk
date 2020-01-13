import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { UpStampsProvider, useFlag, Flag } from '../.';

const Home = () => {
  const { show } = useFlag('profile');

  return (
    <div>
      Hey home
      {show && <div>This is a great feature</div>}
      <Flag name="chat">
        <div>This is another great feature eheh</div>
      </Flag>
    </div>
  );
};

const App = () => {
  return (
    <UpStampsProvider>
      <div>
        <Home />
      </div>
    </UpStampsProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
