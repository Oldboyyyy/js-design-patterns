;(function(){
    var Event = (function(){
        var clientList = {},
            listen,
            trigger,
            remove;

        //将要发布的事件和处理函数放进事件列表
        listen = function(key, fn){
            if(!clientList[key]){ //如果事件名在列表里面没有就新增
                clientList[key] = [];
            }
            clientList[key].push(fn)
        }

        //找到要执行的回调函数
        trigger = function(){
            var key = [].shift.call(arguments),
                fns = clientList[key];
            if(!fns || fns.length === 0) return false; //判断是否是有效事件
            for(var i = 0, len = fns.length; i < len; i++){
                fns[i].apply(this, arguments)
            }
        }

        //取消事件订阅
        remove = function(key, fn){
            var fns = clientList[key];
            if(!fns) return false; // 判读是否已经订阅了事件
            if(!fn){              //如果不出入指定删除的函数，就是将该事件名下面的所有的回调函数全部删除
                fns && (fns.length = 0)
            }else{

                for(var l = fns.length - 1; l >= 0; l--){
                    var _fn = fns[l];
                    if(_fn === fn){
                        fns.splice(l, 1);
                    }
                }
            }
        }

        //设置对外接口
        return {
            listen: listen,
            trigger: trigger,
            remove: remove
        }
    })()
    Event.listen('aaa', function(str){
        console.log(str);
    })
    Event.listen('aaa', function(str){
        console.log(str + 'hehe');
    })
    Event.trigger('aaa', 'sb')   //sb
                                //sbhehe
    Event.remove('aaa') //'aaa'事件的所有回调都被清空了
    Event.trigger('aaa', 'sb')

    Event.listen('bbb', f1)
    Event.listen('bbb', f2)
    function f1(){
        console.log('我是f1')
    }
    function f2(){
        console.log('我是f2')
    }
    Event.remove('bbb', f1)
    Event.trigger('bbb')

})()

