/**
 * Created by yc on 2017-2-20.
 */
;(function(){

    var global = this,
        Event,
       _default = 'default';
    Event = (function(){

        var namespaceCache = {},
            _listen,
            _trigger,
            _remove,
            _shift = [].shift,
            _unshift = [].nushift,
            _splice = [].splice,
            _create,
            each;

        each = function(arr, fn){
            var ret;
            for(var i = 0, len = arr.length; i < len; i++){
                var n = arr[i];
                ret = fn.call(n, i, n)
            }
            return ret;
        }

        _listen = function(key, fn, cache){
            if(!cache[key]){
                cache[key] = [];
            }
            cache[key].push(fn);
        }

        _remove = function(key, cache, fn){
            if(fn){
                for(var l = fns.length - 1; l >= 0; l--){
                    var _fn = fns[l]
                    if(_fn === fn){
                        _splice(l, 1);
                    }
                }
            }else{
                cache[key] = []
            }


        }

        _trigger = function(){
            var cache = _shift(this, arguments),
                key = _shift(this, arguments),
                args = arguments,
                _self = this,
                stack = cache[key];
            if(!stack || !stack.length){
                return;
            }
            return each(stack, function(){
                return this.apply(_self, args)
            })
        }

        _create = function(namespace){
            var namespace = namespace || _default,
                cache = {},
                offlinStack = [],
                ret = {
                    listen: function(key, fn, last){
                        _listen(key, fn, cache);
                        if(offlinStack === null){
                            return;
                        }
                        if(last === 'last'){
                            offlinStack.length = offlinStack.pop()();
                        }else{
                            each(offlinStack, function(){
                                this();
                            })
                        }
                        offlinStack = null;
                    },
                    one: function(key, fn, last){
                        _remove(key, cache);
                        this.listen(key, fn, last)
                    },
                    remove: function(key, fn){
                        _remove(key, cache, fn);
                    },
                    trigger: function(){
                        var fn,
                            args,
                            _self = this;
                        _unshift.call(arguments, cache);
                        args = arguments;
                        fn = function(){
                            return _trigger.apply(_self, args)
                        }
                        if(offlinStack){
                            return offlinStack.push(fn);
                        }
                        return fn();
                    }
                    return namespaceCache ? (namespaceCache[namespace] ? namespaceCache[namespace] : ret) : ret
                };
            return{
                create: _create,
                listen: function(key, fn, last){
                    var event = this.create();
                        event.listen(key, fn, last);
                },
                one: function(key, fn, last){
                    var event = this.create();
                        event.one(key, fn, last)
                },
                remove: function(key, fn){
                    var event = this.create();
                        event.remove(key, fn)
                },
                trigger: function(){
                    var event = this.create();
                        event.trigger.apply(this, arguments)
                }

            }
        }

    })()
})()