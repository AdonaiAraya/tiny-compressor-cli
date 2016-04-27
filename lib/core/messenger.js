function Messenger(text, code, isValid) {
    this.text = text;
    this.code = code;
    this.isValid = isValid;
}

var messenger = {};

messenger.ok = function (text, code) {
    var msgText = text || "Ok";
    var msgCode = code || "S001";
    return new Messenger(msgText, msgCode, true);
};

messenger.error = function (text, code) {
    var msgText = text || "Error";
    var msgCode = code || "E001";
    return new Messenger(msgText, msgCode, false)
}

module.exports = messenger;