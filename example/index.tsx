import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  UpStampsProvider,
  ScopesProvider,
  useFlag,
  Flag,
  useRemoteFlag,
  RemoteFlag,
  useABTest,
  ABTest,
  useSegment,
  Segment
} from "../.";

const Home = () => {
  //Flags
  const { show } = useFlag("chat");
  const pri = useFlag("private_msg_2");
  //Remote flags
  const remote = useRemoteFlag("new_one");
  //A/B Tests
  const ABTestHook = useABTest("chat_color");
  //Segments
  const segment = useSegment("goo", {
    country: "Portugal",
    client: "Microsoft Edge",
    clientType: "mobile"
  });

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
      {ABTestHook.show && ABTestHook.variant === "A" ? (
        <div>
          This is a A TEST
          <br />
          <button onClick={() => ABTestHook.emitter()}>Send A Test</button>
        </div>
      ) : ABTestHook.variant === "B" ? (
        <div>
          This is a B TEST
          <br />
          <button onClick={() => ABTestHook.emitter()}>Send B Test</button>
        </div>
      ) : (
        <div>This is a DEFAULT TEST</div>
      )}

      <br />

      <ABTest name="chat_color">
        <ABTest.Variant name="A">
          <div>
            this is a AB Comp - A Test
            <button onClick={() => console.log("A")}>Send A Test</button>
          </div>
        </ABTest.Variant>
        <ABTest.Variant name="B">
          <div>
            this is a AB Comp - B Test
            <button onClick={() => console.log("B")}>Send B Test</button>
          </div>
        </ABTest.Variant>
      </ABTest>

      <h3>Segments</h3>
      <hr />

      {segment.show && <div>This is a feature from segment</div>}

      <Segment
        name="goo"
        params={{
          country: "Portugal",
          client: "Microsoft Edge",
          clientType: "mobile"
        }}
      >
        <div>This a segment inside a component</div>
      </Segment>
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
      <ScopesProvider name="John Travolta" email="grandeamigo2@mail.com">
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
      </ScopesProvider>
    </UpStampsProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
