## 一、项目构建

## 二、项目 webpack-senior 已经完成了 bable 和 webpack 的配置，相关插件和配置文件复用

### 装 react 相关包

-   两个基本的包 react、react-dom

### 更进一步，字面量的方式写尖括号，创建 html 代码片段（类似组件）

-   需要安装插件，@babel/preset-react 包来解析这种尖括号语法
-   插件还需要引入到.babelrc 配置文件中

## 三、项目运行

-   $ npm run dev

## 四、React 框架中创建组件的四种方式（一步步进化）

-   React.createElement(标签,{属性 1：值 1，属性 2，值 2}||null,子元素或子节点)
-   使用 jsx 语法，字面量的方式创建。var Hello=\<div\>\<\/div\>
-   使用 jsx 语法，function 函数创建
-   使用 jsx 语法，class 创建

### 相关安装包说明

-   上面这四种创建组件的方式，都需要导入 react 包，import React from 'react';
-   组件的渲染和 dom 相关的操作，用到 react-dom 包，在 main.js 中导入
-   使用函数和 class 类创建组件是常用方式，这两种方式都用到了 jsx 尖括号语法，需要一个新的包@babel/preset-react 来转换。安装这个包，并且在 babelrc.配置文件的 presets 节点中声明

### 组件属性的获取和两种组件的使用场景

#### 组件属性

-   function 组件，接收父组件或其他组件传递过来的属性，需要在 function 函数中引入一个参数 props,【props.属性名】获取属性值。并且属性值是只读的
-   class 组件中，属性值的获取需要分开讨论：

1.  构造函数中要获取属性值，需要在构造函数中声明 props 参数，可以获取参数值；
2.  render 函数中要获取属性值，this.props 即可，且这种方式不依赖有没有定义构造函数
3.  类中其他方法，比如事件处理函数中，this.setState(function(preVal,props){}[,callback])。

-   setState 的函数参数的两个参数 preVal 和 props
-   其中 preVal 可以自定义名称，表示的是被改变前的 state 里面的对象值
-   props 表示父组件或其他组件传递过来的属性

#### 使用场合

-   function 组件中接收 props 属性是只读的，没有 state 数据，这种组件叫做无状态组件
-   class 组件中 props 属性也是只读的，但是该组件可以定义自己的私有数据，私有数据 state 是可读可写的，这种组件是有状态组件
-   无状态组件没有自己的生命组件，有状态组件有自己的生命周期

##### 使用

-   如果一个组件要存放自己的私有数据，或在组件的不同阶段执行不同的业务逻辑，此时非常适合使用有状态组件；
-   如果一个组件只需要接收数据，并随之渲染组件，最好使用无状态组件，function 组件由于没有生命周期，运行速度要稍微快一些

## 五、同 jsx 文件样式的隔离

-   方式一：main.js 文件中直接 import '样式文件路径'，得实时关注各个 jsx 文件定义的类名，不要重复。重复类名，可能造成样式的混乱
-   方式二：let obj={margin:10px 0,color:pink} \<div style={obj}\>;这种方式会定义很多的对象，虽然可以模块的形式导出，但样式的抽取、打包不方便
-   方式三：
    1. 在 css 目录下定义样式文件，文件命名要和组件有一定的关联，以便于查找
    2. 在 webpack.config.js（或 webpack.pub.config.js）中为 css-loader 配置开启模块化（modules:true;），并重定义类名的规范（localIdentName:'[local]--[hash:base64:5]'）
    3. 在需要样式文件的 jsx 文件中，import ObjStyle form '样式文件路径'；
    4. 将类名修正。例如：原来是\<div className="user"\>\</div\>变更为\<div className={ObjStyle.use}\>\<\/div\>

## 六、React 组件的生命周期

### React@16.3开始的版本，生命周期钩子的原来的名字要使用，前面需要加一个 UNSAFE\_前缀（举例：componentWillUpdate，应该写作 UNSAFE_componentWillUpdate），要不然控制台就会提示警告信息

### 在 React 属性，有一些属性必须传的。但是没有传，就会从默认属性 defaultProps 中获取这个【启动参数】

-   启动参数以静态变量的方式，在 class 类组件中定义；例如：static defaultProps={initVal:0}

### 对父组件或其他组件传递过来的属性，进行必要的类型校验,以确保当前组件拿到的是需要的数据类型

