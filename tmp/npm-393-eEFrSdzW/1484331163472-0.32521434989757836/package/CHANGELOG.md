# v2.1.3
- Make bundle size smaller
- Create optimized hotpath for `filter` in array case.

# v2.1.2
- Fixed a stackoverflow bug with `detect`, `some`, `every` on large inputs (#1293).

# v2.1.0

- `retry` and `retryable` now support an optional `errorFilter` function that determines if the `task` should retry on the error (#1256, #1261)
- Optimized array iteration in `race`, `cargo`, `queue`, and `priorityQueue` (#1253)
- Added alias documentation to doc site (#1251, #1254)
- Added [BootStrap scrollspy](http://getbootstrap.com/javascript/#scrollspy) to docs to highlight in the sidebar the current method being viewed  (#1289, #1300)
- Various minor doc fixes (#1263, #1264, #1271, #1278, #1280, #1282, #1302)

# v2.0.1

- Significantly optimized all iteration based collection methods such as `each`, `map`, `filter`, etc (#1245, #1246, #1247).

# v2.0.0

Lots of changes here!

First and foremost, we have a slick new [site for docs](https://caolan.github.io/async/). Special thanks to [**@hargasinski**](https://github.com/hargasinski) for his work converting our old docs to `jsdoc` format and implementing the new website. Also huge ups to [**@ivanseidel**](https://github.com/ivanseidel) for designing our new logo. It was a long process for both of these tasks, but I think these changes turned out extraordinary well.

The biggest feature is modularization. You can now `require("async/series")` to only require the `series` function. Every Async library function is available this way. You still can `require("async")` to require the entire library, like you could do before.

We also provide Async as a collection of ES2015 modules. You can now `import {each} from 'async-es'` or `import waterfall from 'async-es/waterfall'`. If you are using only a few Async functions, and are using a ES bundler such as Rollup, this can significantly lower your build size.

Major thanks to [**@Kikobeats**](github.com/Kikobeats), [**@aearly**](github.com/aearly) and [**@megawac**](github.com/megawac) for doing the majority of the modularization work, as well as [**@jdalton**](github.com/jdalton) and [**@Rich-Harris**](github.com/Rich-Harris) for advisory work on the general modularization strategy.

Another one of the general themes of the 2.0 release is standardization of what an "async" function is. We are now more strictly following the node-style continuation passing style. That is, an async function is a function that:

1. Takes a variable number of arguments
2. The last argument is always a callback
3. The callback can accept any number of arguments
4. The first argument passed to the callback will be treated as an error result, if the argument is truthy
5. Any number of result arguments can be passed after the "error" argument
6. The callback is called once and exactly once, either on the same tick or later tick of the JavaScript event loop.

There were several cases where Async accepted some functions that did not strictly have these properties, most notably `auto`, `every`, `some`, and `filter`.

Another theme is performance. We have eliminated internal deferrals in all cases where they make sense. For example, in `waterfall` and `auto`, there was a `setImmediate` between each task -- these deferrals have been removed. A `setImmediate` call can add up to 1ms of delay. This might not seem like a lot, but it can add up if you are using many Async functions in the course of processing a HTTP request, for example. Nearly all asynchronous functions that do I/O already have some sort of deferral built in, so the extra deferral is unnecessary. Th