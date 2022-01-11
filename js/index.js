var app
var DW, DH;
var vod_auth, utm_source, utm_medium, utm_campaign, utm_content;
var owlList1, owlListPopup;

var Horsepower = 320;
var Torque = 40.8;
var Speed = 250;
var Accelerate = 4.8;

$(function () {
    // initIndex
    initIndex();
});

function initIndex() {
    // scrollAnimate
    scrollAnimate();
    // windowResize
    windowResize();
    $(window).resize(function () { windowResize(); });
    // vodAuth
    vodAuth();
    // formSubmit
    formSubmit();
    // cookiemgmt
    cookieMgmt();
    //  owl-popup
    owlPopup();
    // NumCounterUp
    NumCounterUp();
    // wowInit   
    wowInit();
}

// wowInit   
function wowInit() {

    // Helper function for add element box list in WOW
    WOW.prototype.addBox = function (element) {
        this.boxes.push(element);
    };

    var wowStroke = new WOW({ boxClass: "wow-stroke" });
    wowStroke.init();

    // Attach scrollSpy to .wow elements for detect view exit events,
    // then reset elements and add again for animation

    $('.wow-stroke').on('scrollSpy:exit', function () {
        // $(this).css({
        //     'visibility': 'hidden',
        //     'animation-name': 'none'
        // }).removeClass('animated');
        wowStroke.addBox(this);
    }).scrollSpy();


}

function NumCounterUp() {


    var Horsepower = new CountUp("Horsepower", 0, 320, 0, 1, {
        useEasing: false,
        useGrouping: true,
    });
    var Torque = new CountUp("Torque", 0, 40.8, 1, 1, {
        useEasing: false,
        useGrouping: true,
    });
    var Speed = new CountUp("Speed", 0, 250, 0, 1, {
        useEasing: false,
        useGrouping: true,
    });
    var Accelerate = new CountUp("Accelerate", 0, 4.8, 1, 1, {
        useEasing: false,
        useGrouping: true,
    });

    var _active = true;
    $(window).load(function(){
        _active = true;
    });
    var performance1 = new Waypoint({
        element: document.getElementById('performance1'),
        handler: function (direction) {
            // console.log('performance1',direction);
            // console.log('_active',_active);
            if (direction == "up") {
                if (_active) {
                    Horsepower.reset();
                    Torque.reset();
                }
            } else {
                Horsepower.start();
                Torque.start();
            }

        },
        offset: '50%'
    });

    var performance2 = new Waypoint({
        element: document.getElementById('performance2'),
        handler: function (direction) {
            // console.log('performance2',direction);
            if (direction == "up") {
                if (_active) {
                    // Horsepower.start();
                    // Torque.start();
                    Speed.reset();
                    Accelerate.reset();
                }
            } else {
                // Horsepower.reset();
                // Torque.reset();
                Speed.start();
                Accelerate.start();
            }
        },
        offset: '50%'
    });

    var appearance = new Waypoint({
        element: document.getElementById('appearance'),
        handler: function (direction) {
            // console.log('appearance',direction, _active);
            if (direction == "up") {
                // Speed.start();
                // Accelerate.start();
            } else {
                // Speed.reset();
                // Accelerate.reset();
                _active = false;
            }
        },
        offset: '50%'
    });


}

// windowResize
function windowResize() {
    DW = $(window).innerWidth();
    DH = $(window).innerHeight();
    if (DW >= 992) {
        $('.owl-1').owlCarousel('destroy');
        $('.owl-1').removeClass('owl-carousel');
    } else {
        // owl1
        owl1();
    }
}

// owl1
function owl1() {
    $('.owl-1').addClass('owl-carousel');
    owlList1 = $('.owl-carousel.owl-1');
    owlList1.trigger('destroy.owl.carousel');
    owlList1.owlCarousel({
        nav: true,
        loop: true,
        dots: true,
        margin: 10,
        items: 1,
        responsiveClass: true,
        navText: ["", ""],
        navElement: 'div'
    });
};

// owlPopup
function owlPopup() {

    owlListPopup = $('.owl-carousel.owl-popup');
    owlListPopup.trigger('destroy.owl.carousel');
    owlListPopup.owlCarousel({
        nav: true,
        loop: true,
        dots: false,
        margin: 10,
        items: 1,
        responsiveClass: true,
        navText: ["", ""],
        navElement: 'div'
    });

    var caseIndex = 0;

    $('.owl-1 .item a').on('click', function () {
        caseIndex = $(this).data("index") - 1;
        // console.log('caseIndex',caseIndex);
    })

    $('#popupAppearance, #popupPower, #popupVariant').on('show.bs.modal', function () {
        owlListPopup.trigger("to.owl.carousel", [caseIndex, 0, true]);
    });

};

