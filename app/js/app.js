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
    check_wallet()
    console.log(card_master);
});

function check_wallet(){
    var res = req_api(url + "/wallet");
    if (res.wallet == 0) {
        location.reload();
    }
}

function btn_stand() {
    var stand_btn = $("#stand");
    var dealer_side = $("#dealer-side");

    stand_btn.click(() => {
        stand();
    });
}

function stand() {
    
    // remover fake card e hit card antes do loop
    
    hit_local();
    hit = true;
    while(hit){
        if ((dealer_pts.text()) < 17){
            hit_api("dealer-side");
        }else{
            hit = false;
        }
        verify_results(player_pts, dealer_pts);
    }
    // verificar quem chegou mais perto de 21
    compare_sccore(player_pts, dealer_pts);
}


function compare_sccore(pts_p, pts_d) {
    pts_p = pts_p.text();
    pts_d = pts_d.text();
    var bvt = bet_value_total.text();
    var msg;
    var res = 0;
    if ((21 - pts_p) < (21 - pts_d)) {
        msg = "Ganhou"; 
        res = VITORIA;
    } else if ((21 - pts_p) > (21 - pts_d)) {
        if (pts_d > 21) {
            msg = "Ganhou";
            res = VITORIA;
        } else {
            msg = "Perdeu";
            rxes = DERROTA;
        }
    } else if (pts_d == pts_p) {
        msg = "Empate";
        res = EMPATE;
    }
    show_round_result(msg);
    wallet_manager(res, bvt);
}

function verify_results(pts_p, pts_d) {
    pts_p = pts_p.text();
    pts_d = pts_d.text();
    var res = 0;
    var bvt = bet_value_total.text();
    if (pts_p > 21) {
        show_round_result("perdeu");
        res = DERROTA;
        wallet_manager(res, bvt);
        hit_local2();
    } else {
        res = blackjack(pts_p, pts_d);
    }
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

function show_round_result(text) {
    var span_alert = $("<span>" + text + "</span>");
    var botao = $("<button onclick=\"new_round()\">New Round</button>");
    $(".alert").show();
    $(".alert").addClass('overlay').append(span_alert);
    $(".alert").append(botao);
}

function bet_painel() {
    var bet_deal = $("#bet-deal");
    var bet_reset = $("#bet-reset");
    var text = bet_modal.find("h3");
    var chips = $("#chips");
    var response;
    chips.find(".chip").each((k, chip) => {
        $(chip).click((el) => {
            var val = $(chip).find(".value").text();
            bet += parseInt(val);
            bet_value.text(bet);
            response = check_wallet_bet(bet, bet_deal, text);
        });
    });
    
    bet_reset.click(() => {
        text.html("How much money do you wanna bet?");
        bet_deal.attr('hidden', false);
        bet_value.text("0");
        bet = 0;
    });
    
    bet_deal.click(() => {
        if (response){
            bet_value_total.text(bet * 2);
            deal("player-side");
            bet_modal.hide();
            dealer_deal();
        }
    });
}

function check_wallet_bet(bet_val, btn, text) {
    var res = req_api(url + "/wallet");
    if (res.wallet >= bet_val) {
        return true;
    }
    else{
        text.html("Not Enough Money to bet");
        btn.attr('hidden', true);
        return false;
    }
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
    var res = { "wallet": 0 };
    total_bet /= 2;

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

function hit_btn() {
    var hitBtn = $("#hit");
    hitBtn.click(() => {
        hit_api("player-side");
        // Verifa se a soma é >= 21 se sim: ja da o stand se não continua;
        // var total = req_api(url + "/total/player-side");
        verify_results(player_pts, dealer_pts);
    });
}



function new_round() {
    //verificar se tem dinheiro na wallet
    check_wallet();
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
    // limpar tela de resultados
    $(".alert").html("").removeClass("overlay");
}

function hit_local() {
    hit_local2();
}

function hit_local2() {
    $("[data-card-value=0]").hide();
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
