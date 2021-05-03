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
    atlasPages,
    skelPath,
    ani,
    backgroundColor = "#ffffff",
    debug = false,
    loop = true,
    skin,
    scale,
    x = 500,
    y = 200,
    fitToCanvas = false,
    onSuccess,
    onSkelLoaded,
  }
) {
  loadSkel(skelPath).then(function (json) {
    if (onSkelLoaded) {
      onSkelLoaded(json);
    }
    if (debug) {
      console.log(json);
    }
    new spine.SpineWidget(dom, {
      jsonContent: json,
      atlas: atlasPath,
      atlasPages,
      animation: ani,
      backgroundColor,
      debug,
      loop,
      skin,
      scale,
      x,
      y,
      fitToCanvas,
      success: onSuccess,
      premultipliedAlpha: true,
    });
  });
}
