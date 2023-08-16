module.exports = function(config) {
    config.set({
  
      // base path that will be used to resolve all patterns (eg. files, exclude)
      basePath: '../../../',
  
  
      // frameworks to use
      frameworks: ['jasmine'],
  
      //plugins
      plugins: ['karma-jasmine'],
  
      // list of files / patterns to load in the browser
      files: [
        './bin/aud-notifier.js',
        
        './service-worker.js',
       './lib/ts/__tests__/Notificaton.test.js',
    
      
      ],
  
      // test results reporter to use
      reporters: ['progress',],
  
  
      // web server port
      port: 9876,
  
  
      // enable / disable colors in the output (reporters and logs)
      colors: true,
  
  
      // level of logging
      logLevel: config.LOG_INFO,
  
     
    })
  }
  