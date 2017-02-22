/**
 * Created by yc on 2017-2-22.
 */
;(function(){
    //高阶函数动态创建代理

    var puls = function(){
        var sum = 0;
        for(var i = 0, l = arguments.length; i < l; i++){
            sum += arguments[i];
        }
        return sum;
    }

    var mult = function(){
        var sum = 1;
        for(var i = 0, l = arguments.length; i < l; i++){
            sum *= arguments[i];
        }
        return sum;
    }

    var proxyFactory = function(fn){
        var cache = {};
        return function (){
            var args = [].join.call(arguments, ',')
            if(cache[args]){
                console.log('缓存的值')
                return cache[args]
            }

            return cache[args] = fn.apply(this, arguments)

        }
    }

    var pulsproxy = proxyFactory(puls),
        multproxy = proxyFactory(mult);
    console.log(pulsproxy(1, 2, 3)) //6
    console.log(pulsproxy(1, 2, 3)) //6
    console.log(multproxy(1, 2, 3)) //6
})()