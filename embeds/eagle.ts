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
    fetch(urlLib, {  method: 'GET', redirect: 'follow'})
      .then(response => response.json())
      .then(result => this.SetRootPath(result["data"]["library"]["path"]))
      .catch(error => this.eagleRuning=false);
  }

    imgName="";
    imgExt="";
    imgSrc="";
    ele:object;
    extstr="";
    isImg=false;
    isVideos=false;

  GetEaglePath (data: object ,wrap:HTMLElement,idn:string): void {
   
    if (data==undefined){
      return;
    }
    if(!this.eagleRuning){
      this.GetRootPath();
      console.log("GetRootPath")
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
        }
      
      }else {
        this.isImg=true;
        this.extstr="."+this.imgExt;
      }


      // var   imgSrc="app://local/"+rootPath+"/images/"+idn+".info/"+imgName+extstr;
      // var u=new fileUrl(imgSrc);
      this.ele= document.createElement("div");
      this.ele.setText("xx");
      var ul=document.createElement("ul");
      // var l1=document.createElement("li");
      var l2=document.createElement("li");
      // l1.setText(this.imgExt);
      l2.setText(this.imgExt.toUpperCase());
      // ul.appendChild(l1);
      ul.appendChild(l2);

      // l1.setAttribute("style", "display: inline-block; height: 36px;width: 46px;background-image: url(https://cn.eagle.cool/images/logo.png); display: inline-block;");
      l2.setAttribute("style", "  height: 18px; font-size: 11px; font-weight: bolder;color: #a8a8a8; text-align: center;   border-radius: 5px;   display: inline-block;background: #8b0000d6;padding-left: 5px;padding-right: 5px;margin: 5px;");
      ul.setAttribute("style", "height: 31px;    display: flex; font-size: 15px;    margin: 0; padding: 0; position: absolute;");
      this.ele.appendChild(ul);

    if  (this.isImg){
        var bg= document.createElement("img");
        bg.setAttribute("width","100%");

        // this.ele= document.createElement("img");
        var filePath=this.rootPath+"/images/"+idn+".info/"+this.imgName+this.extstr;



        this.imgSrc="app://local/"+filePath;

        this.imgSrc= this.imgSrc.replace("\\", "/");
        this.imgSrc=encodeURI(this.imgSrc);
        if(!fs.existsSync(filePath)){
          this.imgSrc="app://local/"+this.valutPath+"/.obsidian/plugins/eagle_embeds/EagleEmpty.png"
          console.log("file not exist:"+filePath);
        }

        // if(this.imgName)
        // this.ele.setAttribute("src",this.imgSrc);
        bg.setAttribute("src",this.imgSrc);
        this.ele.appendChild(bg);

    }else{
      var el= document.createElement("div");
      el.className="internal-embed media-embed is-loaded";
      el.setAttribute("src","eagle:/item/"+this.imgName);

      var elev=document.createElement("video");
      elev.setAttribute("controls","");


      var filePath=this.rootPath+"/images/"+idn+".info/"+this.imgName+this.extstr;
      this.imgSrc="app://local/"+filePath;

      this.imgSrc= this.imgSrc.replace("\\", "/");
      this.imgSrc=encodeURI(this.imgSrc);

      if(!fs.existsSync(filePath)){
        this.imgSrc="app://local/"+this.valutPath+"/.obsidian/plugins/eagle_embeds/EagleEmpty.png"
        console.log("file not exist:"+filePath);
        
      }
      



      elev.setAttribute("src",this.imgSrc ) ;
      
      el.appendChild(elev)
      this.ele.appendChild(el);
    }

    wrap.append(this.ele);

    //  return ele;
  }



  createEmbed(link: string, container: HTMLElement) {
    // this._ensureLiteEagleLoaded();
    var  wrapper = document.createElement("div");
    const matches = link.match(EAGLE_LINK);
    const id = matches.groups.id;

    console.log("id"+id);
    var urlItem="http://localhost:41595/api/item/info?id="+id;

    fetch(urlItem, {  method: 'GET', redirect: 'follow'})
      .then(responsex => responsex.json())
      .then(resultx => this.GetEaglePath(resultx,wrapper,id))
      .catch(error =>this.eagleRuning=false);

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
