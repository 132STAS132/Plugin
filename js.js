(function ( $ ) {
    $.fn.treeSelect = function( structure ) {
//        alert("Как-то работает");

        var rootElement = this;

        if (typeof structure === 'string'){
            var result = [];
            var $selects = rootElement.find("select");
            for (var i=0;i<$selects.length;i++){
                if ($($selects[i]).val() == '--'){
                    return false;
                }
                result.push($($selects[i]).val());
            }
            return result;
        }


        function buildSelect(data){
            var $select = $("<select>");
            $("<option>").val('--').text('--').appendTo($select);
            for (var key in data){
                if (Array.isArray(data)){
                    $("<option>").val(data[key]).text(data[key]).appendTo($select);
                }
                else {
                    $("<option>").val(key).text(key).appendTo($select);
                }
            }
            if (!Array.isArray(data)){
                $select.change(function(){
                    var val = $(this).val();
                    var $selects = rootElement.find("select");
                    var del      = false;
                    for (var i=$(this).index()+1;i<$selects.length;i++){
                        $($selects[i]).remove();
                    }
                    //alert(val);
                    if (val in data){
                        rootElement.append(buildSelect(data[val]))
                    }
                });
            }
            return $select;
        }

        rootElement.append(buildSelect(structure))

        return this;
    };
}( jQuery ));

var cars = {
    minivan: {
        mercedes: ["b250", "2102"],
        volkswagen: ["touran"]
    },
    sedan: {
        bmw: ["328", "530"],
        lada: ["2107"]
    },
}

$("#selector").treeSelect(cars);

$("#readResult").click(function(){
    alert ($("#selector").treeSelect("readResult"));
});