/**
 * Created by yc on 2017-2-22.
 */
(function(){
    //外部迭代器
    var iterator = function(arr){
        var count = 0,
            len = arr.length,
            next,
            isdone,
            getcurrval,
            getlen;
        next = function(){
            return count += 1;
        };
        isdone = function(){
            return count <= len;
        }
        getcurrval = function(){
            return arr[count]
        }
        getlen = function(){
            return len;
        }
        return {
            next: next,
            isdone: isdone,
            getcurrval: getcurrval,
            getlen: getlen
        }
    }

    var compare = function(it1, it2){
        if(it1.getlen() !== it2.getlen()){
           return console.log('不相等')
        }
        while(it1.isdone() && it2.isdone()){
            if(it1.getcurrval() === it2.getcurrval()){
                it1.next();
                it2.next();
            }else{
               return console.log('不相等')
            }
        }
        return console.log('相等')
    }

    compare(iterator([1,2,3]),iterator([1,2,3]))//相等
})()