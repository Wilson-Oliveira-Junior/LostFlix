var _STATE = {};
function runOnce() {
    if (!_STATE.hasRunOnce) {
        if (window.PrivacyManagerAPI) {
            window.addEventListener("message", function (e) {
                try {
                    var json = JSON.parse(e.data);
                    json.PrivacyManagerAPI && handleAPIResponse(json.PrivacyManagerAPI);
                } catch (e) {
                    e.name != 'SyntaxError' && console.log(e);
                }
            }, false);
            var apiObject = { PrivacyManagerAPI: { self: "ea.com", action: "getConsent", timestamp: new Date().getTime(), type: "functional" } };
            window.top.postMessage(JSON.stringify(apiObject), "*");

            _STATE.hasRunOnce = true;
            _STATE.i && clearInterval(_STATE.i);
        }
    }
}

function getBehavior() {
    var result = "";
    var rx = new RegExp("\\s*notice_behavior\\s*=\\s*([^;]*)").exec(document.cookie);
    if (rx && rx.length > 1) {
        result = rx[1];
    }
    return result;
}

function handleAPIResponse(response) {
    if (!response.source || response.self != "ea.com") {
        return;
    }
    var isEU = /.*(,|)eu/i.test(getBehavior());
    if (isEU && response.source != "asserted") {
        return;
    }

    var setting = null;
    if (!_STATE.hasLoadedFunctional) {
        setting = PrivacyManagerAPI.callApi("getConsent", "ea.com", null, null, "functional");
        if (setting.consent == "approved") {
            activateElement(document.querySelectorAll(".trustecm[trackertype=functional]"));
            _STATE.hasLoadedFunctional = true;
        }
        document.getElementById('nav_menu-extralegal').style.display = "inline";
    }
}

function activateElement(list) {
    if (!(list instanceof Array || list instanceof NodeList)) {
        throw "Illegal argument - must be an array";
    }
    for (var item, i = list.length; i-- > 0;) {
        item = list[i];
        item.class = "trustecm_done";
        if (item.nodeName.toLowerCase() === "script") {
            var z = item.getAttribute("thesrc");
            if (z) {
                var y = document.createElement("script");
                y.src = z;
                y.async = item.async;
                item.parentNode.insertBefore(y, item);
            } else {
                eval(item.text || item.textContent || item.innerText);
            }
        }
    }
}
_STATE.i = setInterval(runOnce, 10);

(async () => {
    const ccpaHTML = fetch('https://www.ea.com/ccpa/banner')
        .then(res => {
            return res.text();
        }).then(data => {
            const ccpaHTML = new DOMParser().parseFromString(data, 'text/html').querySelector('.eapl-ccpa-banner__link');
            return ccpaHTML;
        });

    class CCPABlock extends HTMLElement {
        constructor() {
            super();
        }


        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: 'open' });

            ccpaHTML.then(htmlRes => {
                if (htmlRes) {
                    var css = 'a { color: #ffffff; text-decoration: underline; font: bold 11px arial; display: inline-block;  } a:hover{ color: #e0bd49; }'

                    var style = document.createElement('style');
                    if (style.styleSheet) {
                        style.styleSheet.cssText = css;
                    } else {
                        style.appendChild(document.createTextNode(css));
                    }
                    shadowRoot.appendChild(style);

                    shadowRoot.appendChild(htmlRes.cloneNode(true));
                    document.getElementById('ccpa-sep').style.display = "inline";
                }
            });
        }
    }
    customElements.define("ccpa-block", CCPABlock);
})();


