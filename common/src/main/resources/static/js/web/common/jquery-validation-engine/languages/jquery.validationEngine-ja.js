;/*****************************************************************
 * Japanese language file for jquery.validationEngine.js (ver2.0)
 *
 * Transrator: tomotomo ( Tomoyuki SUGITA )
 * http://tomotomoSnippet.blogspot.com/
 * Licenced under the MIT Licence
 *******************************************************************/
(function($){
    $.fn.validationEngineLanguage = function(){
    };
    $.validationEngineLanguage = {
        newLang: function(){
        	// ys1 start
        	var yscheck = {
        			"1": {//onlyNumberSp
        				"commonregex" : "0-9",
        				"alertPartText" : "半角数字",
        			},        			        			
        			"2": {//onlyLetterSp
        				"commonregex" : "a-zA-Z",
        				"alertPartText" : "半角アルファベット",
        			},
        			"3": {//chkhalfsymbol
        				"commonregex" : "\\<\\>~\\`\\@\\;\\:\\[\\]\\{\\}\\|^\\=\\/\\!\\*\"\\#\\$\\+\\%\\&\\'\\(\\)\\,\\.\\-\\_\\?\\\\\ ",
        				"alertPartText" : "半角記号",
        			},
        			"4": {//chkfullnumber
        				"commonregex" : "０-９",
        				"alertPartText" : "全角数字",
        			},
        			"5": {//chkfullalphabet
        				"commonregex" : "ａ-ｚＡ-Ｚ",
        				"alertPartText" : "全角アルファベット",
        			},
        			"6": {//chkfullsymbol
        				"commonregex" : "、。，．・：；？　！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈〉《》「」『』【】＋－±×÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇◆□■△▲▽※〒→←↑↓〓∈∋⊆⊇⊂⊃∪∩∧∨￢⇒⇔∀∃∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬Å‰♯♭♪†‡¶◯ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψωАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ�㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡㍻〝〟№㏍℡㊤㊥㊦㊧㊨㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪",
        				"alertPartText" : "全角記号",
        			},
        			"7": {//chkfullkatakana
        				"commonregex" : "ァ-ヾ",
        				"alertPartText" : "全角カタカナ",
        			},
        			"8": {//chkhiragana
        				"commonregex" : "ぁ-ゞ",
        				"alertPartText" : "ひらがな",
        			},
        			"9" : {//Kanji
        				"commonregex" : "\u4E00-\u9FFF",
        				"alertPartText" : "漢字",
        			},
        			"10" : {//chkkatakana
        				"commonregex" : "\uff70-\uff9d\uff9e\uff9f\uff67-\uff6f",
        				"alertPartText" : "半角カタカナ",
        			},
        	};
        	// ys1 end
            $.validationEngineLanguage.allRules = {
                "required": { // Add your regex rules here, you can take telephone as an example
                    "regex": "none",
                    "alertText": "* 必須項目です",
                    "alertTextCheckboxMultiple": "* 選択してください",
                    "alertTextCheckboxe": "* チェックボックスをチェックしてください"
                },
                "requiredInFunction": { 
                    "func": function(field, rules, i, options){
                        return (field.val() == "test") ? true : false;
                    },
                    "alertText": "* Field must equal test"
                },
                "minSize": {
                    "regex": "none",
                    "alertText": "* ",
                    "alertText2": "文字以上にしてください"
                },
				"groupRequired": {
                    "regex": "none",
                    "alertText": "* You must fill one of the following fields"
                },
                "maxSize": {
                    "regex": "none",
                    "alertText": "* ",
                    "alertText2": "文字以下にしてください"
                },
                "min": {
                    "regex": "none",
                    "alertText": "* ",
                    "alertText2": " 以上の数値にしてください"
                },
                "max": {
                    "regex": "none",
                    "alertText": "* ",
                    "alertText2": " 以下の数値にしてください"
                },
                "past": {
                    "regex": "none",
                    "alertText": "* ",
                    "alertText2": " より過去の日付にしてください"
                },
                "future": {
                    "regex": "none",
                    "alertText": "* ",
                    "alertText2": " より最近の日付にしてください"
                },	
                "maxCheckbox": {
                    "regex": "none",
                    "alertText": "* チェックしすぎです"
                },
                "minCheckbox": {
                    "regex": "none",
                    "alertText": "* ",
                    "alertText2": "つ以上チェックしてください"
                },
                "equals": {
                    "regex": "none",
                    "alertText": "入力された値が一致しません"
                },
                "creditCard": {
                    "regex": "none",
                    "alertText": "* 無効なクレジットカード番号"
                },
                "phone": {
                    // credit: jquery.h5validate.js / orefalo
                    "regex": /^([\+][0-9]{1,3}([ \.\-])?)?([\(][0-9]{1,6}[\)])?([0-9 \.\-]{1,32})(([A-Za-z \:]{1,11})?[0-9]{1,4}?)$/,
                    "alertText": "* 電話番号が正しくありません"
                },
                "email": {
                    // Shamelessly lifted from Scott Gonzalez via the Bassistance Validation plugin http://projects.scottsplayground.com/email_address_validation/
                	"regex": /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
                    "alertText": "* メールアドレスが正しくありません"
                },
                "integer": {
                    "regex": /^[\-\+]?\d+$/,
                    "alertText": "* 整数を半角で入力してください"
                },
                "number": {
                    // Number, including positive, negative, and floating decimal. credit: orefalo
                    "regex": /^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,
                    "alertText": "* 数値を半角で入力してください"
                },
                "date": {
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
                    "alertText": "* 日付は半角で YYYY-MM-DD の形式で入力してください"
                },
                "ipv4": {
                	"regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                    "alertText": "* IPアドレスが正しくありません"
                },
                "url": {
                    "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                    "alertText": "* URLが正しくありません"
                },
                "onlyNumber": {
                    "regex": /^(0|[1-9][0-9]*)$/,
                    "alertText": "* 半角数字で入力してください"
                },
                "onlyNumberSp": {
                    "regex": /^[0-9\ ]+$/,
                    "alertText": "* 半角数字で入力してください"
                },
                "onlyLetterSp": {
                    "regex": /^[a-zA-Z\ \']+$/,
                    "alertText": "* 半角アルファベットで入力してください"
                },
                "onlyLetterNumber": {
                    "regex": /^[0-9a-zA-Z]+$/,
                    "alertText": "* 半角英数で入力してください"
                },
                // --- CUSTOM RULES -- Those are specific to the demos, they can be removed or changed to your likings
                "ajaxUserCall": {
                    "url": "ajaxValidateFieldUser",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    "alertText": "* This user is already taken",
                    "alertTextLoad": "* Validating, please wait"
                },
                "ajaxNameCall": {
                    // remote json service location
                    "url": "ajaxValidateFieldName",
                    // error
                    "alertText": "* This name is already taken",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* This name is available",
                    // speaks by itself
                    "alertTextLoad": "* Validating, please wait"
                },
                "validate2fields": {
                    "alertText": "* 『HELLO』と入力してください"
                },
                // ys2 start
                "zipCode3": {
                    "regex": /^[0-9]{3}$/,
                    "alertText": "3桁半角数字を入力してください"
                },
                "zipCode4": {
                    "regex": /^[0-9]{4}$/,
                    "alertText": "4桁半角数字を入力してください"
                },
    			"seiMeiAlphabet": {//alphabet
    				"regex" : new RegExp("^\[" + yscheck[1].commonregex + yscheck[2].commonregex + yscheck[3].commonregex + "]+$"),
    				"alertText" : "半角アルファベット、半角記号、半角数字で入力してください",
    			},
    			"seiMeiKatakana": {//katakana
    				"regex" : /^[ァ-ヾ]+[ |　]?[ァ-ヾ]+$|^[ァ-ヾ]+?$/,
    				"alertText" : "カタカナで入力してください",
    			},
    			"seiMeiHiragana": {//hiragana
    				"regex" : /^[ぁ-ゞ]+[ |　]?[ぁ-ゞ]+$|^[ぁ-ゞ]+?$/,
    				"alertText" : "ひらがなで入力してください",
    			},   
    			"seiMeiKanji" : {//Kanji
    				//"regex" : /^[一-龠]+?$/,
    				"regex" : /^[\u4E00-\u9FFF]+?$/,
    				"alertText" : "漢字で入力してください",
    			},
    			"faxNumber" : {// ファックス番号
    				"regex" : /^0.*/g,
    				"alertText" : "0から始まる市外局番から入力してください",
    			},
                "yscheckFunction": { 
                    "func": function(yscustomRule, field){
                    	var rule = '';
                    	var alertText = '';
                    	var array = yscustomRule.split(',');
                    	for (var i = 0; i< array.length; i++) {
                    		if (array[i] != "" && array[i] != null && array[i] != '0') {
                    			rule += yscheck[i + 1].commonregex;
                    			alertText += yscheck[i + 1].alertPartText + "、";
                    		}
                    	}
                    	var pattern = new RegExp("^\[" + rule + "]+$");
    					if (!pattern.test(field.val())) {
    						alertText = alertText.substring(0, alertText.length - 1);
    						return alertText + "で入力してください";
    					}
    					return;
                    }
                },   
                "pngFormatCheck": { 
                	"regex": /.png/i,
            		"alertText": "pngファイルを選択してください"
                }
                // ys2 end
            };
            
        }
    };
    $.validationEngineLanguage.newLang();
})(jQuery);


    