-   react@15.x版本以后，类型校验需要的包已经被单独封装成了一个包，prop-types，安装改包：$ npm i prop-types@15.7.2 --save-dev
-   在需要的组件中，导入一个对象；import ReactTypes from 'prop-types';
-   在类组件中同样定义一个静态变量，static propTypes={initVal:ReactTypes.number};

### 钩子 componentWillMount

-   含义：该阶段组件还没有开始挂载，也没有开始渲染虚拟 dom
-   整个生命周期阶段，只执行一次；可以调用 setState()方法，另外两个可以调用 setState 的钩子时 componentDidMount 和 componentWillReceiveProps
-   可以拿到 this.state、this.props 中的数据
-   可以调用自定义的函数
-   不能够操作 dom。原因；虚拟 dom 都还没有开始渲染，如果获取虚拟 dom 对象(document.getElementById('myVal'))，结果是 null

### render 函数渲染阶段

-   含义：开始渲染虚拟 dom，render 函数执行完成，虚拟 dom 就渲染完成了，生成了一个虚拟 dom 树
-   可以拿到数据，前面能够拿到的数据，也一样能拿到
-   在 return 语句之前，获取虚拟 dom，仍然是 null
-   render 函数调用次数是：大于等于 1 次。如果组件从渲染到销毁，没有触发属性或数据变化，就执行一次。一旦出现上述数据的变化，render 函数的执行次数，必然大于等于 2 次
-   注意：render 函数在组件创建阶段和组件运行阶段都有调用，而且调用的是同一个 render 函数，因此 render 函数的调用次数，是组件创建阶段和组件运行阶段的 render 调用次数，一起计算
-   render 阶段获取父组件或其他组件传递过来的属性值，直接使用 this.props.属性名就可以获取。这个 props 是固定写法，不依赖当前组件是否显式定义了构造函数，是否在构造函数中传递了参数

### 钩子 componentDidMount

-   含义：到该阶段虚拟 dom 已经创建完成，数据、虚拟 dom 和页面三者保持一致，数据已经渲染到页面上了
-   该钩子在整个生命周期中，只执行一次。在钩子内部可以调用 setState 方法

### 钩子 shouldComponentUpdate,有两个参数

-   组件是否需要更新，需要返回一个布尔值。true 表示组件需要在页面上更新，值为 false 组件不会在页面上更新了，该钩子后面的生命周期钩子也不会执行了
-   该钩子有两个参数 shouldComponentUpdate(nextProps,nextState),nextProps 中返回的是旧的属性值，nextState 中返回的是更新后的 state 对象值

### 钩子 componentWillUpdate,有两个参数

-   含义：组件即将重新挂载，还没有开始成重新渲染虚拟 dom
-   两个参数：nextProps 返回的是当前组件的属性变化前的对象，nextState 是数据更新后新的 state 对象,同 shouldComponentUpdate 中一样

### 钩子 render 函数

-   已经在前面做了说明

### 钩子 componentDidUpdate，有两个参数，prevProps,prevState;特殊：这两个参数都是变化前的对象，与前面一旧一新不同

-   含义：该阶段更新的数据、重新渲染的虚拟 dom 和更新的页面保持一致，改变的数据已经重新渲染到页面中了
-   prevProps 指 state 变化前传递的属性对象，prevState 指更新前的 state 对象

### 钩子 componentWillUnmount

-   含义：组件销毁阶段

### 钩子 componentWillReceiveProps,有一个参数，nextProps

-   父组件传递给子组件属性，只有当父组件中传递的这个值变化时，才触发这个钩子，结合 TestReceiveProps.jsx 案例理解
-   nextProps 中返回的是传递过来的变化后的对象，当前子组件的 this.props 打印的还是传递的旧对象

## 七、bind 绑定 this 参数并传值的三种方式

### 结合案例 ThisBind.jsx

### 三种方式

#### 1.在 render 函数调用处绑定

-   绑定处，onClick={this.firstHandle.bind(this[,arg1,arg2])}
-   接收处，事件处理函数写成普通函数就可以了

#### 2.在构造函数中绑定并赋值

-   绑定处， constructor(props){super(props); this.secondHandle=this.secondHandle.bind(this,arg1,arg2);}
-   接收处，secondHandle 写成普通函数就可以了

#### 3.使用箭头函数-要解决解析到调用处即执行的问题

