import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';


import '../style/index.css';


/**
 * Initialization data for the jupyterlab-mobile-menu extension.
 */

const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab-mobile-menu',
  autoStart: true,
  activate: (app: JupyterLab) => {
      var scheduler = function(){
        if (document.getElementById('filebrowser')) {
          var node = document.getElementById('filebrowser').
          getElementsByClassName('jp-DirListing-content')[0]
          var touchstartMessage = [0,0,new Date().getTime()];
          if (node){
            node.addEventListener('touchstart',(event: Event) => {
              var event1 = <TouchEvent>event;
              //event1.preventDefault();
              console.log(1); 
              var x = event1.touches[0].clientX;
              var y = event1.touches[0].clientY;
              touchstartMessage = [x,y,new Date().getTime()]
              
            });
            node.addEventListener('touchend', (event: Event) => {
              var event1 = <TouchEvent>event;
              event1.preventDefault();
              console.log(2);
              var x = event1.changedTouches[0].clientX;
              var y = event1.changedTouches[0].clientY;
              //considered as a click 
              if(Math.abs(x-touchstartMessage[0])<10&&Math.abs(y-touchstartMessage[1])<3
                 &&Math.abs(new Date().getTime()-touchstartMessage[2])<500){
                var event3 = document.createEvent("HTMLEvents");
                event3.initEvent("dblclick", true, false);
                let ev4 = <any>event3;
                ev4.button=0;
                let ev5 = <Event>ev4;
                var node1 = document.getElementById('filebrowser').
                getElementsByClassName('jp-DirListing-content')[0];
                for (var i=0; i<node1.children.length;i++){
                  if (y>node1.children[i].getBoundingClientRect().top && 
                      y<node1.children[i].getBoundingClientRect().bottom &&
                      x>node1.children[i].getBoundingClientRect().left &&
                      x<node1.children[i].getBoundingClientRect().right){
                      node1.children[i].dispatchEvent(ev5);
                        break;
                  }
                }
              }
              //considered as a long press to right click
              if(Math.abs(x-touchstartMessage[0])<10&&Math.abs(y-touchstartMessage[1])<3&&
                 Math.abs(new Date().getTime()-touchstartMessage[2])>1200&&
                 Math.abs(new Date().getTime()-touchstartMessage[2])<5000){
                var event2 = document.createEvent("MouseEvents");
                event2.initMouseEvent("contextmenu", true, true, document.defaultView,
                                      0, 0, 0, x, y, false, false, false, false, 2, null);
                var node1 = document.getElementById('filebrowser').
                getElementsByClassName('jp-DirListing-content')[0];
                var ev6 = document.createEvent("MouseEvents");
                ev6.initMouseEvent("mousedown",true,true,document.defaultView,0,0,0,x,y,
                                               false,false,false,false,0,null);
                var ev7 = document.createEvent("HTMLEvents");
                ev7.initEvent("focus",true,true);
  
                for (var i=0; i<node1.children.length;i++){
                  if (y>node1.children[i].getBoundingClientRect().top && 
                      y<node1.children[i].getBoundingClientRect().bottom &&
                      x>node1.children[i].getBoundingClientRect().left &&
                      x<node1.children[i].getBoundingClientRect().right){
                      
                      node1.children[i].dispatchEvent(ev6);
                      node1.children[i].dispatchEvent(ev7);
                      node1.children[i].dispatchEvent(event2);
                        break;
                  }
                }
                var menutouchfunc =  (e1: Event) =>{
                    var menulist = document.getElementsByClassName('p-Menu')[0];
                    var e = <TouchEvent>e1;
                    //e1.preventDefault();
                    //e1.stopPropagation();
                            var x1 = e.changedTouches[0].clientX;
                            var y1 = e.changedTouches[0].clientY;
                            var eee = document.createEvent("MouseEvents");
                            eee.initMouseEvent("mousedown",true,true,document.defaultView,1,0,0,x1,y1,
                                               false,false,false,false,0,null);
                            var eee2=document.createEvent("MouseEvents");
                            eee2.initMouseEvent("mouseup",true,true,document.defaultView,0,0,0,x1,y1,
                                               false,false,false,false,0,null);
                            for (var i=0; i<menulist.children[0].children.length;i++){
                              if (y1>menulist.children[0].children[i].getBoundingClientRect().top && 
                                  y1<menulist.children[0].children[i].getBoundingClientRect().bottom &&
                                  x1>menulist.children[0].children[i].getBoundingClientRect().left &&
                                  x1<menulist.children[0].children[i].getBoundingClientRect().right){
                                    menulist.children[0].children[i].dispatchEvent(eee);
                                    menulist.children[0].children[i].dispatchEvent(eee2);
                                    break;
                              }
                            }
                        };
                var scheduler2 = function(){
                    var menulist = document.getElementsByClassName('p-Menu')[0];
                    if (menulist){
                        menulist.removeEventListener("touchend",menutouchfunc);
                        menulist.addEventListener("touchend",menutouchfunc);
                    } else {
                        setTimeout(scheduler2,100);
                    }
                }
                setTimeout(scheduler2,100);
              }
            },false);
          } else {
            setTimeout(scheduler,1000);
          }    
        } else {
          setTimeout(scheduler,1000);
        }
      }
      setTimeout(scheduler,1000)
  }
}
      //let node = document.getElementById('filebrowser').getElementsByClassName('jp-DirListing-content')
      /*node.addEventListener('touchstart', (event: Event) => {
          
        let event1 = <TouchEvent>event;
        event1.preventDefault();
        console.log(1);
        let x = event1.touches[0].clientX;
        let y = event1.touches[0].clientY;
        let event2 = document.createEvent("MouseEvents");
        event2.initMouseEvent("click",true,true,document.defaultView,0,0,0,x,y,
                              false,false,false,false,2,null);
        document.getElementById('filebrowser').getElementsByClassName('jp-DirListing-content')
        [0].dispatchEvent(event2);
      });
      node.addEventListener('ontouchstart', (event: Event) => {
        let event1 = <TouchEvent>event;
        event1.preventDefault();
        console.log(2);
        let x = event1.touches[0].clientX;
        let y = event1.touches[0].clientY;
        let event2 = document.createEvent("MouseEvents");
        event2.initMouseEvent("click",true,true,document.defaultView,0,0,0,x,y,
                              false,false,false,false,2,null);
        document.getElementById('filebrowser').getElementsByClassName('jp-DirListing-content')
        [0].dispatchEvent(event2);
      });
 */

export default extension;
