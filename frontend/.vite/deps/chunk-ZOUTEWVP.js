import {
  require_prop_types
} from "./chunk-4GJI2KDJ.js";
import {
  number_default,
  round_default,
  value_default
} from "./chunk-ZN7JTD3B.js";
import {
  require_react_dom
} from "./chunk-DZXRV6RW.js";
import {
  require_react
} from "./chunk-ZAUFE7H7.js";
import {
  __toESM
} from "./chunk-UXIASGQL.js";

// node_modules/@devexpress/dx-react-chart/dist/dx-react-chart.es.js
var import_react2 = __toESM(require_react());

// node_modules/@devexpress/dx-react-core/dist/dx-react-core.es.js
var import_react = __toESM(require_react());

// node_modules/@devexpress/dx-core/dist/dx-core.es.js
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || from);
}
var compare = function(a2, b) {
  var aPosition = a2.position();
  var bPosition = b.position();
  for (var i = 0; i < Math.min(aPosition.length, bPosition.length); i += 1) {
    if (aPosition[i] < bPosition[i])
      return -1;
    if (aPosition[i] > bPosition[i])
      return 1;
  }
  return aPosition.length - bPosition.length;
};
var insertPlugin = function(array3, newItem) {
  var result = array3.slice();
  var nextItemIndex = array3.findIndex(function(item) {
    return compare(newItem, item) <= 0;
  });
  var targetIndex = nextItemIndex < 0 ? array3.length : nextItemIndex;
  var alreadyExists = targetIndex >= 0 && targetIndex < array3.length && compare(newItem, array3[targetIndex]) === 0;
  var deletedItems = 0;
  if (alreadyExists) {
    deletedItems = 1;
    var targetItemPosition = result[targetIndex].position();
    if (targetItemPosition.length > 1) {
      for (var i = targetIndex + 1; i < result.length; i += 1) {
        var itemPosition = result[i].position();
        if (targetItemPosition.length === itemPosition.length && targetItemPosition[targetItemPosition.length - 2] === itemPosition[itemPosition.length - 2]) {
          deletedItems += 1;
        } else {
          break;
        }
      }
    }
  }
  result.splice(targetIndex, deletedItems, newItem);
  return result;
};
var removePlugin = function(array3, item) {
  var itemIndex = array3.indexOf(item);
  return itemIndex >= 0 ? __spreadArray(__spreadArray([], __read(array3.slice(0, itemIndex)), false), __read(array3.slice(itemIndex + 1)), false) : array3;
};
var hasWindow = function() {
  return typeof window !== "undefined";
};
var getDependencyError = function(pluginName, dependencyName) {
  return new Error("The '".concat(pluginName, "' plugin requires '").concat(dependencyName, "' to be defined before it."));
};
var PluginHost = function() {
  function PluginHost3() {
    this.gettersCache = {};
    this.knownKeysCache = {};
    this.validationRequired = true;
    this.plugins = [];
    this.subscriptions = /* @__PURE__ */ new Set();
  }
  PluginHost3.prototype.ensureDependencies = function() {
    var defined = /* @__PURE__ */ new Set();
    var knownOptionals = /* @__PURE__ */ new Map();
    this.plugins.filter(function(plugin) {
      return plugin.container;
    }).forEach(function(plugin) {
      var pluginName = plugin.name || "";
      if (knownOptionals.has(pluginName)) {
        throw getDependencyError(knownOptionals.get(pluginName), pluginName);
      }
      (plugin.dependencies || []).forEach(function(dependency) {
        if (defined.has(dependency.name))
          return;
        if (dependency.optional) {
          if (!knownOptionals.has(dependency.name)) {
            knownOptionals.set(dependency.name, pluginName);
          }
          return;
        }
        throw getDependencyError(pluginName, dependency.name);
      });
      defined.add(pluginName);
    });
  };
  PluginHost3.prototype.registerPlugin = function(plugin) {
    this.plugins = insertPlugin(this.plugins, plugin);
    this.cleanPluginsCache();
  };
  PluginHost3.prototype.unregisterPlugin = function(plugin) {
    this.plugins = removePlugin(this.plugins, plugin);
    this.cleanPluginsCache();
  };
  PluginHost3.prototype.knownKeys = function(postfix) {
    if (!this.knownKeysCache[postfix]) {
      this.knownKeysCache[postfix] = Array.from(this.plugins.map(function(plugin) {
        return Object.keys(plugin);
      }).map(function(keys) {
        return keys.filter(function(key) {
          return key.endsWith(postfix);
        })[0];
      }).filter(function(key) {
        return !!key;
      }).reduce(function(acc, key) {
        return acc.add(key);
      }, /* @__PURE__ */ new Set())).map(function(key) {
        return key.replace(postfix, "");
      });
    }
    return this.knownKeysCache[postfix];
  };
  PluginHost3.prototype.collect = function(key, upTo) {
    if (this.validationRequired) {
      this.ensureDependencies();
      this.validationRequired = false;
    }
    var res = this.gettersCache[key];
    if (!res) {
      var indexCache = this.plugins.map(function(plugin, index3) {
        return { key: plugin[key], index: index3 };
      }).filter(function(plugin) {
        return !!plugin.key;
      });
      this.gettersCache["".concat(key, "_i")] = indexCache;
      res = indexCache.map(function(item) {
        return item.key;
      });
      this.gettersCache[key] = res;
    }
    if (!upTo)
      return res;
    var upToIndex = this.plugins.indexOf(upTo);
    var upToIndexKey = key + upToIndex;
    var upToRes = this.gettersCache[upToIndexKey];
    if (!upToRes) {
      var indexCache_1 = this.gettersCache["".concat(key, "_i")];
      upToRes = this.gettersCache[key].filter(function(getter, index3) {
        return indexCache_1[index3].index < upToIndex;
      });
      this.gettersCache[upToIndexKey] = upToRes;
    }
    return upToRes;
  };
  PluginHost3.prototype.get = function(key, upTo) {
    var plugins = this.collect(key, upTo);
    if (!plugins.length)
      return void 0;
    var result;
    plugins.forEach(function(plugin) {
      result = plugin(result);
    });
    return result;
  };
  PluginHost3.prototype.registerSubscription = function(subscription) {
    this.subscriptions.add(subscription);
  };
  PluginHost3.prototype.unregisterSubscription = function(subscription) {
    this.subscriptions.delete(subscription);
  };
  PluginHost3.prototype.broadcast = function(event, message) {
    this.subscriptions.forEach(function(subscription) {
      return subscription[event] && subscription[event](message);
    });
  };
  PluginHost3.prototype.cleanPluginsCache = function() {
    this.validationRequired = true;
    this.gettersCache = {};
    this.knownKeysCache = {};
  };
  return PluginHost3;
}();
var EventEmitter = function() {
  function EventEmitter2() {
    this.handlers = [];
  }
  EventEmitter2.prototype.emit = function(e) {
    this.handlers.forEach(function(handler) {
      return handler(e);
    });
  };
  EventEmitter2.prototype.subscribe = function(handler) {
    this.handlers.push(handler);
  };
  EventEmitter2.prototype.unsubscribe = function(handler) {
    this.handlers.splice(this.handlers.indexOf(handler), 1);
  };
  return EventEmitter2;
}();
var shallowEqual = function(objA, objB) {
  if (objA === objB) {
    return true;
  }
  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }
  var hasOwn = Object.prototype.hasOwnProperty;
  for (var i = 0; i < keysA.length; i += 1) {
    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
    var valA = objA[keysA[i]];
    var valB = objB[keysA[i]];
    if (valA !== valB) {
      return false;
    }
  }
  return true;
};

// node_modules/@devexpress/dx-react-core/dist/dx-react-core.es.js
var import_react_dom = __toESM(require_react_dom());
var import_prop_types = __toESM(require_prop_types());
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2)
      if (Object.prototype.hasOwnProperty.call(b2, p))
        d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign4(t) {
    for (var s2, i = 1, n = arguments.length; i < n; i++) {
      s2 = arguments[i];
      for (var p in s2)
        if (Object.prototype.hasOwnProperty.call(s2, p))
          t[p] = s2[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __rest(s2, e) {
  var t = {};
  for (var p in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p) && e.indexOf(p) < 0)
      t[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s2); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i]))
        t[p[i]] = s2[p[i]];
    }
  return t;
}
function __read2(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
}
function __spreadArray2(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || from);
}
var PluginHostContext = (0, import_react.createContext)(null);
var PositionContext = (0, import_react.createContext)(function() {
  return [];
});
var TemplateHostContext = (0, import_react.createContext)(null);
var PluginIndexer = function(_super) {
  __extends(PluginIndexer2, _super);
  function PluginIndexer2() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.indexes = {};
    _this.memoize = function(index3, positionContext) {
      if (_this.indexes[index3])
        return _this.indexes[index3];
      var fn = function() {
        var calculatedPosition = positionContext();
        return __spreadArray2(__spreadArray2([], __read2(calculatedPosition), false), [index3], false);
      };
      _this.indexes[index3] = fn;
      return fn;
    };
    return _this;
  }
  PluginIndexer2.prototype.render = function() {
    var _this = this;
    var children = this.props.children;
    return (0, import_react.createElement)(PositionContext.Consumer, null, function(positionContext) {
      return import_react.Children.map(children, function(child, index3) {
        if (!child || !child.type)
          return child;
        var childPosition = _this.memoize(index3, positionContext);
        return (0, import_react.createElement)(PositionContext.Provider, { key: String(index3), value: childPosition }, child);
      });
    });
  };
  return PluginIndexer2;
}(import_react.PureComponent);
var PLUGIN_HOST_CONTEXT = "dxcore_pluginHost_context";
var POSITION_CONTEXT = "dxcore_position_context";
var TEMPLATE_HOST_CONTEXT = "dxcore_templateHost_context";
var RERENDER_TEMPLATE_EVENT = Symbol("rerenderTemplate");
var RERENDER_TEMPLATE_SCOPE_EVENT = Symbol("rerenderTemplateScope");
var UPDATE_CONNECTION_EVENT = Symbol("updateConnection");
var withContext = function(Context, name) {
  return function(Component2) {
    return function(props) {
      return (0, import_react.createElement)(Context.Consumer, null, function(context) {
        var _a3;
        return (0, import_react.createElement)(Component2, __assign({}, props, (_a3 = {}, _a3[name] = context, _a3)));
      });
    };
  };
};
var withHostAndPosition = function(Component2) {
  return withContext(PluginHostContext, PLUGIN_HOST_CONTEXT)(withContext(PositionContext, POSITION_CONTEXT)(Component2));
};
var PluginBase = function(_super) {
  __extends(PluginBase2, _super);
  function PluginBase2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  PluginBase2.prototype.componentDidMount = function() {
    var _a3 = this.props, _b2 = PLUGIN_HOST_CONTEXT, pluginHost = _a3[_b2], _c = POSITION_CONTEXT, position = _a3[_c];
    var _d = this.props, name = _d.name, dependencies2 = _d.dependencies;
    this.plugin = {
      position,
      name,
      dependencies: dependencies2,
      container: true
    };
    pluginHost.registerPlugin(this.plugin);
    pluginHost.ensureDependencies();
  };
  PluginBase2.prototype.componentDidUpdate = function() {
    var _a3 = this.props, _b2 = PLUGIN_HOST_CONTEXT, pluginHost = _a3[_b2];
    pluginHost.ensureDependencies();
  };
  PluginBase2.prototype.componentWillUnmount = function() {
    var _a3 = this.props, _b2 = PLUGIN_HOST_CONTEXT, pluginHost = _a3[_b2];
    pluginHost.unregisterPlugin(this.plugin);
  };
  PluginBase2.prototype.render = function() {
    var children = this.props.children;
    return (0, import_react.createElement)(PluginIndexer, null, children);
  };
  return PluginBase2;
}(import_react.PureComponent);
var Plugin = withHostAndPosition(PluginBase);
var getRenderingData = function(props) {
  var name = props.name, params = props.params;
  if (name) {
    var _a3 = props, _b2 = PLUGIN_HOST_CONTEXT, pluginHost = _a3[_b2];
    return {
      params,
      templates: pluginHost.collect("".concat(name, "Template")).filter(function(template) {
        return template.predicate(params);
      }).reverse()
    };
  }
  var _c = props, _d = TEMPLATE_HOST_CONTEXT, templateHost = _c[_d];
  return {
    params: params || templateHost.params(),
    templates: templateHost.templates()
  };
};
var TemplatePlaceholderBase = function(_super) {
  __extends(TemplatePlaceholderBase2, _super);
  function TemplatePlaceholderBase2() {
    var _a3;
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.subscription = (_a3 = {}, _a3[RERENDER_TEMPLATE_EVENT] = function(id) {
      if (_this.template && _this.template.id === id) {
        _this.forceUpdate();
      }
    }, _a3[RERENDER_TEMPLATE_SCOPE_EVENT] = function(name) {
      var propsName = _this.props.name;
      if (propsName === name) {
        _this.forceUpdate();
      }
    }, _a3);
    _this.template = null;
    _this.params = {};
    return _this;
  }
  TemplatePlaceholderBase2.prototype.componentDidMount = function() {
    var _a3 = this.props, _b2 = PLUGIN_HOST_CONTEXT, pluginHost = _a3[_b2];
    pluginHost.registerSubscription(this.subscription);
  };
  TemplatePlaceholderBase2.prototype.shouldComponentUpdate = function(nextProps) {
    var _a3 = getRenderingData(nextProps), params = _a3.params, templates = _a3.templates;
    var _b2 = __read2(templates, 1), template = _b2[0];
    var children = this.props.children;
    return children !== nextProps.children || templates.length !== getRenderingData(this.props).templates.length || this.template !== template || !shallowEqual(this.params, params);
  };
  TemplatePlaceholderBase2.prototype.componentWillUnmount = function() {
    var _a3 = this.props, _b2 = PLUGIN_HOST_CONTEXT, pluginHost = _a3[_b2];
    pluginHost.unregisterSubscription(this.subscription);
  };
  TemplatePlaceholderBase2.prototype.render = function() {
    var _a3;
    var _this = this;
    var _b2 = getRenderingData(this.props), params = _b2.params, templates = _b2.templates;
    this.params = params;
    _a3 = __read2(templates, 1), this.template = _a3[0];
    var restTemplates = templates.slice(1);
    var content = null;
    if (this.template) {
      var templateContent = this.template.children;
      content = templateContent() || null;
      if (content && typeof content === "function") {
        content = content(params);
      }
    }
    var templatePlaceholder = this.props.children;
    return (0, import_react.createElement)(TemplateHostContext.Provider, { value: {
      templates: function() {
        return restTemplates;
      },
      params: function() {
        return _this.params;
      }
    } }, templatePlaceholder ? templatePlaceholder(content) : content);
  };
  return TemplatePlaceholderBase2;
}(import_react.Component);
var TemplatePlaceholder = withContext(PluginHostContext, PLUGIN_HOST_CONTEXT)(withContext(TemplateHostContext, TEMPLATE_HOST_CONTEXT)(TemplatePlaceholderBase));
var PluginHostBase = function(_super) {
  __extends(PluginHostBase2, _super);
  function PluginHostBase2(props) {
    var _this = _super.call(this, props) || this;
    _this.host = new PluginHost();
    return _this;
  }
  PluginHostBase2.prototype.render = function() {
    var children = this.props.children;
    return (0, import_react.createElement)(
      PluginHostContext.Provider,
      { value: this.host },
      (0, import_react.createElement)(PluginIndexer, null, children),
      (0, import_react.createElement)(TemplatePlaceholder, { name: "root" })
    );
  };
  return PluginHostBase2;
}(import_react.PureComponent);
var PluginHost2 = PluginHostBase;
var getAvailableGetters = function(pluginHost, getGetterValue) {
  if (getGetterValue === void 0) {
    getGetterValue = function(getterName) {
      return pluginHost.get("".concat(getterName, "Getter"));
    };
  }
  var trackedDependencies = {};
  var getters;
  if (typeof Proxy !== "undefined") {
    getters = new Proxy({}, {
      get: function(target, prop) {
        if (typeof prop !== "string")
          return void 0;
        var result = getGetterValue(prop);
        trackedDependencies[prop] = result;
        return result;
      },
      getOwnPropertyDescriptor: function(target, prop) {
        return {
          configurable: true,
          enumerable: true,
          value: this.get(target, prop, void 0)
        };
      },
      ownKeys: function() {
        return pluginHost.knownKeys("Getter");
      }
    });
  } else {
    getters = pluginHost.knownKeys("Getter").reduce(function(acc, getterName) {
      Object.defineProperty(acc, getterName, {
        get: function() {
          var result = getGetterValue(getterName);
          trackedDependencies[getterName] = result;
          return result;
        }
      });
      return acc;
    }, {});
  }
  return { getters, trackedDependencies };
};
var isTrackedDependenciesChanged = function(pluginHost, prevTrackedDependencies, getGetterValue) {
  if (getGetterValue === void 0) {
    getGetterValue = function(getterName) {
      return pluginHost.get("".concat(getterName, "Getter"));
    };
  }
  var trackedDependencies = Object.keys(prevTrackedDependencies).reduce(function(acc, getterName) {
    var _a3;
    return Object.assign(acc, (_a3 = {}, _a3[getterName] = getGetterValue(getterName), _a3));
  }, {});
  return !shallowEqual(prevTrackedDependencies, trackedDependencies);
};
var getAvailableActions = function(pluginHost, getAction) {
  if (getAction === void 0) {
    getAction = function(actionName) {
      return pluginHost.collect("".concat(actionName, "Action")).slice().reverse()[0];
    };
  }
  var actions;
  if (typeof Proxy !== "undefined") {
    actions = new Proxy({}, {
      get: function(target, prop) {
        if (typeof prop !== "string")
          return void 0;
        return getAction(prop);
      },
      getOwnPropertyDescriptor: function(target, prop) {
        return {
          configurable: true,
          enumerable: true,
          value: this.get(target, prop, void 0)
        };
      },
      ownKeys: function() {
        return pluginHost.knownKeys("Action");
      }
    });
  } else {
    actions = pluginHost.knownKeys("Action").reduce(function(acc, actionName) {
      Object.defineProperty(acc, actionName, {
        get: function() {
          return getAction(actionName);
        }
      });
      return acc;
    }, {});
  }
  return actions;
};
var ActionBase = function(_super) {
  __extends(ActionBase2, _super);
  function ActionBase2(props) {
    var _a3;
    var _this = _super.call(this, props) || this;
    var _b2 = props, _c = PLUGIN_HOST_CONTEXT, pluginHost = _b2[_c], _d = POSITION_CONTEXT, positionContext = _b2[_d];
    var name = props.name;
    _this.plugin = (_a3 = {
      position: function() {
        return positionContext();
      }
    }, _a3["".concat(name, "Action")] = function(params) {
      var action = _this.props.action;
      var getters = getAvailableGetters(pluginHost, function(getterName) {
        return pluginHost.get("".concat(getterName, "Getter"), _this.plugin);
      }).getters;
      var nextParams = params;
      var actions = getAvailableActions(pluginHost, function(actionName) {
        return actionName === name ? function(newParams) {
          nextParams = newParams;
        } : pluginHost.collect("".concat(actionName, "Action"), _this.plugin).slice().reverse()[0];
      });
      action(params, getters, actions);
      var nextAction = pluginHost.collect("".concat(name, "Action"), _this.plugin).slice().reverse()[0];
      if (nextAction) {
        nextAction(nextParams);
      }
    }, _a3);
    pluginHost.registerPlugin(_this.plugin);
    return _this;
  }
  ActionBase2.prototype.componentWillUnmount = function() {
    var _a3 = this.props, _b2 = PLUGIN_HOST_CONTEXT, pluginHost = _a3[_b2];
    pluginHost.unregisterPlugin(this.plugin);
  };
  ActionBase2.prototype.render = function() {
    return null;
  };
  return ActionBase2;
}(import_react.PureComponent);
var Action = withHostAndPosition(ActionBase);
var GetterBase = function(_super) {
  __extends(GetterBase2, _super);
  function GetterBase2(props) {
    var _a3;
    var _this = _super.call(this, props) || this;
    var _b2 = props, _c = PLUGIN_HOST_CONTEXT, pluginHost = _b2[_c], _d = POSITION_CONTEXT, positionContext = _b2[_d];
    var name = props.name;
    var lastComputed;
    var lastTrackedDependencies = {};
    var lastResult;
    _this.plugin = (_a3 = {
      position: function() {
        return positionContext();
      }
    }, _a3["".concat(name, "Getter")] = function(original) {
      var _a4 = _this.props, value = _a4.value, computed = _a4.computed;
      if (computed === void 0)
        return value;
      var getGetterValue = function(getterName) {
        return getterName === name ? original : pluginHost.get("".concat(getterName, "Getter"), _this.plugin);
      };
      if (computed === lastComputed && !isTrackedDependenciesChanged(pluginHost, lastTrackedDependencies, getGetterValue)) {
        return lastResult;
      }
      var _b3 = getAvailableGetters(pluginHost, getGetterValue), getters = _b3.getters, trackedDependencies = _b3.trackedDependencies;
      var actions = getAvailableActions(pluginHost);
      lastComputed = computed;
      lastTrackedDependencies = trackedDependencies;
      lastResult = computed(getters, actions);
      return lastResult;
    }, _a3);
    pluginHost.registerPlugin(_this.plugin);
    return _this;
  }
  GetterBase2.prototype.componentDidUpdate = function() {
    var _a3 = this.props, _b2 = PLUGIN_HOST_CONTEXT, pluginHost = _a3[_b2];
    pluginHost.broadcast(UPDATE_CONNECTION_EVENT);
  };
  GetterBase2.prototype.componentWillUnmount = function() {
    var _a3 = this.props, _b2 = PLUGIN_HOST_CONTEXT, pluginHost = _a3[_b2];
    pluginHost.unregisterPlugin(this.plugin);
  };
  GetterBase2.prototype.render = function() {
    return null;
  };
  return GetterBase2;
}(import_react.PureComponent);
var Getter = withHostAndPosition(GetterBase);
var globalTemplateId = 0;
var TemplateBase = function(_super) {
  __extends(TemplateBase2, _super);
  function TemplateBase2(props) {
    var _a3;
    var _this = _super.call(this, props) || this;
    _this.children = function() {
      return void 0;
    };
    globalTemplateId += 1;
    _this.id = globalTemplateId;
    var _b2 = props, _c = PLUGIN_HOST_CONTEXT, pluginHost = _b2[_c], _d = POSITION_CONTEXT, positionContext = _b2[_d];
    var name = props.name, predicate = props.predicate;
    _this.plugin = (_a3 = {
      position: function() {
        return positionContext();
      }
    }, _a3["".concat(name, "Template")] = {
      id: _this.id,
      predicate: function(params) {
        return predicate ? predicate(params) : true;
      },
      children: function() {
        var children = _this.props.children;
        return children;
      }
    }, _a3);
    pluginHost.registerPlugin(_this.plugin);
    pluginHost.broadcast(RERENDER_TEMPLATE_SCOPE_EVENT, name);
    return _this;
  }
  TemplateBase2.prototype.componentDidUpdate = function() {
    var _a3 = this.props, _b2 = PLUGIN_HOST_CONTEXT, pluginHost = _a3[_b2];
    pluginHost.broadcast(RERENDER_TEMPLATE_EVENT, this.id);
  };
  TemplateBase2.prototype.componentWillUnmount = function() {
    var _a3 = this.props, _b2 = PLUGIN_HOST_CONTEXT, pluginHost = _a3[_b2];
    var name = this.props.name;
    pluginHost.unregisterPlugin(this.plugin);
    pluginHost.broadcast(RERENDER_TEMPLATE_SCOPE_EVENT, name);
  };
  TemplateBase2.prototype.render = function() {
    return null;
  };
  return TemplateBase2;
}(import_react.PureComponent);
var Template = withHostAndPosition(TemplateBase);
var TemplateConnectorBase = function(_super) {
  __extends(TemplateConnectorBase2, _super);
  function TemplateConnectorBase2(props, context) {
    var _a3;
    var _this = _super.call(this, props, context) || this;
    _this.trackedDependencies = {};
    _this.subscription = (_a3 = {}, _a3[UPDATE_CONNECTION_EVENT] = function() {
      return _this.updateConnection();
    }, _a3);
    return _this;
  }
  TemplateConnectorBase2.prototype.componentDidMount = function() {
    var pluginHost = this.context;
    pluginHost.registerSubscription(this.subscription);
  };
  TemplateConnectorBase2.prototype.componentWillUnmount = function() {
    var pluginHost = this.context;
    pluginHost.unregisterSubscription(this.subscription);
  };
  TemplateConnectorBase2.prototype.updateConnection = function() {
    var pluginHost = this.context;
    if (isTrackedDependenciesChanged(pluginHost, this.trackedDependencies)) {
      this.forceUpdate();
    }
  };
  TemplateConnectorBase2.prototype.render = function() {
    var pluginHost = this.context;
    var children = this.props.children;
    var _a3 = getAvailableGetters(pluginHost), getters = _a3.getters, trackedDependencies = _a3.trackedDependencies;
    this.trackedDependencies = trackedDependencies;
    var actions = getAvailableActions(pluginHost);
    return children(getters, actions);
  };
  return TemplateConnectorBase2;
}(import_react.Component);
TemplateConnectorBase.contextType = PluginHostContext;
var TemplateConnector = TemplateConnectorBase;
var TIMEOUT = 180;
var TouchStrategy = function() {
  function TouchStrategy2(delegate) {
    this.delegate = delegate;
    this.touchStartTimeout = null;
    this.dragging = false;
  }
  TouchStrategy2.prototype.isDragging = function() {
    return this.dragging;
  };
  TouchStrategy2.prototype.isWaiting = function() {
    return !!this.touchStartTimeout;
  };
  TouchStrategy2.prototype.cancelWaiting = function() {
    clearTimeout(this.touchStartTimeout);
    this.touchStartTimeout = void 0;
  };
  TouchStrategy2.prototype.start = function(e) {
    var _this = this;
    var _a3 = e.touches[0], x2 = _a3.clientX, y2 = _a3.clientY;
    this.touchStartTimeout = setTimeout(function() {
      _this.delegate.onStart({ x: x2, y: y2 });
      _this.dragging = true;
    }, TIMEOUT);
  };
  TouchStrategy2.prototype.move = function(e) {
    this.cancelWaiting();
    if (this.dragging) {
      var _a3 = e.touches[0], clientX = _a3.clientX, clientY = _a3.clientY;
      e.preventDefault();
      this.delegate.onMove({ x: clientX, y: clientY });
    }
  };
  TouchStrategy2.prototype.end = function(e) {
    this.cancelWaiting();
    if (this.dragging) {
      var _a3 = e.changedTouches[0], clientX = _a3.clientX, clientY = _a3.clientY;
      this.delegate.onEnd({ x: clientX, y: clientY });
    }
    this.dragging = false;
  };
  return TouchStrategy2;
}();
var gestureCover;
var toggleGestureCover = function(toggle, cursor) {
  var style = {
    pointerEvents: toggle ? "all" : "none"
  };
  if (toggle && cursor) {
    style = __assign(__assign({}, style), { cursor });
  }
  if (!gestureCover) {
    style = __assign(__assign({}, style), { position: "fixed", top: 0, right: 0, left: 0, bottom: 0, opacity: 0, zIndex: 2147483647 });
    gestureCover = document.createElement("div");
    document.body.appendChild(gestureCover);
  }
  Object.keys(style).forEach(function(key) {
    gestureCover.style[key] = style[key];
  });
};
var clear = function() {
  var selection = window.getSelection && window.getSelection();
  if (selection) {
    if (selection.empty) {
      selection.empty();
    } else if (selection.removeAllRanges) {
      selection.removeAllRanges();
    }
  }
};
var BOUNDARY = 10;
var clamp = function(value, min4, max4) {
  return Math.max(Math.min(value, max4), min4);
};
var isBoundExceeded = function(_a3, _b2) {
  var initialX = _a3.x, initialY = _a3.y;
  var x2 = _b2.x, y2 = _b2.y;
  return clamp(x2, initialX - BOUNDARY, initialX + BOUNDARY) !== x2 || clamp(y2, initialY - BOUNDARY, initialY + BOUNDARY) !== y2;
};
var MouseStrategy = function() {
  function MouseStrategy2(delegate) {
    this.delegate = delegate;
    this.mouseInitialOffset = null;
    this.dragging = false;
  }
  MouseStrategy2.prototype.isDragging = function() {
    return this.dragging;
  };
  MouseStrategy2.prototype.start = function(e) {
    var x2 = e.clientX, y2 = e.clientY;
    this.e = e;
    this.mouseInitialOffset = { x: x2, y: y2 };
  };
  MouseStrategy2.prototype.move = function(e) {
    var x2 = e.clientX, y2 = e.clientY;
    var dragStarted = false;
    if (!this.dragging && this.mouseInitialOffset) {
      if (isBoundExceeded(this.mouseInitialOffset, { x: x2, y: y2 })) {
        this.delegate.onStart(this.mouseInitialOffset);
        clear();
        dragStarted = true;
        this.dragging = true;
      }
    }
    if (this.dragging) {
      e.preventDefault();
      this.delegate.onMove({ x: x2, y: y2 });
    }
    if (dragStarted) {
      var element = document.elementFromPoint(x2, y2);
      var cursor = element ? window.getComputedStyle(element).cursor : null;
      toggleGestureCover(true, cursor);
    }
  };
  MouseStrategy2.prototype.end = function(e) {
    if (this.dragging) {
      var x2 = e.clientX, y2 = e.clientY;
      toggleGestureCover(false);
      this.delegate.onEnd({ x: x2, y: y2 });
    }
    this.mouseInitialOffset = null;
    this.dragging = false;
  };
  return MouseStrategy2;
}();
var eventEmitter;
var getSharedEventEmitter = function() {
  if (!eventEmitter) {
    eventEmitter = new EventEmitter();
    ["mousemove", "mouseup", "touchmove", "touchend", "touchcancel"].forEach(function(name) {
      return window.addEventListener(name, function(e) {
        return eventEmitter.emit([name, e]);
      }, { passive: false });
    });
  }
  return eventEmitter;
};
var RefHolder = (0, import_react.forwardRef)(function(_a3, ref) {
  var _b2;
  var children = _a3.children;
  return (0, import_react.isValidElement)(children) ? typeof children.type === "string" ? (0, import_react.cloneElement)(children, { ref }) : (0, import_react.cloneElement)(children, {
    forwardedRef: ((_b2 = children.props) === null || _b2 === void 0 ? void 0 : _b2.forwardedRef) ? function(node) {
      children.props.forwardedRef(node);
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    } : ref
  }) : (0, import_react.createElement)("div", { ref, style: { display: "contents" } }, children);
});
var draggingHandled = Symbol("draggingHandled");
var Draggable = function(_super) {
  __extends(Draggable2, _super);
  function Draggable2(props) {
    var _this = _super.call(this, props) || this;
    _this.eventParams = null;
    _this.detachNodeEvents = null;
    var delegate = {
      onStart: function(_a3) {
        var x2 = _a3.x, y2 = _a3.y;
        var onStart = _this.props.onStart;
        if (!onStart)
          return;
        (0, import_react_dom.unstable_batchedUpdates)(function() {
          onStart({ x: x2, y: y2 });
        });
      },
      onMove: function(_a3) {
        var x2 = _a3.x, y2 = _a3.y;
        var onUpdate = _this.props.onUpdate;
        if (!onUpdate)
          return;
        (0, import_react_dom.unstable_batchedUpdates)(function() {
          onUpdate({ x: x2, y: y2 });
        });
      },
      onEnd: function(_a3) {
        var x2 = _a3.x, y2 = _a3.y;
        var onEnd = _this.props.onEnd;
        if (!onEnd)
          return;
        (0, import_react_dom.unstable_batchedUpdates)(function() {
          onEnd({ x: x2, y: y2 });
        });
      }
    };
    _this.mouseStrategy = new MouseStrategy(delegate);
    _this.touchStrategy = new TouchStrategy(delegate);
    _this.elementRef = (0, import_react.createRef)();
    _this.mouseDownListener = _this.mouseDownListener.bind(_this);
    _this.touchStartListener = _this.touchStartListener.bind(_this);
    _this.globalListener = _this.globalListener.bind(_this);
    return _this;
  }
  Draggable2.prototype.componentDidMount = function() {
    getSharedEventEmitter().subscribe(this.globalListener);
    this.setupNodeSubscription();
  };
  Draggable2.prototype.componentDidUpdate = function() {
    this.setupNodeSubscription();
  };
  Draggable2.prototype.componentWillUnmount = function() {
    var _a3;
    if (this.eventParams) {
      var _b2 = this.eventParams, isMouseEvent = _b2.isMouseEvent, e = _b2.e;
      if (isMouseEvent) {
        this.mouseStrategy.end(e);
      } else {
        this.touchStrategy.end(e);
      }
      this.eventParams = null;
    }
    (_a3 = this.detachNodeEvents) === null || _a3 === void 0 ? void 0 : _a3.call(this);
    getSharedEventEmitter().unsubscribe(this.globalListener);
  };
  Draggable2.prototype.setupNodeSubscription = function() {
    var _this = this;
    var _a3;
    var node = this.elementRef.current;
    if (!node)
      return;
    (_a3 = this.detachNodeEvents) === null || _a3 === void 0 ? void 0 : _a3.call(this);
    node.addEventListener("mousedown", this.mouseDownListener);
    node.addEventListener("touchstart", this.touchStartListener, { passive: true });
    this.detachNodeEvents = function() {
      node.removeEventListener("mousedown", _this.mouseDownListener);
      node.removeEventListener("touchstart", _this.touchStartListener);
    };
  };
  Draggable2.prototype.mouseDownListener = function(e) {
    if (this.touchStrategy.isWaiting() || e[draggingHandled])
      return;
    e.preventDefault();
    this.mouseStrategy.start(e);
    e[draggingHandled] = true;
  };
  Draggable2.prototype.touchStartListener = function(e) {
    if (e[draggingHandled])
      return;
    this.touchStrategy.start(e);
    e[draggingHandled] = true;
  };
  Draggable2.prototype.saveEvent = function(e, isMouseEvent) {
    this.eventParams = {
      e,
      isMouseEvent
    };
  };
  Draggable2.prototype.globalListener = function(_a3) {
    var _b2 = __read2(_a3, 2), name = _b2[0], e = _b2[1];
    switch (name) {
      case "mousemove":
        this.saveEvent(e, true);
        this.mouseStrategy.move(e);
        break;
      case "mouseup":
        this.eventParams = null;
        this.mouseStrategy.end(e);
        break;
      case "touchmove": {
        this.saveEvent(e, false);
        this.touchStrategy.move(e);
        break;
      }
      case "touchend":
      case "touchcancel": {
        this.eventParams = null;
        this.touchStrategy.end(e);
        break;
      }
    }
    if (this.mouseStrategy.isDragging() || this.touchStrategy.isDragging()) {
      clear();
    }
  };
  Draggable2.prototype.render = function() {
    var _this = this;
    var _a3 = this.props, children = _a3.children, dragItem = _a3.dragItem;
    return (0, import_react.createElement)(RefHolder, { ref: function(node) {
      _this.elementRef.current = node;
      if (typeof dragItem === "function") {
        dragItem(node);
      } else if (dragItem) {
        dragItem.current = node;
      }
    } }, children);
  };
  return Draggable2;
}(import_react.PureComponent);
var DragDropContext = (0, import_react.createContext)(null);
var DragDropProviderCore = function() {
  function DragDropProviderCore2() {
    this.payload = null;
    this.dragEmitter = new EventEmitter();
  }
  DragDropProviderCore2.prototype.start = function(payload, clientOffset) {
    this.payload = payload;
    this.dragEmitter.emit({ clientOffset, payload: this.payload });
  };
  DragDropProviderCore2.prototype.update = function(clientOffset) {
    this.dragEmitter.emit({ clientOffset, payload: this.payload });
  };
  DragDropProviderCore2.prototype.end = function(clientOffset) {
    this.dragEmitter.emit({ clientOffset, payload: this.payload, end: true });
    this.payload = null;
  };
  return DragDropProviderCore2;
}();
var defaultProps = {
  onChange: function(_a3) {
    var payload = _a3.payload, clientOffset = _a3.clientOffset;
  }
};
var DragDropProvider = function(_super) {
  __extends(DragDropProvider2, _super);
  function DragDropProvider2(props) {
    var _this = _super.call(this, props) || this;
    var onChange = _this.props.onChange;
    _this.dragDropProvider = new DragDropProviderCore();
    _this.dragDropProvider.dragEmitter.subscribe(function(_a3) {
      var payload = _a3.payload, clientOffset = _a3.clientOffset, end = _a3.end;
      onChange({
        payload: end ? null : payload,
        clientOffset: end ? null : clientOffset
      });
    });
    return _this;
  }
  DragDropProvider2.prototype.shouldComponentUpdate = function(nextProps) {
    var children = this.props.children;
    return nextProps.children !== children;
  };
  DragDropProvider2.prototype.render = function() {
    var children = this.props.children;
    return (0, import_react.createElement)(DragDropContext.Provider, { value: this.dragDropProvider }, children);
  };
  DragDropProvider2.defaultProps = defaultProps;
  return DragDropProvider2;
}(import_react.Component);
var defaultProps$1 = {
  onStart: function(_a3) {
    var clientOffset = _a3.clientOffset;
  },
  onUpdate: function(_a3) {
    var clientOffset = _a3.clientOffset;
  },
  onEnd: function(_a3) {
    var clientOffset = _a3.clientOffset;
  }
};
var DragSource = (0, import_react.forwardRef)(function(_a3, ref) {
  var onStart = _a3.onStart, onUpdate = _a3.onUpdate, onEnd = _a3.onEnd, payload = _a3.payload, children = _a3.children;
  var context = (0, import_react.useContext)(DragDropContext);
  var dragDropProvider = context;
  return (0, import_react.createElement)(Draggable, { onStart: function(_a4) {
    var x2 = _a4.x, y2 = _a4.y;
    dragDropProvider === null || dragDropProvider === void 0 ? void 0 : dragDropProvider.start(payload, { x: x2, y: y2 });
    onStart === null || onStart === void 0 ? void 0 : onStart({ clientOffset: { x: x2, y: y2 } });
  }, onUpdate: function(_a4) {
    var x2 = _a4.x, y2 = _a4.y;
    dragDropProvider === null || dragDropProvider === void 0 ? void 0 : dragDropProvider.update({ x: x2, y: y2 });
    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate({ clientOffset: { x: x2, y: y2 } });
  }, onEnd: function(_a4) {
    var x2 = _a4.x, y2 = _a4.y;
    dragDropProvider === null || dragDropProvider === void 0 ? void 0 : dragDropProvider.end({ x: x2, y: y2 });
    onEnd === null || onEnd === void 0 ? void 0 : onEnd({ clientOffset: { x: x2, y: y2 } });
  }, dragItem: ref }, children);
});
DragSource.defaultProps = defaultProps$1;
var clamp$1 = function(value, min4, max4) {
  return Math.max(Math.min(value, max4), min4);
};
var defaultProps$2 = {
  onEnter: function(args) {
  },
  onOver: function(args) {
  },
  onLeave: function(args) {
  },
  onDrop: function(args) {
  }
};
var DropTarget = function(_super) {
  __extends(DropTarget2, _super);
  function DropTarget2(props) {
    var _this = _super.call(this, props) || this;
    _this.isOver = false;
    _this.handleDrag = _this.handleDrag.bind(_this);
    _this.elementRef = (0, import_react.createRef)();
    return _this;
  }
  DropTarget2.prototype.componentDidMount = function() {
    var dragEmitter = this.context.dragEmitter;
    dragEmitter.subscribe(this.handleDrag);
  };
  DropTarget2.prototype.shouldComponentUpdate = function(nextProps) {
    var children = this.props.children;
    return nextProps.children !== children;
  };
  DropTarget2.prototype.componentWillUnmount = function() {
    var dragEmitter = this.context.dragEmitter;
    dragEmitter.unsubscribe(this.handleDrag);
  };
  DropTarget2.prototype.handleDrag = function(_a3) {
    var payload = _a3.payload, clientOffset = _a3.clientOffset, end = _a3.end;
    var _b2 = this.elementRef.current.getBoundingClientRect(), left = _b2.left, top = _b2.top, right = _b2.right, bottom = _b2.bottom;
    var _c = this.props, onDrop = _c.onDrop, onEnter = _c.onEnter, onLeave = _c.onLeave, onOver = _c.onOver;
    var isOver = clientOffset && clamp$1(clientOffset.x, left, right) === clientOffset.x && clamp$1(clientOffset.y, top, bottom) === clientOffset.y;
    if (!this.isOver && isOver)
      onEnter({ payload, clientOffset });
    if (this.isOver && isOver)
      onOver({ payload, clientOffset });
    if (this.isOver && !isOver)
      onLeave({ payload, clientOffset });
    if (isOver && end)
      onDrop({ payload, clientOffset });
    this.isOver = isOver && !end;
  };
  DropTarget2.prototype.render = function() {
    var children = this.props.children;
    return (0, import_react.createElement)(RefHolder, { ref: this.elementRef }, import_react.Children.only(children));
  };
  DropTarget2.defaultProps = defaultProps$2;
  return DropTarget2;
}(import_react.Component);
DropTarget.contextType = DragDropContext;
var SCROLL_OFFSET = 2;
var styles = {
  root: {
    position: "relative"
  },
  triggersRoot: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    overflow: "hidden",
    zIndex: -1,
    visibility: "hidden",
    opacity: 0
  },
  expandTrigger: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    overflow: "auto"
  },
  contractTrigger: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    overflow: "auto",
    minHeight: "1px",
    minWidth: "1px"
  },
  contractNotifier: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "200%",
    height: "200%",
    minHeight: "2px",
    minWidth: "2px"
  }
};
var Sizer = function(_super) {
  __extends(Sizer2, _super);
  function Sizer2(props) {
    var _this = _super.call(this, props) || this;
    _this.getSize = function() {
      return {
        height: _this.rootNode.clientHeight,
        width: _this.rootNode.clientWidth
      };
    };
    _this.setupListeners = _this.setupListeners.bind(_this);
    _this.updateScrolling = _this.updateScrolling.bind(_this);
    _this.rootRef = (0, import_react.createRef)();
    return _this;
  }
  Sizer2.prototype.componentDidMount = function() {
    this.rootNode = this.rootRef.current;
    this.createListeners();
    this.expandTrigger.addEventListener("scroll", this.setupListeners);
    this.contractTrigger.addEventListener("scroll", this.setupListeners);
    this.setupListeners();
  };
  Sizer2.prototype.shouldComponentUpdate = function(prevProps) {
    if (prevProps.scrollTop !== this.props.scrollTop || prevProps.scrollLeft !== this.props.scrollLeft || prevProps.style && this.props.style && !shallowEqual(prevProps.style, this.props.style) || prevProps.style && !this.props.style || prevProps.children !== this.props.children) {
      return true;
    }
    return false;
  };
  Sizer2.prototype.componentDidUpdate = function() {
    var _a3 = this.props, scrollTop = _a3.scrollTop, scrollLeft = _a3.scrollLeft;
    if (scrollTop !== void 0 && scrollTop > -1) {
      this.rootNode.scrollTop = scrollTop;
    }
    if (scrollLeft !== void 0 && scrollLeft > -1) {
      this.rootNode.scrollLeft = scrollLeft;
    }
    this.updateScrolling(this.getSize());
  };
  Sizer2.prototype.componentWillUnmount = function() {
    this.expandTrigger.removeEventListener("scroll", this.setupListeners);
    this.contractTrigger.removeEventListener("scroll", this.setupListeners);
  };
  Sizer2.prototype.setupListeners = function() {
    var size = this.getSize();
    var width = size.width, height = size.height;
    this.expandNotifier.style.width = "".concat(width + SCROLL_OFFSET, "px");
    this.expandNotifier.style.height = "".concat(height + SCROLL_OFFSET, "px");
    this.updateScrolling(size);
    var onSizeChange = this.props.onSizeChange;
    onSizeChange(size);
  };
  Sizer2.prototype.createListeners = function() {
    this.triggersRoot = document.createElement("div");
    Object.assign(this.triggersRoot.style, styles.triggersRoot);
    this.rootNode.appendChild(this.triggersRoot);
    this.expandTrigger = document.createElement("div");
    Object.assign(this.expandTrigger.style, styles.expandTrigger);
    this.expandTrigger.addEventListener("scroll", this.setupListeners);
    this.triggersRoot.appendChild(this.expandTrigger);
    this.expandNotifier = document.createElement("div");
    this.expandTrigger.appendChild(this.expandNotifier);
    this.contractTrigger = document.createElement("div");
    Object.assign(this.contractTrigger.style, styles.contractTrigger);
    this.contractTrigger.addEventListener("scroll", this.setupListeners);
    this.triggersRoot.appendChild(this.contractTrigger);
    this.contractNotifier = document.createElement("div");
    Object.assign(this.contractNotifier.style, styles.contractNotifier);
    this.contractTrigger.appendChild(this.contractNotifier);
  };
  Sizer2.prototype.updateScrolling = function(size) {
    var width = size.width, height = size.height;
    this.contractTrigger.scrollTop = height;
    this.contractTrigger.scrollLeft = width;
    this.expandTrigger.scrollTop = SCROLL_OFFSET;
    this.expandTrigger.scrollLeft = SCROLL_OFFSET;
  };
  Sizer2.prototype.render = function() {
    var _a3 = this.props, onSizeChange = _a3.onSizeChange, Container = _a3.containerComponent, style = _a3.style, scrollTop = _a3.scrollTop, scrollLeft = _a3.scrollLeft, restProps = __rest(_a3, ["onSizeChange", "containerComponent", "style", "scrollTop", "scrollLeft"]);
    return (0, import_react.createElement)(
      Container,
      __assign({ forwardedRef: this.rootRef, style: style ? __assign(__assign({}, styles.root), style) : styles.root }, restProps)
    );
  };
  Sizer2.defaultProps = {
    containerComponent: "div"
  };
  return Sizer2;
}(import_react.Component);
var createStateHelper = function(component, controlledStateProperties) {
  if (controlledStateProperties === void 0) {
    controlledStateProperties = {};
  }
  var notifyStateChange = function(nextState, state) {
    Object.keys(controlledStateProperties).forEach(function(propertyName) {
      var changeEvent = controlledStateProperties[propertyName]();
      if (changeEvent && nextState[propertyName] !== state[propertyName]) {
        changeEvent(nextState[propertyName]);
      }
    });
  };
  var lastStateUpdater;
  var initialState = null;
  var lastInitialState = null;
  var newState = null;
  var shouldNotify = false;
  var applyReducer = function(reduce3, payload, callback) {
    var stateUpdater = function(prevState) {
      if (initialState === null) {
        initialState = prevState;
      }
      var stateChange = reduce3(__assign({}, prevState), payload);
      var state = __assign(__assign({}, prevState), stateChange);
      if (typeof callback === "function") {
        callback(state, prevState);
      }
      if (stateUpdater === lastStateUpdater) {
        if (lastInitialState !== initialState) {
          newState = state;
          if (!shouldNotify) {
            lastInitialState = initialState;
            shouldNotify = true;
          }
        }
        initialState = null;
      }
      return stateChange;
    };
    lastStateUpdater = stateUpdater;
    component.setState(stateUpdater, function() {
      if (shouldNotify) {
        notifyStateChange(newState, lastInitialState);
        shouldNotify = false;
      }
    });
  };
  var applyFieldReducer = function(field, reduce3, payload) {
    applyReducer(function(state) {
      var _a3;
      return _a3 = {}, _a3[field] = reduce3(state[field], payload), _a3;
    });
  };
  return {
    applyReducer,
    applyFieldReducer
  };
};
var makeBoundComponent = function(Target, components, exposed) {
  var Component2 = function(_super) {
    __extends(Component3, _super);
    function Component3() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    Component3.prototype.render = function() {
      return (0, import_react.createElement)(Target, __assign({}, components, this.props));
    };
    return Component3;
  }(import_react.PureComponent);
  Component2.components = Target.components;
  Object.assign(Component2, exposed);
  return Component2;
};
var withComponents = function(components) {
  return function(Target) {
    var props = {};
    var exposed = {};
    var targetComponents = Target.components;
    Object.entries(targetComponents).forEach(function(_a3) {
      var _b2 = __read2(_a3, 2), fieldName = _b2[0], componentName = _b2[1];
      var component = components[componentName];
      if (component && component !== Target[componentName]) {
        props[fieldName] = component;
      }
      exposed[componentName] = component || Target[componentName];
    });
    return Object.keys(props).length > 0 ? makeBoundComponent(Target, props, exposed) : Target;
  };
};
var RefType = import_prop_types.default.shape({
  current: import_prop_types.default.instanceOf(typeof Element !== "undefined" ? Element : Object)
});

