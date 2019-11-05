const fs = require("fs");
const path = require("path");
const mkdirp = require('mkdirp');
function uploadSourceMaps(directoryPath, assetManifest) {
  console.log(assetManifest);
  return new Promise((resolve, reject) => {
    fs.readFile(assetManifest, 'utf-8', (err, res) => {
      const files = JSON.parse(res).files;
      const mapFiles = Object.keys(files).filter(f => f.endsWith('.map'));
      console.log('RES', mapFiles);
      mkdirp('./srcmaps');
      Object.keys(files).forEach((f) => {
        if(f.endsWith('.map')) {
          const oldPath = `build${files[f]}`;
          const newPath = `srcmaps/${path.basename(files[f])}`;
          console.log('OLDPATH:::', oldPath);
          console.log('NEWPATH:::', newPath);
          console.log('FILE:',files[f], path.dirname(files[f]));
          // mkdirp(path.dirname(files[f]));
          // const filePath = path.resolve(directoryPath, f);
          fs.rename(oldPath, newPath, (err) => {
            console.error(err);
          });
        }
      });
      console.log('ERR', err);
      return resolve(true);
    });
    // fs.readdir(directoryPath, (err, files) => {
    //   if (err) console.log(`Unable to scan directory: ${err}`);

    //   files.forEach(function(file) {
    //     const filePath = path.resolve(directoryPath, file);
    //     console.log(filePath);
    //     // fs.readFile(filePath, "utf8", function(err, data) {
    //     //   if (err) {
    //     //     console.log(err);
    //     //     return reject(err);
    //     //   }

    //     //   // svgoinit.optimize(data, { path: filePath }).then(result => {
    //     //   //   //take the file and rewrite it with the new optimized SVG
    //     //   //   fs.writeFile(filePath, result.data, err => {
    //     //   //     if (err) {
    //     //   //       return reject(err);
    //     //   //     }
    //     //   //     console.log("SVG optimized correctly!");
    //     //   //   });
    //     //   // });
    //     // });
    //   });
    //   return resolve(true);
    // });
  });
}

const sourceMapsUpload = gconfig => {
  console.log(gconfig);
  return {
    name: "sourcemaps-upload",
    // init: ({ config }) => {
    //   console.log('dddd', config.pluginConfig);
    // },
    preDeploy: async () => {
      console.log("preDeploy::::");
      // const res = fs.readdirSync(".");
      await uploadSourceMaps(gconfig.directory, gconfig.assetManifest);
      // console.log(res);
      //   , (err, res) => {
      //     console.log('DIR', err, res);
      //   });
    }
    // finally: () => {
    //     console.log(gconfig.directory);
    // }
  };
};

module.exports = sourceMapsUpload;

// module.exports = function netlifyPlugin(config) {
//     console.log(config);
//     return {
//       name: 'netlify-plugin-one',
//       init: () => {
//         console.log('Hi from init')
//       },
//       getCache: () => {
//         console.log('Hi from getCache')
//       },
//       install: () => {
//         console.log('Hi from install')
//       },
//       preBuild: () => {
//         console.log('Hi from preBuild')
//       },
//       build: () => {
//         console.log('Hi from build')
//       },
//       postBuild: () => {
//         console.log('Hi from postBuild')
//       },
//       package: () => {
//         console.log('Hi from package')
//       },
//       preDeploy: () => {
//         console.log('Hi from preDeploy')
//       },
//       saveCache: () => {
//         console.log('Hi from saveCache')
//       },
//       finally: () => {
//         console.log('Hi from finally')
//       },
//     }
//   }
