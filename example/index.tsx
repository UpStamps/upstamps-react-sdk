import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { UpStampsProvider, useFlag, Flag } from "../.";

const Home = () => {
  const { show } = useFlag("chat");
  const pri = useFlag("private_msg_2");

  return (
    <div>
      {show && <div>This is a great feature</div>}
      {pri.show && <div>This is a great feature 2</div>}

      <Flag name="private_msg_2">
        <div>This is another great feature eheh</div>
      </Flag>
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
      <div>
        <Home />
      </div>
    </UpStampsProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