(window.BOOMR_mq = window.BOOMR_mq || []).push(["addVar", { "rua.upush": "false", "rua.cpush": "false", "rua.upre": "false", "rua.cpre": "true", "rua.uprl": "false", "rua.cprl": "false", "rua.cprf": "false", "rua.trans": "SJ-0ceef53a-66b2-41ad-8786-09537c82bba8", "rua.cook": "true", "rua.ims": "false", "rua.ufprl": "false", "rua.cfprl": "true", "rua.isuxp": "false", "rua.texp": "norulematch" }]);
!function (e) { var n = "https://s.go-mpulse.net/boomerang/"; if ("False" == "True") e.BOOMR_config = e.BOOMR_config || {}, e.BOOMR_config.PageParams = e.BOOMR_config.PageParams || {}, e.BOOMR_config.PageParams.pci = !0, n = "https://s2.go-mpulse.net/boomerang/"; if (window.BOOMR_API_key = "6YNW6-BR3DU-BGU49-GXLFM-7WREV", function () { function e() { if (!o) { var e = document.createElement("script"); e.id = "boomr-scr-as", e.src = window.BOOMR.url, e.async = !0, i.parentNode.appendChild(e), o = !0 } } function t(e) { o = !0; var n, t, a, r, d = document, O = window; if (window.BOOMR.snippetMethod = e ? "if" : "i", t = function (e, n) { var t = d.createElement("script"); t.id = n || "boomr-if-as", t.src = window.BOOMR.url, BOOMR_lstart = (new Date).getTime(), e = e || d.body, e.appendChild(t) }, !window.addEventListener && window.attachEvent && navigator.userAgent.match(/MSIE [67]\./)) return window.BOOMR.snippetMethod = "s", void t(i.parentNode, "boomr-async"); a = document.createElement("IFRAME"), a.src = "about:blank", a.title = "", a.role = "presentation", a.loading = "eager", r = (a.frameElement || a).style, r.width = 0, r.height = 0, r.border = 0, r.display = "none", i.parentNode.appendChild(a); try { O = a.contentWindow, d = O.document.open() } catch (_) { n = document.domain, a.src = "javascript:var d=document.open();d.domain='" + n + "';void(0);", O = a.contentWindow, d = O.document.open() } if (n) d._boomrl = function () { this.domain = n, t() }, d.write("<bo" + "dy onload='document._boomrl();'>"); else if (O._boomrl = function () { t() }, O.addEventListener) O.addEventListener("load", O._boomrl, !1); else if (O.attachEvent) O.attachEvent("onload", O._boomrl); d.close() } function a(e) { window.BOOMR_onload = e && e.timeStamp || (new Date).getTime() } if (!window.BOOMR || !window.BOOMR.version && !window.BOOMR.snippetExecuted) { window.BOOMR = window.BOOMR || {}, window.BOOMR.snippetStart = (new Date).getTime(), window.BOOMR.snippetExecuted = !0, window.BOOMR.snippetVersion = 12, window.BOOMR.url = n + "6YNW6-BR3DU-BGU49-GXLFM-7WREV"; var i = document.currentScript || document.getElementsByTagName("script")[0], o = !1, r = document.createElement("link"); if (r.relList && "function" == typeof r.relList.supports && r.relList.supports("preload") && "as" in r) window.BOOMR.snippetMethod = "p", r.href = window.BOOMR.url, r.rel = "preload", r.as = "script", r.addEventListener("load", e), r.addEventListener("error", function () { t(!0) }), setTimeout(function () { if (!o) t(!0) }, 3e3), BOOMR_lstart = (new Date).getTime(), i.parentNode.appendChild(r); else t(!1); if (window.addEventListener) window.addEventListener("load", a, !1); else if (window.attachEvent) window.attachEvent("onload", a) } }(), "".length > 0) if (e && "performance" in e && e.performance && "function" == typeof e.performance.setResourceTimingBufferSize) e.performance.setResourceTimingBufferSize(); !function () { if (BOOMR = e.BOOMR || {}, BOOMR.plugins = BOOMR.plugins || {}, !BOOMR.plugins.AK) { var n = "true" == "true" ? 1 : 0, t = "cookiepresent", a = "whbhkfqxfxouezbb2k7a-f-963e7e1da-clientnsv4-s.akamaihd.net", i = "false" == "true" ? 2 : 1, o = { "ak.v": "34", "ak.cp": "1260028", "ak.ai": parseInt("757969", 10), "ak.ol": "0", "ak.cr": 84, "ak.ipv": 4, "ak.proto": "h2", "ak.rid": "cd9b2fe", "ak.r": 41807, "ak.a2": n, "ak.m": "g", "ak.n": "essl", "ak.bpcip": "177.194.117.0", "ak.cport": 56959, "ak.gh": "23.45.14.92", "ak.quicv": "", "ak.tlsv": "tls1.3", "ak.0rtt": "", "ak.csrc": "-", "ak.acc": "", "ak.t": "1679938238", "ak.ak": "hOBiQwZUYzCg5VSAfCLimQ==KF3Wx1ISxMD2VR5bZd3H1RUIOafvte3vApEnnQprrIrwMGvhATrw4QziSJ6BxrQ/6p0jgwJ+JbTEQ2RH8J8Jy5+fnmhRYEDGMMeNNoO/ALC3nUh8SRsbPzGlLhQrQuw81NkShHwaCFroJdofvG48x3hpMQPOP79xTONPJ9tDPErvbIHxnSw95U0Krl96c0+4SX+NyTARHtDSGUdN92DkmC1rLVOZEBKEQhkos0xBcAuPKmMdGO8j3jOrqWQEB4/c3eTTpa+s4qHia5tOuqWcMCUPSv6/2+BGRnB37ZcgJe87xJpg2RD6UGsm0MqWiGxcT8ozhNKlI0BJJnAxPxT+0v8r+QOGq5yvTtTzv3zQQGNAzVWK2so5QRE2N11eZxCl+GI45OcIJWTdje3yiJOeQbREDFZxgxT6sdMlREG9m+c=", "ak.pv": "3", "ak.dpoabenc": "", "ak.tf": i }; if ("" !== t) o["ak.ruds"] = t; var r = { i: !1, av: function (n) { var t = "http.initiator"; if (n && (!n[t] || "spa_hard" === n[t])) o["ak.feo"] = void 0 !== e.aFeoApplied ? 1 : 0, BOOMR.addVar(o) }, rv: function () { var e = ["ak.bpcip", "ak.cport", "ak.cr", "ak.csrc", "ak.gh", "ak.ipv", "ak.m", "ak.n", "ak.ol", "ak.proto", "ak.quicv", "ak.tlsv", "ak.0rtt", "ak.r", "ak.acc", "ak.t", "ak.tf"]; BOOMR.removeVar(e) } }; BOOMR.plugins.AK = { akVars: o, akDNSPreFetchDomain: a, init: function () { if (!r.i) { var e = BOOMR.subscribe; e("before_beacon", r.av, null, null), e("onbeacon", r.rv, null, null), r.i = !0 } return this }, is_complete: function () { return !0 } } } }() }(window);