// node_modules/@devexpress/dx-chart-core/node_modules/d3-array/src/ascending.js
function ascending_default(a2, b) {
  return a2 < b ? -1 : a2 > b ? 1 : a2 >= b ? 0 : NaN;
}

// node_modules/@devexpress/dx-chart-core/node_modules/d3-array/src/bisector.js
function bisector_default(f) {
  let delta = f;
  let compare2 = f;
  if (f.length === 1) {
    delta = (d, x2) => f(d) - x2;
    compare2 = ascendingComparator(f);
  }
  function left(a2, x2, lo, hi) {
    if (lo == null)
      lo = 0;
    if (hi == null)
      hi = a2.length;
    while (lo < hi) {
      const mid = lo + hi >>> 1;
      if (compare2(a2[mid], x2) < 0)
        lo = mid + 1;
      else
        hi = mid;
    }
    return lo;
  }
  function right(a2, x2, lo, hi) {
    if (lo == null)
      lo = 0;
    if (hi == null)
      hi = a2.length;
    while (lo < hi) {
      const mid = lo + hi >>> 1;
      if (compare2(a2[mid], x2) > 0)
        hi = mid;
      else
        lo = mid + 1;
    }
    return lo;
  }
  function center(a2, x2, lo, hi) {
    if (lo == null)
      lo = 0;
    if (hi == null)
      hi = a2.length;
    const i = left(a2, x2, lo, hi - 1);
    return i > lo && delta(a2[i - 1], x2) > -delta(a2[i], x2) ? i - 1 : i;
  }
  return { left, center, right };
}
function ascendingComparator(f) {
  return (d, x2) => ascending_default(f(d), x2);
}

// node_modules/@devexpress/dx-chart-core/node_modules/d3-array/src/number.js
function number_default2(x2) {
  return x2 === null ? NaN : +x2;
}

// node_modules/@devexpress/dx-chart-core/node_modules/d3-array/src/bisect.js
var ascendingBisect = bisector_default(ascending_default);
var bisectRight = ascendingBisect.right;
var bisectLeft = ascendingBisect.left;
var bisectCenter = bisector_default(number_default2).center;

// node_modules/@devexpress/dx-chart-core/node_modules/d3-array/src/extent.js
function extent_default(values, valueof) {
  let min4;
  let max4;
  if (valueof === void 0) {
    for (const value of values) {
      if (value != null) {
        if (min4 === void 0) {
          if (value >= value)
            min4 = max4 = value;
        } else {
          if (min4 > value)
            min4 = value;
          if (max4 < value)
            max4 = value;
        }
      }
    }
  } else {
    let index3 = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index3, values)) != null) {
        if (min4 === void 0) {
          if (value >= value)
            min4 = max4 = value;
        } else {
          if (min4 > value)
            min4 = value;
          if (max4 < value)
            max4 = value;
        }
      }
    }
  }
  return [min4, max4];
}

// node_modules/internmap/src/index.js
var InternMap = class extends Map {
  constructor(entries, key = keyof) {
    super();
    Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: key } });
    if (entries != null)
      for (const [key2, value] of entries)
        this.set(key2, value);
  }
  get(key) {
    return super.get(intern_get(this, key));
  }
  has(key) {
    return super.has(intern_get(this, key));
  }
  set(key, value) {
    return super.set(intern_set(this, key), value);
  }
  delete(key) {
    return super.delete(intern_delete(this, key));
  }
};
function intern_get({ _intern, _key }, value) {
  const key = _key(value);
  return _intern.has(key) ? _intern.get(key) : value;
}
function intern_set({ _intern, _key }, value) {
  const key = _key(value);
  if (_intern.has(key))
    return _intern.get(key);
  _intern.set(key, value);
  return value;
}
function intern_delete({ _intern, _key }, value) {
  const key = _key(value);
  if (_intern.has(key)) {
    value = _intern.get(value);
    _intern.delete(key);
  }
  return value;
}
function keyof(value) {
  return value !== null && typeof value === "object" ? value.valueOf() : value;
}

// node_modules/@devexpress/dx-chart-core/node_modules/d3-array/src/array.js
var array = Array.prototype;
var slice = array.slice;
var map = array.map;

// node_modules/@devexpress/dx-chart-core/node_modules/d3-array/src/ticks.js
var e10 = Math.sqrt(50);
var e5 = Math.sqrt(10);
var e2 = Math.sqrt(2);

// node_modules/@devexpress/dx-chart-core/node_modules/d3-array/src/shuffle.js
var shuffle_default = shuffler(Math.random);
function shuffler(random) {
  return function shuffle(array3, i0 = 0, i1 = array3.length) {
    let m = i1 - (i0 = +i0);
    while (m) {
      const i = random() * m-- | 0, t = array3[m + i0];
      array3[m + i0] = array3[i + i0];
      array3[i + i0] = t;
    }
    return array3;
  };
}

// node_modules/d3-scale/node_modules/d3-array/src/ascending.js
function ascending(a2, b) {
  return a2 == null || b == null ? NaN : a2 < b ? -1 : a2 > b ? 1 : a2 >= b ? 0 : NaN;
}

// node_modules/d3-scale/node_modules/d3-array/src/descending.js
function descending(a2, b) {
  return a2 == null || b == null ? NaN : b < a2 ? -1 : b > a2 ? 1 : b >= a2 ? 0 : NaN;
}

// node_modules/d3-scale/node_modules/d3-array/src/bisector.js
function bisector(f) {
  let compare1, compare2, delta;
  if (f.length !== 2) {
    compare1 = ascending;
    compare2 = (d, x2) => ascending(f(d), x2);
    delta = (d, x2) => f(d) - x2;
  } else {
    compare1 = f === ascending || f === descending ? f : zero;
    compare2 = f;
    delta = f;
  }
  function left(a2, x2, lo = 0, hi = a2.length) {
    if (lo < hi) {
      if (compare1(x2, x2) !== 0)
        return hi;
      do {
        const mid = lo + hi >>> 1;
        if (compare2(a2[mid], x2) < 0)
          lo = mid + 1;
        else
          hi = mid;
      } while (lo < hi);
    }
    return lo;
  }
  function right(a2, x2, lo = 0, hi = a2.length) {
    if (lo < hi) {
      if (compare1(x2, x2) !== 0)
        return hi;
      do {
        const mid = lo + hi >>> 1;
        if (compare2(a2[mid], x2) <= 0)
          lo = mid + 1;
        else
          hi = mid;
      } while (lo < hi);
    }
    return lo;
  }
  function center(a2, x2, lo = 0, hi = a2.length) {
    const i = left(a2, x2, lo, hi - 1);
    return i > lo && delta(a2[i - 1], x2) > -delta(a2[i], x2) ? i - 1 : i;
  }
  return { left, center, right };
}
function zero() {
  return 0;
}

// node_modules/d3-scale/node_modules/d3-array/src/number.js
function number(x2) {
  return x2 === null ? NaN : +x2;
}

// node_modules/d3-scale/node_modules/d3-array/src/bisect.js
var ascendingBisect2 = bisector(ascending);
var bisectRight2 = ascendingBisect2.right;
var bisectLeft2 = ascendingBisect2.left;
var bisectCenter2 = bisector(number).center;
var bisect_default2 = bisectRight2;

// node_modules/d3-scale/node_modules/d3-array/src/blur.js
var blur2 = Blur2(blurf);
var blurImage = Blur2(blurfImage);
function Blur2(blur3) {
  return function(data, rx, ry = rx) {
    if (!((rx = +rx) >= 0))
      throw new RangeError("invalid rx");
    if (!((ry = +ry) >= 0))
      throw new RangeError("invalid ry");
    let { data: values, width, height } = data;
    if (!((width = Math.floor(width)) >= 0))
      throw new RangeError("invalid width");
    if (!((height = Math.floor(height !== void 0 ? height : values.length / width)) >= 0))
      throw new RangeError("invalid height");
    if (!width || !height || !rx && !ry)
      return data;
    const blurx = rx && blur3(rx);
    const blury = ry && blur3(ry);
    const temp = values.slice();
    if (blurx && blury) {
      blurh(blurx, temp, values, width, height);
      blurh(blurx, values, temp, width, height);
      blurh(blurx, temp, values, width, height);
      blurv(blury, values, temp, width, height);
      blurv(blury, temp, values, width, height);
      blurv(blury, values, temp, width, height);
    } else if (blurx) {
      blurh(blurx, values, temp, width, height);
      blurh(blurx, temp, values, width, height);
      blurh(blurx, values, temp, width, height);
    } else if (blury) {
      blurv(blury, values, temp, width, height);
      blurv(blury, temp, values, width, height);
      blurv(blury, values, temp, width, height);
    }
    return data;
  };
}
function blurh(blur3, T, S, w, h) {
  for (let y2 = 0, n = w * h; y2 < n; ) {
    blur3(T, S, y2, y2 += w, 1);
  }
}
function blurv(blur3, T, S, w, h) {
  for (let x2 = 0, n = w * h; x2 < w; ++x2) {
    blur3(T, S, x2, x2 + n, w);
  }
}
function blurfImage(radius) {
  const blur3 = blurf(radius);
  return (T, S, start, stop, step) => {
    start <<= 2, stop <<= 2, step <<= 2;
    blur3(T, S, start + 0, stop + 0, step);
    blur3(T, S, start + 1, stop + 1, step);
    blur3(T, S, start + 2, stop + 2, step);
    blur3(T, S, start + 3, stop + 3, step);
  };
}
function blurf(radius) {
  const radius0 = Math.floor(radius);
  if (radius0 === radius)
    return bluri(radius);
  const t = radius - radius0;
  const w = 2 * radius + 1;
  return (T, S, start, stop, step) => {
    if (!((stop -= step) >= start))
      return;
    let sum4 = radius0 * S[start];
    const s0 = step * radius0;
    const s1 = s0 + step;
    for (let i = start, j = start + s0; i < j; i += step) {
      sum4 += S[Math.min(stop, i)];
    }
    for (let i = start, j = stop; i <= j; i += step) {
      sum4 += S[Math.min(stop, i + s0)];
      T[i] = (sum4 + t * (S[Math.max(start, i - s1)] + S[Math.min(stop, i + s1)])) / w;
      sum4 -= S[Math.max(start, i - s0)];
    }
  };
}
function bluri(radius) {
  const w = 2 * radius + 1;
  return (T, S, start, stop, step) => {
    if (!((stop -= step) >= start))
      return;
    let sum4 = radius * S[start];
    const s2 = step * radius;
    for (let i = start, j = start + s2; i < j; i += step) {
      sum4 += S[Math.min(stop, i)];
    }
    for (let i = start, j = stop; i <= j; i += step) {
      sum4 += S[Math.min(stop, i + s2)];
      T[i] = sum4 / w;
      sum4 -= S[Math.max(start, i - s2)];
    }
  };
}

// node_modules/d3-scale/node_modules/d3-array/src/array.js
var array2 = Array.prototype;
var slice2 = array2.slice;
var map3 = array2.map;

// node_modules/d3-scale/node_modules/d3-array/src/ticks.js
var e102 = Math.sqrt(50);
var e52 = Math.sqrt(10);
var e22 = Math.sqrt(2);
function tickSpec(start, stop, count3) {
  const step = (stop - start) / Math.max(0, count3), power = Math.floor(Math.log10(step)), error = step / Math.pow(10, power), factor = error >= e102 ? 10 : error >= e52 ? 5 : error >= e22 ? 2 : 1;
  let i1, i2, inc;
  if (power < 0) {
    inc = Math.pow(10, -power) / factor;
    i1 = Math.round(start * inc);
    i2 = Math.round(stop * inc);
    if (i1 / inc < start)
      ++i1;
    if (i2 / inc > stop)
      --i2;
    inc = -inc;
  } else {
    inc = Math.pow(10, power) * factor;
    i1 = Math.round(start / inc);
    i2 = Math.round(stop / inc);
    if (i1 * inc < start)
      ++i1;
    if (i2 * inc > stop)
      --i2;
  }
  if (i2 < i1 && 0.5 <= count3 && count3 < 2)
    return tickSpec(start, stop, count3 * 2);
  return [i1, i2, inc];
}
function ticks(start, stop, count3) {
  stop = +stop, start = +start, count3 = +count3;
  if (!(count3 > 0))
    return [];
  if (start === stop)
    return [start];
  const reverse3 = stop < start, [i1, i2, inc] = reverse3 ? tickSpec(stop, start, count3) : tickSpec(start, stop, count3);
  if (!(i2 >= i1))
    return [];
  const n = i2 - i1 + 1, ticks2 = new Array(n);
  if (reverse3) {
    if (inc < 0)
      for (let i = 0; i < n; ++i)
        ticks2[i] = (i2 - i) / -inc;
    else
      for (let i = 0; i < n; ++i)
        ticks2[i] = (i2 - i) * inc;
  } else {
    if (inc < 0)
      for (let i = 0; i < n; ++i)
        ticks2[i] = (i1 + i) / -inc;
    else
      for (let i = 0; i < n; ++i)
        ticks2[i] = (i1 + i) * inc;
  }
  return ticks2;
}
function tickIncrement2(start, stop, count3) {
  stop = +stop, start = +start, count3 = +count3;
  return tickSpec(start, stop, count3)[2];
}
function tickStep2(start, stop, count3) {
  stop = +stop, start = +start, count3 = +count3;
  const reverse3 = stop < start, inc = reverse3 ? tickIncrement2(stop, start, count3) : tickIncrement2(start, stop, count3);
  return (reverse3 ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
}

// node_modules/d3-scale/node_modules/d3-array/src/range.js
function range(start, stop, step) {
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;
  var i = -1, n = Math.max(0, Math.ceil((stop - start) / step)) | 0, range2 = new Array(n);
  while (++i < n) {
    range2[i] = start + i * step;
  }
  return range2;
}

// node_modules/d3-scale/node_modules/d3-array/src/shuffle.js
var shuffle_default2 = shuffler2(Math.random);
function shuffler2(random) {
  return function shuffle(array3, i0 = 0, i1 = array3.length) {
    let m = i1 - (i0 = +i0);
    while (m) {
      const i = random() * m-- | 0, t = array3[m + i0];
      array3[m + i0] = array3[i + i0];
      array3[i + i0] = t;
    }
    return array3;
  };
}

// node_modules/d3-scale/src/init.js
function initRange(domain, range2) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(domain);
      break;
    default:
      this.range(range2).domain(domain);
      break;
  }
  return this;
}

// node_modules/d3-scale/src/ordinal.js
var implicit = Symbol("implicit");
function ordinal() {
  var index3 = new InternMap(), domain = [], range2 = [], unknown = implicit;
  function scale(d) {
    let i = index3.get(d);
    if (i === void 0) {
      if (unknown !== implicit)
        return unknown;
      index3.set(d, i = domain.push(d) - 1);
    }
    return range2[i % range2.length];
  }
  scale.domain = function(_) {
    if (!arguments.length)
      return domain.slice();
    domain = [], index3 = new InternMap();
    for (const value of _) {
      if (index3.has(value))
        continue;
      index3.set(value, domain.push(value) - 1);
    }
    return scale;
  };
  scale.range = function(_) {
    return arguments.length ? (range2 = Array.from(_), scale) : range2.slice();
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  scale.copy = function() {
    return ordinal(domain, range2).unknown(unknown);
  };
  initRange.apply(scale, arguments);
  return scale;
}

// node_modules/d3-scale/src/band.js
function band() {
  var scale = ordinal().unknown(void 0), domain = scale.domain, ordinalRange = scale.range, r0 = 0, r1 = 1, step, bandwidth, round = false, paddingInner = 0, paddingOuter = 0, align = 0.5;
  delete scale.unknown;
  function rescale() {
    var n = domain().length, reverse3 = r1 < r0, start = reverse3 ? r1 : r0, stop = reverse3 ? r0 : r1;
    step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
    if (round)
      step = Math.floor(step);
    start += (stop - start - step * (n - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round)
      start = Math.round(start), bandwidth = Math.round(bandwidth);
    var values = range(n).map(function(i) {
      return start + step * i;
    });
    return ordinalRange(reverse3 ? values.reverse() : values);
  }
  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };
  scale.range = function(_) {
    return arguments.length ? ([r0, r1] = _, r0 = +r0, r1 = +r1, rescale()) : [r0, r1];
  };
  scale.rangeRound = function(_) {
    return [r0, r1] = _, r0 = +r0, r1 = +r1, round = true, rescale();
  };
  scale.bandwidth = function() {
    return bandwidth;
  };
  scale.step = function() {
    return step;
  };
  scale.round = function(_) {
    return arguments.length ? (round = !!_, rescale()) : round;
  };
  scale.padding = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
  };
  scale.paddingInner = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
  };
  scale.paddingOuter = function(_) {
    return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
  };
  scale.align = function(_) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
  };
  scale.copy = function() {
    return band(domain(), [r0, r1]).round(round).paddingInner(paddingInner).paddingOuter(paddingOuter).align(align);
  };
  return initRange.apply(rescale(), arguments);
}

