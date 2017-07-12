//定义Cell类型: 描述一个格子
//三个属性: r,c,src
function Cell(r,c,src){
  this.r=r;
  this.c=c;
  this.src=src;
}
//定义State类型，描述一种图形的某个旋转状态
//属性: r0,c0,r1,c1,r2,c2,r3,c3
function State(r0,c0,r1,c1,r2,c2,r3,c3){
  for(var i=0;i<4;i++){
    this["r"+i]=arguments[i*2];
    this["c"+i]=arguments[i*2+1];
  }
}
//定义Shape类型: 描述一个图形
//两个属性: cells, src
  //为当前对象添加cells属性，值为cells
  //遍历当前对象的cells数组中每个cell
    //设置当前cell的src为src
function Shape(cells,src,states,orgi){
  this.cells=cells;
  for(var i=0;i<this.cells.length;i++){
    this.cells[i].src=src;
  }
  this.states=states;
  this.orgi=orgi;
  this.statei=0;
}
//在Shape的原型对象中添加IMGS属性为
Shape.prototype.IMGS={
    T:"img/T.png",
    O:"img/O.png",
    I:"img/I.png",
    S:"img/S.png",
    Z:"img/Z.png",
    L:"img/L.png",
    J:"img/J.png",
}
//在Shape的原型对象中添加moveDown方法
Shape.prototype.moveDown=function(){
  //遍历当前对象的cells中的每个cell
  for(var i=0;i<this.cells.length;i++){
    this.cells[i].r+=1;//将当前cell的r+1
  }
}
//在Shape的原型对象中添加moveLeft方法
Shape.prototype.moveLeft=function(){
  //遍历当前对象的cells中的每个cell
  for(var i=0;i<this.cells.length;i++){
    this.cells[i].c-=1;//将当前cell的c-1
  }
}
//在Shape的原型对象中添加moveRight方法
Shape.prototype.moveRight=function(){
  //遍历当前对象的cells中的每个cell
  for(var i=0;i<this.cells.length;i++){
    this.cells[i].c+=1;//将当前cell的c+1
  }
}
//在Shape的原型对象中添加rotateR方法
Shape.prototype.rotateR=function(){
  //将当前对象的statei+1
  this.statei++;
  //如果statei等于states的length，就改回0
  this.statei==this.states.length&&
                                (this.statei=0);
  //调用当前图形的rotate方法
  this.rotate();
}

//在Shape的原型对象中添加rotate方法
Shape.prototype.rotate=function(){
  //获得states中statei位置的对象state
  var state=this.states[this.statei]
  //获得当前对象的cells中orgi位置的格，保存在orgCell
  var orgCell=this.cells[this.orgi];
  //遍历当前图形的每个cell  (i=0,1,2,3)
  for(var i=0;i<this.cells.length;i++){
    var cell=this.cells[i];
    //当前cell的r=orgCell.r+state中ri属性的值
    cell.r=orgCell.r+state["r"+i];
    //当前cell的c=orgCell.c+state中ci属性的值
    cell.c=orgCell.c+state["c"+i];
  }
}

//在Shape的原型对象中添加rotateL方法
Shape.prototype.rotateL=function(){
  //将当前对象的statei-1
  this.statei--;
  //如果statei等于-1，就改回states的length-1
  this.statei==-1&&
        (this.statei=this.states.length-1);
  this.rotate();
}
  

//定义T类型: 描述T图形
function T(){
  //借用Shape类型构造函数
  Shape.call(this,
    [//参数1: 
      new Cell(0,3),
      new Cell(0,4),
      new Cell(0,5),
      new Cell(1,4),
    ],
    this.IMGS.T,//参数2:
    [
      new State(0,-1,0,0,0,1,1,0),
      new State(-1,0,0,0,1,0,0,-1),
      new State(0,1,0,0,0,-1,-1,0),
      new State(1,0,0,0,-1,0,0,1),
    ],
    1
  );
}
//让T类型原型对象继承Shape类型原型对象
Object.setPrototypeOf(
  T.prototype,Shape.prototype
);

//定义O类型: 描述O图形
function O(){
  //借用Shape类型构造函数
  Shape.call(this,
    [//参数1: 
      new Cell(0,4),
      new Cell(0,5),
      new Cell(1,4),
      new Cell(1,5),
    ],
    this.IMGS.O,//参数2:
    [ new State(0,-1,0,0,1,-1,1,0) ],
    1
  );
}
//让O类型原型对象继承Shape类型原型对象
Object.setPrototypeOf(
  O.prototype,Shape.prototype
);

//定义I类型: 描述I图形
function I(){
  //借用Shape类型构造函数
  Shape.call(this,
    [//参数1: 
      new Cell(0,3),
      new Cell(0,4),
      new Cell(0,5),
      new Cell(0,6),
    ],
    this.IMGS.I,//参数2:
    [
      new State(0,-1,0,0,0,1,0,2),
      new State(-1,0,0,0,1,0,2,0),
    ],
    1
  );
}
//让I类型原型对象继承Shape类型原型对象
Object.setPrototypeOf(
  I.prototype,Shape.prototype
);

/*    格子的位置坐标   orgi    states
  S:  04,05,13,14        3       2
  Z:  03,04,14,15        2       2
  L:  03,04,05,13        1       4
  J:  03,04,05,15        1       4
*/