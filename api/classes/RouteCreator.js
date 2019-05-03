/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
// https://hackernoon.com/object-oriented-routing-in-nodejs-and-express-71cb1baed9f0
class RouteCreator {
  constructor(routePath, app) {
    if (app === null) {
      throw new Error('Missing required App');
    }
    this.app = app;
    this.routePath = routePath;
    this._routes = [];
    this.registerServices();
  }

  get services() {
    return {};
  }

  registerServices() {
    var routerServices = this.services;
    Object.keys(routerServices).forEach((fullPath) => {
      var serviceFunction = routerServices[fullPath];
      var pathItems = fullPath.split(' ');
      var verb = (pathItems.length > 1 ? pathItems[0] : 'get').toLowerCase();
      var path = this.routePath + (pathItems.length > 1 ? pathItems[1] : fullPath);
      this.app[verb](path, this[serviceFunction].bind(this));
    });
  }
}

module.exports = RouteCreator;
