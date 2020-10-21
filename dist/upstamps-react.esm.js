import React, { createContext, useReducer, useMemo, useEffect, useContext, Fragment, useState } from 'react';
import localForage from 'localforage';
import isEqual from 'lodash.isequal';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var apiUrl = "https://services.upstamps.com/api";

var UpStampsContext =
/*#__PURE__*/
createContext({});

var reducer = function reducer(state, action) {
  switch (action.type) {
    case "set-flags":
      return _extends({}, state, action.payload);

    case "set-flags-error":
      return _extends({}, state, action.payload);

    case "set-remotes":
      return _extends({}, state, action.payload);

    case "set-remotes-error":
      return _extends({}, state, action.payload);

    default:
      throw new Error("Unhandled action type");
  }
};

var UpStampsProvider = function UpStampsProvider(_ref) {
  var children = _ref.children,
      clientId = _ref.clientId,
      envKey = _ref.envKey,
      projectKey = _ref.projectKey,
      _ref$endpoint = _ref.endpoint,
      endpoint = _ref$endpoint === void 0 ? apiUrl : _ref$endpoint;
  var params = {
    clientId: clientId,
    envKey: envKey,
    projectKey: projectKey,
    endpoint: endpoint
  };

  var _useReducer = useReducer(reducer, {
    loading: true,
    error: false,
    flags: [],
    remotes: [],
    params: params
  }),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  var value = useMemo(function () {
    return {
      state: state,
      dispatch: dispatch
    };
  }, [state, dispatch]); //Get All Flags on Init

  useEffect(function () {
    var ignore = false; //Get All the Flags

    var onFetchFlags =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      runtime_1.mark(function _callee() {
        var url, response, _ref3, flags, data;

        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                if (!(state.flags.length > 0)) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                //Service Url
                url = endpoint + "/" + clientId + "/" + projectKey + "/" + envKey + "/flags"; //Response with the all the flags

                _context.next = 6;
                return fetch(url);

              case 6:
                response = _context.sent;
                _context.next = 9;
                return response.json();

              case 9:
                _ref3 = _context.sent;
                flags = _ref3.flags;
                //Filters flags a creates a simple array
                data = flags.map(function (item) {
                  return item.name;
                }); //Updates the state with the flags

                if (ignore) {
                  _context.next = 16;
                  break;
                }

                dispatch({
                  type: "set-flags",
                  payload: {
                    flags: data,
                    loading: false
                  }
                }); //Update or save on localStorage

                _context.next = 16;
                return localForage.setItem("flags", data);

              case 16:
                _context.next = 21;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](0);
                dispatch({
                  type: "set-flags-error",
                  payload: {
                    loading: false,
                    error: true
                  }
                });

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 18]]);
      }));

      return function onFetchFlags() {
        return _ref2.apply(this, arguments);
      };
    }(); //Get All the Remote Flags


    var onFetchRemotes =
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      runtime_1.mark(function _callee2() {
        var url, response, _ref5, remotes;

        return runtime_1.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                if (!(state.remotes.length > 0)) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return");

              case 3:
                //Service Url
                url = endpoint + "/" + clientId + "/" + projectKey + "/" + envKey + "/remotes"; //Response with the all the remotes flags

                _context2.next = 6;
                return fetch(url);

              case 6:
                response = _context2.sent;
                _context2.next = 9;
                return response.json();

              case 9:
                _ref5 = _context2.sent;
                remotes = _ref5.remotes;

                if (ignore) {
                  _context2.next = 15;
                  break;
                }

                dispatch({
                  type: "set-remotes",
                  payload: {
                    remotes: remotes,
                    loading: false
                  }
                }); //Update or save on localStorage

                _context2.next = 15;
                return localForage.setItem("remotes", remotes);

              case 15:
                _context2.next = 20;
                break;

              case 17:
                _context2.prev = 17;
                _context2.t0 = _context2["catch"](0);
                dispatch({
                  type: "set-remotes-error",
                  payload: {
                    loading: false,
                    error: true
                  }
                });

              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 17]]);
      }));

      return function onFetchRemotes() {
        return _ref4.apply(this, arguments);
      };
    }();

    onFetchFlags();
    onFetchRemotes();
    return function () {
      ignore = true;
    };
  }, []);
  return React.createElement(UpStampsContext.Provider, {
    value: value
  }, children);
};

