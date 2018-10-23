$(document).ready(function() {
    coins_transaction(2000, "remoded");
});


function coins_transaction(value, type) {
  var span = $("<span>");
  span.attr("id", "coins-transaction");
  span.addClass(type);
  span.text(value);
  $("#wallet-painel").append(span);

  setTimeout(function(){
    span.remove();
  }, 3000);
}
