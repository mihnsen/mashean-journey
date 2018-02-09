import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'journey',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Journey = require('./containers/JourneyContainer').default
      const reducer = require('./modules/journey').default

      /*  Add the reducer to the store on key 'journey'  */
      injectReducer(store, { key: 'journey', reducer })

      /*  Return getComponent   */
      cb(null, Journey)

    /* Webpack named bundle   */
    }, 'journey')
  }
})