// cookieMgmt
function cookieMgmt() {
    var _cookie = document.cookie;
    if (_cookie.indexOf('banner_removed=1') !== -1) {
        document.getElementById('closeButton').parentNode.style.display = 'none';
    } else {
        $('.cookiemgmt').removeClass('d-none');
    }
    document.getElementById('closeButton').addEventListener('click', function (e) {
        e.preventDefault();
        this.parentNode.style.display = 'none';
        document.cookie = "banner_removed=1";
        console.log('document.cookie', document.cookie);
    }, false);
}

// vodAuth
function vodAuth() {
    vod_auth = new vods_secure('index', 'scc_auth_code');
}

//getURLParameter
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
}
// formSubmit
function formSubmit() {

    $(".form .form-submit").bind("click", function () {
        console.log('formSubmit');

        vod_auth = new vods_secure('index', 'scc_auth_code');
        utm_source = getURLParameter("utm_source");
        utm_medium = getURLParameter("utm_medium");
        utm_campaign = getURLParameter("utm_campaign");
        utm_content = getURLParameter("utm_content");

        if ($("#mcode").val() == '') {
            $('#POPUP .modal-title').html("資料輸入錯誤");
            $('#POPUP .modal-body').html("請填寫驗證碼!");
            $('#POPUP').modal('show');
        } else {
            var username = $("#username").val();
            var gender = $("#gender").val();
            var age = $("#age").val();
            var mobile = $("#mobile").val();
            var email = $("#email").val();
            var address = $("#address").val();
            var driveplace = $("#driveplace").val();
            var carbrand = $("#carbrand").val();
            var cartype = $("#cartype").val();
            var mcode = $("#mcode").val();
            var contact_time = $("#contact_time").val();
            var demo_mode = $("#demo_mode").val();
            var device = 'pc';

            // Mobile
            var mobiles = new Array(
                "midp", "j2me", "avant", "docomo", "novarra", "palmos", "palmsource",
                "240x320", "opwv", "chtml", "pda", "windows ce", "mmp/",
                "blackberry", "mib/", "symbian", "wireless", "nokia", "hand", "mobi",
                "phone", "cdm", "up.b", "audio", "sie-", "sec-", "samsung", "htc",
                "mot-", "mitsu", "sagem", "sony", "alcatel", "lg", "eric", "vx",
                "NEC", "philips", "mmm", "xx", "panasonic", "sharp", "wap", "sch",
                "rover", "pocket", "benq", "java", "pt", "pg", "vox", "amoi",
                "bird", "compal", "kg", "voda", "sany", "kdd", "dbt", "sendo",
                "sgh", "gradi", "jb", "dddi", "moto", "iphone", "android",
                "iPod", "incognito", "webmate", "dream", "cupcake", "webos",
                "s8000", "bada", "googlebot-mobile"
            )

            var ua = navigator.userAgent.toLowerCase();
            for (var i = 0; i < mobiles.length; i++) {
                if (ua.indexOf(mobiles[i]) > 0) {
                    device = 'mobile';
                    break;
                }
            }
            if (ua.indexOf('ipad') > 0 || ua.indexOf('iPad') > 0) {
                device = 'ipad';
            }
            //console.log(username, gender, age, mobile, email, address, driveplace, carbrand, cartype, mcode, device, contact_time, demo_mode);

            MediaFormSend(); 
            saveData(username, gender, age, mobile, email, address, driveplace, carbrand, cartype, mcode, device, contact_time, demo_mode);

            // gaEvent("sendData", "go");
        }
        console.log("form-submit click");
        return false;
    });


}
// saveData
function saveData(username, gender, age, mobile, email, address, driveplace, carbrand, cartype, mcode, device, contact_time, demo_mode) {
    $(".form .btn-submit").attr("disabled", true);

    $.ajax({
        url: "//www.vods.com.tw/webservice/ajax-save2.php",
        data: {
            actid: "52",
            actkey: "fsgzyyvppvitpobo",
            fsgzyyvppvitpobo: $("#fsgzyyvppvitpobo").val(), //請加此行, 前面與活動代碼相同
            username: username,
            gender: gender,
            age: age,
            mobile: mobile,
            email: email,
            address: address,
            driveplace: driveplace,
            carbrand: carbrand,
            cartype: cartype,
            device: device,
            utm_source: utm_source,
            utm_medium: utm_medium,
            utm_campaign: utm_campaign,
            utm_content: utm_content,
            mcode: mcode,
            contact_time: contact_time,
            demo_mode: demo_mode
        },
        type: "POST",
        dataType: "jsonp",
        jsonpCallback: "result",
        success: result
    });

    function result(responseText) {
        if (responseText.succ == "Y") {
            $('#POPUP .modal-title').html("");
            $('#POPUP .modal-body').html("您的資料已送出，我們將安排專人與您聯繫！");
            $('#POPUP').modal('show');

            $('.form')[0].reset();
            reloadImg();

            //thank page track
            thankUTracking('thankYouPage.html');

        } else {

            $('#POPUP .modal-title').html("資料輸入錯誤");
            $('#POPUP .modal-body').html(responseText.err);
            $('#POPUP').modal('show');

            reloadImg();
        }
        $(".form .btn-submit").attr("disabled", false);
    }

    function reloadImg() {
        //如果要更新認證碼請使用新的api
        vod_auth.refresh_code();
        $(".form .mcode").val("");
    }
}


