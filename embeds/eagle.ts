import { EmbedSource, EnableEmbedKey } from "./";
import { App, FileSystemAdapter, Notice } from 'obsidian';
import { Console } from "console";
const fs = require("fs");
// import { LiteYTEmbed } from "./lite-yt-embed";

// import fileUrl from 'file-url';

// const EAGLE_LINK = new RegExp(
//   /eagle:\/\/item\/(?<id>.{13})/,
// );


const EAGLE_LINK = new RegExp(/eagle:\/\/(?<type>[item|folder]{4,6})\/(?<id>.{13})/,);



var imgExts=["PNG","JPG","JPEG","WEBP","GIF","BMP","SVG","TIFF","TGA"]
var videosExt=["MP4","MOV"]
 



export class EagleEmbed implements EmbedSource {
  name = "Eagle";
  enabledKey: EnableEmbedKey = "replaceEagleLinks";
  regex = EAGLE_LINK;
  eagleRuning=false;
  //rootPath="/Users/fengx/Documents/WeiyunDisk/EagleLibrary/FengxWork.library"; 
  rootPath=""; 
  valutPath="";

  isGetFolderList=false;
  folderList={}


   getPluginPath(app:App): string {
    let adapter = app.vault.adapter;
    if (adapter instanceof FileSystemAdapter) {
       this.valutPath=adapter.getBasePath();
        console.log("valutPath: "+adapter.getBasePath());
        return adapter.getBasePath();
    }else{
      return "";
    }
    
  }


  SetRootPath(p:string): void {
    this.rootPath=p;
    if(p!=""){
      this.eagleRuning=true;
    }
    console.log("EagleRootPath : "+this.rootPath);
  }


  SetFolderList(data:object){

    // var arr=data;
    // while (arr==[]) {
    //   for (let index = 0; index < data.length; index++) {
    //     const d =data[index] ;
    //     folderList[d.id]=d.name;
    //   }

    // }
    this.folderList=data;
    console.log(data);

  }


