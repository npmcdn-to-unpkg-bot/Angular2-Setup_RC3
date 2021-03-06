"use strict";
var core_1 = require('@angular/core');
var collection_1 = require('./facade/collection');
var lang_1 = require('./facade/lang');
var modelModule = require('./model');
var FormBuilder = (function () {
    function FormBuilder() {
    }
    /**
     * Construct a new {@link FormGroup} with the given map of configuration.
     * Valid keys for the `extra` parameter map are `optionals` and `validator`.
     *
     * See the {@link FormGroup} constructor for more details.
     */
    FormBuilder.prototype.group = function (controlsConfig, extra) {
        if (extra === void 0) { extra = null; }
        var controls = this._reduceControls(controlsConfig);
        var optionals = (lang_1.isPresent(extra) ? collection_1.StringMapWrapper.get(extra, 'optionals') : null);
        var validator = lang_1.isPresent(extra) ? collection_1.StringMapWrapper.get(extra, 'validator') : null;
        var asyncValidator = lang_1.isPresent(extra) ? collection_1.StringMapWrapper.get(extra, 'asyncValidator') : null;
        return new modelModule.FormGroup(controls, optionals, validator, asyncValidator);
    };
    /**
     * Construct a new {@link FormControl} with the given `value`,`validator`, and `asyncValidator`.
     */
    FormBuilder.prototype.control = function (value, validator, asyncValidator) {
        if (validator === void 0) { validator = null; }
        if (asyncValidator === void 0) { asyncValidator = null; }
        return new modelModule.FormControl(value, validator, asyncValidator);
    };
    /**
     * Construct an array of {@link FormControl}s from the given `controlsConfig` array of
     * configuration, with the given optional `validator` and `asyncValidator`.
     */
    FormBuilder.prototype.array = function (controlsConfig, validator, asyncValidator) {
        var _this = this;
        if (validator === void 0) { validator = null; }
        if (asyncValidator === void 0) { asyncValidator = null; }
        var controls = controlsConfig.map(function (c) { return _this._createControl(c); });
        return new modelModule.FormArray(controls, validator, asyncValidator);
    };
    /** @internal */
    FormBuilder.prototype._reduceControls = function (controlsConfig) {
        var _this = this;
        var controls = {};
        collection_1.StringMapWrapper.forEach(controlsConfig, function (controlConfig, controlName) {
            controls[controlName] = _this._createControl(controlConfig);
        });
        return controls;
    };
    /** @internal */
    FormBuilder.prototype._createControl = function (controlConfig) {
        if (controlConfig instanceof modelModule.FormControl ||
            controlConfig instanceof modelModule.FormGroup ||
            controlConfig instanceof modelModule.FormArray) {
            return controlConfig;
        }
        else if (lang_1.isArray(controlConfig)) {
            var value = controlConfig[0];
            var validator = controlConfig.length > 1 ? controlConfig[1] : null;
            var asyncValidator = controlConfig.length > 2 ? controlConfig[2] : null;
            return this.control(value, validator, asyncValidator);
        }
        else {
            return this.control(controlConfig);
        }
    };
    /** @nocollapse */
    FormBuilder.decorators = [
        { type: core_1.Injectable },
    ];
    return FormBuilder;
}());
exports.FormBuilder = FormBuilder;
//# sourceMappingURL=form_builder.js.map