// scrollAnimate
function scrollAnimate() {
    // SCroll Animate ___________________________________________________
    $('header a[href*=#],.kv a[href*=#]').click(function (e) {
        var target = $(this).attr('href');
        S = (target.substr(-1));

        if (target[0] == '#' && target.length > 1) {
            $('html,body').animate({
                scrollTop: $(target).offset().top
            }, 1000);
            $('.nav-main').collapse('hide');
        }
        e.preventDefault();
    });
}

/* ========================================================================
 * Bootstrap: affix.js v3.3.5
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+
    function ($) {
        'use strict';

        // AFFIX CLASS DEFINITION
        // ======================

        var Affix = function (element, options) {
            this.options = $.extend({}, Affix.DEFAULTS, options)

            this.$target = $(this.options.target)
                .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
                .on('click.bs.affix.data-api', $.proxy(this.checkPositionWithEventLoop, this))

            this.$element = $(element)
            this.affixed = null
            this.unpin = null
            this.pinnedOffset = null

            this.checkPosition()
        }

        Affix.VERSION = '3.3.5'

        Affix.RESET = 'affix affix-top affix-bottom'

        Affix.DEFAULTS = {
            offset: 0,
            target: window
        }

        Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
            var scrollTop = this.$target.scrollTop()
            var position = this.$element.offset()
            var targetHeight = this.$target.height()

            if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

            if (this.affixed == 'bottom') {
                if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
                return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
            }

            var initializing = this.affixed == null
            var colliderTop = initializing ? scrollTop : position.top
            var colliderHeight = initializing ? targetHeight : height

            if (offsetTop != null && scrollTop <= offsetTop) return 'top'
            if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

            return false
        }

        Affix.prototype.getPinnedOffset = function () {
            if (this.pinnedOffset) return this.pinnedOffset
            this.$element.removeClass(Affix.RESET).addClass('affix')
            var scrollTop = this.$target.scrollTop()
            var position = this.$element.offset()
            return (this.pinnedOffset = position.top - scrollTop)
        }

        Affix.prototype.checkPositionWithEventLoop = function () {
            setTimeout($.proxy(this.checkPosition, this), 1)
        }

        Affix.prototype.checkPosition = function () {
            if (!this.$element.is(':visible')) return

            var height = this.$element.height()
            var offset = this.options.offset
            var offsetTop = offset.top
            var offsetBottom = offset.bottom
            var scrollHeight = Math.max($(document).height(), $(document.body).height())

            if (typeof offset != 'object') offsetBottom = offsetTop = offset
            if (typeof offsetTop == 'function') offsetTop = offset.top(this.$element)
            if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

            var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

            if (this.affixed != affix) {
                if (this.unpin != null) this.$element.css('top', '')

                var affixType = 'affix' + (affix ? '-' + affix : '')
                var e = $.Event(affixType + '.bs.affix')

                this.$element.trigger(e)

                if (e.isDefaultPrevented()) return

                this.affixed = affix
                this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

                this.$element
                    .removeClass(Affix.RESET)
                    .addClass(affixType)
                    .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
            }

            if (affix == 'bottom') {
                this.$element.offset({
                    top: scrollHeight - height - offsetBottom
                })
            }
        }


        // AFFIX PLUGIN DEFINITION
        // =======================

        function Plugin(option) {
            return this.each(function () {
                var $this = $(this)
                var data = $this.data('bs.affix')
                var options = typeof option == 'object' && option

                if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
                if (typeof option == 'string') data[option]()
            })
        }

        var old = $.fn.affix

        $.fn.affix = Plugin
        $.fn.affix.Constructor = Affix


        // AFFIX NO CONFLICT
        // =================

        $.fn.affix.noConflict = function () {
            $.fn.affix = old
            return this
        }


        // AFFIX DATA-API
        // ==============

        $(window).on('load', function () {
            $('[data-spy="affix"]').each(function () {
                var $spy = $(this)
                var data = $spy.data()

                data.offset = data.offset || {}

                if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
                if (data.offsetTop != null) data.offset.top = data.offsetTop

                Plugin.call($spy, data)
            })
        })

    }(jQuery);