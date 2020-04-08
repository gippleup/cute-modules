const image = document.querySelector('img');

function fetchImage(imgUrl, htmlNode) {
  const targetNode = htmlNode;
  const request = new Request(imgUrl);
  fetch(request)
    .then((res) => res.blob())
    .then((blob) => {
      targetNode.src = URL.createObjectURL(blob);
    });
}

function fetchJson(jsonUrl, callback) {
  const request = new Request(jsonUrl);
  fetch(request)
    .then((res) => res.json())
    .then((res) => callback(res));
}