-   绑定处，onClick={()=>this.secondHandle(arg1,arg1)};注意不能写成 onClick={this.thirdHandle(arg1,arg2)}这样编译器解析到此处时就会发现 this.thirdHandle()是一个箭头函数，而且立即调用。这不是预期的结果，onClick 事件的目的是人为地来触发，而不是让系统解析代码时触发
-   接收处，thirdHandle=(arg1,arg2)=>{console.log(this)}; 接收处写成箭头函数

### 辅助知识-bind 的三种用法，结合案例 bindUse.js 理解

#### 1.创建绑定函数，react 中前两种都是使用 bind 绑定 this 并传参

#### 2.偏函数，基本用途是为函数预设一个初始参数

#### 3.定时器修改 this 指向，setTimeout(function(){}.bind(this),1000)

## 八、子组件向父组件传值的两种方式

### 结合案例[父子组件之间的传值](https://blog.csdn.net/weixin_42881744/article/details/105706084)

### 父传给子组件

-   不用赘述，绑定属性，这个属性可以是变量，表达式值（如 initVal={0},也可以是函数名）

### 子组件向父组件传值的两种方式

## 九、Context 特性的使用方法

### 使用场景

-   祖父级组件给孙子组件传递一个属性，常规情况下，需要层层传递。祖父传给父组件，父组件才传递给子组件，这种方式将不需要接收数据的父组件也牵涉其中。更何苦，如果层级更深，这种传递灵活性低，而且代码冗余
-   为此，React 引入了 Context 特性来解决这个问题

### 使用步骤

1. 在需要发送数据的顶层组件，定义一个方法，getChildContext,该方法有返回值，返回一个对象，对象的键是要传递的属性的键。如：eturn {fontSize:this.state.fontSize}

2. 同样在该顶层组件中，进行一个数据校验，对要传递出去的数据进行校验，定义一个静态变量 static childContextTypes=fontSize:ReactTypes.number}

3. 在接收处组件，同样地对接收的数据进行类型校验，此时要定义的检验变量是 contextTypes。如：static contextTypes=fontSize:ReactTypes.number}

4. 在 render 函数或者其他位置，使用 this.context.键名来获取值。例如：this.context.fontSize

### 记忆方式

-   getChildContextTypes,前三、后三、后二
-   一个方法，两个静态属性
-   在发送数据处，前三、后三，即：getChildContext 方法，childContextTypes 类型校验
-   在接收数据处，后二，contextTypes
-   然后，获取值使用，this.context.[键名]

## 十、项目问题汇总

### 问题 1

-   ant 框架，提供的 Layout 布局中，点击不同的路由可以实现切换，选中的路由背景为深蓝色的。但是，当手动刷新一下页面后，路由地址栏没有发生变化，但是选中的路由深蓝色背景消失，而【首页】上显示深蓝色背景，切换到\/movie 和\/about 都出现这个问题。
-   原因是：确定哪个路由选中，是有 Menu 标签中 defaultSelectedKeys="['1']"控制的。手动刷新页面后，App 组件重新创建，Menu.Item 中的 key 值销毁，无法和 defaultSelectedKeys 建立关联

### 解决

-   借助 BOM 中的 location 对象，window.location 能够在组件 App 创建阶段拿到当前，手动刷新页面后保持不变的路由 hash 值。将该值跟踪 defaultSelectedKeys 中的值。defaultSelectedKeys={window.location.hash.slice(2)}。另外一种方式是，在钩子 componentWillMount 中使用 this.setState()方法，改变挂载在 state 对象上的值

### 问题 2-编程式重定向的好处

-   重点-编程式重定向推荐使用,区别于声明式重定向在构造函数中，直接使用 this.props.history.push()比在 App.jsx 中使用\<Redirect from="" to=""\/\>这种方法的优点是，地址栏也立即变化。而在 Switch 标签中嵌入 Redirect（单标签），初次时，地址栏是不变化的。只有点击到它的子路由后，地址栏才变成"/movie/in_theaters/1"

### 解决

#### 使用编程式重定向替代声明式，具体做法是在要重定向的那个组件的构造函数，添加 props.history.push(重定向路径)

-   写法 1：联想 this.state 私有数据，this.props.history.push('/movie/in_theaters/1');
-   写法 2：props 是在构造函数中的参数，this 可以省略

### 问题 3-控制台弹出

