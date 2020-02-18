import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { UpStampsProvider, useFlag, Flag } from "../.";
import { useCallback, useState } from "react";

const Home = () => {
  const [count, setCount] = useState(0);
  const { show } = useFlag("chat");
  const pri = useFlag("private_msg_2");

  const onHandleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      {show && <div>This is a great feature</div>}
      {pri.show && <div>This is a great feature 2</div>}

      <Flag name="private_msg_2">
        <div>This OOOh</div>
      </Flag>

      <h1>{count}</h1>
      <button onClick={onHandleClick}>click count</button>
    </div>
  );
};

const About = () => {
  const { show } = useFlag("private_msg_2");
  return (
    <div>
      <h1>About page</h1>
      <tr />
      <ul>
        {show && (
          <li>
            <a href="/">Abrir chat</a>
          </li>
        )}
        <li>
          <a href="/">Abrir dashboard</a>
        </li>
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <UpStampsProvider
      clientId="40ad6937-f4fb-48be-9403-8f9f71744ed4"
      projectKey="rural-abuse"
      envKey="guilty-professional"
    >
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/about">
              <About />
            </Route>

            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </UpStampsProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
