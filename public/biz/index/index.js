$(document).ready(function() {
  jm.scan(document.body)
  .set('data.name', 'hello')
  .set('data.change', function(e) {
    alert(this.value)
  });
});