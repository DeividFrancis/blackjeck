var api = "localhost:5000";
var url = "//" + api;

$(document).ready(() => {
    console.log("Hello");
    // deal();
    sum_cards();
    hit();
});

function deal() {
    var data = req_api(url + "/deal");
    data.forEach(card => {
        var c = cardHtml(card);
        $("#player-side .hand").append(c);
    });
    sum_cards();
}

function hit() {
    var hitBtn = $("#hit");
    hitBtn.click(() => {
        console.log("HIT BTN");
        var res = req_api(url + "/hit");
        res.forEach(card => {
            var c = cardHtml(card);
            $("#player-side .hand").append(c);
        })
        sum_cards();
    });
}

function sum_cards() {
    console.log("sum cards");
    var hand = $(".hand");
    hand.each((k, el) => {
        $this = $(el);
        var sum = 0;
        $this.find(".card").each((k, card) => {
            var v = $(card).attr("data-card-value");
            sum += parseInt(v);
        });
        var score = $(el).parent().find(".score").find("span").text(sum);
        console.log(score);
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
        .addClass("card")
        .attr("data-card-value", card.value)
        .attr("data-card-honor", card.honor);
    var imgHtml = $("<img>").attr("src", "/img/cards/" + card.url);
    cardEl.append(imgHtml);
    return cardEl;
}