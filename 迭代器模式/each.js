/**
 * Created by yc on 2017-2-22.
 */
;(function(){
    //内部构造器
    var each = function(arr, fn){
        var value;
        for(var i = 0,l = arr.length; i < l; i++){
            value = fn.call(arr[i], i, arr[i]);
        }
    }

    each([1, 2 ,3], function(index, value){
        console.log(index, value)
    })
})()