// node_modules/d3-scale/src/constant.js
function constants(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3-scale/src/number.js
function number2(x2) {
  return +x2;
}

// node_modules/d3-scale/src/continuous.js
var unit = [0, 1];
function identity2(x2) {
  return x2;
}
function normalize(a2, b) {
  return (b -= a2 = +a2) ? function(x2) {
    return (x2 - a2) / b;
  } : constants(isNaN(b) ? NaN : 0.5);
}
function clamper(a2, b) {
  var t;
  if (a2 > b)
    t = a2, a2 = b, b = t;
  return function(x2) {
    return Math.max(a2, Math.min(b, x2));
  };
}
function bimap(domain, range2, interpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range2[0], r1 = range2[1];
  if (d1 < d0)
    d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
  else
    d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
  return function(x2) {
    return r0(d0(x2));
  };
}
function polymap(domain, range2, interpolate) {
  var j = Math.min(domain.length, range2.length) - 1, d = new Array(j), r = new Array(j), i = -1;
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range2 = range2.slice().reverse();
  }
  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate(range2[i], range2[i + 1]);
  }
  return function(x2) {
    var i2 = bisect_default2(domain, x2, 1, j) - 1;
    return r[i2](d[i2](x2));
  };
}
function copy(source, target) {
  return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
}
function transformer() {
  var domain = unit, range2 = unit, interpolate = value_default, transform, untransform, unknown, clamp2 = identity2, piecewise2, output, input;
  function rescale() {
    var n = Math.min(domain.length, range2.length);
    if (clamp2 !== identity2)
      clamp2 = clamper(domain[0], domain[n - 1]);
    piecewise2 = n > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }
  function scale(x2) {
    return x2 == null || isNaN(x2 = +x2) ? unknown : (output || (output = piecewise2(domain.map(transform), range2, interpolate)))(transform(clamp2(x2)));
  }
  scale.invert = function(y2) {
    return clamp2(untransform((input || (input = piecewise2(range2, domain.map(transform), number_default)))(y2)));
  };
  scale.domain = function(_) {
    return arguments.length ? (domain = Array.from(_, number2), rescale()) : domain.slice();
  };
  scale.range = function(_) {
    return arguments.length ? (range2 = Array.from(_), rescale()) : range2.slice();
  };
  scale.rangeRound = function(_) {
    return range2 = Array.from(_), interpolate = round_default, rescale();
  };
  scale.clamp = function(_) {
    return arguments.length ? (clamp2 = _ ? true : identity2, rescale()) : clamp2 !== identity2;
  };
  scale.interpolate = function(_) {
    return arguments.length ? (interpolate = _, rescale()) : interpolate;
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  return function(t, u) {
    transform = t, untransform = u;
    return rescale();
  };
}
function continuous() {
  return transformer()(identity2, identity2);
}

// node_modules/d3-format/src/formatDecimal.js
function formatDecimal_default(x2) {
  return Math.abs(x2 = Math.round(x2)) >= 1e21 ? x2.toLocaleString("en").replace(/,/g, "") : x2.toString(10);
}
function formatDecimalParts(x2, p) {
  if ((i = (x2 = p ? x2.toExponential(p - 1) : x2.toExponential()).indexOf("e")) < 0)
    return null;
  var i, coefficient = x2.slice(0, i);
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x2.slice(i + 1)
  ];
}

// node_modules/d3-format/src/exponent.js
function exponent_default(x2) {
  return x2 = formatDecimalParts(Math.abs(x2)), x2 ? x2[1] : NaN;
}

// node_modules/d3-format/src/formatGroup.js
function formatGroup_default(grouping, thousands) {
  return function(value, width) {
    var i = value.length, t = [], j = 0, g = grouping[0], length = 0;
    while (i > 0 && g > 0) {
      if (length + g + 1 > width)
        g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width)
        break;
      g = grouping[j = (j + 1) % grouping.length];
    }
    return t.reverse().join(thousands);
  };
}

// node_modules/d3-format/src/formatNumerals.js
function formatNumerals_default(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

// node_modules/d3-format/src/formatSpecifier.js
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier)))
    throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}
formatSpecifier.prototype = FormatSpecifier.prototype;
function FormatSpecifier(specifier) {
  this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
  this.align = specifier.align === void 0 ? ">" : specifier.align + "";
  this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === void 0 ? void 0 : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === void 0 ? "" : specifier.type + "";
}
FormatSpecifier.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};

// node_modules/d3-format/src/formatTrim.js
function formatTrim_default(s2) {
  out:
    for (var n = s2.length, i = 1, i0 = -1, i1; i < n; ++i) {
      switch (s2[i]) {
        case ".":
          i0 = i1 = i;
          break;
        case "0":
          if (i0 === 0)
            i0 = i;
          i1 = i;
          break;
        default:
          if (!+s2[i])
            break out;
          if (i0 > 0)
            i0 = 0;
          break;
      }
    }
  return i0 > 0 ? s2.slice(0, i0) + s2.slice(i1 + 1) : s2;
}

// node_modules/d3-format/src/formatPrefixAuto.js
var prefixExponent;
function formatPrefixAuto_default(x2, p) {
  var d = formatDecimalParts(x2, p);
  if (!d)
    return x2 + "";
  var coefficient = d[0], exponent = d[1], i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n = coefficient.length;
  return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x2, Math.max(0, p + i - 1))[0];
}

// node_modules/d3-format/src/formatRounded.js
function formatRounded_default(x2, p) {
  var d = formatDecimalParts(x2, p);
  if (!d)
    return x2 + "";
  var coefficient = d[0], exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

// node_modules/d3-format/src/formatTypes.js
var formatTypes_default = {
  "%": function(x2, p) {
    return (x2 * 100).toFixed(p);
  },
  "b": function(x2) {
    return Math.round(x2).toString(2);
  },
  "c": function(x2) {
    return x2 + "";
  },
  "d": formatDecimal_default,
  "e": function(x2, p) {
    return x2.toExponential(p);
  },
  "f": function(x2, p) {
    return x2.toFixed(p);
  },
  "g": function(x2, p) {
    return x2.toPrecision(p);
  },
  "o": function(x2) {
    return Math.round(x2).toString(8);
  },
  "p": function(x2, p) {
    return formatRounded_default(x2 * 100, p);
  },
  "r": formatRounded_default,
  "s": formatPrefixAuto_default,
  "X": function(x2) {
    return Math.round(x2).toString(16).toUpperCase();
  },
  "x": function(x2) {
    return Math.round(x2).toString(16);
  }
};

// node_modules/d3-format/src/identity.js
function identity_default2(x2) {
  return x2;
}

// node_modules/d3-format/src/locale.js
var map5 = Array.prototype.map;
var prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function locale_default(locale3) {
  var group3 = locale3.grouping === void 0 || locale3.thousands === void 0 ? identity_default2 : formatGroup_default(map5.call(locale3.grouping, Number), locale3.thousands + ""), currencyPrefix = locale3.currency === void 0 ? "" : locale3.currency[0] + "", currencySuffix = locale3.currency === void 0 ? "" : locale3.currency[1] + "", decimal = locale3.decimal === void 0 ? "." : locale3.decimal + "", numerals = locale3.numerals === void 0 ? identity_default2 : formatNumerals_default(map5.call(locale3.numerals, String)), percent = locale3.percent === void 0 ? "%" : locale3.percent + "", minus = locale3.minus === void 0 ? "-" : locale3.minus + "", nan = locale3.nan === void 0 ? "NaN" : locale3.nan + "";
  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);
    var fill = specifier.fill, align = specifier.align, sign2 = specifier.sign, symbol = specifier.symbol, zero2 = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
    if (type === "n")
      comma = true, type = "g";
    else if (!formatTypes_default[type])
      precision === void 0 && (precision = 12), trim = true, type = "g";
    if (zero2 || fill === "0" && align === "=")
      zero2 = true, fill = "0", align = "=";
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";
    var formatType = formatTypes_default[type], maybeSuffix = /[defgprs%]/.test(type);
    precision = precision === void 0 ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format2(value) {
      var valuePrefix = prefix, valueSuffix = suffix, i, n, c;
      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;
        var valueNegative = value < 0 || 1 / value < 0;
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
        if (trim)
          value = formatTrim_default(value);
        if (valueNegative && +value === 0 && sign2 !== "+")
          valueNegative = false;
        valuePrefix = (valueNegative ? sign2 === "(" ? sign2 : minus : sign2 === "-" || sign2 === "(" ? "" : sign2) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign2 === "(" ? ")" : "");
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }
      if (comma && !zero2)
        value = group3(value, Infinity);
      var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
      if (comma && zero2)
        value = group3(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;
        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;
        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;
        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }
      return numerals(value);
    }
    format2.toString = function() {
      return specifier + "";
    };
    return format2;
  }
  function formatPrefix2(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3, k2 = Math.pow(10, -e), prefix = prefixes[8 + e / 3];
    return function(value2) {
      return f(k2 * value2) + prefix;
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix2
  };
}

// node_modules/d3-format/src/defaultLocale.js
var locale;
var format;
var formatPrefix;
defaultLocale({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""],
  minus: "-"
});
function defaultLocale(definition) {
  locale = locale_default(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}

// node_modules/d3-format/src/precisionFixed.js
function precisionFixed_default(step) {
  return Math.max(0, -exponent_default(Math.abs(step)));
}

// node_modules/d3-format/src/precisionPrefix.js
function precisionPrefix_default(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3 - exponent_default(Math.abs(step)));
}

// node_modules/d3-format/src/precisionRound.js
function precisionRound_default(step, max4) {
  step = Math.abs(step), max4 = Math.abs(max4) - step;
  return Math.max(0, exponent_default(max4) - exponent_default(step)) + 1;
}

// node_modules/d3-scale/src/tickFormat.js
function tickFormat(start, stop, count3, specifier) {
  var step = tickStep2(start, stop, count3), precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix_default(step, value)))
        specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound_default(step, Math.max(Math.abs(start), Math.abs(stop)))))
        specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed_default(step)))
        specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}

// node_modules/d3-scale/src/linear.js
function linearish(scale) {
  var domain = scale.domain;
  scale.ticks = function(count3) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], count3 == null ? 10 : count3);
  };
  scale.tickFormat = function(count3, specifier) {
    var d = domain();
    return tickFormat(d[0], d[d.length - 1], count3 == null ? 10 : count3, specifier);
  };
  scale.nice = function(count3) {
    if (count3 == null)
      count3 = 10;
    var d = domain();
    var i0 = 0;
    var i1 = d.length - 1;
    var start = d[i0];
    var stop = d[i1];
    var prestep;
    var step;
    var maxIter = 10;
    if (stop < start) {
      step = start, start = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }
    while (maxIter-- > 0) {
      step = tickIncrement2(start, stop, count3);
      if (step === prestep) {
        d[i0] = start;
        d[i1] = stop;
        return domain(d);
      } else if (step > 0) {
        start = Math.floor(start / step) * step;
        stop = Math.ceil(stop / step) * step;
      } else if (step < 0) {
        start = Math.ceil(start * step) / step;
        stop = Math.floor(stop * step) / step;
      } else {
        break;
      }
      prestep = step;
    }
    return scale;
  };
  return scale;
}
function linear() {
  var scale = continuous();
  scale.copy = function() {
    return copy(scale, linear());
  };
  initRange.apply(scale, arguments);
  return linearish(scale);
}

// node_modules/d3-scale/node_modules/d3-time/src/interval.js
var t0 = /* @__PURE__ */ new Date();
var t1 = /* @__PURE__ */ new Date();
function timeInterval(floori, offseti, count3, field) {
  function interval(date) {
    return floori(date = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+date)), date;
  }
  interval.floor = (date) => {
    return floori(date = /* @__PURE__ */ new Date(+date)), date;
  };
  interval.ceil = (date) => {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };
  interval.round = (date) => {
    const d0 = interval(date), d1 = interval.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };
  interval.offset = (date, step) => {
    return offseti(date = /* @__PURE__ */ new Date(+date), step == null ? 1 : Math.floor(step)), date;
  };
  interval.range = (start, stop, step) => {
    const range2 = [];
    start = interval.ceil(start);
    step = step == null ? 1 : Math.floor(step);
    if (!(start < stop) || !(step > 0))
      return range2;
    let previous;
    do
      range2.push(previous = /* @__PURE__ */ new Date(+start)), offseti(start, step), floori(start);
    while (previous < start && start < stop);
    return range2;
  };
  interval.filter = (test) => {
    return timeInterval((date) => {
      if (date >= date)
        while (floori(date), !test(date))
          date.setTime(date - 1);
    }, (date, step) => {
      if (date >= date) {
        if (step < 0)
          while (++step <= 0) {
            while (offseti(date, -1), !test(date)) {
            }
          }
        else
          while (--step >= 0) {
            while (offseti(date, 1), !test(date)) {
            }
          }
      }
    });
  };
  if (count3) {
    interval.count = (start, end) => {
      t0.setTime(+start), t1.setTime(+end);
      floori(t0), floori(t1);
      return Math.floor(count3(t0, t1));
    };
    interval.every = (step) => {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval : interval.filter(field ? (d) => field(d) % step === 0 : (d) => interval.count(0, d) % step === 0);
    };
  }
  return interval;
}

// node_modules/d3-scale/node_modules/d3-time/src/millisecond.js
var millisecond = timeInterval(() => {
}, (date, step) => {
  date.setTime(+date + step);
}, (start, end) => {
  return end - start;
});
millisecond.every = (k2) => {
  k2 = Math.floor(k2);
  if (!isFinite(k2) || !(k2 > 0))
    return null;
  if (!(k2 > 1))
    return millisecond;
  return timeInterval((date) => {
    date.setTime(Math.floor(date / k2) * k2);
  }, (date, step) => {
    date.setTime(+date + step * k2);
  }, (start, end) => {
    return (end - start) / k2;
  });
};
var milliseconds = millisecond.range;

// node_modules/d3-scale/node_modules/d3-time/src/duration.js
var durationSecond = 1e3;
var durationMinute = durationSecond * 60;
var durationHour = durationMinute * 60;
var durationDay = durationHour * 24;
var durationWeek = durationDay * 7;
var durationMonth = durationDay * 30;
var durationYear = durationDay * 365;

// node_modules/d3-scale/node_modules/d3-time/src/second.js
var second = timeInterval((date) => {
  date.setTime(date - date.getMilliseconds());
}, (date, step) => {
  date.setTime(+date + step * durationSecond);
}, (start, end) => {
  return (end - start) / durationSecond;
}, (date) => {
  return date.getUTCSeconds();
});
var seconds = second.range;

// node_modules/d3-scale/node_modules/d3-time/src/minute.js
var timeMinute = timeInterval((date) => {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond);
}, (date, step) => {
  date.setTime(+date + step * durationMinute);
}, (start, end) => {
  return (end - start) / durationMinute;
}, (date) => {
  return date.getMinutes();
});
var timeMinutes = timeMinute.range;
var utcMinute = timeInterval((date) => {
  date.setUTCSeconds(0, 0);
}, (date, step) => {
  date.setTime(+date + step * durationMinute);
}, (start, end) => {
  return (end - start) / durationMinute;
}, (date) => {
  return date.getUTCMinutes();
});
var utcMinutes = utcMinute.range;

// node_modules/d3-scale/node_modules/d3-time/src/hour.js
var timeHour = timeInterval((date) => {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond - date.getMinutes() * durationMinute);
}, (date, step) => {
  date.setTime(+date + step * durationHour);
}, (start, end) => {
  return (end - start) / durationHour;
}, (date) => {
  return date.getHours();
});
var timeHours = timeHour.range;
var utcHour = timeInterval((date) => {
  date.setUTCMinutes(0, 0, 0);
}, (date, step) => {
  date.setTime(+date + step * durationHour);
}, (start, end) => {
  return (end - start) / durationHour;
}, (date) => {
  return date.getUTCHours();
});
var utcHours = utcHour.range;

// node_modules/d3-scale/node_modules/d3-time/src/day.js
var timeDay = timeInterval(
  (date) => date.setHours(0, 0, 0, 0),
  (date, step) => date.setDate(date.getDate() + step),
  (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay,
  (date) => date.getDate() - 1
);
var timeDays = timeDay.range;
var utcDay = timeInterval((date) => {
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCDate(date.getUTCDate() + step);
}, (start, end) => {
  return (end - start) / durationDay;
}, (date) => {
  return date.getUTCDate() - 1;
});
var utcDays = utcDay.range;
var unixDay = timeInterval((date) => {
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCDate(date.getUTCDate() + step);
}, (start, end) => {
  return (end - start) / durationDay;
}, (date) => {
  return Math.floor(date / durationDay);
});
var unixDays = unixDay.range;

// node_modules/d3-scale/node_modules/d3-time/src/week.js
function timeWeekday(i) {
  return timeInterval((date) => {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setDate(date.getDate() + step * 7);
  }, (start, end) => {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}
var timeSunday = timeWeekday(0);
var timeMonday = timeWeekday(1);
var timeTuesday = timeWeekday(2);
var timeWednesday = timeWeekday(3);
var timeThursday = timeWeekday(4);
var timeFriday = timeWeekday(5);
var timeSaturday = timeWeekday(6);
var timeSundays = timeSunday.range;
var timeMondays = timeMonday.range;
var timeTuesdays = timeTuesday.range;
var timeWednesdays = timeWednesday.range;
var timeThursdays = timeThursday.range;
var timeFridays = timeFriday.range;
var timeSaturdays = timeSaturday.range;
function utcWeekday(i) {
  return timeInterval((date) => {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, (start, end) => {
    return (end - start) / durationWeek;
  });
}
var utcSunday = utcWeekday(0);
var utcMonday = utcWeekday(1);
var utcTuesday = utcWeekday(2);
var utcWednesday = utcWeekday(3);
var utcThursday = utcWeekday(4);
var utcFriday = utcWeekday(5);
var utcSaturday = utcWeekday(6);
var utcSundays = utcSunday.range;
var utcMondays = utcMonday.range;
var utcTuesdays = utcTuesday.range;
var utcWednesdays = utcWednesday.range;
var utcThursdays = utcThursday.range;
var utcFridays = utcFriday.range;
var utcSaturdays = utcSaturday.range;

// node_modules/d3-scale/node_modules/d3-time/src/month.js
var timeMonth = timeInterval((date) => {
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
}, (date, step) => {
  date.setMonth(date.getMonth() + step);
}, (start, end) => {
  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, (date) => {
  return date.getMonth();
});
var timeMonths = timeMonth.range;
var utcMonth = timeInterval((date) => {
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCMonth(date.getUTCMonth() + step);
}, (start, end) => {
  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, (date) => {
  return date.getUTCMonth();
});
var utcMonths = utcMonth.range;

// node_modules/d3-scale/node_modules/d3-time/src/year.js
var timeYear = timeInterval((date) => {
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
}, (date, step) => {
  date.setFullYear(date.getFullYear() + step);
}, (start, end) => {
  return end.getFullYear() - start.getFullYear();
}, (date) => {
  return date.getFullYear();
});
timeYear.every = (k2) => {
  return !isFinite(k2 = Math.floor(k2)) || !(k2 > 0) ? null : timeInterval((date) => {
    date.setFullYear(Math.floor(date.getFullYear() / k2) * k2);
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setFullYear(date.getFullYear() + step * k2);
  });
};
var timeYears = timeYear.range;
var utcYear = timeInterval((date) => {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCFullYear(date.getUTCFullYear() + step);
}, (start, end) => {
  return end.getUTCFullYear() - start.getUTCFullYear();
}, (date) => {
  return date.getUTCFullYear();
});
utcYear.every = (k2) => {
  return !isFinite(k2 = Math.floor(k2)) || !(k2 > 0) ? null : timeInterval((date) => {
    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k2) * k2);
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setUTCFullYear(date.getUTCFullYear() + step * k2);
  });
};
var utcYears = utcYear.range;

// node_modules/d3-scale/node_modules/d3-time/src/ticks.js
function ticker(year2, month2, week, day2, hour2, minute2) {
  const tickIntervals = [
    [second, 1, durationSecond],
    [second, 5, 5 * durationSecond],
    [second, 15, 15 * durationSecond],
    [second, 30, 30 * durationSecond],
    [minute2, 1, durationMinute],
    [minute2, 5, 5 * durationMinute],
    [minute2, 15, 15 * durationMinute],
    [minute2, 30, 30 * durationMinute],
    [hour2, 1, durationHour],
    [hour2, 3, 3 * durationHour],
    [hour2, 6, 6 * durationHour],
    [hour2, 12, 12 * durationHour],
    [day2, 1, durationDay],
    [day2, 2, 2 * durationDay],
    [week, 1, durationWeek],
    [month2, 1, durationMonth],
    [month2, 3, 3 * durationMonth],
    [year2, 1, durationYear]
  ];
  function ticks2(start, stop, count3) {
    const reverse3 = stop < start;
    if (reverse3)
      [start, stop] = [stop, start];
    const interval = count3 && typeof count3.range === "function" ? count3 : tickInterval(start, stop, count3);
    const ticks3 = interval ? interval.range(start, +stop + 1) : [];
    return reverse3 ? ticks3.reverse() : ticks3;
  }
  function tickInterval(start, stop, count3) {
    const target = Math.abs(stop - start) / count3;
    const i = bisector(([, , step2]) => step2).right(tickIntervals, target);
    if (i === tickIntervals.length)
      return year2.every(tickStep2(start / durationYear, stop / durationYear, count3));
    if (i === 0)
      return millisecond.every(Math.max(tickStep2(start, stop, count3), 1));
    const [t, step] = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
    return t.every(step);
  }
  return [ticks2, tickInterval];
}
var [utcTicks, utcTickInterval] = ticker(utcYear, utcMonth, utcSunday, unixDay, utcHour, utcMinute);
var [timeTicks, timeTickInterval] = ticker(timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute);

// node_modules/d3-time/src/interval.js
var t02 = /* @__PURE__ */ new Date();
var t12 = /* @__PURE__ */ new Date();
function newInterval(floori, offseti, count3, field) {
  function interval(date) {
    return floori(date = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+date)), date;
  }
  interval.floor = function(date) {
    return floori(date = /* @__PURE__ */ new Date(+date)), date;
  };
  interval.ceil = function(date) {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };
  interval.round = function(date) {
    var d0 = interval(date), d1 = interval.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };
  interval.offset = function(date, step) {
    return offseti(date = /* @__PURE__ */ new Date(+date), step == null ? 1 : Math.floor(step)), date;
  };
  interval.range = function(start, stop, step) {
    var range2 = [], previous;
    start = interval.ceil(start);
    step = step == null ? 1 : Math.floor(step);
    if (!(start < stop) || !(step > 0))
      return range2;
    do
      range2.push(previous = /* @__PURE__ */ new Date(+start)), offseti(start, step), floori(start);
    while (previous < start && start < stop);
    return range2;
  };
  interval.filter = function(test) {
    return newInterval(function(date) {
      if (date >= date)
        while (floori(date), !test(date))
          date.setTime(date - 1);
    }, function(date, step) {
      if (date >= date) {
        if (step < 0)
          while (++step <= 0) {
            while (offseti(date, -1), !test(date)) {
            }
          }
        else
          while (--step >= 0) {
            while (offseti(date, 1), !test(date)) {
            }
          }
      }
    });
  };
  if (count3) {
    interval.count = function(start, end) {
      t02.setTime(+start), t12.setTime(+end);
      floori(t02), floori(t12);
      return Math.floor(count3(t02, t12));
    };
    interval.every = function(step) {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval : interval.filter(field ? function(d) {
        return field(d) % step === 0;
      } : function(d) {
        return interval.count(0, d) % step === 0;
      });
    };
  }
  return interval;
}

// node_modules/d3-time/src/millisecond.js
var millisecond2 = newInterval(function() {
}, function(date, step) {
  date.setTime(+date + step);
}, function(start, end) {
  return end - start;
});
millisecond2.every = function(k2) {
  k2 = Math.floor(k2);
  if (!isFinite(k2) || !(k2 > 0))
    return null;
  if (!(k2 > 1))
    return millisecond2;
  return newInterval(function(date) {
    date.setTime(Math.floor(date / k2) * k2);
  }, function(date, step) {
    date.setTime(+date + step * k2);
  }, function(start, end) {
    return (end - start) / k2;
  });
};
var milliseconds2 = millisecond2.range;

// node_modules/d3-time/src/duration.js
var durationSecond2 = 1e3;
var durationMinute2 = 6e4;
var durationHour2 = 36e5;
var durationDay2 = 864e5;
var durationWeek2 = 6048e5;

// node_modules/d3-time/src/second.js
var second2 = newInterval(function(date) {
  date.setTime(date - date.getMilliseconds());
}, function(date, step) {
  date.setTime(+date + step * durationSecond2);
}, function(start, end) {
  return (end - start) / durationSecond2;
}, function(date) {
  return date.getUTCSeconds();
});
var seconds2 = second2.range;

// node_modules/d3-time/src/minute.js
var minute = newInterval(function(date) {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond2);
}, function(date, step) {
  date.setTime(+date + step * durationMinute2);
}, function(start, end) {
  return (end - start) / durationMinute2;
}, function(date) {
  return date.getMinutes();
});
var minutes = minute.range;

// node_modules/d3-time/src/hour.js
var hour = newInterval(function(date) {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond2 - date.getMinutes() * durationMinute2);
}, function(date, step) {
  date.setTime(+date + step * durationHour2);
}, function(start, end) {
  return (end - start) / durationHour2;
}, function(date) {
  return date.getHours();
});
var hours = hour.range;

// node_modules/d3-time/src/day.js
var day = newInterval(function(date) {
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setDate(date.getDate() + step);
}, function(start, end) {
  return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute2) / durationDay2;
}, function(date) {
  return date.getDate() - 1;
});
var day_default = day;
var days = day.range;

// node_modules/d3-time/src/week.js
function weekday(i) {
  return newInterval(function(date) {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setDate(date.getDate() + step * 7);
  }, function(start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute2) / durationWeek2;
  });
}
var sunday = weekday(0);
var monday = weekday(1);
var tuesday = weekday(2);
var wednesday = weekday(3);
var thursday = weekday(4);
var friday = weekday(5);
var saturday = weekday(6);
var sundays = sunday.range;
var mondays = monday.range;
var tuesdays = tuesday.range;
var wednesdays = wednesday.range;
var thursdays = thursday.range;
var fridays = friday.range;
var saturdays = saturday.range;

// node_modules/d3-time/src/month.js
var month = newInterval(function(date) {
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setMonth(date.getMonth() + step);
}, function(start, end) {
  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, function(date) {
  return date.getMonth();
});
var months = month.range;

// node_modules/d3-time/src/year.js
var year = newInterval(function(date) {
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setFullYear(date.getFullYear() + step);
}, function(start, end) {
  return end.getFullYear() - start.getFullYear();
}, function(date) {
  return date.getFullYear();
});
year.every = function(k2) {
  return !isFinite(k2 = Math.floor(k2)) || !(k2 > 0) ? null : newInterval(function(date) {
    date.setFullYear(Math.floor(date.getFullYear() / k2) * k2);
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setFullYear(date.getFullYear() + step * k2);
  });
};
var year_default = year;
var years = year.range;

// node_modules/d3-time/src/utcMinute.js
var utcMinute2 = newInterval(function(date) {
  date.setUTCSeconds(0, 0);
}, function(date, step) {
  date.setTime(+date + step * durationMinute2);
}, function(start, end) {
  return (end - start) / durationMinute2;
}, function(date) {
  return date.getUTCMinutes();
});
var utcMinutes2 = utcMinute2.range;

// node_modules/d3-time/src/utcHour.js
var utcHour2 = newInterval(function(date) {
  date.setUTCMinutes(0, 0, 0);
}, function(date, step) {
  date.setTime(+date + step * durationHour2);
}, function(start, end) {
  return (end - start) / durationHour2;
}, function(date) {
  return date.getUTCHours();
});
var utcHours2 = utcHour2.range;

// node_modules/d3-time/src/utcDay.js
var utcDay2 = newInterval(function(date) {
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCDate(date.getUTCDate() + step);
}, function(start, end) {
  return (end - start) / durationDay2;
}, function(date) {
  return date.getUTCDate() - 1;
});
var utcDay_default = utcDay2;
var utcDays2 = utcDay2.range;

// node_modules/d3-time/src/utcWeek.js
function utcWeekday2(i) {
  return newInterval(function(date) {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, function(start, end) {
    return (end - start) / durationWeek2;
  });
}
var utcSunday2 = utcWeekday2(0);
var utcMonday2 = utcWeekday2(1);
var utcTuesday2 = utcWeekday2(2);
var utcWednesday2 = utcWeekday2(3);
var utcThursday2 = utcWeekday2(4);
var utcFriday2 = utcWeekday2(5);
var utcSaturday2 = utcWeekday2(6);
var utcSundays2 = utcSunday2.range;
var utcMondays2 = utcMonday2.range;
var utcTuesdays2 = utcTuesday2.range;
var utcWednesdays2 = utcWednesday2.range;
var utcThursdays2 = utcThursday2.range;
var utcFridays2 = utcFriday2.range;
var utcSaturdays2 = utcSaturday2.range;

// node_modules/d3-time/src/utcMonth.js
var utcMonth2 = newInterval(function(date) {
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCMonth(date.getUTCMonth() + step);
}, function(start, end) {
  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, function(date) {
  return date.getUTCMonth();
});
var utcMonths2 = utcMonth2.range;

// node_modules/d3-time/src/utcYear.js
var utcYear2 = newInterval(function(date) {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCFullYear(date.getUTCFullYear() + step);
}, function(start, end) {
  return end.getUTCFullYear() - start.getUTCFullYear();
}, function(date) {
  return date.getUTCFullYear();
});
utcYear2.every = function(k2) {
  return !isFinite(k2 = Math.floor(k2)) || !(k2 > 0) ? null : newInterval(function(date) {
    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k2) * k2);
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step * k2);
  });
};
var utcYear_default = utcYear2;
var utcYears2 = utcYear2.range;

// node_modules/d3-time-format/src/locale.js
function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date.setFullYear(d.y);
    return date;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}
function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date.setUTCFullYear(d.y);
    return date;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}
function newDate(y2, m, d) {
  return { y: y2, m, d, H: 0, M: 0, S: 0, L: 0 };
}
function formatLocale(locale3) {
  var locale_dateTime = locale3.dateTime, locale_date = locale3.date, locale_time = locale3.time, locale_periods = locale3.periods, locale_weekdays = locale3.days, locale_shortWeekdays = locale3.shortDays, locale_months = locale3.months, locale_shortMonths = locale3.shortMonths;
  var periodRe = formatRe(locale_periods), periodLookup = formatLookup(locale_periods), weekdayRe = formatRe(locale_weekdays), weekdayLookup = formatLookup(locale_weekdays), shortWeekdayRe = formatRe(locale_shortWeekdays), shortWeekdayLookup = formatLookup(locale_shortWeekdays), monthRe = formatRe(locale_months), monthLookup = formatLookup(locale_months), shortMonthRe = formatRe(locale_shortMonths), shortMonthLookup = formatLookup(locale_shortMonths);
  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "g": formatYearISO,
    "G": formatFullYearISO,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "q": formatQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };
  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "g": formatUTCYearISO,
    "G": formatUTCFullYearISO,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "q": formatUTCQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };
  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "g": parseYear,
    "G": parseFullYear,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "q": parseQuarter,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);
  function newFormat(specifier, formats2) {
    return function(date) {
      var string = [], i = -1, j = 0, n = specifier.length, c, pad2, format2;
      if (!(date instanceof Date))
        date = /* @__PURE__ */ new Date(+date);
      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad2 = pads[c = specifier.charAt(++i)]) != null)
            c = specifier.charAt(++i);
          else
            pad2 = c === "e" ? " " : "0";
          if (format2 = formats2[c])
            c = format2(date, pad2);
          string.push(c);
          j = i + 1;
        }
      }
      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }
  function newParse(specifier, Z) {
    return function(string) {
      var d = newDate(1900, void 0, 1), i = parseSpecifier(d, specifier, string += "", 0), week, day2;
      if (i != string.length)
        return null;
      if ("Q" in d)
        return new Date(d.Q);
      if ("s" in d)
        return new Date(d.s * 1e3 + ("L" in d ? d.L : 0));
      if (Z && !("Z" in d))
        d.Z = 0;
      if ("p" in d)
        d.H = d.H % 12 + d.p * 12;
      if (d.m === void 0)
        d.m = "q" in d ? d.q : 0;
      if ("V" in d) {
        if (d.V < 1 || d.V > 53)
          return null;
        if (!("w" in d))
          d.w = 1;
        if ("Z" in d) {
          week = utcDate(newDate(d.y, 0, 1)), day2 = week.getUTCDay();
          week = day2 > 4 || day2 === 0 ? utcMonday2.ceil(week) : utcMonday2(week);
          week = utcDay_default.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = localDate(newDate(d.y, 0, 1)), day2 = week.getDay();
          week = day2 > 4 || day2 === 0 ? monday.ceil(week) : monday(week);
          week = day_default.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d))
          d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day2 = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day2 + 5) % 7 : d.w + d.U * 7 - (day2 + 6) % 7;
      }
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }
      return localDate(d);
    };
  }
  function parseSpecifier(d, specifier, string, j) {
    var i = 0, n = specifier.length, m = string.length, c, parse;
    while (i < n) {
      if (j >= m)
        return -1;
      c = specifier.charCodeAt(i++);
      if (c === 37) {
        c = specifier.charAt(i++);
        parse = parses[c in pads ? specifier.charAt(i++) : c];
        if (!parse || (j = parse(d, string, j)) < 0)
          return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }
    return j;
  }
  function parsePeriod(d, string, i) {
    var n = periodRe.exec(string.slice(i));
    return n ? (d.p = periodLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }
  function parseShortWeekday(d, string, i) {
    var n = shortWeekdayRe.exec(string.slice(i));
    return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }
  function parseWeekday(d, string, i) {
    var n = weekdayRe.exec(string.slice(i));
    return n ? (d.w = weekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }
  function parseShortMonth(d, string, i) {
    var n = shortMonthRe.exec(string.slice(i));
    return n ? (d.m = shortMonthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }
  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }
  function parseLocaleDateTime(d, string, i) {
    return parseSpecifier(d, locale_dateTime, string, i);
  }
  function parseLocaleDate(d, string, i) {
    return parseSpecifier(d, locale_date, string, i);
  }
  function parseLocaleTime(d, string, i) {
    return parseSpecifier(d, locale_time, string, i);
  }
  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }
  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }
  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }
  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }
  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }
  function formatQuarter(d) {
    return 1 + ~~(d.getMonth() / 3);
  }
  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }
  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }
  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }
  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }
  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }
  function formatUTCQuarter(d) {
    return 1 + ~~(d.getUTCMonth() / 3);
  }
  return {
    format: function(specifier) {
      var f = newFormat(specifier += "", formats);
      f.toString = function() {
        return specifier;
      };
      return f;
    },
    parse: function(specifier) {
      var p = newParse(specifier += "", false);
      p.toString = function() {
        return specifier;
      };
      return p;
    },
    utcFormat: function(specifier) {
      var f = newFormat(specifier += "", utcFormats);
      f.toString = function() {
        return specifier;
      };
      return f;
    },
    utcParse: function(specifier) {
      var p = newParse(specifier += "", true);
      p.toString = function() {
        return specifier;
      };
      return p;
    }
  };
}
var pads = { "-": "", "_": " ", "0": "0" };
var numberRe = /^\s*\d+/;
var percentRe = /^%/;
var requoteRe = /[\\^$*+?|[\]().{}]/g;
function pad(value, fill, width) {
  var sign2 = value < 0 ? "-" : "", string = (sign2 ? -value : value) + "", length = string.length;
  return sign2 + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}
