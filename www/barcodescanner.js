/**
 * cordova is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) Matt Kane 2010
 * Copyright (c) 2011, IBM Corporation
 */


        var exec = require("cordova/exec");

        /**
         * Constructor.
         *
         * @returns {BarcodeScanner}
         */
        function BarcodeScanner() {

            /**
             * Encoding constants.
             *
             * @type Object
             */
            this.Encode = {
                TEXT_TYPE: "TEXT_TYPE",
                EMAIL_TYPE: "EMAIL_TYPE",
                PHONE_TYPE: "PHONE_TYPE",
                SMS_TYPE: "SMS_TYPE"
                //  CONTACT_TYPE: "CONTACT_TYPE",  // TODO:  not implemented, requires passing a Bundle class from Javascript to Java
                //  LOCATION_TYPE: "LOCATION_TYPE" // TODO:  not implemented, requires passing a Bundle class from Javascript to Java
            };

            this.Symbology = {
                QR_CODE: "QR_CODE",
                DATA_MATRIX: "DATA_MATRIX",
                UPC_E: "UPC_E",
                UPC_A: "UPC_A",
                EAN_8: "EAN_8",
                EAN_13: "EAN_13",
                CODE_128: "CODE_128",
                CODE_39: "CODE_39",
                CODE_93: "CODE_93",
                CODABAR: "CODABAR",
                ITF: "ITF",
                RSS14: "RSS14",
                PDF417: "PDF417",
                RSS_EXPANDED: "RSS_EXPANDED"
            };
        };

        /**
         * Read code from scanner.
         *
         * @param {Function} successCallback This function will recieve a result object: {
         *        text : '12345-mock',    // The code that was scanned.
         *        format : 'FORMAT_NAME', // Code format.
         *        cancelled : true/false, // Was canceled.
         *    }
         * @param {Function} errorCallback
         */
        BarcodeScanner.prototype.scan = function (successCallback, errorCallback, enableSymbols) {
            if (errorCallback == null) {
                errorCallback = function () {
                };
            }

            enableSymbols = enableSymbols || [];

            if (typeof errorCallback != "function") {
                console.log("BarcodeScanner.scan failure: failure parameter not a function");
                return;
            }

            if (typeof successCallback != "function") {
                console.log("BarcodeScanner.scan failure: success callback parameter must be a function");
                return;
            }

            exec(successCallback, errorCallback, 'BarcodeScanner', 'scan', [
                {'symbols': enableSymbols.join(',')}
            ]);
        };

        //-------------------------------------------------------------------
        BarcodeScanner.prototype.encode = function (type, data, successCallback, errorCallback, options) {
            if (errorCallback == null) {
                errorCallback = function () {
                };
            }

            if (typeof errorCallback != "function") {
                console.log("BarcodeScanner.encode failure: failure parameter not a function");
                return;
            }

            if (typeof successCallback != "function") {
                console.log("BarcodeScanner.encode failure: success callback parameter must be a function");
                return;
            }

            exec(successCallback, errorCallback, 'BarcodeScanner', 'encode', [
                {"type": type, "data": data, "options": options}
            ]);
        };

        var barcodeScanner = new BarcodeScanner();
        module.exports = barcodeScanner;

