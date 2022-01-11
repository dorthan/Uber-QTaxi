ga_default = function (_id) {
    /* GA default */
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', _id, {
        'send_page_view': true
    });

    function gtag_pageView(_key) {
        //ga('send', 'pageview', key);
        gtag('config', _id, {
            'page_title': _key,
            'page_path': '/' + _key
        });

        console.log("pageView: " + _key);
    }

    function gtag_ButtonClick(_name, _key) {
        //ga('send', 'event', 'Button', 'Click', key);
        gtag('event', 'Click', {
            'event_category': _name,
            'event_label': _key
        });

        console.log(_name + "-Click: " + _key);
    }
    function gtag_Event(_name, _key) {
        //ga('send', 'event', 'Button', 'Click', key);
        gtag('event', 'Video', {
            'event_category': _name,
            'event_label': _key
        });

        console.log(_name + ":" + _key);
    }
    /* GA default */

    function page() {

    }

    /* Demo : class="js_ga" data-category="footer" data-ga="privacy" */
    function page_ga() {
        $(document).on("click", "*[data-ga]", function () {
            gtag_ButtonClick($(this).data("category"), $(this).data("ga"));
        });
    }

    function init() {
        page();
        page_ga()
    } {
        init();
    }
    return {
        pageView: function (_key) {
            gtag_pageView(_key)
        },
        ButtonClick: function (_name, _key) {
            gtag_ButtonClick(_name, _key)
        },
        Event: function (_name, _key) {
            gtag_Event(_name, _key)
        },
    };
}

var myfunction = new ga_default("UA-63182225-21");