var useUpStampsContext = function useUpStampsContext() {
  var context = useContext(UpStampsContext);

  if (context === undefined) {
    throw new Error("UpStampsContext must be used with UpStampsProvider!");
  }

  return context;
};

var useFlag = function useFlag(name) {
  var _useUpstampsContext = useUpStampsContext(),
      state = _useUpstampsContext.state;

  var flags = useMemo(function () {
    return state.flags;
  }, [state.flags]);
  return {
    show: flags.indexOf(name) !== -1
  };
};

var Flag = function Flag(_ref) {
  var children = _ref.children,
      name = _ref.name;

  var _useUpstampsContext = useUpStampsContext(),
      state = _useUpstampsContext.state;

  var show = useMemo(function () {
    return state.flags.indexOf(name) !== -1;
  }, [state.flags, name]); //Hide the feature

  if (!show) return null;
  return React.createElement(Fragment, null, children);
};

var useRemoteFlag = function useRemoteFlag(name) {
  var _useUpstampsContext = useUpStampsContext(),
      state = _useUpstampsContext.state;

  var remote = useMemo(function () {
    return state.remotes.filter(function (item) {
      return item.name === name;
    });
  }, [state.remotes, name]);
  var verifyRemote = useMemo(function () {
    return remote.length > 0;
  }, [remote]);
  return {
    show: verifyRemote,
    data: verifyRemote ? remote[0].data : {}
  };
};

var RemoteFlag = function RemoteFlag(_ref) {
  var children = _ref.children,
      name = _ref.name;

  var _useUpstampsContext = useUpStampsContext(),
      state = _useUpstampsContext.state;

  var remote = useMemo(function () {
    return state.remotes.filter(function (item) {
      return item.name === name;
    });
  }, [state.remotes, name]);
  var verifyRemote = useMemo(function () {
    return remote.length > 0;
  }, [remote]);
  var data = verifyRemote ? remote[0].data : {}; //Hide the feature

  if (!verifyRemote) return null;
  return React.createElement(Fragment, null, children(data));
};

var variantTypes = ["A", "B"];
var fetchHandler =
/*#__PURE__*/
function () {
  var _ref =
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  runtime_1.mark(function _callee(url, name) {
    var response, _ref2, ABTesting, result, show, randomVariant;

    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return fetch(url);

          case 3:
            response = _context.sent;
            _context.next = 6;
            return response.json();

          case 6:
            _ref2 = _context.sent;
            ABTesting = _ref2.ABTesting;
            result = ABTesting.filter(function (item) {
              return item.name === name;
            });
            show = result.length > 0;
            randomVariant = Math.floor(Math.random() * variantTypes.length);
            return _context.abrupt("return", {
              show: show,
              variant: variantTypes[randomVariant],
              loading: false
            });

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 14]]);
  }));

  return function fetchHandler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var emitterHandler =