$.fn.replaceText = function (regex, replace) {
    if (!regex) { return this; }
    if (!replace) { replace = regex; regex = /./g; }
    var parse = function () {
        if (this.nodeType == 1) { $(this).contents().replaceText(regex, replace); }
        else {
            var html = $(this).text().replace(regex, replace);
            var nodes = $('<div>').html(html).contents();
            $(this).replaceWith(nodes);
        }
    };
    return this.each(parse);
};

$(function () {

    // Automatically italicize "Star Wars" when missing <em> or <i> tags
    var StarWarsItalic = function () { return this.nodeType == 3 && /star wars/i.test($(this).text()) && !$(this).closest("em,i").length; };
    $("body *:not(script,style,iframe)").contents().filter(StarWarsItalic).replaceText(/star wars/gi, '<span class="StarWarsItalic" style="font-style:italic;">Star Wars</span>');

});

$(function () {
    //set up cross domain links when tealium is ready to fire
    document.addEventListener('/ga/ready', function (e) {
        $(document).on('mousedown', 'a[href*="/purchase/item-"]', function (e) {
            e.preventDefault();
            var $this = $(this);
            var href = $this.attr('href');
            $(this).attr('href', window.tlm_ga.decorateLink(href));
        });
    }, false);
});

Drupal.behaviors.swtorLoginEvent = function (context) {
    if (Drupal.settings.user && Drupal.settings.user.nid) {
        var swtorLoginEvent = new CustomEvent('/ga/user/login-success', {
            detail: {
                userid: Drupal.settings.user.nid
            }
        });

        //trigger login success event when tealium is ready to fire
        document.addEventListener('/ga/ready', function (e) {
            document.dispatchEvent(swtorLoginEvent);
        }, false);

    }
};

//event to set custom dimensions for user subscription status
Drupal.behaviors.setSwtorSubscriptionStatus = function (context) {
    if (Drupal.settings.user && Drupal.settings.user.subscriptionstatus) {
        var swtorSubscriptionStatus = new CustomEvent('/ga/user/subscription-status', {
            detail: {
                status: Drupal.settings.user.subscriptionstatus
            }
        });

        //trigger login success event when tealium is ready to fire
        document.addEventListener('/ga/ready', function (e) {
            document.dispatchEvent(swtorSubscriptionStatus);
        }, false);

    }
};
