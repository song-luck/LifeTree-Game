(function(Scratch) {
    'use strict';
    class CryptoSuite {
        constructor() {
            // 初始化加密日志
            this.cryptoLog = {
                success: false,
                message: ""
            };
        }

        getInfo() {
            return {
                id: "cryptoSuite",
                name: "综合加密套件",
                color: "00ffee", // 设置积木颜色为00ffee
                blocks: [
                    {
                    opcode: "dryptoLogTitle",
                    blockType: Scratch.BlockType.LABEL, 
                    text: "加密日志"
                    },
                    // 新增加密日志报告积木
                    {
                        opcode: "getCryptoLog",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "加密日志",
                        arguments: {},
                    },
                    {
                        opcode: "RSAOAEPTitle",
                        blockType: Scratch.BlockType.LABEL, 
                        text: "RSA-OAEP 非对称加密"
                        },
                    // RSA 非对称加密相关
                    {
                        opcode: "rsaGenerateKeys",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "生成RSA-OAEP2048密钥对(Json列表)",
                        arguments: {}
                    },
                    {
                        opcode: "rsaEncrypt",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "RSA-OAEP2048加密[DATA]用公钥[PUBKEY]",
                        arguments: {
                            DATA: { type: Scratch.ArgumentType.STRING, defaultValue: "对称密钥" },
                            PUBKEY: { type: Scratch.ArgumentType.STRING, defaultValue: '{"kty":"RSA","e":"AQAB","n":"..."}' }
                        }
                    },
                    {
                        opcode: "rsaDecrypt",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "RSA-OAEP2048解密[ENCDATA]用私钥[PRIVKEY]",
                        arguments: {
                            ENCDATA: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
                            PRIVKEY: { type: Scratch.ArgumentType.STRING, defaultValue: '{"kty":"RSA","e":"AQAB","n":"...","d":"...","p":"...","q":"..."}' }
                        }
                    },
                    {
                        opcode: "RSAPSSTitle",
                        blockType: Scratch.BlockType.LABEL, 
                        text: "RSA-PSS签名"
                    },
                    {
                        opcode: "rsaGenerateSignKeys",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "生成RSA-PSS密钥对(Json列表)",
                        arguments: {}
                    },
                    {
                        opcode: "rsaEncryptWithPrivateKey",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "RSA签名[DATA]用私钥[PRIVKEY]",
                        arguments: {
                            DATA: { type: Scratch.ArgumentType.STRING, defaultValue: "神奇的数据" },
                            PRIVKEY: { type: Scratch.ArgumentType.STRING, defaultValue: '' }
                        }
                    },
                    {
                        opcode: 'rsaVerifySignature', // 对应上面的方法名
                        blockType: Scratch.BlockType.BOOLEAN, // 积木类型：布尔值（√/×）
                        text: '公钥[PUBKEY]验证[SIGN]为数据[DATA]的签名？', // 积木显示文本
                        arguments: {
                            PUBKEY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '' // 公钥默认空
                            },
                            SIGN: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '' // 签名值默认空
                            },
                            DATA: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '神奇的数据' // 原始数据默认值
                            }
                        }
                    },
                    {
                        opcode: "pubKeyToNumTitle",
                        blockType: Scratch.BlockType.LABEL, 
                        text: "数字编码"
                    },
                    {
                        opcode: "pubKeyToNum",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "RSA公钥[PUBKEY]转纯数字编码",
                        arguments: {
                            PUBKEY: { type: Scratch.ArgumentType.STRING, defaultValue: '{"kty":"RSA","e":"AQAB","n":"..."}' }
                        }
                    },
                    {
                        opcode: "numToPubKey",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "数字编码[NUMCODE]还原RSA公钥",
                        arguments: {
                            NUMCODE: { type: Scratch.ArgumentType.STRING, defaultValue: "e:001:000:001|n:002:003:004..." }
                        }
                    },

                    // AES 对称加密相关
                    {
                        opcode: "ASETitle",
                        blockType: Scratch.BlockType.LABEL, 
                        text: "AES 对称加密"
                    },
                    {
                        opcode: "aesGenerateKey",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "生成AES256密钥(BASE64)",
                        arguments: {}
                    },
                    {
                        opcode: "aesEncrypt",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "AES加密[DATA]用密钥[KEY]",
                        arguments: {
                            DATA: { type: Scratch.ArgumentType.STRING, defaultValue: "游戏数据" },
                            KEY: { type: Scratch.ArgumentType.STRING, defaultValue: "" }
                        }
                    },
                    {
                        opcode: "aesDecrypt",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "AES解密[ENCDATA]用密钥[KEY]",
                        arguments: {
                            ENCDATA: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
                            KEY: { type: Scratch.ArgumentType.STRING, defaultValue: "" }
                        }
                    },

                    // SHA-256 哈希加密相关
                    {
                        opcode: "SHATitle",
                        blockType: Scratch.BlockType.LABEL, 
                        text: "SHA大家族哈希加密"
                    },
                    {
                        opcode: "sha512Hash",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "SHA-512哈希[DATA]得到十六进制",
                        arguments: {
                            DATA: { type: Scratch.ArgumentType.STRING, defaultValue: "需要校验的数据" }
                        }
                    },
                    {
                        opcode: "sha384Hash",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "SHA-384哈希[DATA]得到十六进制",
                        arguments: {
                            DATA: { type: Scratch.ArgumentType.STRING, defaultValue: "需要校验的数据" }
                        }
                    },
                    {
                        opcode: "sha256Hash",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "SHA-256哈希[DATA]得到十六进制",
                        arguments: {
                            DATA: { type: Scratch.ArgumentType.STRING, defaultValue: "需要校验的数据" }
                        }
                    },
                    {
                        opcode: "sha1Hash",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "SHA-1哈希[DATA]得到十六进制",
                        arguments: {
                            DATA: { type: Scratch.ArgumentType.STRING, defaultValue: "需要校验的数据" }
                        }
                    }
                ]
            };
        }

        // 加密日志报告积木
        getCryptoLog() {
            return JSON.stringify(this.cryptoLog);
        }

        // ========== RSA 非对称加密实现 ==========
        async rsaGenerateKeys() {
            try {
                const keyPair = await crypto.subtle.generateKey(
                    { name: "RSA-OAEP", modulusLength: 2048, publicExponent: new Uint8Array([0x01, 0x00, 0x01]), hash: "SHA-256" },
                    true,
                    ["encrypt", "decrypt"]
                );
                const pubJWK = await crypto.subtle.exportKey("jwk", keyPair.publicKey);
                const privJWK = await crypto.subtle.exportKey("jwk", keyPair.privateKey);
                const simplePub = { kty: pubJWK.kty, e: pubJWK.e, n: pubJWK.n };
                const result = JSON.stringify([simplePub, privJWK]);
                // 更新日志（密钥生成成功）
                this.cryptoLog = {
                    success: true,
                    message: "RSA密钥对生成成功"
                };
                return result;
            } catch (e) {
                // 更新日志（失败）
                this.cryptoLog = {
                    success: false,
                    message: e.message || "RSA密钥生成失败"
                };
                return "";
            }
        }

        async rsaEncrypt(args) {
            try {
                const pubKey = JSON.parse(args.PUBKEY);
                const encoder = new TextEncoder();
                const key = await crypto.subtle.importKey(
                    "jwk", pubKey, { name: "RSA-OAEP", hash: "SHA-256" }, false, ["encrypt"]
                );
                const encrypted = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, key, encoder.encode(args.DATA));
                const result = btoa(String.fromCharCode(...new Uint8Array(encrypted)));
                // 更新日志（加密成功）
                this.cryptoLog = {
                    success: true,
                    message: result
                };
                return result;
            } catch (e) {
                // 更新日志（失败）
                this.cryptoLog = {
                    success: false,
                    message: e.message || "RSA加密失败"
                };
                return "";
            }
        }

        async rsaDecrypt(args) {
            try {
                const privKey = JSON.parse(args.PRIVKEY);
                const decoder = new TextDecoder();
                const encryptedData = Uint8Array.from(atob(args.ENCDATA), c => c.charCodeAt(0));
                const key = await crypto.subtle.importKey(
                    "jwk", privKey, { name: "RSA-OAEP", hash: "SHA-256" }, false, ["decrypt"]
                );
                const decrypted = await crypto.subtle.decrypt({ name: "RSA-OAEP" }, key, encryptedData);
                const result = decoder.decode(decrypted);
                // 更新日志（解密成功）
                this.cryptoLog = {
                    success: true,
                    message: result
                };
                return result;
            } catch (e) {
                // 更新日志（失败）
                this.cryptoLog = {
                    success: false,
                    message: e.message || "RSA解密失败"
                };
                return "";
            }
        }

        async rsaGenerateSignKeys() {
            try {
                // 生成用于 RSA-PSS 签名的密钥对
                const keyPair = await crypto.subtle.generateKey(
                    {
                        name: "RSA-PSS", // 算法改为 PSS
                        modulusLength: 2048,
                        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                        hash: "SHA-256"
                    },
                    true,
                    ["sign", "verify"] // 用途改为签名和验签
                );
        
                const pubJWK = await crypto.subtle.exportKey("jwk", keyPair.publicKey);
                const privJWK = await crypto.subtle.exportKey("jwk", keyPair.privateKey);
        
                const result = JSON.stringify([pubJWK, privJWK]);
                this.cryptoLog = { success: true, message: "RSA签名密钥对生成成功" };
                return result;
            } catch (e) {
                this.cryptoLog = { success: false, message: e.message || "RSA签名密钥生成失败" };
                return "";
            }
        }

        async rsaEncryptWithPrivateKey(args) {
            try {
                const privKey = JSON.parse(args.PRIVKEY);
                const encoder = new TextEncoder();
                // 1. 修正密钥用途：从 ["verify"] 改为 ["sign"]
                const key = await crypto.subtle.importKey(
                    "jwk", privKey,
                    { name: "RSA-PSS", hash: "SHA-256" },
                    false,
                    ["sign"] // 私钥用于签名，不是验签
                );
                // 2. 修正签名配置：添加 saltLength
                const encrypted = await crypto.subtle.sign(
                    { name: "RSA-PSS", saltLength: 32 }, // 必须加 saltLength
                    key,
                    encoder.encode(args.DATA)
                );
                const result = btoa(String.fromCharCode(...new Uint8Array(encrypted)));
                this.cryptoLog = {
                    success: true,
                    message: result
                };
                return result;
            } catch (e) {
                this.cryptoLog = {
                    success: false,
                    message: e.message || "RSA签名失败"
                };
                return "";
            }
        }

        async rsaVerifySignature(args) {
            try {
        // 1. 提取并校验参数（缺一不可）
                const pubKeyStr = args.PUBKEY; // 签名专用公钥（JWK字符串）
                const signStr = args.SIGN;     // 私钥生成的签名值（Base64）
                const originalData = args.DATA;// 原始数据（需要验证的内容）
        
        // 空值校验：任意参数为空直接返回false
                if (!pubKeyStr || !signStr || !originalData) {
                    this.cryptoLog = { 
                        success: false, 
                        message: '公钥、签名值、原始数据不能为空' 
                    };
                    return false;
                }

        // 2. 解析公钥JWK并导入（仅赋予验签权限）
                const pubKeyJwk = JSON.parse(pubKeyStr);
                const publicKey = await window.crypto.subtle.importKey(
                    'jwk',                  // 密钥格式：JWK
                    pubKeyJwk,              // 解析后的公钥对象
                    { 
                        name: 'RSA-PSS',    // 算法：与签名/密钥生成完全匹配
                        hash: 'SHA-256'     // 哈希算法：固定SHA-256
                    },
                    false,                  // 不可提取（安全限制）
                    ['verify']              // 公钥仅赋予验签权限（核心）
                );

        // 3. 格式转换（字符串→二进制，适配加密API）
        // 签名值：Base64→Uint8Array
                const signatureBuffer = Uint8Array.from(atob(signStr), c => c.charCodeAt(0));
        // 原始数据：字符串→Uint8Array
                const dataBuffer = new TextEncoder().encode(originalData);

        // 4. 核心验签（返回纯布尔值）
                const isValid = await window.crypto.subtle.verify(
                    { name: 'RSA-PSS', saltLength: 32 }, // 与签名方法的saltLength一致
                    publicKey,                           // 签名专用公钥
                    signatureBuffer,                     // 待验证的签名值
                    dataBuffer                           // 原始数据（用于重新计算哈希）
        );

        // 5. 日志记录 + 返回布尔值
                this.cryptoLog = {
                    success: isValid,
                    message: isValid ? '验签成功' : '验签失败（签名无效/数据被篡改/密钥不匹配）'
                };
                return isValid; // 核心：返回纯布尔值

            } catch (error) {
        // 异常情况直接返回false，并记录错误
                this.cryptoLog = {
                    success: false,
                    message: `验签异常：${error.message}`
                };
                return false;
            }
        }

        async pubKeyToNum(args) {
            try {
                const pubKey = JSON.parse(args.PUBKEY);
                const base64urlToBytes = (b64u) => {
                    b64u = b64u.replace(/-/g, '+').replace(/_/g, '/');
                    while (b64u.length % 4) b64u += '=';
                    return Uint8Array.from(atob(b64u), c => c.charCodeAt(0));
                };
                const eBytes = base64urlToBytes(pubKey.e);
                const nBytes = base64urlToBytes(pubKey.n);
                const bytesToNum = (bytes) => bytes.map(b => b.toString().padStart(3, '0')).join(':');
                const result = `e:${bytesToNum(eBytes)}|n:${bytesToNum(nBytes)}`;
                // 更新日志（编码成功）
                this.cryptoLog = {
                    success: true,
                    message: result
                };
                return result;
            } catch (e) {
                // 更新日志（失败）
                this.cryptoLog = {
                    success: false,
                    message: e.message || "公钥编码失败"
                };
                return "";
            }
        }

        async numToPubKey(args) {
            try {
                const [ePart, nPart] = args.NUMCODE.split('|');
                const eNum = ePart.split(':').slice(1).join(':');
                const nNum = nPart.split(':').slice(1).join(':');
                const numToBytes = (numStr) => Uint8Array.from(numStr.split(':'), num => parseInt(num));
                const eBytes = numToBytes(eNum);
                const nBytes = numToBytes(nNum);
                const bytesToBase64url = (bytes) => {
                    const b64 = btoa(String.fromCharCode(...bytes));
                    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
                };
                const result = JSON.stringify({ kty: "RSA", e: bytesToBase64url(eBytes), n: bytesToBase64url(nBytes) });
                // 更新日志（解码成功）
                this.cryptoLog = {
                    success: true,
                    message: result
                };
                return result;
            } catch (e) {
                // 更新日志（失败）
                this.cryptoLog = {
                    success: false,
                    message: e.message || "公钥解码失败"
                };
                return "";
            }
        }

        // ========== AES 对称加密实现 ==========
        async aesGenerateKey() {
            try {
                const key = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
                const keyBytes = await crypto.subtle.exportKey("raw", key);
                const result = btoa(String.fromCharCode(...new Uint8Array(keyBytes)));
                // 更新日志（密钥生成成功）
                this.cryptoLog = {
                    success: true,
                    message: result
                };
                return result;
            } catch (e) {
                // 更新日志（失败）
                this.cryptoLog = {
                    success: false,
                    message: e.message || "AES密钥生成失败"
                };
                return "";
            }
        }

        async aesEncrypt(args) {
            try {
                const keyBytes = Uint8Array.from(atob(args.KEY), c => c.charCodeAt(0));
                const key = await crypto.subtle.importKey("raw", keyBytes, { name: "AES-GCM", length: 256 }, false, ["encrypt"]);
                const iv = crypto.getRandomValues(new Uint8Array(12));
                const encoder = new TextEncoder();
                const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, encoder.encode(args.DATA));
                const combined = new Uint8Array([...iv, ...new Uint8Array(encrypted)]);
                const result = btoa(String.fromCharCode(...combined));
                // 更新日志（加密成功）
                this.cryptoLog = {
                    success: true,
                    message: result
                };
                return result;
            } catch (e) {
                // 更新日志（失败）
                this.cryptoLog = {
                    success: false,
                    message: e.message || "AES加密失败"
                };
                return "";
            }
        }

        async aesDecrypt(args) {
            try {
                const combined = Uint8Array.from(atob(args.ENCDATA), c => c.charCodeAt(0));
                const iv = combined.slice(0, 12);
                const encrypted = combined.slice(12);
                const keyBytes = Uint8Array.from(atob(args.KEY), c => c.charCodeAt(0));
                const key = await crypto.subtle.importKey("raw", keyBytes, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
                const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, key, encrypted);
                const decoder = new TextDecoder();
                const result = decoder.decode(decrypted);
                // 更新日志（解密成功）
                this.cryptoLog = {
                    success: true,
                    message: result
                };
                return result;
            } catch (e) {
                // 更新日志（失败）
                this.cryptoLog = {
                    success: false,
                    message: e.message || "AES解密失败"
                };
                return "";
            }
        }

        // ========== SHA-256 哈希实现 ==========
        async sha512Hash(args) {
            try {
                const encoder = new TextEncoder();
                const hash = await crypto.subtle.digest("SHA-512", encoder.encode(args.DATA));
                const hashArray = Array.from(new Uint8Array(hash));
                const result = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                // 更新日志（哈希成功）
                this.cryptoLog = {
                    success: true,
                    message: result
                };
                return result;
            } catch (e) {
                // 更新日志（失败）
                this.cryptoLog = {
                    success: false,
                    message: e.message || "SHA-512哈希失败"
                };
                return "";
            }
        }

        async sha384Hash(args) {
            try {
                const encoder = new TextEncoder();
                const hash = await crypto.subtle.digest("SHA-384", encoder.encode(args.DATA));
                const hashArray = Array.from(new Uint8Array(hash));
                const result = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                // 更新日志（哈希成功）
                this.cryptoLog = {
                    success: true,
                    message: result
                };
                return result;
            } catch (e) {
                // 更新日志（失败）
                this.cryptoLog = {
                    success: false,
                    message: e.message || "SHA-384哈希失败"
                };
                return "";
            }
        }

        async sha256Hash(args) {
            try {
                const encoder = new TextEncoder();
                const hash = await crypto.subtle.digest("SHA-256", encoder.encode(args.DATA));
                const hashArray = Array.from(new Uint8Array(hash));
                const result = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                // 更新日志（哈希成功）
                this.cryptoLog = {
                    success: true,
                    message: result
                };
                return result;
            } catch (e) {
                // 更新日志（失败）
                this.cryptoLog = {
                    success: false,
                    message: e.message || "SHA-256哈希失败"
                };
                return "";
            }
        }

        async sha1Hash(args) {
            try {
                const encoder = new TextEncoder();
                const hash = await crypto.subtle.digest("SHA-1", encoder.encode(args.DATA));
                const hashArray = Array.from(new Uint8Array(hash));
                const result = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                // 更新日志（哈希成功）
                this.cryptoLog = {
                    success: true,
                    message: result
                };
                return result;
            } catch (e) {
                // 更新日志（失败）
                this.cryptoLog = {
                    success: false,
                    message: e.message || "SHA-1哈希失败"
                };
                return "";
            }
        }
    }
    Scratch.extensions.register(new CryptoSuite());
})(Scratch);