/*#__PURE__*/
function () {
  var _ref3 =
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  runtime_1.mark(function _callee2(variant, name, url) {
    var post_body, response;
    return runtime_1.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            post_body = {
              name: name,
              varA: variant === "A" ? 1 : 0,
              varB: variant === "B" ? 1 : 0
            };
            _context2.next = 4;
            return fetch(url, {
              method: "POST",
              headers: {
                "content-type": "application/x-www-form-urlencoded"
              },
              body: JSON.stringify(post_body)
            });

          case 4:
            response = _context2.sent;
            _context2.next = 7;
            return response.json();

          case 7:
            return _context2.abrupt("return", _context2.sent);

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", _context2.t0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));

  return function emitterHandler(_x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

var useABTest = function useABTest(name) {
  var context = useUpStampsContext();

  var _useState = useState({
    loading: true,
    error: false,
    show: false,
    variant: "A"
  }),
      state = _useState[0],
      setState = _useState[1];

  var _context$state$params = context.state.params,
      clientId = _context$state$params.clientId,
      projectKey = _context$state$params.projectKey,
      envKey = _context$state$params.envKey;
  var url = apiUrl + "/" + clientId + "/" + projectKey + "/" + envKey + "/testing";
  useEffect(function () {
    var onFetch =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      runtime_1.mark(function _callee() {
        var _ref2, show, loading, variant;

        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return fetchHandler(url, name);

              case 3:
                _ref2 = _context.sent;
                show = _ref2.show;
                loading = _ref2.loading;
                variant = _ref2.variant;
                setState(function (prevState) {
                  return _extends({}, prevState, {
                    show: show,
                    variant: variant,
                    loading: loading
                  });
                });
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);
                setState(function (prevState) {
                  return _extends({}, prevState, {
                    error: true,
                    loading: false
                  });
                });

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 10]]);
      }));

      return function onFetch() {
        return _ref.apply(this, arguments);
      };
    }();

    onFetch();
  }, [name, context.state.params]);

  var onEmitter =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    runtime_1.mark(function _callee2() {
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return emitterHandler(state.variant, name, url);

            case 3:
              return _context2.abrupt("return", _context2.sent);

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", _context2.t0);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 6]]);
    }));

    return function onEmitter() {
      return _ref3.apply(this, arguments);
    };
  }();

  return {
    show: state.show,
    error: state.error,
    loading: state.loading,
    variant: state.variant,
    emitter: onEmitter
  };
};

var Container =
/*#__PURE__*/
React.forwardRef(function (props, ref) {
  React.useImperativeHandle(ref, function () {
    return {
      emitter: props.emitter
    };
  });
  return React.createElement(Fragment, null, props.children);
});
var ABTest = function ABTest(_ref) {
  var children = _ref.children,
      name = _ref.name,
      testRef = _ref.testRef;
  var context = useUpStampsContext();

  var _useState = useState({
    component: [],
    loading: true,
    error: false,
    variant: "A",
    show: false
  }),
      state = _useState[0],
      setState = _useState[1];

  var _context$state$params = context.state.params,
      clientId = _context$state$params.clientId,
      projectKey = _context$state$params.projectKey,
      envKey = _context$state$params.envKey;
  var url = apiUrl + "/" + clientId + "/" + projectKey + "/" + envKey + "/testing";

  var onRenderChildren = function onRenderChildren(variant) {
    var component = React.Children.map(children, function (child) {
      if (child.props.name === variant) {
        return child;
      }
    });
    setState(function (prevState) {
      return _extends({}, prevState, {
        component: component
      });
    });
  };

  useEffect(function () {
    var onFetch =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      runtime_1.mark(function _callee() {
        var _ref3, show, loading, variant;

        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return fetchHandler(url, name);

              case 3:
                _ref3 = _context.sent;
                show = _ref3.show;
                loading = _ref3.loading;
                variant = _ref3.variant;
                onRenderChildren(variant);
                setState(function (prevState) {
                  return _extends({}, prevState, {
                    show: show,
                    variant: variant,
                    loading: loading
                  });
                });
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](0);
                setState(function (prevState) {
                  return _extends({}, prevState, {
                    error: true,
                    loading: false
                  });
                });

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 11]]);
      }));

      return function onFetch() {
        return _ref2.apply(this, arguments);
      };
    }();

    onFetch();
  }, [name, context.state.params]);

  var onEmitter =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    runtime_1.mark(function _callee2() {
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return emitterHandler(state.variant, name, url);

            case 3:
              return _context2.abrupt("return", _context2.sent);

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", _context2.t0);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 6]]);
    }));

    return function onEmitter() {
      return _ref4.apply(this, arguments);
    };
  }();

  if (!state.loading && !state.show) return null;
  return React.createElement(Container, {
    ref: testRef,
    emitter: onEmitter
  }, state.component);
};

var Variant = function Variant(_ref5) {
  var children = _ref5.children,
      name = _ref5.name;
  return React.cloneElement(React.createElement(Fragment, null), {
    name: name
  }, React.createElement(Fragment, null, children));
};

Variant.displayName = "ABTest.Variant";
ABTest.Variant = Variant;