function requote(s2) {
  return s2.replace(requoteRe, "\\$&");
}
function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}
function formatLookup(names) {
  var map6 = {}, i = -1, n = names.length;
  while (++i < n)
    map6[names[i].toLowerCase()] = i;
  return map6;
}
function parseWeekdayNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}
function parseWeekdayNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.u = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberISO(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.V = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}
function parseFullYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}
function parseYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), i + n[0].length) : -1;
}
function parseZone(d, string, i) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}
function parseQuarter(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
}
function parseMonthNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}
function parseDayOfMonth(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}
function parseDayOfYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}
function parseHour24(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}
function parseMinutes(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}
function parseSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}
function parseMilliseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}
function parseMicroseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 6));
  return n ? (d.L = Math.floor(n[0] / 1e3), i + n[0].length) : -1;
}
function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}
function parseUnixTimestamp(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = +n[0], i + n[0].length) : -1;
}
function parseUnixTimestampSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.s = +n[0], i + n[0].length) : -1;
}
function formatDayOfMonth(d, p) {
  return pad(d.getDate(), p, 2);
}
function formatHour24(d, p) {
  return pad(d.getHours(), p, 2);
}
function formatHour12(d, p) {
  return pad(d.getHours() % 12 || 12, p, 2);
}
function formatDayOfYear(d, p) {
  return pad(1 + day_default.count(year_default(d), d), p, 3);
}
function formatMilliseconds(d, p) {
  return pad(d.getMilliseconds(), p, 3);
}
function formatMicroseconds(d, p) {
  return formatMilliseconds(d, p) + "000";
}
function formatMonthNumber(d, p) {
  return pad(d.getMonth() + 1, p, 2);
}
function formatMinutes(d, p) {
  return pad(d.getMinutes(), p, 2);
}
function formatSeconds(d, p) {
  return pad(d.getSeconds(), p, 2);
}
function formatWeekdayNumberMonday(d) {
  var day2 = d.getDay();
  return day2 === 0 ? 7 : day2;
}
function formatWeekNumberSunday(d, p) {
  return pad(sunday.count(year_default(d) - 1, d), p, 2);
}
function dISO(d) {
  var day2 = d.getDay();
  return day2 >= 4 || day2 === 0 ? thursday(d) : thursday.ceil(d);
}
function formatWeekNumberISO(d, p) {
  d = dISO(d);
  return pad(thursday.count(year_default(d), d) + (year_default(d).getDay() === 4), p, 2);
}
function formatWeekdayNumberSunday(d) {
  return d.getDay();
}
function formatWeekNumberMonday(d, p) {
  return pad(monday.count(year_default(d) - 1, d), p, 2);
}
function formatYear(d, p) {
  return pad(d.getFullYear() % 100, p, 2);
}
function formatYearISO(d, p) {
  d = dISO(d);
  return pad(d.getFullYear() % 100, p, 2);
}
function formatFullYear(d, p) {
  return pad(d.getFullYear() % 1e4, p, 4);
}
function formatFullYearISO(d, p) {
  var day2 = d.getDay();
  d = day2 >= 4 || day2 === 0 ? thursday(d) : thursday.ceil(d);
  return pad(d.getFullYear() % 1e4, p, 4);
}
function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+")) + pad(z / 60 | 0, "0", 2) + pad(z % 60, "0", 2);
}
function formatUTCDayOfMonth(d, p) {
  return pad(d.getUTCDate(), p, 2);
}
function formatUTCHour24(d, p) {
  return pad(d.getUTCHours(), p, 2);
}
function formatUTCHour12(d, p) {
  return pad(d.getUTCHours() % 12 || 12, p, 2);
}
function formatUTCDayOfYear(d, p) {
  return pad(1 + utcDay_default.count(utcYear_default(d), d), p, 3);
}
function formatUTCMilliseconds(d, p) {
  return pad(d.getUTCMilliseconds(), p, 3);
}
function formatUTCMicroseconds(d, p) {
  return formatUTCMilliseconds(d, p) + "000";
}
function formatUTCMonthNumber(d, p) {
  return pad(d.getUTCMonth() + 1, p, 2);
}
function formatUTCMinutes(d, p) {
  return pad(d.getUTCMinutes(), p, 2);
}
function formatUTCSeconds(d, p) {
  return pad(d.getUTCSeconds(), p, 2);
}
function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}
function formatUTCWeekNumberSunday(d, p) {
  return pad(utcSunday2.count(utcYear_default(d) - 1, d), p, 2);
}
function UTCdISO(d) {
  var day2 = d.getUTCDay();
  return day2 >= 4 || day2 === 0 ? utcThursday2(d) : utcThursday2.ceil(d);
}
function formatUTCWeekNumberISO(d, p) {
  d = UTCdISO(d);
  return pad(utcThursday2.count(utcYear_default(d), d) + (utcYear_default(d).getUTCDay() === 4), p, 2);
}
function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}
function formatUTCWeekNumberMonday(d, p) {
  return pad(utcMonday2.count(utcYear_default(d) - 1, d), p, 2);
}
function formatUTCYear(d, p) {
  return pad(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCYearISO(d, p) {
  d = UTCdISO(d);
  return pad(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCFullYear(d, p) {
  return pad(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCFullYearISO(d, p) {
  var day2 = d.getUTCDay();
  d = day2 >= 4 || day2 === 0 ? utcThursday2(d) : utcThursday2.ceil(d);
  return pad(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCZone() {
  return "+0000";
}
function formatLiteralPercent() {
  return "%";
}
function formatUnixTimestamp(d) {
  return +d;
}
function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1e3);
}

// node_modules/d3-time-format/src/defaultLocale.js
var locale2;
var timeFormat;
var timeParse;
var utcFormat;
var utcParse;
defaultLocale2({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function defaultLocale2(definition) {
  locale2 = formatLocale(definition);
  timeFormat = locale2.format;
  timeParse = locale2.parse;
  utcFormat = locale2.utcFormat;
  utcParse = locale2.utcParse;
  return locale2;
}

// node_modules/d3-time-format/src/isoFormat.js
var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";
function formatIsoNative(date) {
  return date.toISOString();
}
var formatIso = Date.prototype.toISOString ? formatIsoNative : utcFormat(isoSpecifier);

// node_modules/d3-time-format/src/isoParse.js
function parseIsoNative(string) {
  var date = new Date(string);
  return isNaN(date) ? null : date;
}
var parseIso = +/* @__PURE__ */ new Date("2000-01-01T00:00:00.000Z") ? parseIsoNative : utcParse(isoSpecifier);

// node_modules/d3-path/src/path.js
var pi = Math.PI;
var tau = 2 * pi;
var epsilon = 1e-6;
var tauEpsilon = tau - epsilon;
function Path() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null;
  this._ = "";
}
function path() {
  return new Path();
}
Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function(x2, y2) {
    this._ += "M" + (this._x0 = this._x1 = +x2) + "," + (this._y0 = this._y1 = +y2);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x2, y2) {
    this._ += "L" + (this._x1 = +x2) + "," + (this._y1 = +y2);
  },
  quadraticCurveTo: function(x1, y1, x2, y2) {
    this._ += "Q" + +x1 + "," + +y1 + "," + (this._x1 = +x2) + "," + (this._y1 = +y2);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x3, y3) {
    this._ += "C" + +x1 + "," + +y1 + "," + +x2 + "," + +y2 + "," + (this._x1 = +x3) + "," + (this._y1 = +y3);
  },
  arcTo: function(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1, y0 = this._y1, x21 = x2 - x1, y21 = y2 - y1, x01 = x0 - x1, y01 = y0 - y1, l01_2 = x01 * x01 + y01 * y01;
    if (r < 0)
      throw new Error("negative radius: " + r);
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    } else if (!(l01_2 > epsilon))
      ;
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    } else {
      var x20 = x2 - x0, y20 = y2 - y0, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l / l01, t21 = l / l21;
      if (Math.abs(t01 - 1) > epsilon) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }
      this._ += "A" + r + "," + r + ",0,0," + +(y01 * x20 > x01 * y20) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x2, y2, r, a0, a1, ccw) {
    x2 = +x2, y2 = +y2, r = +r, ccw = !!ccw;
    var dx = r * Math.cos(a0), dy = r * Math.sin(a0), x0 = x2 + dx, y0 = y2 + dy, cw = 1 ^ ccw, da = ccw ? a0 - a1 : a1 - a0;
    if (r < 0)
      throw new Error("negative radius: " + r);
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    } else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._ += "L" + x0 + "," + y0;
    }
    if (!r)
      return;
    if (da < 0)
      da = da % tau + tau;
    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x2 - dx) + "," + (y2 - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    } else if (da > epsilon) {
      this._ += "A" + r + "," + r + ",0," + +(da >= pi) + "," + cw + "," + (this._x1 = x2 + r * Math.cos(a1)) + "," + (this._y1 = y2 + r * Math.sin(a1));
    }
  },
  rect: function(x2, y2, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x2) + "," + (this._y0 = this._y1 = +y2) + "h" + +w + "v" + +h + "h" + -w + "Z";
  },
  toString: function() {
    return this._;
  }
};
var path_default = path;

// node_modules/d3-shape/src/constant.js
function constant_default2(x2) {
  return function constant2() {
    return x2;
  };
}

// node_modules/d3-shape/src/math.js
var abs = Math.abs;
var atan2 = Math.atan2;
var cos = Math.cos;
var max3 = Math.max;
var min3 = Math.min;
var sin = Math.sin;
var sqrt2 = Math.sqrt;
var epsilon2 = 1e-12;
var pi2 = Math.PI;
var halfPi = pi2 / 2;
var tau2 = 2 * pi2;
function acos(x2) {
  return x2 > 1 ? 0 : x2 < -1 ? pi2 : Math.acos(x2);
}
function asin(x2) {
  return x2 >= 1 ? halfPi : x2 <= -1 ? -halfPi : Math.asin(x2);
}

// node_modules/d3-shape/src/arc.js
function arcInnerRadius(d) {
  return d.innerRadius;
}
function arcOuterRadius(d) {
  return d.outerRadius;
}
function arcStartAngle(d) {
  return d.startAngle;
}
function arcEndAngle(d) {
  return d.endAngle;
}
function arcPadAngle(d) {
  return d && d.padAngle;
}
function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
  var x10 = x1 - x0, y10 = y1 - y0, x32 = x3 - x2, y32 = y3 - y2, t = y32 * x10 - x32 * y10;
  if (t * t < epsilon2)
    return;
  t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / t;
  return [x0 + t * x10, y0 + t * y10];
}
function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
  var x01 = x0 - x1, y01 = y0 - y1, lo = (cw ? rc : -rc) / sqrt2(x01 * x01 + y01 * y01), ox = lo * y01, oy = -lo * x01, x11 = x0 + ox, y11 = y0 + oy, x10 = x1 + ox, y10 = y1 + oy, x00 = (x11 + x10) / 2, y00 = (y11 + y10) / 2, dx = x10 - x11, dy = y10 - y11, d2 = dx * dx + dy * dy, r = r1 - rc, D = x11 * y10 - x10 * y11, d = (dy < 0 ? -1 : 1) * sqrt2(max3(0, r * r * d2 - D * D)), cx0 = (D * dy - dx * d) / d2, cy0 = (-D * dx - dy * d) / d2, cx1 = (D * dy + dx * d) / d2, cy1 = (-D * dx + dy * d) / d2, dx0 = cx0 - x00, dy0 = cy0 - y00, dx1 = cx1 - x00, dy1 = cy1 - y00;
  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1)
    cx0 = cx1, cy0 = cy1;
  return {
    cx: cx0,
    cy: cy0,
    x01: -ox,
    y01: -oy,
    x11: cx0 * (r1 / r - 1),
    y11: cy0 * (r1 / r - 1)
  };
}
function arc_default() {
  var innerRadius = arcInnerRadius, outerRadius = arcOuterRadius, cornerRadius = constant_default2(0), padRadius = null, startAngle = arcStartAngle, endAngle = arcEndAngle, padAngle = arcPadAngle, context = null;
  function arc() {
    var buffer, r, r0 = +innerRadius.apply(this, arguments), r1 = +outerRadius.apply(this, arguments), a0 = startAngle.apply(this, arguments) - halfPi, a1 = endAngle.apply(this, arguments) - halfPi, da = abs(a1 - a0), cw = a1 > a0;
    if (!context)
      context = buffer = path_default();
    if (r1 < r0)
      r = r1, r1 = r0, r0 = r;
    if (!(r1 > epsilon2))
      context.moveTo(0, 0);
    else if (da > tau2 - epsilon2) {
      context.moveTo(r1 * cos(a0), r1 * sin(a0));
      context.arc(0, 0, r1, a0, a1, !cw);
      if (r0 > epsilon2) {
        context.moveTo(r0 * cos(a1), r0 * sin(a1));
        context.arc(0, 0, r0, a1, a0, cw);
      }
    } else {
      var a01 = a0, a11 = a1, a00 = a0, a10 = a1, da0 = da, da1 = da, ap = padAngle.apply(this, arguments) / 2, rp = ap > epsilon2 && (padRadius ? +padRadius.apply(this, arguments) : sqrt2(r0 * r0 + r1 * r1)), rc = min3(abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)), rc0 = rc, rc1 = rc, t03, t13;
      if (rp > epsilon2) {
        var p0 = asin(rp / r0 * sin(ap)), p1 = asin(rp / r1 * sin(ap));
        if ((da0 -= p0 * 2) > epsilon2)
          p0 *= cw ? 1 : -1, a00 += p0, a10 -= p0;
        else
          da0 = 0, a00 = a10 = (a0 + a1) / 2;
        if ((da1 -= p1 * 2) > epsilon2)
          p1 *= cw ? 1 : -1, a01 += p1, a11 -= p1;
        else
          da1 = 0, a01 = a11 = (a0 + a1) / 2;
      }
      var x01 = r1 * cos(a01), y01 = r1 * sin(a01), x10 = r0 * cos(a10), y10 = r0 * sin(a10);
      if (rc > epsilon2) {
        var x11 = r1 * cos(a11), y11 = r1 * sin(a11), x00 = r0 * cos(a00), y00 = r0 * sin(a00), oc;
        if (da < pi2 && (oc = intersect(x01, y01, x00, y00, x11, y11, x10, y10))) {
          var ax = x01 - oc[0], ay = y01 - oc[1], bx = x11 - oc[0], by = y11 - oc[1], kc = 1 / sin(acos((ax * bx + ay * by) / (sqrt2(ax * ax + ay * ay) * sqrt2(bx * bx + by * by))) / 2), lc = sqrt2(oc[0] * oc[0] + oc[1] * oc[1]);
          rc0 = min3(rc, (r0 - lc) / (kc - 1));
          rc1 = min3(rc, (r1 - lc) / (kc + 1));
        }
      }
      if (!(da1 > epsilon2))
        context.moveTo(x01, y01);
      else if (rc1 > epsilon2) {
        t03 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
        t13 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);
        context.moveTo(t03.cx + t03.x01, t03.cy + t03.y01);
        if (rc1 < rc)
          context.arc(t03.cx, t03.cy, rc1, atan2(t03.y01, t03.x01), atan2(t13.y01, t13.x01), !cw);
        else {
          context.arc(t03.cx, t03.cy, rc1, atan2(t03.y01, t03.x01), atan2(t03.y11, t03.x11), !cw);
          context.arc(0, 0, r1, atan2(t03.cy + t03.y11, t03.cx + t03.x11), atan2(t13.cy + t13.y11, t13.cx + t13.x11), !cw);
          context.arc(t13.cx, t13.cy, rc1, atan2(t13.y11, t13.x11), atan2(t13.y01, t13.x01), !cw);
        }
      } else
        context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);
      if (!(r0 > epsilon2) || !(da0 > epsilon2))
        context.lineTo(x10, y10);
      else if (rc0 > epsilon2) {
        t03 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
        t13 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);
        context.lineTo(t03.cx + t03.x01, t03.cy + t03.y01);
        if (rc0 < rc)
          context.arc(t03.cx, t03.cy, rc0, atan2(t03.y01, t03.x01), atan2(t13.y01, t13.x01), !cw);
        else {
          context.arc(t03.cx, t03.cy, rc0, atan2(t03.y01, t03.x01), atan2(t03.y11, t03.x11), !cw);
          context.arc(0, 0, r0, atan2(t03.cy + t03.y11, t03.cx + t03.x11), atan2(t13.cy + t13.y11, t13.cx + t13.x11), cw);
          context.arc(t13.cx, t13.cy, rc0, atan2(t13.y11, t13.x11), atan2(t13.y01, t13.x01), !cw);
        }
      } else
        context.arc(0, 0, r0, a10, a00, cw);
    }
    context.closePath();
    if (buffer)
      return context = null, buffer + "" || null;
  }
  arc.centroid = function() {
    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2, a2 = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi2 / 2;
    return [cos(a2) * r, sin(a2) * r];
  };
  arc.innerRadius = function(_) {
    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant_default2(+_), arc) : innerRadius;
  };
  arc.outerRadius = function(_) {
    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant_default2(+_), arc) : outerRadius;
  };
  arc.cornerRadius = function(_) {
    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant_default2(+_), arc) : cornerRadius;
  };
  arc.padRadius = function(_) {
    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant_default2(+_), arc) : padRadius;
  };
  arc.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant_default2(+_), arc) : startAngle;
  };
  arc.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant_default2(+_), arc) : endAngle;
  };
  arc.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant_default2(+_), arc) : padAngle;
  };
  arc.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, arc) : context;
  };
  return arc;
}

// node_modules/d3-shape/src/curve/linear.js
function Linear(context) {
  this._context = context;
}
Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(x2, y2);
        break;
    }
  }
};
function linear_default(context) {
  return new Linear(context);
}

// node_modules/d3-shape/src/point.js
function x(p) {
  return p[0];
}
function y(p) {
  return p[1];
}

// node_modules/d3-shape/src/line.js
function line_default() {
  var x2 = x, y2 = y, defined = constant_default2(true), context = null, curve = linear_default, output = null;
  function line(data) {
    var i, n = data.length, d, defined0 = false, buffer;
    if (context == null)
      output = curve(buffer = path_default());
    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0)
          output.lineStart();
        else
          output.lineEnd();
      }
      if (defined0)
        output.point(+x2(d, i, data), +y2(d, i, data));
    }
    if (buffer)
      return output = null, buffer + "" || null;
  }
  line.x = function(_) {
    return arguments.length ? (x2 = typeof _ === "function" ? _ : constant_default2(+_), line) : x2;
  };
  line.y = function(_) {
    return arguments.length ? (y2 = typeof _ === "function" ? _ : constant_default2(+_), line) : y2;
  };
  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant_default2(!!_), line) : defined;
  };
  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };
  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };
  return line;
}

// node_modules/d3-shape/src/area.js
function area_default() {
  var x0 = x, x1 = null, y0 = constant_default2(0), y1 = y, defined = constant_default2(true), context = null, curve = linear_default, output = null;
  function area(data) {
    var i, j, k2, n = data.length, d, defined0 = false, buffer, x0z = new Array(n), y0z = new Array(n);
    if (context == null)
      output = curve(buffer = path_default());
    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) {
          j = i;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k2 = i - 1; k2 >= j; --k2) {
            output.point(x0z[k2], y0z[k2]);
          }
          output.lineEnd();
          output.areaEnd();
        }
      }
      if (defined0) {
        x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
      }
    }
    if (buffer)
      return output = null, buffer + "" || null;
  }
  function arealine() {
    return line_default().defined(defined).curve(curve).context(context);
  }
  area.x = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant_default2(+_), x1 = null, area) : x0;
  };
  area.x0 = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant_default2(+_), area) : x0;
  };
  area.x1 = function(_) {
    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant_default2(+_), area) : x1;
  };
  area.y = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant_default2(+_), y1 = null, area) : y0;
  };
  area.y0 = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant_default2(+_), area) : y0;
  };
  area.y1 = function(_) {
    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant_default2(+_), area) : y1;
  };
  area.lineX0 = area.lineY0 = function() {
    return arealine().x(x0).y(y0);
  };
  area.lineY1 = function() {
    return arealine().x(x0).y(y1);
  };
  area.lineX1 = function() {
    return arealine().x(x1).y(y0);
  };
  area.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant_default2(!!_), area) : defined;
  };
  area.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
  };
  area.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
  };
  return area;
}

// node_modules/d3-shape/src/descending.js
function descending_default2(a2, b) {
  return b < a2 ? -1 : b > a2 ? 1 : b >= a2 ? 0 : NaN;
}

// node_modules/d3-shape/src/identity.js
function identity_default3(d) {
  return d;
}

// node_modules/d3-shape/src/pie.js
function pie_default() {
  var value = identity_default3, sortValues = descending_default2, sort3 = null, startAngle = constant_default2(0), endAngle = constant_default2(tau2), padAngle = constant_default2(0);
  function pie(data) {
    var i, n = data.length, j, k2, sum4 = 0, index3 = new Array(n), arcs = new Array(n), a0 = +startAngle.apply(this, arguments), da = Math.min(tau2, Math.max(-tau2, endAngle.apply(this, arguments) - a0)), a1, p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)), pa = p * (da < 0 ? -1 : 1), v;
    for (i = 0; i < n; ++i) {
      if ((v = arcs[index3[i] = i] = +value(data[i], i, data)) > 0) {
        sum4 += v;
      }
    }
    if (sortValues != null)
      index3.sort(function(i2, j2) {
        return sortValues(arcs[i2], arcs[j2]);
      });
    else if (sort3 != null)
      index3.sort(function(i2, j2) {
        return sort3(data[i2], data[j2]);
      });
    for (i = 0, k2 = sum4 ? (da - n * pa) / sum4 : 0; i < n; ++i, a0 = a1) {
      j = index3[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k2 : 0) + pa, arcs[j] = {
        data: data[j],
        index: i,
        value: v,
        startAngle: a0,
        endAngle: a1,
        padAngle: p
      };
    }
    return arcs;
  }
  pie.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant_default2(+_), pie) : value;
  };
  pie.sortValues = function(_) {
    return arguments.length ? (sortValues = _, sort3 = null, pie) : sortValues;
  };
  pie.sort = function(_) {
    return arguments.length ? (sort3 = _, sortValues = null, pie) : sort3;
  };
  pie.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant_default2(+_), pie) : startAngle;
  };
  pie.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant_default2(+_), pie) : endAngle;
  };
  pie.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant_default2(+_), pie) : padAngle;
  };
  return pie;
}

// node_modules/d3-shape/src/curve/radial.js
var curveRadialLinear = curveRadial(linear_default);
function Radial(curve) {
  this._curve = curve;
}
Radial.prototype = {
  areaStart: function() {
    this._curve.areaStart();
  },
  areaEnd: function() {
    this._curve.areaEnd();
  },
  lineStart: function() {
    this._curve.lineStart();
  },
  lineEnd: function() {
    this._curve.lineEnd();
  },
  point: function(a2, r) {
    this._curve.point(r * Math.sin(a2), r * -Math.cos(a2));
  }
};
function curveRadial(curve) {
  function radial2(context) {
    return new Radial(curve(context));
  }
  radial2._curve = curve;
  return radial2;
}

// node_modules/d3-shape/src/array.js
var slice3 = Array.prototype.slice;

// node_modules/d3-shape/src/symbol/circle.js
var circle_default = {
  draw: function(context, size) {
    var r = Math.sqrt(size / pi2);
    context.moveTo(r, 0);
    context.arc(0, 0, r, 0, tau2);
  }
};

// node_modules/d3-shape/src/symbol/diamond.js
var tan30 = Math.sqrt(1 / 3);
var tan30_2 = tan30 * 2;

// node_modules/d3-shape/src/symbol/star.js
var kr = Math.sin(pi2 / 10) / Math.sin(7 * pi2 / 10);
var kx = Math.sin(tau2 / 10) * kr;
var ky = -Math.cos(tau2 / 10) * kr;

// node_modules/d3-shape/src/symbol/triangle.js
var sqrt3 = Math.sqrt(3);

// node_modules/d3-shape/src/symbol/wye.js
var s = Math.sqrt(3) / 2;
var k = 1 / Math.sqrt(12);
var a = (k / 2 + 1) * 3;

// node_modules/d3-shape/src/symbol.js
function symbol_default() {
  var type = constant_default2(circle_default), size = constant_default2(64), context = null;
  function symbol() {
    var buffer;
    if (!context)
      context = buffer = path_default();
    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
    if (buffer)
      return context = null, buffer + "" || null;
  }
  symbol.type = function(_) {
    return arguments.length ? (type = typeof _ === "function" ? _ : constant_default2(_), symbol) : type;
  };
  symbol.size = function(_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : constant_default2(+_), symbol) : size;
  };
  symbol.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
  };
  return symbol;
}

// node_modules/d3-shape/src/noop.js
function noop_default() {
}

// node_modules/d3-shape/src/curve/basis.js
function point2(that, x2, y2) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x2) / 6,
    (that._y0 + 4 * that._y1 + y2) / 6
  );
}
function Basis(context) {
  this._context = context;
}
Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        point2(this, this._x1, this._y1);
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      default:
        point2(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
  }
};

// node_modules/d3-shape/src/curve/basisClosed.js
function BasisClosed(context) {
  this._context = context;
}
BasisClosed.prototype = {
  areaStart: noop_default,
  areaEnd: noop_default,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2);
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x2 = x2, this._y2 = y2;
        break;
      case 1:
        this._point = 2;
        this._x3 = x2, this._y3 = y2;
        break;
      case 2:
        this._point = 3;
        this._x4 = x2, this._y4 = y2;
        this._context.moveTo((this._x0 + 4 * this._x1 + x2) / 6, (this._y0 + 4 * this._y1 + y2) / 6);
        break;
      default:
        point2(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
  }
};

// node_modules/d3-shape/src/curve/basisOpen.js
function BasisOpen(context) {
  this._context = context;
}
BasisOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var x0 = (this._x0 + 4 * this._x1 + x2) / 6, y0 = (this._y0 + 4 * this._y1 + y2) / 6;
        this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0);
        break;
      case 3:
        this._point = 4;
      default:
        point2(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
  }
};

// node_modules/d3-shape/src/curve/bundle.js
function Bundle(context, beta) {
  this._basis = new Basis(context);
  this._beta = beta;
}
Bundle.prototype = {
  lineStart: function() {
    this._x = [];
    this._y = [];
    this._basis.lineStart();
  },
  lineEnd: function() {
    var x2 = this._x, y2 = this._y, j = x2.length - 1;
    if (j > 0) {
      var x0 = x2[0], y0 = y2[0], dx = x2[j] - x0, dy = y2[j] - y0, i = -1, t;
      while (++i <= j) {
        t = i / j;
        this._basis.point(
          this._beta * x2[i] + (1 - this._beta) * (x0 + t * dx),
          this._beta * y2[i] + (1 - this._beta) * (y0 + t * dy)
        );
      }
    }
    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function(x2, y2) {
    this._x.push(+x2);
    this._y.push(+y2);
  }
};
var bundle_default = function custom(beta) {
  function bundle(context) {
    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
  }
  bundle.beta = function(beta2) {
    return custom(+beta2);
  };
  return bundle;
}(0.85);

// node_modules/d3-shape/src/curve/cardinal.js
function point3(that, x2, y2) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x2),
    that._y2 + that._k * (that._y1 - y2),
    that._x2,
    that._y2
  );
}
function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        point3(this, this._x1, this._y1);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        this._x1 = x2, this._y1 = y2;
        break;
      case 2:
        this._point = 3;
      default:
        point3(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var cardinal_default = function custom2(tension) {
  function cardinal(context) {
    return new Cardinal(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom2(+tension2);
  };
  return cardinal;
}(0);

// node_modules/d3-shape/src/curve/cardinalClosed.js
function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
CardinalClosed.prototype = {
  areaStart: noop_default,
  areaEnd: noop_default,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x2, this._y3 = y2;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = x2, this._y4 = y2);
        break;
      case 2:
        this._point = 3;
        this._x5 = x2, this._y5 = y2;
        break;
      default:
        point3(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var cardinalClosed_default = function custom3(tension) {
  function cardinal(context) {
    return new CardinalClosed(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom3(+tension2);
  };
  return cardinal;
}(0);

// node_modules/d3-shape/src/curve/cardinalOpen.js
function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
CardinalOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      default:
        point3(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var cardinalOpen_default = function custom4(tension) {
  function cardinal(context) {
    return new CardinalOpen(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom4(+tension2);
  };
  return cardinal;
}(0);

// node_modules/d3-shape/src/curve/catmullRom.js
function point4(that, x2, y2) {
  var x1 = that._x1, y1 = that._y1, x22 = that._x2, y22 = that._y2;
  if (that._l01_a > epsilon2) {
    var a2 = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a, n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a2 - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a2 - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }
  if (that._l23_a > epsilon2) {
    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a, m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x22 = (x22 * b + that._x1 * that._l23_2a - x2 * that._l12_2a) / m;
    y22 = (y22 * b + that._y1 * that._l23_2a - y2 * that._l12_2a) / m;
  }
  that._context.bezierCurveTo(x1, y1, x22, y22, that._x2, that._y2);
}
function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRom.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        this.point(this._x2, this._y2);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    if (this._point) {
      var x23 = this._x2 - x2, y23 = this._y2 - y2;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
      default:
        point4(this, x2, y2);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var catmullRom_default = function custom5(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom5(+alpha2);
  };
  return catmullRom;
}(0.5);

// node_modules/d3-shape/src/curve/catmullRomClosed.js
function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRomClosed.prototype = {
  areaStart: noop_default,
  areaEnd: noop_default,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    if (this._point) {
      var x23 = this._x2 - x2, y23 = this._y2 - y2;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x2, this._y3 = y2;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = x2, this._y4 = y2);
        break;
      case 2:
        this._point = 3;
        this._x5 = x2, this._y5 = y2;
        break;
      default:
        point4(this, x2, y2);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var catmullRomClosed_default = function custom6(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom6(+alpha2);
  };
  return catmullRom;
}(0.5);

// node_modules/d3-shape/src/curve/catmullRomOpen.js
function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRomOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    if (this._point) {
      var x23 = this._x2 - x2, y23 = this._y2 - y2;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      default:
        point4(this, x2, y2);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var catmullRomOpen_default = function custom7(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom7(+alpha2);
  };
  return catmullRom;
}(0.5);

// node_modules/d3-shape/src/curve/linearClosed.js
function LinearClosed(context) {
  this._context = context;
}
LinearClosed.prototype = {
  areaStart: noop_default,
  areaEnd: noop_default,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point)
      this._context.closePath();
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    if (this._point)
      this._context.lineTo(x2, y2);
    else
      this._point = 1, this._context.moveTo(x2, y2);
  }
};

// node_modules/d3-shape/src/curve/monotone.js
function sign(x2) {
  return x2 < 0 ? -1 : 1;
}
function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0, h1 = x2 - that._x1, s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0), s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0), p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}
function slope2(that, t) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
}
function point5(that, t03, t13) {
  var x0 = that._x0, y0 = that._y0, x1 = that._x1, y1 = that._y1, dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t03, x1 - dx, y1 - dx * t13, x1, y1);
}
function MonotoneX(context) {
  this._context = context;
}
MonotoneX.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        point5(this, this._t0, slope2(this, this._t0));
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    var t13 = NaN;
    x2 = +x2, y2 = +y2;
    if (x2 === this._x1 && y2 === this._y1)
      return;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        point5(this, slope2(this, t13 = slope3(this, x2, y2)), t13);
        break;
      default:
        point5(this, this._t0, t13 = slope3(this, x2, y2));
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
    this._t0 = t13;
  }
};
function MonotoneY(context) {
  this._context = new ReflectContext(context);
}
(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x2, y2) {
  MonotoneX.prototype.point.call(this, y2, x2);
};
function ReflectContext(context) {
  this._context = context;
}
ReflectContext.prototype = {
  moveTo: function(x2, y2) {
    this._context.moveTo(y2, x2);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(x2, y2) {
    this._context.lineTo(y2, x2);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x3, y3) {
    this._context.bezierCurveTo(y1, x1, y2, x2, y3, x3);
  }
};
function monotoneX(context) {
  return new MonotoneX(context);
}
function monotoneY(context) {
  return new MonotoneY(context);
}

// node_modules/d3-shape/src/curve/natural.js
function Natural(context) {
  this._context = context;
}
Natural.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var x2 = this._x, y2 = this._y, n = x2.length;
    if (n) {
      this._line ? this._context.lineTo(x2[0], y2[0]) : this._context.moveTo(x2[0], y2[0]);
      if (n === 2) {
        this._context.lineTo(x2[1], y2[1]);
      } else {
        var px = controlPoints(x2), py = controlPoints(y2);
        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x2[i1], y2[i1]);
        }
      }
    }
    if (this._line || this._line !== 0 && n === 1)
      this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x2, y2) {
    this._x.push(+x2);
    this._y.push(+y2);
  }
};
function controlPoints(x2) {
  var i, n = x2.length - 1, m, a2 = new Array(n), b = new Array(n), r = new Array(n);
  a2[0] = 0, b[0] = 2, r[0] = x2[0] + 2 * x2[1];
  for (i = 1; i < n - 1; ++i)
    a2[i] = 1, b[i] = 4, r[i] = 4 * x2[i] + 2 * x2[i + 1];
  a2[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x2[n - 1] + x2[n];
  for (i = 1; i < n; ++i)
    m = a2[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
  a2[n - 1] = r[n - 1] / b[n - 1];
  for (i = n - 2; i >= 0; --i)
    a2[i] = (r[i] - a2[i + 1]) / b[i];
  b[n - 1] = (x2[n] + a2[n - 1]) / 2;
  for (i = 0; i < n - 1; ++i)
    b[i] = 2 * x2[i + 1] - a2[i + 1];
  return [a2, b];
}

// node_modules/d3-shape/src/curve/step.js
function Step(context, t) {
  this._context = context;
  this._t = t;
}
Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (0 < this._t && this._t < 1 && this._point === 2)
      this._context.lineTo(this._x, this._y);
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    if (this._line >= 0)
      this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y2);
          this._context.lineTo(x2, y2);
        } else {
          var x1 = this._x * (1 - this._t) + x2 * this._t;
          this._context.lineTo(x1, this._y);
          this._context.lineTo(x1, y2);
        }
        break;
      }
    }
    this._x = x2, this._y = y2;
  }
};

