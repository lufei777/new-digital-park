import axios from 'axios'
let lessNodesAppended;
// const updateTheme = primaryColor => {
//   if (!primaryColor) {
//     return;
//   }
//   function buildIt() {
//     if (!window.less) {
//       return;
//     }
//     setTimeout(() => {
//       window.less
//         .modifyVars({
//           '@mainBg': primaryColor,
//         })
//         .then(() => {
//           console.log(1)
//         })
//         .catch((err) => {
//           console.log(2,err)
//         });
//     }, 200);
//   }
//   if (!lessNodesAppended) {
//     // insert less.js and color.less
//     const lessStyleNode = document.createElement('link');
//     const lessConfigNode = document.createElement('script');
//     const lessScriptNode = document.createElement('script');
//     lessStyleNode.setAttribute('rel', 'stylesheet/less');
//     lessStyleNode.setAttribute('href', '/common.less');
//     lessConfigNode.innerHTML = `
//       window.less = {
//         async: true,
//         env: 'development',
//         javascriptEnabled: true
//       };
//     `;
//     lessScriptNode.src = 'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js';
//     lessScriptNode.async = true;
//     lessScriptNode.onload = () => {
//       buildIt();
//       lessScriptNode.onload = null;
//     };
//     document.body.appendChild(lessStyleNode);
//     document.body.appendChild(lessConfigNode);
//     document.body.appendChild(lessScriptNode);
//     lessNodesAppended = true;
//   } else {
//     buildIt();
//   }
// };

let lessLoaded
const updateTheme=color=> {
  const changeColor = () => {
    let less = require('less');
    less.modifyVars({
     '@mainBg':color
    }).then(() => {
        console.log('修改成功');
    });
  };
  const lessUrl = 'https://cdnjs.cloudflare.com/ajax/libs/less.js/3.9.0/less.min.js';
  if (lessLoaded) {
    changeColor();
  } else {
    less = {
      async: true,
      env: "development"
    };
    axios.get(lessUrl).then(() => {
      lessLoaded = true;
      changeColor();
    });
  }
};

const updateColorWeak = colorWeak => {
  // document.body.className = colorWeak ? 'colorWeak' : '';
  colorWeak ? document.body.classList.add('colorWeak') : document.body.classList.remove('colorWeak')
};

export { updateTheme, colorList, updateColorWeak }
