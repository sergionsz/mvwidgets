function getAndRun(url, callback) {
  const xhr = new XMLHttpRequest;
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      callback(data);
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
}

function runWidget(widget) {
  return data => window[widget].run(widget, data);
}

['menu', 'profile', 'blogpost'].forEach(widget =>
  getAndRun(`/getdata/${widget}`, runWidget(widget))
);

window.form.run('form');
