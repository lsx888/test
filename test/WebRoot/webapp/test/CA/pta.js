//定义允许专用证书的项目名称(支持多个项目名称)
//var arrayProjectName = new Array("南充市人力资源和社会保障局","广安市电子化招投标");
//var arrayProjectName = new Array("成都市城乡一体化社会救助信息平台");
var arrayProjectName ="";
var arrayIssuerDN_SCEGB = new Array(
		"C=CN, O=四川省数字证书认证管理中心有限公司, OU=China Trust Network, OU=Terms of use at https://www.itrus.com.cn/ctnrpa (c)2008, OU=Class 2 Enterprise Individual Subscriber CA, CN=SCEGB CA",
		"C=CN, O=Sichuan Digital Certificate Authority Management Center, OU=SCEGB CA, CN=SCEGB CA",
		"C=CN, O=Sichuan Digital Certificate Authority Management Center, OU=RSA Certificate System, CN=SCEGB CA",
		"C=CN, O=Sichuan Digital Certificate Authority Management Center, OU=SM2 Certificate System, CN=SCEGB CA");

var arrayIssuerDN_SCEB = new Array(
		"C=CN, O=四川省数字证书认证管理中心有限公司, OU=SCEB CA, CN=SCEB CA",
		"C=CN, O=Sichuan Digital Certificate Authority Management Center, OU=SCEB CA, CN=SCEB CA",
		"C=CN, O=Sichuan Digital Certificate Authority Management Center, OU=RSA Certificate System, CN=SCEB CA",
		"C=CN, O=Sichuan Digital Certificate Authority Management Center, OU=SM2 Certificate System, CN=SCEB CA");

var arrayIssuerDN_SCEGC = new Array(
		"C=CN, O=Sichuan Digital Certificate Authority Management Center, OU=SCEGC CA, CN=SCEGC CA",
		"C=CN, O=Sichuan Digital Certificate Authority Management Center, OU=RSA Certificate System, CN=SCEGC CA",
		"C=CN, O=Sichuan Digital Certificate Authority Management Center, OU=SM2 Certificate System, CN=SCEGC CA");
		
var arrayIssuerDN_SCEG = new Array(
		"C=CN, O=四川省数字证书认证管理中心有限公司, OU=China Trust Network, OU=Terms of use at https://www.itrus.com.cn/ctnrpa (c)2008, OU=Class 2 Enterprise Individual Subscriber CA, CN=SCEG CA",
		"C=CN, O=Sichuan Digital Certificate Authority Management Center, OU=SCEG CA, CN=SCEG CA",
		"C=CN, O=Sichuan Digital Certificate Authority Management Center, OU=RSA Certificate System, CN=SCEG CA",
		"C=CN, O=Sichuan Digital Certificate Authority Management Center, OU=SM2 Certificate System, CN=SCEG CA");
	
var arrayIssuerDN = new Array();
		//arrayIssuerDN = arrayIssuerDN_SCEGB.concat(arrayIssuerDN_SCEB);
		 // arrayIssuerDN = arrayIssuerDN_SCEGB.concat(arrayIssuerDN_SCEG);
		arrayIssuerDN = arrayIssuerDN_SCEGB.concat(arrayIssuerDN_SCEB.concat(arrayIssuerDN_SCEG).concat(arrayIssuerDN_SCEGC));

// 以下常量用于控制接口的行为和输出方式
var NO_CONTENT_DATA = 1;
var USE_CONTENT_DATA = 2;
var USE_SIGNCONTENT = 3;
var PARAM_FILENAME = 0x1000;
var PARAM_STRING = 0x2000;
var PARAM_P7S = 0x4000;
var PARAM_P7B = 0x8000;
var CERT_ENCODE_BASE64 = 0x2;

// 签名时不弹出提示的话,需要设置这个值
var FUNCOPT_NOALERT = 0x80000000;

// 加密的时候选择对称算法算法,可以设置这些值,如果不设置,默认会使用3DES
var PTA_CALG_DES = 0x10000;
var PTA_CALG_3DES = 0x20000;
var PTA_CALG_AES = 0x40000;
var PTA_CALG_RC4 = 0x80000;
var PTA_CALG_SM4 = 0x100000;

// 密钥用法选项
var KEY_USAGE_UNDEFINED = 0x00;
var KEY_USAGE_ALL = 0x01;
var KEY_USAGE_CRL_SIGN = 0x02;
var KEY_USAGE_CERT_SIGN = 0x04;
var KEY_USAGE_KEY_AGREEMENT = 0x08;
var KEY_USAGE_DATA_ENCIPHERMENT = 0x10;
var KEY_USAGE_KEY_ENCIPHERMENT = 0x20;
var KEY_USAGE_NON_REPUDIATION = 0x40;
var KEY_USAGE_DIGITAL_SIGNATURE = 0x80;

var UNDEFINED = 0x0;
var CRL_SIGN = 0x02;
var CERT_SIGN = 0x04;
var KEY_AGREEMENT = 0x08;
var DATA_ENCIPHERMENT = 0x10;
var KEY_ENCIPHERMENT = 0x20;
var NON_REPUDIATION = 0x40;
var DIGITAL_SIGNATURE = 0x80;

// 签名验签选项
var INPUT_BASE64 = 0x01; // SignMessage和VerifySignature输入参数
var INPUT_HEX = 0x02; // SignMessage和VerifySignature输入参数
var OUTPUT_BASE64 = 0x04; // 以BASE64编码pkcs7签名值
var OUTPUT_HEX = 0x08; // 以16进制字符串编码pkcs7签名值
var INNER_CONTENT = 0x10; // SignMessage...signData参数：是否包含原文
var	PLAINTEXT_UTF8		= 0x20; // 原文UTF-8编码(SignMessage &
								// VerifySignature函数)，缺省使用GB2312编码原文
var	MIN_CERTSTORE		= 0x40; // 最小化证书链(仅包含签名证书)
var	HTML_SHOW			= 0x80; // 接受HTML数据并渲染
var	MSG_BASE64			= 0x04; // VerifySignature输入参数
var MSG_HEX				= 0x08; // VerifySignature输入参数
var MSG_IMAGE			= 0x100; // VerifySignature输入参数
var ONLY_SIGNATURE = 0x200;// 裸签名输入参数

// 证书导入导出选项
var MARK_CERT_TO_UNEXPORTABLE = 0x02;// 标记证书为不可导出
var DELETE_CERT = 0x04;// 删除该证书

// HASH算法选项
var PTA_CALG_MD5  = 1; 
var PTA_CALG_SHA1 = 2;
var PTA_CALG_SM3  =	3;

// 全局变量
var iTrusPTA;

/*******************************************************************************
 * PTA控件用到的方法
 ******************************************************************************/
