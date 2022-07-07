import { EmbedSource, EnableEmbedKey } from "./";
import { App, FileSystemAdapter, Notice } from 'obsidian';
const fs = require("fs");
// import { LiteYTEmbed } from "./lite-yt-embed";

// import fileUrl from 'file-url';

const EAGLE_LINK = new RegExp(
  /eagle:\/\/item\/(?<id>.{13})/,
);




var imgExts=["PNG","JPG","JPEG","WEBP","GIF","BMP","SVG","TIFF","TGA"]
var videosExt=["MP4","MOV"]
 


// var urlItem="http://localhost:41595/api/item/info?id="+id;

// const getFirstUserData = async () => {
//   const response = await fetch(urlItem, {  method: 'GET', redirect: 'follow'})
//   .then(responsex => responsex.json())
//   .then(resultx => this.GetEaglePath(resultx,wrapper,id))
//   .catch(error =>this.eagleRuning=false);

//   return resultx

// }





export class EagleEmbed implements EmbedSource {
  name = "Eagle";
  enabledKey: EnableEmbedKey = "replaceEagleLinks";
  regex = EAGLE_LINK;
  eagleRuning=true;
  //rootPath="/Users/fengx/Documents/WeiyunDisk/EagleLibrary/FengxWork.library"; 
  rootPath=""; 
  valutPath="";

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





  public  GetRootPath(): void {
    var urlLib="http://localhost:41595/api/library/info";
    // fetch(urlLib, {  method: 'GET', redirect: 'follow'})
    //   .then(response => response.json())
    //   .then(result => this.SetRootPath(result["data"]["library"]["path"]))
    //   .catch(error => this.eagleRuning=false);
    fetch(urlLib, {  method: 'GET', redirect: 'follow'}).then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(' Something went wrong  GetRootPath');
      })
      .then((responseJson) => {
        this.SetRootPath(responseJson["data"]["library"]["path"]);
        this.eagleRuning=true;

      })
      .catch((error) => {
        console.log(error)
        this.eagleRuning=false;
        // console.log("server is down!!");
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

  CreateTipImgEle(tip:string,imgSrc:string){
    var mainEl= document.createElement("div");
    


    var el=this.CreateImgEle(imgSrc);
    var txt= document.createElement("div");
    txt.setText(tip);
    txt.setAttribute("style","max-width: 550px; text-align: center;width: 79%;position: absolute;color:#888;");
    // mainEl.appendChild(txt);


    var ul=document.createElement("ul");
    var l1=document.createElement("li");
    var a=document.createElement("a");
    a.setText(tip);
    ul.appendChild(l1);

    a.setAttribute("style", "     text-decoration: auto; height: 50px; font-size: 35px; font-weight: bolder;color: #a8a8a8; text-align: center;   border-radius: 5px;   display: inline-block;background: #8b0000ff;padding-left: 5px;padding-right: 5px;margin: 5px;");
    a.setAttribute("href","eagle://xxxxx");

    l1.setAttribute("style","display: block;");
    l1.append(a);
    ul.setAttribute("style", "height: 31px;    display: flex; font-size: 15px;    margin: 0; padding: 0; position: absolute;");
    


    mainEl.appendChild(ul);
    mainEl.appendChild(el);

    return mainEl;
  }

  CreateTiteBar(link:string){
    var ele1= document.createElement("div");
    var a=document.createElement("a");
    a.setText(this.imgName);
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
        imgFilePath=this.valutPath+"/.obsidian/plugins/eagle_embeds/EagleEmpty.png"
      }
       var bg=this.CreateImgEle(imgFilePath);
       this.ele.appendChild(bg);
    }else{
      var vel=this.CreateVideoEle(filePath);
        this.ele.appendChild(vel);
    }


    
    // this.ele.appendChild(this.CreateTiteBar(link));
    wrap.append(this.ele);

    //  return ele;
  }




  createEmbed(link: string, container: HTMLElement) {
    // this._ensureLiteEagleLoaded();
    const matches = link.match(EAGLE_LINK);
    this.linktext= link;
    var  wrapper = document.createElement("div");
    const id = matches.groups.id;

    var imgSrcEmpty=this.valutPath+"/.obsidian/plugins/eagle_embeds/EagleEmpty.png";
    var imgSrcNotRun=this.valutPath+"/.obsidian/plugins/eagle_embeds/EagleNotRun.png";
    var imgSrcLinkEmpty=this.valutPath+"/.obsidian/plugins/eagle_embeds/EagleLinkEmpty.png";


    var itemExist=true;
    // console.log("id"+id);
    var urlItem="http://localhost:41595/api/item/info?id="+id;

    if(!this.eagleRuning){
      this.GetRootPath();
      wrapper.appendChild(this.CreateTipImgEle("启动Eagle",imgSrcNotRun));
      container.appendChild(wrapper);
      return container;
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
      wrapper.appendChild(this.CreateTipImgEle("链接失效！",imgSrcLinkEmpty));
      container.appendChild(wrapper);
      return container;
    });




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
