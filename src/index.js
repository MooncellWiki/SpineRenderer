import spine from "./spine_runtime/spine-widget";
import { SkeletonBinary } from "./spine_runtime/SkeletonBinary3.5.js";
function parse(data) {
  const parser = new SkeletonBinary();
  parser.data = data;
  parser.initJson();
  return parser.json;
}
function loadSkel(path) {
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", path, true);
    xhr.responseType = "arraybuffer";
    xhr.onloadend = (e) => {
      if (xhr.status >= 200 && xhr.status < 300) {
        res(parse(new Uint8Array(xhr.response)));
      } else {
        rej(xhr.status);
      }
    };
    xhr.send();
  });
}
export function render(
  dom,
  {
    atlasPath,
    skelPath,
    ani,
    backgroundColor = "#ffffff",
    debug = false,
    loop = true,
    skin,
    x = 500,
    y = 200,
    fitToCanvas = false,
    onSuccess,
  }
) {
  loadSkel(skelPath).then(function (json) {
    if (debug) {
      console.log(json);
    }
    console.log(spine.SpineWidget.prototype);
    new spine.SpineWidget(dom, {
      jsonContent: json,
      atlas: atlasPath,
      animation: ani,
      backgroundColor,
      debug,
      loop,
      skin,
      x,
      y,
      fitToCanvas,
      success: onSuccess,
    });
  });
}