var PTA =
{
	Init : function() {
		// 初始化控件
		if (document.getElementById('iTrusPTA_ie') != null||document.getElementById('iTrusPTA_ff') != null) {
			// alert("pta have");
			return true;
		}
		var urlArray = new Array();
	    urlArray = window.location.toString().split('/');   
		var base = urlArray[0]+'//' + window.location.host + '/' + urlArray[3];	
		var iePtaObject = "<object id='iTrusPTA_ie' codebase='http://cdn.scca.com.cn/CertToolKit/certctl.CAB#version=2,5,5,28' style='visibility: hidden' classid='clsid:41992E4D-6707-4342-842E-7EF66DED5163' viewastext></object>";
		var ffPtaObject = "<embed id='iTrusPTA_ff' type='application/iTrusPTA_SCCA.iTrusPTA.Version.1' width='0' height='0' tabindex='-1'/>";
		if(navigator.userAgent.indexOf("MSIE") >= 0 || !!window.ActiveXObject || "ActiveXObject" in window) {//后面2个是为了兼容IE11
			                                                     
			//判断浏览器版本，如果为64位IE，那么控件可能会加载失败，跳转到提示页面
			var browerAgent=navigator.userAgent.toLowerCase();
			if(browerAgent.indexOf("win64")>=0&&browerAgent.indexOf("x64")>=0) {
				   //64位IE，跳转
				alert("您的浏览器为64位IE浏览器，请使用32位IE浏览器。\r\n一般windows7操作系统都同时安装了32位和64位IE浏览器，你使用32位的浏览器打开即可!");
				return false;
				
			}
			var divContainer = document.createElement("div");
			divContainer.id = "div_iTrusPTA_ie";
			divContainer.style.display = 'none';
			divContainer.innerHTML = iePtaObject;
			try {
				document.body.appendChild(divContainer);
				iTrusPTA = document.getElementById("iTrusPTA_ie");
			} catch (e) {
				return false;
			}
		} else {	
			var length = navigator.plugins.length
			var check_install_cenroll = 0;
			for (var i = 0; i < length; i++) {
				var index = (navigator.plugins[i].name).indexOf("iTrusPTA");
				if (index > -1) {
					check_install_cenroll++;
					break;
				}
			}
			if (check_install_cenroll > 0) {
				
				 var divContainer = document.createElement("div");
					divContainer.id = "div_iTrusPTA_ff";
					divContainer.style.display = 'none';
					divContainer.innerHTML = ffPtaObject;
				try {
					  /*document.body.appendChild(divContainer);
					    iTrusPTA = document.getElementById("iTrusPTA_ff");					    
					   */
						document.write(ffPtaObject);
						iTrusPTA = document.getElementById("iTrusPTA_ff");
					} catch (e) {
						return false;
				}
					 
			} else {
				 alert("请访问四川CA网站下载证书控件");
				 //window.location.href = "./download.jsp";
			}
			
		}
		return true;
	},

	in_array : function(stringToSearch, arrayToSearch) {
		for (s = 0; s < arrayToSearch.length; s++){
			thisEntry = arrayToSearch[s];
			if ( trim(thisEntry) == trim(stringToSearch) ) {
				return true;
			}
		}
		return false;
	},

	/**
	 * 签名
	 * 
	 * @param plainText:
	 *            原文
	 * @param signCert
	 *            用于签名的证书对象，可以使用GetSingleCertificate函数获得证书对象
	 *            ，或者使用SelectSingleCertificate函数选择<select>中列出的证书
	 * @param opt:
	 *            签名参数
	 * @return 成功: 返回签名值，失败: 返回""
	 */
	SignMessage : function(plainText, signCert, opt) {
		var signedStr;
		var signCert;
		try {
			opt = typeof (opt) == "number" ? opt | OUTPUT_BASE64
					: OUTPUT_BASE64;
			opt = opt | MIN_CERTSTORE;
			opt = opt | FUNCOPT_NOALERT;
			signedStr = signCert.SignMessage(plainText, opt);

		} catch (e) {
			if ((e.number == -2147483135) || e.number == -2146881278 // cancel
					|| e.number == -2146434962 // FT2001 PIN Login canceled
			) {
				return "";// User canceled
			} else if (e.number == -2146885621)
				alert("您不拥有证书“" + signCert.CommonName + "”的私钥，签名失败。");
			else
				alert("PTA模块发生错误\r\n错误号: " + e.number + "\r\n错误描述: "
						+ e.description);
			return "";
		}
		return signedStr;
	},

	/**
	 * 验证签名
	 * 
	 * @param strToSign:
	 *            原文
	 * @param base64StrSignature:
	 *            签名值
	 * @return 成功: 返回签名证书对象，失败: 返回null
	 */
	VerifySignature : function(strToSign, base64StrSignature, opt) {

		if (strToSign == "" || base64StrSignature == "")
			return;
		try {
			opt = typeof (opt) == "number" ? opt | INPUT_BASE64 : INPUT_BASE64; // 签名值强制采用Base64编码
			var signCert = iTrusPTA.VerifySignature(strToSign,
					base64StrSignature, opt);
			alert("签名验证成功。签名者为“" + signCert.CommonName + "”。");
			return true;
		} catch (e) {
			if (e.number == -2146893818)
				alert("签名验证失败。\r\n签名值与原文不匹配，内容已遭篡改。");
			else
				alert("PTA模块发生错误\r\n错误号: " + e.number + "\r\n错误描述: "
						+ e.description);
			return false;
		}
	},

	/**
	 * 删除证书
	 * 
	 * @param cert
	 *            要删除的证书
	 * @return void;
	 */
	removeCert : function(cert) {
		try {
			cert.Remove();
			return true;
		} catch (e) {
			// alert("error code:["+iTrusPTA.ErrorCode+"]");
			return false;
		}
	},

	/**
	 * 导入证书
	 * 
	 * @param certPath
	 *            待导入的证书路径
	 * @param password
	 *            待导入证书的密码
	 * @param option
	 *            导入证书的选项 MARK_CERT_TO_UNEXPORTABLE；
	 * @return void
	 */
	importCert : function(certPath, password, option) {
		try {
			iTrusPTA.ImportPKCS12(certPath, password, option);
			return true;
		} catch (e) {
			// alert("error code:["+iTrusPTA.ErrorCode+"]");
			return false;
		}
	},

	/**
	 * 导出证书
	 * 
	 * @param certPath
	 *            导出的证书路径
	 * @param password
	 *            导出证书的密码
	 * @param option
	 *            导出证书的选项 MARK_CERT_TO_UNEXPORTABLE | DELETE_CERT;
	 * @return void
	 */
	exportCert : function(cert, option, password) {
		try {
			var filePath = iTrusPTA.GetExportPath(cert.CommonName);
			var iRet = cert.ExportPKCS12(password, option, filePath);
			return true;
		} catch (e) {
			// alert("code:[" + toHex(e.number) + "],message[" + e.message+"]");
			return false;
		}
	},

	// 产生用户登录时随机数
	getLogonData : function() {
		var logonData = "LOGONDATA:" + Date() + "|"
				+ Math.random().toString().substr(2);
		return logonData
	},

	/**
	 * filterCertsEx 根据所设置条件过滤证书
	 * 
	 * @param arrayIssuerDN(optional)
	 *            Array() or string，缺省为""，证书的颁发者字符串和字符串数组，支持多个CA时使用字符串数组
	 * @param arraySerialNumber(optional)缺省为""，证书序列号（微软格式）
	 * @param dateFlag(optional)
	 *            缺省为0，0表示所有证书，1表示处于有效期内的证书，2表示待更新证书，3表示未生效或已过期证书
	 * @param keyUsage
	 *            要判断的密钥用法；
	 * @param weak
	 *            判断的模式，当weak为true时，只要证书的
	 *            密钥用法包含所给出用法的任意一个就返回true。否则需要包含所有的给出的用法,才返回true
	 * @return Array(), PTALib.Certificate
	 */
	filterCertsEx : function(arrayIssuerDN, subject, arraySerialNumber, dateFlag, keyUsage, weak) {
		var m_certs = new Array();
		var i = 0;
		var m = 0;
		if (typeof (arrayIssuerDN) == "undefined") {
			arrayIssuerDN = new Array("");
		} else if (typeof (arrayIssuerDN) == "string") {
			arrayIssuerDN = new Array(arrayIssuerDN);
		}
		if (typeof (arraySerialNumber) == "undefined") {
			arraySerialNumber = new Array("");
		} else if (typeof (arraySerialNumber) == "string") {
			arraySerialNumber = new Array(arraySerialNumber);
		}
		if (typeof (subject) == "undefined")
			subject = "";
		for (i = 0; i < arrayIssuerDN.length; i++) {
			for (m = 0; m < arraySerialNumber.length; m++) {
				var CertFilter = iTrusPTA.Filter;
				CertFilter.Clear();
				// alert(arrayIssuerDN[i].length);
				CertFilter.Issuer = arrayIssuerDN[i];
				// alert(arraySerialNumber[m].length);

				var serialNumber = arraySerialNumber[m];
				// alert(serialNumber);
				if ((serialNumber.length % 2) == 1)
					serialNumber = "0" + serialNumber;
				if (parseInt(serialNumber.substr(0, 1), 16) > 7) // 如果传入的序列号(16进制)第一位大于7，则需要在前面加"00"
					serialNumber = "00" + serialNumber;
				serialNumber = serialNumber.toLowerCase();
				// alert(serialNumber);

				CertFilter.SerialNumber = serialNumber;
				// alert(subject.length);
				CertFilter.Subject = subject;
				// alert("issuer:"+arrayIssuerDN[i]+":"+CertFilter.Issuer);
				// alert("serial:"+arraySerialNumber[m]+":"+CertFilter.SerialNumber);
				var t_Certs = iTrusPTA.MyCertificates; // 临时变量
				var now = new Date();
				var t_count = parseInt(t_Certs.Count);
				if (t_count > 0) { // 找到了证书
					for ( var j = 1; j <= t_count; j++) {
						if (!containUsage(t_Certs.Item(j), keyUsage, weak))
							continue;
						var validFrom = eval(t_Certs.Item(j).ValidFrom);
						var validTo = eval(t_Certs.Item(j).ValidTo);
						switch (dateFlag) {
						case 0:// 所有证书
							m_certs.push(t_Certs.Item(j));
							break;
						case 1:// 处于有效期内的证书
							if (validFrom < now && now < validTo)
								m_certs.push(t_Certs.Item(j));
							break;
						case 2:// 待更新证书
							if (JSDateAdd(validTo, -30) < now && now < validTo)
								m_certs.push(t_Certs.Item(j));
							break;
						case 3:// 未生效或已过期证书
							if (now < validFrom || validTo < now)
								m_certs.push(t_Certs.Item(j));
							break;
						default:// 缺省当作所有证书处理
							m_certs.push(t_Certs.Item(j));
							break;
						}
					}
				}
			}
		}
		return m_certs;
	},

	/**
	 * filterCerts 根据所设置条件过滤证书
	 * 
	 * @param arrayIssuerDN(optional)
	 *            Array() or string，缺省为""，证书的颁发者字符串和字符串数组，支持多个CA时使用字符串数组
	 * @param dateFlag(optional)
	 *            缺省为0，0表示所有证书，1表示处于有效期内的证书，2表示待更新证书，3表示未生效或已过期证书
	 * @param serialNumber(optional)
	 *            缺省为""，证书序列号（微软格式）
	 * @return Array(), PTALib.Certificate
	 */
	filterCerts : function(arrayIssuerDN, dateFlag, serialNumber) {
		var m_certs = new Array();
		var i = 0;
		if (typeof (arrayIssuerDN) == "undefined") {
			arrayIssuerDN = new Array("");
		} else if (typeof (arrayIssuerDN) == "string") {
			arrayIssuerDN = new Array(arrayIssuerDN);
		}
		if (typeof (serialNumber) == "undefined")
			serialNumber = "";

		// alert(serialNumber);
		if ((serialNumber.length % 2) == 1)
			serialNumber = "0" + serialNumber;
		if (parseInt(serialNumber.substr(0, 1), 16) > 7) // 如果传入的序列号(16进制)第一位大于7，则需要在前面加"00"
			serialNumber = "00" + serialNumber;
		serialNumber = serialNumber.toLowerCase();
		// alert(serialNumber);

		for (i = 0; i < arrayIssuerDN.length; i++) {
			var CertFilter = iTrusPTA.Filter;
			CertFilter.Clear();
			CertFilter.Issuer = arrayIssuerDN[i];
			CertFilter.SerialNumber = serialNumber;
			var t_Certs = iTrusPTA.MyCertificates; // 临时变量
			var now = new Date();
			if (parseInt(t_Certs.Count) > 0) { // 找到了证书
				for ( var j = 1; j <= parseInt(t_Certs.Count); j++) {
					//var validFrom = new Date(t_Certs(j).validFrom);
					//var validTo = new Date(t_Certs(j).validTo);
					var validFrom = eval(t_Certs(j).ValidFrom);
					//alert(validFrom);
					var validTo = eval(t_Certs(j).ValidTo);
					switch (dateFlag) {
					case 0:// 所有证书
						m_certs.push(t_Certs(j));
						break;
					case 1:// 处于有效期内的证书
						// validFrom validTo
						// now
						if (validFrom < now && now < validTo)
							m_certs.push(t_Certs(j));
						break;
					case 2:// 待更新证书
						// validFrom validTo-30 validTo
						// now
						if (JSDateAdd(validTo, -30) < now && now < validTo)
							m_certs.push(t_Certs(j));
						break;
					case 3:// 未生效或已过期证书
						// validFrom validTo
						// now now
						if (now < validFrom || validTo < now)
							m_certs.push(t_Certs(j));
						break;
					default:// 缺省当作所有证书处理
						m_certs.push(t_Certs(j));
						break;
					}
				}
			}
		}
		return m_certs;
	},

	/**
	 * 判断该证书是否包含给出的密钥用法
	 * 
	 * @param cert
	 *            要判断的证书；
	 * @param usage
	 *            要判断的密钥用法；
	 * @param weak
	 *            判断的模式，当weak为true时，只要证书的
	 *            密钥用法包含所给出用法的任意一个就返回true。否则需要包含所有的给出的用法,才返回true
	 * 
	 */
	containUsage : function(cert, usage, weak) {
		var keyUsage = cert.KeyUsage;
		var flag = true;
		if (weak) {
			if ((keyUsage & usage) == 0) {
				flag = false;
			}
		} else {
			if (usage & KEY_USAGE_CRL_SIGN)
				flag = flag && (keyUsage & KEY_USAGE_CRL_SIGN);
			if (usage & KEY_USAGE_CERT_SIGN)
				flag = flag && (keyUsage & KEY_USAGE_CERT_SIGN)
			if (usage & KEY_USAGE_KEY_AGREEMENT)
				flag = flag && (keyUsage & KEY_USAGE_KEY_AGREEMENT);
			if (usage & KEY_USAGE_DATA_ENCIPHERMENT)
				flag = flag && (keyUsage & KEY_USAGE_DATA_ENCIPHERMENT);
			if (usage & KEY_USAGE_KEY_ENCIPHERMENT)
				flag = flag && (keyUsage & KEY_USAGE_KEY_ENCIPHERMENT);
			if (usage & KEY_USAGE_DIGITAL_SIGNATURE)
				flag = flag && (keyUsage & KEY_USAGE_DIGITAL_SIGNATURE);
			if (usage & KEY_USAGE_NON_REPUDIATION)
				flag = flag && (keyUsage & KEY_USAGE_NON_REPUDIATION);
		}
		return flag;
	},

	/**
	 * JSDateAdd Javascript 计算给定日期+天数
	 * 
	 * @param theDate:给定日期，Date类型
	 * @param days:整型
	 * @return 计算结果，Date类型
	 */
	JSDateAdd : function(theDate, days) {
		var dateValue = theDate.valueOf();
		dateValue += days * 1000 * 60 * 60 * 24;
		var newDate = new Date(dateValue);
		return newDate;
	},

	/**
	 * JSDateDiffByDays Javascript 计算两个日期之间的间隔天数
	 * 
	 * @param date1:给定日期1，Date类型
	 * @param date2:给定日期2，Date类型
	 * @return 天数，整型
	 */
	JSDateDiffByDays : function(date1, date2) {
		var mill = date1.valueOf() - date2.valueOf();
		var millStr = new String(mill / 1000 / 60 / 60 / 24)
		return parseInt(millStr);
	},

	// 根据序列号过滤证书，如果存在，返回第一张证书，否则返回null
	selectSingleCert : function(serial) {
		var filter = iTrusPTA.Filter;
		filter.Clear();
		if (serial.length > 0) filter.SerialNumber = serial;
		if (iTrusPTA.MyCertificates.Count == 0) {
			alert("未找到指定的数字证书");
			return null;
		}
		return iTrusPTA.MyCertificates.Item(1);
	},

	// 将数据转化为十六进制格式
	toHex : function(number) {
		number = number >>> 0;
		return number.toString(16);
	},

	// Base64Encode
	Base64Encode : function(str) {
		var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
		var encoded = [];
		var c = 0;
		while (c < str.length) {
			var b0 = str.charCodeAt(c++);
			var b1 = str.charCodeAt(c++);
			var b2 = str.charCodeAt(c++);
			var buf = (b0 << 16) + ((b1 || 0) << 8) + (b2 || 0);
			var i0 = (buf & (63 << 18)) >> 18;
			var i1 = (buf & (63 << 12)) >> 12;
			var i2 = isNaN(b1) ? 64 : (buf & (63 << 6)) >> 6;
			var i3 = isNaN(b2) ? 64 : (buf & 63);
			encoded[encoded.length] = chars.charAt(i0);
			encoded[encoded.length] = chars.charAt(i1);
			encoded[encoded.length] = chars.charAt(i2);
			encoded[encoded.length] = chars.charAt(i3);
		}
		return encoded.join('');
	},

	// Base64Decode
	Base64Decode : function(str) {
		var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
		var invalid = {
			strlen : (str.length % 4 != 0),
			chars : new RegExp('[^' + chars + ']').test(str),
			equals : (/=/.test(str) && (/=[^=]/.test(str) || /={3}/.test(str)))
		};
		if (invalid.strlen || invalid.chars || invalid.equals)
			alert('Invalid base64 data');
		var decoded = [];
		var c = 0;
		while (c < str.length) {
			var i0 = chars.indexOf(str.charAt(c++));
			var i1 = chars.indexOf(str.charAt(c++));
			var i2 = chars.indexOf(str.charAt(c++));
			var i3 = chars.indexOf(str.charAt(c++));
			var buf = (i0 << 18) + (i1 << 12) + ((i2 & 63) << 6) + (i3 & 63);
			var b0 = (buf & (255 << 16)) >> 16;
			var b1 = (i2 == 64) ? -1 : (buf & (255 << 8)) >> 8;
			var b2 = (i3 == 64) ? -1 : (buf & 255);
			decoded[decoded.length] = String.fromCharCode(b0);
			if (b1 >= 0)
				decoded[decoded.length] = String.fromCharCode(b1);
			if (b2 >= 0)
				decoded[decoded.length] = String.fromCharCode(b2);
		}
		return decoded.join('');
	},

	/**
	 * filterCertsByItem 根据特定主题项过滤证书
	 * 
	 * @param arrayCerts
	 *            证书对象数组
	 * @param arrayProjectName
	 *            允许的项目名称数组
	 * @return 过滤后的证书对象数组
	 */
	filterCertsByItem : function(arrayCerts,  arrayProjectName) {
      if ( arrayProjectName.length ==0 ) { return arrayCerts; }
			for ( var i = 0; i < arrayCerts.length; i++) {
					var Issuer = arrayCerts[i].Issuer.replace("\0", "");				
					var itemYes = false;
					if(this.in_array(Issuer, arrayIssuerDN_SCEB)){ //SCEB的项目名是在 "OU=" 之后
							var ItemStr = this.getCertSubjectItem(arrayCerts[i].Subject,"OU=");
							if (this.in_array(ItemStr, arrayProjectName)) { 
								itemYes = true;
							}
					}else if(this.in_array(Issuer, arrayIssuerDN_SCEG)){ //SCEG的项目名是在 "OU=OPT.1:" 之后
							var ItemStr = this.getCertSubjectItem(arrayCerts[i].Subject,"OU=OPT.1:");
							if (this.in_array(ItemStr, arrayProjectName)) { 
								itemYes = true;
							}
					}else if(this.in_array(Issuer, arrayIssuerDN_SCEGC)){ //SCEGC 是在 "OU=PN:" 之后
							var ItemStr = this.getCertSubjectItem(arrayCerts[i].Subject,"OU=PN:");
							if (this.in_array(ItemStr, arrayProjectName)) { 
								itemYes = true;
							}
					}else{ //通用证书颁发者或其他颁发者的情况
						itemYes = true;
					}
					if (!itemYes) {
						arrayCerts.splice(i, 1);
						i--;
					}
			} 
			return arrayCerts;
	},

	/**
	 * filterCertsBySignKeyUsage 根据签名密钥用法过滤证书 （仅显示出签名证书）
	 * 
	 * @param arrayCerts
	 *            证书对象数组
	 * @return 过滤后的证书对象数组
	 */
	filterCertsBySignKeyUsage : function(arrayCerts) {
		this.filterCertsByKeyUsage(arrayCerts, DIGITAL_SIGNATURE);
	},

	/**
	 * filterCertsByKeyUsageSignature 根据签名密钥用法过滤证书 （仅显示出签名证书）
	 * 
	 * @param arrayCerts
	 *            证书对象数组
	 * @return 过滤后的证书对象数组
	 */
	filterCertsByKeyUsageSignature : function(arrayCerts) {
		this.filterCertsByKeyUsage(arrayCerts, DIGITAL_SIGNATURE);
	},

	/**
	 * filterCertsByKeyUsageEncipherment 根据加密密钥用法过滤证书 （仅显示出加密证书）
	 * 
	 * @param arrayCerts
	 *            证书对象数组
	 * @return 过滤后的证书对象数组
	 */
	filterCertsByKeyUsageEncipherment : function(arrayCerts) {
		this.filterCertsByKeyUsage(arrayCerts, DATA_ENCIPHERMENT | KEY_ENCIPHERMENT);
	},

	/**
	 * filterCertsByKeyUsage 根据密钥用法过滤证书 （仅显示出匹配密钥用法的证书）
	 * 
	 * @param arrayCerts
	 *            证书对象数组
	 * @return 过滤后的证书对象数组
	 */
	filterCertsByKeyUsage : function(arrayCerts, KeyUsage) {
		var KeyUsageYes = true;
		for ( var i = 0; i < arrayCerts.length; i++) {
			KeyUsageYes = arrayCerts[i].KeyUsage & KeyUsage;
			if (!KeyUsageYes) {
				arrayCerts.splice(i, 1);
				i--;
			}
		}
		return arrayCerts;
	},

	/**
	 * getCertSubjectItem 根据证书主题项中的关键字（键），获取后面的值（,结束）
	 * 
	 * @param CertSubjectName
	 *            证书主题完整DN字串
	 * @param ItemKey
	 *            证书主题项中的关键字（键）
	 * @return 后面的值
	 */
	getCertSubjectItem : function(CertSubjectName, ItemKey) {
		var CertSubjectItem = "";
		var SubjectName = CertSubjectName.replace("\0", "");
		var items = SubjectName.split(",");
		for ( var i = 0; i < items.length; i++) {
			var ItemPos = items[i].indexOf(ItemKey);
			if ( ItemPos > -1) {
				CertSubjectItem = items[i].substring(ItemPos+ItemKey.length);
				break;
			}
		}
		return CertSubjectItem;
	},

	/**
	 * getSubjectFromBase64Cert 从Base64编码公钥证书中获取证书主题
	 * 
	 * @param base64Cert:
	 *            BASE64编码的公钥证书
	 * @return 成功: 返回证书主题串，失败: 返回null
	 */
	getSubjectFromBase64Cert : function(base64Cert) {
		var CertSubjectName = "";
		var Certificate = new ActiveXObject("PTA.Certificate");
		if (!Certificate) {
			alert("Cannot create PTA.Certificate object");
			return null;
		}
		try {
			Certificate.CreateFromStream(base64Cert);
			CertSubjectName = Certificate.Subject.replace("\0", "");
		} catch (e) {
			alert("PTA.Certificate CreateFromStream 发生错误\r\n错误号: " + e.number
					+ "\r\n错误描述: " + e.description);
		}
		delete Certificate;
		return CertSubjectName;
	},

	/**
	 * getCommonNameFromBase64Cert 从Base64编码公钥证书中获取证书CN
	 * 
	 * @param base64Cert:
	 *            BASE64编码的公钥证书
	 * @return 成功: 返回证书CN，失败: 返回null
	 */
	getCommonNameFromBase64Cert : function(base64Cert) {
		var CertCommonName = "";
		var Certificate = new ActiveXObject("PTA.Certificate");
		if (!Certificate) {
			alert("Cannot create PTA.Certificate object");
			return null;
		}
		try {
			Certificate.CreateFromStream(base64Cert);
			CertCommonName = Certificate.CommonName.replace("\0", "");
		} catch (e) {
			alert("PTA.Certificate CreateFromStream 发生错误\r\n错误号: " + e.number
					+ "\r\n错误描述: " + e.description);
		}
		delete Certificate;
		return CertCommonName;
	},

	/**
	 * 文件签名（签名值为字符串）
	 * 
	 * @param srcFileName
	 *            待签名的文件名
	 * @param cert
	 *            签名使用的私钥对应的证书
	 * @param innerContent
	 *            是否包含原文
	 * @param noConfirm
	 *            是否需要用户确认
	 * @return 签名后的数据BASE64字符串，签名失败返回null
	 */
	SignFile : function(srcFileName, cert, innerContent, noConfirm) {
		var signopt = 0;
		var signedData = null;
		signopt = OUTPUT_BASE64;
		if (noConfirm) {
			signopt |= FUNCOPT_NOALERT;
		}
		if (innerContent) {
			signopt |= INNER_CONTENT;
		}
		signopt |= MIN_CERTSTORE;// 在签名中，最小化证书列，可以减少签名值长度
		// signopt|=HTML_SHOW; //弹出的确认框，采用IE引擎渲染样式
		// signopt|=PLAINTEXT_UTF8;//如果签名值是UTF-8编码，需要加上此行，默认UTF-8;
		// signopt|=512;
		try {
			signedData = cert.SignFile(srcFileName, signopt);
		} catch (e) {
			alert(e.message + "[" + e.number + "]");
		}
		return signedData;
	},

	/**
	 * 文件签名（签名值为文件）
	 * 
	 * @param srcFileName
	 *            待签名的文件名
	 * @param signedFileName
	 *            签名结果输出的文件名
	 * @param cert
	 *            签名使用的私钥对应的证书
	 * @param innerContent
	 *            是否包含原文
	 * @param noConfirm
	 *            是否需要用户确认
	 * @return 签名成功返回 true ，签名失败返回 false
	 */
	SignFileEx : function(srcFileName, signedFileName, cert, innerContent, noConfirm) {
		var signopt = 0;
		var Result = false;
		signopt = OUTPUT_BASE64;
		if (noConfirm) {
			signopt |= FUNCOPT_NOALERT;
		}
		if (innerContent) {
			signopt |= INNER_CONTENT;
		}
		signopt |= MIN_CERTSTORE;// 在签名中，最小化证书列，可以减少签名值长度
		// signopt|=HTML_SHOW; //弹出的确认框，采用IE引擎渲染样式
		// signopt|=PLAINTEXT_UTF8;//如果签名值是UTF-8编码，需要加上此行，默认UTF-8;
		// signopt|=512;
		try {
			Result = cert.SignFileEx(srcFileName, signedFileName, signopt);
		} catch (e) {
			alert(e.message + "[" + e.number + "]");
		}
		return Result;
	},

	/**
	 * P7S文件签名（输出包含原文的P7S文件）
	 * 
	 * @param srcFileName
	 *            待签名的文件名
	 * @param signedFileName
	 *            签名结果输出的文件名
	 * @param cert
	 *            签名使用的私钥对应的证书
	 * @param noConfirm
	 *            是否需要用户确认
	 * @return 签名成功返回 true ，签名失败返回 false
	 */
	SignFileP7S : function(srcFileName, signedFileName, cert, noConfirm) {
		var signopt = 0;
		var Result = false;
		signopt |= INNER_CONTENT;
		if (noConfirm) {
			signopt |= FUNCOPT_NOALERT;
		}
		signopt |= MIN_CERTSTORE;// 在签名中，最小化证书列，可以减少签名值长度
		// signopt|=HTML_SHOW; //弹出的确认框，采用IE引擎渲染样式
		// signopt|=PLAINTEXT_UTF8;//如果签名值是UTF-8编码，需要加上此行，默认UTF-8;
		// signopt|=512;
		try {
			Result = cert.SignFileEx(srcFileName, signedFileName, signopt);
		} catch (e) {
			alert(e.message + "[" + e.number + "]");
		}
		return Result;
	},

	/**
	 * 验证文件签名（签名值为字符串）
	 * 
	 * @param signedData
	 *            签名结果BASE64编码
	 * @param srcFileName
	 *            原文件名，若为null,说明签名值包含原文件
	 * @return 验证成功返回 true，验证失败返回 false
	 */
	VerifyFileSignature : function(signedData, srcFileName) {
		var Result = false;
		var InSignFlag = PARAM_STRING | INPUT_BASE64;
		if (srcFileName != null) {
			var InContentFlag = PARAM_FILENAME;
			var FuncFlag = USE_CONTENT_DATA;
		} else {
			var srcFileName = "";
			var InContentFlag = NO_CONTENT_DATA;
			var FuncFlag = USE_SIGNCONTENT;
		}
		try {
			Result = iTrusPTA.VerifySignatureEx(srcFileName, InContentFlag,
					signedData, InSignFlag, FuncFlag);
		} catch (e) {
			alert(e.message + "[" + e.number + "]");
		}
		return Result;
	},

	/**
	 * 验证文件签名（签名值为文件）
	 * 
	 * @param signedFileName
	 *            签名结果文件名
	 * @param srcFileName
	 *            原文件名，若为null,说明签名值包含原文件
	 * @return 验证成功返回 true，验证失败返回 false
	 */
	VerifyFileSignatureEx : function(signedFileName, srcFileName) {
		var Result = false;
		var InSignFlag = PARAM_FILENAME | INPUT_BASE64;
		if (srcFileName != null) {
			var InContentFlag = PARAM_FILENAME;
			var FuncFlag = USE_CONTENT_DATA;
		} else {
			var srcFileName = "";
			var InContentFlag = NO_CONTENT_DATA;
			var FuncFlag = USE_SIGNCONTENT;
		}
		try {
			Result = iTrusPTA.VerifySignatureEx(srcFileName, InContentFlag,
					signedFileName, InSignFlag, FuncFlag);
		} catch (e) {
			alert(e.message + "[" + e.number + "]");
		}
		return Result;
	},

	/**
	 * 验证P7S的文件签名（包含签名原文文件）
	 * 
	 * @param signedFileName
	 *            签名结果P7S文件名
	 * @return 验证成功返回 true，验证失败返回 false
	 */
	VerifyFileP7S : function(signedFileName) {
		var Result = false;
		var InSignFlag = PARAM_FILENAME | PARAM_P7S;
		var srcFileName = "";
		var InContentFlag = NO_CONTENT_DATA;
		var FuncFlag = USE_SIGNCONTENT;
		try {
			Result = iTrusPTA.VerifySignatureEx(srcFileName, InContentFlag,
					signedFileName, InSignFlag, FuncFlag);
		} catch (e) {
			alert(e.message + "[" + e.number + "]");
		}
		return Result;
	},

	/**
	 * 从签名值中获取签名证书
	 * 
	 * @param signedData
	 *            签名值（字符串消息或签名文件名）
	 * @param signedDataType
	 *            签名值类型，"File"表示为签名文件,其他表示为字符串消息
	 * @return 签名证书对象
	 */
	GetCertFromSign : function(signedData, signedDataType) {
		var OPT = INPUT_BASE64;
		var Cert = null;
		if (signedDataType == "File") {
			try {
				var Certs = iTrusPTA.GetCertsFromSignFile(signedData, OPT);
			} catch (e) {
				alert(e.message + "[" + e.number + "]");
			}
			if (Certs.Count >= 1) {
				Cert = Certs.Item(1);
			}
			;
		} else {
			try {
				var Certs = iTrusPTA.GetCertsFromSignStr(signedData, OPT);
			} catch (e) {
				alert(e.message + "[" + e.number + "]");
			}
			if (Certs.Count >= 1) {
				Cert = Certs.Item(1);
			}
			;
		}
		return Cert;
	},

	/**
	 * 从签名值中获取原文内容
	 * 
	 * @param signedData
	 *            签名值（字符串消息或签名文件名）
	 * @param signedDataType
	 *            签名值类型，"File"表示为签名文件,其他表示为字符串消息
	 * @param outFileName
	 *            输出原文的文件名，若为null,表示原文不输出到外部文件
	 * @return 若输出到文件，返回是否成功，true/false; 若不输出到外部文件，则返回原文消息
	 */
	GetContentFromSign : function(signedData, signedDataType, outFileName) {
		var InSignFlag = INPUT_BASE64;
		var Result = null;
		if (signedDataType == "File") {
			InSignFlag |= PARAM_FILENAME;
		} else {
			InSignFlag |= PARAM_STRING;
		}
		;
		if (outFileName != null) {
			var OutDataFlag = PARAM_FILENAME;
			var OutData = outFileName;
			Result = false;
			try {
				iTrusPTA.GetContentFromSignEx(signedData, InSignFlag, OutData,
						OutDataFlag);
				Result = true;
			} catch (e) {
				alert(e.message + "[" + e.number + "]");
			}
		} else {
			var OutDataFlag = 0;
			var OutData = "";
			try {
				Result = iTrusPTA.GetContentFromSignEx(signedData, InSignFlag,
						OutData, OutDataFlag);
			} catch (e) {
				alert(e.message + "[" + e.number + "]");
			}
		}
		;
		return Result;
	},

	/**
	 * 从P7S签名值中获取签名证书
	 * 
	 * @param signedData
	 *            签名值（P7S签名文件名）
	 * @return 签名证书对象
	 */
	GetCertFromP7S : function(signedData) {
		var OPT = PARAM_P7S;
		var Cert = null;
		try {
			var Certs = iTrusPTA.GetCertsFromSignFile(signedData, OPT);
		} catch (e) {
			alert(e.message + "[" + e.number + "]");
		}
		if (Certs.Count >= 1) {
			Cert = Certs.Item(1);
		}
		;
		return Cert;
	},

	/**
	 * 从P7S签名值中获取原文内容
	 * 
	 * @param signedData
	 *            签名值（P7S签名文件名）
	 * @param outFileName
	 *            输出原文的文件名
	 * @return 签名证书对象
	 */
	GetContentFromP7S : function(signedData, outFileName) {
		var InSignFlag = PARAM_FILENAME | PARAM_P7S;
		var Result = false;
		var OutDataFlag = PARAM_FILENAME;
		var OutData = outFileName;
		try {
			iTrusPTA.GetContentFromSignEx(signedData, InSignFlag, OutData,
					OutDataFlag);
			Result = true;
		} catch (e) {
			alert(e.message + "[" + e.number + "]");
		}
		return Result;
	},

	/**
	 * 证书登录签名
	 * 
	 * @param plainData
	 *            待签名的登录随机数（服务器产生的）
	 * @param cert
	 *            签名使用的私钥对应的证书
	 * @return 签名后的数据BASE64字符串，签名失败返回null
	 */
	signLogonData : function(plainData, cert) {
		var signopt = 0;
		var signedData = null;
		signopt = OUTPUT_BASE64;
		signopt |= MIN_CERTSTORE;
		try {
			if (plainData.indexOf("LOGONDATA:") == -1) {
				plainData = "LOGONDATA:" + plainData;
			}
			signedData = cert.SignLogonData(plainData, signopt);
		} catch (e) {
			alert(e.message + "[" + e.number + "]");
		}
		return signedData;
	},

	/**
	 * 字符串裸签名
	 * 
	 * @param plainData
	 *            待签名的字符串
	 * @param cert
	 *            签名使用的私钥对应的证书
	 * @param noConfirm
	 *            是否不需要用户确认 0=需要用户确认 1=不需要用户确认
	 * @return 签名后的数据BASE64字符串，签名失败返回null
	 */
	SignStringOnlySignature : function(plainData, cert, noConfirm) {
		var signopt = 0;
		var signedData = null;
		signopt = OUTPUT_BASE64;
		if (noConfirm) {
			signopt |= FUNCOPT_NOALERT;
		}
		signopt |= ONLY_SIGNATURE;
		// signopt|=HTML_SHOW; //弹出的确认框，采用IE引擎渲染样式
		// signopt|=PLAINTEXT_UTF8;//如果签名值是UTF-8编码，需要加上此行，默认UTF-8;
		// signopt|=512;
		try {
			signedData = cert.SignMessage(plainData, signopt);
		} catch (e) {
			alert(e.message + "[" + e.number + "]");
		}
		return signedData;
	},

	/**
	 * 字符串P7签名
	 * 
	 * @param plainData
	 *            待签名的字符串
	 * @param cert
	 *            签名使用的私钥对应的证书
	 * @param innerContent
	 *            是否包含原文
	 * @param noConfirm
	 *            是否不需要用户确认 0=需要用户确认 1=不需要用户确认
	 * @return 签名后的数据BASE64字符串，签名失败返回null
	 */
	SignString : function(plainData, cert, innerContent, noConfirm) {
		var signopt = 0;
		var signedData = null;
		signopt = OUTPUT_BASE64;
		if (noConfirm) {
			signopt |= FUNCOPT_NOALERT;
		}
		if (innerContent) {
			signopt |= INNER_CONTENT;
		}
		signopt |= MIN_CERTSTORE;// 在签名中，最小化证书列，可以减少签名值长度
		// signopt|=HTML_SHOW; //弹出的确认框，采用IE引擎渲染样式
		 signopt|=PLAINTEXT_UTF8;//如果签名值是UTF-8编码，需要加上此行，默认UTF-8;
		// signopt|=512;
		try {
			signedData = cert.SignMessage(plainData, signopt);
		} catch (e) {
			alert(e.message + "[" + e.number + "]");
		}
		return signedData;
	},

	/**
	 * 验证字符串P7签名
	 * 
	 * @param signedData
	 *            签名结果BASE64编码
	 * @param plainData
	 *            原文字符串，若为null,说明签名值包含原文字符串
	 * @return 验证成功返回 true，验证失败返回 false
	 */
	VerifyStringSignature : function(signedData, plainData) {
		var Result = false;
		var InSignFlag = PARAM_STRING | INPUT_BASE64;
		if (plainData != null) {
			var InContentFlag = PARAM_STRING;
			var FuncFlag = USE_CONTENT_DATA;
		} else {
			var InContentFlag = NO_CONTENT_DATA;
			var FuncFlag = USE_SIGNCONTENT;
			plainData = "";
		}
		try {
			Result = iTrusPTA.VerifySignatureEx(plainData, InContentFlag,
					signedData, InSignFlag, FuncFlag);
		} catch (e) {
			alert(e.message + "[" + e.number + "]");
		}
		return Result;
	},

	/**
	 * 获取消息（字符串）的HASH值
	 * 
	 * @param plainData
	 *            消息（字符串）
	 * @param algorithmName
	 *            HASH算法，支持算法名称："MD5" "SHA1" "SM3"
	 * @param outFileName
	 *            HASH值输出文件,若为null，不输出到文件
	 * @return HASH值（十六进制）
	 */
	GetMessageHash : function(plainData, algorithmName, outFileName) {
		var hashData = null;
		var InData = plainData;
		var InOPT = PARAM_STRING; // 可取值 PARAM_FILENAME / PARAM_STRING /
									// INPUT_BASE64
		var OutOPT = null;
		var OutParam = null;
		if (outFileName == null || outFileName == "") {
			OutParam = ""; // "F:\\Hash.txt"; // 当OutOPT &
							// PARAM_FILENAME时，OutParam会当作文件名处理，Hash结果会被写入文件
			OutOPT = OUTPUT_HEX; // PARAM_FILENAME | OUTPUT_HEX; // 如果设置
									// PARAM_FILENAME，见上。
		} else {
			OutParam = outFileName; // "F:\\Hash.txt"; // 当OutOPT &
									// PARAM_FILENAME时，OutParam会当作文件名处理，Hash结果会被写入文件
			OutOPT = PARAM_FILENAME | OUTPUT_HEX; // PARAM_FILENAME |
													// OUTPUT_HEX; // 如果设置
													// PARAM_FILENAME，见上。
		}
		if (algorithmName == "MD5") {
			var Algid = PTA_CALG_MD5;
		} else if (algorithmName == "SHA1") {
			var Algid = PTA_CALG_SHA1;
		} else if (algorithmName == "SM3") {
			var Algid = PTA_CALG_SM3;
		} else {
			var Algid = PTA_CALG_SHA1;
		}
		;
		try {
			hashData = iTrusPTA.HashData(InData, InOPT, OutParam, OutOPT, Algid);
		} catch (e) {
			alert(e.message + "[" + e.number + "]");
		}
		return hashData;
	},

	/**
	 * 获取文件的HASH值
	 * 
	 * @param srcFileName
	 *            原文件
	 * @param algorithmName
	 *            HASH算法，支持算法名称："MD5" "SHA1" "SM3"
	 * @param destFileName
	 *            HASH值输出文件,若为null，不输出到文件
	 * @return HASH值（十六进制）
	 */
	GetFileHash : function(srcFileName, algorithmName, outFileName) {
		var hashData = null;
		var InData = srcFileName;
		var InOPT = PARAM_FILENAME; // 可取值 PARAM_FILENAME / PARAM_STRING /
									// INPUT_BASE64
		var OutOPT = null;
		var OutParam = null;
		if (outFileName == null || outFileName == "") {
			OutParam = ""; // "F:\\Hash.txt"; // 当OutOPT &
							// PARAM_FILENAME时，OutParam会当作文件名处理，Hash结果会被写入文件
			OutOPT = OUTPUT_HEX; // PARAM_FILENAME | OUTPUT_HEX; // 如果设置
									// PARAM_FILENAME，见上。
		} else {
			OutParam = outFileName; // "F:\\Hash.txt"; // 当OutOPT &
									// PARAM_FILENAME时，OutParam会当作文件名处理，Hash结果会被写入文件
			OutOPT = PARAM_FILENAME | OUTPUT_HEX; // PARAM_FILENAME |
													// OUTPUT_HEX; // 如果设置
													// PARAM_FILENAME，见上。
		}
		if (algorithmName == "MD5") {
			var Algid = PTA_CALG_MD5;
		} else if (algorithmName == "SHA1") {
			var Algid = PTA_CALG_SHA1;
		} else if (algorithmName == "SM3") {
			var Algid = PTA_CALG_SM3;
		} else {
			var Algid = PTA_CALG_SHA1;
		}
		;
		try {
			hashData = iTrusPTA.HashData(InData, InOPT, OutParam, OutOPT, Algid);
		} catch (e) {
			alert(e.message + "[" + e.number + "]");
		}
		return hashData;
	},

	/**
	 * 对消息（字符串）加密
	 * 
	 * @param msg
	 *            原消息（字符串）
	 * @param Issuer
	 *            加密证书的颁发者DN
	 * @param Subject
	 *            加密证书的主题DN
	 * @return 加密之后的密文（BASE64）
	 */
	encryptMessage : function(msg, Issuer, Subject) {
		var encryptData = null;
		var CertFilter = iTrusPTA.Filter;
		CertFilter.Clear();
		CertFilter.Issuer = Issuer;
		CertFilter.Subject = Subject;
		var certs = iTrusPTA.MyCertificates;
		for ( var i = 1; i <= certs.Count; i++) {
			if (!(certs.Item(i).KeyUsage & (DATA_ENCIPHERMENT | KEY_ENCIPHERMENT))) {
				certs.Remove(i - 1);
				i--;
			}
		}
		try {
			encryptData = certs.EncryptMessage(msg, OUTPUT_BASE64
					| PTA_CALG_RC4);// 加密的时候选择对称算法算法,如果不设置,默认会使用 PTA_CALG_3DES
									// PTA_CALG_DES/PTA_CALG_3DES/PTA_CALG_AES/PTA_CALG_RC4/PTA_CALG_SM4
		} catch (e) {
			alert("加密消息失败\n错误代码：0x"
					+ (e.number > 0 ? e.number : 0x100000000 + e.number)
							.toString(16) + "\n错误描述：" + e.description);
		}
		return encryptData;
	},

	/**
	 * 对消息（字符串）加密
	 * 
	 * @param msg
	 *            原消息（字符串）
	 * @param base64Cert
	 *            base64加密证书
	 * @return 加密之后的密文（BASE64）
	 */
	encryptMessageUseBase64Cert : function(msg, base64Cert) {
		this.Init();
		var encryptData = null;
		var CertFilter = iTrusPTA.Filter;
		CertFilter.Clear();
		var Certificates = iTrusPTA.GetEmptyCertificates();
		var Certificate = new ActiveXObject("PTA.Certificate");
		if (!Certificate) {
			alert("Cannot create PTA.Certificate object");
			return null;
		}
		try {
			Certificate.CreateFromStream(base64Cert);
		} catch (e) {
			alert("PTA.Certificate CreateFromStream 发生错误\r\n错误号: " + e.number
					+ "\r\n错误描述: " + e.description);
			return null;
		}
		Certificates.Add(Certificate);
		delete Certificate;
		try {
			encryptData = Certificates.EncryptMessage(msg, OUTPUT_BASE64
					| PTA_CALG_RC4);// 加密的时候选择对称算法算法,如果不设置,默认会使用 PTA_CALG_3DES
									// PTA_CALG_DES/PTA_CALG_3DES/PTA_CALG_AES/PTA_CALG_RC4/PTA_CALG_SM4
		} catch (e) {
			alert("加密消息失败\n错误代码：0x"
					+ (e.number > 0 ? e.number : 0x100000000 + e.number)
							.toString(16) + "\n错误描述：" + e.description);
		}
		return encryptData;
	},

	/**
	 * 对消息（字符串）解密
	 * 
	 * @param msg
	 *            密文
	 * @param cert
	 *            解密证书，若为null,则用原加密证书解密（根据序列号找原加密证书）；若传入证书,则用指定证书解密
	 * @return 成功返回：解密之后的明文；失败返回 0
	 */
	decryptMessage : function(msg, cert) {
		var Result = null;
		if (cert == null) { // 使用默认证书解密
			try {
				Result = iTrusPTA.DecryptMessage(msg, INPUT_BASE64);
			} catch (e) {
				var errcode = (e.number > 0 ? e.number : 0x100000000 + e.number)
						.toString(16);
				if (errcode == 80083004) { // 0x80083004
											// 意为没有找到原加密证书，后续可调用用户选择的证书解密
					Result = 1;
				} else {
					Result = 0;
					alert("使用默认证书解密消息失败\n错误代码：0x" + errcode + "\n错误描述："
							+ e.description);
				}
			}
		} else { // 使用用户选择的证书解密
			try {
				Result = cert.DecryptMessage(msg, INPUT_BASE64);
			} catch (e) {
				var errcode = (e.number > 0 ? e.number : 0x100000000 + e.number)
						.toString(16);
				Result = 0;
				alert("使用指定证书解密失败\n错误代码：0x" + errcode + "\n错误描述："
						+ e.description);
			}
		}
		return Result;
	},
	/**
	 * 选择证书对消息（字符串）解密
	 * 
	 * @param msg
	 *            密文
	 * @return 成功返回：解密之后的明文；失败返回 null
	 */

	decryptMessageEx : function(msg) {
		/**
			var Result = null;
			try {
				Result = iTrusPTA.DecryptMessage(msg, INPUT_BASE64);
			} catch (e) {
				var errcode = (e.number > 0 ? e.number : 0x100000000 + e.number)
						.toString(16);
				if (errcode == 80083004) { // 0x80083004
											// 意为没有找到原加密证书，后续可调用用户选择的证书解密
					try {
						Result = selectCert(DATA_ENCIPHERMENT | KEY_ENCIPHERMENT).DecryptMessage(msg, INPUT_BASE64);
					} catch (e) {
						var errcode = (e.number > 0 ? e.number : 0x100000000 + e.number).toString(16);
						alert("使用指定证书解密失败\n错误代码：0x" + errcode + "\n错误描述："+ e.description);
					}
				} else {
					alert("使用默认证书解密消息失败\n错误代码：0x" + errcode + "\n错误描述："
							+ e.description);
				}
			}
			return Result;*/
		
		
		 


		if (typeof (arrayIssuerDN) == "undefined") {
			arrayIssuerDN = new Array("");
		} else if (typeof (arrayIssuerDN) == "string") {
			arrayIssuerDN = new Array(arrayIssuerDN);
		}
		var Result = null;
		var t_CertFilter = iTrusPTA.Filter;
		var Certificates = iTrusPTA.GetEmptyCertificates();
		var i = 0;
		// alert("arrayIssuerDN.length=["+arrayIssuerDN.length+"]");
		for (i = 0; i < arrayIssuerDN.length; i++) {
			t_CertFilter.Clear();
			t_CertFilter.Issuer = arrayIssuerDN[i];
			var t_Certs = iTrusPTA.MyCertificates;
			var t_count = parseInt(t_Certs.Count);
			for ( var j = 1; j <= t_count; j++) {
				//| DIGITAL_SIGNATURE
				if (this.containUsage(t_Certs.Item(j), DATA_ENCIPHERMENT
						| KEY_ENCIPHERMENT , true)) {
					Certificates.Add(t_Certs.Item(j));
				}
			}
		}

		if (Certificates.Count < 1) {
			alert("未找到证书，解密失败");
			return Result;
		}
		var index = 0;
		try {
			// 用户成功选择后会返回序号，从1开始
			// 失败时有异常，且返回0
			index = Certificates.SelCertByGUI(0);
		} catch (e) {
			var errcode = (e.number > 0 ? e.number : 0x100000000 + e.number)
					.toString(16);
			// alert(errcode);
			if (errcode == "80081001") {
				// 传入的证书集合为空
			} else if (errcode == "80081002") {
				// 用户取消或没有选择
			}
			index = 0;
		}
		if (index < 1)
			return Result;
		var t_cert = Certificates.Item(index);
		try {
			Result = t_cert.DecryptMessage(msg, INPUT_BASE64);
			alert("222 = "+Result);
		} catch (e) {
			var errcode = (e.number > 0 ? e.number : 0x100000000 + e.number)
					.toString(16);
			alert("使用选择的证书解密失败\n错误代码：0x" + errcode + "\n错误描述：" + e.description);
		}
		return Result;
		
	}
	,
	selectCert : function(KeyUsage) {
		if (KeyUsage == DIGITAL_SIGNATURE){
			var arrayCerts = this.filterCerts(arrayIssuerDN, 1, "");
		}else{
			var arrayCerts = this.filterCerts(arrayIssuerDN, 0, "");
		}
		this.filterCertsByKeyUsage(arrayCerts, KeyUsage);
		this.filterCertsByItem(arrayCerts,  arrayProjectName);
		var Result = null;
		var t_CertFilter = iTrusPTA.Filter;
		var Certificates = iTrusPTA.GetEmptyCertificates();
		for ( var i = 0; i < arrayCerts.length; i++) {
			Certificates.Add(arrayCerts[i]);
		}
		if (Certificates.Count < 1) {
			alert("没有找到证书");
			return Result;
		}
		var index = 0;
		try {
			// 用户成功选择后会返回序号，从1开始
			// 失败时有异常，且返回0
			index = Certificates.SelCertByGUI(0);
		} catch (e) {
			var errcode = (e.number > 0 ? e.number : 0x100000000 + e.number)
					.toString(16);
			// alert(errcode);
			if (errcode == "80081001") {
				// 传入的证书集合为空
			} else if (errcode == "80081002") {
				// 用户取消或没有选择
			}
			index = 0;
		}
		if (index < 1)
			return Result;
		var t_cert = Certificates.Item(index);
		return t_cert;
	},
	
	/**
	 * 对文件加密
	 * 
	 * @param srcFile
	 *            原文件名
	 * @param encFile
	 *            加密后输出的文件名
	 * @param Issuer
	 *            加密证书的颁发者DN
	 * @param Subject
	 *            加密证书的主题DN
	 * @return 加密成功返回 true，加密失败返回 false
	 */
	encryptFile : function(srcFile, encFile, Issuer, Subject) {
		var Result = false;
		var CertFilter = iTrusPTA.Filter;
		CertFilter.Clear();
		CertFilter.Issuer = Issuer;
		CertFilter.Subject = Subject;
		var certs = iTrusPTA.MyCertificates;
		for ( var i = 1; i <= certs.Count; i++) {
			if (!(certs.Item(i).KeyUsage & (DATA_ENCIPHERMENT | KEY_ENCIPHERMENT))) {
				certs.Remove(i - 1);
				i--;
			}
		}
		try {
			Result = certs.EncryptFileEx(srcFile, encFile, 0); // OUTPUT_BASE64
		} catch (e) {
			alert("加密文件失败\n错误代码：0x"
					+ (e.number > 0 ? e.number : 0x100000000 + e.number)
							.toString(16) + "\n错误描述：" + e.description);
		}
		return Result;
	},

	/**
	 * 对文件加密
	 * 
	 * @param srcFile
	 *            原文件名
	 * @param encFile
	 *            加密后输出的文件名
	 * @param encryptCerts
	 *            前端选择的证书（可多个）
	 * @return 加密成功返回 true，加密失败返回 false
	 */
	encryptFileEx : function(srcFile, encFile, encryptCerts) {
		var Result = false;
		try {
			Result = encryptCerts.EncryptFileEx(srcFile, encFile, 0); // OUTPUT_BASE64
		} catch (e) {
			alert("加密文件失败\n错误代码：0x"
					+ (e.number > 0 ? e.number : 0x100000000 + e.number)
							.toString(16) + "\n错误描述：" + e.description);
		}
		return Result;
	},

	decryptFileEx2 : function(encFile, destFile) {
		var Result = false;
		try {
			Result = iTrusPTA.DecryptFileEx(encFile, destFile, 0);
		} catch (e) {
			var errcode = (e.number > 0 ? e.number : 0x100000000 + e.number)
						.toString(16);
			if (errcode == 0x80083004) { // 0x80083004
											// 意为没有找到原加密证书，后续可调用用户选择的证书解密
				try {
					Result = selectCert(DATA_ENCIPHERMENT | KEY_ENCIPHERMENT).DecryptFileEx(encFile, destFile, 0);
				} catch (e) {
					var errcode = (e.number > 0 ? e.number : 0x100000000 + e.number)
							.toString(16);
					alert("使用选择的证书解密失败\n错误代码：0x" + errcode + "\n错误描述：" + e.description);
				}
			} else {
				alert("使用默认证书解密消息失败\n错误代码：0x" + errcode + "\n错误描述："
							+ e.description);
			}
		}
		return Result;
	}
	,

	/**
	 * 对文件解密
	 * 
	 * @param encFile
	 *            加密后的文件名
	 * @param destFile
	 *            解密后输出的原文件名
	 * @param cert
	 *            解密证书，若为null,则用原加密证书解密（根据序列号找原加密证书）；若传入证书,则用指定证书解密
	 * @return 成功返回：2；失败返回：0
	 */
	decryptFile : function(encFile, destFile, cert) {
		var Result = null;
		if (cert == null) { // 使用默认证书解密
			try {
				if (iTrusPTA.DecryptFileEx(encFile, destFile, 0)) { // INPUT_BASE64
					Result = 2;
				}
				;
			} catch (e) {
				var errcode = (e.number > 0 ? e.number : 0x100000000 + e.number)
						.toString(16);
				if (errcode == 0x80083004) { // 0x80083004
												// 意为没有找到原加密证书，后续可调用用户选择的证书解密
					Result = 1;
				} else {
					Result = 0;
					alert("使用默认证书解密消息失败\n错误代码：0x" + errcode + "\n错误描述："
							+ e.description);
				}
			}
		} else { // 使用用户选择的证书解密
			try {
				if (cert.DecryptFileEx(encFile, destFile, 0)) {// INPUT_BASE64
					Result = 2;
				}
				;
			} catch (e) {
				var errcode = (e.number > 0 ? e.number : 0x100000000 + e.number)
						.toString(16);
				Result = 0;
				alert("使用指定证书解密失败\n错误代码：0x" + errcode + "\n错误描述："
						+ e.description);
			}
		}
		return Result;
	},
	
	filterSignCerts : function() {
		this.Init();
		var arrayCerts = this.filterCerts(arrayIssuerDN, 0, "");
		this.filterCertsByKeyUsageSignature(arrayCerts);
		this.filterCertsByItem(arrayCerts,  arrayProjectName);
		return arrayCerts;
	},
	
	filterEncryptCerts : function() {
		this.Init();
		var arrayCerts = this.filterCerts(arrayIssuerDN, 1, "");
		this.filterCertsByKeyUsageEncipherment(arrayCerts);
		//this.filterCertsByItem(arrayCerts, arrayProjectName);
		return arrayCerts;
	},
	
	filterAllCerts : function() {
		this.Init();
		var arrayCerts = this.filterCerts("", 0, "");
		return arrayCerts;
	},
	
	getCertEntityInfo : function(Cert, ItemKey) {
		var Issuer = Cert.Issuer.replace("\0", "");
		var Subject = Cert.Subject.replace("\0", "");
		var CertEntityInfo = "";
		if (this.in_array(Issuer,	arrayIssuerDN_SCEG)) {
			if (ItemKey == "用户类型") {
				CertEntityInfo = this.getCertSubjectItem(Subject, "OU=ID3:");
			} else if (ItemKey == "单位名称" || ItemKey == "个人姓名") {
				CertEntityInfo = Cert.CommonName;
			} else if (ItemKey == "组织机构代码" || ItemKey == "个人身份证号码") {
				CertEntityInfo = this.getCertSubjectItem(Subject, "SN=");
			} else if (ItemKey == "特殊业务编码") {
				CertEntityInfo = this.getCertSubjectItem(Subject, "OU=OPT.4:");
			} else if (ItemKey == "多证书编号") {
				CertEntityInfo = this.getCertSubjectItem(Subject, "OU=OPT.3:");
				if (CertEntityInfo == "") {
					CertEntityInfo = 1;
				}
			} else if (ItemKey == "个人所属单位名称") {
				CertEntityInfo = this.getCertSubjectItem(Subject, "OU=OPT.2:");
			}
		} else if (this.in_array(Issuer,	arrayIssuerDN_SCEB)) {
			if (ItemKey == "用户类型") {
				CertEntityInfo = this.getCertSubjectItem(Subject, "OU=ID3:");
			} else if (ItemKey == "单位名称" || ItemKey == "个人姓名") {
				CertEntityInfo = Cert.CommonName;
			} else if (ItemKey == "组织机构代码" || ItemKey == "个人身份证号码") {
				CertEntityInfo = this.getCertSubjectItem(Subject, "SN=");
			} else if (ItemKey == "企业工商营业执照号") {
				CertEntityInfo = this.getCertSubjectItem(Subject, "OU=NO.1:");
			} else if (ItemKey == "多证书编号") {
				CertEntityInfo = this.getCertSubjectItem(Subject, "OU=ID1:");
				if (CertEntityInfo == "") {
					CertEntityInfo = 1;
				}
			} else if (ItemKey == "特殊业务编码") {
				CertEntityInfo = this.getCertSubjectItem(Subject, "OU=ID2:");
			} else if (ItemKey == "个人所属单位组织机构代码") {
				CertEntityInfo = this.getCertSubjectItem(Subject, "OU=ID4:");
			}
		} else if (this.in_array(Issuer,	arrayIssuerDN_SCEGB)) {
			if (ItemKey == "用户类型") {
				CertEntityInfo = this.getCertSubjectItem(Subject, "OU=ID3:");
				if (CertEntityInfo == ""){
					var CertType = this.getCertSubjectItem(Subject, "OU=NO.1:");
					if (CertType != "") {
						CertEntityInfo = "Organizational";
					} else {
						CertEntityInfo = "Personal";
					}
				}
			} else if (ItemKey == "单位名称" || ItemKey == "个人姓名") {
				CertEntityInfo = Cert.CommonName;
			} else if (ItemKey == "组织机构代码" || ItemKey == "个人身份证号码") {
				CertEntityInfo = this.getCertSubjectItem(Subject, "SN=");
			} else if (ItemKey == "企业工商营业执照号") {
				CertEntityInfo = this.getCertSubjectItem(Subject, "OU=NO.1:");
			} else if (ItemKey == "多证书编号") {
				CertEntityInfo = this.getCertSubjectItem(Subject, "OU=NO.3:");
				if (CertEntityInfo == "") {
					CertEntityInfo = 1;
				}
			} else if (ItemKey == "个人所属单位名称") {
				CertEntityInfo = this.getCertSubjectItem(Subject, "OU=NO.2:");
			} else if (ItemKey == "个人所属单位组织机构代码") {
				CertEntityInfo = this.getCertSubjectItem(Subject, "OU=ID4:");
			}
		}else if (this.in_array(Issuer,	arrayIssuerDN_SCEGC)) {
			if (ItemKey == "用户类型") {
				CertEntityInfo = this.getCertSubjectItem(Subject, "OU=ID3:");
			} else if (ItemKey == "单位名称" || ItemKey == "个人姓名") {
				CertEntityInfo = Cert.CommonName;
			} else if (ItemKey == "组织机构代码" || ItemKey == "个人身份证号码") {
				CertEntityInfo = this.getCertSubjectItem(Subject, "SN=");
			} else if (ItemKey == "证件类型") {
				CertEntityInfo = this.getCertSubjectItem(Subject, "OU=SNTYPE:");
			} else if (ItemKey == "MID") {
				CertEntityInfo = this.getCertSubjectItem(Subject, "OU=MID:");
			} else if (ItemKey == "业务系统UID") {
				CertEntityInfo = this.getCertSubjectItem(Subject, "OU=Custom:");
			}
		} else {
			CertEntityInfo = "";
		}
		return CertEntityInfo;
	},
	
	GetSKIEx : function(Cert) {
		var pkey = Cert.PublicKey;
		if (pkey == null) {
			return null;
		}
		var InOPT = PARAM_STRING | INPUT_HEX;
		var OutOPT = PARAM_STRING | OUTPUT_HEX;
		var Result = iTrusPTA.HashData(pkey, InOPT, "", OutOPT, PTA_CALG_SHA1);
		return Result;
	},
	
	getOIDValueString : function(str) {
		var out = "";
		for ( var i = 4; i < str.length; i++) {
			var a = "0x" + str[i] + str[i + 1];
			i++;
			out += String.fromCharCode(a);
		}
		return out;
	},
	
	/***************************************************************************
	 * 输出随机数
	 * 
	 * @param ByteLen
	 *            所需的字节长度
	 * @param OutDataFlag
	 *            输出数据的格式, 可设置Base64或Hex。
	 * @return 随机数
	 **************************************************************************/
	getRandomByte : function(ByteLen, OutDataFlag) {
		var Result;
		try {
			Result = iTrusPTA.RandomByte(ByteLen, OutDataFlag);
		} catch (e) {
			var errcode = toHex(e.number);
			if (errcode == "80081001") {
				alert("输入错误");
			} else {
				alert("未知错误");
			}
			return null;
		}
		return Result;
	},
	
	/***************************************************************************
	 * 对称加解密 文件到文件
	 * 
	 * @param InFilePath
	 *            输入文件地址
	 * @param OutFilePath
	 *            输出文件地址
	 * @param AlgID
	 *            算法
	 * @param Key
	 *            使用HEX编码, PTA会截取所需的长度, 如果长度不足会报错
	 * @param IV
	 *            使用HEX编码, PTA会截取所需的长度, 如果长度不足会报错
	 * @param IsEnc
	 *            设置true时进行加密操作, false时进行解密操作
	 * @return true为成功，false为失败 输入输出的编码都使用Base64编码 AlgID可选值: PTA_CALG_DES =
	 *         0x010000; PTA_CALG_3DES= 0x020000; PTA_CALG_AES = 0x040000;
	 *         PTA_CALG_RC4 = 0x080000; PTA_CALG_SM4 = 0x100000; 设置错误时将使用3DES
	 **************************************************************************/
	symmFile : function(InFilePath, OutFilePath, AlgID, Key, IV, IsEnc) {
		var InputOPT = PARAM_FILENAME;// | INPUT_BASE64;
		var OutputOPT = PARAM_FILENAME;// | OUTPUT_BASE64;
		var Result;
		try {
			if (IsEnc == true) {
				Result = iTrusPTA.SymmEnc(InFilePath, InputOPT, OutFilePath,
						OutputOPT, AlgID, Key, IV);
			} else {
				Result = iTrusPTA.SymmDec(InFilePath, InputOPT, OutFilePath,
						OutputOPT, AlgID, Key, IV);
			}
		} catch (e) {
			var errcode = toHex(e.number);
			;
			switch (errcode) {
			case "80082001":
				alert("读取文件错误");
				break;
			case "80082002":
				alert("参数设置错误");
				break;
			case "80081001":
				alert("Key或IV长度不适用于选择的算法");
				break;
			case "80083001":
				alert("写入文件失败");
				break;
			default:
				alert("未知错误");
				break;
			}
			return false;
		}
		return true;
	},
	
	/***************************************************************************
	 * 对称加密 消息到消息
	 * 
	 * @param InMSG
	 *            输入消息
	 * @param AlgID
	 *            算法
	 * @param Key
	 *            使用HEX编码, PTA会截取所需的长度, 如果长度不足会报错
	 * @param IV
	 *            使用HEX编码, PTA会截取所需的长度, 如果长度不足会报错
	 * @param IsEnc
	 *            设置true时进行加密操作, false时进行解密操作
	 * @return null为失败, 成功时返回加密后的消息 输入输出的编码都使用Base64编码 AlgID可选值: PTA_CALG_DES =
	 *         0x010000; PTA_CALG_3DES= 0x020000; PTA_CALG_AES = 0x040000;
	 *         PTA_CALG_RC4 = 0x080000; PTA_CALG_SM4 = 0x100000; 设置错误时将使用3DES
	 **************************************************************************/
	symmMSG : function(InMSG, AlgID, Key, IV, IsEnc) {
		var Result;
		try {
			if (IsEnc == true) {
				var InputOPT = PARAM_STRING;
				var OutputOPT = PARAM_STRING | OUTPUT_BASE64;
				Result = iTrusPTA.SymmEnc(InMSG, InputOPT, "", OutputOPT,
						AlgID, Key, IV);
			} else {
				var InputOPT = PARAM_STRING | INPUT_BASE64;
				var OutputOPT = PARAM_STRING;
				Result = iTrusPTA.SymmDec(InMSG, InputOPT, "", OutputOPT,
						AlgID, Key, IV);
			}
		} catch (e) {
			var errcode = toHex(e.number);
			switch (errcode) {
			case "80082001":
				alert("读取文件错误");
				break;
			case "80082002":
				alert("参数设置错误");
				break;
			case "80081001":
				alert("Key或IV长度不适用于选择的算法");
				break;
			case "80083001":
				alert("写入文件失败");
				break;
			default:
				alert("未知错误");
				break;
			}
			return null;
		}
		return Result;
	},
	
	/***************************************************************************
	 * 验证签名值 签名值和原文使用消息传入
	 * 
	 * @Cert 证书
	 * @param SignData
	 *            签名值
	 * @param Content
	 *            原文
	 * @return 验签结果, true为成功, false为失败 输入签名值和原文都使用Base64编码
	 **************************************************************************/
	verifySignatureEx : function(Cert, SignData, Content) {
		var SignOPT = PARAM_STRING | INPUT_BASE64;
		var ContentOPT = PARAM_STRING;// | INPUT_BASE64;
		try {
			Result = Cert.VerifySignature(SignData, SignOPT, Content,
					ContentOPT);
		} catch (e) {
			var errcode = toHex(e.number);
			switch (errcode) {
			case "80081001":
				alert("证书上下文无效");
				break;
			case "80082001":
				alert("读取文件错误");
				break;
			case "80082002":
				alert("参数设置错误");
				break;
			default:
				alert("未知错误");
				break;
			}
			return false;
		}
		return Result;
	},
	
	/***************************************************************************
	 * 非对称加解密 消息到消息
	 * 
	 * @Cert 证书
	 * @param InputData
	 *            输入数据
	 * @param IsEnc
	 *            设置为true时进行加密操作, false时为解密操作
	 * @return null为操作失败, 其他时候返回操作结果 输入和输出数据使用Base64编码
	 **************************************************************************/
	asymMSG : function(Cert, InputData, IsEnc) {
		var Result;
		try {
			if (IsEnc == true) {
				var InputOPT = PARAM_STRING | INPUT_BASE64
				var OutputOPT = PARAM_STRING | OUTPUT_BASE64;
				Result = Cert.Encrypt(InputData, InputOPT, "", OutputOPT);
			} else {
				var InputOPT = PARAM_STRING | INPUT_BASE64;
				var OutputOPT = PARAM_STRING | OUTPUT_BASE64
				Result = Cert.Decrypt(InputData, InputOPT, "", OutputOPT);
			}
		} catch (e) {
			var errcode = toHex(e.number);
			if (IsEnc == true) {
				switch (errcode) {
				case "80081001":
					alert("证书上下文无效");
					break;
				case "80082001":
					alert("从文件读取文件失败");
					break;
				case "80082002":
					alert("参数错误");
					break;
				case "80083001":
					alert("SM2加密失败"); // 只有SM2证书会出现
					break;
				case "80083002":
					alert("RSA加密失败"); // 只有RSA证书会出现
					break;
				case "80084001":
					alert("文件写入失败");
					break;
				default:
					alert("未知错误");
					break;
				}
			} else {
				switch (errcode) {
				case "80081001":
					alert("证书上下文无效");
					break;
				case "80082001":
					alert("从文件读取文件失败");
					break;
				case "80082002":
					alert("参数错误");
					break;
				case "80083001":
					alert("获取私钥信息失败");
					break;
				case "80083002":
					alert("获取私钥信息失败");
					break;
				case "80083003":
					alert("读取私钥失败");
					break;
				case "80083004":
					alert("读取私钥失败");
					break;
				case "80083005":
					alert("解密数据失败");
					break;
				case "80084001":
					alert("文件写入失败");
					break;
				default:
					alert("未知错误");
					break;
				}

			} // if( IsEnc==true )
			return null;
		} // try catch
		return Result;
	},
	/***************************************************************************
	 * 封装PKCS7签名 签名值和原文使用消息传入, P7结构使用消息输出
	 * 
	 * @Cert 证书
	 * @param Sign
	 *            输入数据
	 * @param Content
	 *            设置为true时进行加密操作, false时为解密操作
	 * @param OP
	 *            设置 INNER_CONTENT 时, P7中包含原文
	 * @return null为操作失败, 其他时候返回操作结果 输入和输出数据使用Base64编码
	 **************************************************************************/
	encodePKCS7Sign : function(Cert, Sign, Content, OP) {
		var SignOPT = PARAM_STRING | INPUT_BASE64;
		var ContentOPT = PARAM_STRING;
		var OutputOPT = PARAM_STRING | OUTPUT_BASE64;
		if (OP == INNER_CONTENT)
			OutputOPT = OutputOPT | INNER_CONTENT;
		var Result;
		try {
			Result = Cert.EncodePKCS7Sign(Sign, SignOPT, Content, ContentOPT,
					"", OutputOPT);
		} catch (e) {
			var errcode = toHex(e.number);
			switch (errcode) {
			case "80081001":
				alert("证书上下文无效");
				break;
			case "80082001":
				alert("从文件读取文件失败");
				break;
			case "80082002":
				alert("参数错误");
				break;
			case "80083001":
				alert("编码PKCS7签名信息失败");
				break;
			case "80083002":
				alert("编码PKCS7签名信息失败");
				break;
			case "80083003":
				alert("编码PKCS7签名信息失败");
				break;
			case "80083004":
				alert("编码PKCS7签名信息失败");
				break;
			case "80084001":
				alert("文件写入失败");
				break;
			default:
				alert("未知错误")
			} // switch
			return null;
		} // try catch
		return Result;
	},
	verifyCertPIN : function(Cert, UserPin) {
		var Result = false;
		try {
			Result = Cert.CheckUKeyPIN(UserPin);
		} catch (e) {
			/*
			 * var errcode = (e.number>0?e.number:
			 * 0x100000000+e.number).toString(16); if( errcode==0x80081001){ //
			 * 证书上下文无效 }else if( errcode==0x80081002){ // 获取私钥信息失败 } }else if(
			 * errcode==0x80081003){ // 获取私钥信息失败 } }else if(
			 * errcode==0x80081004){ // 读取私钥失败 } }else if( errcode==0x80081006){ //
			 * 校验PIN失败 }
			 */
		}
		return Result;
	}
};

//去左空格; 
function ltrim(s){ 
	return s.replace( /^\s*/, ""); 
} 

//去右空格; 
function rtrim(s){ 
	return s.replace( /\s*$/, ""); 
} 

//去左右空格; 
function trim(s){ 
	return rtrim(ltrim(s)); 
}