  public  GetFolderList(): void {
    var urlLib="http://localhost:41595/api/folder/list";
    fetch(urlLib, {  method: 'GET', redirect: 'follow'}).then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(' Something went wrong  GetFolderList');
      })
      .then((responseJson) => {
        this.SetFolderList(responseJson["data"]);
        
        this.isGetFolderList=true;

      })
      .catch((error) => {
        console.log(error)
        this.isGetFolderList=false;
        // console.log("server is down!!");
      });
    
  }


  public  GetRootPath(): void {
    var urlLib="http://localhost:41595/api/library/info";
    fetch(urlLib, {  method: 'GET', redirect: 'follow'}).then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(' Something went wrong  GetRootPath');
      })
      .then((responseJson) => {
        this.eagleRuning=true;
        this.SetRootPath(responseJson["data"]["library"]["path"]);
      })
      .catch((error) => {
        this.eagleRuning=false;
        console.log("Eagle server is down!!");
        console.log(error)
      });
    
  }



  imgName="";
  imgExt="";
  imgSrc="";
  ele:object;
  extstr="";
  isImg=false;
  isVideos=false;
  linktext="";


  CreateImgTag(ext:string){
    var ul=document.createElement("ul");
    // var l1=document.createElement("li");
    var l2=document.createElement("li");
    // l1.setText(this.imgExt);
    l2.setText(ext.toUpperCase());
    // ul.appendChild(l1);
    ul.appendChild(l2);
    // l1.setAttribute("style", "display: inline-block; height: 36px;width: 46px;background-image: url(https://cn.eagle.cool/images/logo.png); display: inline-block;");
    l2.setAttribute("style", "  height: 18px; font-size: 11px; font-weight: bolder;color: #a8a8a8; text-align: center;   border-radius: 5px;   display: inline-block;background: #8b0000ff;padding-left: 5px;padding-right: 5px;margin: 5px;");
    ul.setAttribute("style", "height: 31px;    display: flex; font-size: 15px;    margin: 0; padding: 0; position: absolute;");
    return ul;
  }

  CreateImgEle (imgPath:string ){
      var bg= document.createElement("img");
      bg.setAttribute("width","100%");



      var imgSrc="app://local/"+imgPath;
      imgSrc= imgSrc.replace("\\", "/");
      imgSrc=encodeURI(imgSrc);


      bg.setAttribute("src",imgSrc);
      // console.log("set Image:"+imgSrc);
      return bg;
  }


  CreateVideoEle (videoPath:string ){
    var el= document.createElement("div");
    el.className="internal-embed media-embed is-loaded";
    el.setAttribute("src","eagle:/item/"+this.imgName);

    var elev=document.createElement("video");
    elev.setAttribute("controls","");


    var imgSrc="app://local/"+videoPath;

    imgSrc= imgSrc.replace("\\", "/");
    imgSrc=encodeURI(imgSrc);

    if(!fs.existsSync(videoPath)){
      this.imgSrc="app://local/"+this.valutPath+"/.obsidian/plugins/eagle_embeds/EagleEmpty.png"
      console.log("file not exist:"+videoPath);
    }

    elev.setAttribute("src",imgSrc ) ;
    
    el.appendChild(elev)
    return el;
}

  CreateTipImgEle(tip:string){
    var mainEl= document.createElement("div");
    mainEl.setAttribute("style","  width: 100%;height: calc(100vw * 1080 / 1920/2);max-height: 309px;display: flex;background: #343434b0;justify-content: space-around; align-items: center;align-content: space-around;");
    // var el=this.CreateImgEle(imgSrc);
    var txt= document.createElement("div");
    txt.setText(tip);
    txt.setAttribute("style"," font-weight: bold;font-size: 35px;max-width: 550px; text-align: center;width: 79%;position: absolute;color:#c8c7c730;");
    mainEl.appendChild(txt);
    return mainEl;
  }

  CreateTipLinkEle(tip:string,href:string){
    var mainEl= document.createElement("div");
    mainEl.setAttribute("style","  width: 100%;height: calc(100vw * 1080 / 1920/2);max-height: 309px;display: flex;background: #343434b0;justify-content: space-around; align-items: center;align-content: space-around;");
    // var el=this.CreateImgEle(imgSrc);
    var txt= document.createElement("a");
    txt.setText(tip);
    txt.setAttribute("style","text-decoration: none; font-weight: bold;font-size: 15px;max-width: 550px; text-align: center;width: 79%;position: absolute;color:#c8c7c730;");
    txt.setAttribute("href",href);

    mainEl.appendChild(txt);
    return mainEl;
  }

  CreateTiteBar(link:string){
    var ele1= document.createElement("div");
    var a=document.createElement("a");
    a.setText(this.imgName+"."+this.imgExt);
    a.setAttribute("style","color: #4c4c4c94;");
    a.setAttribute("href",link);
    ele1.append(a);
    return ele1;
  }

  GetEaglePath (data: object ,wrap:HTMLElement,idn:string,link:string): void {
   
    if (data==undefined){
      return;
    }
   
    // console.log(data);
     this.imgName=data["data"]["name"];
     this.imgExt=data["data"]["ext"];
     this.imgSrc="";
      
     var tempExt=this.imgExt.toUpperCase();
      if (imgExts.indexOf(tempExt)==-1){
        if (videosExt.indexOf(tempExt)!=-1){
          this.isVideos=true;
          this.isImg=false;
          this.extstr="."+this.imgExt;

        }else{
          this.extstr="_thumbnail.png";
          this.isImg=true;
          this.isVideos=false;
        }
      
      }else {
        this.isImg=true;
        this.isVideos=false;
        this.extstr="."+this.imgExt;
      }
      // console.log("imgName: "+this.imgName);
      // console.log("imgExts: "+this.imgExt);
      // console.log("isImg,isVideos: "+this.isImg +this.isVideos);
      this.ele= document.createElement("div");
      // var   imgSrc="app://local/"+rootPath+"/images/"+idn+".info/"+imgName+extstr;
      // var u=new fileUrl(imgSrc);
   


    var imgTag=this.CreateImgTag(this.imgExt);
    this.ele.appendChild(imgTag);


    var filePath=this.rootPath+"/images/"+idn+".info/"+this.imgName+this.extstr;

    if  (this.isImg){
      var imgFilePath=filePath;
      
      
      if(!fs.existsSync(filePath)){
        var bg=this.CreateTipImgEle("无缩略图！");
        this.ele.appendChild(bg);
      }else{
        var bg1=this.CreateImgEle(imgFilePath);
        this.ele.appendChild(bg1);
      }
    }else{
      var vel=this.CreateVideoEle(filePath);
        this.ele.appendChild(vel);
    }


    
    this.ele.appendChild(this.CreateTiteBar(link));
    wrap.append(this.ele);

    //  return ele;
  }




  createEmbed(link: string, container: HTMLElement) {
    // this._ensureLiteEagleLoaded();
    const matches = link.match(EAGLE_LINK);
    this.linktext= link;
    var  wrapper = document.createElement("div");
    const id = matches.groups.id;
    const linkType = matches.groups.type;

    if(linkType=="item"){
      var itemExist=true;
      // console.log("id"+id);
      var urlItem="http://localhost:41595/api/item/info?id="+id;
  
      if(!this.eagleRuning){
        this.GetRootPath();
        console.log("Eagle not runing！")
        var u = navigator.userAgent;
        var app = navigator.appVersion;
        var android= u.indexOf('Android') > -1;
        var ios= u.indexOf('Android') > -1;
        wrapper.appendChild(this.CreateTipLinkEle(app,link));
        container.appendChild(wrapper);
        return container;
      }else{

        // console.log("this.eagleRuning"+this.rootPath);

      }
  
      fetch(urlItem, {  method: 'GET', redirect: 'follow'}).then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(' Something went wrong  urlItem');
      })
      .then((responseJson) => {
        this.GetEaglePath(responseJson,wrapper,id,link);
      })
      .catch((error) => {
        console.log(error);
        itemExist=false;
        wrapper.appendChild(this.CreateTipImgEle("链接失效！"));
        container.appendChild(wrapper);
        return container;
      });


    }else if(linkType=="folder"){
      if (!this.isGetFolderList){
        // this.GetFolderList();
      }
      // console.log(this.folderList);
      wrapper.appendChild(this.CreateTipImgEle("链接失效！"));
      container.appendChild(wrapper);
      return container;
    }

  




    container.appendChild(wrapper);
    return container;
  }



  private _ensureLiteEagleLoaded() {
    // if (!customElements.get("lite-eagle")) {
    //   customElements.define("lite-eagle", LiteYTEmbed);
    // }
  }

  private _normalizeStartTime(startTime: string) {
    if (!startTime) {
      return;
    }
    if (!isNaN(Number(startTime))) {
      return startTime;
    }
    const matches = startTime.match(
      /(?<hours>\d+h)?(?<minutes>\d+m)?(?<seconds>\d+s)/,
    );
    const hoursInSeconds = parseInt(matches.groups.hours ?? "0") * 60 * 60;
    const minutesInSeconds = parseInt(matches.groups.minutes ?? "0") * 60;
    const seconds = parseInt(matches.groups.seconds ?? "0");
    return `${hoursInSeconds + minutesInSeconds + seconds}`;
  }
}
