(function(Scratch) {
    'use strict';
    class WebRTC {
        constructor() {
            this.makeLabel = (text) => ({
                blockType: "label",
                text: text,
            });
            this.message=[]
            this.PC={};
            this.config={
                iceServers: [
                  { urls: "stun:stun.qq.com:3478" },
                  { urls: "stun:stun.aliyun.com:3478" },
                  { urls: "stun:stun.miui.com:3478" },
                  { urls: "stun:stun.l.google.com:19302" },
                  { urls: "stun:stun.stunprotocol.org:3478" },
                ]
              };
            this.test=[];
        }

        getInfo() {
            return {
                id: "WebRTC",
                name: "WebRTC",
                color: "00ffee",
                blocks: [
                    this.makeLabel("网络配置"),
                    {
                        opcode: "GetConfig",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "获取网络配置"
                    },
                    {
                        opcode: "SetConfig",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "设置网络配置为 [Config]",
                        arguments: {
                            Config: { type: Scratch.ArgumentType.STRING,defaultValue: '{iceServers: [{ urls: "stun:stun.qq.com:3478" },{ urls: "stun:stun.aliyun.com:3478" },{ urls: "stun:stun.miui.com:3478" },{ urls: "stun:stun.l.google.com:19302" },{ urls: "stun:stun.stunprotocol.org:3478" }]}' }
                        }
                    },
                    this.makeLabel("信令协商"),
                    {
                        opcode: "GetPeerConnection",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "所有会话"
                    },
                    {
                        opcode: "CreatePeerConnection",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "创建会话 [NAME]",
                        arguments: {
                            NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "新会话" }
                        }
                    },
                    {
                        opcode: "GetAttribute",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "获取会话 [NAME] 的 [VALUE]",
                        arguments: {
                            NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "新会话" },
                            VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: "Offer",menu:"TypeMenu"}
                        }
                    },
                    {
                        opcode: "SetOffer",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "接受 [Offer] 生成会话 [NAME]",
                        arguments: {
                            NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "对方会话" },
                            Offer: { type: Scratch.ArgumentType.STRING, defaultValue: ""}
                        }
                    },
                    {
                        opcode: "SetAnswer",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "对方回答 [Answer] 激活会话 [NAME]",
                        arguments: {
                            NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "新会话" },
                            Answer: { type: Scratch.ArgumentType.STRING, defaultValue: ""}
                        }
                    },
                    {
                        opcode: "SetICE",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "为会话 [NAME] 添加ICE候选 [ICE]",
                        arguments: {
                            NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "新会话" },
                            ICE: { type: Scratch.ArgumentType.STRING, defaultValue: ""}
                        }
                    },
                    {
                        opcode: "SetName",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "将会话 [NAME] 更名为 [NEWNAME]",
                        arguments: {
                            NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "新会话" },
                            NEWNAME: { type: Scratch.ArgumentType.STRING, defaultValue: "新会话2"}
                        }
                    },
                    {
                        opcode: "PCClose",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "断开会话 [NAME]",
                        arguments: {
                            NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "新会话" },
                        }
                    },
                    {
                        opcode: "AllClose",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "断开所有会话",
                    },
                    this.makeLabel("消息发送"),
                    {
                        opcode: "GetMessage",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "所有消息"
                    },
                    {
                        opcode: "SendMessage",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "向会话 [NAME] 发送消息 [Msg]",
                        arguments: {
                            NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "新会话" },
                            Msg: { type: Scratch.ArgumentType.STRING, defaultValue: "我是傻逼"}
                        }
                    },
                    {
                        opcode: "DeleteAMessage",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "删除第 [Msg] 条消息",
                        arguments: {
                            Msg: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1}
                        }
                    },
                    {
                        opcode: "DeleteAllMessage",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "删除所有消息"
                    },
                ],
                menus:{
                    TypeMenu:{
                      items:[
                        {text:"Offer",value:"Offer"},
                        {text:"Answer",value:"Answer"},
                        {text:"ICE候选",value:"ICE"},
                        {text:"通道状态",value:"readyState"},
                        {text:"协商状态",value:"signalingState"},
                        {text:"ICE收集状态",value:"ICEState"},
                        ]
                    },
                }
            };
        }
        GetConfig(){
            try{
                return JSON.stringify(this.config);
            }catch{}
        }
        SetConfig({Config}){
            try{
                this.config=JSON.parse(Config);
            }catch{}
        }
        GetPeerConnection(){
            try{
                return JSON.stringify(Object.keys(this.PC));
            }catch{}
        }
        async CreatePeerConnection(args){
            try{
                if(!Reflect.has(this.PC,args.NAME)){
                    const temp_PC=new RTCPeerConnection(this.config);
                    temp_PC.__name=args.NAME;
                    temp_PC.__ExpandData=this;
                    temp_PC.__ICEState="unknow";
                    temp_PC.__MainDC=temp_PC.createDataChannel("_Main");
                    temp_PC.__MainDC.__ParentChannel=temp_PC;
                    temp_PC.__MainDC.__ExpandData=temp_PC.__ExpandData;
                    temp_PC.__Answer=undefined;
                    temp_PC.__MainDC.onclose=function(){
                        const pc=this.__ParentChannel        
                        this.__ExpandData.PCClose({NAME:pc.__name})
                    }
                    temp_PC.__MainDC.onmessage=function(e){
                        const ExpandData=this.__ExpandData;
                        ExpandData.message.push({Connect:this.__ParentChannel.__name,message:e.data});
                    }
                    temp_PC.__ICE=[]
                    temp_PC.onicecandidate = function(e){
                        if (e.candidate) {
                            this.__ICE.push(e.candidate);
                            this.__ICEState="collecting";
                        }
                        else {
                            this.__ICEState="done";
                        }
                    }
                    temp_PC.__Offer=await temp_PC.createOffer()
                    temp_PC.setLocalDescription(temp_PC.__Offer)
                    this.PC[args.NAME]=temp_PC
                }
            }catch{}
        }
        GetAttribute(args){
            try{
                if(args.VALUE=="Offer"){
                    return JSON.stringify(this.PC[args.NAME].__Offer) ?? ""
                }
                else if(args.VALUE=="Answer"){
                    return JSON.stringify(this.PC[args.NAME].__Answer) ?? ""
                }
                else if(args.VALUE=="ICE"){
                    return JSON.stringify(this.PC[args.NAME].__ICE) ?? ""
                }
                else if (args.VALUE=="readyState"){
                    return this.PC[args.NAME].__MainDC.readyState ?? ""
                }
                else if (args.VALUE=="signalingState"){
                    return this.PC[args.NAME].signalingState ?? ""
                }
                else if (args.VALUE=="ICEState"){
                    return this.PC[args.NAME].__ICEState ?? ""
                }
            }catch{
                return "";
            }
        }
        async SetOffer(args){
            try{
                if(!Reflect.has(this.PC,args.NAME)){
                    const temp_PC=new RTCPeerConnection(this.config);
                    temp_PC.__name=args.NAME
                    temp_PC.__ExpandData=this;
                    temp_PC.__ICEState="unknow";
                    temp_PC.__ICE=[];
                    temp_PC.onicecandidate = function(e){
                        if (e.candidate) {
                            this.__ICE.push(e.candidate);
                            this.__ICEState="collecting";
                        }
                        else {
                            this.__ICEState="done";
                        }
                    }
                    temp_PC.ondatachannel=function(event){
                        const temp_DC=event.channel;
                        if(temp_DC.label=="_Main"){
                            temp_DC.__ParentChannel=this;
                            temp_DC.__ExpandData=this.__ExpandData
                            temp_DC.onmessage=function(e){
                                const ExpandData=this.__ExpandData;
                                ExpandData.message.push({Connect:this.__ParentChannel.__name,message:e.data});
                            }
                            temp_DC.onclose=function(){
                                const pc=this.__ParentChannel        
                                this.__ExpandData.PCClose({NAME:pc.__name})
                            }
                            this.__MainDC=temp_DC;
                        }
                    }
                    temp_PC.__Offer=JSON.parse(args.Offer);
                    await temp_PC.setRemoteDescription(temp_PC.__Offer);
                    temp_PC.__Answer=await temp_PC.createAnswer();
                    await temp_PC.setLocalDescription(temp_PC.__Answer);
                    this.PC[args.NAME]=temp_PC;
                }
            }catch{}
        }
        async SetAnswer(args){
            try{
                const Answer=JSON.parse(args.Answer)
                this.PC[args.NAME].__Answer=Answer;
                await this.PC[args.NAME].setRemoteDescription(Answer);
            }catch{}
        }
        async SetICE(args){
            try{
                const ICE=JSON.parse(args.ICE)
                if(Array.isArray(ICE)){
                    for(const item of ICE){
                        this.PC[args.NAME].addIceCandidate(item);
                    }
                }
                else{
                    this.PC[args.NAME].addIceCandidate(ICE);
                }
            }catch{}
        }


        GetMessage(){
            try{
                return JSON.stringify(this.message);
            }catch{}
        }
        SendMessage(args){
            try {
                const dc=this.PC[args.NAME].__MainDC;
                if(dc.readyState === 'open') dc.send(args.Msg);
            } catch {}
        }
        DeleteAMessage({Msg}){
            try{if(Msg>=1) this.message.splice(Msg-1,1)}catch{}
        }
        DeleteAllMessage(){
            this.message=[]
        }
        PCClose({NAME}){
            try{
                const pc=this.PC[NAME]
                if (pc.__MainDC) {
                    pc.__MainDC.__ParentChannel = null;
                    pc.__MainDC.__ExpandData = null;
                    pc.__MainDC = null;
                }
                pc.__ICE = null;
                pc.__Offer = null;
                pc.__Answer = null;
                pc.__ExpandData = null;
                pc.__ICEState=null;
                pc.__name = null;
                pc.close()
                delete this.PC[NAME];
            }catch{}
        }
        SetName({NAME,NEWNAME}){
            try{
                if(this.PC[NAME] && !this.PC[NEWNAME]){
                    const temp_PC=this.PC[NAME];
                    delete this.PC[NAME];
                    this.PC[NEWNAME]=temp_PC;
                }
            }catch{}
        }
        AllClose(){
            const keys = Object.keys(this.PC);
            for(const name of keys){
                this.PCClose({NAME: name});
            }
        }
    }
    Scratch.extensions.register(new WebRTC());
})(Scratch);