-   控制台报错：Can't perform a React state update on an unmounted component。组件已经销毁，但是还有未结束的异步任务，使用下列语句取消异步方法

### 解决

#### 解决方案：在组件销毁钩子中添加 this.setState 语句

-   UNSAFE_componentWillUnmount() {
    this.setState = () => false;
    }

## 问题 4-路由导航与 this.props 属性的关系

### 场景

-   在当前组件-PerMv 中，有一个点击.box，编程式导航的操作。点击.box，导航至“详情页”，然而会报一个错误：PerMv.jsx:124 Uncaught TypeError: \'Cannot read properties of undefined reading push\'
-   原因：不能读取属性 push,问题出在 this.props 中没有 history 属性；因此 this.props.history 就是 undefined，后面再调用 push 方法是不可能实现的

### 解决方案

##### 方案一

须知 PerMv 是 SubMovie 的子组件，在 SubMovie 组件中循环渲染 PerMv 时，可以为 PerMv 绑定一个 history 属性或者直接使用属性扩散将
this.props 传递
1.1 \<PerMv{...item} key={index} {...this.props}\>\<\/PerMv\>
1.2 编程式导航中只用到 history,绑定属性 this.props 中的 history 也是可以的
\<PerMv{...item} key={index} history={this.props.history}\>\<\/PerMv\>

##### 方案二

使用 withRouter 插件，它来自 react-router-dom 这个包，和 Route Link Switch 等路由相关标签一样，按需导入一下即可
2.1 引入，import {withRouter} from \'react-router-dom\';
2.2 在 PerMv 组件中，使用 export default withRouter(PerMv);导出当前组件使用 withRouter(PerMv)调用后的组件

## 问题 5-Link 和 Route 中 to 和 path 属性的设定问题

### 场景和解决方案

-   电影\/movie 路径下，有三个子路由/movie/in_theaters/id,/movie/coming_soon/id，/movie/top250/id。为实现切换到一级路由【电影】时，立即选中的是二级子路由的第 1 个(即：/movie/in_theaters/id)。只需要将 Link 中 to="/movie"改成 to="/mo vie/in_theaters/1"即可，to 的含义：是浏览器地址栏的去向，而组件和路由匹配，要达到的目标是尽可能的复用，以减少代码的复杂度。而 Route 在 React 中有两重功能：一、占位符，类似 vue 中的 router-view。而匹配规则：当/movie 下要设定多个子路由时，该 Route 中的 path 应该能匹配到一级路由/movie 和其他三个二级子路由，里面的 path 正确写法为：\<Route path="/movie" component={Movie}\>\<\/\>
-   体会 React 中 Link 中 to 和 Route 中 path 的区别

## 问题 6-手动刷新触发其路由对应的组件的上层组件全部从 0 开始创建

### 为什么 App.jsx 首次通过 window.location.hash 能够打印/home?而切换至电影和关于却无法打印相关路由

1. 页面路由从/重定向到/home,此时也是 App.jsx 组件首次创建，App 组件经历创建阶段，当前钩子 componentWillMount 自然会执行，于是
   window.location.hash 按照预期打印出来

2. 选择路由按钮，切换【电影】和【关于】的路由，此时会切换至 App 的子组件 Movie 或者 About 组件，但是 App 组件并没有重新渲染，因此
   componentWillMount 没有执行，所有正常切换至其他路由不会在当前钩子中打印出 hash 值

3. 比如：切换至 movie 的路由，/movie/in_theaters/1,手动刷新一次页面，此时 App 组件就开始重新基于当前路由(/movie/in_theaters/1)开始渲染新的 App 组件，当前生命周期钩子 componentWillMount 中能打印出此时的路由

4. 第二级别的路由也是同样地情况，手动刷新/movie/in_theaters/1 和/movie/coming_soon/1、/movie/top250/1 都会基于当前地址重新创建 Movie 组件。也是同样的结果，最初 Movie.jsx 中 componentWillMount 只能拿到最开始这个路由，正常切换当前钩子不会打印即时的路 由。手动刷新触发 Movie 组件重新创建了，才会打印即时的路由;总之，深入理解虚拟 dom 的 diff 算法，总会智能地计算出更新 dom 的最小代价。手动刷新将触发所有组件路由 Route 所在组件从 0 开始的创建；观察手动刷新以后，从 App 开始的各级别组件，window.location.hash 都能拿到即时值

