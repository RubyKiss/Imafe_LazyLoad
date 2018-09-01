var lazyLoad=function()
{
  var imgs=false; //要进行懒加载的图元素列表,init的时候进行了选择,使用selector就是CSS选择器

  /**
   * 图片占位符
   */
  var lzyImg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2O4e/fufwAIyQOXgDhBOwAAAABJRU5ErkJggg==" //图片占位符

  /**
   * 最后加载的SRC的attr属性
   */
  var src_attr = "jsrc" //最后加载的SRC的attr属性

  /**
   * selector CSS选择器，必须是IMG图
   * loadLzy 是否使用此函数加载占位符，默认是使用的
   */
  this.Init=function(selector,loadLzy=true){

    var lzIMGAttr=src_attr;

    imgs=document.querySelectorAll(selector) 

    var bottom=window.scrollY+window.innerHeight
    var top=window.scrollY
    for(var i=0;i<imgs.length;i++)
    {
      if(imgs[i].offsetTop+imgs[i].clientHeight>=top && imgs[i].offsetTop <=bottom)
      {
        imgs[i].src=imgs[i].getAttribute(lzIMGAttr)
        //if(n==false)console.log(i)
      }
      else
      {
        if(loadLzy){
          imgs[i].src=lzyImg
        }
      }
    }

    document.addEventListener("scroll",function(ev){ //滚动出来
      var bottom=window.scrollY+window.innerHeight
      var top=window.scrollY
      for(var i=0;i<imgs.length;i++)
      {
        if(imgs[i].offsetTop+imgs[i].clientHeight>=top && imgs[i].offsetTop <=bottom)
        {
          imgs[i].src=imgs[i].getAttribute(lzIMGAttr)
        }
      }
    });
  }
}


//例子
var lload=new lazyLoad();
lload.Init("img")


//附带创建空白图函数
function createImageSRC(w,h,bg="#ddd")
{
  var canvas=document.createElement("canvas")
  canvas.width=1
  canvas.height=1
  var render=canvas.getContext("2d")
  if(render)
  {
    render.fillStyle=bg
    render.fillRect(0,0,w,h)
    return canvas.toDataURL()
  }
  return false
}
