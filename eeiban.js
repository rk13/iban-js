var ibanCodes = {}
	ibanCodes["16"] = "16"; ibanCodes["10"] = "10"; ibanCodes["33"] = "33"; ibanCodes["42"] = "42";
	ibanCodes["22"] = "22"; ibanCodes["11"] = "22"; ibanCodes["55"] = "55"; ibanCodes["93"] = "00";
	ibanCodes["17"] = "17"; ibanCodes["12"] = "12"; ibanCodes["96"] = "96"; ibanCodes["83"] = "83";
	ibanCodes["77"] = "77"; ibanCodes["51"] = "51"; ibanCodes["75"] = "75";

function calcIbanEE(bban) {
	var intRegex = /^\d+$/;
	if (bban && bban.length > 5 && bban.length < 15 && intRegex.test(bban) && check731cksum(bban)) {
		var ibanCode = ibanCodes[bban.substring(0, 2)];
		var ibanPart = ("00000000000000" + bban).slice(-14);
		if (ibanCode && ibanPart) {
			var hash = ibanCode + ibanPart + "141400";
			return "EE" + applyMod9710(hash) + ibanCode + ibanPart;
		}
	}
	return "";
}

function applyMod9710(hash) {
	var res = 0;
	for (var i = 0; i < hash.length; i++) {
		res = (res * 10 + parseInt(hash.charAt(i))) % 97;
	}
	res = 98 - res;
	return res < 10 ? "0" + res : "" + res;
}

function check731cksum(bban) {
	var arr = [7, 3, 1];
	var k = 0, sum = 0, num = 0;

	for (i = bban.length - 1; i > 0; i--) {
		num = parseInt(bban.substring(i - 1, i));
		sum = sum + num * arr[k];
		k = k >= 2 ? 0 : k + 1;
	}
	
	sum = (sum % 10) > 0 ? 10 - sum % 10 : 0;
	
	if (sum == parseInt(bban.slice(-1))) {
		return true;
	}
	return false;
}