// node_modules/d3-shape/src/offset/none.js
function none_default(series2, order) {
  if (!((n = series2.length) > 1))
    return;
  for (var i = 1, j, s0, s1 = series2[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series2[order[i]];
    for (j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
}

// node_modules/d3-shape/src/order/none.js
function none_default2(series2) {
  var n = series2.length, o = new Array(n);
  while (--n >= 0)
    o[n] = n;
  return o;
}

// node_modules/d3-shape/src/stack.js
function stackValue(d, key) {
  return d[key];
}
function stack_default() {
  var keys = constant_default2([]), order = none_default2, offset = none_default, value = stackValue;
  function stack(data) {
    var kz = keys.apply(this, arguments), i, m = data.length, n = kz.length, sz = new Array(n), oz;
    for (i = 0; i < n; ++i) {
      for (var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j) {
        si[j] = sij = [0, +value(data[j], ki, j, data)];
        sij.data = data[j];
      }
      si.key = ki;
    }
    for (i = 0, oz = order(sz); i < n; ++i) {
      sz[oz[i]].index = i;
    }
    offset(sz, oz);
    return sz;
  }
  stack.keys = function(_) {
    return arguments.length ? (keys = typeof _ === "function" ? _ : constant_default2(slice3.call(_)), stack) : keys;
  };
  stack.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant_default2(+_), stack) : value;
  };
  stack.order = function(_) {
    return arguments.length ? (order = _ == null ? none_default2 : typeof _ === "function" ? _ : constant_default2(slice3.call(_)), stack) : order;
  };
  stack.offset = function(_) {
    return arguments.length ? (offset = _ == null ? none_default : _, stack) : offset;
  };
  return stack;
}

// node_modules/d3-shape/src/offset/diverging.js
function diverging_default(series2, order) {
  if (!((n = series2.length) > 0))
    return;
  for (var i, j = 0, d, dy, yp, yn, n, m = series2[order[0]].length; j < m; ++j) {
    for (yp = yn = 0, i = 0; i < n; ++i) {
      if ((dy = (d = series2[order[i]][j])[1] - d[0]) > 0) {
        d[0] = yp, d[1] = yp += dy;
      } else if (dy < 0) {
        d[1] = yn, d[0] = yn += dy;
      } else {
        d[0] = 0, d[1] = dy;
      }
    }
  }
}

// node_modules/@devexpress/dx-chart-core/dist/dx-chart-core.es.js
var __assign2 = function() {
  __assign2 = Object.assign || function __assign4(t) {
    for (var s2, i = 1, n = arguments.length; i < n; i++) {
      s2 = arguments[i];
      for (var p in s2)
        if (Object.prototype.hasOwnProperty.call(s2, p))
          t[p] = s2[p];
    }
    return t;
  };
  return __assign2.apply(this, arguments);
};
function __rest2(s2, e) {
  var t = {};
  for (var p in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p) && e.indexOf(p) < 0)
      t[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s2); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i]))
        t[p[i]] = s2[p[i]];
    }
  return t;
}
function __read3(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
}
function __spreadArray3(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || from);
}
var TOP = "top";
var BOTTOM = "bottom";
var LEFT = "left";
var RIGHT = "right";
var MIDDLE = "middle";
var END = "end";
var START = "start";
var ARGUMENT_DOMAIN = "argument-domain";
var VALUE_DOMAIN = "value-domain";
var HOVERED = "hovered";
var SELECTED = "selected";
var DIFFERENCE = 3;
var scaleLinear = linear;
var scaleBand = function() {
  return band().paddingInner(0.3).paddingOuter(0.15);
};
var isHorizontal = function(name, rotated) {
  return name === ARGUMENT_DOMAIN === !rotated;
};
var makeScaleHelper = function(linear2, band2) {
  var func = function(scale) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    var choosen = "bandwidth" in scale ? band2 : linear2;
    return choosen.apply(void 0, __spreadArray3([scale], __read3(args), false));
  };
  return func;
};
var getLinearScaleWidth = function(_) {
  return 0;
};
var getBandScaleWidth = function(scale) {
  return scale.bandwidth();
};
var getWidth = makeScaleHelper(getLinearScaleWidth, getBandScaleWidth);
var getValueDomainName = function(name) {
  return name || VALUE_DOMAIN;
};
var floatsEqual = function(a2, b) {
  return Math.abs(a2 - b) < Number.EPSILON;
};
var rangesEqual = function(r1, r2) {
  return floatsEqual(r1[0], r2[0]) && floatsEqual(r1[1], r2[1]);
};
var wrapLinearScale = function(scale) {
  return scale;
};
var wrapBandScale = function(scale) {
  var ret = function(value) {
    return scale(value) + scale.bandwidth() / 2;
  };
  Object.assign(ret, scale);
  return ret;
};
var wrapScale = makeScaleHelper(wrapLinearScale, wrapBandScale);
var makeScale = function(_a3, range2) {
  var factory = _a3.factory, domain = _a3.domain;
  var scale = (factory || scaleLinear)().domain(domain).range(range2);
  return wrapScale(scale);
};
var scaleLinearBounds = function(scale, bounds) {
  return bounds.map(scale);
};
var scaleBandBounds = function(scale, bounds) {
  var cleanScale = scale.copy().paddingInner(0).paddingOuter(0);
  var fullRange = scale.range();
  var sign2 = Math.sign(fullRange[1] - fullRange[0]);
  return sign2 >= 0 ? [cleanScale(bounds[0]), cleanScale(bounds[1]) + cleanScale.bandwidth()] : [cleanScale(bounds[0]) + cleanScale.bandwidth(), cleanScale(bounds[1])];
};
var moveLinearScaleBounds = function(scale, bounds, delta) {
  var fullRange = scale.range();
  var sign2 = Math.sign(fullRange[1] - fullRange[0]);
  var range2 = scaleLinearBounds(scale, bounds);
  var r0 = range2[0] + delta;
  var r1 = range2[1] + delta;
  if (Math.sign(r0 - fullRange[0]) !== sign2) {
    r0 = fullRange[0];
    r1 = r0 + range2[1] - range2[0];
  }
  if (Math.sign(fullRange[1] - r1) !== sign2) {
    r1 = fullRange[1];
    r0 = r1 - range2[1] + range2[0];
  }
  var newBounds = [scale.invert(r0), scale.invert(r1)];
  return rangesEqual(bounds, newBounds) ? bounds : newBounds;
};
var adjustBandScaleMoveStep = function(delta, step) {
  var ratio = Math.abs(delta / step);
  var sign2 = Math.sign(delta / step);
  if (ratio >= 0.5) {
    return sign2 * Math.round(ratio);
  }
  if (ratio >= 0.3) {
    return sign2;
  }
  if (Math.abs(delta) > 30) {
    return sign2;
  }
  return 0;
};
var moveBandScaleBounds = function(scale, bounds, delta) {
  var domain = scale.domain();
  var fullRange = scale.range();
  var step = (fullRange[1] - fullRange[0]) / domain.length;
  var rangeStep = adjustBandScaleMoveStep(delta, step);
  if (rangeStep === 0) {
    return bounds;
  }
  var range2 = scaleBounds(scale, bounds);
  var range0 = Math.round((range2[0] - fullRange[0]) / step);
  var range1 = range0 + Math.round((range2[1] - range2[0]) / step) - 1;
  var new0 = range0 + rangeStep;
  var new1 = range1 + rangeStep;
  if (new0 < 0) {
    new0 = 0;
    new1 = new0 + range1 - range0;
  }
  if (new1 > domain.length - 1) {
    new1 = domain.length - 1;
    new0 = new1 - range1 + range0;
  }
  if (new0 === range0 || new1 === range1) {
    return bounds;
  }
  return [domain[new0], domain[new1]];
};
var LINEAR_SCALE_ZOOMING_THRESHOLD = 1e3;
var growLinearScaleBounds = function(scale, bounds, delta, anchor) {
  var fullRange = scale.range();
  var minRangeThreshold = (fullRange[1] - fullRange[0]) / LINEAR_SCALE_ZOOMING_THRESHOLD;
  var sign2 = Math.sign(fullRange[1] - fullRange[0]);
  var range2 = scaleBounds(scale, bounds);
  if (delta > 0 && Math.abs(range2[1] - range2[0]) <= Math.abs(minRangeThreshold)) {
    return bounds;
  }
  if (delta < 0 && Math.abs(range2[1] - range2[0]) >= Math.abs(fullRange[1] - fullRange[0])) {
    return bounds;
  }
  var t = Math.abs((anchor - range2[0]) / (range2[1] - range2[0]));
  var r0 = range2[0] + sign2 * delta * 2 * t;
  var r1 = range2[1] - sign2 * delta * 2 * (1 - t);
  if (Math.sign(r0 - fullRange[0]) !== sign2) {
    r0 = fullRange[0];
  }
  if (Math.sign(fullRange[1] - r1) !== sign2) {
    r1 = fullRange[1];
  }
  if (Math.sign(r1 - r0) !== sign2 || Math.abs(r1 - r0) < Math.abs(minRangeThreshold)) {
    if (Math.abs(r0 - range2[0]) < Math.abs(minRangeThreshold / 2)) {
      r0 = range2[0];
      r1 = r0 + minRangeThreshold;
    } else if (Math.abs(r1 - range2[1]) < Math.abs(minRangeThreshold / 2)) {
      r1 = range2[1];
      r0 = r1 - minRangeThreshold;
    } else {
      r0 = anchor - minRangeThreshold / 2;
      r1 = anchor + minRangeThreshold / 2;
    }
  }
  var newBounds = [scale.invert(r0), scale.invert(r1)];
  return rangesEqual(bounds, newBounds) ? bounds : newBounds;
};
var growBandScaleBounds = function(scale, bounds, delta, anchor) {
  var domain = scale.domain();
  var fullRange = scale.range();
  var step = (fullRange[1] - fullRange[0]) / domain.length;
  var range2 = scaleBounds(scale, bounds);
  var range0 = Math.round((range2[0] - fullRange[0]) / step);
  var range1 = range0 + Math.round((range2[1] - range2[0]) / step) - 1;
  var rangeStep = Math.sign(delta);
  if (rangeStep === 0 || rangeStep > 0 && range0 === range1 || rangeStep < 0 && range0 === 0 && range1 === domain.length - 1) {
    return bounds;
  }
  var t = Math.abs((anchor - range2[0]) / (range2[1] - range2[0]));
  var new0 = range0 + Math.round(rangeStep * 2 * t);
  var new1 = range1 - Math.round(rangeStep * 2 * (1 - t));
  if (new0 < 0) {
    new0 = 0;
  }
  if (new1 > domain.length - 1) {
    new1 = domain.length - 1;
  }
  if (new0 > new1) {
    if (t <= 0.5) {
      new1 = new0;
    } else {
      new0 = new1;
    }
  }
  if (new0 === range0 && new1 === range1) {
    return bounds;
  }
  return [domain[new0], domain[new1]];
};
var invertLinearScaleBounds = function(scale, range2) {
  var fullRange = scale.range();
  var match = Math.sign(fullRange[1] - fullRange[0]) === Math.sign(range2[1] - range2[0]);
  return [
    scale.invert(range2[match ? 0 : 1]),
    scale.invert(range2[match ? 1 : 0])
  ];
};
var matchPointToBand = function(domain, range2, p) {
  var i = Math.floor(domain.length * (p - range2[0]) / (range2[1] - range2[0]));
  return domain[Math.min(i, domain.length - 1)];
};
var invertBandScaleBounds = function(scale, range2) {
  var domain = scale.domain();
  var fullRange = scale.range();
  return [
    matchPointToBand(domain, fullRange, range2[0]),
    matchPointToBand(domain, fullRange, range2[1])
  ];
};
var scaleBounds = makeScaleHelper(scaleLinearBounds, scaleBandBounds);
var moveBounds = makeScaleHelper(moveLinearScaleBounds, moveBandScaleBounds);
var growBounds = makeScaleHelper(growLinearScaleBounds, growBandScaleBounds);
var invertBoundsRange = makeScaleHelper(invertLinearScaleBounds, invertBandScaleBounds);
var _a;
var makeDomain = function(_a3) {
  var factory = _a3.factory, modifyDomain = _a3.modifyDomain;
  return {
    domain: [],
    factory,
    isDiscrete: !!(factory && isDiscrete(factory)),
    modifyDomain
  };
};
var defaultDomains = (_a = {}, _a[ARGUMENT_DOMAIN] = makeDomain({}), _a[VALUE_DOMAIN] = makeDomain({}), _a);
var addDomain = function(domains, name, options) {
  var _a3;
  return __assign2(__assign2({}, domains), (_a3 = {}, _a3[name] = makeDomain(options), _a3));
};
var mergeContinuousDomains = function(domain, items) {
  var newDomain = extent_default(__spreadArray3(__spreadArray3([], __read3(domain), false), __read3(items), false));
  return rangesEqual(newDomain, domain) ? domain : newDomain;
};
var mergeDiscreteDomains = function(domain, items) {
  var newDomain = Array.from(new Set(__spreadArray3(__spreadArray3([], __read3(domain), false), __read3(items), false)));
  return newDomain.length === domain.length ? domain : newDomain;
};
var getArgument = function(point6) {
  return point6.argument;
};
var getValue = function(point6) {
  return point6.value;
};
var guessFactory = function(points, getItem) {
  return points.length && typeof getItem(points[0]) === "string" ? scaleBand : scaleLinear;
};
var isDiscrete = function(factory) {
  return "bandwidth" in factory();
};
var updateDomainFactory = function(domain, series2, getItem) {
  if (domain.factory) {
    return domain;
  }
  var factory = guessFactory(series2.points, getItem);
  return __assign2(__assign2({}, domain), { factory, isDiscrete: isDiscrete(factory) });
};
var updateDomainItems = function(domain, items) {
  var merge3 = domain.isDiscrete ? mergeDiscreteDomains : mergeContinuousDomains;
  var merged = merge3(domain.domain, items);
  return merged === domain.domain ? domain : __assign2(__assign2({}, domain), { domain: domain.modifyDomain ? domain.modifyDomain(merged) : merged });
};
var getArgumentDomainItems = function(series2) {
  return series2.points.map(getArgument);
};
var getValueDomainItems = function(series2) {
  var items = series2.points.map(getValue);
  return series2.getPointTransformer.isStartedFromZero ? __spreadArray3([0], __read3(items), false) : items;
};
var updateDomain = function(domain, series2, getItem, getDomainItems) {
  return updateDomainItems(updateDomainFactory(domain, series2, getItem), getDomainItems(series2));
};
var extendDomains = function(domains, series2) {
  var argumentDomain = updateDomain(domains[ARGUMENT_DOMAIN], series2, getArgument, getArgumentDomainItems);
  var valueDomainName = getValueDomainName(series2.scaleName);
  var valueDomain = updateDomain(domains[valueDomainName], series2, getValue, getValueDomainItems);
  var changes = {};
  if (argumentDomain !== domains[ARGUMENT_DOMAIN]) {
    changes[ARGUMENT_DOMAIN] = argumentDomain;
  }
  if (valueDomain !== domains[valueDomainName]) {
    changes[valueDomainName] = valueDomain;
  }
  return Object.keys(changes).length ? __assign2(__assign2({}, domains), changes) : domains;
};
var buildScales = function(domains, ranges) {
  var scales = {};
  Object.keys(domains).forEach(function(name) {
    scales[name] = makeScale(domains[name], ranges[name === ARGUMENT_DOMAIN ? ARGUMENT_DOMAIN : VALUE_DOMAIN]);
  });
  return scales;
};
var isEqual = function(_a3, _b2) {
  var firstWidth = _a3.width, firstHeight = _a3.height;
  var secondWidth = _b2.width, secondHeight = _b2.height;
  return firstWidth === secondWidth && firstHeight === secondHeight;
};
var bBoxes = function(prevBBoxes, _a3) {
  var _b2;
  var bBox = _a3.bBox, placeholder = _a3.placeholder;
  if (isEqual(prevBBoxes[placeholder] || {}, bBox))
    return prevBBoxes;
  return __assign2(__assign2({}, prevBBoxes), (_b2 = {}, _b2[placeholder] = bBox, _b2));
};
var getRanges = function(paneSize, rotated) {
  var _a3;
  var horRange = [0, paneSize.width];
  var verRange = [paneSize.height, 0];
  return _a3 = {}, _a3[ARGUMENT_DOMAIN] = rotated ? verRange : horRange, _a3[VALUE_DOMAIN] = rotated ? horRange : verRange, _a3;
};
var _a$1;
var _b;
var getTicks = function(scale, count3) {
  return scale.ticks ? scale.ticks(count3) : scale.domain();
};
var createTicks = function(scale, count3, callback) {
  return getTicks(scale, count3).map(function(tick, index3) {
    return callback(scale(tick), String(index3), tick);
  });
};
var getFormat = function(scale, count3, tickFormat2) {
  if (scale.tickFormat) {
    return tickFormat2 ? tickFormat2(scale, count3) : scale.tickFormat(count3);
  }
  return function(tick) {
    return tick;
  };
};
var rotatedPositions = (_a$1 = {}, _a$1[LEFT] = BOTTOM, _a$1[RIGHT] = TOP, _a$1[BOTTOM] = LEFT, _a$1[TOP] = RIGHT, _a$1);
var positionFlags = (_b = {}, _b[LEFT] = false, _b[RIGHT] = false, _b[BOTTOM] = true, _b[TOP] = true, _b);
var getRotatedPosition = function(position) {
  return rotatedPositions[position];
};
var isValidPosition = function(position, scaleName, rotated) {
  return positionFlags[position] === isHorizontal(scaleName, rotated);
};
var createHorizontalOptions = function(position, tickSize, indentFromAxis) {
  var isStart = position === BOTTOM;
  return {
    y1: 0,
    y2: isStart ? +tickSize : -tickSize,
    yText: isStart ? +indentFromAxis : -indentFromAxis,
    dy: isStart ? "1em" : "0em",
    textAnchor: MIDDLE
  };
};
var createVerticalOptions = function(position, tickSize, indentFromAxis) {
  var isStart = position === LEFT;
  return {
    x1: 0,
    x2: isStart ? -tickSize : +tickSize,
    xText: isStart ? -indentFromAxis : +indentFromAxis,
    dy: "0.3em",
    textAnchor: isStart ? END : START
  };
};
var DEFAULT_TICK_COUNT = 10;
var getTickCount = function(scaleRange, paneSize) {
  var rangeToPaneRatio = Math.abs(scaleRange[0] - scaleRange[1]) / paneSize;
  return Math.round(DEFAULT_TICK_COUNT * (isFinite(rangeToPaneRatio) ? rangeToPaneRatio : 1));
};
var createTickFilter = function(isHor, size) {
  return isHor ? function(tick) {
    return tick.x1 >= 0 && tick.x1 <= size;
  } : function(tick) {
    return tick.y1 >= 0 && tick.y1 <= size;
  };
};
var tickCoordinatesGetter = function(_a3) {
  var isHor = _a3.isHor, scale = _a3.scale, tickCount = _a3.tickCount, tickFormat2 = _a3.tickFormat, position = _a3.position, tickSize = _a3.tickSize, indentFromAxis = _a3.indentFromAxis;
  var formatTick = getFormat(scale, tickCount, tickFormat2);
  var options = (isHor ? createHorizontalOptions : createVerticalOptions)(position, tickSize, indentFromAxis);
  return function(coordinates, key, tick) {
    return __assign2({ key, x1: coordinates, x2: coordinates, y1: coordinates, y2: coordinates, xText: coordinates, yText: coordinates, text: formatTick(tick) }, options);
  };
};
var gridCoordinatesGetter = function(_a3) {
  var isHor = _a3.isHor;
  var options = isHor ? { y1: 0 } : { x1: 0 };
  return function(coordinates, key) {
    return __assign2({ key, x1: coordinates, y1: coordinates }, options);
  };
};
var getTickCoordinates = function(_a3) {
  var scaleName = _a3.scaleName, scale = _a3.scale, paneSize = _a3.paneSize, rotated = _a3.rotated, callback = _a3.callback, restProps = __rest2(_a3, ["scaleName", "scale", "paneSize", "rotated", "callback"]);
  var isHor = isHorizontal(scaleName, rotated);
  var tickCount = getTickCount(scale.range(), paneSize[1 - Number(isHor)]);
  var ticks2 = createTicks(scale, tickCount, callback(__assign2({ isHor, scale, tickCount }, restProps)));
  var visibleTicks = ticks2.filter(createTickFilter(isHor, paneSize[1 - Number(isHor)]));
  return {
    ticks: visibleTicks,
    sides: [Number(isHor), Number(!isHor)]
  };
};
var getArg = function(_a3) {
  var arg = _a3.arg;
  return arg;
};
var getVal = function(_a3) {
  var val = _a3.val;
  return val;
};
var getStartVal = function(_a3) {
  var startVal = _a3.startVal;
  return startVal;
};
var dArea = area_default().x(getArg).y1(getVal).y0(getStartVal);
var dRotateArea = area_default().x1(getStartVal).x0(getVal).y(getArg);
var dLine = line_default().x(getArg).y(getVal);
var dRotateLine = line_default().x(getVal).y(getArg);
var dSpline = line_default().x(getArg).y(getVal).curve(monotoneX);
var dRotateSpline = line_default().x(getVal).y(getArg).curve(monotoneY);
var dBar = function(arg, val, startVal, width, rotated) {
  var height = Math.abs(val - startVal);
  var minVal = Math.min(val, startVal);
  return {
    x: rotated ? minVal : arg - width / 2,
    y: rotated ? arg - width / 2 : minVal,
    width: rotated ? height : width || 2,
    height: rotated ? width || 2 : height
  };
};
var getPiePointTransformer = function(_a3) {
  var argumentScale = _a3.argumentScale, valueScale = _a3.valueScale, points = _a3.points;
  var x2 = Math.max.apply(Math, __spreadArray3([], __read3(argumentScale.range()), false)) / 2;
  var y2 = Math.max.apply(Math, __spreadArray3([], __read3(valueScale.range()), false)) / 2;
  var maxRadius = Math.min(x2, y2);
  var pieData = pie_default().sort(null).value(function(d) {
    return d.value;
  })(points);
  return function(point6) {
    var _a4 = pieData[point6.index], startAngle = _a4.startAngle, endAngle = _a4.endAngle;
    return __assign2(__assign2({}, point6), { arg: x2, val: y2, startAngle, endAngle, maxRadius });
  };
};
var getLinePointTransformer = function(_a3) {
  var argumentScale = _a3.argumentScale, valueScale = _a3.valueScale;
  return function(point6) {
    return __assign2(__assign2({}, point6), { arg: argumentScale(point6.argument), val: valueScale(point6.value) });
  };
};
var getScatterPointTransformer = function() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return getLinePointTransformer.apply(void 0, __spreadArray3([], __read3(args), false));
};
var getAreaPointTransformer = function(series2) {
  var transform = getLinePointTransformer(series2);
  var startVal = series2.valueScale(0);
  return function(point6) {
    var ret = transform(point6);
    return __assign2(__assign2({}, ret), { startVal });
  };
};
getAreaPointTransformer.isStartedFromZero = true;
var getBarPointTransformer = function(_a3) {
  var argumentScale = _a3.argumentScale, valueScale = _a3.valueScale;
  var startVal = valueScale(0);
  return function(point6) {
    return __assign2(__assign2({}, point6), { arg: argumentScale(point6.argument), val: valueScale(point6.value), startVal, maxBarWidth: getWidth(argumentScale) });
  };
};
getBarPointTransformer.isStartedFromZero = true;
getBarPointTransformer.isBroad = true;
getPiePointTransformer.getPointColor = function(palette, index3) {
  return palette[index3 % palette.length];
};
var findSeriesByName = function(name, series2) {
  return series2.find(function(seriesItem) {
    return seriesItem.symbolName === name;
  });
};
var dSymbol = function(_a3) {
  var size = _a3.size;
  return symbol_default().size(Math.pow(size, 2)).type(circle_default)();
};
var dPie = function(maxRadius, innerRadius, outerRadius, startAngle, endAngle) {
  return arc_default()({
    startAngle,
    endAngle,
    innerRadius: innerRadius * maxRadius,
    outerRadius: outerRadius * maxRadius
  });
};
var getRect = function(cArg, cVal, dArg, dVal, rotated) {
  var minArg = cArg - dArg;
  var minVal = cVal - dVal;
  var maxArg = cArg + dArg;
  var maxVal = cVal + dVal;
  return rotated ? [minVal, minArg, maxVal, maxArg] : [minArg, minVal, maxArg, maxVal];
};
getBarPointTransformer.getTargetElement = function(point6) {
  var _a3 = point6, arg = _a3.arg, val = _a3.val, startVal = _a3.startVal, barWidth = _a3.barWidth, maxBarWidth = _a3.maxBarWidth, rotated = _a3.rotated;
  var halfWidth = barWidth * maxBarWidth / 2;
  var halfHeight = Math.abs(startVal - val) / 2;
  var centerVal = (val + startVal) / 2;
  return getRect(arg, centerVal, halfWidth, halfHeight, rotated);
};
getPiePointTransformer.getTargetElement = function(point6) {
  var _a3 = point6, x2 = _a3.arg, y2 = _a3.val, innerRadius = _a3.innerRadius, outerRadius = _a3.outerRadius, maxRadius = _a3.maxRadius, startAngle = _a3.startAngle, endAngle = _a3.endAngle;
  var center = arc_default().centroid({
    startAngle,
    endAngle,
    innerRadius: innerRadius * maxRadius,
    outerRadius: outerRadius * maxRadius
  });
  var cx = center[0] + x2;
  var cy = center[1] + y2;
  return getRect(cx, cy, 0.5, 0.5, false);
};
getAreaPointTransformer.getTargetElement = function(_a3) {
  var arg = _a3.arg, val = _a3.val, rotated = _a3.rotated;
  return getRect(arg, val, 1, 1, rotated);
};
getLinePointTransformer.getTargetElement = getAreaPointTransformer.getTargetElement;
getScatterPointTransformer.getTargetElement = function(obj) {
  var _a3 = obj, arg = _a3.arg, val = _a3.val, point6 = _a3.point, rotated = _a3.rotated;
  var t = point6.size / 2;
  return getRect(arg, val, t, t, rotated);
};
var getUniqueName = function(list, name) {
  var names = new Set(list.map(function(item) {
    return item.name;
  }));
  var ret = name;
  while (names.has(ret)) {
    ret = ret.replace(/\d*$/, function(str) {
      return str ? +str + 1 : 0;
    });
  }
  return ret;
};
var createPoints = function(_a3, data, props, palette) {
  var argumentField = _a3.argumentField, valueField = _a3.valueField, getPointTransformer = _a3.getPointTransformer;
  var points = [];
  data.forEach(function(dataItem, index3) {
    var argument = dataItem[argumentField];
    var value = dataItem[valueField];
    if (argument !== void 0 && value !== void 0) {
      points.push(__assign2(__assign2({ argument, value, index: index3 }, props), { color: getPointTransformer.getPointColor ? getPointTransformer.getPointColor(palette, index3) : props.color }));
    }
  });
  return points;
};
var addSeries = function(series2, data, palette, props, restProps) {
  var index3 = series2.length;
  var seriesColor = props.color || palette[index3 % palette.length];
  return __spreadArray3(__spreadArray3([], __read3(series2), false), [__assign2(__assign2({}, props), { index: index3, name: getUniqueName(series2, props.name), points: createPoints(props, data, __assign2(__assign2({}, restProps), { color: seriesColor }), palette), color: seriesColor })], false);
};
var scalePoints = function(series2, scales, rotated) {
  var transform = series2.getPointTransformer(__assign2(__assign2({}, series2), { argumentScale: scales[ARGUMENT_DOMAIN], valueScale: scales[getValueDomainName(series2.scaleName)] }));
  var ret = __assign2(__assign2({}, series2), { rotated, points: series2.points.map(function(point6) {
    return __assign2(__assign2({}, transform(point6)), { rotated });
  }) });
  return ret;
};
var scaleSeriesPoints = function(series2, scales, rotated) {
  return series2.map(function(seriesItem) {
    return scalePoints(seriesItem, scales, rotated);
  });
};
var getVisibility = function(pane, centerX, centerY, width, height) {
  return centerX - width / 2 < 0 && centerX + width / 2 < 0 || centerX - width / 2 > pane.width && centerX + width / 2 > pane.width || centerY - height / 2 < 0 && centerY + height / 2 < 0 || centerY - height / 2 > pane.height && centerY + height / 2 > pane.height ? "hidden" : "visible";
};
var adjustBarSize = function(bar, _a3) {
  var width = _a3.width, height = _a3.height;
  var x2 = Math.max(0, bar.x);
  var y2 = Math.max(0, bar.y);
  return {
    x: x2,
    y: y2,
    width: Math.min(width, bar.x + bar.width) - x2,
    height: Math.min(height, bar.y + bar.height) - y2
  };
};
var isValuesChanged = function(previous, current) {
  return Object.entries(previous).some(function(el) {
    return el[1] !== current[el[0]];
  });
};
var isCoordinatesChanged = function(_a3, _b2) {
  var prevCoordinates = _a3.coordinates;
  var coordinates = _b2.coordinates;
  if (prevCoordinates.length !== coordinates.length) {
    return true;
  }
  return prevCoordinates.some(function(el, index3) {
    return el.arg !== coordinates[index3].arg || el.val !== coordinates[index3].val;
  });
};
var isScalesChanged = function(previous, current) {
  return !rangesEqual(previous.argScale.range(), current.argScale.range()) || !rangesEqual(previous.valScale.range(), current.valScale.range());
};
var buildSeriesToStackMap = function(stacks) {
  var result = {};
  stacks.forEach(function(_a3, i) {
    var series2 = _a3.series;
    series2.forEach(function(name) {
      result[name] = i;
    });
  });
  return result;
};
var getStackedPointTransformer = function(getPointTransformer) {
  var wrapper = function(series2) {
    var transform = getPointTransformer(series2);
    var valueScale = series2.valueScale;
    return function(point6) {
      var ret = transform(point6);
      return __assign2(__assign2({}, ret), { startVal: valueScale(point6.value0) });
    };
  };
  Object.assign(wrapper, getPointTransformer);
  return wrapper;
};
var collectStacks = function(seriesList, seriesToStackMap, stacksKeys, seriesPositions) {
  seriesList.forEach(function(_a3) {
    var name = _a3.name, valueField = _a3.valueField;
    var stackId = seriesToStackMap[name];
    if (stackId === void 0) {
      return;
    }
    if (!stacksKeys[stackId]) {
      stacksKeys[stackId] = [];
    }
    seriesPositions[name] = stacksKeys[stackId].length;
    stacksKeys[stackId].push(valueField);
  });
  Object.keys(stacksKeys).forEach(function(stackId) {
    if (stacksKeys[stackId].length === 1) {
      delete stacksKeys[stackId];
    }
  });
};
var getStackedData = function(stacksKeys, dataItems, offset, order) {
  var result = {};
  Object.keys(stacksKeys).forEach(function(stackId) {
    result[stackId] = stack_default().keys(stacksKeys[stackId]).order(order).offset(offset)(dataItems);
  });
  return result;
};
var buildStackedSeries = function(series2, dataItems) {
  var points = series2.points.map(function(point6) {
    var _a3 = __read3(dataItems[point6.index], 2), value0 = _a3[0], value = _a3[1];
    return __assign2(__assign2({}, point6), { value, value0 });
  });
  var stackedSeries = __assign2(__assign2({}, series2), { points, isStacked: true });
  if (series2.getPointTransformer.isStartedFromZero) {
    stackedSeries.getPointTransformer = getStackedPointTransformer(series2.getPointTransformer);
  }
  return stackedSeries;
};
var applyStacking = function(seriesList, dataItems, seriesToStackMap, offset, order) {
  var stacksKeys = {};
  var seriesPositions = {};
  collectStacks(seriesList, seriesToStackMap, stacksKeys, seriesPositions);
  if (Object.keys(stacksKeys).length === 0) {
    return seriesList;
  }
  var stackedData = getStackedData(stacksKeys, dataItems, offset, order);
  return seriesList.map(function(seriesItem) {
    var stackId = seriesToStackMap[seriesItem.name];
    var stackData = stackedData[stackId];
    if (!stackData) {
      return seriesItem;
    }
    var position = seriesPositions[seriesItem.name];
    return buildStackedSeries(seriesItem, stackData[position]);
  });
};
var getGroupName = function(series2, i, seriesToStackMap) {
  var stackId = seriesToStackMap[series2.name];
  return stackId >= 0 ? String(stackId) : "group-".concat(i);
};
var getGroupedPointTransformer = function(getPointTransformer, groupCount, groupOffset) {
  var wrapper = function(series2) {
    var transform = getPointTransformer(series2);
    var widthCoeff = 1 / groupCount;
    return function(point6) {
      var original = transform(point6);
      var arg = original.arg - original.maxBarWidth * (0.5 - 0.5 * widthCoeff - groupOffset * widthCoeff);
      var result = __assign2(__assign2({}, original), { arg, maxBarWidth: original.maxBarWidth / groupCount });
      return result;
    };
  };
  Object.assign(wrapper, getPointTransformer);
  return wrapper;
};
var applyGrouping = function(seriesList, seriesToStackMap) {
  var groups3 = /* @__PURE__ */ new Set();
  seriesList.forEach(function(seriesItem, i) {
    if (seriesItem.getPointTransformer.isBroad) {
      groups3.add(getGroupName(seriesItem, i, seriesToStackMap));
    }
  });
  if (groups3.size < 2) {
    return seriesList;
  }
  var scale = band().domain(Array.from(groups3)).range([0, groups3.size]);
  return seriesList.map(function(seriesItem, i) {
    if (!seriesItem.getPointTransformer.isBroad) {
      return seriesItem;
    }
    var getPointTransformer = getGroupedPointTransformer(seriesItem.getPointTransformer, groups3.size, scale(getGroupName(seriesItem, i, seriesToStackMap)));
    return __assign2(__assign2({}, seriesItem), { getPointTransformer });
  });
};
var getStackedSeries = function(seriesList, dataItems, _a3) {
  var stacks = _a3.stacks, offset = _a3.offset, order = _a3.order;
  var map6 = buildSeriesToStackMap(stacks);
  var stackedSeriesList = applyStacking(seriesList, dataItems, map6, offset, order);
  var groupedSeriesList = applyGrouping(stackedSeriesList, map6);
  return groupedSeriesList;
};
var resetDomainItems = function(domains) {
  var result = {};
  Object.keys(domains).forEach(function(key) {
    result[key] = __assign2(__assign2({}, domains[key]), { domain: [] });
  });
  return result;
};
var extendDomainsWithAdditionalItems = function(domains, series2) {
  var _a3;
  var items = series2.points.map(function(point6) {
    return point6.value0;
  });
  var key = getValueDomainName(series2.scaleName);
  var domain = updateDomainItems(domains[key], items);
  return domain !== domains[key] ? __assign2(__assign2({}, domains), (_a3 = {}, _a3[key] = domain, _a3)) : domains;
};
var getStackedDomains = function(domains, seriesList) {
  var stackedSeries = seriesList.filter(function(series2) {
    return series2.isStacked;
  });
  if (!stackedSeries.length) {
    return domains;
  }
  var rebuiltDomains = seriesList.reduce(extendDomains, resetDomainItems(domains));
  return stackedSeries.reduce(extendDomainsWithAdditionalItems, rebuiltDomains);
};
var easeOutCubic = function(t) {
  return (t - 1) * (t - 1) * (t - 1) + 1;
};
var getDelay = function(index3, isStart) {
  return isStart ? index3 * 30 : 0;
};
var getStartVal$1 = function(scales) {
  return scales.valScale.copy().clamp(true)(0);
};
var getPathStart = function(scales, _a3) {
  var coordinates = _a3.coordinates;
  var start = getStartVal$1(scales);
  return { coordinates: coordinates.map(function(coord) {
    return { arg: coord.arg, val: start, startVal: start };
  }) };
};
var getPointStart = function(scales, _a3) {
  var arg = _a3.arg;
  var start = getStartVal$1(scales);
  return { arg, val: start, startVal: start };
};
var getPieStart = function(scales, _a3) {
  var startAngle = _a3.startAngle, endAngle = _a3.endAngle;
  return { innerRadius: 0, outerRadius: 0, startAngle, endAngle };
};
var compareTargets = function(target1, target2) {
  return target1.series === target2.series && target1.point === target2.point;
};
var selectTarget = function(targets, currentTarget) {
  var candidate = targets[0];
  if (!currentTarget) {
    return candidate;
  }
  if (!candidate) {
    return null;
  }
  return compareTargets(candidate, currentTarget) ? void 0 : candidate;
};
var processPointerMove = function(targets, currentTarget, notify) {
  var nextTarget = selectTarget(targets, currentTarget);
  if (nextTarget === void 0) {
    return void 0;
  }
  if (notify) {
    notify(nextTarget);
  }
  return nextTarget;
};
var getOffset = function(element) {
  var _a3 = element.getBoundingClientRect(), left = _a3.left, top = _a3.top;
  var defaultView = element.ownerDocument.defaultView;
  var _b2 = defaultView, pageXOffset = _b2.pageXOffset, pageYOffset = _b2.pageYOffset;
  return [left + pageXOffset, top + pageYOffset];
};
var getEventCoords = function(e, offset) {
  var _a3 = e.touches ? e.touches[0] : e, pageX = _a3.pageX, pageY = _a3.pageY;
  return [pageX - offset[0], pageY - offset[1]];
};
var getParameters = function(series2, target) {
  var currentSeries = series2.find(function(_a3) {
    var name = _a3.name;
    return target.series === name;
  });
  var item = currentSeries.points.find(function(point6) {
    return point6.index === target.point;
  });
  return {
    element: currentSeries.getPointTransformer.getTargetElement(item),
    text: "".concat(item.value)
  };
};
var createReference = function(rect, rootRef) {
  return {
    // These two fields together with *width* and *height* are left with stub data for
    // simplicity reasons - they seem to be unused by *Popper*.
    clientWidth: 0,
    clientHeight: 0,
    getBoundingClientRect: function() {
      var offset = getOffset(rootRef.current);
      var htmlRect = rootRef.current.ownerDocument.documentElement.getBoundingClientRect();
      var left = rect[0] + offset[0] + htmlRect.left;
      var right = rect[2] + offset[0] + htmlRect.left;
      var top = rect[1] + offset[1] + htmlRect.top;
      var bottom = rect[3] + offset[1] + htmlRect.top;
      return {
        left,
        top,
        right,
        bottom,
        width: right - left,
        height: bottom - top
      };
    }
  };
};
var processHandleTooltip = function(targets, currentTarget, onTargetItemChange) {
  var filterTargets = targets.filter(function(target) {
    return target.point !== void 0;
  });
  return processPointerMove(filterTargets, currentTarget, onTargetItemChange);
};
var getArgumentBounds = function(viewport) {
  return viewport && viewport.argumentStart !== void 0 && viewport.argumentEnd !== void 0 ? [viewport.argumentStart, viewport.argumentEnd] : null;
};
var getValueBounds = function(viewport) {
  return viewport && viewport.valueStart !== void 0 && viewport.valueEnd !== void 0 ? [viewport.valueStart, viewport.valueEnd] : null;
};
var getValueScaleName = function(viewport) {
  return getValueDomainName(viewport && viewport.scaleName);
};
var getDefaultBounds = function(scale) {
  var domain = scale.domain();
  return [domain[0], domain[domain.length - 1]];
};
var proportionallyExtendRange = function(range2, subRange) {
  var p = (subRange[0] - subRange[1]) / (range2[0] - range2[1]);
  var q = subRange[0] - p * range2[0];
  return [
    (range2[0] - q) / p,
    (range2[1] - q) / p
  ];
};
var adjustRange = function(domain, bounds, range2) {
  var scale = makeScale(domain, range2);
  var subRange = scaleBounds(scale, bounds);
  return rangesEqual(subRange, range2) ? range2 : proportionallyExtendRange(range2, subRange);
};
var update = function(ranges, changes, key, domain, bounds) {
  var newRange = adjustRange(domain, bounds, ranges[key]);
  if (newRange !== ranges[key]) {
    changes[key] = newRange;
  }
};
var adjustLayout = function(domains, ranges, viewport) {
  var changes = {};
  var argumentBounds = getArgumentBounds(viewport);
  if (argumentBounds) {
    update(ranges, changes, ARGUMENT_DOMAIN, domains[ARGUMENT_DOMAIN], argumentBounds);
  }
  var valueBounds = getValueBounds(viewport);
  if (valueBounds) {
    update(ranges, changes, VALUE_DOMAIN, domains[getValueScaleName(viewport)], valueBounds);
  }
  return Object.keys(changes).length ? __assign2(__assign2({}, ranges), changes) : ranges;
};
var boundsForScale = function(name, scales, currentBounds, interaction, type, delta, anchor, range2) {
  if (!checkInteraction(interaction, type)) {
    return null;
  }
  var scale = scales[name];
  var bounds = currentBounds || getDefaultBounds(scale);
  var newBounds;
  if (type === "pan") {
    newBounds = moveBounds(scale, bounds, delta);
  } else if (type === "zoom") {
    newBounds = range2 ? invertBoundsRange(scale, range2) : growBounds(scale, bounds, delta, anchor);
  }
  return newBounds !== bounds ? newBounds : null;
};
var getViewport = function(scales, rotated, _a3, type, deltas, anchors, ranges, viewport, onViewportChange) {
  var _b2 = __read3(_a3, 2), argInteraction = _b2[0], valInteraction = _b2[1];
  var argIndex = Number(rotated);
  var valIndex = 1 - argIndex;
  var changes = {};
  var argumentBounds = boundsForScale(ARGUMENT_DOMAIN, scales, getArgumentBounds(viewport), argInteraction, type, deltas ? deltas[argIndex] : 0, anchors ? anchors[argIndex] : 0, ranges ? ranges[argIndex] : void 0);
  var valueBounds = boundsForScale(getValueScaleName(viewport), scales, getValueBounds(viewport), valInteraction, type, deltas ? deltas[valIndex] : 0, anchors ? anchors[valIndex] : 0, ranges ? ranges[valIndex] : void 0);
  if (argumentBounds) {
    changes.argumentStart = argumentBounds[0];
    changes.argumentEnd = argumentBounds[1];
  }
  if (valueBounds) {
    changes.valueStart = valueBounds[0];
    changes.valueEnd = valueBounds[1];
  }
  if (Object.keys(changes).length) {
    var newViewport = __assign2(__assign2({}, viewport), changes);
    if (onViewportChange) {
      onViewportChange(newViewport);
    }
    return { viewport: newViewport };
  }
  return null;
};
var getDeltaForTouches = function(touches) {
  var deltaX = touches[0].pageX - touches[1].pageX;
  var deltaY = touches[0].pageY - touches[1].pageY;
  var delta = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  var center = [
    (touches[0].pageX + touches[1].pageX) / 2,
    (touches[0].pageY + touches[1].pageY) / 2
  ];
  return { delta, center };
};
var isKeyPressed = function(event, key) {
  return event["".concat(key, "Key")];
};
var getWheelDelta = function(_a3) {
  var wheelDelta = _a3.wheelDelta, deltaY = _a3.deltaY;
  return wheelDelta !== void 0 ? wheelDelta : deltaY * -30;
};
var isMultiTouch = function(e) {
  return e.touches && e.touches.length === 2;
};
var attachEvents = function(node, handlers) {
  Object.keys(handlers).forEach(function(el) {
    node.addEventListener(el, handlers[el], { passive: false });
  });
};
var detachEvents = function(node, handlers) {
  Object.keys(handlers).forEach(function(el) {
    node.removeEventListener(el, handlers[el]);
  });
};
var getRect$1 = function(rotated, interactionWithArguments, interactionWithValues, initial, current, pane) {
  var isZoomArgument = checkInteraction(interactionWithArguments, "zoom");
  var isZoomValue = checkInteraction(interactionWithValues, "zoom");
  var isXFixed = rotated ? isZoomValue : isZoomArgument;
  var isYFixed = rotated ? isZoomArgument : isZoomValue;
  var x2 = isXFixed ? Math.min(initial[0], current[0]) : 0;
  var width = isXFixed ? Math.abs(initial[0] - current[0]) : pane.width;
  var y2 = isYFixed ? Math.min(initial[1], current[1]) : 0;
  var height = isYFixed ? Math.abs(initial[1] - current[1]) : pane.height;
  return {
    x: x2,
    y: y2,
    width,
    height
  };
};
var checkInteraction = function(interaction, type) {
  return interaction === "both" || interaction === type;
};
var setCursorType = function(node, type) {
  var defaultType = "pointer";
  node.style.cursor = type ? type : defaultType;
};
var isReadyToRenderSeries = function(_a3, _b2, isPreviousDataEmpty, axesExist) {
  var pane = _a3.pane, restLayouts = __rest2(_a3, ["pane"]);
  var current = _b2.current;
  if (!pane.width && !pane.height) {
    return false;
  }
  var bbox = { width: current.clientWidth, height: current.clientHeight };
  var width = pane.width;
  var height = pane.height;
  Object.entries(restLayouts).forEach(function(el) {
    var orientation = el[0].split("-")[0];
    if (orientation === "top" || orientation === "bottom") {
      height += el[1].height;
    } else {
      width += el[1].width;
    }
  });
  return Math.abs(bbox.width - width) < DIFFERENCE && Math.abs(bbox.height - height) < DIFFERENCE && isPreviousDataEmptyOrNoAxes(isPreviousDataEmpty, axesExist);
};
var isPreviousDataEmptyOrNoAxes = function(isPreviousDataEmpty, axesExist) {
  return !isPreviousDataEmpty || !axesExist;
};
var getSegmentLength = function(dx, dy) {
  return Math.sqrt(dx * dx + dy * dy);
};
var createContext2 = function() {
  return document.createElement("canvas").getContext("2d");
};
var createCanvasAbusingHitTester = function(makePath, points, rotated) {
  var ctx = createContext2();
  var path2 = makePath(rotated);
  path2.context(ctx);
  path2(points);
  return function(_a3) {
    var _b2 = __read3(_a3, 2), x2 = _b2[0], y2 = _b2[1];
    return ctx.isPointInPath(x2, y2);
  };
};
var LINE_POINT_SIZE = 20;
var LINE_TOLERANCE = 10;
var getDistance = function(_a3, _b2, rotated) {
  var _c = __read3(_a3, 2), px = _c[0], py = _c[1];
  var arg = _b2.arg, val = _b2.val;
  var x2 = rotated ? val : arg;
  var y2 = rotated ? arg : val;
  return getSegmentLength(px - x2, py - y2);
};
var createContinuousSeriesHitTesterCreator = function(makePath) {
  return function(points, rotated) {
    var fallbackHitTest = createCanvasAbusingHitTester(makePath, points, rotated);
    return function(target) {
      var minDistance = Number.MAX_VALUE;
      var minIndex3 = 0;
      var list = [];
      points.forEach(function(point6, i) {
        var distance = getDistance(target, point6, rotated);
        if (distance <= LINE_POINT_SIZE) {
          list.push({ distance, index: point6.index });
        }
        if (distance < minDistance) {
          minDistance = distance;
          minIndex3 = i;
        }
      });
      if (!list.length && fallbackHitTest(target)) {
        list.push({ index: points[minIndex3].index, distance: minDistance });
      }
      return list.length ? { points: list } : null;
    };
  };
};
var createPointsEnumeratingHitTesterCreator = function(hitTestPoint) {
  return function(points, rotated) {
    return function(target) {
      var list = [];
      points.forEach(function(point6) {
        var status = hitTestPoint(target, point6, rotated);
        if (status) {
          list.push({ index: point6.index, distance: status.distance });
        }
      });
      return list.length ? { points: list } : null;
    };
  };
};
var createAreaHitTester = createContinuousSeriesHitTesterCreator(function(rotated) {
  var path2 = area_default();
  var hitArea = rotated ? dRotateArea : dArea;
  if (rotated) {
    path2.x1(hitArea.x1());
    path2.x0(hitArea.x0());
    path2.y(hitArea.y());
  } else {
    path2.x(hitArea.x());
    path2.y1(hitArea.y1());
    path2.y0(hitArea.y0());
  }
  return path2;
});
var createLineHitTester = createContinuousSeriesHitTesterCreator(function(rotated) {
  var path2 = area_default();
  var hitLine = rotated ? dRotateLine : dLine;
  if (rotated) {
    var getX_1 = hitLine.x();
    path2.y(hitLine.y());
    path2.x0(function(point6) {
      return getX_1(point6) + LINE_TOLERANCE;
    });
    path2.x1(function(point6) {
      return getX_1(point6) - LINE_TOLERANCE;
    });
  } else {
    var getY_1 = hitLine.y();
    path2.x(hitLine.x());
    path2.y1(function(point6) {
      return getY_1(point6) - LINE_TOLERANCE;
    });
    path2.y0(function(point6) {
      return getY_1(point6) + LINE_TOLERANCE;
    });
  }
  return path2;
});
var createSplineHitTester = createContinuousSeriesHitTesterCreator(function(rotated) {
  var path2 = area_default();
  var hitSpline = rotated ? dRotateSpline : dSpline;
  if (rotated) {
    var getX_2 = hitSpline.x();
    path2.y(hitSpline.y());
    path2.x1(function(point6) {
      return getX_2(point6) - LINE_TOLERANCE;
    });
    path2.x0(function(point6) {
      return getX_2(point6) + LINE_TOLERANCE;
    });
  } else {
    var getY_2 = hitSpline.y();
    path2.x(hitSpline.x());
    path2.y1(function(point6) {
      return getY_2(point6) - LINE_TOLERANCE;
    });
    path2.y0(function(point6) {
      return getY_2(point6) + LINE_TOLERANCE;
    });
  }
  path2.curve(hitSpline.curve());
  return path2;
});
var hitTestRect = function(dx, dy, halfX, halfY) {
  return Math.abs(dx) <= halfX && Math.abs(dy) <= halfY ? {
    distance: getSegmentLength(dx, dy)
  } : null;
};
var createBarHitTester = createPointsEnumeratingHitTesterCreator(function(_a3, point6, rotated) {
  var _b2 = __read3(_a3, 2), px = _b2[0], py = _b2[1];
  var _c = point6, arg = _c.arg, val = _c.val, startVal = _c.startVal, barWidth = _c.barWidth, maxBarWidth = _c.maxBarWidth;
  var halfWidth = maxBarWidth * barWidth / 2;
  var halfHeight = Math.abs(val - startVal) / 2;
  var centerVal = (val + startVal) / 2;
  var xCenter = rotated ? centerVal : arg;
  var yCenter = rotated ? arg : centerVal;
  return hitTestRect(px - xCenter, py - yCenter, rotated ? halfHeight : halfWidth, rotated ? halfWidth : halfHeight);
});
var createScatterHitTester = createPointsEnumeratingHitTesterCreator(function(_a3, obj, rotated) {
  var _b2 = __read3(_a3, 2), px = _b2[0], py = _b2[1];
  var point6 = obj.point;
  var distance = getDistance([px, py], obj, rotated);
  return distance <= point6.size / 2 ? { distance } : null;
});
var mapAngleTod3 = function(angle) {
  var ret = angle + Math.PI / 2;
  return ret >= 0 ? ret : ret + Math.PI * 2;
};
var createPieHitTester = createPointsEnumeratingHitTesterCreator(function(_a3, point6) {
  var _b2 = __read3(_a3, 2), px = _b2[0], py = _b2[1];
  var _c = point6, x2 = _c.arg, y2 = _c.val, innerRadius = _c.innerRadius, outerRadius = _c.outerRadius, startAngle = _c.startAngle, maxRadius = _c.maxRadius, endAngle = _c.endAngle;
  var inner = innerRadius * maxRadius;
  var outer = outerRadius * maxRadius;
  var rCenter = (inner + outer) / 2;
  var angleCenter = (startAngle + endAngle) / 2;
  var halfRadius = (outer - inner) / 2;
  var halfAngle = Math.abs(startAngle - endAngle) / 2;
  var dx = px - x2;
  var dy = py - y2;
  var r = getSegmentLength(dx, dy);
  var angle = mapAngleTod3(Math.atan2(dy, dx));
  return hitTestRect(r - rCenter, angle - angleCenter, halfRadius, halfAngle);
});
var buildFilter = function(targets) {
  var result = {};
  targets.forEach(function(_a3) {
    var series2 = _a3.series, point6 = _a3.point;
    (result[series2] = result[series2] || /* @__PURE__ */ new Set()).add(point6);
  });
  return result;
};
var changeSeriesState = function(seriesList, targets, state) {
  if (targets.length === 0) {
    return seriesList;
  }
  var filter3 = buildFilter(targets);
  var matches = 0;
  var result = seriesList.map(function(seriesItem) {
    var set2 = filter3[seriesItem.name];
    if (!set2) {
      return seriesItem;
    }
    matches += 1;
    var props = { state };
    if (set2.size) {
      props.points = seriesItem.points.map(function(point6) {
        return set2.has(point6.index) ? __assign2(__assign2({}, point6), { state }) : point6;
      });
    }
    return __assign2(__assign2({}, seriesItem), props);
  });
  return matches > 0 ? result : seriesList;
};
var getDefaultLegendItems = function(series2) {
  return series2.map(function(_a3) {
    var text = _a3.name, color = _a3.color;
    return { text, color };
  });
};
var getPieLegendItems = function(series2) {
  return series2[0].points.map(function(_a3) {
    var text = _a3.argument, color = _a3.color;
    return { text, color };
  });
};
var isSinglePieSeriesCase = function(series2) {
  return series2.length === 1 && "innerRadius" in series2[0] && "outerRadius" in series2[0];
};
var getLegendItems = function(series2) {
  return (isSinglePieSeriesCase(series2) ? getPieLegendItems : getDefaultLegendItems)(series2);
};
var DISTANCE_THRESHOLD = 20;
var compareHitTargets = function(t13, t2) {
  var distanceDelta = t13.distance - t2.distance;
  if (Math.abs(distanceDelta) <= DISTANCE_THRESHOLD) {
    var orderDelta = t2.order - t13.order;
    return orderDelta !== 0 ? orderDelta : distanceDelta;
  }
  return distanceDelta;
};
var buildEventHandler = function(seriesList, handlers) {
  var hitTesters = null;
  var createHitTesters = function() {
    var obj = {};
    seriesList.forEach(function(seriesItem) {
      obj[seriesItem.symbolName] = seriesItem.createHitTester(seriesItem.points, seriesItem.rotated);
    });
    return obj;
  };
  return function(e) {
    var location = getEventCoords(e, getOffset(e.currentTarget));
    hitTesters = hitTesters || createHitTesters();
    var targets = [];
    seriesList.forEach(function(_a3) {
      var series2 = _a3.name, order = _a3.index, symbolName = _a3.symbolName;
      var status = hitTesters[symbolName](location);
      if (status) {
        targets.push.apply(targets, __spreadArray3([], __read3(status.points.map(function(point6) {
          return {
            series: series2,
            order,
            point: point6.index,
            distance: point6.distance
          };
        })), false));
      }
    });
    targets.sort(compareHitTargets);
    var arg = { location, targets, event: e.nativeEvent };
    handlers.forEach(function(handler) {
      return handler(arg);
    });
  };
};
var buildLeaveEventHandler = function(handlers) {
  return function(e) {
    var location = getEventCoords(e, getOffset(e.currentTarget));
    var arg = { location, targets: [] };
    handlers.forEach(function(handler) {
      return handler(arg);
    });
  };
};
var buildEventHandlers = function(seriesList, _a3) {
  var clickHandlers = _a3.clickHandlers, pointerMoveHandlers = _a3.pointerMoveHandlers;
  var handlers = {};
  if (!hasWindow())
    return handlers;
  if (clickHandlers.length) {
    handlers.click = buildEventHandler(seriesList, clickHandlers);
  }
  if (pointerMoveHandlers.length) {
    var moveHandler = buildEventHandler(seriesList, pointerMoveHandlers);
    var leaveHandler = buildLeaveEventHandler(pointerMoveHandlers);
    if ("ontouchstart" in window) {
      handlers.touchstart = moveHandler;
    } else {
      handlers.mousemove = moveHandler;
      handlers.mouseleave = leaveHandler;
    }
  }
  return handlers;
};
var getProgress = function(_a3) {
  var elapsed = _a3.elapsed, total = _a3.total;
  return Math.min(elapsed / total, 1);
};
var runAnimation = function(setAttributes, getNewPositions, easing, duration, delay) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      var time2 = {
        start: Date.now(),
        total: duration,
        elapsed: 0
      };
      var step = function() {
        time2.elapsed = Date.now() - time2.start;
        var progress = getProgress(time2);
        setAttributes(getNewPositions(easing(progress)));
        if (progress < 1)
          requestAnimationFrame(step);
      };
      resolve(requestAnimationFrame(step));
    }, delay);
  });
};
var buildAnimation = function(easing, duration) {
  return function(startCoords, endCoords, processAnimation, setAttributes, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    var animationID;
    var stop = function() {
      if (animationID) {
        cancelAnimationFrame(animationID);
        animationID = void 0;
      }
    };
    var run = function(start, end, delayValue) {
      animationID = runAnimation(setAttributes, processAnimation(start, end), easing, duration, delayValue).then(function(res) {
        animationID = res;
      });
    };
    run(startCoords, endCoords, delay);
    return {
      update: function(updatedStartCoords, updatedEndCoords, updatedDelay) {
        if (updatedDelay === void 0) {
          updatedDelay = 0;
        }
        stop();
        run(updatedStartCoords, updatedEndCoords, updatedDelay);
      },
      stop
    };
  };
};
var lerp = function(a2, b, t) {
  return a2 + t * (b - a2);
};
var processPointAnimation = function(startCoords, endCoords) {
  return function(progress) {
    return {
      arg: lerp(startCoords.arg, endCoords.arg, progress),
      val: lerp(startCoords.val, endCoords.val, progress)
    };
  };
};
var processBarAnimation = function(startCoords, endCoords) {
  return function(progress) {
    return {
      arg: lerp(startCoords.arg, endCoords.arg, progress),
      val: lerp(startCoords.val, endCoords.val, progress),
      startVal: lerp(startCoords.startVal, endCoords.startVal, progress)
    };
  };
};
var processLineAnimation = function(_a3, _b2) {
  var coordinates = _a3.coordinates;
  var endCoordinates = _b2.coordinates;
  return function(progress) {
    return {
      coordinates: endCoordinates.map(function(coord, index3) {
        var startCurCoord = coordinates[index3];
        return __assign2(__assign2({}, coord), { arg: lerp(startCurCoord.arg, coord.arg, progress), val: lerp(startCurCoord.val, coord.val, progress) });
      })
    };
  };
};
var processAreaAnimation = function(_a3, _b2) {
  var coordinates = _a3.coordinates;
  var endCoordinates = _b2.coordinates;
  return function(progress) {
    return {
      coordinates: endCoordinates.map(function(coord, index3) {
        var startCurCoord = coordinates[index3];
        return __assign2(__assign2({}, coord), { arg: lerp(startCurCoord.arg, coord.arg, progress), val: lerp(startCurCoord.val, coord.val, progress), startVal: lerp(startCurCoord.startVal, coord.startVal, progress) });
      })
    };
  };
};
var processPieAnimation = function(start, end) {
  return function(progress) {
    return {
      innerRadius: lerp(start.innerRadius, end.innerRadius, progress),
      outerRadius: lerp(start.outerRadius, end.outerRadius, progress),
      startAngle: lerp(start.startAngle, end.startAngle, progress),
      endAngle: lerp(start.endAngle, end.endAngle, progress)
    };
  };
};