var Container$1 =
/*#__PURE__*/
React.forwardRef(function (props, ref) {
  React.useImperativeHandle(ref, function () {
    return {
      emitter: props.emitter
    };
  });
  return React.createElement(Fragment, null, props.children);
});
var ABTestLocal = function ABTestLocal(_ref) {
  var children = _ref.children,
      name = _ref.name,
      testRef = _ref.testRef,
      _ref$localStorage = _ref.localStorage,
      localStorage = _ref$localStorage === void 0 ? false : _ref$localStorage;
  var context = useUpStampsContext();

  var _useState = useState({
    component: [],
    loading: true,
    error: false,
    variant: "A",
    show: false
  }),
      state = _useState[0],
      setState = _useState[1];

  var _context$state$params = context.state.params,
      clientId = _context$state$params.clientId,
      projectKey = _context$state$params.projectKey,
      envKey = _context$state$params.envKey;
  var url = apiUrl + "/" + clientId + "/" + projectKey + "/" + envKey + "/testing";

  var onRenderChildren = function onRenderChildren(variant) {
    var component = React.Children.map(children, function (child) {
      if (child.props.name === variant) {
        return child;
      }
    });
    setState(function (prevState) {
      return _extends({}, prevState, {
        component: component
      });
    });
  };

  useEffect(function () {
    var onFetch =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      runtime_1.mark(function _callee() {
        var storageData, _ref3, show, loading, variant;

        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return localForage.getItem(name);

              case 3:
                storageData = _context.sent;

                if (!(localStorage && storageData !== null)) {
                  _context.next = 10;
                  break;
                }

                console.log("ABTest local");
                onRenderChildren(storageData.variant);
                setState(function (prevState) {
                  return _extends({}, prevState, storageData);
                });
                _context.next = 21;
                break;

              case 10:
                console.log("ABTest remote");
                _context.next = 13;
                return fetchHandler(url, name);

              case 13:
                _ref3 = _context.sent;
                show = _ref3.show;
                loading = _ref3.loading;
                variant = _ref3.variant;
                onRenderChildren(variant);
                setState(function (prevState) {
                  return _extends({}, prevState, {
                    show: show,
                    variant: variant,
                    loading: loading
                  });
                }); //Updates local storage with the new data

                _context.next = 21;
                return localForage.setItem(name, {
                  show: show,
                  variant: variant,
                  loading: loading
                });

              case 21:
                _context.next = 26;
                break;

              case 23:
                _context.prev = 23;
                _context.t0 = _context["catch"](0);
                setState(function (prevState) {
                  return _extends({}, prevState, {
                    error: true,
                    loading: false
                  });
                });

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 23]]);
      }));

      return function onFetch() {
        return _ref2.apply(this, arguments);
      };
    }();

    onFetch();
  }, [name, context.state.params]);

  var onEmitter =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    runtime_1.mark(function _callee2() {
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return emitterHandler(state.variant, name, url);

            case 3:
              return _context2.abrupt("return", _context2.sent);

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", _context2.t0);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 6]]);
    }));

    return function onEmitter() {
      return _ref4.apply(this, arguments);
    };
  }();

  if (!state.loading && !state.show) return null;
  return React.createElement(Container$1, {
    ref: testRef,
    emitter: onEmitter
  }, state.component);
};

var Variant$1 = function Variant(_ref5) {
  var children = _ref5.children,
      name = _ref5.name;
  return React.cloneElement(React.createElement(Fragment, null), {
    name: name
  }, React.createElement(Fragment, null, children));
};

Variant$1.displayName = "ABTest.Variant";
ABTestLocal.Variant = Variant$1;

