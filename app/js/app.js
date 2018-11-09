var hand = $(".hand");
var bet_modal = $("#bet-modal");
var sccore = $(".score").find("span");
var bet_value = $("#bet-value");
var bet_value_total = $("#bet-painel").find(".value");
var dealer_pts = $("#dealer-side").find(".score").find("span");
var player_pts = $("#player-side").find(".score").find("span");
var bet = 0;
var api = "localhost:5000";
var url = "//" + api;

// Condições do jogo
var BLACKJACK = 21;
var DERROTA  = 0;
var CONTINUE = 1;
var VITORIA  = 2;
var EMPATE   = 3;

// Teste para guardar a carta 
// retorna um objeto card talkei
var card_master = req_api(url + "/hit/dealer-side");

$(document).ready(() => {
    req_api(url);
    console.log("Hello");
    // deal();
    bet_painel();
    wallet()
    sum_cards();
    hit_btn();
    btn_stand();
    btn_reload();

    console.log(card_master);
});

function btn_stand() {
    var stand_btn = $("#stand");
    var dealer_side = $("#dealer-side");

    stand_btn.click(() => {
        stand();
    });
}

function stand(){
    // remover fake card e hit card antes do loop
    $("[data-card-value=0]").hide();
    hit_local();
    hit = true;
    while(hit){
        if ((dealer_pts.text()) < 17){
            hit_api("dealer-side");
        }else{
            hit = false;
        }
    }
    // verify_blackjack((player_pts.text()), (dealer_pts.text()));
}

function verify_results(pts_p, pts_d) {
    pts_p = pts_p.text();
    pts_d = pts_d.text();
    var bvt = bet_value_total.text();
    // verficar blackjack
    var bj = blackjack(pts_p, pts_d);
    console.log(bj);
    console.log(bvt);
    wallet_manager(bj,bvt);
        
    // se eu comprei mais de 21

    // se eu empatei
    // se quem chegou mais perto apos o stand
}

function blackjack(pts_p, pts_d) {
    var res = CONTINUE;
    if (pts_p == BLACKJACK && pts_d == BLACKJACK) {
        res = EMPATE;
    }else if (pts_p == BLACKJACK) {
        res = VITORIA;
    } else if (pts_d == BLACKJACK) {
        res = DERROTA;
    }
    return res; 
}

function show_alert(side, text) {
    var span_alert = $("<span>"+text+"</span>");
    setTimeout(function () {
        $(side).append(span);
    }, 2000);
}

function bet_painel() {
    var bet_deal = $("#bet-deal");

    var chips = $("#chips");
    chips.find(".chip").each((k, chip) => {
        $(chip).click((el) => {
            var val = $(chip).find(".value").text();
            bet += parseInt(val);
            console.log(val);
            bet_value.text(bet);
        });
    });

    bet_deal.click(() => {
        bet_modal.hide();
        bet_value_total.text(bet * 2);
        deal("player-side");
        // deal("dealer-side");
        dealer_deal();
    });

}

function dealer_deal(){
    hit_api("dealer-side");
    card_fake();
}

function card_fake(){
    var card = {
        value: 0,
        url: "red_back.png"
    };
    $("#dealer-side").find(".hand").append(cardHtml(card));
}

function wallet() {
    var res = req_api(url + "/wallet")
    $("#wallet").text(res.wallet);
}

function wallet_manager(type, total_bet) {
    // if type equals CONTINUE
    var res = {"wallet": 0};

    if (type == VITORIA) {
        coins_transaction(total_bet ,"added");
        res = req_api(url + "/wallet/"+total_bet);
    }else if (type == DERROTA){
        coins_transaction(total_bet ,"remoded");
        res = req_api(url + "/wallet/"+(total_bet*-1));
    } else {
        res = req_api(url + "/wallet");
    }
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
        hit_api("player-side");
        // Verifa se a soma é >= 21 se sim: ja da o stand se não continua;
        // var total = req_api(url + "/total/player-side");
    });
}



function new_round() {
    // limpar as mãos
    hand.html("");
    // se o baralhar acabar, reembaralha
    req_api(url + "/reload/deck");
    //mostrar o bet novamente
    bet_modal.show();
    bet_value.text("0");
    bet_value_total.text("0");
    // limpar scoore
    sccore.text("");
    // limpar bet
    bet = 0;
}

function hit_local() {
    var d = $("#dealer-side");
    var c = cardHtml(card_master);
    d.find(".hand").append(c);
    sum_cards();
}

function hit_api(player) {
    var p = $("#" + player);
    var card = req_api(url + "/hit/" + player);
    var c = cardHtml(card);
    p.find(".hand").append(c);
    sum_cards();

}

function sum_cards() {
    console.log("sum cards");

    hand.each((k, el) => {
        var player = $(el).closest(".side").attr("id");
        $this = $(el);
        var sum = 0;
        $this.find(".card").each((k, card) => {
            var v = $(card).attr("data-card-value");
            sum += parseInt(v);
        });
        $(el).parent().find(".score").find("span").text(sum);
    });

    verify_results(player_pts, dealer_pts);
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
    .addClass("card card_flip")
    .attr("data-card-value", card.value)
    .attr("data-card-honor", card.honor);
    var imgHtml = $("<img>").attr("src", "/img/cards/" + card.url);
    // console.log("---------------");
    // console.log(card);

    cardEl.prepend(imgHtml);
    return cardEl;
}

function btn_reload(){
    $("#reload").click(() => {
        console.log("meu ovo");
        res = req_api(url + "/reload/deck");
    })
}
