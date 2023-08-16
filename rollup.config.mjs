
import resolve from "@rollup/plugin-node-resolve";
import  terser  from "@rollup/plugin-terser";
import  babel  from "@rollup/plugin-babel";
import  typescript  from "@rollup/plugin-typescript";

const common = {
  input: "index.ts",
  output: {
    
    file: "bin/aud-notifier.js",
    format: "umd",
    name: "AUDNotifier",
    sourcemap: true
  },
  onwarn: function(warning, handler) {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }

    // console.warn everything else
    handler( warning );
},
  plugins: [
    terser({
        output: {
          beautify: false,
        
        }
      }),
      babel({
        exclude: "node_modules/**"
      }),
    resolve(),
    typescript({target:"es5"})

   
  ]
};

export default [
  {
    ...common,
    output: {
      ...common.output,
      file: "bin/aud-notifier.js"
    }
  },
 
  
];