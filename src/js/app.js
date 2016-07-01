const helper = window.widgetsHelper;

function runWidget(widget) {
  return data => window[widget].run(widget, data);
}

['menu', 'profile', 'blogpost'].forEach(widget =>
  helper.getAndRun(`/getdata/${widget}`, runWidget(widget))
);

window.form.run('form');
