import { EmbedSource, EnableEmbedKey } from "./";
import { App, FileSystemAdapter, Notice, requestUrl, Setting } from 'obsidian';
import { Console } from "console";
import { PluginSettings } from "settings";
import { settings } from "cluster";
const fs = require("fs");
// import { LiteYTEmbed } from "./lite-yt-embed";

// import fileUrl from 'file-url';

// const EAGLE_LINK = new RegExp(
//   /eagle:\/\/item\/(?<id>.{13})/,
// );

var fileSvg=`<svg width="192" height="254" viewBox="0 0 192 254" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_di_235_214)">
<path d="M115.429 12.9289C113.554 11.0536 111.01 10 108.358 10H27.2C20.4794 10 17.1191 10 14.5521 11.3079C12.2942 12.4584 10.4584 14.2942 9.30792 16.5521C8 19.1191 8 22.4794 8 29.2V222.8C8 229.521 8 232.881 9.30792 235.448C10.4584 237.706 12.2942 239.542 14.5521 240.692C17.1191 242 20.4794 242 27.2 242H162.8C169.521 242 172.881 242 175.448 240.692C177.706 239.542 179.542 237.706 180.692 235.448C182 232.881 182 229.521 182 222.8V83.6414C182 80.9893 180.946 78.4457 179.071 76.5703L115.429 12.9289Z" fill="url(#paint0_linear_235_214)"/>
</g>
<path d="M53.8758 220H61.7518V209.132H65.5798C72.5318 209.132 78.5158 205.7 78.5158 197.912C78.5158 189.816 72.5758 187.22 65.4038 187.22H53.8758V220ZM61.7518 202.928V193.468H64.9638C68.7478 193.468 70.8598 194.612 70.8598 197.912C70.8598 201.124 69.0118 202.928 65.1838 202.928H61.7518ZM84.0828 220H93.9388C103.487 220 110.087 214.852 110.087 203.456C110.087 192.06 103.487 187.22 93.4988 187.22H84.0828V220ZM91.9588 213.664V193.512H93.0148C98.2948 193.512 102.035 195.668 102.035 203.456C102.035 211.244 98.2948 213.664 93.0148 213.664H91.9588ZM116.138 220H124.014V207.504H135.19V200.948H124.014V193.776H137.038V187.22H116.138V220Z" fill="#515151"/>
<g filter="url(#filter1_d_235_214)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M114.612 12.1972C113.937 11.6559 113.198 11.2073 112.414 10.8596V60.385C112.414 67.1056 112.414 70.4659 113.722 73.0328C114.873 75.2908 116.708 77.1266 118.966 78.277C121.533 79.585 124.894 79.585 131.614 79.585H181.14C180.793 78.8029 180.346 78.0648 179.806 77.3905L114.612 12.1972Z" fill="url(#paint1_linear_235_214)"/>
</g>
<defs>
<filter id="filter0_di_235_214" x="0" y="6" width="190" height="304" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="4"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_235_214"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_235_214" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="68"/>
<feGaussianBlur stdDeviation="48"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"/>
<feBlend mode="normal" in2="shape" result="effect2_innerShadow_235_214"/>
</filter>
<filter id="filter1_d_235_214" x="94.4142" y="0.859619" width="96.7261" height="96.7253" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-4" dy="4"/>
<feGaussianBlur stdDeviation="7"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.29 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_235_214"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_235_214" result="shape"/>
</filter>
<linearGradient id="paint0_linear_235_214" x1="95" y1="10" x2="95" y2="242" gradientUnits="userSpaceOnUse">
<stop stop-color="#F7F7F7"/>
<stop offset="1" stop-color="white"/>
</linearGradient>
<linearGradient id="paint1_linear_235_214" x1="149.5" y1="47.4993" x2="117" y2="79.9993" gradientUnits="userSpaceOnUse">
<stop stop-color="#DDDDDD"/>
<stop offset="0.197917" stop-color="#EDEDED"/>
<stop offset="0.40625" stop-color="#F7F7F7"/>
<stop offset="0.630208" stop-color="#FBFBFB"/>
<stop offset="1" stop-color="white"/>
</linearGradient>
</defs>
</svg>
`


