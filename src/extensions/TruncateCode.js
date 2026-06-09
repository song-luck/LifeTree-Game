/*这是song_luck自主研发的一个编码器，但在项目里面id是“numericalencoding2”，主要原因是作者更新过一次编码器，但是ID无法改动，故采用了Numerical Encoding V2的ID，实际在这串代码中没有任何关于该扩展的代码。*/

(function(Scratch) {
  'use strict';
  class TruncateCode{
    
    constructor() {
      /*此代码由song_luck研发*/
      this.TruncateCode={internal:{BaseToBase:function(r=[0],e=2,t=10,n=!1){r=[...r];let o=[],s=0n,i=0;if(n)for(;0==r[0];)r.shift(),i++;for(let a=0;a<r.length;a++)s*=BigInt(e),s+=BigInt(r[a]);for(;0n!==s;)o.unshift(s%BigInt(t)),s=(s-o[0])/BigInt(t),o[0]=Number(o[0]);if(n)for(;i>=1;)o.unshift(0),i--;return o}},ArrayCompression:function(r,e){let t=[...r],n=[];t.sort((r,e)=>r-e);let o=[...t=[...new Set(t)]],s=[...t],i=!0,a=t.length,f=[],h=0;for(;i;){h++,i=!1;for(let l=0;l<s.length-1;l++){let u=s[l+1]-o[l]-1;r.length/Math.log2(e)*Math.log2(a/(a+u))>-2&&(o.splice(l,1),s.splice(l+1,1),a+=u,i=!0)}}for(let p in n.push(s.length),s){for(let m=s[p];m<=o[p];m++)f.push(m);n.push(s[p]),n.push(o[p])}for(let c in r)r[c]=f.indexOf(r[c]);return n.push(...this.internal.BaseToBase(r,f.length,e,!0)),n},ArrayDecompress:function(r,e){let t=r.shift(),n=[];for(let o=1;o<=t;o++){let s=r.shift(),i=r.shift();for(let a=s;a<=i;a++)n.push(a)}for(let f in r=this.internal.BaseToBase(r,e,n.length,!0))r[f]=n[r[f]];return r},StringCompression:function(r){let e=[];return e=[...r].map(r=>r.charCodeAt(0)),e=String.fromCharCode(...e=this.ArrayCompression(e,65536))},StringDecompress:function(r){let e=[];return e=[...r].map(r=>r.charCodeAt(0)),e=String.fromCharCode(...e=this.ArrayDecompress(e,65536))},StringCompressionToUnit8Array:function(r){let e=[];return e=[...r].map(r=>r.charCodeAt(0)),e=this.ArrayCompression(e,65536),e=this.internal.BaseToBase(e,65536,256,!0),new Uint8Array(e)},StringDecompressFromUnit8Array:function(r){let e=this.internal.BaseToBase(Array.from(r),256,65536);return String.fromCharCode(...e=this.ArrayDecompress(e,65536))},Uint8ArrayCompression:function(r){return new Uint8Array(this.ArrayCompression(Array.from(r),256))},Uint8ArrayDecompress:function(r){return new Uint8Array(this.ArrayDecompress(Array.from(r),256))}};
    }

/*在实际项目中作者实际上使用的是阉割版的该扩展，相当于你看到的这个文件功能比项目中的要全很多*/


    getInfo() {
      return {
        id: "TruncateCode",
        name: "截断编码",
        color:"00ffee",
        blocks: [
          {
            opcode: "MindTitle",
            blockType: Scratch.BlockType.LABEL, 
            text: "主要功能"
          },
          {
            opcode: "encode",
            blockType: Scratch.BlockType.REPORTER,
            text: "使用编码器 [CODE] 压缩 [TEXT] 为 [TYPE]",
            arguments: {
              CODE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'byte',
                menu:"CodeMenu",
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"a":1}'
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Number',
                menu:"TypeMenu"
              }
            }
          },
          {
            opcode: "decode",
            blockType: Scratch.BlockType.REPORTER,
            text: "使用编码器 [CODE] 从 [TYPE] 解压 [TEXT]",
            arguments: {
              CODE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'byte',
                menu:"CodeMenu",
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue:"19098357597413310463"
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Number',
                menu:"TypeMenu"
              }
            }
          },
          {
            opcode: "AttachmentTitle",
            blockType: Scratch.BlockType.LABEL, 
            text: "附件"
          },
          {
            opcode: "BaseToBase",
            blockType: Scratch.BlockType.REPORTER,
            text: "将数组 [DATA] 从 [INPB] 进制转化为 [OUPB] 进制，并且 [ZERO] 前导零",
            arguments: {
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue:"[1,0,1,1,0,1,1]"
              },
              INPB: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "2",
              },
              OUPB: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "10",
              },
              ZERO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue:"false",
                menu:"ZeroMenu"
              }
            }
          }
        ],
        menus:{
          TypeMenu:{
            items:[
              {text:"数字",value:"Number"},
              {text:"Base64",value:"Base64"},
              {text:"Uint8Array",value:"Uint8Array"},
              {text:"字符串",value:"String"}
            ]
          },
          ZeroMenu:{
            items:[
              {text:"保留",value:"true"},
              {text:"不保留",value:"false"},
            ]
          },
          CodeMenu:{
            items:[
              {text:"字节编码器",value:"byte"},
              {text:"字符编码器",value:"string"}
            ]
          }
        }
      };
    };
    encode(args) {
      try {
      let obj=args.TEXT;
        if(args.TYPE=="Base64"){
          let uint8;
          if(args.CODE=="string"){
            uint8 = this.TruncateCode.StringCompressionToUnit8Array(obj);
          }
          else if(args.CODE=="byte"){
            uint8 = this.TruncateCode.Uint8ArrayCompression(new TextEncoder().encode(obj));
          }
          return btoa(String.fromCharCode(...uint8));
        }
        else if(args.TYPE=="Number"){
          let uint8;
          if(args.CODE=="string"){
            uint8 = this.TruncateCode.StringCompressionToUnit8Array(obj);
          }
          else if(args.CODE=="byte"){
            uint8 = this.TruncateCode.Uint8ArrayCompression(new TextEncoder().encode(obj));
          }
          return this.TruncateCode.internal.BaseToBase(Array.from(uint8),256,10,true).map(String).join("")
        }
        else if(args.TYPE=="Uint8Array"){
          let uint8;
          if(args.CODE=="string"){
            uint8 = this.TruncateCode.StringCompressionToUnit8Array(obj);
          }
          else if(args.CODE=="byte"){
            uint8 = this.TruncateCode.Uint8ArrayCompression(new TextEncoder().encode(obj));
          }
          return JSON.stringify(Array.from(uint8));
        }
        else if(args.TYPE=="String"){
          return this.TruncateCode.StringCompression(obj);
        }
      } catch (e) {
        return "";
      }
    };

    decode(args) {
      try {
        let uint8,obj;
        if(args.TYPE=="Base64"){
          const bin = atob(args.TEXT);
          uint8 = Uint8Array.from([...bin].map(c => c.charCodeAt(0)));
          if(args.CODE=="string"){
            obj = this.TruncateCode.StringDecompressFromUnit8Array(uint8);
          }
          else if(args.CODE=="byte"){
            obj = new TextDecoder().decode(this.TruncateCode.Uint8ArrayDecompress(uint8));
          }
        }
        else if(args.TYPE=="Number"){
          uint8=this.TruncateCode.internal.BaseToBase(String(args.TEXT).split("").map(Number),10,256,true);
          uint8=new Uint8Array(uint8);
          if(args.CODE=="string"){
            obj = this.TruncateCode.StringDecompressFromUnit8Array(uint8);
          }
          else if(args.CODE=="byte"){
            obj = new TextDecoder().decode(this.TruncateCode.Uint8ArrayDecompress(uint8));
          }
        }
        else if(args.TYPE=="Uint8Array"){
          uint8=new Uint8Array(JSON.parse(args.TEXT));
          if(args.CODE=="string"){
            obj = this.TruncateCode.StringDecompressFromUnit8Array(uint8);
          }
          else if(args.CODE=="byte"){
            obj = new TextDecoder().decode(this.TruncateCode.Uint8ArrayDecompress(uint8));
          }
        }
        else if(args.TYPE=="String"){
          obj = this.TruncateCode.StringDecompress(args.TEXT);
        }
        return obj;
      } catch (e) {
        return "undefined";
      };
    };

    BaseToBase(args) {
      try {
        const data = this.TruncateCode.internal.BaseToBase(JSON.parse(args.DATA),args.INPB,args.OUPB,args.ZERO=="true");
        return JSON.stringify(data);
      } catch(e) {
        return "";
      }
    };
  };


  Scratch.extensions.register(new TruncateCode());
})(Scratch);