var api = "localhost:5000";
var url = "//" + api;
$(document).ready(() => {
    // req_api(url);
    console.log("Hello");
    // deal();
    bet_modal();
    wallet()
    sum_cards();
    hit_btn();
    stand();
});

function stand() {
    var stand_btn = $("#stand");
    var dealer_side = $("#dealer-side");
    stand_btn.click(() => {
        hit = true;
        while(hit){
            console.log("stand" + pts);
            var pts = $("#dealer-side").find(".score").find("span").text();
            if (pts < 17){
                hit_api("dealer-side");
            }else{
                hit = false;
            }
        }
    });
}

function bet_modal() {
    var bet = 0;
    var bet_modal = $("#bet-modal");
    var bet_painel = $("#bet-painel").find(".value");
    var bet_value_el = $("#bet-value");
    var bet_deal = $("#bet-deal");

    var chips = $("#chips");
    chips.find(".chip").each((k, chip) => {
        $(chip).click((el) => {
            var val = $(chip).find(".value").text();
            bet += parseInt(val);
            console.log(val);
            bet_value_el.text(bet);
        });
    });

    bet_deal.click(() => {
        bet_modal.hide();
        bet_painel.text(bet * 2);
        deal("player-side");
        deal("dealer-side");
    });

}


function wallet() {
    var res = req_api(url + "/wallet")
    $("#wallet").text(res.wallet);
}

function deal(player) {
    var data = req_api(url + "/deal/"+player);
    data.forEach(card => {
        var c = cardHtml(card);
        $("#" + player + " .hand").append(c);
    });
    sum_cards();
}

function hit_btn(player) {
    var hitBtn = $("#hit");
    hitBtn.click(() => {
        console.log("HIT BTN");
        hit_api("player-side");
    });
}

function hit_api(player) {
    var p = $("#" + player);
    var card = req_api(url + "/hit/" + player);
    console.log(card);

    var c = cardHtml(card);
    p.find(".hand").prepend(c);
    sum_cards();

}

function sum_cards() {
    console.log("sum cards");
    var hand = $(".hand");
    
    hand.each((k, el) => {
        var player = $(el).closest(".side").attr("id");
        $this = $(el);
        var sum = 0;
        $this.find(".card").each((k, card) => {
            var v = $(card).attr("data-card-value");
            sum += parseInt(v);
        });
        $(el).parent().find(".score").find("span").text(sum);
        blackjack();
        console.log(player);
    });
}

function blackjack() {
    res = req_api(url + "/blackjack");
    console.log(res);
}

function req_api(link) {
    var res = "Não carregou o Ajax";
    console.log("AJAX");
    $.ajax({
        url: link,
        method: 'GET',
        async: false,
        success: (data) => {
            // console.log(data);
            res = data;
        },
        error: (data, err) => {
            console.error("Erro na requisição " + link);
            console.log(err);
        }
    });
    return res
}

// Builder html
function cardHtml(card) {
    var cardEl = $("<div>")
        .addClass("card")
        .attr("data-card-value", card.value)
        .attr("data-card-honor", card.honor);
    var imgHtml = $("<img>").attr("src", "/img/cards/" + card.url);
    // console.log("---------------");
    // console.log(card);
    
    cardEl.append(imgHtml);
    return cardEl;
}