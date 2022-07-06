import { EmbedSource, EnableEmbedKey } from "./";
const fs = require("fs");
// import { LiteYTEmbed } from "./lite-yt-embed";

// import fileUrl from 'file-url';

const EAGLE_LINK = new RegExp(
  /eagle:\/\/item\/(?<id>.{13})/,
);




var imgExts=["PNG","png","jpg","JPG","JPEG","jpeg","webp","gif","GIF","bmp","BMP","SVG","svg","tiff","TIFF","tga","TGA"]
var videosExt=["MP4","mp4","MOV","mov"]


export class EagleEmbed implements EmbedSource {
  name = "Eagle";
  enabledKey: EnableEmbedKey = "replaceEagleLinks";
  regex = EAGLE_LINK;
  eagleRuning=true;
  //rootPath="/Users/fengx/Documents/WeiyunDisk/EagleLibrary/FengxWork.library"; 
  rootPath=""; 
 

  SetRootPath(p:string): void {
    this.rootPath=p;
    if(p!=""){
      this.eagleRuning=true;
    }
    console.log("EagleRootPath : "+p);
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
      return;
    }
    // console.log(data);
     this.imgName=data["data"]["name"];
     this.imgExt=data["data"]["ext"];
     this.imgSrc="";
      
      if (imgExts.indexOf(this.imgExt)==-1){
        if (videosExt.indexOf(this.imgExt)!=-1){
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
      var ul=document.createElement("ul");
      var l1=document.createElement("li");
      var l2=document.createElement("li");
      // l1.setText(this.imgExt);
      l2.setText(this.imgExt);
      ul.appendChild(l1);
      ul.appendChild(l2);
      
      l1.setAttribute("style", "display: inline-block; height: 36px;width: 46px;background-image: url(https://cn.eagle.cool/images/logo.png); display: inline-block;");
      l2.setAttribute("style", " text-align: center;   border-radius: 5px;  height: 25px;width: 46px; display: inline-block;background: #8b00009c;");
      ul.setAttribute("style", "height: 31px;    display: flex; font-size: 15px;    margin: 0; padding: 0; position: absolute;");
      this.ele.appendChild(ul);

    if  (this.isImg){
        var bg= document.createElement("img");
        bg.setAttribute("width","100%");

        // this.ele= document.createElement("img");
        var filePath=this.rootPath+"/images/"+idn+".info/"+this.imgName+this.extstr;



        this.imgSrc="app://local/"+filePath;

        this.imgSrc= this.imgSrc.replace("\\", "/");
        // .replace("[", "%5B")
        // .replace("]", "%5D")
        // .replace("#", "23%")
        // .replace("$", "24%")
        // .replace("(", "28%")
        // .replace(")", "29%")
        // .replace("@", "40%")
        // .replace("{", "%7B")
        // .replace("}", "%7D")
        // .replace("&","%26")
        // .replace("=","%3D")
        // .replace(" ", "%20")
        // .replace("（", "%EF%BC%88")
        // .replace("）", "%EF%BC%89")

        if(!fs.existsSync(filePath)){
          this.imgSrc="https://cdn.artstation.com/static_media/placeholders/user/cover/default.jpg"
        }
        console.log(fs.existsSync(filePath));
        console.log(filePath);

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

      if(!fs.existsSync(filePath)){
        this.imgSrc="https://cdn.artstation.com/static_media/placeholders/user/cover/default.jpg"
      }
      console.log(fs.existsSync(filePath));
      console.log(filePath);
      



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

    // wrapper.classList.add("img");

    const matches = link.match(EAGLE_LINK);

    const id = matches.groups.id;
 
    
    var imgName=""; 
    var imgExt=""; 

    // var data=JSON.parse(" {\"status\": \"xx\"}");    

    // var urlLib="http://localhost:41595/api/library/info";
    // fetch(urlLib, {  method: 'GET', redirect: 'follow'})
    //   .then(response => response.json())
    //   .then(result => rootPath=result["data"]["library"])
    //   .catch(error => console.log('error', error));


    var test;

    console.log("id"+id);
    var urlItem="http://localhost:41595/api/item/info?id="+id;
    fetch(urlItem, {  method: 'GET', redirect: 'follow'})
      .then(responsex => responsex.json())
      // .then(resultx => console.log(typeof resultx))
      .then(resultx => this.GetEaglePath(resultx,wrapper,id))
      .catch(error =>this.eagleRuning=false);


    // var imgSrc=""
    // if (data!=undefined){
    //     console.log(data)
    //     // imgName=data["data"]["name"];
    //     // imgExt=data["data"]["ext"];
    //     // imgSrc=rootPath+"/images/"+id+".info/"+imgName+"."+imgExt
      
    // }
    
    // console.log(imgName)
    // console.log(imgSrc)


    // const eagle = document.createElement("img");
    // wrapper.setAttribute("src","https://cdna.artstation.com/p/assets/images/images/051/262/490/large/yu-yong-22-06-warrior-01.jpg");
  
  
    // wrapper.setAttribute("src",imgSrc);
  
  
  
    // wrapper.appendChild(eagle);
    container.appendChild(wrapper);
    // container.classList.add("eagle");
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
