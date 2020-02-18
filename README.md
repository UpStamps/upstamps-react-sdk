## React Integration

Quick links

- [About](https://upstamps.com/)
- [Dashboard](https://app.upstamps.com/)
- [Documentation](https://docs.upstamps.com/)

### Installation

First, let's install some packages!

```bash
npm install --save upstamps-react
```

or with yarn

```bash
yarn add upstamps-react
```

### Create a client provider

With all the dependencies you installed, let's create your UpStamps Client.

In our `index.js` file, let's import `UpStampsProvider` from `upstamps-react` and add the configuration params based on your UpStamps project. This params values can be found on the UpStamps [Dashboard](https://app.upstamps.com/) in your project's settings

```js
import { UpStampsProvider } from "upstamps-react";

<UpStampsProvider clientId="xxx-xxx-xxx" projectKey="xxxxx" envKey="xxxxx">
  <div>
    <YourApp />
  </div>
</UpStampsProvider>;
```

That's it! Now your app is ready to start using feature flags. Let's start using by importing some pre-built components inside of `upstamps-react`.

### Flag Component

The pre-built component `Flag` accepts a component child or children, this component inside the `<Flag>` wrapper only showed when the flag exists in your UpStamps Project.

Notice: The behavior of the flag can be based on the project or the environments.

```js
import {  Flag } from "upstamps-react";

...

<Flag name="private_msg_2">
  <YourFeature/>
</Flag>

```

### useFlag Hook

The library support React hooks. Use `useFlag` for a programmatical method. There's no limit to `useFlag`, just change the names. See the examples.

```js
import {  useFlag } from "upstamps-react";

...

const AppComponent = () => {
  const { show } = useFlag("private_msg_2");
 const privateChat = useFlag("private_chat");

  return (
    <div>
      {show && <div>This is a great feature</div>}
     {privateChat.show && <div>This is a great private chat</div>}
    </div>
  );
};
```
