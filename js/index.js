

// 車資計算公式：（以北北基營業區為例）
// [ 基本費用 39 元 + (分鐘數 * 每分鐘費用 1.7 元) + (公里數 * 每公里費用 25 元) ] *動態加乘倍數 = 應付車資總額

uberDrive = function () {
    //private properties
    var _totleAll = 0;      //乘客費用
    var _totalDriver = 0;   //司機所得
    var _baseFee = 39;      //基本費用
    var _timeFee = 1.7;     //每分鐘費用
    var _distanceFee = 25;  //每公里費用
    var _driverFee = 0.75;  //司機費用百分比
    var _time = 0;          //搭乘時間(分鐘)
    var _distance = 0;      //搭乘距離(公里)    
    var _multiplier = 1;    //動態加乘倍數

    var _timeMax = 720;
    var _distanceMax = 500;
    var _multiplierMax = 10;



    //private methods
    function init() {
        $(".form-control").on("change keyup ", getData);
        $(".form-control-range").on("change", getDataRange);

        $(document).on('input', '.form-control-range', getDataRange);

        setData();
    }


    function getData() {
        _time = $("#time").val();
        _distance = $("#distance").val();
        _multiplier = $("#multiplier").val();

        $("#distanceRange").val(_distance);
        $("#timeRange").val(_time);
        $("#multiplierRange").val(_multiplier);

        setData();
    }

    function getDataRange() {
        _time = $("#timeRange").val();
        _distance = $("#distanceRange").val();
        _multiplier = $("#multiplierRange").val();

        $("#distance").val(_distance);
        $("#time").val(_time);
        $("#multiplier").val(_multiplier);

        setData();
    }

    function setData() {

        if (_distance > _distanceMax) { _distance = _distanceMax; }
        if (_time > _timeMax) { _time = _timeMax; }
        if (_multiplier > _multiplierMax) { _multiplier = _multiplierMax; }

        $("#distance").val(_distance);
        $("#time").val(_time);
        $("#multiplier").val(_multiplier);
        $("#distance").val(_distance);
        $("#time").val(_time);
        $("#multiplier").val(_multiplier);

        _totleAll = (_baseFee + (_time * _timeFee) + (_distance * _distanceFee)) * _multiplier;
        _totalDriver = _totleAll * _driverFee;

        $('#totalAll').val("NT$" + (Math.round(_totleAll*100)/100).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
        $('#totalDriver').val("NT$" + (Math.round(_totalDriver*100)/100).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    }


    {
        init();
    }
    return {

    };
}
var myDrive = new uberDrive();