var useABTestLocal = function useABTestLocal(name, localStorage) {
  if (localStorage === void 0) {
    localStorage = false;
  }

  var context = useUpStampsContext();

  var _useState = useState({
    loading: true,
    error: false,
    show: false,
    variant: "A"
  }),
      state = _useState[0],
      setState = _useState[1];

  var _context$state$params = context.state.params,
      clientId = _context$state$params.clientId,
      projectKey = _context$state$params.projectKey,
      envKey = _context$state$params.envKey;
  var url = apiUrl + "/" + clientId + "/" + projectKey + "/" + envKey + "/testing";
  useEffect(function () {
    var onFetch =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      runtime_1.mark(function _callee() {
        var storageData, _ref2, show, loading, variant;

        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return localForage.getItem(name);

              case 3:
                storageData = _context.sent;

                if (!(localStorage && storageData !== null)) {
                  _context.next = 9;
                  break;
                }

                console.log("useABTest local");
                setState(function (prevState) {
                  return _extends({}, prevState, storageData);
                });
                _context.next = 19;
                break;

              case 9:
                console.log("useABTest remote");
                _context.next = 12;
                return fetchHandler(url, name);

              case 12:
                _ref2 = _context.sent;
                show = _ref2.show;
                loading = _ref2.loading;
                variant = _ref2.variant;
                setState(function (prevState) {
                  return _extends({}, prevState, {
                    show: show,
                    variant: variant,
                    loading: loading
                  });
                }); //Updates local storage with the new data

                _context.next = 19;
                return localForage.setItem(name, {
                  show: show,
                  variant: variant,
                  loading: loading
                });

              case 19:
                _context.next = 24;
                break;

              case 21:
                _context.prev = 21;
                _context.t0 = _context["catch"](0);
                setState(function (prevState) {
                  return _extends({}, prevState, {
                    error: true,
                    loading: false
                  });
                });

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 21]]);
      }));

      return function onFetch() {
        return _ref.apply(this, arguments);
      };
    }();

    onFetch();
  }, [name, context.state.params]);

  var onEmitter =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    runtime_1.mark(function _callee2() {
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return emitterHandler(state.variant, name, url);

            case 3:
              return _context2.abrupt("return", _context2.sent);

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", _context2.t0);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 6]]);
    }));

    return function onEmitter() {
      return _ref3.apply(this, arguments);
    };
  }();

  return {
    show: state.show,
    error: state.error,
    loading: state.loading,
    variant: state.variant,
    emitter: onEmitter
  };
};

/* eslint-disable */
var queryBuilder = function queryBuilder(params) {
  var esc = encodeURIComponent;
  return Object.keys(params).filter(function (key) {
    return params[key] !== undefined && params[key] && params[key] !== null;
  }).map(function (key) {
    return esc(key) + "=" + esc(params[key]);
  }).join("&");
};

var handleFetch =
/*#__PURE__*/
function () {
  var _ref =
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  runtime_1.mark(function _callee(url, name, params) {
    var query, response, _ref2, segment, show;

    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            query = queryBuilder({
              name: name,
              country: params.country,
              client: params.client,
              clientType: params.clientType
            });
            _context.next = 4;
            return fetch(url + "?" + query, {
              method: "GET"
            });

          case 4:
            response = _context.sent;
            _context.next = 7;
            return response.json();

          case 7:
            _ref2 = _context.sent;
            segment = _ref2.segment;
            show = segment.length > 0;
            return _context.abrupt("return", {
              segment: segment,
              show: show,
              loading: false
            });

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 13]]);
  }));

  return function handleFetch(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var useSegment = function useSegment(name, params) {
  var context = useUpStampsContext();

  var _useState = useState({
    loading: true,
    error: false,
    show: false
  }),
      state = _useState[0],
      setState = _useState[1];

  var _context$state$params = context.state.params,
      clientId = _context$state$params.clientId,
      projectKey = _context$state$params.projectKey,
      envKey = _context$state$params.envKey;
  var url = apiUrl + "/" + clientId + "/" + projectKey + "/" + envKey + "/segment";
  useEffect(function () {
    var onFetch =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      runtime_1.mark(function _callee() {
        var _ref2, show, loading;

        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return handleFetch(url, name, params);

              case 3:
                _ref2 = _context.sent;
                show = _ref2.show;
                loading = _ref2.loading;
                setState(function (prevState) {
                  return _extends({}, prevState, {
                    show: show,
                    loading: loading
                  });
                });
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                setState(function (prevState) {
                  return _extends({}, prevState, {
                    error: true,
                    loading: false
                  });
                });

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 9]]);
      }));

      return function onFetch() {
        return _ref.apply(this, arguments);
      };
    }();

    onFetch();
  }, [name, context.state.params]);
  return {
    show: state.show,
    error: state.error,
    loading: state.loading
  };
};

