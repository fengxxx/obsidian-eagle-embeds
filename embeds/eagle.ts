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


var iconFile=`<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.74 6.33018L10.3 0.33018C10.2065 0.226587 10.0924 0.143709 9.96492 0.0868754C9.83747 0.0300414 9.69954 0.000509805 9.56 0.000179976H2.56C2.22775 -0.00378312 1.89797 0.05774 1.5895 0.181236C1.28103 0.304732 0.999904 0.487783 0.762182 0.719934C0.524459 0.952085 0.334794 1.22879 0.204018 1.53425C0.0732421 1.8397 0.00391638 2.16793 0 2.50018V17.5002C0.00391638 17.8324 0.0732421 18.1607 0.204018 18.4661C0.334794 18.7716 0.524459 19.0483 0.762182 19.2804C0.999904 19.5126 1.28103 19.6956 1.5895 19.8191C1.89797 19.9426 2.22775 20.0041 2.56 20.0002H13.44C13.7723 20.0041 14.102 19.9426 14.4105 19.8191C14.719 19.6956 15.0001 19.5126 15.2378 19.2804C15.4755 19.0483 15.6652 18.7716 15.796 18.4661C15.9268 18.1607 15.9961 17.8324 16 17.5002V7.00018C15.9994 6.75234 15.9067 6.51358 15.74 6.33018V6.33018ZM13.65 7.00018H9.71C9.50384 6.97988 9.31391 6.87942 9.18111 6.72043C9.04831 6.56144 8.98327 6.35666 9 6.15018V2.00018H9.11L13.65 7.00018ZM13.44 18.0002H2.56C2.49037 18.0042 2.42063 17.9945 2.35477 17.9715C2.28892 17.9486 2.22824 17.9129 2.17621 17.8664C2.12419 17.82 2.08184 17.7637 2.0516 17.7009C2.02137 17.638 2.00383 17.5698 2 17.5002V2.50018C2.00383 2.43054 2.02137 2.36234 2.0516 2.2995C2.08184 2.23665 2.12419 2.18039 2.17621 2.13394C2.22824 2.08749 2.28892 2.05176 2.35477 2.02881C2.42063 2.00586 2.49037 1.99613 2.56 2.00018H7V6.15018C6.98386 6.8868 7.25975 7.59991 7.76747 8.13385C8.27518 8.6678 8.9735 8.97923 9.71 9.00018H14V17.5002C13.9962 17.5698 13.9786 17.638 13.9484 17.7009C13.9182 17.7637 13.8758 17.82 13.8238 17.8664C13.7718 17.9129 13.7111 17.9486 13.6452 17.9715C13.5794 17.9945 13.5096 18.0042 13.44 18.0002V18.0002Z" fill="white" fill-opacity="0.7"/>
</svg>

`

var iconFolder=`<svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 2H9.414L7.707 0.293001C7.61426 0.200002 7.50406 0.126244 7.38273 0.0759616C7.2614 0.0256795 7.13134 -0.000135141 7 5.32017e-07H2C0.897 5.32017e-07 0 0.897 0 2V16C0 17.103 0.897 18 2 18H18C19.103 18 20 17.103 20 16V4C20 2.897 19.103 2 18 2ZM2 16V4H18L18.002 16H2Z" fill="white" fill-opacity="0.7"/>
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



  CreateFileEmbedEle(name:string,ext:string,link:string){
    var imgTag=this.CreateImgTag(ext);
    var eleMain= document.createElement("a");
    eleMain.setAttribute("style","text-decoration:none");
    eleMain.setAttribute("href",link);
    eleMain.appendChild(imgTag);
    // console.log(imgTag);
    // console.log(eleMain);

    var ele= document.createElement("div");
    ele.setAttribute("class","EagleFile is-loaded");
    ele.setAttribute("tabindex","-1");
    ele.setAttribute("src",link);
    ele.setAttribute("aria-label","Open in Eagle");
    ele.setAttribute("contenteditable","true");

    var ele1= document.createElement("div");
    ele1.setAttribute("class","file-embed-title");

    var eleSpan= document.createElement("span");
    eleSpan.setAttribute("style","padding: 10px;");
    var icon= document.createElement("svg");
    icon.innerHTML=iconFile;


    eleSpan.setAttribute("class","file-embed-icon");
    eleSpan.append(icon)

    var text = document.createTextNode(name);

    ele1.appendChild(eleSpan);
    ele1.appendChild(text);

    ele1.insertBefore(ele1.firstChild,text);

    ele.appendChild(ele1);

    eleMain.appendChild(ele);

    return eleMain;
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



    var noTitle=false;
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
      
              this.ele=this.CreateFileEmbedEle(this.imgName+"."+this.imgExt,this.imgExt,link);
              noTitle=true;
            }else{
              var bg1=this.CreateImgEleStyle(imgFilePath,"width:100%;",link);
              this.ele.appendChild(bg1);
            }
              break;
          default:
            if(!fs.existsSync(filePath)){
              // var bg1=this.CreateTipImgEleStyle("点击预览","width:100%;","",link);
              this.ele=this.CreateFileEmbedEle(this.imgName+"."+this.imgExt,this.imgExt,link);
              noTitle=true;
              // // this.ele.appendChild(fileSvg);
              // var ele2= document.createElement("div");
              // ele2.innerHTML = fileSvg;//.trim();
              // bg1.innerHTML=fileSvg;
              // this.ele.appendChild(bg1);
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
    if(settings.ItemShowLink&&!noTitle){
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
      this.ele.appendChild(this.CreateTiteBar(this.imgName+"."+this.imgExt+tagStr,link,""));
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
    container.addClass("Eagle");


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
