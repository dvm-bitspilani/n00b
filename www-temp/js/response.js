// eslint-disable-next-line no-unused-vars
const response = {
  'okay': true,
  'data': [
    {
      'n00b': {
        'scripts': {
          'enabled': true,
          'package_manager': 'npm',
          'script': 'run webpack'
        },
        'last_pull': {
          'test': {
            'commit': {
              'author': 'Chinmay Pandhare',
              'message': 'Update README.md',
              'time': '17 minutes ago',
              'hash': '26f0cab18f1767639f7fb11de2f39c73af1d5580'
            },
            'time': '2018-07-28T22:57:59.656Z',
            'pull_result': {
              'code': 0,
              'stdout': '',
              'stderr': 'From https://github.com/dvm-bitspilani/oasis-2018-intro\n * branch      layout   -> FETCH_HEAD\n * [new branch]    layout   -> origin/layout\n'
            },
            'build_result': {
              'install': {
                'code': 0,
                'stdout': '\n> deasync@0.1.13 install /root/live/dvm/test-others/n00b/test_n00bs/2018intro/node_modules/deasync\n> node ./build.js\n\n`linux-x64-node-8` exists; testing\nBinary is fine; exiting\n\n> node-sass@4.9.2 install /root/live/dvm/test-others/n00b/test_n00bs/2018intro/node_modules/node-sass\n> node scripts/install.js\n\nCached binary found at /root/.npm/node-sass/4.9.2/linux-x64-57_binding.node\n\n> node-sass@4.9.2 postinstall /root/live/dvm/test-others/n00b/test_n00bs/2018intro/node_modules/node-sass\n> node scripts/build.js\n\nBinary found at /root/live/dvm/test-others/n00b/test_n00bs/2018intro/node_modules/node-sass/vendor/linux-x64-57/binding.node\nTesting binary\nBinary is fine\nadded 894 packages from 531 contributors and audited 9870 packages in 26.401s\nfound 4 moderate severity vulnerabilities\n  run `npm audit fix` to fix them, or `npm audit` for details\n',
                'stderr': 'npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules/fsevents):\nnpm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {\'os\':\'darwin\',\'arch\':\'any\'} (current: {\'os\':\'linux\',\'arch\':\'x64\'})\n\n'
              },
              'build': {
                'code': 0,
                'stdout': '\n> oasis-2018-intro@1.0.0 webpack /root/live/dvm/test-others/n00b/test_n00bs/2018intro\n> node ./node_modules/.bin/webpack\n\nHash: e88c6b363b2d45b1938d\nVersion: webpack 4.16.2\nTime: 4268ms\nBuilt at: 2018-07-28 22:58:33\n                 Asset     Size  Chunks          Chunk Names\nab7c9f90468faaf9fae327e3b77f829d.jpg   13.4 KiB      [emitted]     \n427337d19ee4c8c33cab4ae98952b2f8.svg   1.36 KiB      [emitted]     \n58fec83205c9623638219014069c9b3d.svg   1.66 KiB      [emitted]     \n985979025a115c3646abb90858edf644.svg   1.28 KiB      [emitted]     \n098c789055e4dcff6df04ac79d1c989f.otf   26.9 KiB      [emitted]     \n0b4a49ccf647909536272adbcec775e2.png  992 KiB      [emitted]  [big]  \ndedc01909ab78ddbfc76ef108a668fa8.svg  933 bytes      [emitted]     \na78d84ffd363a4ec1134cb5dcaef34a8.jpg  178 KiB      [emitted]     \n69ea63a457612b7eb81f24c13a180bb0.jpg   86.5 KiB      [emitted]     \n748831cc8e9b0d94e06454fd0d332c92.jpg   61.5 KiB      [emitted]     \n               bundle.js   91.1 KiB     0  [emitted]     main\n              index.html   8.18 KiB      [emitted]     \n [2] ./src/js/themeChange.js 1.7 KiB {0} [built]\n [4] ./src/js/index.js 145 bytes {0} [built]\n [5] ./src/js/tabNavigation.js 1.65 KiB {0} [built]\n [6] ./src/js/home.js 1.24 KiB {0} [built]\n [7] ./src/css/index.js 97 bytes {0} [built]\n [8] ./src/css/common.scss 1.2 KiB {0} [built]\n [9] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/css/common.scss 820 bytes {0} [built]\n[10] ./src/assets/fonts/Ikaros-Regular.otf 82 bytes {0} [built]\n[12] ./src/css/desktop.scss 1.2 KiB {0} [built]\n[13] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/css/desktop.scss 6.62 KiB {0} [built]\n[14] ./src/assets/imgs/content-bg.png 82 bytes {0} [built]\n[15] ./src/assets/video_img/oasis.jpg 82 bytes {0} [built]\n[19] ./src/css/handheld.scss 1.2 KiB {0} [built]\n[20] ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/css/handheld.scss 411 bytes {0} [built]\n[21] ./src/js/video.js 1.68 KiB {0} [built]\n  + 7 hidden modules\n\nWARNING in configuration\nThe \'mode\' option has not been set, webpack will fallback to \'production\' for this value. Set \'mode\' option to \'development\' or \'production\' to enable defaults for each environment.\nYou can also set it to \'none\' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/\n\nWARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).\nThis can impact web performance.\nAssets: \n  0b4a49ccf647909536272adbcec775e2.png (992 KiB)\n\nWARNING in webpack performance recommendations: \nYou can limit the size of your bundles by using import() or require.ensure to lazy load some parts of your application.\nFor more info visit https://webpack.js.org/guides/code-splitting/\nChild html-webpack-plugin for \'index.html\':\n                   Asset     Size  Chunks       Chunk Names\n  427337d19ee4c8c33cab4ae98952b2f8.svg   1.36 KiB      [emitted]  \n  dedc01909ab78ddbfc76ef108a668fa8.svg  933 bytes      [emitted]  \n  58fec83205c9623638219014069c9b3d.svg   1.66 KiB      [emitted]  \n  985979025a115c3646abb90858edf644.svg   1.28 KiB      [emitted]  \n   + 1 hidden asset\n  [0] ./src/assets/video_img/youtube_play.svg 82 bytes {0} [built]\n  [1] ./node_modules/html-webpack-plugin/lib/loader.js!./src/index.html 8.57 KiB {0} [built]\n  [2] ./src/assets/social/facebook-logo.svg 82 bytes {0} [built]\n  [3] ./src/assets/social/instagram-logo.svg 82 bytes {0} [built]\n  [4] ./src/assets/social/twitter-logo.svg 82 bytes {0} [built]\n',
                'stderr': ''
              }
            }
          }
        },
        'branches': [
          {
            'type': 'test',
            'name': 'layout'
          }
        ],
        '_id': '5b5cf4f3f012c234c01f2e30',
        'domain': 'bits-oasis.org',
        'www_path': '2018intro',
        'name': '2018intro',
        'repository': 'oasis-2018-intro',
        'created_at': '2018-07-28T22:57:55.153Z',
        '__v': 0
      },
      'github': {
        'last_commit': {
          'okay': true,
          'author': 'Kunal Mohta',
          'message': 'Initial commit',
          'time': '2018-07-16T11:23:47Z',
          'hash': '11842958f081baef94909e42e2eb640ccd6eefb6'
        }
      }
    }
  ]
};
