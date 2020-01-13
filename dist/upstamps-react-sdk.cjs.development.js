'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var tslib = require('tslib');
var React = require('react');
var React__default = _interopDefault(React);

var UpStampsContext =
/*#__PURE__*/
React.createContext({});
var UpStampsProvider = function UpStampsProvider(_a) {
  var children = _a.children,
      clientId = _a.clientId,
      stage = _a.stage,
      projectId = _a.projectId;
  var params = {
    clientId: clientId,
    stage: stage,
    projectId: projectId
  };

  var _b = React.useState({
    name: "Johhn",
    flags: ["car", "chat", "profile", "drawer"],
    params: params
  }),
      state = _b[0],
      dispatch = _b[1];

  var _c = React.useState({
    state: state,
    dispatch: dispatch
  }),
      contextValue = _c[0],
      setContextValue = _c[1]; // Update context value and trigger re-render
  // This patterns avoids unnecessary deep renders
  // https://reactjs.org/docs/context.html#caveats


  React.useEffect(function () {
    setContextValue(tslib.__assign(tslib.__assign({}, contextValue), {
      state: state
    }));
  }, [state]);
  return React__default.createElement(UpStampsContext.Provider, {
    value: contextValue
  }, children);
};

var useFlag = function useFlag(name) {
  var state = React.useContext(UpStampsContext).state;
  return {
    show: state.flags.indexOf(name) !== -1
  };
};

var Flag = function Flag(_a) {
  var children = _a.children,
      name = _a.name;
  var state = React.useContext(UpStampsContext).state;
  var show = state.flags.indexOf(name) !== -1; //Hide the feature

  if (!show) return null;
  return React__default.createElement(React.Fragment, null, children);
};

exports.Flag = Flag;
exports.UpStampsContext = UpStampsContext;
exports.UpStampsProvider = UpStampsProvider;
exports.useFlag = useFlag;
//# sourceMappingURL=upstamps-react-sdk.cjs.development.js.map
