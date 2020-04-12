import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  UpStampsProvider,
  useFlag,
  Flag,
  useRemoteFlag,
  RemoteFlag,
  useABTest
} from "../.";

const Home = () => {
  //Flags
  const { show } = useFlag("chat");
  const pri = useFlag("private_msg_2");
  //Remote flags
  const remote = useRemoteFlag("new_one");
  //A/B Tests
  const ABTest = useABTest("chat_color");

  console.log("ABTest = ", ABTest);

  return (
    <div>
      <h3>Flags</h3>
      <hr />
      {show && <div>This is a great feature</div>}
      {pri.show && <div>This is a great feature 2</div>}

      <Flag name="private_msg_2">
        <div>This OOOh</div>
      </Flag>

      <h3>Remote Flags</h3>
      <hr />
      {remote.show && (
        <div style={{ color: remote.data.color }}>
          This is a great remote feature
        </div>
      )}

      <RemoteFlag name="new_one">
        {data => (
          <div style={{ color: data.color }}>
            A Remote flag inside a component
          </div>
        )}
      </RemoteFlag>

      <h3>A/B Testing</h3>
      <hr />
      {ABTest.show && ABTest.variant === "A" ? (
        <div>
          This is a A TEST
          <br />
          <button onClick={() => ABTest.emitter()}>Send A Test</button>
        </div>
      ) : ABTest.variant === "B" ? (
        <div>
          This is a B TEST
          <br />
          <button onClick={() => ABTest.emitter()}>Send B Test</button>
        </div>
      ) : (
        <div>This is a DEFAULT TEST</div>
      )}
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
