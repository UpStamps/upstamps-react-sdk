## React Integration

Integration with React helps and facilitates the process of testing and developing features in production and other environments. This integration consists of a set of plug-and-play components to accelerate the development process in your project.

Start by installing the library following the instructions below.

Quick links

- [About](https://upstamps.com/)
- [Dashboard](https://app.upstamps.com/)
- [Documentation](https://docs.upstamps.com/)

## Installation

First, let's install some packages!

```bash
npm install --save upstamps-react
```

or with yarn

```bash
yarn add upstamps-react
```

## Create a client provider

With all the dependencies you installed, let's create your UpStamps Client.

In our `index.js` file, let's import `UpStampsProvider` from `upstamps-react` and add the configuration params based on your UpStamps project. This params values can be found on the [UpStamps Dashboard in your project's settings](https://app.upstamps.com)

```js
import { UpStampsProvider } from "upstamps-react";

<UpStampsProvider clientId="xxx-xxx-xxx" projectKey="xxxxx" envKey="xxxxx">
  <div>
    <YourApp />
  </div>
</UpStampsProvider>;
```

That's it! Now your app is ready to start using feature flags and other features. Let's start using by importing some pre-built components inside of `upstamps-react`.

## Create a scope provider

To start using Segments or other features depending on the user's behavior, it is necessary to configure the scope provider. This provider must be within the main provider which can be seen above. It uses the same settings.

The scope provider has two parameters, name and email. The email must be unique per user.

```js
import { UpStampsProvider, ScopesProvider } from "upstamps-react";

<UpStampsProvider clientId="xxx-xxx-xxx" projectKey="xxxxx" envKey="xxxxx">
  <ScopesProvider name="Username" email="user@mail.com">
    <div>
      <YourApp />
    </div>
  </ScopesProvider>
</UpStampsProvider>;
```

## Flags

---

Feature flags are an excellent and new way to test features in production. Take advantage of different environments to hide or show your features. This can be used to facilitate the development process on project features that are not yet ready to be presented in production or even disable in real-time if any of the features in production are malfunctioning

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

## Remote Flags

---

Remote Flags have the same normal characteristics as a Flag but they can have a data payload. This data payload allows you to provide real-time properties to your project's features. If, for example, some of the features of a project need to change color, size or even other data in different environments, then the payload of data from a Remote Flag is the most suitable.

### useRemoteFlag Hook

```js
import {  useRemoteFlag } from "upstamps-react";

...

const AppComponent = () => {
  const { show, data } = useRemoteFlag("my_remote_flag");

  return (
    <div>
      {show && <div style={{ color: data.color }}>This is a great remote feature</div>}
    </div>
  );
};
```

### RemoteFlag Component

```js
import { RemoteFlag } from "upstamps-react";

...

const AppComponent = () => {

  return (
    <div>
       <RemoteFlag name="my_remote_flag">
         {data => (
           <div style={{ color: data.color }}>
             A Remote flag inside a component
           </div>
         )}
       </RemoteFlag>
    </div>
  );
};
```

## A/B Testing

---

It is sometimes difficult to understand whether a particular feature is having an impact on the project. To determine if a feature is being used properly, we can do A / B tests. This allows you to understand and compare the impact of functionality in different formats.

When using UpStamps' A / B Tests it is possible to see if the user clicked on a certain feature. The features placed in the A / B Tests will be randomly shown to users. Use the Emitter to send the values to the UpStamps [Dashboard](https://app.upstamps.com).

The `emitter` is a function that understands which version of the test is shown on the user's screen. This function can be used in different events or contexts, for example: click, hover, etc.

### useABTest Hook

```js
import {  useABTest } from "upstamps-react";

...

const AppComponent = () => {
  const { show, variant, emitter } = useABTest("my_ab_test");

  return (
    <div>
      {show && variant === "A" ? (
          <div>
            This is a A TEST
            <button onClick={() => emitter()}>Send A Test</button>
          </div>
        ) : variant === "B" ? (
          <div>
            This is a B TEST
            <button onClick={() => emitter()}>Send B Test</button>
          </div>
        ) : (
          <div>This is a DEFAULT TEST</div>
        )}
    </div>
  );
};
```

### ABTest Component

```js
import React from "react";
import {  useABTest } from "upstamps-react";

...

const AppComponent = () => {

const componentRef = React.useRef();

  return (
    <div>
       <ABTest testRef={componentRef} name="my_ab_test">
          <ABTest.Variant name="A">
            <div>
              this is a AB Comp - A Test
              <button onClick={() => componentRef.current.emitter()}>
                Send A Test
              </button>
            </div>
          </ABTest.Variant>
          <ABTest.Variant name="B">
            <div>
              this is a AB Comp - B Test
              <button onClick={() => componentRef.current.emitter()}>
                Send B Test
              </button>
            </div>
          </ABTest.Variant>
        </ABTest>
    </div>
  );
};
```

## Segments

---

Users can be from different countries or even be using different platforms. Use Segments to isolate certain features by a country, browser or even the type of device. With Segments, it is possible to display features, for example, only on mobile browsers or even users who are using only Google Chrome.

Notice: To use Segments it is necessary to integrate ScopesProvider. See the ScopesProvider instructions above to be able to register users.

### useSegment Hook

```js
import {  useSegment } from "upstamps-react";

...

const AppComponent = () => {
   const {show} = useSegment("my_segment", {
      country: "Portugal",
      client: "Microsoft Edge",
      clientType: "mobile"
    });

  return (
    <div>
      {show && <div>This is a feature from segment</div>}
    </div>
  );
};
```

### Segment Component

```js
import {  Segment } from "upstamps-react";

...

const AppComponent = () => {

  return (
    <div>
       <Segment
         name="my_segment"
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
```