const EAGLE_LINK = new RegExp(/eagle:\/\/(?<type>item|folder)\/(?<id>[\w]{13})/,);
const EAGLE_FOLDER_BG_LINK = new RegExp(/url\([\\]{0,1}"file:\/\/\/(?<url>.*)[\\]{0,1}"\)/,);



var imgExts=["PNG","JPG","JPEG","WEBP","GIF","BMP","SVG","TIFF","TGA"];
var videosExt=["MP4","MOV","WEBM"];
var audioExt=["WAV","MP3","OGG"];
 

enum ItemType {
  Others = 0,
  Image = 1,
  Video = 2,
  Audio = 3,
  //  = 4,
}





export class EagleEmbed implements EmbedSource {
  name = "Eagle";
  enabledKey: EnableEmbedKey = "replaceEagleLinks";
  regex = EAGLE_LINK;
  eagleRuning=false;
  //rootPath="/Users/fengx/Documents/WeiyunDisk/EagleLibrary/FengxWork.library"; 
  rootPath=""; 
  valutPath="";

  isGetFolderList=false;
  folderList:object[]=new Array();;


  

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

    var stackData:object=new Array(); ;
    for (let index = 0; index < data.length; index++) {
      stackData.push(data[index]);
    }
    while (stackData.length!=0) {
      var f=stackData.pop();
      for (let index = 0; index < f.children.length; index++) {
        stackData.push(f.children[index]);
      }
      
      this.folderList.push(f);
      // console.log(f.name+": "+f.id);
    }
    // console.log(data);

  }





  public  GetFolderList(): void {
    if(this.isGetFolderList){
      return;
    }
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
        this.isGetFolderList=false;
        console.log("GetFolderList:"+error);
        // console.log("server is down!!");
      });
    
  }


  public  GetRootPath(): void {
    if(this.eagleRuning){
      return;
    }
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



  
  itemType=ItemType.Others;
  imgName="";
  imgExt="";
  imgSrc="";
  ele:object;
  extstr="";
  extVideoStr="";
  extAudioStr="";
  // isImg=false;
  // isVideos=false;
  linktext="";

  CreateFolderTags(tag:string[]){
    var ul=document.createElement("ul");
    for (let index = 0; index < tag.length; index++) {
      const t = tag[index];
      var l2=document.createElement("li");
      l2.setText(t.toUpperCase());
      l2.setAttribute("style", "  height: 18px; font-size: 15px; font-weight: bolder;color: #dfdfdf; text-align: center;   border-radius: 5px;   display: inline-block;background: #000000a3;padding-left: 5px;padding-right: 5px;margin: 5px;");
      ul.appendChild(l2);
    }
  
    // l1.setAttribute("style", "display: inline-block; height: 36px;width: 46px;background-image: url(https://cn.eagle.cool/images/logo.png); display: inline-block;");
    ul.setAttribute("style", "height: 39px;    display: flex; font-size: 15px;    margin: 0; padding: 0; position: absolute;");
    return ul;
  }

  CreateImgTags(tag:string[]){
    var ul=document.createElement("ul");
    for (let index = 0; index < tag.length; index++) {
      const t = tag[index];
      var l2=document.createElement("li");
      l2.setText(t.toUpperCase());
      l2.setAttribute("style", "  height: 18px; font-size: 11px; font-weight: bolder;color: #a8a8a8; text-align: center;   border-radius: 5px;   display: inline-block;background: #8b0000ff;padding-left: 5px;padding-right: 5px;margin: 5px;");
      ul.appendChild(l2);
    }
  
    // l1.setAttribute("style", "display: inline-block; height: 36px;width: 46px;background-image: url(https://cn.eagle.cool/images/logo.png); display: inline-block;");
    ul.setAttribute("style", "height: 31px;    display: flex; font-size: 15px;    margin: 0; padding: 0; position: absolute;");
    return ul;
  }


  CreateImgTag(tag:string){
    return this.CreateImgTags([tag]);
  }
  CreateImgEleStyle (imgPath:string ,style:string,link:string){
    var a= document.createElement("a");
    var bg= document.createElement("img");
    // bg.setAttribute("width","100%");
    if(link!=""){
      bg.setAttribute("style",style+"pointer-events: none")
      
    }else{
      bg.setAttribute("style",style)
    }
    var imgSrc="app://local/"+imgPath;
    imgSrc= imgSrc.replace("\\", "/");
    imgSrc=encodeURI(imgSrc);
    bg.setAttribute("src",imgSrc);
    // console.log("set Image:"+imgSrc);

    a.appendChild(bg);
    if(link!=""){
      a.setAttribute("href",link);
      a.setAttribute("style","display: block;");
    }
    return a;
  
  }
  CreateImgEle (imgPath:string ){
    return this.CreateImgEleStyle(imgPath,"width:100%;","");
  }

  CreateImgBGEle (style:string ){
    var bg= document.createElement("div");
    bg.setAttribute("width","100%");
    // var imgSrc="app://local/"+imgPath;
    // imgSrc= imgSrc.replace("\\", "/");
    // imgSrc=encodeURI(imgSrc);
    // bg.setAttribute("src",imgSrc);
    bg.setAttribute("style",style);
    
    // console.log("set Image:"+imgSrc);
    return bg;
  } 


  CreateAudioEle (audioPath:string){
    var el= document.createElement("div");
    el.className="internal-embed media-embed is-loaded";
    el.setAttribute("src","eagle:/item/"+this.imgName);

    var elev=document.createElement("audio");
    elev.setAttribute("controls","");

    // var poster=videoPath
    // if(!fs.existsSync(poster)){
    //   this.imgSrc="app://local/"+this.valutPath+"/.obsidian/plugins/eagle_embeds/EagleEmpty.png"
    //   console.log("file not exist:"+videoPath);
    // }
    // elev.setAttribute("poster","app://local/"+poster );
    var imgSrc="app://local/"+audioPath;

    imgSrc= imgSrc.replace("\\", "/");
    imgSrc=encodeURI(imgSrc);

    if(!fs.existsSync(audioPath)){
      this.imgSrc="app://local/"+this.valutPath+"/.obsidian/plugins/eagle_embeds/EagleEmpty.png"
      console.log("file not exist:"+audioPath);
    }

    elev.setAttribute("src",imgSrc ) ;
    
    el.appendChild(elev)
    return el;
}

  CreateVideoEle (videoPath:string,poster:string ){
    var el= document.createElement("div");
    el.className="internal-embed media-embed is-loaded";
    el.setAttribute("src","eagle:/item/"+this.imgName);

    var elev=document.createElement("video");
    elev.setAttribute("controls","");
    elev.setAttribute("style","width:100%");

    // var poster=videoPath
    // if(!fs.existsSync(poster)){
    //   this.imgSrc="app://local/"+this.valutPath+"/.obsidian/plugins/eagle_embeds/EagleEmpty.png"
    //   console.log("file not exist:"+videoPath);
    // }
    elev.setAttribute("poster","app://local/"+poster );
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

  CreateTipImgEleStyle(tip:string,style:string,txtStyle:string,link:string){
    var mainEl= document.createElement("div");
    mainEl.setAttribute("style","  width: 100%;height: calc(100vw * 1080 / 1920/2);max-height: 309px;display: flex;background: #343434b0;justify-content: space-around; align-items: center;align-content: space-around;"+style);
    // var el=this.CreateImgEle(imgSrc);
    var aEl= document.createElement("a");
    if(link!=""){
      aEl.setAttribute("href",link)
    }
    aEl.setAttribute("style","z-index: 0;");
    aEl.appendChild(mainEl);

    var txt= document.createElement("div");
    txt.setText(tip);
    txt.setAttribute("style"," font-weight: bold;font-size: 35px;max-width: 550px; text-align: center;width: 79%;position: absolute;color:#c8c7c730;"+txtStyle);
    mainEl.appendChild(txt);
    return aEl;
  }

  CreateTipImgEle(tip:string){
    return this.CreateTipImgEleStyle(tip,"","","");
  }

  CreateTipLinkEle(tip:string,href:string){
    return this.CreateTipLinkEleStyle(tip,href,"");
  }

  CreateTipLinkEleStyle(tip:string,href:string,s:string){
    var mainEl= document.createElement("div");
    mainEl.setAttribute("style","  width: 100%;height: calc(100vw * 1080 / 1920/2);max-height: 309px;display: flex;background: #343434b0;justify-content: space-around; align-items: center;align-content: space-around;"+s);
    // var el=this.CreateImgEle(imgSrc);
    var txt= document.createElement("a");
    txt.setText(tip);
    txt.setAttribute("style","text-decoration: none; font-weight: bold;font-size: 15px;max-width: 550px; text-align: center;width: 79%;position: absolute;color:#c8c7c730;");
    txt.setAttribute("href",href);
    mainEl.appendChild(txt);
    return mainEl;
  }



  // folderImgStyle="outline-offset: -2px;  outline-width: 2px;outline-color: #00000057;  outline-style: solid;width: 142px;height: 83px;border-radius: 9.5px;  border-top-left-radius: 5px;    border-top-right-radius: 18.5px;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;";
  // folderImgStyleShadow="box-shadow: 0px -4px 0px -2px #8181818a;";


  folderImgStyle="  width: 142px;height: 83px;border-radius: 3.5px;pointer-events: none;";
  folderImgStyleShadow="box-shadow:0px 0px 8px 3px #0000004d;";
  folderTitieStyle= "font-weight: bolder;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;top: 54px; width: 110px;left: 19px;position: absolute;color: #d5d5d5c4;text-decoration: none; text-decoration: none;text-shadow: 1px 1px 2px #000000fa;"
  
 
  // box-shadow: 1px 1px 7px 0px #000000d4;

  CreateTipFolderTipLinkEle(imgStr:string,link:string){
    var ele= document.createElement("div");
    var tag=(this.CreateImgTag("FODLER"));
    var imgE=this.CreateTipLinkEleStyle(imgStr,link,this.folderImgStyle+this.folderImgStyleShadow);
    ele.appendChild(tag);
    ele.appendChild(imgE);

    return ele;

  }


  CreateTipFolderTipEle(imgStr:string,link:string,data:object,settings: Readonly<PluginSettings>){
    var ele= document.createElement("div");
    st=this.folderImgStyle+this.folderImgStyleShadow+"left:8px;width:132px;top:-8px;position:absolute;background: #282828a8;z-index: -1;";
    var imgEBG=this.CreateImgBGEle(st);
    st=this.folderImgStyle+"width:142px;position:absolute;    background: linear-gradient(0deg, #181818d1, #ffffff00);z-index: 0;";
    var imgEFG=this.CreateImgBGEle(st);

    // var tag=(this.CreateImgTag("FODLER"));
    var st=this.folderImgStyle+this.folderImgStyleShadow;
    if(data){
      var tag=(this.CreateFolderTags([data.descendantImageCount.toString()]));
      ele.appendChild(tag);
    //  st=this.folderImgStyle+"box-shadow: 0px -"+Math.min(Math.max(data.descendantImageCount/2,3),15) +"px 0px -2px #8181818a;";
     st=this.folderImgStyle+this.folderImgStyleShadow+"z-index: 0;";
    }
    var imgE=this.CreateTipImgEleStyle(imgStr,st,"font-size: 20px;",link);
    ele.setAttribute("style","display: flex;align-items: flex-start;");
    imgE.appendChild(imgEBG);



 
    ele.appendChild(imgE);
    ele.appendChild(imgEFG);

    if(settings.FolderShowInnerLink){
      var ele1= document.createElement("div");
      var tagStr="";
      if(data.tags.length==0){
        tagStr="";
      }else{
          data.tags.forEach(el => {
          // console.log("|#|"+el);
          tagStr=+" "+el;
        });
        tagStr="|"+tagStr;
      }
      // console.log(tagStr);
      ele1.setText(data.name+tagStr);
      ele1.setAttribute("style",this.folderTitieStyle);
      ele.append(ele1); 
    }


    return ele;


  }

  CreateTipFolderEle(imgStr:string,link:string,data:object,settings: Readonly<PluginSettings>){
    var ele= document.createElement("div");
    st=this.folderImgStyle+this.folderImgStyleShadow+"left:8px;width:132px;top:-8px;position:absolute;background: #282828a8;z-index: -1;";
    var imgEBG=this.CreateImgBGEle(st);
    st=this.folderImgStyle+"width:142px;position:absolute;    background: linear-gradient(0deg, #181818d1, #ffffff00);";
    var imgEFG=this.CreateImgBGEle(st);


    ele.setAttribute("style","display: flex;align-items: flex-start;");
    var st=this.folderImgStyle+this.folderImgStyleShadow;
    if(data){
      var tag=(this.CreateFolderTags([data.descendantImageCount.toString()]));
      ele.appendChild(tag);
      // st=this.folderImgStyle+"box-shadow: 0px -"+Math.min(Math.max(data.descendantImageCount/2,3),15) +"px 0px -2px #8181818a;";
      st=this.folderImgStyle+this.folderImgStyleShadow;

  }
    var imgE=this.CreateImgEleStyle(imgStr,st,link)
 

    imgE.setAttribute("href",link);
    imgE.appendChild(imgEBG);
    


    ele.appendChild(imgE);
    ele.appendChild(imgEFG);
    if(settings.FolderShowInnerLink){
      var ele1= document.createElement("div");
      ele1.setText(data.name);
      ele1.setAttribute("style",this.folderTitieStyle);
      ele.append(ele1);
    }


    return ele;
  }

  CreateTiteBar(name:string,link:string,leftst:string){
    var ele1= document.createElement("blockquote");
    ele1.setAttribute("style","margin-top: 0px;margin-right: 0px;margin-bottom: 0px;margin-left: 16px;"+leftst);
    var a=document.createElement("a");
    a.setText(name);
    a.setAttribute("style","color: #b3b3b39e;text-decoration: none; text-decoration: none;text-shadow: 1px 1px 2px #00000000; ");

   

    a.setAttribute("href",link);
    ele1.append(a);
    return ele1;
  }












  GetEaglePath (data: object ,wrap:HTMLElement,idn:string,link:string,settings: Readonly<PluginSettings>): void {
   
    if (data==undefined){
      return;
    }
   
    // console.log(data);
     this.imgName=data["data"]["name"];
     this.imgExt=data["data"]["ext"];
     this.imgSrc="";
    //  var notImgVideo=false;
     var tempExt=this.imgExt.toUpperCase();
    

    this.extstr="."+this.imgExt;
    if(videosExt.indexOf(tempExt)>-1){
      this.itemType=ItemType.Video;
      this.extVideoStr="_thumbnail.png";
    }else if (imgExts.indexOf(tempExt)>-1){
      this.itemType=ItemType.Image;
    }else if (audioExt.indexOf(tempExt)>-1){
      this.itemType=ItemType.Audio;
      this.extAudioStr="_thumbnail.png";
    }else{
      this.itemType=ItemType.Others;
      this.extstr="_thumbnail.png";
    }



  
      // if (imgExts.indexOf(tempExt)==-1){
      //   this.itemType=ItemType.Image;
      //   if (videosExt.indexOf(tempExt)!=-1){
      //     this.isVideos=true;
      //     this.isImg=false;
      //     this.extstr="."+this.imgExt;
      //     this.extVideoStr="_thumbnail.png";

      //   }else{
      //     this.extstr="_thumbnail.png";
      //     notImgVideo=true;
      //     this.isImg=true;
      //     this.isVideos=false;
      //   }
      
      // }else {
      //   this.isImg=true;
      //   this.isVideos=false;
      //   this.extstr="."+this.imgExt;
      // }
      // console.log("imgName: "+this.imgName);
      // console.log("imgExts: "+this.imgExt);
      // console.log("isImg,isVideos: "+this.isImg +this.isVideos);
      this.ele= document.createElement("div");
      // var   imgSrc="app://local/"+rootPath+"/images/"+idn+".info/"+imgName+extstr;
      // var u=new fileUrl(imgSrc);
   


    var imgTag=this.CreateImgTag(this.imgExt);
    this.ele.appendChild(imgTag);


    var filePath=this.rootPath+"/images/"+idn+".info/"+this.imgName+this.extstr;
    var fileVideoImgPath=this.rootPath+"/images/"+idn+".info/"+this.imgName+this.extVideoStr;
    var imgFilePath=filePath;

    switch (this.itemType) {
        case ItemType.Image:
            var bg1=this.CreateImgEle(imgFilePath);
            this.ele.appendChild(bg1);
            break;
          case ItemType.Video:
            var vel=this.CreateVideoEle(filePath,fileVideoImgPath);
            this.ele.appendChild(vel);
            break;
          case ItemType.Audio:
            if(!fs.existsSync(filePath)){
              var bg1=this.CreateTipImgEleStyle("点击预览","width:100%;","",link);
            }else{
            var vel=this.CreateAudioEle(filePath,fileVideoImgPath);
            }
            this.ele.appendChild(vel);
            break;
          case ItemType.Others:
            if(!fs.existsSync(filePath)){
              var bg1=this.CreateTipImgEleStyle("点击预览","width:100%;","",link);
              // this.ele.appendChild(fileSvg);
              var ele2= document.createElement("div");
              ele2.innerHTML = fileSvg;//.trim();
              // bg1.innerHTML=fileSvg;
              this.ele.appendChild(bg1);
              this.ele.appendChild(ele2);
              // this.ele.innerHTML=fileSvg;
              // console.log(fileSvg);
            }else{
              var bg1=this.CreateImgEleStyle(imgFilePath,"width:100%;",link);
              this.ele.appendChild(bg1);
            }
              break;
          default:
            if(!fs.existsSync(filePath)){
              var bg1=this.CreateTipImgEleStyle("点击预览","width:100%;","",link);
              
              // // this.ele.appendChild(fileSvg);
              // var ele2= document.createElement("div");
              // ele2.innerHTML = fileSvg;//.trim();
              // bg1.innerHTML=fileSvg;
              this.ele.appendChild(bg1);
              // this.ele.appendChild(ele2);
              // this.ele.innerHTML=fileSvg;
              // console.log(fileSvg);

            }else{
              var bg1=this.CreateImgEleStyle(imgFilePath,"width:100%;",link);
              this.ele.appendChild(bg1);
            }
    
            break;
      }



    // 显示名字
    if(settings.ItemShowLink){
      var tagStr="";
      if(data.data.tags.length==0){
        tagStr="";
      }else{
          data.data.tags.forEach(el => {
          // console.log("|#|"+el);
          tagStr=+" "+el;
        });
        tagStr="|"+tagStr;
      }
      // console.log(tagStr);
      this.ele.appendChild(this.CreateTiteBar(this.imgName+"."+this.imgExt+tagStr,""));
    }
    wrap.append(this.ele);

    //  return ele;
  }

 

  // async function fetchMovies() {
  //   const response = await fetch('/movies');
  //   // 等待直到请求完成
  //   console.log(response);
  // }

  //  itemData:object;
  async  GetItemInfor(id: string): Promise<any> {
    const urlItem="http://localhost:41595/api/item/info?id="+id;
    try {
      const response = await fetch(urlItem, {  method: 'GET', redirect: 'follow'});
      const data   = response.json();
      return data;
    } catch (error) {
        if (error) {
            return false;
        }
    }




    // const response = await fetch(urlItem, {  method: 'GET', redirect: 'follow'});
    // .catch((error) => {
    //     console.log(error);
    //     return false;
    //   });
    // const data = await response.json();
//   if (response.ok) {
    //     return response.json();
    //   }else{
    //     console.log(' Something went wrong  urlItem');
    //     return false;
    //   }
    // })
    // .catch((error) => {
    //   console.log(error);
    //   return false;
    // });
 
       // .then((responseJson) => {
    //   return responseJson;
    // })

    // const data = await response.json();

    // const response = await fetch(urlItem);
    // const data = await response.json();
    // return data;
  }


  
  

    
  createEmbed(link: string, container: HTMLElement ,settings: Readonly<PluginSettings>,) {
    // this.fetchMovies();
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

        var imgTag=this.CreateImgTag("Null");
        wrapper.appendChild(imgTag);
        wrapper.appendChild(this.CreateTipLinkEle("Eagle 未启动！",link));
       
        // wrapper.appendChild(this.CreateTipLinkEle(app,link));
        container.appendChild(wrapper);
        return container;
      }else{

        // console.log("this.eagleRuning"+this.rootPath);

      }
  

      // var d=this.GetItemInfor(id);
      // if(d){
      //   console.log(d);
      //   console.log(d[2]);
      //   this.GetEaglePath(d,wrapper,id,link);
      // }else{
      //   itemExist=false;
      //   var imgTag=this.CreateImgTag("NULL");
      //   wrapper.appendChild(imgTag);
      //   wrapper.appendChild(this.CreateTipImgEle("链接失效！"));
      //   container.appendChild(wrapper);
      //   return container;

      // }


      fetch(urlItem, {  method: 'GET', redirect: 'follow'}).then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(' Something went wrong  urlItem');
      })
      .then((responseJson) => {
        this.GetEaglePath(responseJson,wrapper,id,link,settings);
      })
      .catch((error) => {
        console.log(error);
        itemExist=false;
        var imgTag=this.CreateImgTag("NULL");
        wrapper.appendChild(imgTag);
        wrapper.appendChild(this.CreateTipImgEle("链接失效！"));
        container.appendChild(wrapper);
        return container;
      });


    }else if(linkType=="folder"){
      if(!this.eagleRuning){
        this.GetRootPath();
        wrapper.appendChild(this.CreateTipFolderTipLinkEle("Eagle 未启动！","eagle://start"));
        container.appendChild(wrapper);
        
        return container;
      }


      if (!this.isGetFolderList){
         this.GetFolderList();
         wrapper.appendChild(this.CreateTipFolderTipLinkEle("Eagle 未启动！",link));
         container.appendChild(wrapper);
         return container;

      }else{
        if(this.eagleRuning){
          var fd;
          for (let index = 0; index < this.folderList.length; index++) {
              var  f = this.folderList[index];
              if(f.id==id){
                fd=f;
              
              }
          }
          if(fd){
            if(fd.covers){
              const matches = fd.covers[0].match(EAGLE_FOLDER_BG_LINK);
              const url = decodeURI(matches.groups.url);
              wrapper.appendChild(this.CreateTipFolderEle(url,link,fd,settings));

              
            }else{
                wrapper.appendChild(this.CreateTipFolderTipEle("无封面！",link,fd,settings));

            }
          }else{
            wrapper.appendChild(this.CreateTipFolderTipEle("链接失效！",link,fd));


          }
          if(fd){
            if(settings.FolderShowLink){
              wrapper.appendChild(this.CreateTiteBar(fd.name,link,"margin-left: 2px;"));
            }

          }
        
        }else{
          wrapper.appendChild(this.CreateTipFolderTipLinkEle("启动 Eagle",link));

        }  
      }
 
      // console.log(this.folderList);
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

  createAdditionalSettings(
    containerEl: HTMLElement,
    settings: Readonly<PluginSettings>,
    saveSettings: (updates: Partial<PluginSettings>) => Promise<void>,
  ) {
    
    

    const keepLinksInPreviewE = new Setting(containerEl)
    .setName("keepLinksInPreview")
    .addToggle((toggle) => {
      toggle
        .setValue(settings.keepLinksInPreview)
        .onChange(async (value) => {
          await saveSettings({ keepLinksInPreview: value });
        });
    });


    const keepEagleLinksInPre = new Setting(containerEl)
    .setName("显示原有链接")
    .addToggle((toggle) => {
      toggle
        .setValue(settings.keepEagleLinksInPreview)
        .onChange(async (value) => {
          await saveSettings({ keepEagleLinksInPre: value });
        });
    });



    const itemShowLinktem = new Setting(containerEl)
    .setName("图片显示 标题")
    .addToggle((toggle) => {
      toggle
        .setValue(settings.ItemShowLink)
        .onChange(async (value) => {
          await saveSettings({ ItemShowLink: value });
        });
    });


    const folderShowInnerLink = new Setting(containerEl)
    .setName("文件夹内显示 标题")
    .addToggle((toggle) => {
      toggle
        .setValue(settings.FolderShowInnerLink)
        .onChange(async (value) => {
          await saveSettings({ FolderShowInnerLink: value });
        });
    });


    const folderShowLink = new Setting(containerEl)
    .setName("文件夹显示 标题")
    .addToggle((toggle) => {
      toggle
        .setValue(settings.FolderShowLink)
        .onChange(async (value) => {
          await saveSettings({ FolderShowLink: value });
        });
    });



    return [itemShowLinktem,folderShowLink,keepLinksInPreviewE,keepEagleLinksInPre];
  }
  
}