var Segment = function Segment(_ref) {
  var children = _ref.children,
      name = _ref.name,
      params = _ref.params;
  var context = useUpStampsContext();

  var _useState = useState({
    loading: true,
    error: false,
    show: false
  }),
      state = _useState[0],
      setState = _useState[1];

  var _context$state$params = context.state.params,
      clientId = _context$state$params.clientId,
      projectKey = _context$state$params.projectKey,
      envKey = _context$state$params.envKey;
  var url = apiUrl + "/" + clientId + "/" + projectKey + "/" + envKey + "/segment";
  useEffect(function () {
    var onFetch =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      runtime_1.mark(function _callee() {
        var _ref3, show, loading;

        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return handleFetch(url, name, params);

              case 3:
                _ref3 = _context.sent;
                show = _ref3.show;
                loading = _ref3.loading;
                setState(function (prevState) {
                  return _extends({}, prevState, {
                    show: show,
                    loading: loading
                  });
                });
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                setState(function (prevState) {
                  return _extends({}, prevState, {
                    error: true,
                    loading: false
                  });
                });

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 9]]);
      }));

      return function onFetch() {
        return _ref2.apply(this, arguments);
      };
    }();

    onFetch();
  }, [name, context.state.params]); //Hide the feature

  if (!state.show) return null;
  return React.createElement(Fragment, null, children);
};

var SegmentLocal = function SegmentLocal(_ref) {
  var children = _ref.children,
      name = _ref.name,
      params = _ref.params,
      _ref$localStorage = _ref.localStorage,
      localStorage = _ref$localStorage === void 0 ? false : _ref$localStorage;
  var context = useUpStampsContext();

  var _useState = useState({
    loading: true,
    error: false,
    show: false
  }),
      state = _useState[0],
      setState = _useState[1];

  var _context$state$params = context.state.params,
      clientId = _context$state$params.clientId,
      projectKey = _context$state$params.projectKey,
      envKey = _context$state$params.envKey;
  var url = apiUrl + "/" + clientId + "/" + projectKey + "/" + envKey + "/segment";
  useEffect(function () {
    var onFetch =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      runtime_1.mark(function _callee() {
        var storageData, _ref3, show, loading;

        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return localForage.getItem(name);

              case 3:
                storageData = _context.sent;

                if (!(localStorage && storageData !== null)) {
                  _context.next = 9;
                  break;
                }

                console.log("Segment local = ");
                setState(function (prevState) {
                  return _extends({}, prevState, {
                    show: isEqual(params, storageData.params),
                    loading: false
                  });
                });
                _context.next = 18;
                break;

              case 9:
                _context.next = 11;
                return handleFetch(url, name, params);

              case 11:
                _ref3 = _context.sent;
                show = _ref3.show;
                loading = _ref3.loading;
                console.log("Segment remote");
                setState(function (prevState) {
                  return _extends({}, prevState, {
                    show: show,
                    loading: loading
                  });
                }); //Updates local storage with the new data

                _context.next = 18;
                return localForage.setItem(name, {
                  show: show,
                  loading: loading,
                  params: params
                });

              case 18:
                _context.next = 23;
                break;

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](0);
                setState(function (prevState) {
                  return _extends({}, prevState, {
                    error: true,
                    loading: false
                  });
                });

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 20]]);
      }));

      return function onFetch() {
        return _ref2.apply(this, arguments);
      };
    }();

    onFetch();
  }, [name, context.state.params]); //Hide the feature

  if (!state.show) return null;
  return React.createElement(Fragment, null, children);
};

