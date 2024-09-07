var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// scripts/ENV_SERVER.ts
var ENV_SERVER_exports = {};
__export(ENV_SERVER_exports, {
  default: () => ENV_SERVER
});
module.exports = __toCommonJS(ENV_SERVER_exports);

// scripts/ENV_PUBLIC.ts
var _a, _b, _c;
var ENV_PUBLIC = class _ENV_PUBLIC {
  ////////////////////////////////////////////////////////////////////////
  // ENV Area
  static DST_ENV = process.env.NEXT_PUBLIC_ENVIRONMENT ?? process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV;
  static IS_DEV = ["development", "dev", "d"].includes(
    (_a = _ENV_PUBLIC.DST_ENV) == null ? void 0 : _a.toLowerCase()
  );
  static IS_QA = ["preview", "test", "qa"].includes(
    (_b = _ENV_PUBLIC.DST_ENV) == null ? void 0 : _b.toLowerCase()
  );
  static IS_PROD = ["prod", "production", "p"].includes(
    (_c = _ENV_PUBLIC.DST_ENV) == null ? void 0 : _c.toLowerCase()
  );
  static IS_DEV_OR_QA = _ENV_PUBLIC.IS_DEV || _ENV_PUBLIC.IS_QA;
  ////////////////////////////////////////////////////////////////////////
  // Common Area
  ////////////////////////////////////////////////////////////////////////
  // Forked Area
  ////////////////////////////////////////////////////////////////////////
  // Init Area
  static is_ENV_PUBLIC_init = false;
  static init_ENV_PUBLIC = () => {
    if (_ENV_PUBLIC.is_ENV_PUBLIC_init) {
      return;
    }
    if (!(_ENV_PUBLIC.IS_DEV || _ENV_PUBLIC.IS_PROD || _ENV_PUBLIC.IS_QA)) {
      throw new Error("Invalid NODE_ENV: " + _ENV_PUBLIC.DST_ENV);
    }
    const variables = {
      IS_DEV: _ENV_PUBLIC.IS_DEV,
      IS_PROD: _ENV_PUBLIC.IS_PROD,
      IS_QA: _ENV_PUBLIC.IS_QA,
      IS_DEV_OR_QA: _ENV_PUBLIC.IS_DEV_OR_QA
    };
    const isNullish = (val) => val === void 0 || val === null || (val == null ? void 0 : val.length) === 0;
    const missing = Object.keys(variables).filter((key) => isNullish(variables[key])).filter((key) => !key.toLowerCase().startsWith("nullable_"));
    if (missing.length > 0) {
      throw new Error(".env.local\uC5D0 \uD658\uACBD\uBCC0\uC218\uB97C \uCD94\uAC00\uD574\uC8FC\uC138\uC694 : " + missing.join(", "));
    }
    _ENV_PUBLIC.is_ENV_PUBLIC_init = true;
  };
};
ENV_PUBLIC.init_ENV_PUBLIC();

// scripts/ENV_SERVER.ts
var ENV_SERVER = class _ENV_SERVER extends ENV_PUBLIC {
  ////////////////////////////////////////////////////////////////////////
  // Common Area
  static HI = process.env.HI_OVERRIDE ?? process.env.HI;
  ////////////////////////////////////////////////////////////////////////
  // Forked Area
  ////////////////////////////////////////////////////////////////////////
  // Init Area
  static is_ENV_SERVER_init = false;
  static init_ENV_SERVER = () => {
    _ENV_SERVER.init_ENV_PUBLIC();
    if (_ENV_SERVER.is_ENV_SERVER_init) {
      return;
    }
    if (!(_ENV_SERVER.IS_DEV || _ENV_SERVER.IS_PROD || _ENV_SERVER.IS_QA)) {
      throw new Error("Invalid NODE_ENV: " + _ENV_SERVER.DST_ENV);
    }
    const variables = {
      IS_DEV: _ENV_SERVER.IS_DEV,
      IS_PROD: _ENV_SERVER.IS_PROD,
      IS_QA: _ENV_SERVER.IS_QA,
      IS_DEV_OR_QA: _ENV_SERVER.IS_DEV_OR_QA,
      HI: _ENV_SERVER.HI
    };
    const isNullish = (val) => val === void 0 || val === null || (val == null ? void 0 : val.length) === 0;
    const missing = Object.keys(variables).filter((key) => isNullish(variables[key])).filter((key) => !key.toLowerCase().startsWith("nullable_"));
    if (missing.length > 0) {
      throw new Error(".env.local\uC5D0 \uD658\uACBD\uBCC0\uC218\uB97C \uCD94\uAC00\uD574\uC8FC\uC138\uC694 : " + missing.join(", "));
    }
    _ENV_SERVER.is_ENV_SERVER_init = true;
  };
};
ENV_SERVER.init_ENV_SERVER();
