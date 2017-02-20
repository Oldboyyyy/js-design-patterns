/**
 * Created by yc on 2017-2-20.
 */
;(function () {

   var Event = (function(){
       var global = this,
           Event,
           _default = 'default';
       Event = (function () {

           var namespaceCache = {}, //命名空间对象
               _listen, //内部监听函数
               _trigger, //内部触发函数
               _remove, //内部取消事件函数
               _shift = [].shift, //删除数组第一项，并返回
               _unshift = [].unshift,  //插入到数组开头
               _splice = [].splice, //删除数组指定项
               _create, //构建事件内部对象
               each; //循环函数

           each = function (arr, fn) {
               var ret;
               for (var i = 0, len = arr.length; i < len; i++) {
                   var n = arr[i];
                   ret = fn.call(n, i, n)
               }
               return ret; // 返回最后一项
           };

           _listen = function (key, fn, cache) {
               if (!cache[key]) {
                   cache[key] = [];
               }
               cache[key].push(fn);
           };

           _remove = function (key, cache, fn) {
               var fns = cache[key];
               if (fn) {
                   for (var l = fns.length - 1; l >= 0; l--) {
                       var _fn = fns[l];
                       if (_fn === fn) {
                           _splice(l, 1);
                       }
                   }
               } else {
                   cache[key] = []
               }
           };

           _trigger = function () {
               var cache = _shift.call(arguments),
                   key = _shift.call(arguments),
                   args = arguments,
                   _self = this,
                   stack = cache[key]; //改key对应的回调函数数组
               if (!stack || !stack.length) {
                   return;
               }
               return each(stack, function () {
                   return this.apply(_self, args)
               })
           };

           _create = function (namespace) {
               var namespace = namespace || _default,
                   cache = {},
                   offlineStack = [],
                   ret = {
                       listen: function (key, fn, last) {
                           _listen(key, fn, cache);
                           if (offlineStack === null) {
                               return;
                           }
                           if (last === 'last') {
                               offlineStack.length = offlineStack.pop()();
                           } else {
                               each(offlineStack, function () {
                                   this();
                               })
                           }
                           offlineStack = null;
                       },
                       one: function (key, fn, last) {
                           _remove(key, cache);
                           this.listen(key, fn, last)
                       },
                       remove: function (key, fn) {
                           _remove(key, cache, fn);
                       },
                       trigger: function () {
                           var fn,
                               args,
                               _self = this;

                           _unshift.call(arguments, cache);
                           args = arguments;
                           fn = function () {
                               return _trigger.apply(_self, args)
                           };
                           if (offlineStack) {
                               return offlineStack.push(fn);
                           }
                           return fn();
                       }
                   };
               return namespace ? (namespaceCache[namespace] ? namespaceCache[namespace] : namespaceCache[namespace] = ret) : ret;
           };
           return {
               create: _create,
               listen: function (key, fn, last) {
                   var event = this.create();
                   event.listen(key, fn, last);
               },
               one: function (key, fn, last) {
                   var event = this.create();
                   event.one(key, fn, last)
               },
               remove: function (key, fn) {
                   var event = this.create();
                   event.remove(key, fn)
               },
               trigger: function () {
                   var event = this.create();
                   event.trigger.apply(this, arguments)
               }

           }
       })();
       return Event;
   })();

    Event.listen('click', function(i){
        console.log(i)
    });
    Event.trigger('click', 1);


    Event.create('np').listen('click',function(){
        console.log(111)
    })
    Event.create('np').listen('click',function(){
        console.log(222)
    })
    Event.create('np').trigger('click')

    Event.create('one').one('click',function(){
        console.log('one')
    })
    Event.create('one').one('click',function(){
        console.log('two')
    })
    Event.create('one').trigger('click')


})();