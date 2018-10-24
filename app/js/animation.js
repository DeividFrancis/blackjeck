$(document).ready(function() {
    coins_transaction(2000, "remoded");
    card_transaction();
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

function card_transaction() {
  var card = $("<img src='../img/cards/red_back.png' alt=''>");
  card.attr('id', 'card-transaction');
  $('.deck').append(card);

  setTimeout(function(){
    card.remove();
  }, 1000);
}