## 问题 7

### 场景-请求数据接口的时机

#### /movie 三个子路由切换时

-   4.1 首先，在 componentWillMount 中调用一次 fetch 异步请求数据，完成 SubMovie 界面的初始化渲染
-   4.2 其次，使用 compontWillReceiveProps(nextProps)中，this.setState 重置 state 中相关数据，然后在回调中请求后台数据，基于新数据更新页面
-   伪代码
-   componentWillReceiveProps(nextProps){
-   this.setState({
-   // 基于 nextProps 更改请求参数
-   },()=>{
-   // 回调中，向后台发起请求
-   })
-   }

#### 从电影列表中，点击某一部电影显示块，编程式导航，进入 Detail 组件

-   分析：这里匹配的路由从/movie/:type/:page 到/movie/detail/:id,对应的组件从 SubMovie 变成了 Detail，无论是任何一部电影，【进入详情】这一个过程，始终伴随着新组件的从零开始创建，因此在 componentWillMount 中请求后台数据，这是一个异步过程，执行到异步任务时，先把异步任务推送到队列中，继续向下执行，完成【加载中……】动画的渲染。而后，后台数据也请求过来了，this.setState({isLoading:false,detail:res})来触发虚拟 dom 的重新更新；然而/movie 的三个子路由，则匹配到的是同一个 SubMovie,组件切换时，通过 componentWillReceiveProps(nextProps)的函数体中使用 this.setState 重新更新虚拟 dom

## 问题 8

### 和属性有关的方法

#### Object.keys(obj)

-   含义：将 obj 对象自身的可枚举属性的一个或多个键，以数组的形式返回

#### Object.getOwnPropertyNames(obj)

-   含义：将 obj 对象自身的属性包括可枚举和不可枚举属性的键，以数组的形式返回

#### obj.hasOwnProperty(key)

-   含义：判断对象 obj 上是否有 key 属性(只判断有无，不管他是否可枚举)，不会检查原型上是否有 key 属性；
    返回值是布尔类型。有返回 true;无,返回 false

#### obj.propertyIsEnumerable(key)

-   含义：判断 obj 上的 key 属性是否可枚举，和 hasOwnProperty 一样，不会检查原型上的属性。即时，原型上的某个属性是 key 枚举，通过这个方法验证，也会返回 false

#### for---in 循环

-   含义：for---in 循环可以遍历数组上的对象自身和其原型上的所有【可枚举属性】
-   注意：上述五个知识点中，只有 for---in 循环涉及到了原型上的属性，可以通过 obj.hasOwnProperty(key)这个方法过滤掉原型上的属性

## 问题 10

### 场景

-   为开发好的页面添加一个跟随路由切换的标题

### 解决方案

#### 方案一:使用 history 的 listen 监听和生命周期钩子中处理 window.location.hash

1. 在 App.jsx 的构造函数中监听路由的值，并使用 document.title 设置标题；在此之前，要主要观察 App.jsx 组件中是否有 HashRouter,如果有最好将其移至 ReactDom.render(\<HashRouter\>\<App\>\<\/App\>\<\/HashRouter\>, document.getElementById('app'))中声明。原因是：要在 App.jsx 的 this.props 属性中，获取不到 history 对象。而我们直到，高阶组件 withRouter 可以帮我们实现这个目的；然后，在构造函数中使用 props.history.listen(cb); cb=(location)=>{// location.pathname};
2. 还有个小 bug:当手动刷新页面时，监听函数 listen 不再有效了。手动刷新，当前组件肯定是从零开始重建，那么 componentWillMount 钩子肯定执行；window.location.hash 可以拿到刷新后的当前路由的 hash 值，处理 hash 值，来 document.title 设置 title 标题；
3. 优化：可以封装一个成员函数，来处理不同的路由地址对应的 title 标题。addTitle(cur_path),cur_path 的值在正常切换时，listen 监听起作用，cur_path 传入的是 location.pathname;手动刷新时，cur_path 传入的是 window.location.hash.slice(1),hash 值多一个#号

#### 方案二：使用插件 react-document-title 来实现，引入后，成为一个标签，加入到各路由对应的组件的顶层，并设置一个 title 值即可

#### 方案三：使用插件 react-helmet,更灵活，可以修改主页 index.html 的元信息，如：meta、link 和 title 等
