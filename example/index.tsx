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
  const { show } = useFlag("instagram_icon");
  const pri = useFlag("instagram_icon");
  //Remote flags
  const remote = useRemoteFlag("call_action");
  //A/B Tests
  const ABTestHook = useABTest("contact_action", false);
  const ABTestComponentRef = React.useRef();

  //Segments
  const segment = useSegment(
    "sitemap_edge",
    {
      country: "Portugal",
      client: "Microsoft Edge",
      clientType: "browser"
    },
    false
  );

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

      <ABTest
        testRef={ABTestComponentRef}
        name="contact_action"
        localStorage={false}
      >
        <ABTest.Variant name="A">
          <div>
            this is a AB Comp - A Test
            <button onClick={() => ABTestComponentRef?.current?.emitter()}>
              Send A Test
            </button>
          </div>
        </ABTest.Variant>
        <ABTest.Variant name="B">
          <div>
            this is a AB Comp - B Test
            <button onClick={() => ABTestComponentRef?.current?.emitter()}>
              Send B Test
            </button>
          </div>
        </ABTest.Variant>
      </ABTest>

      <h3>Segments</h3>
      <hr />

      {segment.show && <div>This is a feature from segment</div>}

      <Segment
        name="sitemap_edge"
        params={{
          country: "Portugal",
          client: "Microsoft Edge",
          clientType: "browser"
        }}
        localStorage={false}
      >
        <div>This a segment inside a component</div>
      </Segment>
    </div>
  );
};

const HomeTests = () => {
  const ABTestHook = useABTest("contact_action");
  const ABTestComponentRef = React.useRef();

  console.log("ABTestHook = ", ABTestHook);

  return (
    <div>
      <h3>A/B Testing</h3>
      {ABTestHook.show && (
        <div>
          {ABTestHook.variant === "A" ? (
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
          ) : null}
        </div>
      )}

      <br />

      <ABTest testRef={ABTestComponentRef} name="contact_action2">
        <ABTest.Variant name="A">
          <div>
            this is a AB Comp - A Test
            <button onClick={() => ABTestComponentRef?.current?.emitter()}>
              Send A Test
            </button>
          </div>
        </ABTest.Variant>
        <ABTest.Variant name="B">
          <div>
            this is a AB Comp - B Test
            <button onClick={() => ABTestComponentRef?.current?.emitter()}>
              Send B Test
            </button>
          </div>
        </ABTest.Variant>
      </ABTest>
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
      clientId="5d3843d9-fd51-4f95-a49d-81e3833935c7"
      projectKey="detailed-jade"
      envKey="mighty-copper"
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