var useSegmentLocal = function useSegmentLocal(name, params, localStorage) {
  if (localStorage === void 0) {
    localStorage = false;
  }

  var context = useUpStampsContext();

  var _useState = useState({
    loading: true,
    error: false,
    show: false
  }),
      state = _useState[0],
      setState = _useState[1];

  var _context$state$params = context.state.params,
      clientId = _context$state$params.clientId,
      projectKey = _context$state$params.projectKey,
      envKey = _context$state$params.envKey;
  var url = apiUrl + "/" + clientId + "/" + projectKey + "/" + envKey + "/segment";
  useEffect(function () {
    var onFetch =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      runtime_1.mark(function _callee() {
        var storageData, _ref2, show, loading;

        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return localForage.getItem(name);

              case 3:
                storageData = _context.sent;

                if (!(localStorage && storageData !== null)) {
                  _context.next = 9;
                  break;
                }

                console.log("useSegment local");
                setState(function (prevState) {
                  return _extends({}, prevState, {
                    show: isEqual(params, storageData.params),
                    loading: false
                  });
                });
                _context.next = 18;
                break;

              case 9:
                _context.next = 11;
                return handleFetch(url, name, params);

              case 11:
                _ref2 = _context.sent;
                show = _ref2.show;
                loading = _ref2.loading;
                console.log("useSegment remote");
                setState(function (prevState) {
                  return _extends({}, prevState, {
                    show: show,
                    loading: loading
                  });
                }); //Updates local storage with the new data

                _context.next = 18;
                return localForage.setItem(name, {
                  show: show,
                  loading: loading,
                  params: params
                });

              case 18:
                _context.next = 23;
                break;

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](0);
                setState(function (prevState) {
                  return _extends({}, prevState, {
                    error: true,
                    loading: false
                  });
                });

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 20]]);
      }));

      return function onFetch() {
        return _ref.apply(this, arguments);
      };
    }();

    onFetch();
  }, [name, context.state.params]);
  return {
    show: state.show,
    error: state.error,
    loading: state.loading
  };
};

var ScopesContext =
/*#__PURE__*/
createContext({});

var reducer$1 = function reducer(state, action) {
  switch (action.type) {
    case "set-scope":
      return _extends({}, state, action.payload);

    case "set-scope-error":
      return _extends({}, state, action.payload);

    default:
      throw new Error("Unhandled action type");
  }
};

var ScopesProvider = function ScopesProvider(_ref) {
  var children = _ref.children,
      name = _ref.name,
      email = _ref.email;
  var context = useUpStampsContext();
  var params = {
    name: name,
    email: email
  };

  var _useReducer = useReducer(reducer$1, {
    loading: true,
    error: false,
    params: params
  }),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  var _context$state$params = context.state.params,
      clientId = _context$state$params.clientId,
      projectKey = _context$state$params.projectKey;
  var value = useMemo(function () {
    return {
      state: state,
      dispatch: dispatch
    };
  }, [state, dispatch]);
  useEffect(function () {
    var ignore = false;

    var onSetScope =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      runtime_1.mark(function _callee() {
        var url, post_body;
        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                //Service Url
                url = apiUrl + "/" + clientId + "/" + projectKey + "/scopes/add";
                post_body = {
                  name: name,
                  email: email
                };
                _context.next = 5;
                return fetch(url, {
                  method: "POST",
                  headers: {
                    "content-type": "application/x-www-form-urlencoded"
                  },
                  body: JSON.stringify(post_body)
                });

              case 5:
                window.localStorage.setItem("upstamps_scope_email", email);

                if (!ignore) {
                  dispatch({
                    type: "set-scope",
                    payload: {
                      success: true,
                      loading: false
                    }
                  });
                }

                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                dispatch({
                  type: "set-scope-error",
                  payload: {
                    loading: false,
                    error: true
                  }
                });

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 9]]);
      }));

      return function onSetScope() {
        return _ref2.apply(this, arguments);
      };
    }(); //Get the email from localStorage


    var storageEmail = window.localStorage.getItem("upstamps_scope_email"); //Only set a scope if the email is null or different

    if (storageEmail !== email) {
      onSetScope();
    }

    return function () {
      ignore = true;
    };
  }, [email]);
  return React.createElement(ScopesContext.Provider, {
    value: value
  }, children);
};

export { ABTest, ABTestLocal, Flag, RemoteFlag, ScopesContext, ScopesProvider, Segment, SegmentLocal, UpStampsContext, UpStampsProvider, useABTest, useABTestLocal, useFlag, useRemoteFlag, useSegment, useSegmentLocal };
//# sourceMappingURL=upstamps-react.esm.js.map