// node_modules/@devexpress/dx-react-chart/dist/dx-react-chart.es.js
var extendStatics2 = function(d, b) {
  extendStatics2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2)
      if (Object.prototype.hasOwnProperty.call(b2, p))
        d2[p] = b2[p];
  };
  return extendStatics2(d, b);
};
function __extends2(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics2(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign3 = function() {
  __assign3 = Object.assign || function __assign4(t) {
    for (var s2, i = 1, n = arguments.length; i < n; i++) {
      s2 = arguments[i];
      for (var p in s2)
        if (Object.prototype.hasOwnProperty.call(s2, p))
          t[p] = s2[p];
    }
    return t;
  };
  return __assign3.apply(this, arguments);
};
function __rest3(s2, e) {
  var t = {};
  for (var p in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p) && e.indexOf(p) < 0)
      t[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s2); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i]))
        t[p[i]] = s2[p[i]];
    }
  return t;
}
function __read4(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
}
function __spreadArray4(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || from);
}
var series = [];
var BasicData = function(_a3) {
  var data = _a3.data, rotated = _a3.rotated;
  return (0, import_react2.createElement)(
    Plugin,
    { name: "Basis" },
    (0, import_react2.createElement)(Getter, { name: "data", value: data }),
    (0, import_react2.createElement)(Getter, { name: "domains", value: defaultDomains }),
    (0, import_react2.createElement)(Getter, { name: "series", value: series }),
    (0, import_react2.createElement)(Getter, { name: "rotated", value: rotated })
  );
};
var getScales = function(_a3) {
  var domains = _a3.domains, ranges = _a3.ranges;
  return buildScales(domains, ranges);
};
var getSeries = function(_a3) {
  var series2 = _a3.series, scales = _a3.scales, rotated = _a3.rotated;
  return scaleSeriesPoints(series2, scales, rotated);
};
var ChartCore = function(_super) {
  __extends2(ChartCore2, _super);
  function ChartCore2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  ChartCore2.prototype.render = function() {
    return (0, import_react2.createElement)(
      Plugin,
      null,
      (0, import_react2.createElement)(Getter, { name: "scales", computed: getScales }),
      (0, import_react2.createElement)(Getter, { name: "series", computed: getSeries })
    );
  };
  return ChartCore2;
}(import_react2.PureComponent);
var AxesLayout = function(_super) {
  __extends2(AxesLayout2, _super);
  function AxesLayout2() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.ref = (0, import_react2.createRef)();
    return _this;
  }
  AxesLayout2.prototype.render = function() {
    return (0, import_react2.createElement)(
      Plugin,
      null,
      (0, import_react2.createElement)(Getter, { name: "centerDivRef", value: this.ref }),
      (0, import_react2.createElement)(
        Template,
        { name: "canvas" },
        (0, import_react2.createElement)(
          "div",
          { id: "center-center", ref: this.ref, style: { display: "flex", flexDirection: "column", flexGrow: 1 } },
          (0, import_react2.createElement)(
            "div",
            { id: "".concat(TOP, "-axis-container"), style: { display: "flex", flexDirection: "row" } },
            (0, import_react2.createElement)(TemplatePlaceholder, { name: "".concat(TOP, "-").concat(LEFT, "-axis") }),
            (0, import_react2.createElement)(TemplatePlaceholder, { name: "".concat(TOP, "-axis") }),
            (0, import_react2.createElement)(TemplatePlaceholder, { name: "".concat(TOP, "-").concat(RIGHT, "-axis") })
          ),
          (0, import_react2.createElement)(
            "div",
            { id: "center-axis-container", style: { display: "flex", flexDirection: "row", flexGrow: 1 } },
            (0, import_react2.createElement)(TemplatePlaceholder, { name: "".concat(LEFT, "-axis") }),
            (0, import_react2.createElement)(TemplatePlaceholder, null),
            (0, import_react2.createElement)(TemplatePlaceholder, { name: "".concat(RIGHT, "-axis") })
          ),
          (0, import_react2.createElement)(
            "div",
            { id: "".concat(BOTTOM, "-axis-container"), style: { display: "flex", flexDirection: "row" } },
            (0, import_react2.createElement)(TemplatePlaceholder, { name: "".concat(BOTTOM, "-").concat(LEFT, "-axis") }),
            (0, import_react2.createElement)(TemplatePlaceholder, { name: "".concat(BOTTOM, "-axis") }),
            (0, import_react2.createElement)(TemplatePlaceholder, { name: "".concat(BOTTOM, "-").concat(RIGHT, "-axis") })
          )
        )
      )
    );
  };
  return AxesLayout2;
}(import_react2.PureComponent);
var SpaceFillingRects = function(_super) {
  __extends2(SpaceFillingRects2, _super);
  function SpaceFillingRects2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  SpaceFillingRects2.prototype.render = function() {
    var placeholders2 = this.props.placeholders;
    return (0, import_react2.createElement)(Plugin, { name: "SpaceFillingRects" }, placeholders2.map(function(name) {
      return (0, import_react2.createElement)(
        Template,
        { name, key: name },
        (0, import_react2.createElement)(TemplateConnector, null, function(_a3) {
          var layouts = _a3.layouts;
          var key = name.slice(name.indexOf("-") + 1);
          var width = Object.keys(layouts).reduce(function(prev, cur) {
            if (cur.includes(key)) {
              return prev + layouts[cur].width;
            }
            return prev;
          }, 0);
          return (0, import_react2.createElement)("div", { id: name, style: { width } });
        })
      );
    }));
  };
  return SpaceFillingRects2;
}(import_react2.PureComponent);
var ControllerComponent = function(_super) {
  __extends2(ControllerComponent2, _super);
  function ControllerComponent2() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.isPreviousDataEmpty = true;
    _this.readyToRenderSeriesComputed = function(_a3) {
      var layouts = _a3.layouts, centerDivRef = _a3.centerDivRef, data = _a3.data, axesExist = _a3.axesExist;
      var isPreviousDataEmpty = _this.isPreviousDataEmpty;
      _this.isPreviousDataEmpty = !data.length;
      return isReadyToRenderSeries(layouts, centerDivRef, isPreviousDataEmpty, !!axesExist);
    };
    return _this;
  }
  ControllerComponent2.prototype.render = function() {
    return (0, import_react2.createElement)(
      Plugin,
      { name: "ControllerComponent" },
      (0, import_react2.createElement)(Getter, { name: "readyToRenderSeries", computed: this.readyToRenderSeriesComputed })
    );
  };
  return ControllerComponent2;
}(import_react2.PureComponent);
var EXTRA_PIXELS = 2;
var ClipPath = function(_super) {
  __extends2(ClipPath2, _super);
  function ClipPath2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  ClipPath2.prototype.render = function() {
    var _a3 = this.props, id = _a3.id, width = _a3.width, height = _a3.height;
    return (0, import_react2.createElement)(
      "defs",
      null,
      (0, import_react2.createElement)(
        "clipPath",
        { id },
        (0, import_react2.createElement)("rect", { x: -EXTRA_PIXELS / 2, y: -EXTRA_PIXELS / 2, width: width + EXTRA_PIXELS, height: height + EXTRA_PIXELS })
      )
    );
  };
  return ClipPath2;
}(import_react2.PureComponent);
var UpdatableSizer = function(_super) {
  __extends2(UpdatableSizer2, _super);
  function UpdatableSizer2() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.ref = (0, import_react2.createRef)();
    return _this;
  }
  UpdatableSizer2.prototype.componentDidUpdate = function() {
    this.props.onSizeChange(this.ref.current.getSize());
  };
  UpdatableSizer2.prototype.render = function() {
    return (0, import_react2.createElement)(Sizer, __assign3({ ref: this.ref }, this.props));
  };
  return UpdatableSizer2;
}(import_react2.PureComponent);
var DIV_STYLE = {
  flex: 1,
  zIndex: 1,
  position: "relative",
  width: "100%"
};
var SVG_STYLE = {
  position: "absolute",
  left: 0,
  top: 0,
  overflow: "visible"
};
var SizerContainer = function(_a3) {
  var children = _a3.children, forwardedRef = _a3.forwardedRef;
  return (0, import_react2.createElement)("div", { ref: forwardedRef, style: DIV_STYLE }, children);
};
var numDefs = 0;
var getUniqueId = function() {
  numDefs += 1;
  return numDefs;
};
var PaneLayout = function(_super) {
  __extends2(PaneLayout2, _super);
  function PaneLayout2() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.ref = (0, import_react2.createRef)();
    _this.clipPathId = "clip_path_".concat(getUniqueId());
    return _this;
  }
  PaneLayout2.prototype.render = function() {
    var _this = this;
    return (0, import_react2.createElement)(
      Plugin,
      { name: "PaneLayout" },
      (0, import_react2.createElement)(Getter, { name: "rootRef", value: this.ref }),
      (0, import_react2.createElement)(Getter, { name: "clipPathId", value: this.clipPathId }),
      (0, import_react2.createElement)(Template, { name: "canvas" }, function(params) {
        return (0, import_react2.createElement)(TemplateConnector, null, function(_a3, _b2) {
          var layouts = _a3.layouts;
          var changeBBox = _b2.changeBBox;
          var _c = layouts.pane, width = _c.width, height = _c.height;
          return (0, import_react2.createElement)(
            UpdatableSizer,
            { containerComponent: SizerContainer, onSizeChange: function(size) {
              return changeBBox({ placeholder: "pane", bBox: size });
            } },
            (0, import_react2.createElement)(
              "svg",
              __assign3({ ref: _this.ref }, params, { width, height, style: SVG_STYLE }),
              (0, import_react2.createElement)(ClipPath, { id: _this.clipPathId, width, height }),
              (0, import_react2.createElement)(TemplatePlaceholder, { name: "series" })
            )
          );
        });
      })
    );
  };
  return PaneLayout2;
}(import_react2.PureComponent);
var doGetRanges = function(_a3) {
  var layouts = _a3.layouts, rotated = _a3.rotated;
  return getRanges(layouts.pane, rotated);
};
var LayoutManager = function(_super) {
  __extends2(LayoutManager2, _super);
  function LayoutManager2(props) {
    var _this = _super.call(this, props) || this;
    _this.state = { bBoxes: { pane: { width: 0, height: 0 } } };
    var stateHelper = createStateHelper(_this);
    _this.changeBBox = stateHelper.applyFieldReducer.bind(stateHelper, "bBoxes", bBoxes);
    return _this;
  }
  LayoutManager2.prototype.render = function() {
    var _a3 = this.props, width = _a3.width, height = _a3.height, Root2 = _a3.rootComponent, restProps = __rest3(_a3, ["width", "height", "rootComponent"]);
    var stateBBoxes = this.state.bBoxes;
    return (0, import_react2.createElement)(
      Plugin,
      null,
      (0, import_react2.createElement)(Getter, { name: "layouts", value: stateBBoxes }),
      (0, import_react2.createElement)(Getter, { name: "ranges", computed: doGetRanges }),
      (0, import_react2.createElement)(Action, { name: "changeBBox", action: this.changeBBox }),
      (0, import_react2.createElement)(
        Template,
        { name: "root" },
        (0, import_react2.createElement)(
          Root2,
          __assign3({ width, height }, restProps),
          (0, import_react2.createElement)(TemplatePlaceholder, { name: "canvas" })
        )
      )
    );
  };
  LayoutManager2.defaultProps = {
    width: 0
  };
  return LayoutManager2;
}(import_react2.PureComponent);
var ComponentLayout = function() {
  return (0, import_react2.createElement)(
    Plugin,
    { name: "ComponentLayout" },
    (0, import_react2.createElement)(
      Template,
      { name: "canvas" },
      (0, import_react2.createElement)(
        "div",
        { id: "".concat(TOP, "-container"), style: { display: "flex", flexDirection: "row" } },
        (0, import_react2.createElement)(TemplatePlaceholder, { name: "".concat(TOP, "-").concat(LEFT) }),
        (0, import_react2.createElement)(TemplatePlaceholder, { name: TOP }),
        (0, import_react2.createElement)(TemplatePlaceholder, { name: "".concat(TOP, "-").concat(RIGHT) })
      ),
      (0, import_react2.createElement)(
        "div",
        { id: "center-container", style: { display: "flex", flexDirection: "row", flexGrow: 1 } },
        (0, import_react2.createElement)(TemplatePlaceholder, { name: LEFT }),
        (0, import_react2.createElement)(TemplatePlaceholder, null),
        (0, import_react2.createElement)(TemplatePlaceholder, { name: RIGHT })
      ),
      (0, import_react2.createElement)(
        "div",
        { id: "".concat(BOTTOM, "-container"), style: { display: "flex", flexDirection: "row" } },
        (0, import_react2.createElement)(TemplatePlaceholder, { name: "".concat(BOTTOM, "-").concat(LEFT) }),
        (0, import_react2.createElement)(TemplatePlaceholder, { name: BOTTOM }),
        (0, import_react2.createElement)(TemplatePlaceholder, { name: "".concat(BOTTOM, "-").concat(RIGHT) })
      )
    )
  );
};
var PaletteBase = function(_super) {
  __extends2(PaletteBase2, _super);
  function PaletteBase2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  PaletteBase2.prototype.render = function() {
    var scheme2 = this.props.scheme;
    return (0, import_react2.createElement)(
      Plugin,
      { name: "Palette" },
      (0, import_react2.createElement)(Getter, { name: "palette", value: scheme2 })
    );
  };
  return PaletteBase2;
}(import_react2.PureComponent);
var Palette = PaletteBase;
var Root = function(_super) {
  __extends2(Root2, _super);
  function Root2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  Root2.prototype.render = function() {
    var _a3 = this.props, children = _a3.children, width = _a3.width, height = _a3.height, style = _a3.style, restProps = __rest3(_a3, ["children", "width", "height", "style"]);
    return (0, import_react2.createElement)("div", __assign3({ style: __assign3(__assign3(__assign3({}, style), { height: "".concat(height, "px") }), width ? { width: "".concat(width, "px") } : null) }, restProps), children);
  };
  return Root2;
}(import_react2.PureComponent);
var Label = function(_super) {
  __extends2(Label2, _super);
  function Label2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  Label2.prototype.render = function() {
    return (0, import_react2.createElement)("text", __assign3({}, this.props));
  };
  return Label2;
}(import_react2.PureComponent);
var scheme = [];
var placeholders = [
  "".concat(TOP, "-").concat(LEFT),
  "".concat(TOP, "-").concat(RIGHT),
  "".concat(BOTTOM, "-").concat(LEFT),
  "".concat(BOTTOM, "-").concat(RIGHT),
  "".concat(TOP, "-").concat(LEFT, "-axis"),
  "".concat(TOP, "-").concat(RIGHT, "-axis"),
  "".concat(BOTTOM, "-").concat(LEFT, "-axis"),
  "".concat(BOTTOM, "-").concat(RIGHT, "-axis")
];
var RawChart = function(_super) {
  __extends2(RawChart2, _super);
  function RawChart2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  RawChart2.prototype.render = function() {
    var _a3 = this.props, data = _a3.data, width = _a3.width, height = _a3.height, children = _a3.children, rotated = _a3.rotated, rootComponent = _a3.rootComponent, restProps = __rest3(_a3, ["data", "width", "height", "children", "rotated", "rootComponent"]);
    return (0, import_react2.createElement)(
      PluginHost2,
      null,
      (0, import_react2.createElement)(BasicData, { data, rotated }),
      (0, import_react2.createElement)(Palette, { scheme }),
      (0, import_react2.createElement)(LayoutManager, __assign3({ width, height, rootComponent }, restProps)),
      (0, import_react2.createElement)(PaneLayout, null),
      (0, import_react2.createElement)(AxesLayout, null),
      (0, import_react2.createElement)(ComponentLayout, null),
      (0, import_react2.createElement)(SpaceFillingRects, { placeholders }),
      children,
      (0, import_react2.createElement)(ControllerComponent, null),
      (0, import_react2.createElement)(ChartCore, null)
    );
  };
  RawChart2.defaultProps = {
    height: 500,
    rotated: false
  };
  RawChart2.components = {
    rootComponent: "Root"
  };
  return RawChart2;
}(import_react2.PureComponent);
var Chart = withComponents({ Root })(RawChart);
Chart.Label = Label;
var Marker = function(_super) {
  __extends2(Marker2, _super);
  function Marker2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  Marker2.prototype.render = function() {
    var _a3 = this.props, color = _a3.color, restProps = __rest3(_a3, ["color"]);
    return (0, import_react2.createElement)(
      "svg",
      __assign3({ fill: color, width: "10", height: "10" }, restProps),
      (0, import_react2.createElement)("circle", __assign3({ r: 5, cx: 5, cy: 5 }, restProps))
    );
  };
  return Marker2;
}(import_react2.PureComponent);
var RawLegend = function(_super) {
  __extends2(RawLegend2, _super);
  function RawLegend2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  RawLegend2.prototype.render = function() {
    var _a3 = this.props, MarkerComponent = _a3.markerComponent, Label2 = _a3.labelComponent, Root2 = _a3.rootComponent, Item = _a3.itemComponent, position = _a3.position, getItems = _a3.getItems;
    var placeholder = position;
    return (0, import_react2.createElement)(
      Plugin,
      { name: "Legend" },
      (0, import_react2.createElement)(
        Template,
        { name: placeholder },
        (0, import_react2.createElement)(TemplatePlaceholder, null),
        (0, import_react2.createElement)(TemplateConnector, null, function(getters) {
          return (0, import_react2.createElement)(Root2, { name: "legend-".concat(placeholder) }, getItems(getters).map(function(_a4) {
            var text = _a4.text, color = _a4.color;
            return (0, import_react2.createElement)(
              Item,
              { key: text },
              (0, import_react2.createElement)(MarkerComponent, { name: text, color }),
              (0, import_react2.createElement)(Label2, { text })
            );
          }));
        })
      )
    );
  };
  RawLegend2.defaultProps = {
    position: "right",
    getItems: function(_a3) {
      var series2 = _a3.series;
      return getLegendItems(series2);
    }
  };
  RawLegend2.components = {
    rootComponent: "Root",
    itemComponent: "Item",
    markerComponent: "Marker",
    labelComponent: "Label"
  };
  return RawLegend2;
}(import_react2.PureComponent);
var Legend = withComponents({ Marker })(RawLegend);
var TitleBase = function(_super) {
  __extends2(TitleBase2, _super);
  function TitleBase2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  TitleBase2.prototype.render = function() {
    var _a3 = this.props, Text = _a3.textComponent, text = _a3.text, position = _a3.position;
    var placeholder = position;
    return (0, import_react2.createElement)(
      Plugin,
      { name: "Title" },
      (0, import_react2.createElement)(
        Template,
        { name: placeholder },
        (0, import_react2.createElement)(TemplatePlaceholder, null),
        (0, import_react2.createElement)(Text, { text })
      )
    );
  };
  TitleBase2.components = {
    textComponent: "Text"
  };
  TitleBase2.defaultProps = {
    position: "top"
  };
  return TitleBase2;
}(import_react2.PureComponent);
var Title = TitleBase;
var declareSeries = function(pluginName, _a3) {
  var components = _a3.components, getPointTransformer = _a3.getPointTransformer, createHitTester = _a3.createHitTester;
  var Component2 = function(_super) {
    __extends2(Component3, _super);
    function Component3() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    Component3.prototype.render = function() {
      var _a4 = this.props, name = _a4.name, argumentField = _a4.argumentField, valueField = _a4.valueField, scaleName = _a4.scaleName, seriesComponent = _a4.seriesComponent, pointComponent = _a4.pointComponent, color = _a4.color, restProps = __rest3(_a4, ["name", "argumentField", "valueField", "scaleName", "seriesComponent", "pointComponent", "color"]);
      var symbolName = Symbol(name);
      var seriesItem = __assign3(__assign3({ getPointTransformer, createHitTester }, this.props), { symbolName });
      var getSeries2 = function(_a5) {
        var series2 = _a5.series, data = _a5.data, palette = _a5.palette;
        return addSeries(series2, data, palette, seriesItem, restProps);
      };
      var getDomains2 = function(_a5) {
        var series2 = _a5.series, domains = _a5.domains;
        return extendDomains(domains, findSeriesByName(symbolName, series2));
      };
      return (0, import_react2.createElement)(
        Plugin,
        { name: pluginName },
        (0, import_react2.createElement)(Getter, { name: "series", computed: getSeries2 }),
        (0, import_react2.createElement)(Getter, { name: "domains", computed: getDomains2 }),
        (0, import_react2.createElement)(
          Template,
          { name: "series" },
          (0, import_react2.createElement)(TemplatePlaceholder, null),
          (0, import_react2.createElement)(TemplateConnector, null, function(_a5) {
            var series2 = _a5.series, scales = _a5.scales, animation = _a5.animation, rotated = _a5.rotated, layouts = _a5.layouts, clipPathId = _a5.clipPathId, readyToRenderSeries = _a5.readyToRenderSeries;
            var pane = layouts.pane;
            var currentSeries = findSeriesByName(symbolName, series2);
            var currentScales = {
              argScale: scales[ARGUMENT_DOMAIN],
              valScale: scales[getValueDomainName(currentSeries.scaleName)]
            };
            var Path3 = currentSeries.seriesComponent;
            return (0, import_react2.createElement)(Path3, { index: currentSeries.index, pointComponent: currentSeries.pointComponent, coordinates: currentSeries.points, rotated, state: currentSeries.state, color: currentSeries.color, scales: currentScales, pane, clipPathId, animation, readyToRenderSeries });
          })
        )
      );
    };
    Component3.defaultProps = {
      name: "defaultSeriesName"
    };
    return Component3;
  }(import_react2.PureComponent);
  Component2.components = {};
  if (components.Path) {
    Component2.components.seriesComponent = "Path";
  }
  if (components.Point) {
    Component2.components.pointComponent = "Point";
  }
  return withComponents(components)(Component2);
};
var withPatchedProps = function(patch) {
  return function(Target) {
    var Component2 = function(_super) {
      __extends2(Component3, _super);
      function Component3() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Component3.prototype.render = function() {
        var props = patch(this.props);
        return (0, import_react2.createElement)(Target, __assign3({}, props));
      };
      Component3.components = Target.components;
      return Component3;
    }(import_react2.PureComponent);
    return Component2;
  };
};
var Scale = function(_super) {
  __extends2(Scale2, _super);
  function Scale2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  Scale2.prototype.render = function() {
    var _a3 = this.props, name = _a3.name, factory = _a3.factory, modifyDomain = _a3.modifyDomain;
    var args = { factory, modifyDomain };
    var getDomains2 = function(_a4) {
      var domains = _a4.domains;
      return addDomain(domains, name, args);
    };
    return (0, import_react2.createElement)(
      Plugin,
      { name: "Scale" },
      (0, import_react2.createElement)(Getter, { name: "domains", computed: getDomains2 })
    );
  };
  return Scale2;
}(import_react2.PureComponent);
var ArgumentScale = withPatchedProps(function(props) {
  return __assign3(__assign3({}, props), { name: ARGUMENT_DOMAIN });
})(Scale);
var ValueScale = withPatchedProps(function(props) {
  return __assign3(__assign3({}, props), { name: getValueDomainName(props.name) });
})(Scale);
var getDomains = function(_a3) {
  var domains = _a3.domains, series2 = _a3.series;
  return getStackedDomains(domains, series2);
};
var StackBase = function(_super) {
  __extends2(StackBase2, _super);
  function StackBase2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  StackBase2.prototype.render = function() {
    var _a3 = this.props, stacks = _a3.stacks, offset = _a3.offset, order = _a3.order;
    var params = {
      stacks,
      offset,
      order
    };
    var getSeries2 = function(_a4) {
      var series2 = _a4.series, data = _a4.data;
      return getStackedSeries(series2, data, params);
    };
    return (0, import_react2.createElement)(
      Plugin,
      { name: "Stack" },
      (0, import_react2.createElement)(Getter, { name: "series", computed: getSeries2 }),
      (0, import_react2.createElement)(Getter, { name: "domains", computed: getDomains })
    );
  };
  StackBase2.defaultProps = {
    stacks: [],
    offset: diverging_default,
    order: none_default2
  };
  return StackBase2;
}(import_react2.PureComponent);
var Stack = StackBase;
var AnimationBase = function(_super) {
  __extends2(AnimationBase2, _super);
  function AnimationBase2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  AnimationBase2.prototype.render = function() {
    var _a3 = this.props, easing = _a3.easing, duration = _a3.duration;
    var buildAnimationGetter = function() {
      return buildAnimation(easing, duration);
    };
    return (0, import_react2.createElement)(
      Plugin,
      { name: "Animation" },
      (0, import_react2.createElement)(Getter, { name: "animation", computed: buildAnimationGetter })
    );
  };
  AnimationBase2.defaultProps = {
    easing: easeOutCubic,
    duration: 1e3
  };
  return AnimationBase2;
}(import_react2.PureComponent);
var Animation = AnimationBase;
var withStates = function(states) {
  return function(Component2) {
    var ComponentWithStates = function(_super) {
      __extends2(ComponentWithStates2, _super);
      function ComponentWithStates2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      ComponentWithStates2.prototype.render = function() {
        var _a3 = this.props, state = _a3.state, restProps = __rest3(_a3, ["state"]);
        var stateFunc = state && states[state];
        var result = stateFunc ? stateFunc(restProps) : restProps;
        return (0, import_react2.isValidElement)(result) ? result : (0, import_react2.createElement)(Component2, __assign3({}, result));
      };
      return ComponentWithStates2;
    }(import_react2.PureComponent);
    return ComponentWithStates;
  };
};
var Pattern = function(_super) {
  __extends2(Pattern2, _super);
  function Pattern2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  Pattern2.prototype.render = function() {
    var _a3 = this.props, id = _a3.id, size = _a3.size, color = _a3.color, opacity = _a3.opacity;
    return (0, import_react2.createElement)(
      "defs",
      null,
      (0, import_react2.createElement)(
        "pattern",
        { id, width: size, height: size, patternUnits: "userSpaceOnUse" },
        (0, import_react2.createElement)("rect", { x: 0, y: 0, width: size, height: size, fill: color, opacity }),
        (0, import_react2.createElement)("path", {
          // tslint:disable-next-line: max-line-length
          d: "M ".concat(size / 2, " ").concat(-size / 2, " L ").concat(-size / 2, " ").concat(size / 2, " M 0 ").concat(size, " L ").concat(size, " 0 M ").concat(size * 1.5, " ").concat(size / 2, " L ").concat(size / 2, " ").concat(size * 1.5),
          strokeWidth: 2,
          stroke: color
        })
      )
    );
  };
  Pattern2.defaultProps = {
    size: 6,
    opacity: 0.75
  };
  return Pattern2;
}(import_react2.PureComponent);
var withPattern = function(getPatternId, props) {
  return function(Target) {
    return function(targetProps) {
      var color = targetProps.color, restProps = __rest3(targetProps, ["color"]);
      var patternId = getPatternId(targetProps);
      return (0, import_react2.createElement)(
        import_react2.Fragment,
        null,
        (0, import_react2.createElement)(Target, __assign3({ color: "url(#".concat(patternId, ")") }, restProps)),
        (0, import_react2.createElement)(Pattern, __assign3({ id: patternId, color }, props))
      );
    };
  };
};
var withAnimation = function(processAnimation, getProps, getStartCoordinates, isValuesChanged2, getDelay2) {
  return function(Component2) {
    var ComponentWithAnimation = function(_super) {
      __extends2(ComponentWithAnimation2, _super);
      function ComponentWithAnimation2(props) {
        var _this = _super.call(this, props) || this;
        _this.setAttribute = _this.setAttribute.bind(_this);
        return _this;
      }
      ComponentWithAnimation2.prototype.setAttribute = function(state) {
        this.setState(state);
      };
      ComponentWithAnimation2.prototype.componentDidMount = function() {
        var _a3 = this.props, animation = _a3.animation, scales = _a3.scales, index3 = _a3.index, readyToRenderSeries = _a3.readyToRenderSeries;
        if (!readyToRenderSeries) {
          return;
        }
        var props = getProps(this.props);
        this.processComponent(animation, { scales: {} }, scales, props, {}, index3);
      };
      ComponentWithAnimation2.prototype.componentDidUpdate = function(prevProps) {
        var _a3 = this.props, scales = _a3.scales, index3 = _a3.index, animation = _a3.animation, readyToRenderSeries = _a3.readyToRenderSeries;
        if (!readyToRenderSeries) {
          return;
        }
        this.processComponent(animation, prevProps, scales, getProps(this.props), getProps(prevProps), index3);
      };
      ComponentWithAnimation2.prototype.processComponent = function(animation, _a3, scales, props, prevProps, index3) {
        var prevScales = _a3.scales;
        if (!animation) {
          this.setAttribute(props);
        } else if (this.animate) {
          if (isScalesChanged(prevScales, scales)) {
            this.setAttribute(props);
          } else if (isValuesChanged2(prevProps, props)) {
            var delay = getDelay2 ? getDelay2(index3, false) : 0;
            this.animate.update(prevProps, props, delay);
          }
        } else {
          this.animate = animation(getStartCoordinates(scales, props), props, processAnimation, this.setAttribute, getDelay2 && getDelay2(index3, true));
        }
      };
      ComponentWithAnimation2.prototype.componentWillUnmount = function() {
        return this.animate && this.animate.stop();
      };
      ComponentWithAnimation2.prototype.render = function() {
        var _a3 = this.props, readyToRenderSeries = _a3.readyToRenderSeries, restProps = __rest3(_a3, ["readyToRenderSeries"]);
        if (!this.state) {
          return null;
        }
        return (0, import_react2.createElement)(Component2, __assign3({}, restProps, this.state));
      };
      return ComponentWithAnimation2;
    }(import_react2.PureComponent);
    return ComponentWithAnimation;
  };
};
var _a2;
var RawArea = function(_super) {
  __extends2(RawArea2, _super);
  function RawArea2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  RawArea2.prototype.render = function() {
    var _a3 = this.props, path2 = _a3.path, coordinates = _a3.coordinates, animation = _a3.animation, index3 = _a3.index, state = _a3.state, pointComponent = _a3.pointComponent, color = _a3.color, clipPathId = _a3.clipPathId, pane = _a3.pane, scales = _a3.scales, rotated = _a3.rotated, restProps = __rest3(_a3, ["path", "coordinates", "animation", "index", "state", "pointComponent", "color", "clipPathId", "pane", "scales", "rotated"]);
    var dPath = path2 === void 0 ? rotated ? dRotateArea : dArea : path2;
    return (0, import_react2.createElement)("path", __assign3({ clipPath: "url(#".concat(clipPathId, ")"), d: dPath(coordinates), fill: color, opacity: 0.5 }, restProps));
  };
  return RawArea2;
}(import_react2.PureComponent);
var Area = withAnimation(processAreaAnimation, function(_a3) {
  var coordinates = _a3.coordinates;
  return { coordinates };
}, getPathStart, isCoordinatesChanged)(withStates((_a2 = {}, _a2[HOVERED] = withPattern(function(_a3) {
  var index3 = _a3.index, color = _a3.color;
  return "series-".concat(index3, "-color-").concat(color, "-hover");
}, { opacity: 0.75 })(RawArea), _a2[SELECTED] = withPattern(function(_a3) {
  var index3 = _a3.index, color = _a3.color;
  return "series-".concat(index3, "-color-").concat(color, "-selection");
}, { opacity: 0.5 })(RawArea), _a2))(RawArea));
var AreaSeries = declareSeries("AreaSeries", {
  getPointTransformer: getAreaPointTransformer,
  createHitTester: createAreaHitTester,
  components: { Path: Area }
});
var PointCollection = function(_super) {
  __extends2(PointCollection2, _super);
  function PointCollection2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  PointCollection2.prototype.render = function() {
    var _a3 = this.props, pointComponent = _a3.pointComponent, coordinates = _a3.coordinates, index3 = _a3.index, state = _a3.state, clipPathId = _a3.clipPathId, restProps = __rest3(_a3, ["pointComponent", "coordinates", "index", "state", "clipPathId"]);
    var Point2 = pointComponent;
    return coordinates.map(function(point6) {
      return (0, import_react2.createElement)(Point2, __assign3({ key: String(point6.index), seriesIndex: index3 }, restProps, point6));
    });
  };
  return PointCollection2;
}(import_react2.PureComponent);
var _a$12;
var RawBar = function(_super) {
  __extends2(RawBar2, _super);
  function RawBar2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  RawBar2.prototype.render = function() {
    var _a3 = this.props, arg = _a3.arg, val = _a3.val, startVal = _a3.startVal, barWidth = _a3.barWidth, maxBarWidth = _a3.maxBarWidth, animation = _a3.animation, argument = _a3.argument, value = _a3.value, seriesIndex = _a3.seriesIndex, index3 = _a3.index, state = _a3.state, rotated = _a3.rotated, color = _a3.color, pane = _a3.pane, scales = _a3.scales, restProps = __rest3(_a3, ["arg", "val", "startVal", "barWidth", "maxBarWidth", "animation", "argument", "value", "seriesIndex", "index", "state", "rotated", "color", "pane", "scales"]);
    var width = barWidth * maxBarWidth;
    var bar = dBar(arg, val, startVal, width, rotated);
    var visibility = getVisibility(pane, bar.x + bar.width / 2, bar.y + bar.height, bar.width, bar.height);
    var adjustedBar = visibility === "visible" ? adjustBarSize(bar, pane) : bar;
    return (0, import_react2.createElement)("rect", __assign3({}, adjustedBar, { fill: color, visibility }, restProps));
  };
  return RawBar2;
}(import_react2.PureComponent);
var Bar = withAnimation(processBarAnimation, function(_a3) {
  var arg = _a3.arg, val = _a3.val, startVal = _a3.startVal;
  return { arg, val, startVal };
}, getPointStart, isValuesChanged)(withStates((_a$12 = {}, _a$12[HOVERED] = withPattern(function(_a3) {
  var seriesIndex = _a3.seriesIndex, index3 = _a3.index, color = _a3.color;
  return "series-".concat(seriesIndex, "-point-").concat(index3, "-color-").concat(color, "-hover");
}, { opacity: 0.75 })(RawBar), _a$12[SELECTED] = withPattern(function(_a3) {
  var seriesIndex = _a3.seriesIndex, index3 = _a3.index, color = _a3.color;
  return "series-".concat(seriesIndex, "-point-").concat(index3, "-color-").concat(color, "-selection");
}, { opacity: 0.5 })(RawBar), _a$12))(RawBar));
var BarSeries = declareSeries("BarSeries", {
  getPointTransformer: getBarPointTransformer,
  createHitTester: createBarHitTester,
  components: { Path: PointCollection, Point: Bar }
});
BarSeries.defaultProps = {
  barWidth: 0.9
};
var _a$2;
var RawPath = function(_super) {
  __extends2(RawPath2, _super);
  function RawPath2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  RawPath2.prototype.render = function() {
    var _a3 = this.props, path2 = _a3.path, animation = _a3.animation, coordinates = _a3.coordinates, rotated = _a3.rotated, index3 = _a3.index, state = _a3.state, pointComponent = _a3.pointComponent, color = _a3.color, clipPathId = _a3.clipPathId, scales = _a3.scales, pane = _a3.pane, restProps = __rest3(_a3, ["path", "animation", "coordinates", "rotated", "index", "state", "pointComponent", "color", "clipPathId", "scales", "pane"]);
    return (0, import_react2.createElement)("path", __assign3({ clipPath: "url(#".concat(clipPathId, ")"), d: path2(coordinates), fill: "none", strokeWidth: 2, stroke: color }, restProps));
  };
  return RawPath2;
}(import_react2.PureComponent);
var Path2 = withAnimation(processLineAnimation, function(_a3) {
  var coordinates = _a3.coordinates;
  return { coordinates };
}, getPathStart, isCoordinatesChanged)(withStates((_a$2 = {}, _a$2[HOVERED] = function(props) {
  return __assign3({ strokeWidth: 4 }, props);
}, _a$2[SELECTED] = function(props) {
  return __assign3({ strokeWidth: 4 }, props);
}, _a$2))(RawPath));
var Line = function(_super) {
  __extends2(Line2, _super);
  function Line2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  Line2.prototype.render = function() {
    var _a3 = this.props, rotated = _a3.rotated, path2 = _a3.path;
    var dPath = path2 === void 0 ? rotated ? dRotateLine : dLine : path2;
    return (0, import_react2.createElement)(Path2, __assign3({}, this.props, { path: dPath }));
  };
  return Line2;
}(import_react2.PureComponent);
var LineSeries = declareSeries("LineSeries", {
  getPointTransformer: getLinePointTransformer,
  createHitTester: createLineHitTester,
  components: { Path: Line }
});
var _a$3;
var RawSlice = function(_super) {
  __extends2(RawSlice2, _super);
  function RawSlice2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  RawSlice2.prototype.render = function() {
    var _a3 = this.props, arg = _a3.arg, val = _a3.val, rotated = _a3.rotated, argument = _a3.argument, value = _a3.value, seriesIndex = _a3.seriesIndex, index3 = _a3.index, state = _a3.state, maxRadius = _a3.maxRadius, innerRadius = _a3.innerRadius, outerRadius = _a3.outerRadius, startAngle = _a3.startAngle, endAngle = _a3.endAngle, color = _a3.color, animation = _a3.animation, pane = _a3.pane, scales = _a3.scales, restProps = __rest3(_a3, ["arg", "val", "rotated", "argument", "value", "seriesIndex", "index", "state", "maxRadius", "innerRadius", "outerRadius", "startAngle", "endAngle", "color", "animation", "pane", "scales"]);
    return (0, import_react2.createElement)(
      "g",
      { transform: "translate(".concat(arg, " ").concat(val, ")") },
      (0, import_react2.createElement)("path", __assign3({ d: dPie(maxRadius, innerRadius, outerRadius, startAngle, endAngle), fill: color, stroke: "none" }, restProps))
    );
  };
  return RawSlice2;
}(import_react2.PureComponent);
var Slice = withAnimation(processPieAnimation, function(_a3) {
  var innerRadius = _a3.innerRadius, outerRadius = _a3.outerRadius, startAngle = _a3.startAngle, endAngle = _a3.endAngle;
  return { innerRadius, outerRadius, startAngle, endAngle };
}, getPieStart, isValuesChanged, getDelay)(withStates((_a$3 = {}, _a$3[HOVERED] = withPattern(function(_a3) {
  var seriesIndex = _a3.seriesIndex, index3 = _a3.index, color = _a3.color;
  return "series-".concat(seriesIndex, "-point-").concat(index3, "-color-").concat(color, "-hover");
}, { opacity: 0.75 })(RawSlice), _a$3[SELECTED] = withPattern(function(_a3) {
  var seriesIndex = _a3.seriesIndex, index3 = _a3.index, color = _a3.color;
  return "series-".concat(seriesIndex, "-point-").concat(index3, "-color-").concat(color, "-selection");
}, { opacity: 0.5 })(RawSlice), _a$3))(RawSlice));
var PieSeries = declareSeries("PieSeries", {
  getPointTransformer: getPiePointTransformer,
  createHitTester: createPieHitTester,
  components: { Path: PointCollection, Point: Slice }
});
PieSeries.defaultProps = {
  innerRadius: 0,
  outerRadius: 1
};
var _a$4;
var RawPoint = function(_super) {
  __extends2(RawPoint2, _super);
  function RawPoint2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  RawPoint2.prototype.render = function() {
    var _a3 = this.props, arg = _a3.arg, val = _a3.val, rotated = _a3.rotated, animation = _a3.animation, argument = _a3.argument, value = _a3.value, seriesIndex = _a3.seriesIndex, index3 = _a3.index, state = _a3.state, pointOptions = _a3.point, color = _a3.color, pane = _a3.pane, scales = _a3.scales, restProps = __rest3(_a3, ["arg", "val", "rotated", "animation", "argument", "value", "seriesIndex", "index", "state", "point", "color", "pane", "scales"]);
    var x2 = rotated ? val : arg;
    var y2 = rotated ? arg : val;
    var visibility = getVisibility(pane, x2, y2, 0, 0);
    return (0, import_react2.createElement)("path", __assign3({ transform: "translate(".concat(x2, " ").concat(y2, ")"), d: dSymbol(pointOptions), fill: color, visibility, stroke: "none" }, restProps));
  };
  return RawPoint2;
}(import_react2.PureComponent);
var getAdjustedOptions = function(_a3) {
  var size = _a3.size;
  return { size: Math.round(size * 1.7) };
};
var Point = withAnimation(processPointAnimation, function(_a3) {
  var arg = _a3.arg, val = _a3.val;
  return { arg, val };
}, getPointStart, isValuesChanged)(withStates((_a$4 = {}, _a$4[HOVERED] = function(_a3) {
  var color = _a3.color, point6 = _a3.point, restProps = __rest3(_a3, ["color", "point"]);
  return __assign3({ stroke: color, strokeWidth: 4, fill: "none", point: getAdjustedOptions(point6) }, restProps);
}, _a$4[SELECTED] = function(_a3) {
  var color = _a3.color, point6 = _a3.point, restProps = __rest3(_a3, ["color", "point"]);
  return __assign3({ stroke: color, strokeWidth: 4, fill: "none", point: getAdjustedOptions(point6) }, restProps);
}, _a$4))(RawPoint));
var ScatterSeries = declareSeries("ScatterSeries", {
  getPointTransformer: getScatterPointTransformer,
  createHitTester: createScatterHitTester,
  components: { Path: PointCollection, Point }
});
ScatterSeries.defaultProps = {
  point: { size: 7 }
};
var Spline = function(_super) {
  __extends2(Spline2, _super);
  function Spline2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  Spline2.prototype.render = function() {
    var _a3 = this.props, rotated = _a3.rotated, path2 = _a3.path;
    var dPath = path2 === void 0 ? rotated ? dRotateSpline : dSpline : path2;
    return (0, import_react2.createElement)(Path2, __assign3({}, this.props, { path: dPath }));
  };
  return Spline2;
}(import_react2.PureComponent);
var SplineSeries = declareSeries("SplineSeries", {
  getPointTransformer: getLinePointTransformer,
  createHitTester: createSplineHitTester,
  components: { Path: Spline }
});
var getOffset2 = function(position) {
  return position >= 0 ? 0 : -position;
};
var getSize = function(position, delta) {
  return position >= 0 ? position + delta : -position;
};
var Root$1 = function(_super) {
  __extends2(Root2, _super);
  function Root2(props) {
    var _this = _super.call(this, props) || this;
    _this.ref = (0, import_react2.createRef)();
    _this.state = {
      x: 0,
      y: 0
    };
    _this.adjust = _this.adjust.bind(_this);
    return _this;
  }
  Root2.prototype.componentDidMount = function() {
    this.setState(this.adjust);
  };
  Root2.prototype.componentDidUpdate = function() {
    this.setState(this.adjust);
  };
  Root2.prototype.adjust = function(_, _a3) {
    var dx = _a3.dx, dy = _a3.dy, onSizeChange = _a3.onSizeChange;
    var bbox = this.ref.current.getBBox();
    var width = dx ? bbox.width : getSize(bbox.x, bbox.width);
    var height = dy ? bbox.height : getSize(bbox.y, bbox.height);
    var x2 = dx ? 0 : getOffset2(bbox.x);
    var y2 = dy ? 0 : getOffset2(bbox.y);
    onSizeChange({ width, height });
    return { x: x2, y: y2 };
  };
  Root2.prototype.render = function() {
    var _a3 = this.props, children = _a3.children, onSizeChange = _a3.onSizeChange, dx = _a3.dx, dy = _a3.dy, restProps = __rest3(_a3, ["children", "onSizeChange", "dx", "dy"]);
    var _b2 = this.state, x2 = _b2.x, y2 = _b2.y;
    return (0, import_react2.createElement)("g", __assign3({ ref: this.ref, transform: "translate(".concat(x2, " ").concat(y2, ")") }, restProps), children);
  };
  return Root2;
}(import_react2.PureComponent);
var Label$1 = function(_super) {
  __extends2(Label2, _super);
  function Label2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  Label2.prototype.render = function() {
    var _a3 = this.props, text = _a3.text, restProps = __rest3(_a3, ["text"]);
    return (0, import_react2.createElement)("text", __assign3({}, restProps), text);
  };
  return Label2;
}(import_react2.PureComponent);
var Line$1 = function(_super) {
  __extends2(Line2, _super);
  function Line2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  Line2.prototype.render = function() {
    var _a3 = this.props, x1 = _a3.x1, x2 = _a3.x2, y1 = _a3.y1, y2 = _a3.y2, restProps = __rest3(_a3, ["x1", "x2", "y1", "y2"]);
    return (0, import_react2.createElement)("path", __assign3({ d: "M ".concat(x1, " ").concat(y1, " L ").concat(x2, " ").concat(y2) }, restProps));
  };
  return Line2;
}(import_react2.PureComponent);
var SVG_STYLE$1 = {
  position: "absolute",
  left: 0,
  top: 0,
  overflow: "visible"
};
var RawAxis = function(_super) {
  __extends2(RawAxis2, _super);
  function RawAxis2() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.rootRef = (0, import_react2.createRef)();
    _this.adjustedWidth = 0;
    _this.adjustedHeight = 0;
    return _this;
  }
  RawAxis2.prototype.renderAxis = function(position) {
    var _this = this;
    var _a3 = this.props, scaleName = _a3.scaleName, tickSize = _a3.tickSize, tickFormat2 = _a3.tickFormat, indentFromAxis = _a3.indentFromAxis, showTicks = _a3.showTicks, showLine = _a3.showLine, showLabels = _a3.showLabels, RootComponent = _a3.rootComponent, TickComponent = _a3.tickComponent, LabelComponent = _a3.labelComponent, LineComponent = _a3.lineComponent;
    var placeholder = "".concat(position, "-axis");
    var layoutName = "".concat(placeholder, "-").concat(scaleName);
    return (0, import_react2.createElement)(
      Template,
      { name: placeholder },
      (0, import_react2.createElement)(TemplatePlaceholder, null),
      (0, import_react2.createElement)(TemplateConnector, null, function(_a4, _b2) {
        var scales = _a4.scales, layouts = _a4.layouts, rotated = _a4.rotated;
        var changeBBox = _b2.changeBBox;
        if (!isValidPosition(position, scaleName, rotated)) {
          return null;
        }
        var scale = scales[scaleName];
        if (!scale) {
          return null;
        }
        var _c = layouts[layoutName] || { width: 0, height: 0 }, width = _c.width, height = _c.height;
        var paneSize = layouts.pane;
        var _d = getTickCoordinates({
          callback: tickCoordinatesGetter,
          scaleName,
          position,
          tickSize,
          tickFormat: tickFormat2,
          indentFromAxis,
          scale,
          paneSize: [paneSize.width, paneSize.height],
          rotated
        }), _e = __read4(_d.sides, 2), dx = _e[0], dy = _e[1], ticks2 = _d.ticks;
        var handleSizeChange = function(size) {
          var rect = _this.rootRef.current.getBoundingClientRect();
          var rectSize = [dx ? rect.width : size.width, dy ? rect.height : size.height];
          if (rectSize[0] === _this.adjustedWidth && rectSize[1] === _this.adjustedHeight) {
            return;
          }
          _this.adjustedWidth = rectSize[0];
          _this.adjustedHeight = rectSize[1];
          changeBBox({ placeholder: layoutName, bBox: size });
        };
        return (0, import_react2.createElement)(
          "div",
          { style: {
            position: "relative",
            width: dy * width || void 0,
            height: dx * height || void 0,
            flexGrow: dx || void 0
          }, ref: _this.rootRef },
          (0, import_react2.createElement)(
            "svg",
            { width: _this.adjustedWidth, height: _this.adjustedHeight, style: SVG_STYLE$1 },
            (0, import_react2.createElement)(
              RootComponent,
              { dx, dy, onSizeChange: handleSizeChange },
              showTicks && ticks2.map(function(_a5) {
                var x1 = _a5.x1, x2 = _a5.x2, y1 = _a5.y1, y2 = _a5.y2, key = _a5.key;
                return (0, import_react2.createElement)(TickComponent, { key, x1, x2, y1, y2 });
              }),
              showLine && (0, import_react2.createElement)(LineComponent, { x1: 0, x2: dx * paneSize.width, y1: 0, y2: dy * paneSize.height }),
              showLabels && ticks2.map(function(_a5) {
                var text = _a5.text, xText = _a5.xText, yText = _a5.yText, delta = _a5.dy, textAnchor = _a5.textAnchor, key = _a5.key;
                return (0, import_react2.createElement)(LabelComponent, { key, text, x: xText, y: yText, dy: delta, textAnchor });
              })
            )
          )
        );
      })
    );
  };
  RawAxis2.prototype.renderGrid = function() {
    var _a3 = this.props, scaleName = _a3.scaleName, showGrid = _a3.showGrid, GridComponent = _a3.gridComponent;
    return (0, import_react2.createElement)(
      Template,
      { name: "series" },
      (0, import_react2.createElement)(TemplatePlaceholder, null),
      (0, import_react2.createElement)(TemplateConnector, null, function(_a4) {
        var scales = _a4.scales, layouts = _a4.layouts, rotated = _a4.rotated;
        var scale = scales[scaleName];
        if (!scale || !showGrid) {
          return null;
        }
        var _b2 = layouts.pane, width = _b2.width, height = _b2.height;
        var _c = getTickCoordinates({
          callback: gridCoordinatesGetter,
          scaleName,
          scale,
          paneSize: [width, height],
          rotated
        }), ticks2 = _c.ticks, _d = __read4(_c.sides, 2), dx = _d[0], dy = _d[1];
        return (0, import_react2.createElement)(import_react2.Fragment, null, ticks2.map(function(_a5) {
          var key = _a5.key, x1 = _a5.x1, y1 = _a5.y1;
          return (0, import_react2.createElement)(GridComponent, { key, x1, x2: x1 + dy * width, y1, y2: y1 + dx * height });
        }));
      })
    );
  };
  RawAxis2.prototype.render = function() {
    var position = this.props.position;
    var rotatedPosition = getRotatedPosition(position);
    return (0, import_react2.createElement)(
      Plugin,
      { name: "Axis" },
      (0, import_react2.createElement)(Getter, { name: "axesExist", value: true }),
      this.renderAxis(position),
      this.renderAxis(rotatedPosition),
      this.renderGrid()
    );
  };
  RawAxis2.components = {
    rootComponent: "Root",
    tickComponent: "Tick",
    labelComponent: "Label",
    lineComponent: "Line",
    gridComponent: "Grid"
  };
  RawAxis2.defaultProps = {
    tickSize: 5,
    indentFromAxis: 10
  };
  return RawAxis2;
}(import_react2.PureComponent);
var Axis = withComponents({
  Label: Label$1,
  Line: Line$1,
  Root: Root$1,
  Tick: Line$1,
  Grid: Line$1
})(RawAxis);
var ArgumentAxis = withPatchedProps(function(props) {
  return __assign3(__assign3({ position: BOTTOM, showGrid: false, showTicks: true, showLine: true, showLabels: true }, props), { scaleName: ARGUMENT_DOMAIN });
})(Axis);
var ValueAxis = withPatchedProps(function(props) {
  return __assign3(__assign3({ position: LEFT, showGrid: true, showTicks: false, showLine: false, showLabels: true }, props), { scaleName: getValueDomainName(props.scaleName) });
})(Axis);
var dependencies = [{ name: "EventTracker", optional: true }];
var TooltipBase = function(_super) {
  __extends2(TooltipBase2, _super);
  function TooltipBase2(props) {
    var _this = _super.call(this, props) || this;
    _this.state = {
      target: props.targetItem || props.defaultTargetItem
    };
    var handlePointerMove = _this.handlePointerMove.bind(_this);
    _this.getPointerMoveHandlers = function(_a3) {
      var _b2 = _a3.pointerMoveHandlers, pointerMoveHandlers = _b2 === void 0 ? [] : _b2;
      return __spreadArray4(__spreadArray4([], __read4(pointerMoveHandlers), false), [
        handlePointerMove
      ], false);
    };
    return _this;
  }
  TooltipBase2.getDerivedStateFromProps = function(props, state) {
    return { target: props.targetItem !== void 0 ? props.targetItem : state.target };
  };
  TooltipBase2.prototype.handlePointerMove = function(_a3) {
    var targets = _a3.targets;
    this.setState(function(_a4, _b2) {
      var currentTarget = _a4.target;
      var onTargetItemChange = _b2.onTargetItemChange;
      var target = processHandleTooltip(targets, currentTarget, onTargetItemChange);
      if (target === void 0) {
        return null;
      }
      return { target };
    });
  };
  TooltipBase2.prototype.render = function() {
    var _a3 = this.props, OverlayComponent = _a3.overlayComponent, ContentComponent = _a3.contentComponent, SheetComponent = _a3.sheetComponent, arrowComponent = _a3.arrowComponent;
    var target = this.state.target;
    return (0, import_react2.createElement)(
      Plugin,
      { name: "Tooltip", dependencies },
      (0, import_react2.createElement)(Getter, { name: "pointerMoveHandlers", computed: this.getPointerMoveHandlers }),
      (0, import_react2.createElement)(
        Template,
        { name: "series" },
        (0, import_react2.createElement)(TemplatePlaceholder, null),
        (0, import_react2.createElement)(TemplateConnector, null, function(_a4) {
          var series2 = _a4.series, rootRef = _a4.rootRef, rotated = _a4.rotated;
          if (!target) {
            return null;
          }
          var _b2 = getParameters(series2, target), text = _b2.text, element = _b2.element;
          return (0, import_react2.createElement)(
            OverlayComponent,
            { key: "".concat(target.series).concat(target.point), target: createReference(element, rootRef), rotated, arrowComponent },
            (0, import_react2.createElement)(
              SheetComponent,
              null,
              (0, import_react2.createElement)(ContentComponent, { text, targetItem: target })
            )
          );
        })
      )
    );
  };
  TooltipBase2.components = {
    overlayComponent: "Overlay",
    contentComponent: "Content",
    arrowComponent: "Arrow",
    sheetComponent: "Sheet"
  };
  return TooltipBase2;
}(import_react2.PureComponent);
var Tooltip = TooltipBase;
var DragBox = function(_super) {
  __extends2(DragBox2, _super);
  function DragBox2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  DragBox2.prototype.render = function() {
    var _a3 = this.props, rect = _a3.rect, restProps = __rest3(_a3, ["rect"]);
    return (0, import_react2.createElement)("rect", __assign3({ x: rect.x, y: rect.y, width: rect.width, height: rect.height }, restProps));
  };
  return DragBox2;
}(import_react2.PureComponent);
var events = {
  wheel: { func: "onWheel" },
  mousedown: {
    func: "onStart",
    extraEvents: ["mousemove", "mouseup"]
  },
  touchstart: {
    func: "onStart",
    extraEvents: ["touchmove", "touchend"]
  }
};
var ZoomPanProvider = function(_super) {
  __extends2(ZoomPanProvider2, _super);
  function ZoomPanProvider2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  ZoomPanProvider2.prototype.componentDidMount = function() {
    var _this = this;
    this.svgElement = this.props.rootRef.current;
    setCursorType(this.svgElement);
    this.windowHandlers = Object.keys(events).reduce(function(prev, key) {
      var _a3, _b2;
      var extraEvents = events[key].extraEvents;
      if (extraEvents) {
        return __assign3(__assign3({}, prev), (_a3 = {}, _a3[key] = (_b2 = {}, _b2[extraEvents[0]] = function(event) {
          _this.props.onMove(event);
        }, _b2[extraEvents[1]] = function(event) {
          _this.props.onEnd(event);
          setCursorType(_this.svgElement);
          detachEvents(window, _this.windowHandlers[key]);
        }, _b2), _a3));
      }
      return prev;
    }, {});
    this.handlers = Object.keys(events).reduce(function(prev, key) {
      var _a3;
      return __assign3(__assign3({}, prev), (_a3 = {}, _a3[key] = function(e) {
        _this.props[events[key].func](e);
        if (events[key].extraEvents) {
          attachEvents(window, _this.windowHandlers[key]);
        }
      }, _a3));
    }, {});
    attachEvents(this.svgElement, this.handlers);
  };
  ZoomPanProvider2.prototype.componentWillUnmount = function() {
    var _this = this;
    detachEvents(this.svgElement, this.handlers);
    Object.keys(this.windowHandlers).forEach(function(el) {
      detachEvents(window, _this.windowHandlers[el]);
    });
  };
  ZoomPanProvider2.prototype.render = function() {
    return null;
  };
  return ZoomPanProvider2;
}(import_react2.PureComponent);
var ZoomAndPanBase = function(_super) {
  __extends2(ZoomAndPanBase2, _super);
  function ZoomAndPanBase2(props) {
    var _this = _super.call(this, props) || this;
    _this.multiTouchDelta = null;
    _this.lastCoordinates = null;
    _this.rectOrigin = null;
    _this.offset = [0, 0];
    _this.state = {
      viewport: props.viewport || props.defaultViewport,
      rectBox: null
    };
    return _this;
  }
  ZoomAndPanBase2.getDerivedStateFromProps = function(props, state) {
    return {
      viewport: props.viewport !== void 0 ? props.viewport : state.viewport
    };
  };
  ZoomAndPanBase2.prototype.handleStart = function(zoomRegionKey, e) {
    e.preventDefault();
    this.offset = getOffset(e.currentTarget);
    var coords = getEventCoords(e, this.offset);
    if (isKeyPressed(e, zoomRegionKey)) {
      this.rectOrigin = coords;
    } else {
      setCursorType(e.currentTarget, "grabbing");
    }
    if (isMultiTouch(e)) {
      this.multiTouchDelta = getDeltaForTouches(e.touches).delta;
    }
    this.lastCoordinates = coords;
  };
  ZoomAndPanBase2.prototype.handleMove = function(scales, rotated, e, pane) {
    e.preventDefault();
    clear();
    if (isMultiTouch(e)) {
      var current = getDeltaForTouches(e.touches);
      this.zoom(scales, rotated, current.delta - this.multiTouchDelta, current.center);
      this.multiTouchDelta = current.delta;
    } else {
      this.scroll(scales, rotated, e, pane);
    }
  };
  ZoomAndPanBase2.prototype.scroll = function(scales, rotated, e, pane) {
    var _this = this;
    var coords = getEventCoords(e, this.offset);
    var deltaX = coords[0] - this.lastCoordinates[0];
    var deltaY = coords[1] - this.lastCoordinates[1];
    this.lastCoordinates = coords;
    this.setState(function(_a3, _b2) {
      var viewport = _a3.viewport;
      var onViewportChange = _b2.onViewportChange, interactionWithArguments = _b2.interactionWithArguments, interactionWithValues = _b2.interactionWithValues;
      if (_this.rectOrigin) {
        return {
          rectBox: getRect$1(rotated, interactionWithArguments, interactionWithValues, _this.rectOrigin, coords, pane)
        };
      }
      return getViewport(scales, rotated, [interactionWithArguments, interactionWithValues], "pan", [-deltaX, -deltaY], null, null, viewport, onViewportChange);
    });
  };
  ZoomAndPanBase2.prototype.handleEnd = function(scales, rotated) {
    var _this = this;
    this.lastCoordinates = null;
    this.multiTouchDelta = null;
    if (this.rectOrigin) {
      this.setState(function(_a3, _b2) {
        var viewport = _a3.viewport, rectBox = _a3.rectBox;
        var onViewportChange = _b2.onViewportChange, interactionWithArguments = _b2.interactionWithArguments, interactionWithValues = _b2.interactionWithValues;
        if (rectBox === null)
          return {};
        _this.rectOrigin = null;
        return __assign3({ rectBox: null }, getViewport(scales, rotated, [interactionWithArguments, interactionWithValues], "zoom", null, null, [
          [rectBox.x, rectBox.x + rectBox.width],
          [rectBox.y, rectBox.y + rectBox.height]
        ], viewport, onViewportChange));
      });
    }
  };
  ZoomAndPanBase2.prototype.zoom = function(scales, rotated, delta, anchors) {
    this.setState(function(_a3, _b2) {
      var viewport = _a3.viewport;
      var onViewportChange = _b2.onViewportChange, interactionWithArguments = _b2.interactionWithArguments, interactionWithValues = _b2.interactionWithValues;
      return getViewport(scales, rotated, [interactionWithArguments, interactionWithValues], "zoom", [delta, delta], anchors, null, viewport, onViewportChange);
    });
  };
  ZoomAndPanBase2.prototype.handleZoom = function(scales, rotated, e) {
    e.preventDefault();
    var center = getEventCoords(e, getOffset(e.currentTarget));
    this.zoom(scales, rotated, getWheelDelta(e), center);
  };
  ZoomAndPanBase2.prototype.render = function() {
    var _this = this;
    var _a3 = this.state, viewport = _a3.viewport, rectBox = _a3.rectBox;
    var _b2 = this.props, DragBoxComponent = _b2.dragBoxComponent, zoomRegionKey = _b2.zoomRegionKey;
    var getAdjustedLayout = function(_a4) {
      var domains = _a4.domains, ranges = _a4.ranges;
      return adjustLayout(domains, ranges, viewport);
    };
    return (0, import_react2.createElement)(
      Plugin,
      { name: "zoomAndPan" },
      (0, import_react2.createElement)(Getter, { name: "ranges", computed: getAdjustedLayout }),
      (0, import_react2.createElement)(
        Template,
        { name: "root" },
        (0, import_react2.createElement)(TemplatePlaceholder, null),
        (0, import_react2.createElement)(TemplateConnector, null, function(_a4) {
          var scales = _a4.scales, rotated = _a4.rotated, rootRef = _a4.rootRef, layouts = _a4.layouts;
          return (0, import_react2.createElement)(ZoomPanProvider, { rootRef, onWheel: function(e) {
            return _this.handleZoom(scales, rotated, e);
          }, onStart: function(e) {
            return _this.handleStart(zoomRegionKey, e);
          }, onMove: function(e) {
            return _this.handleMove(scales, rotated, e, layouts.pane);
          }, onEnd: function(e) {
            return _this.handleEnd(scales, rotated);
          } });
        })
      ),
      (0, import_react2.createElement)(
        Template,
        { name: "series" },
        (0, import_react2.createElement)(TemplatePlaceholder, null),
        rectBox ? (0, import_react2.createElement)(DragBoxComponent, { rect: rectBox }) : null
      )
    );
  };
  ZoomAndPanBase2.components = {
    dragBoxComponent: "DragBox"
  };
  ZoomAndPanBase2.defaultProps = {
    interactionWithValues: "none",
    interactionWithArguments: "both",
    zoomRegionKey: "shift"
  };
  return ZoomAndPanBase2;
}(import_react2.PureComponent);
var ZoomAndPan = withComponents({ DragBox })(ZoomAndPanBase);
var wrapToList = function(arg) {
  return arg ? [arg] : [];
};
var EVENT_NAME_TO_REACT_MAP = {
  click: "onClick",
  mousemove: "onMouseMove",
  mouseleave: "onMouseLeave",
  touchstart: "onTouchStart"
};
var translateEventNames = function(handlers) {
  var result = {};
  Object.entries(handlers).forEach(function(_a3) {
    var _b2 = __read4(_a3, 2), name = _b2[0], handler = _b2[1];
    result[EVENT_NAME_TO_REACT_MAP[name]] = handler;
  });
  return result;
};
var EventTrackerBase = function(_super) {
  __extends2(EventTrackerBase2, _super);
  function EventTrackerBase2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  EventTrackerBase2.prototype.render = function() {
    var _a3 = this.props, onClick = _a3.onClick, onPointerMove = _a3.onPointerMove;
    return (0, import_react2.createElement)(
      Plugin,
      { name: "EventTracker" },
      (0, import_react2.createElement)(Getter, { name: "clickHandlers", value: wrapToList(onClick) }),
      (0, import_react2.createElement)(Getter, { name: "pointerMoveHandlers", value: wrapToList(onPointerMove) }),
      (0, import_react2.createElement)(Template, { name: "canvas" }, function(params) {
        return (0, import_react2.createElement)(TemplateConnector, null, function(_a4) {
          var series2 = _a4.series, clickHandlers = _a4.clickHandlers, pointerMoveHandlers = _a4.pointerMoveHandlers;
          var handlers = buildEventHandlers(series2, { clickHandlers, pointerMoveHandlers });
          return (0, import_react2.createElement)(TemplatePlaceholder, { params: __assign3(__assign3({}, params), translateEventNames(handlers)) });
        });
      })
    );
  };
  return EventTrackerBase2;
}(import_react2.PureComponent);
var EventTracker = EventTrackerBase;
var dependencies$1 = [{ name: "EventTracker", optional: true }];
var HoverStateBase = function(_super) {
  __extends2(HoverStateBase2, _super);
  function HoverStateBase2(props) {
    var _this = _super.call(this, props) || this;
    _this.state = {
      hover: props.hover || props.defaultHover
    };
    var handlePointerMove = _this.handlePointerMove.bind(_this);
    _this.getPointerMoveHandlers = function(_a3) {
      var _b2 = _a3.pointerMoveHandlers, pointerMoveHandlers = _b2 === void 0 ? [] : _b2;
      return __spreadArray4(__spreadArray4([], __read4(pointerMoveHandlers), false), [
        handlePointerMove
      ], false);
    };
    return _this;
  }
  HoverStateBase2.getDerivedStateFromProps = function(props, state) {
    return { hover: props.hover !== void 0 ? props.hover : state.hover };
  };
  HoverStateBase2.prototype.handlePointerMove = function(_a3) {
    var targets = _a3.targets;
    this.setState(function(_a4, _b2) {
      var currentTarget = _a4.hover;
      var onHoverChange = _b2.onHoverChange;
      var hover = processPointerMove(targets, currentTarget, onHoverChange);
      return hover !== void 0 ? { hover } : null;
    });
  };
  HoverStateBase2.prototype.render = function() {
    var hover = this.state.hover;
    var targets = hover ? [hover] : [];
    var getSeries2 = function(_a3) {
      var series2 = _a3.series;
      return changeSeriesState(series2, targets, HOVERED);
    };
    return (0, import_react2.createElement)(
      Plugin,
      { name: "HoverState", dependencies: dependencies$1 },
      (0, import_react2.createElement)(Getter, { name: "pointerMoveHandlers", computed: this.getPointerMoveHandlers }),
      (0, import_react2.createElement)(Getter, { name: "series", computed: getSeries2 })
    );
  };
  return HoverStateBase2;
}(import_react2.PureComponent);
var HoverState = HoverStateBase;
var SelectionStateBase = function(_super) {
  __extends2(SelectionStateBase2, _super);
  function SelectionStateBase2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  SelectionStateBase2.prototype.render = function() {
    var selection = this.props.selection;
    var targets = selection || [];
    var getSeries2 = function(_a3) {
      var series2 = _a3.series;
      return changeSeriesState(series2, targets, SELECTED);
    };
    return (0, import_react2.createElement)(
      Plugin,
      { name: "SelectionState" },
      (0, import_react2.createElement)(Getter, { name: "series", computed: getSeries2 })
    );
  };
  return SelectionStateBase2;
}(import_react2.PureComponent);
var SelectionState = SelectionStateBase;

export {
  withComponents,
  TOP,
  RIGHT,
  Palette,
  Chart,
  Legend,
  Title,
  withPatchedProps,
  Scale,
  ArgumentScale,
  ValueScale,
  Stack,
  Animation,
  AreaSeries,
  BarSeries,
  LineSeries,
  PieSeries,
  ScatterSeries,
  SplineSeries,
  Axis,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
  ZoomAndPan,
  EventTracker,
  HoverState,
  SelectionState
};
/*! Bundled license information:

@devexpress/dx-core/dist/dx-core.es.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@devexpress/dx-react-core/dist/dx-react-core.es.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@devexpress/dx-chart-core/dist/dx-chart-core.es.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@devexpress/dx-react-chart/dist/dx-react-chart.es.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)
*/
//# sourceMappingURL=chunk-ZOUTEWVP.js.map
