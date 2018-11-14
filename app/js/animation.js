$(document).ready(function() {
    // coins_transaction(2000, "remoded");
    // card_first_hit();
    card_hit_player();
    // card_flip();
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

function card_first_hit() {

}

function card_hit_player() {
  var card = $("<img src='../img/cards/red_back.png' alt=''>");
  card.attr('id', 'card_hit_to_player');
  $('.deck').append(card);

  // setTimeout(function(){
  //   card.remove();
  // }, 1000);
}

function card_flip() {
  var card = $("<img src='../img/cards/red_back.png' alt=''>");
  card.attr('id', 'card-flipping');
  $('#dealer-side').append(card);

  // setTimeout(function(){
  //   card.remove();
  // }, 1000);
}

function animate_wallet(value) {
  var my_wallet = $("#wallet").text();

  for (var i = 0; i <= value; i++){
    var j = (i >= 100) ? 100 : 1;
    delay_bet(j, my_wallet);
  }
}

function delay_bet(i, my_wallet) {
  setTimeout(function () {
    $("#wallet").text(my_wallet-i);
  }, i*10);
}